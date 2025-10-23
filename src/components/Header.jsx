
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { LogOut, User, Shield } from 'lucide-react';

const Header = () => {
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
    navigate('/');
  };
  
  const handleScrollTo = (e, id) => {
    // Prevent default anchor behavior for smooth scrolling
    if (window.location.pathname === '/') {
      e.preventDefault();
      const element = document.querySelector(id);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
        });
      }
    } else {
      // If not on the homepage, navigate to it with the hash
      navigate(`/${id}`);
    }
  };

  const navLinks = [
    { name: 'The Circle', href: '#the-circle' },
    { name: 'The Workings', href: '#the-workings' },
    { name: 'The Offerings', href: '#the-offerings' },
    { name: 'The Sanctuary', href: '#the-sanctuary' },
    { name: 'The Summoning', href: '#the-summoning' },
  ];

  return (
    <header className="py-6 px-4 sticky top-0 z-50 bg-[#0f1410]/80 backdrop-blur-lg border-b border-[#A4B394]/10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-[#A4B394] to-[#CDC0CB]">
          Spiral Assembly
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={(e) => handleScrollTo(e, link.href)} className="text-[#B7B7B1] hover:text-white transition-colors duration-300">
              {link.name}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="ghost" size="sm" className="text-[#A4B394] hover:bg-[#A4B394]/10 hover:text-white">
                    <Shield className="w-4 h-4 mr-2" />
                    Admin
                  </Button>
                </Link>
              )}
              <Link to="/members-dashboard">
                <Button variant="ghost" size="sm" className="text-[#A4B394] hover:bg-[#A4B394]/10 hover:text-white">
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Button onClick={handleSignOut} variant="outline" size="sm" className="border-[#A4B394]/50 text-[#A4B394] hover:bg-[#A4B394]/10 hover:text-white">
                <LogOut className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-[#A4B394] hover:bg-[#A4B394]/10 hover:text-white">Log In</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-[#A4B394] text-[#0f1410] hover:bg-[#CDC0CB]">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
