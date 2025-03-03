import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { useToast } from '@/components/ui/use-toast';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
      toast({
        title: "Signed out successfully",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message,
      });
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-theme-gold to-theme-crimson bg-clip-text text-transparent">
              FlixHUB
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={cn(
                "nav-link",
                isActive('/') && "text-white after:w-full"
              )}
            >
              Home
            </Link>
            <Link 
              to="/movies" 
              className={cn(
                "nav-link",
                isActive('/movies') && "text-white after:w-full"
              )}
            >
              Movies
            </Link>
            <Link 
              to="/series" 
              className={cn(
                "nav-link",
                isActive('/series') && "text-white after:w-full"
              )}
            >
              Series
            </Link>
            <Link 
              to="/trending" 
              className={cn(
                "nav-link",
                isActive('/trending') && "text-white after:w-full"
              )}
            >
              Trending
            </Link>
            <Link 
              to="/watchlist" 
              className={cn(
                "nav-link",
                isActive('/watchlist') && "text-white after:w-full"
              )}
            >
              Watchlist
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            {user ? (
              <Button 
                onClick={handleSignOut}
                className="bg-theme-crimson hover:bg-theme-crimson/90"
              >
                Sign Out
              </Button>
            ) : (
              <Button 
                onClick={() => navigate('/auth')}
                className="bg-theme-crimson hover:bg-theme-crimson/90"
              >
                Sign In
              </Button>
            )}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-theme-black/95 backdrop-blur-sm rounded-lg animate-fadeIn">
              <Link 
                to="/" 
                className={cn(
                  "block px-3 py-2 rounded-md",
                  isActive('/') 
                    ? "bg-theme-crimson text-white" 
                    : "text-white hover:bg-white/10"
                )}
              >
                Home
              </Link>
              <Link 
                to="/movies" 
                className={cn(
                  "block px-3 py-2 rounded-md",
                  isActive('/movies') 
                    ? "bg-theme-crimson text-white" 
                    : "text-white hover:bg-white/10"
                )}
              >
                Movies
              </Link>
              <Link 
                to="/series" 
                className={cn(
                  "block px-3 py-2 rounded-md",
                  isActive('/series') 
                    ? "bg-theme-crimson text-white" 
                    : "text-white hover:bg-white/10"
                )}
              >
                Series
              </Link>
              <Link 
                to="/trending" 
                className={cn(
                  "block px-3 py-2 rounded-md",
                  isActive('/trending') 
                    ? "bg-theme-crimson text-white" 
                    : "text-white hover:bg-white/10"
                )}
              >
                Trending
              </Link>
              <Link 
                to="/watchlist" 
                className={cn(
                  "block px-3 py-2 rounded-md",
                  isActive('/watchlist') 
                    ? "bg-theme-crimson text-white" 
                    : "text-white hover:bg-white/10"
                )}
              >
                Watchlist
              </Link>
              <div className="px-3 py-2">
                {user ? (
                  <Button 
                    onClick={handleSignOut}
                    className="w-full bg-theme-crimson hover:bg-theme-crimson/90"
                  >
                    Sign Out
                  </Button>
                ) : (
                  <Button 
                    onClick={() => navigate('/auth')}
                    className="w-full bg-theme-crimson hover:bg-theme-crimson/90"
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
