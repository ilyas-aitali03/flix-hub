import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import VideoPlayer from '@/components/VideoPlayer';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Watchlist = () => {
  const [selectedTrailer, setSelectedTrailer] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
      }
    };
    
    checkAuth();
  }, [navigate]);

  const { data: watchlist } = useQuery({
    queryKey: ['watchlist'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .limit(5);
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Watchlist</h1>
      {watchlist?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">Your watchlist is empty.</p>
          <p className="text-gray-500">Start adding movies and shows to watch later!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {watchlist?.map((content) => (
            <div 
              key={content.id} 
              className="group relative overflow-hidden rounded-lg hover-scale cursor-pointer"
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
                  <Button 
                    className="mt-2 w-full bg-theme-crimson hover:bg-theme-crimson/90"
                    onClick={() => setSelectedTrailer(content.trailer_url)}
                  >
                    <Play className="mr-2 h-4 w-4" /> Watch Trailer
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <VideoPlayer
        trailerUrl={selectedTrailer || ''}
        isOpen={!!selectedTrailer}
        onClose={() => setSelectedTrailer(null)}
      />
    </div>
  );
};

export default Watchlist;
