export interface SocialLink {
  readonly label: string;
  readonly url: string;
}

export const SITE = {
  name: 'MoazAli',
  tagline:
    'Full Stack Developer specializing in Angular and NestJS, building scalable, production-ready web applications.',
  socials: [
    { label: 'GitHub', url: 'https://github.com/Moazali302' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/moaz-ali-4710ba397/' },
    { label: 'Email', url: 'mailto:moazj049@gmail.com' },
  ],
} as const satisfies { name: string; tagline: string; socials: readonly SocialLink[] };