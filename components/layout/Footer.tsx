"use client";

import { Container } from "@/components/ui/Container";
import { CONTACT_INFO, EXPERIENCES } from "@/lib/constants";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation('common');
  const socialIcons = {
    instagram: Instagram,
    facebook: Facebook,
    twitter: Twitter,
  };

  const navLinks = [
    { href: "#home", label: t('nav.home') },
    { href: "#who-are-we", label: t('nav.about') },
    { href: "#experiences", label: t('nav.experiences') },
    { href: "#calendar", label: t('nav.calendar') },
  ];

  return (
    <footer className="bg-brand-navy text-white">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <div>
              <h3 className="text-2xl font-black mb-4">
                INSTINCT <span className="text-brand-orange">S</span>
              </h3>
              <p className="text-gray-300 mb-4">
                {t('footer.description', 'Connecting with nature where we awaken instincts. Elite outdoor fitness bootcamps in beautiful natural places.')}
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">{t('footer.quick_links', 'Quick Links')}</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-brand-orange transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">{t('nav.experiences')}</h4>
              <ul className="space-y-2">
                {EXPERIENCES.map((exp, index) => (
                  <li key={exp.id}>
                    <a
                      href="#experiences"
                      className="text-gray-300 hover:text-brand-orange transition-colors"
                    >
                      {t(`experiences.card_${index + 1}.title`, exp.title)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">{t('nav.contact')}</h4>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2 text-gray-300">
                  <Mail className="w-5 h-5 text-brand-orange" />
                  <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-brand-orange transition-colors">
                    {CONTACT_INFO.email}
                  </a>
                </li>
                <li className="flex items-center space-x-2 text-gray-300">
                  <Phone className="w-5 h-5 text-brand-orange" />
                  <span>{CONTACT_INFO.phone}</span>
                </li>
                <li className="flex items-start space-x-2 text-gray-300">
                  <MapPin className="w-5 h-5 text-brand-orange mt-1" />
                  <span>{CONTACT_INFO.location}</span>
                </li>
              </ul>

              <div className="flex space-x-4 mt-6">
                {CONTACT_INFO.socialLinks.map((social) => {
                  const Icon = socialIcons[social.icon as keyof typeof socialIcons];
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              {new Date().getFullYear()} Instinct S. {t('footer.rights')}
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-400 hover:text-brand-orange transition-colors">
                {t('footer.privacy', 'Privacy Policy')}
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-brand-orange transition-colors">
                {t('footer.terms', 'Terms of Service')}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
