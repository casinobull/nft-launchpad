import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedCollections from '@/components/FeaturedCollections';
import FeaturedNFTs from '@/components/FeaturedNFTs';
import FAQ from '@/components/FAQ';
import Community from '@/components/Community';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedCollections />
      <FeaturedNFTs />
      <FAQ />
      <Community />
      <Footer />
    </main>
  );
}
