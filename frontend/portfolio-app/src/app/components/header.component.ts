import { Component, inject } from '@angular/core';
import{CommonModule} from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateService } from '../services/translate.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
        <a routerLink="/home" routerLinkActive="text-indigo-600 dark:text-indigo-400" [routerLinkActiveOptions]="{ exact: true }"
           class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          MoazAli
        </a>

        <div class="hidden md:flex items-center gap-6">
          <a routerLink="/home" routerLinkActive="text-indigo-600 dark:text-indigo-400" [routerLinkActiveOptions]="{ exact: true }"
             class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            {{ translate.translate('nav.home') }}
          </a>
          <a routerLink="/about" routerLinkActive="text-indigo-600 dark:text-indigo-400"
             class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            {{ translate.translate('nav.about') }}
          </a>
          <a routerLink="/skills" routerLinkActive="text-indigo-600 dark:text-indigo-400"
             class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            {{ translate.translate('nav.skills') }}
          </a>
          <a routerLink="/projects" routerLinkActive="text-indigo-600 dark:text-indigo-400"
             class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            {{ translate.translate('nav.projects') }}
          </a>
          <a routerLink="/blog" routerLinkActive="text-indigo-600 dark:text-indigo-400"
             class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            {{ translate.translate('nav.blog') }}
          </a>
          <a routerLink="/contact" routerLinkActive="text-indigo-600 dark:text-indigo-400"
             class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            {{ translate.translate('nav.contact') }}
          </a>
        </div>

        <div class="flex items-center gap-4">
          <button
            (click)="translate.toggleLang()"
            class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            [attr.aria-label]="translate.currentLang() === 'en' ? 'Switch to Urdu' : 'Switch to English'">
            {{ translate.currentLang() === 'en' ? 'اردو' : 'EN' }}
          </button>

          <button
            (click)="theme.toggleTheme()"
            class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            [attr.aria-label]="theme.theme() === 'light' ? 'Switch to dark mode' : 'Switch to light mode'">
            <svg *ngIf="theme.theme() === 'light'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <svg *ngIf="theme.theme() === 'dark'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  `
})
export class HeaderComponent {
  translate = inject(TranslateService);
  theme = inject(ThemeService);
}
