import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ChipComponent } from '../chip/chip.component';

/** Infinite horizontal ticker. Items are duplicated once so the -50% loop is seamless. */
@Component({
  selector: 'app-marquee',
  imports: [ChipComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="overflow-hidden border-y border-line py-7" role="group" [attr.aria-label]="label()">
      <ul class="flex w-max animate-marquee hover:[animation-play-state:paused]">
        @for (item of loop(); track $index) {
          <li class="pr-4" [attr.aria-hidden]="$index >= items().length ? 'true' : null">
            <app-chip>{{ item }}</app-chip>
          </li>
        }
      </ul>
    </div>
  `,
})
export class MarqueeComponent {
  readonly items = input.required<readonly string[]>();
  readonly label = input('Skills');

  protected readonly loop = computed(() => [...this.items(), ...this.items()]);
}