
import React from 'react';
import { motion } from 'framer-motion';
import { Gift, HeartHandshake, Rss } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const recentPosts = [
  { id: 1, title: 'Autumn Equinox Reflections', source: 'Broomsticks Collective' },
  { id: 2, title: 'The Magic of Community Care', source: 'Intersectional Witch' },
  { id: 3, title: 'Herbal Allies for Darker Days', source: 'The Rooted Cauldron' },
];

const TheOfferings = () => {
  const { toast } = useToast();

  const handleSupportClick = () => {
    toast({
      title: "🚧 Feature Coming Soon! 🚧",
      description: "We're setting up our donation system. Check back shortly!",
    });
  };

  return (
    <section id="the-offerings" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-[#A4B394] mb-6">The Offerings</h2>
          <p className="text-xl text-[#CDC0CB] max-w-3xl mx-auto">
            A digital altar of gifts and collaboration. Share art, stories, resources, or support our work.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#1a1f1c] border border-[#A4B394]/30 rounded-lg p-8"
          >
            <h3 className="text-3xl font-bold text-[#CDC0CB] mb-4 flex items-center">
              <HeartHandshake className="w-8 h-8 mr-4 text-[#A4B394]" />
              Support Our Work
            </h3>
            <p className="text-[#B7B7B1] mb-6">
              Your contributions help us maintain this sacred digital space, foster community projects, and support our collaborators. Every gift, no matter the size, is a blessing to our circle.
            </p>
            <Button
              onClick={handleSupportClick}
              className="w-full bg-[#A4B394] text-[#0f1410] hover:bg-[#CDC0CB] px-8 py-6 text-lg"
            >
              <Gift className="w-5 h-5 mr-3" />
              Make a Contribution
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-[#CDC0CB] mb-6 flex items-center">
              <Rss className="w-8 h-8 mr-4 text-[#A4B394]" />
              Recent from The Circle
            </h3>
            <div className="space-y-4">
              {recentPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="bg-[#0f1410]/50 border-l-4 border-[#A4B394] p-4 rounded-r-lg"
                >
                  <h4 className="font-semibold text-[#CDC0CB]">{post.title}</h4>
                  <p className="text-sm text-[#A4B394]">{post.source}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TheOfferings;
