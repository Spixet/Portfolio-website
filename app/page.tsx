import Hero from './components/Hero';
import Skills from './components/Skills';
import FeaturedProjects from './components/FeaturedProjects';
import ContactSection from './components/ContactSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <Skills />
      <FeaturedProjects />
      <ContactSection />
      </main>
  );
}
