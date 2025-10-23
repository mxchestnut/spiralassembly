
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Shield, Sparkles } from 'lucide-react';

const resources = [
  {
    icon: Heart,
    title: 'Mental Health Support',
    description: 'Crisis hotlines, therapy resources, and mental wellness tools for our community.',
    links: [
      { name: 'Crisis Text Line', url: 'https://www.crisistextline.org/' },
      { name: 'NAMI Helpline', url: 'https://www.nami.org/help' }
    ]
  },
  {
    icon: Users,
    title: 'Mutual Aid Networks',
    description: 'Community-driven support systems for sharing resources and care.',
    links: [
      { name: 'Mutual Aid Hub', url: 'https://www.mutualaidhub.org/' },
      { name: 'Town Fridge', url: 'https://www.townfridge.com/' }
    ]
  },
  {
    icon: Shield,
    title: 'Safety Resources',
    description: 'Tools and information for personal and community safety.',
    links: [
      { name: 'RAINN', url: 'https://www.rainn.org/' },
      { name: 'The Trevor Project', url: 'https://www.thetrevorproject.org/' }
    ]
  },
  {
    icon: Sparkles,
    title: 'Spiritual Care',
    description: 'Resources for grounding, protection, and spiritual wellness.',
    links: [
      { name: 'Meditation Apps', url: '#' },
      { name: 'Energy Work Guides', url: '#' }
    ]
  }
];

const TheSanctuary = () => {
  return (
    <section id="the-sanctuary" className="py-20 px-4 bg-[#1a1f1c]/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-[#A4B394] mb-6">The Sanctuary</h2>
          <p className="text-xl text-[#CDC0CB] max-w-3xl mx-auto">
            A page for mental health, mutual aid, or community care resources — a place of rest and safety.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#0f1410] border border-[#A4B394]/20 rounded-lg p-8 hover:border-[#A4B394]/40 transition-all duration-300"
              >
                <Icon className="h-10 w-10 text-[#A4B394] mb-4" />
                <h3 className="text-2xl font-semibold text-[#CDC0CB] mb-3">{resource.title}</h3>
                <p className="text-[#B7B7B1] mb-6">{resource.description}</p>
                <div className="space-y-2">
                  {resource.links.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-[#A4B394] hover:text-[#CDC0CB] transition-colors"
                    >
                      → {link.name}
                    </a>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center bg-[#0f1410] border border-[#A4B394]/20 rounded-lg p-8"
        >
          <p className="text-[#CDC0CB] text-lg italic">
            "In this sanctuary, you are safe. In this space, you are held. May you find rest, healing, and the strength to continue your journey."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TheSanctuary;
