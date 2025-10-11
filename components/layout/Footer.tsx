import React from 'react';
import SocialLinks from './SocialLinks';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/50 border-t border-white/10 mt-16">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 text-center text-gray-400">
        <div className="mb-6">
            <SocialLinks />
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} Novus Exchange. All Rights Reserved.</p>
        <p className="mt-2 text-xs">Critical analysis for a complex world.</p>
      </div>
    </footer>
  );
};

export default Footer;
