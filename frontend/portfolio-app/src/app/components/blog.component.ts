import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, switchMap } from 'rxjs';
import { ApiService, BlogPost } from '../guards/services/api.service';
import { TranslateService } from '../guards/services/translate.service';
import { ButtonDirective } from '../shared/directives/button.directive';
import { CardDirective } from '../shared/directives/card.directive';
import { RevealDirective } from '../shared/directives/reveal.directive';
import { ChipComponent } from '../shared/ui/chip/chip.component';
import { SectionHeaderComponent } from '../shared/ui/section-header/section-header.component';
import { LoadState,toLoadState } from '../shared/utlis/load-state';

const SKELETON_COUNT = 3;
const VISIBLE_TAGS = 3;

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    ButtonDirective,
    CardDirective,
    RevealDirective,
    ChipComponent,
    SectionHeaderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="blog" class="mx-auto max-w-[1000px] px-6 pt-6 lg:px-8 lg:pt-10">
      <app-section-header
        class="block animate-reveal"
        [level]="1"
        [eyebrow]="translate.translate('blog.eyebrow')"
        [title]="translate.translate('blog.heading')"
        [subtitle]="translate.translate('blog.subheading')"
      />

      @switch (status()) {
        @case ('loading') {
          <ul class="flex flex-col gap-5" aria-busy="true">
            @for (_ of skeletons; track $index) {
              <li appCard class="h-[200px] animate-pulse"></li>
            }
          </ul>
        }
        @case ('error') {
          <div appCard class="flex flex-wrap items-center justify-between gap-4 p-8" role="alert">
            <p class="text-ink-soft">{{ translate.translate('blog.error') }}</p>
            <button appButton variant="outline" type="button" (click)="reload()">
              {{ translate.translate('common.retry') }}
            </button>
          </div>
        }
        @default {
          @if (posts().length === 0) {
            <p class="text-ink-muted">{{ translate.translate('blog.empty') }}</p>
          } @else {
            <ul class="flex flex-col gap-5">
              @for (post of posts(); track post._id) {
                <li appReveal [appRevealDelay]="$index * 120">
                  <a
                    appCard
                    [routerLink]="['/blog', post.slug]"
                    class="grid gap-x-8 gap-y-3 p-6 sm:grid-cols-[1fr_auto] sm:px-8 sm:py-7"
                  >
                    <h2 class="font-display text-2xl leading-snug tracking-tight sm:text-[1.625rem]">
                      {{ post.title }}
                    </h2>
                    <p class="font-mono text-sm text-ink-muted sm:text-end">
                      {{ post.createdAt ? (post.createdAt | date: 'MMM y') : '' }}
                    </p>

                    <p class="leading-relaxed text-ink-muted">{{ post.excerpt }}</p>
                    <span
                      class="inline-flex items-center gap-1.5 font-semibold text-brand sm:justify-self-end"
                    >
                      {{ translate.translate('blog.read') }}
                      <span aria-hidden="true" class="inline-block rtl:rotate-180">→</span>
                    </span>

                    <ul class="flex flex-wrap gap-2 sm:col-span-2" aria-label="Tags">
                      @for (tag of visibleTags(post); track tag) {
                        <li><app-chip size="sm">{{ tag }}</app-chip></li>
                      }
                    </ul>
                  </a>
                </li>
              }
            </ul>
          }
        }
      }
    </section>
  `,
})
export class BlogComponent {
  protected readonly translate = inject(TranslateService);
  private readonly api = inject(ApiService);
  private readonly reload$ = new BehaviorSubject<void>(undefined);

  protected readonly skeletons = Array.from({ length: SKELETON_COUNT });

  private readonly state = toSignal(
    this.reload$.pipe(switchMap(() => this.api.getBlogPosts().pipe(toLoadState()))),
    { initialValue: { status: 'loading' } as LoadState<BlogPost[]> },
  );

  protected readonly status = computed(() => this.state().status);
  protected readonly posts = computed(() => {
    const state = this.state();
    return state.status === 'ready' ? state.data : [];
  });

  protected visibleTags(post: BlogPost): string[] {
    return post.tags.slice(0, VISIBLE_TAGS);
  }

  protected reload(): void {
    this.reload$.next();
  }
}