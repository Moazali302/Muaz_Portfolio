import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mb-10 flex flex-wrap items-end justify-between gap-4 sm:mb-12">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.12em] text-brand">{{ eyebrow() }}</p>
        <h2
          class="mt-4 max-w-3xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-tight"
        >
          {{ title() }}
        </h2>
      </div>
      <ng-content />
    </div>
  `,
})
export class SectionHeaderComponent {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
}