'use client';

import { useEffect } from 'react';

export default function useReveal() {
  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');

      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('in-view');
        } else {
          // Optional: removing the class hides elements again when scrolling up
          // reveals[i].classList.remove('in-view');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check to reveal elements already in view
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}
