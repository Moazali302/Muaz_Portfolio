import { ChangeDetectionStrategy, Component, input } from '@angular/core';

const HEADING_CLASSES =
  'mt-4 max-w-3xl font-display text-[length:clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-tight';

@Component({
  selector: 'app-section-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mb-10 flex flex-wrap items-end justify-between gap-4 sm:mb-12">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.12em] text-brand">{{ eyebrow() }}</p>
        @if (level() === 1) {
          <h1 [class]="headingClasses">{{ title() }}</h1>
        } @else {
          <h2 [class]="headingClasses">{{ title() }}</h2>
        }
        @if (subtitle()) {
          <p class="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">{{ subtitle() }}</p>
        }
      </div>
      <ng-content />
    </div>
  `,
})
export class SectionHeaderComponent {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly subtitle = input('');
  readonly level = input<1 | 2>(2);

  protected readonly headingClasses = HEADING_CLASSES;
}