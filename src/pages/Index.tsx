
import { useQuery } from '@tanstack/react-query';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoPlayer from '@/components/VideoPlayer';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Content {
  id: string;
  title: string;
  description: string;
  poster_url: string;
  backdrop_url: string;
  trailer_url: string;
  content_type: 'movie' | 'series';
  genre: string[];
  rating: number;
  release_year: number;
}

const Index = () => {
  const [selectedTrailer, setSelectedTrailer] = useState<string | null>(null);

  const { data: featuredContent } = useQuery({
    queryKey: ['featured'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .limit(1)
        .single();
      
      if (error) throw error;
      return data as Content;
    }
  });

  const { data: trendingContent } = useQuery({
    queryKey: ['trending'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content')
        .select('*');
      
      if (error) throw error;
      return data as Content[];
    }
  });

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10" />
        {featuredContent && (
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${featuredContent.backdrop_url}')` }} />
        )}
        <div className="relative z-20 container mx-auto h-full flex items-center">
          <div className="max-w-2xl space-y-6 animate-fadeIn">
            <span className="text-theme-gold font-semibold">Featured Today</span>
            <h1 className="text-4xl md:text-6xl font-bold">{featuredContent?.title}</h1>
            <p className="text-gray-300 text-lg">
              {featuredContent?.description}
            </p>
            <div className="flex items-center space-x-4">
              <Button 
                className="bg-theme-crimson hover:bg-theme-crimson/90"
                onClick={() => setSelectedTrailer(featuredContent?.trailer_url ?? null)}
              >
                <Play className="mr-2 h-4 w-4" /> Watch Trailer
              </Button>
              <Button variant="outline">More Info</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Trending Now</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {trendingContent?.map((content) => (
            <div 
              key={content.id} 
              className="group relative overflow-hidden rounded-lg hover-scale cursor-pointer"
              onClick={() => setSelectedTrailer(content.trailer_url)}
            >
              <div className="aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={content.poster_url}
                  alt={content.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold">{content.title}</h3>
                  <p className="text-gray-300 text-sm">{content.release_year} • {content.genre[0]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Continue Watching Section */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-6">Continue Watching</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {trendingContent?.slice(0, 5).map((content) => (
            <div 
              key={content.id} 
              className="group relative overflow-hidden rounded-lg hover-scale cursor-pointer"
              onClick={() => setSelectedTrailer(content.trailer_url)}
            >
              <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={content.backdrop_url}
                  alt={content.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold">{content.title}</h3>
                  <div className="w-full bg-gray-600 h-1 mt-2 rounded-full overflow-hidden">
                    <div className="bg-theme-crimson h-full w-1/3" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <VideoPlayer
        trailerUrl={selectedTrailer || ''}
        isOpen={!!selectedTrailer}
        onClose={() => setSelectedTrailer(null)}
      />
    </div>
  );
};

export default Index;
