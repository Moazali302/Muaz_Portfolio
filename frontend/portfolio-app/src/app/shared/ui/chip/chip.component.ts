import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'classes()' },
  template: `<ng-content />`,
})
export class ChipComponent {
  readonly size = input<'md' | 'sm'>('md');

  protected readonly classes = computed(() =>
    this.size() === 'sm'
      ? 'inline-block whitespace-nowrap rounded-full border border-line-strong px-3 py-1.5 text-[13px] text-ink-soft'
      : 'inline-block whitespace-nowrap rounded-full border border-line-strong px-4 py-2 text-sm text-ink-soft',
  );
}