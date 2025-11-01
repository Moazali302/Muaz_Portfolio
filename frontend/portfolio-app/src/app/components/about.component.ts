import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '../services/translate.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="py-20 px-4 bg-white dark:bg-slate-900">
      <div class="container mx-auto max-w-4xl">
        <h2 class="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {{ translate.translate('about.title') }}
        </h2>
        <div class="prose prose-lg dark:prose-invert max-w-none text-center">
          <p class="text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
            {{ translate.translate('about.description') }}
          </p>
        </div>
        <div class="mt-12 grid md:grid-cols-3 gap-6">
          <div class="p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 border border-indigo-100 dark:border-slate-600">
            <div class="text-3xl mb-3">🎓</div>
            <h3 class="font-bold text-lg mb-2 text-slate-800 dark:text-slate-200">Education</h3>
            <p class="text-slate-600 dark:text-slate-400">Riphah International University</p>
            <p class="text-sm text-slate-500 dark:text-slate-500">2022 - 2026</p>
          </div>
          <div class="p-6 rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700 border border-teal-100 dark:border-slate-600">
            <div class="text-3xl mb-3">💻</div>
            <h3 class="font-bold text-lg mb-2 text-slate-800 dark:text-slate-200">Development</h3>
            <p class="text-slate-600 dark:text-slate-400">Full Stack Developer</p>
            <p class="text-sm text-slate-500 dark:text-slate-500">Web & Mobile Apps</p>
          </div>
          <div class="p-6 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 dark:from-slate-800 dark:to-slate-700 border border-pink-100 dark:border-slate-600">
            <div class="text-3xl mb-3">🚀</div>
            <h3 class="font-bold text-lg mb-2 text-slate-800 dark:text-slate-200">Passion</h3>
            <p class="text-slate-600 dark:text-slate-400">Innovation & Learning</p>
            <p class="text-sm text-slate-500 dark:text-slate-500">Always Exploring</p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class AboutComponent {
  translate = inject(TranslateService);
}

