
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import VideoPlayer from '@/components/VideoPlayer';
import { useState } from 'react';

const Movies = () => {
  const [selectedTrailer, setSelectedTrailer] = useState<string | null>(null);

  const { data: movies } = useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('content_type', 'movie');
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies?.map((movie) => (
          <div 
            key={movie.id} 
            className="group relative overflow-hidden rounded-lg hover-scale cursor-pointer"
          >
            <div className="aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden">
              <img
                src={movie.poster_url}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold">{movie.title}</h3>
                <p className="text-gray-300 text-sm">{movie.release_year} • {movie.genre[0]}</p>
                <Button 
                  className="mt-2 w-full bg-theme-crimson hover:bg-theme-crimson/90"
                  onClick={() => setSelectedTrailer(movie.trailer_url)}
                >
                  <Play className="mr-2 h-4 w-4" /> Watch Trailer
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <VideoPlayer
        trailerUrl={selectedTrailer || ''}
        isOpen={!!selectedTrailer}
        onClose={() => setSelectedTrailer(null)}
      />
    </div>
  );
};

export default Movies;
