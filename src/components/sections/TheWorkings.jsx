
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddWorkingModal from '@/components/AddWorkingModal';
import { supabase } from '@/lib/customSupabaseClient';

const TheWorkings = () => {
  const [workings, setWorkings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkings = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('workings')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching workings:', error);
      } else {
        setWorkings(data);
      }
      setLoading(false);
    };

    fetchWorkings();
  }, []);

  return (
    <>
      <AddWorkingModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
      <section id="the-workings" className="py-20 px-4 bg-[#1a1f1c]/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-[#A4B394] mb-6">The Workings</h2>
            <p className="text-xl text-[#CDC0CB] max-w-3xl mx-auto">
              For current projects, ongoing efforts, and magical or practical to-dos.
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center text-[#A4B394]">Loading workings...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {workings.map((working, index) => (
                <motion.div
                  key={working.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#0f1410] border border-[#A4B394]/30 rounded-lg p-6 hover:border-[#CDC0CB]/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Sparkles className="h-6 w-6 text-[#A4B394]" />
                    <span className="text-xs px-3 py-1 rounded-full bg-[#A4B394]/20 text-[#A4B394] border border-[#A4B394]/30">
                      Approved
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#CDC0CB] mb-3">{working.title}</h3>
                  <p className="text-[#B7B7B1] mb-4">{working.description}</p>
                  <div className="flex items-center text-sm text-[#A4B394]">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(working.created_at).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center">
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#A4B394] text-[#0f1410] hover:bg-[#CDC0CB]"
            >
              Add New Working
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default TheWorkings;
