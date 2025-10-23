
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddPartnerModal from '@/components/AddPartnerModal';

const partners = [
  {
    name: 'Broomsticks Collective',
    slug: 'broomsticks-collective',
    description: 'A collective of witches and magical practitioners sharing wisdom and craft.',
    image: 'Mystical broomsticks arranged in a circle with glowing runes'
  },
  {
    name: 'Intersectional Witch',
    slug: 'intersectional-witch',
    description: 'Exploring the intersections of magic, social justice, and community care.',
    image: 'Diverse hands holding crystals and herbs in unity'
  },
  {
    name: 'The Rooted Cauldron',
    slug: 'the-rooted-cauldron',
    description: 'Grounded wisdom from the cauldron of earth-based spirituality.',
    image: 'Ancient cauldron surrounded by roots and glowing plants'
  }
];

const TheCircle = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <AddPartnerModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
      <section id="the-circle" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-[#A4B394] mb-6">The Circle</h2>
            <p className="text-xl text-[#CDC0CB] max-w-3xl mx-auto">
              A space for introductions, collaborators, and community members — the ones who gather around the fire.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-[#1a1f1c] border border-[#A4B394]/20 rounded-lg overflow-hidden hover:border-[#A4B394]/60 transition-all duration-300 group flex flex-col"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    alt={partner.image} src="https://images.unsplash.com/photo-1639168314917-53ecd2e3135c" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-semibold text-[#CDC0CB] mb-3">{partner.name}</h3>
                  <p className="text-[#B7B7B1] mb-6 flex-grow">{partner.description}</p>
                  <Link to={`/circle/${partner.slug}`}>
                    <Button className="w-full bg-[#A4B394]/90 text-[#0f1410] hover:bg-[#CDC0CB]">
                      View Posts
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#A4B394] text-[#0f1410] hover:bg-[#CDC0CB] px-8 py-6 text-lg"
            >
              Apply to be a Partner
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default TheCircle;
