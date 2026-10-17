import { ChangeDetectionStrategy, Component, booleanAttribute, inject, input } from '@angular/core';
import { TranslateService } from '../guards/services/translate.service';
import { CardDirective } from '../shared/directives/card.directive';
import { RevealDirective } from '../shared/directives/reveal.directive';
import { ChipComponent } from '../shared/ui/chip/chip.component';
import { SectionHeaderComponent } from '../shared/ui/section-header/section-header.component';

interface Pillar {
  readonly title: string;
  readonly tags: readonly string[];
}

const PILLARS: readonly Pillar[] = [
  {
    title: 'Specialization',
    tags: ['Angular-V20+', 'TypeScript', 'RxJS', 'Reactive Forms', 'ag-Grid', 'Signals', 'NestJS'],
  },
  {
    title: 'Experience',
    tags: ['Multi-Portal Systems', 'Web Applications', 'Api Integration', 'RBAC', 'i18n'],
  },
  {
    title: 'Approach',
    tags: ['Clean Code', 'Maintainable', 'Scalable UI', 'Production-Ready'],
  },
];

/** Used as the /about page (`page` = true via route data) and as a section on Home. */
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CardDirective, ChipComponent, RevealDirective, SectionHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="about"
      class="mx-auto max-w-[1240px] px-6 lg:px-8"
      [class]="page() ? 'pt-6 lg:pt-10' : 'pt-24 lg:pt-28'"
    >
      <div appReveal>
        <app-section-header
          [eyebrow]="translate.translate('about.eyebrow')"
          [title]="translate.translate('about.heading')"
          [level]="page() ? 1 : 2"
        />
        <p class="mb-10 max-w-3xl text-[19px] leading-[1.7] text-ink-soft">
          {{ translate.translate('about.description') }}
        </p>
      </div>

      <ul class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        @for (pillar of pillars; track pillar.title) {
          <li appCard appReveal [appRevealDelay]="$index * 120" class="p-8">
            <p class="font-display text-brand">0{{ $index + 1 }}</p>
            <h3 class="mb-4 mt-5 font-display text-2xl tracking-tight">{{ pillar.title }}</h3>
            <ul class="flex flex-wrap gap-2">
              @for (tag of pillar.tags; track tag) {
                <li><app-chip size="sm">{{ tag }}</app-chip></li>
              }
            </ul>
          </li>
        }
      </ul>
    </section>
  `,
})
export class AboutComponent {
  protected readonly translate = inject(TranslateService);
  protected readonly pillars = PILLARS;

  /** Set by the router (`data: { page: true }`); true when rendered as its own page. */
  readonly page = input(false, { transform: booleanAttribute });
}