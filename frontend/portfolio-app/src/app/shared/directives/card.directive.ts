import { Directive } from '@angular/core';

/** Surface with the hover lift + brand border used across the portfolio. */
@Directive({
  selector: '[appCard]',
  host: {
    class:
      'rounded-[20px] border border-line bg-raised transition duration-300 hover:-translate-y-1.5 hover:border-brand',
  },
})
export class CardDirective {}