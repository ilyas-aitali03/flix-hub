
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import { Button } from './ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-theme-gold to-theme-crimson bg-clip-text text-transparent">
              FlixHUB
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/movies" className="nav-link">Movies</Link>
            <Link to="/series" className="nav-link">Series</Link>
            <Link to="/trending" className="nav-link">Trending</Link>
            <Link to="/watchlist" className="nav-link">Watchlist</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button className="bg-theme-crimson hover:bg-theme-crimson/90">
              Sign In
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-theme-black/95 backdrop-blur-sm rounded-lg animate-fadeIn">
              <Link to="/" className="block px-3 py-2 text-white hover:bg-white/10 rounded-md">Home</Link>
              <Link to="/movies" className="block px-3 py-2 text-white hover:bg-white/10 rounded-md">Movies</Link>
              <Link to="/series" className="block px-3 py-2 text-white hover:bg-white/10 rounded-md">Series</Link>
              <Link to="/trending" className="block px-3 py-2 text-white hover:bg-white/10 rounded-md">Trending</Link>
              <Link to="/watchlist" className="block px-3 py-2 text-white hover:bg-white/10 rounded-md">Watchlist</Link>
              <div className="px-3 py-2">
                <Button className="w-full bg-theme-crimson hover:bg-theme-crimson/90">
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
