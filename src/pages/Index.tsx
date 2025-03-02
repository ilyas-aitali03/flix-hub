
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81')] bg-cover bg-center" />
        <div className="relative z-20 container mx-auto h-full flex items-center">
          <div className="max-w-2xl space-y-6 animate-fadeIn">
            <span className="text-theme-gold font-semibold">Featured Today</span>
            <h1 className="text-4xl md:text-6xl font-bold">Inception</h1>
            <p className="text-gray-300 text-lg">
              A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.
            </p>
            <div className="flex items-center space-x-4">
              <Button className="bg-theme-crimson hover:bg-theme-crimson/90">
                <Play className="mr-2 h-4 w-4" /> Watch Now
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
          {[...Array(5)].map((_, i) => (
            <div key={i} className="group relative overflow-hidden rounded-lg hover-scale">
              <div className="aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
                  alt="Movie thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold">Movie Title</h3>
                  <p className="text-gray-300 text-sm">2024 • Action</p>
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
          {[...Array(5)].map((_, i) => (
            <div key={i} className="group relative overflow-hidden rounded-lg hover-scale">
              <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
                  alt="Movie thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold">Movie Title</h3>
                  <div className="w-full bg-gray-600 h-1 mt-2 rounded-full overflow-hidden">
                    <div className="bg-theme-crimson h-full w-1/3" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
