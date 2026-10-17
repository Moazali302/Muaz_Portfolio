import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '../guards/services/translate.service';
import { SKILLS } from '../shared/config/skills.config';

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
  skills=SKILLS;
}

