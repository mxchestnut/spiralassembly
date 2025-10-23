
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { HeartHandshake as Handshake } from 'lucide-react';

const AddPartnerModal = ({ isOpen, onOpenChange }) => {
  const { toast } = useToast();
  const [orgName, setOrgName] = useState('');
  const [website, setWebsite] = useState('');
  const [contactName, setContactName] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orgName || !website || !contactName) {
      toast({
        title: "Missing Information",
        description: "Please fill out the organization name, website, and your name.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);

    const { error } = await supabase
      .from('partner_proposals')
      .insert([
        { 
          organization_name: orgName,
          website_url: website,
          contact_name: contactName,
          message: message,
          status: 'pending' 
        },
      ]);
      
    setIsLoading(false);

    if (error) {
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Application Sent! 🤝",
        description: "Thank you for your interest! We'll review your application and be in touch.",
      });
      setOrgName('');
      setWebsite('');
      setContactName('');
      setMessage('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1a1f1c] border-[#A4B394]/30 text-[#CDC0CB]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl text-[#A4B394]">
            <Handshake className="w-6 h-6 mr-3" /> Apply to Partner
          </DialogTitle>
          <DialogDescription className="text-[#B7B7B1]">
            Interested in joining The Circle? Tell us about your organization or collective.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="org-name" className="text-right text-[#A4B394]">
                Org Name
              </Label>
              <Input
                id="org-name"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="col-span-3 bg-[#0f1410] border-[#A4B394]/50 focus-visible:ring-[#A4B394]"
                placeholder="e.g., Midnight Bloom Coven"
                disabled={isLoading}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="website" className="text-right text-[#A4B394]">
                Website
              </Label>
              <Input
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="col-span-3 bg-[#0f1410] border-[#A4B394]/50 focus-visible:ring-[#A4B394]"
                placeholder="https://example.com"
                disabled={isLoading}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contact-name" className="text-right text-[#A4B394]">
                Your Name
              </Label>
              <Input
                id="contact-name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="col-span-3 bg-[#0f1410] border-[#A4B394]/50 focus-visible:ring-[#A4B394]"
                placeholder="e.g., Rowan Sage"
                disabled={isLoading}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right text-[#A4B394]">
                Message
              </Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="col-span-3 bg-[#0f1410] border-[#A4B394]/50 focus-visible:ring-[#A4B394]"
                placeholder="Tell us about your work and why you'd like to partner (optional)..."
                disabled={isLoading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-[#A4B394]/50 text-[#A4B394] hover:bg-[#A4B394]/10 hover:text-[#A4B394]"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#A4B394] text-[#0f1410] hover:bg-[#CDC0CB]" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Send Application'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPartnerModal;
