import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateService } from '../guards/services/translate.service';
import { ThemeService } from '../guards/services/theme.service';
import { NAV_LINKS } from '../shared/config/nav-links';
import { ButtonDirective } from '../shared/directives/button.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ButtonDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'closeMenu()' },
  template: `
    <header class="relative z-40 bg-base text-ink">
      <nav
        class="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-6 py-5 lg:px-8 lg:py-7"
        aria-label="Primary"
      >
        <a
          routerLink="/home"
          class="font-display text-2xl font-bold tracking-tight"
          (click)="closeMenu()"
        >
          Moaz<span class="text-brand">.</span>Ali
        </a>

        <ul class="hidden items-center gap-7 lg:flex">
          @for (link of links; track link.path) {
            <li>
              <a
                [routerLink]="link.path"
                routerLinkActive="!border-brand !text-ink"
                [routerLinkActiveOptions]="{ exact: link.exact }"
                class="border-b-2 border-transparent pb-1.5 text-[15px] text-ink-muted transition-colors hover:text-ink"
              >
                {{ translate.translate(link.key) }}
              </a>
            </li>
          }
        </ul>

        <div class="flex items-center gap-2.5">
          <button
            type="button"
            class="icon-btn"
            (click)="translate.toggleLang()"
            [attr.aria-label]="translate.currentLang() === 'en' ? 'Switch to Urdu' : 'Switch to English'"
          >
            {{ translate.currentLang() === 'en' ? 'اردو' : 'EN' }}
          </button>

          <button
            type="button"
            class="icon-btn"
            (click)="theme.toggleTheme()"
            [attr.aria-label]="theme.theme() === 'light' ? 'Switch to dark mode' : 'Switch to light mode'"
          >
            <svg
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              @if (theme.theme() === 'dark') {
                <circle cx="12" cy="12" r="4" />
                <path
                  d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
                />
              } @else {
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              }
            </svg>
          </button>

          <div class="hidden sm:block">
            <a appButton routerLink="/contact">{{ translate.translate('hero.hire') }}</a>
          </div>

          <button
            type="button"
            class="icon-btn lg:hidden"
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
            [attr.aria-expanded]="isMenuOpen()"
            (click)="toggleMenu()"
          >
            <svg
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              aria-hidden="true"
            >
              @if (isMenuOpen()) {
                <path d="M6 6l12 12M18 6L6 18" />
              } @else {
                <path d="M4 7h16M4 12h16M4 17h16" />
              }
            </svg>
          </button>
        </div>
      </nav>

      @if (isMenuOpen()) {
        <div
          id="mobile-menu"
          class="absolute inset-x-0 top-full border-y border-line bg-base/95 px-6 pb-8 backdrop-blur lg:hidden"
        >
          <ul>
            @for (link of links; track link.path) {
              <li>
                <a
                  [routerLink]="link.path"
                  routerLinkActive="!text-brand"
                  [routerLinkActiveOptions]="{ exact: link.exact }"
                  class="flex min-h-[48px] items-center border-b border-line text-lg"
                  (click)="closeMenu()"
                >
                  {{ translate.translate(link.key) }}
                </a>
              </li>
            }
          </ul>
          <a appButton routerLink="/contact" class="mt-6 w-full" (click)="closeMenu()">
            {{ translate.translate('hero.hire') }}
          </a>
        </div>
      }
    </header>
  `,
})
export class HeaderComponent {
  protected readonly translate = inject(TranslateService);
  protected readonly theme = inject(ThemeService);
  protected readonly links = NAV_LINKS;
  protected readonly isMenuOpen = signal(false);

  protected toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}