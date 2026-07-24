import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '../guards/services/translate.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      id="about"
      class="relative py-24 px-4 bg-white dark:bg-slate-950 overflow-hidden"
    >
      <!-- Subtle dot-grid backdrop: a quiet nod to a code editor's canvas -->
      <div
        class="pointer-events-none absolute inset-0 opacity-[0.4] dark:opacity-[0.15]"
        style="background-image: radial-gradient(circle, currentColor 1px, transparent 1px); background-size: 28px 28px; color: rgb(99 102 241 / 0.25);"
      ></div>

      <div class="relative container mx-auto max-w-4xl">
        <!-- Eyebrow: framed like a code comment, ties the section to the subject -->
        <p class="text-center font-mono text-sm text-indigo-500 dark:text-indigo-400 mb-3 tracking-wide">
        </p>

        <h2 class="text-4xl md:text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 dark:from-indigo-400 dark:via-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent tracking-tight">
          {{ translate.translate('about.title') }}
        </h2>

        <div class="max-w-2xl mx-auto text-center">
          <p class="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            {{ translate.translate('about.description') }}
          </p>
        </div>

        <div class="mt-14 grid md:grid-cols-3 gap-6">

          <!-- Specialization -->
          <div class="group relative p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-500/10">
            <div class="w-11 h-11 rounded-xl bg-indigo-100 dark:bg-indigo-500/15 flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </div>
            <h3 class="font-semibold text-base mb-3 text-slate-900 dark:text-slate-100">Specialization</h3>
            <div class="flex flex-wrap gap-2">
              <span class="font-mono text-xs px-2 py-1 rounded-md bg-indigo-100 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300">Angular</span>
              <span class="font-mono text-xs px-2 py-1 rounded-md bg-indigo-100 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300">TypeScript</span>
              <span class="font-mono text-xs px-2 py-1 rounded-md bg-indigo-100 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300">RxJS</span>
              <span class="font-mono text-xs px-2 py-1 rounded-md bg-indigo-100 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300">ag-Grid</span>
            </div>
          </div>

          <!-- Experience -->
          <div class="group relative p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 dark:hover:border-violet-600 hover:shadow-lg hover:shadow-violet-500/10">
            <div class="w-11 h-11 rounded-xl bg-violet-100 dark:bg-violet-500/15 flex items-center justify-center mb-4 text-violet-600 dark:text-violet-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <h3 class="font-semibold text-base mb-3 text-slate-900 dark:text-slate-100">Experience</h3>
            <div class="flex flex-wrap gap-2">
              <span class="font-mono text-xs px-2 py-1 rounded-md bg-violet-100 dark:bg-violet-500/15 text-violet-700 dark:text-violet-300">Multi-Portal Systems</span>
              <span class="font-mono text-xs px-2 py-1 rounded-md bg-violet-100 dark:bg-violet-500/15 text-violet-700 dark:text-violet-300">RBAC</span>
              <span class="font-mono text-xs px-2 py-1 rounded-md bg-violet-100 dark:bg-violet-500/15 text-violet-700 dark:text-violet-300">i18n</span>
            </div>
          </div>

          <!-- Approach -->
          <div class="group relative p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-300 dark:hover:border-fuchsia-600 hover:shadow-lg hover:shadow-fuchsia-500/10">
            <div class="w-11 h-11 rounded-xl bg-fuchsia-100 dark:bg-fuchsia-500/15 flex items-center justify-center mb-4 text-fuchsia-600 dark:text-fuchsia-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <h3 class="font-semibold text-base mb-3 text-slate-900 dark:text-slate-100">Approach</h3>
            <div class="flex flex-wrap gap-2">
              <span class="font-mono text-xs px-2 py-1 rounded-md bg-fuchsia-100 dark:bg-fuchsia-500/15 text-fuchsia-700 dark:text-fuchsia-300">Clean Code</span>
              <span class="font-mono text-xs px-2 py-1 rounded-md bg-fuchsia-100 dark:bg-fuchsia-500/15 text-fuchsia-700 dark:text-fuchsia-300">Scalable UI</span>
              <span class="font-mono text-xs px-2 py-1 rounded-md bg-fuchsia-100 dark:bg-fuchsia-500/15 text-fuchsia-700 dark:text-fuchsia-300">Production-Ready</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  `
})
export class AboutComponent {
  translate = inject(TranslateService);
}