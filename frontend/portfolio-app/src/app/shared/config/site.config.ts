export interface SocialLink {
  readonly label: string;
  readonly url: string;
}

const GITHUB_URL = 'https://github.com/Moazali302';
const LINKEDIN_URL = 'https://www.linkedin.com/in/moaz-ali-4710ba397/';
const EMAIL = 'moazdev047@gmail.com';

export const SITE = {
  name: 'MoazAli',
  tagline:
    'Full Stack Developer specializing in Angular and NestJS, building scalable, production-ready web applications.',
  email: EMAIL,
  phone: { label: '+92 327 8031032', href: 'tel:+923278031032' },
  githubUrl: GITHUB_URL,
  linkedinUrl: LINKEDIN_URL,
  socials: [
    { label: 'GitHub', url: GITHUB_URL },
    { label: 'LinkedIn', url: LINKEDIN_URL },
    { label: 'Email', url: `mailto:${EMAIL}` },
  ],
} as const satisfies {
  name: string;
  tagline: string;
  email: string;
  phone: { label: string; href: string };
  githubUrl: string;
  linkedinUrl: string;
  socials: readonly SocialLink[];
};