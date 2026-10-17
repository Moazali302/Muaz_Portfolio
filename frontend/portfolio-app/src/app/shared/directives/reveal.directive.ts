import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, OnDestroy, OnInit, PLATFORM_ID, inject, input } from '@angular/core';

/**
 * Fades an element up the first time it scrolls into view.
 * Usage: <div appReveal [appRevealDelay]="120"> ... </div>
 */
@Directive({ selector: '[appReveal]' })
export class RevealDirective implements OnInit, OnDestroy {
  readonly delay = input(0, { alias: 'appRevealDelay' });

  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    if (!this.isBrowser) {
      return;
    }
    this.element.classList.add('reveal-pending');
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }
        this.element.style.animationDelay = `${this.delay()}ms`;
        this.element.classList.remove('reveal-pending');
        this.element.classList.add('animate-reveal');
        this.observer?.disconnect();
      },
      { threshold: 0.15 },
    );
    this.observer.observe(this.element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}