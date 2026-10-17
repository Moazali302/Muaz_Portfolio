export interface Skill {
  readonly name: string;
  readonly icon: string;
}

/** Single source of truth for skills (Home marquee, Skills page). */
export const SKILLS: readonly Skill[] = [
  { name: 'Angular', icon: 'https://cdn.simpleicons.org/angular/DD0031' },
  { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
  { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
  { name: 'Express', icon: 'https://cdn.simpleicons.org/express/94A3B8' },
  { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
  { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { name: 'HTML/CSS', icon: 'https://cdn.simpleicons.org/html5/E34F26' },
  { name: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032' },
  { name: 'REST APIs', icon: 'https://cdn.simpleicons.org/fastapi/009688' },
  { name: 'JWT', icon: 'https://cdn.simpleicons.org/jsonwebtokens/D63AFF' },
  { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED' },
];