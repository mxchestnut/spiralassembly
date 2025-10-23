
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const SignUpPage = () => {
  const { signUp, session } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      navigate('/members-dashboard');
    }
  }, [session, navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please check your passwords and try again.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    const { error } = await signUp(email, password);
    if (!error) {
      toast({
        title: 'Account Created!',
        description: 'Please check your email to confirm your account.',
      });
      navigate('/login');
    }
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Sign Up - Spiral Assembly</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-[#0f1410] text-[#CDC0CB] p-4">
        <div className="w-full max-w-md mx-auto bg-[#1a1f1c] border border-[#A4B394]/30 rounded-lg p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#A4B394]">Join The Circle</h1>
            <p className="text-[#B7B7B1] mt-2">Create an account to become a member.</p>
          </div>
          <form onSubmit={handleSignUp} className="space-y-6">
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
             <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-[#A4B394]">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-[#0f1410] border-[#A4B394]/50 text-[#CDC0CB] focus-visible:ring-[#A4B394]"
              />
            </div>
            <Button type="submit" className="w-full bg-[#A4B394] text-[#0f1410] hover:bg-[#CDC0CB]" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
          <p className="text-center text-sm text-[#B7B7B1] mt-6">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-[#A4B394] hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
