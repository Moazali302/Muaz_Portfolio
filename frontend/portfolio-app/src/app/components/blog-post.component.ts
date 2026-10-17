import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { DatePipe, DOCUMENT } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { catchError, forkJoin, from, map, of, switchMap } from 'rxjs';
import { ApiService, BlogPost } from '../guards/services/api.service';
import { TranslateService } from '../guards/services/translate.service';
import { ButtonDirective } from '../shared/directives/button.directive';
import { CardDirective } from '../shared/directives/card.directive';
import { RevealDirective } from '../shared/directives/reveal.directive';
import { ChipComponent } from '../shared/ui/chip/chip.component';
import { BodyBlock,estimateReadMinutes,parseBlogBody } from '../shared/utlis/blog-body';
import { LoadState,toLoadState } from '../shared/utlis/load-state';
import { Neighbours,neighboursOf } from '../shared/utlis/neighbours';

interface PostView extends Neighbours<BlogPost> {
  readonly post: BlogPost;
  readonly blocks: BodyBlock[];
  readonly minutes: number;
}

const COPIED_RESET_MS = 2000;
const LINKEDIN_SHARE_URL = 'https://www.linkedin.com/sharing/share-offsite/?url=';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [DatePipe, RouterLink, ButtonDirective, CardDirective, RevealDirective, ChipComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-auto max-w-[1240px] px-6 pb-8 lg:px-8">
      <a
        routerLink="/blog"
        class="inline-flex items-center gap-2 text-[15px] text-ink-muted transition-colors hover:text-ink"
      >
        <span aria-hidden="true" class="inline-block rtl:rotate-180">←</span>
        {{ translate.translate('blogPost.back') }}
      </a>

      @switch (status()) {
        @case ('loading') {
          <div class="mt-10 space-y-6" aria-busy="true">
            <div appCard class="h-10 w-2/3 animate-pulse"></div>
            <div appCard class="h-[320px] animate-pulse"></div>
          </div>
        }
        @case ('error') {
          <div appCard class="mt-10 flex flex-wrap items-center justify-between gap-4 p-8" role="alert">
            <p class="text-ink-soft">{{ translate.translate('blogPost.notFound') }}</p>
            <a appButton variant="outline" routerLink="/blog">
              {{ translate.translate('blogPost.back') }}
            </a>
          </div>
        }
        @default {
          @if (view(); as v) {
            <header class="max-w-3xl animate-reveal pb-10 pt-8">
              @if (v.post.tags.length) {
                <ul class="mb-5 flex flex-wrap gap-2">
                  @for (tag of v.post.tags; track tag) {
                    <li><app-chip size="sm">{{ tag }}</app-chip></li>
                  }
                </ul>
              }
              <h1
                class="mb-5 font-display text-[length:clamp(2.25rem,4.6vw,3.75rem)] leading-[1.1] tracking-tight"
              >
                {{ v.post.title }}
              </h1>
              <p class="text-ink-muted">
                MoazAli
                @if (v.post.createdAt) {
                  · {{ v.post.createdAt | date: 'MMM y' }}
                }
                · {{ v.minutes }} {{ translate.translate('blogPost.minRead') }}
              </p>
            </header>

            <div class="flex flex-wrap items-start gap-12">
              <article class="min-w-0 flex-[2_1_520px]">
                @for (block of v.blocks; track $index) {
                  @if (block.type === 'code') {
                    <div class="my-6 overflow-hidden rounded-[14px] border border-line bg-[#050810]">
                      @if (block.lang) {
                        <p class="border-b border-line px-5 py-2 font-mono text-xs text-slate-400">
                          {{ block.lang }}
                        </p>
                      }
                      <pre class="overflow-x-auto p-5 font-mono text-sm leading-relaxed text-slate-300" dir="ltr"><code>{{ block.content }}</code></pre>
                    </div>
                  } @else if (block.type === 'heading') {
                    <h2
                      [id]="block.id"
                      class="mb-4 mt-12 scroll-mt-6 font-display text-[1.75rem] tracking-tight"
                    >
                      {{ block.content }}
                    </h2>
                  } @else {
                    <p class="mb-5 whitespace-pre-line text-[17px] leading-[1.75] text-ink-soft">
                      {{ block.content }}
                    </p>
                  }
                }
              </article>

              <aside class="flex min-w-0 flex-[1_1_280px] flex-col gap-5">
                @if (headings().length) {
                  <nav appCard class="p-7" [attr.aria-label]="translate.translate('blogPost.onThisPage')">
                    <p class="mb-4 text-xs uppercase tracking-[0.08em] text-ink-muted">
                      {{ translate.translate('blogPost.onThisPage') }}
                    </p>
                    <ul class="flex flex-col gap-3.5 text-[15px]">
                      @for (heading of headings(); track heading.id) {
                        <li>
                          <button
                            type="button"
                            class="text-start text-ink-muted transition-colors hover:text-brand"
                            (click)="scrollTo(heading.id)"
                          >
                            {{ heading.content }}
                          </button>
                        </li>
                      }
                    </ul>
                  </nav>
                }

                <div appCard class="p-7">
                  <p class="mb-4 text-xs uppercase tracking-[0.08em] text-ink-muted">
                    {{ translate.translate('blogPost.author') }}
                  </p>
                  <div class="flex items-center gap-3.5">
                    <span
                      class="h-[52px] w-[52px] shrink-0 rounded-full bg-gradient-to-br from-brand to-iris"
                      aria-hidden="true"
                    ></span>
                    <div>
                      <p class="font-semibold">MoazAli</p>
                      <p class="text-sm text-ink-muted">{{ translate.translate('blogPost.authorRole') }}</p>
                    </div>
                  </div>
                </div>

                <div appCard class="p-7">
                  <p class="mb-4 text-xs uppercase tracking-[0.08em] text-ink-muted">
                    {{ translate.translate('blogPost.share') }}
                  </p>
                  <div class="flex flex-wrap gap-2.5">
                    <button type="button" class="icon-btn" (click)="shareOnLinkedIn()">
                      {{ translate.translate('blogPost.shareLinkedIn') }}
                    </button>
                    <button type="button" class="icon-btn" (click)="copyLink()" aria-live="polite">
                      {{ translate.translate(copied() ? 'blogPost.copied' : 'blogPost.copyLink') }}
                    </button>
                  </div>
                </div>
              </aside>
            </div>

            @if (v.previous || v.next) {
              <nav
                class="mt-20 grid gap-4 sm:grid-cols-2"
                [attr.aria-label]="translate.translate('blog.eyebrow')"
              >
                @if (v.previous; as prev) {
                  <a appCard [routerLink]="['/blog', prev.slug]" class="block p-6">
                    <span class="block text-[13px] text-ink-muted">
                      <span aria-hidden="true" class="inline-block rtl:rotate-180">←</span>
                      {{ translate.translate('blogPost.previous') }}
                    </span>
                    <span class="mt-2 block font-display text-lg leading-snug tracking-tight">
                      {{ prev.title }}
                    </span>
                  </a>
                } @else {
                  <span></span>
                }
                @if (v.next; as next) {
                  <a appCard [routerLink]="['/blog', next.slug]" class="block p-6 sm:text-end">
                    <span class="block text-[13px] text-ink-muted">
                      {{ translate.translate('blogPost.next') }}
                      <span aria-hidden="true" class="inline-block rtl:rotate-180">→</span>
                    </span>
                    <span class="mt-2 block font-display text-lg leading-snug tracking-tight">
                      {{ next.title }}
                    </span>
                  </a>
                }
              </nav>
            }
          }
        }
      }
    </div>
  `,
})
export class BlogPostComponent {
  protected readonly translate = inject(TranslateService);
  private readonly api = inject(ApiService);
  private readonly titleService = inject(Title);
  private readonly document = inject(DOCUMENT);

  /** Bound from the `:slug` route param (withComponentInputBinding). */
  readonly slug = input.required<string>();

  protected readonly copied = signal(false);

  private readonly state = toSignal(
    toObservable(this.slug).pipe(
      switchMap((slug) =>
        forkJoin({
          post: this.api.getBlogPost(slug),
          all: this.api.getBlogPosts().pipe(catchError(() => of([] as BlogPost[]))),
        }).pipe(
          map(({ post, all }): PostView => ({
            post,
            blocks: parseBlogBody(post.body),
            minutes: estimateReadMinutes(post.body),
            ...neighboursOf(all, (item) => item._id === post._id),
          })),
          toLoadState(),
        ),
      ),
    ),
    { initialValue: { status: 'loading' } as LoadState<PostView> },
  );

  protected readonly status = computed(() => this.state().status);
  protected readonly view = computed(() => {
    const state = this.state();
    return state.status === 'ready' ? state.data : null;
  });

  protected readonly headings = computed(() =>
    (this.view()?.blocks ?? []).filter(
      (block): block is Extract<BodyBlock, { type: 'heading' }> => block.type === 'heading',
    ),
  );

  constructor() {
    effect(() => {
      const view = this.view();
      if (view) {
        this.titleService.setTitle(`${view.post.title} | MoazAli`);
      }
    });
  }

  protected scrollTo(id: string): void {
    this.document.getElementById(id)?.scrollIntoView({ block: 'start' });
  }

  protected shareOnLinkedIn(): void {
    const url = encodeURIComponent(this.document.location.href);
    window.open(`${LINKEDIN_SHARE_URL}${url}`, '_blank', 'noopener,noreferrer');
  }

  protected async copyLink(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.document.location.href);
    } catch {
      return; // clipboard unavailable (insecure context / permission denied)
    }
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), COPIED_RESET_MS);
  }
}