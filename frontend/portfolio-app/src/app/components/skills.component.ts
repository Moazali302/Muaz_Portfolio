import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '../guards/services/translate.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="skills" class="py-20 px-4 bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
      <div class="container mx-auto max-w-6xl">
        <h2 class="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {{ translate.translate('skills.title') }}
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          @for (skill of skills; track skill.name) {
            <div class="group p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 transform hover:-translate-y-2">
            <div class="flex justify-center mb-3">
            <img [src]="skill.icon" [alt]="skill.name" class="w-10 h-10 object-contain" />
            </div>
              <p class="text-center font-semibold text-slate-800 dark:text-slate-200">{{ skill.name }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class SkillsComponent {
  translate = inject(TranslateService);
  
  skills = [
  { name: 'Angular', icon: 'https://cdn.simpleicons.org/angular/DD0031' },
  { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
  { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
  { name: 'Express', icon: 'https://cdn.simpleicons.org/express/000000' },
  { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
  { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { name: 'HTML/CSS', icon: 'https://cdn.simpleicons.org/html5/E34F26' },
  { name: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032' },
  { name: 'REST APIs', icon: 'https://cdn.simpleicons.org/fastapi/009688' },
  { name: 'JWT', icon: 'https://cdn.simpleicons.org/jsonwebtokens/000000' },
  { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED' }
];
}

