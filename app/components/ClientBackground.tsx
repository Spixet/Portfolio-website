'use client';

import dynamic from 'next/dynamic';

// Use dynamic import with no SSR to avoid hydration issues
const ThreeJSBackground = dynamic(
  () => import('./ThreeJSBackground'),
  { ssr: false }
);

export default function ClientBackground() {
  return <ThreeJSBackground />;
}
