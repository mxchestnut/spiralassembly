
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const PARTNERS = {
  'broomsticks-collective': {
    name: 'Broomsticks Collective',
    url: 'https://broomstickscollective.wordpress.com',
    rssUrl: 'https://broomstickscollective.wordpress.com/feed/',
    description: 'A collective of witches and magical practitioners sharing wisdom and craft.'
  },
  'intersectional-witch': {
    name: 'Intersectional Witch',
    url: 'https://intersectionalwitch.wordpress.com',
    rssUrl: 'https://intersectionalwitch.wordpress.com/feed/',
    description: 'Exploring the intersections of magic, social justice, and community care.'
  },
  'the-rooted-cauldron': {
    name: 'The Rooted Cauldron',
    url: 'https://therootedcauldron.wordpress.com',
    rssUrl: 'https://therootedcauldron.wordpress.com/feed/',
    description: 'Grounded wisdom from the cauldron of earth-based spirituality.'
  }
};

const CirclePartnerPage = () => {
  const { partner } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const partnerData = PARTNERS[partner];

  useEffect(() => {
    if (!partnerData) return;

    const fetchRSS = async () => {
      try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(partnerData.rssUrl)}`);
        const data = await response.json();
        
        if (data.status === 'ok') {
          setPosts(data.items || []);
        } else {
          toast({
            title: "Unable to load posts",
            description: "The RSS feed could not be retrieved at this time.",
            variant: "destructive"
          });
        }
      } catch (error) {
        toast({
          title: "Error loading posts",
          description: "Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRSS();
  }, [partner, partnerData]);

  if (!partnerData) {
    return (
      <div className="min-h-screen bg-[#0f1410] text-[#CDC0CB] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#A4B394] mb-4">Partner Not Found</h1>
          <Link to="/">
            <Button variant="outline" className="border-[#A4B394] text-[#A4B394] hover:bg-[#A4B394] hover:text-[#0f1410]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Spiral Assembly
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{partnerData.name} - Spiral Assembly</title>
        <meta name="description" content={partnerData.description} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>

      <div className="min-h-screen bg-[#0f1410] text-[#CDC0CB]">
        <div className="container mx-auto px-4 py-12">
          <Link to="/">
            <Button variant="ghost" className="mb-8 text-[#A4B394] hover:text-[#CDC0CB] hover:bg-[#A4B394]/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to The Circle
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-[#A4B394] mb-4">{partnerData.name}</h1>
            <p className="text-xl text-[#B7B7B1] mb-6">{partnerData.description}</p>
            <a href={partnerData.url} target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#A4B394] text-[#0f1410] hover:bg-[#CDC0CB]">
                Visit Website
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </motion.div>

          {loading ? (
            <div className="text-center py-20">
              <p className="text-[#B7B7B1] text-lg">Loading posts from the ether...</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#1a1f1c] border border-[#A4B394]/20 rounded-lg p-6 hover:border-[#A4B394]/40 transition-all duration-300"
                >
                  <h2 className="text-2xl font-semibold text-[#CDC0CB] mb-3 hover:text-[#A4B394] transition-colors">
                    <a href={post.link} target="_blank" rel="noopener noreferrer">
                      {post.title}
                    </a>
                  </h2>
                  <p className="text-[#B7B7B1] text-sm mb-4">
                    {new Date(post.pubDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <div 
                    className="text-[#B7B7B1] mb-4 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: post.description }}
                  />
                  <a 
                    href={post.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#A4B394] hover:text-[#CDC0CB] transition-colors inline-flex items-center"
                  >
                    Read More
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CirclePartnerPage;
