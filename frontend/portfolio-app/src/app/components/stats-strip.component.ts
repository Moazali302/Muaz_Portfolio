import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateService } from '../guards/services/translate.service';
import { CardDirective } from '../shared/directives/card.directive';
import { RevealDirective } from '../shared/directives/reveal.directive';

interface StatKeys {
  readonly valueKey: string;
  readonly labelKey: string;
}

const STATS: readonly StatKeys[] = [
  { valueKey: 'stats.experience.value', labelKey: 'stats.experience.label' },
  { valueKey: 'stats.roles.value', labelKey: 'stats.roles.label' },
  { valueKey: 'stats.repos.value', labelKey: 'stats.repos.label' },
];

@Component({
  selector: 'app-stats-strip',
  standalone: true,
  imports: [CardDirective, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="mx-auto max-w-[1240px] px-6 pt-16 lg:px-8 lg:pt-[72px]" aria-label="Highlights">
      <ul class="grid gap-5 sm:grid-cols-3">
        @for (stat of stats; track stat.labelKey) {
          <li appCard appReveal [appRevealDelay]="$index * 120" class="p-8 text-center">
            <p class="font-display text-5xl font-bold tracking-tight text-brand">
              {{ translate.translate(stat.valueKey) }}
            </p>
            <p class="mt-1 text-ink-muted">{{ translate.translate(stat.labelKey) }}</p>
          </li>
        }
      </ul>
    </section>
  `,
})
export class StatsStripComponent {
  protected readonly translate = inject(TranslateService);
  protected readonly stats = STATS;
}