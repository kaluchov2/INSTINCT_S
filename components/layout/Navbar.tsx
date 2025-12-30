"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useTranslation } from "react-i18next";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation('common');

  const links = [
    { href: "#home", label: t('nav.home') },
    { href: "#who-are-we", label: t('nav.about') },
    { href: "#experiences", label: t('nav.experiences') },
    { href: "#calendar", label: t('nav.calendar') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-gunmetal/95 backdrop-blur-sm shadow-md border-b border-brand-teal/20">
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <a href="#home" className="text-2xl md:text-3xl font-black text-white">
              INSTINCT <span className="text-brand-teal">S</span>
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-brand-teal font-semibold transition-colors"
              >
                {link.label}
              </a>
            ))}
            <LanguageSwitcher />

          </div>

          <div className="hidden md:block ml-4">
             <Button variant="primary" size="md">
              {t('calendar.book_btn')}
            </Button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <LanguageSwitcher />
            <button
                className="p-2 text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
                ) : (
                <Menu className="w-6 h-6" />
                )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-brand-teal/20">
            <div className="flex flex-col space-y-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-brand-teal font-semibold transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button variant="primary" size="md" className="w-full">
                {t('calendar.book_btn')}
              </Button>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}
