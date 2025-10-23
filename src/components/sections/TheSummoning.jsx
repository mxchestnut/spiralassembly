
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

const TheSummoning = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    toast({
      title: "Message received!",
      description: "When you're ready to upgrade to Supabase, you'll need to complete the integration steps to enable form submissions to kitchestnut@hotmail.com"
    });

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section id="the-summoning" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-[#A4B394] mb-6">The Summoning</h2>
          <p className="text-xl text-[#CDC0CB] max-w-2xl mx-auto">
            Reach out across the veil. Your words will find us.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#1a1f1c] border border-[#A4B394]/20 rounded-lg p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#CDC0CB]">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-[#0f1410] border-[#A4B394]/30 text-[#CDC0CB] focus:border-[#A4B394]"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#CDC0CB]">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-[#0f1410] border-[#A4B394]/30 text-[#CDC0CB] focus:border-[#A4B394]"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-[#CDC0CB]">Subject</Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="bg-[#0f1410] border-[#A4B394]/30 text-[#CDC0CB] focus:border-[#A4B394]"
                placeholder="What brings you to the circle?"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-[#CDC0CB]">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="bg-[#0f1410] border-[#A4B394]/30 text-[#CDC0CB] focus:border-[#A4B394] resize-none"
                placeholder="Share your thoughts, questions, or intentions..."
              />
            </div>

            <Button 
              type="submit"
              className="w-full bg-[#A4B394] text-[#0f1410] hover:bg-[#CDC0CB] text-lg py-6"
            >
              Send Your Message
              <Send className="ml-2 h-5 w-5" />
            </Button>
          </form>

          <p className="text-center text-[#B7B7B1] text-sm mt-6">
            Your message will be sent to kitchestnut@hotmail.com
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TheSummoning;
