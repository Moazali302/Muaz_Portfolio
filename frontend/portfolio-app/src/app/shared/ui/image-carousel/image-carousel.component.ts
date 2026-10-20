import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { TranslateService } from '../../../guards/services/translate.service';
import { hideBrokenImage } from '../../utlis/dom';

/** Swipeable image slider (scroll-snap). Fills its parent: give the host `absolute inset-0` or a height. */
@Component({
  selector: 'app-image-carousel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block h-full' },
  template: `
    <div
      class="relative h-full"
      dir="ltr"
      role="group"
      aria-roledescription="carousel"
      tabindex="0"
      [attr.aria-label]="alt()"
      (keydown.arrowLeft)="previous()"
      (keydown.arrowRight)="next()"
    >
      <ul
        #track
        class="flex h-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth motion-reduce:scroll-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        (scroll)="onScroll()"
      >
        @for (src of images(); track src; let i = $index) {
          <li
            class="h-full w-full shrink-0 snap-center"
            role="group"
            aria-roledescription="slide"
            [attr.aria-label]="i + 1 + ' / ' + images().length"
          >
            <img
              [src]="src"
              [alt]="alt() + ' ' + (i + 1)"
              loading="lazy"
              draggable="false"
              class="h-full w-full object-cover"
              (error)="onImageError($event)"
            />
          </li>
        }
      </ul>

      @if (hasMany()) {
        <button
          type="button"
          class="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-base/80 text-ink backdrop-blur transition-colors hover:border-brand hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
          [attr.aria-label]="translate.translate('carousel.previous')"
          (click)="previous()"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          class="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-base/80 text-ink backdrop-blur transition-colors hover:border-brand hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
          [attr.aria-label]="translate.translate('carousel.next')"
          (click)="next()"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <div class="absolute inset-x-0 bottom-2 flex justify-center">
          @for (src of images(); track src; let i = $index) {
            <button
              type="button"
              class="p-1.5"
              [attr.aria-label]="translate.translate('carousel.goTo') + ' ' + (i + 1)"
              [attr.aria-current]="i === index() ? 'true' : null"
              (click)="go(i)"
            >
              <span
                class="block h-2 w-2 rounded-full transition-colors"
                [class.bg-brand]="i === index()"
                [class.bg-ink/40]="i !== index()"
              ></span>
            </button>
          }
        </div>
      }
    </div>
  `,
})
export class ImageCarouselComponent {
  protected readonly translate = inject(TranslateService);

  readonly images = input.required<readonly string[]>();
  readonly alt = input.required<string>();

  private readonly track = viewChild<ElementRef<HTMLElement>>('track');

  protected readonly index = signal(0);
  protected readonly hasMany = computed(() => this.images().length > 1);
  protected readonly onImageError = hideBrokenImage;

  constructor() {
    // A different image list (e.g. navigating to another project) starts from the first slide.
    effect(() => {
      this.images();
      untracked(() => this.scrollTo(0, 'instant'));
    });
  }

  protected onScroll(): void {
    const track = this.track()?.nativeElement;
    if (track && track.clientWidth > 0) {
      this.index.set(Math.round(track.scrollLeft / track.clientWidth));
    }
  }

  protected next(): void {
    if (this.hasMany()) {
      this.go((this.index() + 1) % this.images().length);
    }
  }

  protected previous(): void {
    if (this.hasMany()) {
      const count = this.images().length;
      this.go((this.index() - 1 + count) % count);
    }
  }

  protected go(target: number): void {
    this.scrollTo(target, 'smooth');
  }

  private scrollTo(target: number, behavior: ScrollBehavior): void {
    const track = this.track()?.nativeElement;
    track?.scrollTo({ left: target * track.clientWidth, behavior });
  }
}