import { Metadata } from 'next';
import CollectionHeader from '@/components/collections/CollectionHeader';
import CollectionStats from '@/components/collections/CollectionStats';
import CollectionItems from '@/components/collections/CollectionItems';
import CollectionActivity from '@/components/collections/CollectionActivity';
import Header from '@/components/Header';

interface CollectionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collectionName = slug.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return {
    title: `${collectionName} Collection - HyperPad`,
    description: `Explore the ${collectionName} NFT collection on HyperPad. Discover unique digital art and collectibles on the fastest blockchain network.`,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;

  // Mock collection data - in a real app, this would come from an API
  const collectionData = {
    id: slug,
    name: slug.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' '),
    description: "A cosmic journey through the vast expanse of space, featuring stunning digital art that captures the beauty and mystery of the universe.",
    creator: "Cosmic Studios",
    totalSupply: 1000,
    floorPrice: 0.5,
    totalVolume: 1250,
    owners: 450,
    items: 1000,
    image: "/api/placeholder/600/400",
    banner: "/api/placeholder/1200/300",
    socialLinks: {
      twitter: "https://twitter.com/cosmicstudios",
      discord: "https://discord.gg/cosmicstudios",
      website: "https://cosmicstudios.com"
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen">
        <CollectionHeader collection={collectionData} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <CollectionStats collection={collectionData} />
              <CollectionItems collectionId={slug} />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <CollectionActivity collectionId={slug} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 