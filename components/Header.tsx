"use client";

import React, { useState, useEffect, useRef } from 'react';

interface NavLinkProps {
  page: string;
  activePage?: string;
  onNavClick?: (page: string) => void;
  children: React.ReactNode;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ page, activePage, onNavClick, children, className }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(page);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${page}`;
    }
    if (onNavClick) {
      onNavClick(page);
    }
  };

  const isActive = activePage === page;
  const baseClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200";
  const activeClasses = "bg-white/10 text-white";
  const inactiveClasses = "text-gray-300 hover:text-white hover:bg-white/10";

  return (
    <a
      href={`/#${page}`}
      onClick={handleClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${className || ''}`}
    >
      {children}
    </a>
  );
};

interface HeaderProps {
  activePage?: string;
  onNavClick?: (page: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activePage, onNavClick, searchQuery = '', onSearchChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = header.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      header.style.setProperty('--mouse-x', `${x}px`);
      header.style.setProperty('--mouse-y', `${y}px`);
    };

    header.addEventListener('mousemove', handleMouseMove);
    return () => {
      header.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const navItems = ['home', 'about', 'articles', 'trending', 'solutions', 'contact'];

  const handleNavClick = (page: string) => {
    if (onNavClick) onNavClick(page);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-black/80 backdrop-blur-lg' : 'bg-transparent'}`}
    >
      <div className="px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a
              href="/#home"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                handleNavClick('home');
              }}
              className="flex items-center space-x-3"
              aria-label="Go to Novus Exchange homepage"
            >
              {!logoError ? (
                <img
                  src="/novus-logo.png"
                  alt="Novus Exchange"
                  className="h-10 w-auto"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              )}
              <div>
                <span className="block text-white font-bold text-xl tracking-tight leading-tight">Novus Exchange</span>
                <span className="block text-gray-400 text-xs tracking-wider leading-tight">Connecting perspectives</span>
              </div>
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-1 capitalize">
            {navItems.map(page => (
              <NavLink key={page} page={page} activePage={activePage} onNavClick={handleNavClick}>{page.replace('-', ' ')}</NavLink>
            ))}
            <div className="relative ml-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                className="bg-white/10 border-white/20 rounded-md py-1.5 pl-8 pr-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
              />
              <svg className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 capitalize">
            {navItems.map(page => (
              <NavLink key={page} page={page} activePage={activePage} onNavClick={(p) => { handleNavClick(p); setIsMenuOpen(false); }} className="block w-full">{page.replace('-', ' ')}</NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;