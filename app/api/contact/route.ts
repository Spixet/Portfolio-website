import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

import { siteConfig } from '../../lib/site';

export const runtime = 'nodejs';

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  website?: string;
  formStartedAt?: number | string;
};

type ValidatedContactPayload = {
  name: string;
  email: string;
  message: string;
  website: string;
  formStartedAt: number;
};

type RateLimitEntry = {
  count: number;
  windowStart: number;
  blockedUntil?: number;
};

declare global {
  var __contactRateLimitStore: Map<string, RateLimitEntry> | undefined;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const formAllowedOrigins = new Set([
  new URL(siteConfig.url).origin,
  'http://localhost:3000',
  'http://127.0.0.1:3000',
]);
const rateLimitStore =
  globalThis.__contactRateLimitStore ??
  new Map<string, RateLimitEntry>();

if (!globalThis.__contactRateLimitStore) {
  globalThis.__contactRateLimitStore = rateLimitStore;
}

const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 4000;
const MIN_MESSAGE_LENGTH = 10;
const MAX_BODY_BYTES = 15_000;
const FORM_MIN_FILL_MS = 1_500;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_BLOCK_MS = 30 * 60 * 1000;
const API_HEADERS = {
  'Cache-Control': 'no-store, max-age=0',
} as const;

function jsonResponse(
  body: Record<string, string>,
  status: number,
  headers: HeadersInit = {}
) {
  return NextResponse.json(body, {
    status,
    headers: {
      ...API_HEADERS,
      ...headers,
    },
  });
}

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function stripControlCharacters(value: string) {
  return value.replace(/[\u0000-\u001f\u007f]/g, '');
}

function sanitizeName(value: string) {
  return normalizeWhitespace(stripControlCharacters(value));
}

function sanitizeEmail(value: string) {
  return stripControlCharacters(value).replace(/\s+/g, '').toLowerCase();
}

function sanitizeMessage(value: string) {
  return value
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\u0000/g, '')
    .trim();
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getConfiguredEmailAddress(value: string | undefined) {
  const candidate = sanitizeEmail(value ?? '');
  return emailPattern.test(candidate) ? candidate : siteConfig.email;
}

function sanitizeEnvValue(value: string | undefined) {
  return value?.trim();
}

function validatePayload(
  payload: Partial<ContactPayload>
): { error: string } | { value: ValidatedContactPayload } {
  const name = sanitizeName(payload.name ?? '').slice(0, MAX_NAME_LENGTH);
  const email = sanitizeEmail(payload.email ?? '').slice(0, MAX_EMAIL_LENGTH);
  const message = sanitizeMessage(payload.message ?? '').slice(
    0,
    MAX_MESSAGE_LENGTH
  );
  const website = normalizeWhitespace(payload.website ?? '');
  const formStartedAt = Number(payload.formStartedAt ?? 0);

  if (!name || !email || !message) {
    return { error: 'Please complete your name, email, and message.' };
  }

  if (name.length < 2) {
    return { error: 'Please enter your full name.' };
  }

  if (!emailPattern.test(email)) {
    return { error: 'Please enter a valid email address.' };
  }

  if (message.length < MIN_MESSAGE_LENGTH) {
    return { error: 'Please add a bit more detail to your message.' };
  }

  return {
    value: {
      name,
      email,
      message,
      website,
      formStartedAt,
    },
  };
}

function getTransporter() {
  const host = sanitizeEnvValue(process.env.SMTP_HOST);
  const port = Number(process.env.SMTP_PORT ?? 0);
  const user = sanitizeEnvValue(process.env.SMTP_USER);
  // Gmail app passwords are often copied with display spaces; trim them out safely.
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, '');

  if (!host || !port || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === 'true' || port === 465,
    auth: {
      user,
      pass,
    },
  });
}

function buildHtmlEmail({ name, email, message }: ContactPayload) {
  const escapedMessage = escapeHtml(message).replace(/\n/g, '<br />');

  return `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #0f172a; line-height: 1.6;">
      <h2 style="margin-bottom: 12px;">New portfolio inquiry</h2>
      <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin: 0 0 8px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p style="margin: 16px 0 8px;"><strong>Message:</strong></p>
      <p style="margin: 0;">${escapedMessage}</p>
    </div>
  `;
}

function buildTextEmail({ name, email, message }: ContactPayload) {
  return `Name: ${name}\nEmail: ${email}\n\n${message}`;
}

function isAllowedOrigin(request: Request) {
  const origin = request.headers.get('origin');

  if (!origin) {
    return true;
  }

  const requestOrigin = new URL(request.url).origin;
  formAllowedOrigins.add(requestOrigin);

  if (process.env.VERCEL_URL) {
    formAllowedOrigins.add(`https://${process.env.VERCEL_URL}`);
  }

  return formAllowedOrigins.has(origin);
}

function getClientIdentifier(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for') ?? 'unknown';
  const ip = forwardedFor.split(',')[0]?.trim() || 'unknown';
  const userAgent = request.headers.get('user-agent') ?? 'unknown';
  return `${ip}:${userAgent.slice(0, 160)}`;
}

function checkRateLimit(request: Request) {
  const key = getClientIdentifier(request);
  const now = Date.now();
  const existing = rateLimitStore.get(key);

  if (!existing || now - existing.windowStart >= RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(key, {
      count: 1,
      windowStart: now,
    });
    return null;
  }

  if (existing.blockedUntil && existing.blockedUntil > now) {
    return Math.ceil((existing.blockedUntil - now) / 1000);
  }

  existing.count += 1;

  if (existing.count > RATE_LIMIT_MAX_REQUESTS) {
    existing.blockedUntil = now + RATE_LIMIT_BLOCK_MS;
    return Math.ceil(RATE_LIMIT_BLOCK_MS / 1000);
  }

  return null;
}

function isBotSubmission(payload: ContactPayload) {
  if (payload.website) {
    return true;
  }

  if (!Number.isFinite(payload.formStartedAt)) {
    return true;
  }

  return Date.now() - Number(payload.formStartedAt) < FORM_MIN_FILL_MS;
}

export async function GET() {
  return jsonResponse(
    { error: 'Method not allowed.' },
    405,
    { Allow: 'POST' }
  );
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') ?? '';
    const contentLength = Number(request.headers.get('content-length') ?? 0);

    if (!contentType.toLowerCase().includes('application/json')) {
      return jsonResponse(
        { error: 'Unsupported content type.' },
        415,
        { Allow: 'POST' }
      );
    }

    if (contentLength > MAX_BODY_BYTES) {
      return jsonResponse(
        { error: 'Your message is too large. Please shorten it and try again.' },
        413,
        { Allow: 'POST' }
      );
    }

    if (!isAllowedOrigin(request)) {
      return jsonResponse(
        { error: 'This request origin is not allowed.' },
        403,
        { Allow: 'POST' }
      );
    }

    const retryAfter = checkRateLimit(request);

    if (retryAfter) {
      return jsonResponse(
        { error: 'Too many messages in a short time. Please try again later.' },
        429,
        {
          Allow: 'POST',
          'Retry-After': String(retryAfter),
        }
      );
    }

    const body = (await request.json()) as Partial<ContactPayload>;
    const validated = validatePayload(body);

    if ('error' in validated) {
      return jsonResponse({ error: validated.error }, 400, { Allow: 'POST' });
    }

    if (isBotSubmission(validated.value)) {
      return jsonResponse(
        {
          message:
            'Message received. Thanks for reaching out, and I will get back to you soon.',
        },
        200,
        { Allow: 'POST' }
      );
    }

    const transporter = getTransporter();

    if (!transporter) {
      return jsonResponse(
        {
          error: `The contact form is temporarily unavailable. Please email me directly at ${siteConfig.email}.`,
        },
        503,
        { Allow: 'POST' }
      );
    }

    const { name, email, message } = validated.value;
    const to = getConfiguredEmailAddress(process.env.CONTACT_TO_EMAIL);
    const from = getConfiguredEmailAddress(
      process.env.CONTACT_FROM_EMAIL ?? process.env.SMTP_USER
    );

    await transporter.sendMail({
      to,
      from,
      replyTo: email,
      subject: `Portfolio inquiry from ${name}`,
      text: buildTextEmail({ name, email, message }),
      html: buildHtmlEmail({ name, email, message }),
    });

    return jsonResponse(
      {
        message:
          'Message sent successfully. Thanks for reaching out, and I will get back to you soon.',
      },
      200,
      { Allow: 'POST' }
    );
  } catch (error) {
    console.error('Contact form API error:', error);

    return jsonResponse(
      {
        error: `Something went wrong while sending your message. Please email me directly at ${siteConfig.email}.`,
      },
      500,
      { Allow: 'POST' }
    );
  }
}
