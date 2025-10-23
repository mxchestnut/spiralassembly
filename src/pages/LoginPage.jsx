
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const LoginPage = () => {
  const { signIn, session } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      navigate('/members-dashboard');
    }
  }, [session, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      toast({
        title: 'Login Failed',
        description: error.message,
        variant: 'destructive',
      });
      setLoading(false);
    } else {
      toast({
        title: 'Login Successful!',
        description: 'Redirecting to your dashboard...',
      });
      // The useEffect will handle the navigation
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - Spiral Assembly</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-[#0f1410] text-[#CDC0CB] p-4">
        <div className="w-full max-w-md mx-auto bg-[#1a1f1c] border border-[#A4B394]/30 rounded-lg p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#A4B394]">Welcome Back</h1>
            <p className="text-[#B7B7B1] mt-2">Sign in to access the assembly.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#A4B394]">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#0f1410] border-[#A4B394]/50 text-[#CDC0CB] focus-visible:ring-[#A4B394]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#A4B394]">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-[#0f1410] border-[#A4B394]/50 text-[#CDC0CB] focus-visible:ring-[#A4B394]"
              />
            </div>
            <Button type="submit" className="w-full bg-[#A4B394] text-[#0f1410] hover:bg-[#CDC0CB]" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
          <p className="text-center text-sm text-[#B7B7B1] mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-[#A4B394] hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
