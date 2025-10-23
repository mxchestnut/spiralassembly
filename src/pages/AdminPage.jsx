
import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Check, X, LogOut, Loader2, HeartHandshake as Handshake, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [workings, setWorkings] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loadingWorkings, setLoadingWorkings] = useState(true);
  const [loadingPartners, setLoadingPartners] = useState(true);

  const fetchProposals = useCallback(async () => {
    setLoadingWorkings(true);
    setLoadingPartners(true);

    const { data: workingsData, error: workingsError } = await supabase
      .from('workings')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: true });

    if (workingsError) {
      toast({ title: 'Error', description: 'Could not fetch working proposals.', variant: 'destructive' });
    } else {
      setWorkings(workingsData);
    }
    setLoadingWorkings(false);

    const { data: partnersData, error: partnersError } = await supabase
      .from('partner_proposals')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: true });

    if (partnersError) {
      toast({ title: 'Error', description: 'Could not fetch partner proposals.', variant: 'destructive' });
    } else {
      setPartners(partnersData);
    }
    setLoadingPartners(false);
  }, [toast]);

  useEffect(() => {
    fetchProposals();
  }, [fetchProposals]);

  const handleUpdateStatus = async (table, id, status) => {
    const { error } = await supabase.from(table).update({ status }).eq('id', id);

    if (error) {
      toast({ title: 'Update Failed', description: `Could not update the proposal.`, variant: 'destructive' });
    } else {
      toast({ title: 'Success!', description: `Proposal has been ${status}.` });
      fetchProposals();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const ProposalList = ({ title, icon, loading, proposals, onUpdate, table }) => (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold text-[#CDC0CB] mb-6 border-b border-[#A4B394]/20 pb-3 flex items-center">
        {icon} {title}
      </h2>
      {loading ? (
        <div className="flex justify-center items-center h-40"><Loader2 className="h-8 w-8 text-[#A4B394] animate-spin" /></div>
      ) : proposals.length === 0 ? (
        <p className="text-center text-[#B7B7B1] py-10">No pending proposals here. ✨</p>
      ) : (
        <div className="space-y-4">
          {proposals.map((proposal) => (
            <div key={proposal.id} className="bg-[#1a1f1c] border border-[#A4B394]/30 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-bold text-lg text-[#CDC0CB]">{proposal.title || proposal.organization_name}</h3>
                <p className="text-sm text-[#B7B7B1] mt-1 mb-2">{proposal.description || proposal.message}</p>
                <p className="text-xs text-[#A4B394]">
                  Proposed by: <span className="font-medium">{proposal.proposer_name || proposal.contact_name}</span>
                  {proposal.website_url && <a href={proposal.website_url} target="_blank" rel="noopener noreferrer" className="ml-2 text-cyan-400 hover:underline">Website</a>}
                </p>
              </div>
              <div className="flex-shrink-0 flex gap-2">
                <Button size="sm" onClick={() => onUpdate(table, proposal.id, 'approved')} className="bg-green-700/50 text-green-300 hover:bg-green-700/80"><Check className="w-4 h-4" /></Button>
                <Button size="sm" onClick={() => onUpdate(table, proposal.id, 'rejected')} className="bg-red-700/50 text-red-300 hover:bg-red-700/80"><X className="w-4 h-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Spiral Assembly</title>
        <meta name="description" content="Manage proposals for Spiral Assembly." />
      </Helmet>
      <div className="min-h-screen bg-[#0f1410] text-[#CDC0CB] p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto max-w-4xl">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#A4B394]">Admin Dashboard</h1>
            <Button onClick={handleSignOut} variant="outline" className="border-[#A4B394]/50 text-[#A4B394] hover:bg-[#A4B394]/10 hover:text-[#A4B394]">
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
          </header>
          <main>
            <ProposalList title="Working Proposals" icon={<Sparkles className="mr-3"/>} loading={loadingWorkings} proposals={workings} onUpdate={handleUpdateStatus} table="workings" />
            <ProposalList title="Partner Applications" icon={<Handshake className="mr-3"/>} loading={loadingPartners} proposals={partners} onUpdate={handleUpdateStatus} table="partner_proposals" />
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
