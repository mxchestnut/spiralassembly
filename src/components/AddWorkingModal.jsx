
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
import { Sparkles } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';

const AddWorkingModal = ({ isOpen, onOpenChange }) => {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !name) {
      toast({
        title: "Heads up!",
        description: "Please fill out all the fields to propose a new working.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const { error } = await supabase
      .from('workings')
      .insert([
        { title, description, proposer_name: name, status: 'pending' },
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
        title: "Proposal Submitted! ✨",
        description: "Thank you for your contribution! It has been sent for approval.",
      });
      setTitle('');
      setDescription('');
      setName('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1a1f1c] border-[#A4B394]/30 text-[#CDC0CB]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl text-[#A4B394]">
            <Sparkles className="w-6 h-6 mr-3" /> Propose a New Working
          </DialogTitle>
          <DialogDescription className="text-[#B7B7B1]">
            Share your idea for a new project, ritual, or community effort. Submissions will be reviewed by staff before being posted.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="proposer-name" className="text-right text-[#A4B394]">
                Your Name
              </Label>
              <Input
                id="proposer-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3 bg-[#0f1410] border-[#A4B394]/50 text-[#CDC0CB] focus-visible:ring-[#A4B394]"
                placeholder="e.g., Willow Nightshade"
                disabled={isLoading}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right text-[#A4B394]">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3 bg-[#0f1410] border-[#A4B394]/50 text-[#CDC0CB] focus-visible:ring-[#A4B394]"
                placeholder="e.g., Full Moon Divination Circle"
                disabled={isLoading}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right text-[#A4B394]">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3 bg-[#0f1410] border-[#A4B394]/50 text-[#CDC0CB] focus-visible:ring-[#A4B394]"
                placeholder="Describe the working in detail..."
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
              {isLoading ? 'Submitting...' : 'Submit Proposal'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddWorkingModal;
