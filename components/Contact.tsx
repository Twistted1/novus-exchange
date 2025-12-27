import React from 'react';
import GlassCard from './GlassCard';

const Contact: React.FC = () => {

  return (
    <div className="w-full">
      <h2 className="text-4xl font-bold text-center text-white mb-4">Contact</h2>
      <p className="text-lg text-center text-gray-400 max-w-3xl mx-auto mb-10">
        We'd love to hear from you. Reach out with questions, feedback, or inquiries.
      </p>
      <GlassCard className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">

          {/* Main Contact Form Section */}
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-bold text-white mb-4">Get in touch</h2>
            <p className="text-lg text-gray-200 mb-6">
              We value your feedback and inquiries. Reach out with tips, corrections, or questions.
            </p>
            
            <div className="mb-6 text-gray-300">
              Email us directly at:{' '}
              <a href="mailto:contact@novusexchange.com" className="text-cyan-400 hover:underline">
                contact@novusexchange.com
              </a>
            </div>

            <form 
              action="https://formspree.io/f/xnngvoyw" 
              method="POST"
              className="space-y-6 text-left"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input type="text" id="name" name="name" required className="w-full bg-white/10 border-white/20 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input type="email" id="email" name="email" required className="w-full bg-white/10 border-white/20 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea id="message" name="message" rows={5} required className="w-full bg-white/10 border-white/20 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"></textarea>
              </div>
              <div className="text-center lg:text-left">
                <button 
                  type="submit" 
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md transition-all duration-300 shadow-lg hover:shadow-red-500/30 hover:-translate-y-1 uppercase tracking-wider"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Newsletter Subscription Section */}
          <div className="text-center lg:text-left lg:mt-20">
            <h3 className="text-3xl font-bold text-white mb-3">Subscribe to Our Newsletter</h3>
            <p className="text-gray-300 mb-8">
              Stay ahead of the curve with our latest articles and in-depth analysis delivered directly to your inbox.
            </p>
            {/* 
              PRODUCTION NOTE: 
              Create a separate form on formspree.io for your newsletter list
              and replace 'YOUR_NEWSLETTER_FORM_ID' below.
            */}
            <form 
              action="https://formspree.io/f/mdkwzpjv"
              method="POST"
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto lg:mx-0"
            >
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input 
                type="email" 
                id="newsletter-email" 
                name="email" 
                required 
                placeholder="your.email@example.com"
                className="flex-grow w-full bg-white/10 border-white/20 rounded-md py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button 
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2.5 px-6 rounded-md transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-1"
              >
                Subscribe
              </button>
            </form>
          </div>
        
        </div>
      </GlassCard>
    </div>
  );
};

export default Contact;