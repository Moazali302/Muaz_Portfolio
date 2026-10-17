import { Directive, computed, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'outline';

const BASE =
  'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold transition duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand';

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-brand-ink',
  outline: 'border border-line-strong text-ink hover:border-brand',
};

@Directive({
  selector: 'a[appButton], button[appButton]',
  host: { '[class]': 'classes()' },
})
export class ButtonDirective {
  readonly variant = input<ButtonVariant>('primary');
  protected readonly classes = computed(() => `${BASE} ${VARIANTS[this.variant()]}`);
}