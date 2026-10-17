import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateService } from '../guards/services/translate.service';
import { NAV_LINKS } from '../shared/config/nav-links';
import { SITE } from '../shared/config/site.config';

const FOOTER_NAV_KEYS = ['nav.home', 'nav.about', 'nav.projects', 'nav.blog', 'nav.contact'];

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="mt-24 border-t border-line bg-base text-ink">
      <div
        class="mx-auto grid max-w-[1240px] gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:px-8"
      >
        <div>
          <a routerLink="/home" class="font-display text-2xl font-bold tracking-tight">
            Moaz<span class="text-brand">.</span>Ali
          </a>
          <p class="mt-3.5 max-w-sm text-[15px] leading-relaxed text-ink-muted">
            {{ site.tagline }}
          </p>
        </div>

        <nav aria-label="Footer">
          <p class="mb-4 font-semibold">Quick Links</p>
          <ul class="flex flex-col gap-3">
            @for (link of links; track link.path) {
              <li>
                <a
                  [routerLink]="link.path"
                  class="text-[15px] text-ink-muted transition-colors hover:text-ink"
                >
                  {{ translate.translate(link.key) }}
                </a>
              </li>
            }
          </ul>
        </nav>

        <div>
          <p class="mb-4 font-semibold">Connect</p>
          <ul class="flex flex-wrap gap-2.5">
            @for (social of site.socials; track social.label) {
              <li>
                <a class="icon-btn" [href]="social.url" target="_blank" rel="noopener noreferrer">
                  {{ social.label }}
                </a>
              </li>
            }
          </ul>
        </div>
      </div>

      <p class="border-t border-line py-6 text-center text-sm text-ink-muted">
        {{ translate.translate('footer.copyright') }}
      </p>
    </footer>
  `,
})
export class FooterComponent {
  protected readonly translate = inject(TranslateService);
  protected readonly site = SITE;
  protected readonly links = NAV_LINKS.filter((link) => FOOTER_NAV_KEYS.includes(link.key));
}