
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { LogOut, Settings, Star, Zap, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';

const STRIPE_PUBLISHABLE_KEY = 'pk_live_51SLMv4RnT3D9MCNeRvBiA1DnwNpl4GjWAbkEPQ3uUgfkjU5G7ZauIRgh9rjpRyB5AFQ6fxcpP0LKUtNmAFFPULP200kpieDMhW';
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const MembersDashboardPage = () => {
  const { user, signOut, userProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
    navigate('/');
  };

  const handleUpgradeClick = async () => {
    setIsSubscribing(true);
    try {
      const { data, error: functionError } = await supabase.functions.invoke('create-checkout-session');

      if (functionError) {
        throw functionError;
      }
      
      const { sessionId } = data;
      const stripe = await stripePromise;
      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });

      if (stripeError) {
        throw stripeError;
      }
    } catch (error) {
      console.error('Stripe checkout error:', error);
      toast({
        title: "Upgrade Failed",
        description: error.message || "Could not initiate Stripe checkout. Please try again.",
        variant: "destructive",
      });
      setIsSubscribing(false);
    }
  };
  
  const isActive = userProfile?.subscription_status === 'active';

  return (
    <>
      <Helmet>
        <title>Members Dashboard - Spiral Assembly</title>
        <meta name="description" content="Your personal space within the Spiral Assembly." />
      </Helmet>
      <div className="min-h-screen bg-[#0f1410] text-[#CDC0CB] p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto max-w-4xl">
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#A4B394]">Members Dashboard</h1>
              <p className="text-[#B7B7B1] mt-2">Welcome back, {user?.email || 'member'}!</p>
            </div>
            <div className='flex items-center gap-2'>
              <Link to="/">
                <Button variant="ghost" className="text-[#A4B394] hover:bg-[#A4B394]/10 hover:text-white">Home</Button>
              </Link>
              <Button onClick={handleSignOut} variant="outline" className="border-[#A4B394]/50 text-[#A4B394] hover:bg-[#A4B394]/10 hover:text-white">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </header>

          <main>
            <div className="bg-[#1a1f1c] border border-[#A4B394]/30 rounded-lg p-8 text-center">
              {isActive ? (
                <>
                  <Star className="w-16 h-16 mx-auto text-yellow-400 mb-6" />
                  <h2 className="text-2xl font-semibold text-[#CDC0CB] mb-4">You are a Premium Member!</h2>
                  <p className="text-[#B7B7B1] max-w-xl mx-auto mb-8">
                    Thank you for supporting our work! Enjoy exclusive content and priority access.
                  </p>
                  <Button onClick={() => toast({ title: "🚧 Feature Coming Soon! 🚧" })} className="bg-[#A4B394] text-[#0f1410] hover:bg-[#CDC0CB]">
                    <Settings className="w-4 h-4 mr-2" />
                    Manage Subscription
                  </Button>
                </>
              ) : (
                <>
                  <Zap className="w-16 h-16 mx-auto text-[#A4B394] mb-6" />
                  <h2 className="text-2xl font-semibold text-[#CDC0CB] mb-4">Upgrade to Premium!</h2>
                  <p className="text-[#B7B7B1] max-w-xl mx-auto mb-8">
                    Unlock exclusive content, priority features, and further support the Spiral Assembly by becoming a premium member.
                  </p>
                  <Button 
                    onClick={handleUpgradeClick} 
                    className="bg-[#A4B394] text-[#0f1410] hover:bg-[#CDC0CB] w-48"
                    disabled={isSubscribing}
                  >
                    {isSubscribing ? <Loader2 className="animate-spin" /> : 'Upgrade Now!'}
                  </Button>
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default MembersDashboardPage;
