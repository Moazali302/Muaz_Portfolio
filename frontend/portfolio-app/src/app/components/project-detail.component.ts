import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { ApiService, Project } from '../guards/services/api.service';
import { TranslateService } from '../guards/services/translate.service';
import { ButtonDirective } from '../shared/directives/button.directive';
import { CardDirective } from '../shared/directives/card.directive';
import { RevealDirective } from '../shared/directives/reveal.directive';
import { ChipComponent } from '../shared/ui/chip/chip.component';
import { LoadState,toLoadState } from '../shared/utlis/load-state';
import { ImageCarouselComponent } from '../shared/ui/image-carousel/image-carousel.component';
import { projectImages } from '../shared/utlis/project-images';

interface ProjectView {
  readonly project: Project;
  readonly next: Project | null;
}

interface MetaItem {
  readonly labelKey: string;
  readonly value: string;
}

interface Section {
  readonly titleKey: string;
  readonly text: string;
}

function pickNext(current: Project, all: Project[]): Project | null {
  if (all.length < 2) {
    return null;
  }
  const index = all.findIndex((project) => project._id === current._id);
  return all[(index + 1) % all.length];
}

const SECTION_HEADING = 'mb-4 mt-12 font-display text-[1.75rem] tracking-tight first:mt-0';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink,ImageCarouselComponent, ButtonDirective, CardDirective, ChipComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-auto max-w-[1240px] px-6 pb-8 lg:px-8">
      <a
        routerLink="/projects"
        class="inline-flex items-center gap-2 text-[15px] text-ink-muted transition-colors hover:text-ink"
      >
        <span aria-hidden="true" class="inline-block rtl:rotate-180">←</span>
        {{ translate.translate('caseStudy.back') }}
      </a>

      @if (view(); as v) {
        <header class="animate-reveal pb-8 pt-8">
          <p class="text-sm font-semibold uppercase tracking-[0.12em] text-brand">
            {{ translate.translate('caseStudy.eyebrow') }}
            @if (v.project.category) {
              · {{ v.project.category }}
            }
          </p>
          <h1
            class="mb-5 mt-4 font-display text-[length:clamp(2.5rem,5.4vw,4.25rem)] leading-[1.05] tracking-tight"
          >
            {{ v.project.name }}
          </h1>
          <p class="max-w-2xl text-lg leading-relaxed text-ink-muted">{{ v.project.description }}</p>
        </header>

                  <div
          class="relative mb-8 h-[260px] overflow-hidden rounded-[20px] border border-line bg-gradient-to-br from-brand/30 to-iris/30 sm:h-[380px]"
        >
          <span
            class="absolute inset-0 flex items-center justify-center font-display text-7xl font-bold"
            aria-hidden="true"
          >
            {{ v.project.name[0] }}
          </span>
          @if (heroImages().length) {
            <app-image-carousel class="absolute inset-0" [images]="heroImages()" [alt]="v.project.name" />
          }
        </div>

        @if (meta().length > 0) {
          <ul class="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            @for (item of meta(); track item.labelKey) {
              <li appCard class="px-6 py-5">
                <p class="text-xs uppercase tracking-[0.08em] text-ink-muted">
                  {{ translate.translate(item.labelKey) }}
                </p>
                <p class="mt-2 font-display text-[1.1875rem] tracking-tight">{{ item.value }}</p>
              </li>
            }
          </ul>
        }

        <div class="flex flex-wrap items-start gap-12">
          <div class="min-w-0 flex-[2_1_520px]">
            @for (section of sections(); track section.titleKey) {
              <section appReveal>
                <h2 class="${SECTION_HEADING}">{{ translate.translate(section.titleKey) }}</h2>
                <p class="text-[17px] leading-[1.75] text-ink-soft">{{ section.text }}</p>
              </section>
            }

            @if (v.project.caseStudy?.features?.length) {
              <section appReveal>
                <h2 class="${SECTION_HEADING}">{{ translate.translate('caseStudy.features') }}</h2>
                <ul class="grid gap-4 sm:grid-cols-2">
                  @for (feature of v.project.caseStudy?.features; track feature.title) {
                    <li appCard class="p-6">
                      <p class="font-display text-brand">0{{ $index + 1 }}</p>
                      <h3 class="mb-2 mt-3.5 font-display text-xl tracking-tight">{{ feature.title }}</h3>
                      <p class="text-[15px] leading-relaxed text-ink-muted">{{ feature.description }}</p>
                    </li>
                  }
                </ul>
              </section>
            }

            @if (v.project.caseStudy?.gallery?.length) {
              <section appReveal>
                <h2 class="${SECTION_HEADING}">{{ translate.translate('caseStudy.screens') }}</h2>
                <ul class="grid gap-4 sm:grid-cols-2">
                  @for (src of v.project.caseStudy?.gallery; track src) {
                    <li class="overflow-hidden rounded-2xl border border-line">
                      <img [src]="src" alt="" loading="lazy" class="h-full w-full object-cover" />
                    </li>
                  }
                </ul>
              </section>
            }
          </div>

          <aside class="flex min-w-0 flex-[1_1_280px] flex-col gap-5">
            <div appCard class="p-7">
              <p class="mb-4 text-xs uppercase tracking-[0.08em] text-ink-muted">
                {{ translate.translate('caseStudy.techStack') }}
              </p>
              <ul class="flex flex-wrap gap-2">
                @for (tech of v.project.techStack; track tech) {
                  <li><app-chip size="sm">{{ tech }}</app-chip></li>
                }
              </ul>
            </div>

            @if (v.project.liveUrl || v.project.githubUrl) {
              <div appCard class="p-7">
                <p class="mb-4 text-xs uppercase tracking-[0.08em] text-ink-muted">
                  {{ translate.translate('caseStudy.links') }}
                </p>
                <div class="flex flex-col gap-3">
                  @if (v.project.liveUrl; as url) {
                    <a appButton [href]="url" target="_blank" rel="noopener noreferrer">
                      {{ translate.translate('caseStudy.live') }}
                    </a>
                  }
                  @if (v.project.githubUrl; as url) {
                    <a appButton variant="outline" [href]="url" target="_blank" rel="noopener noreferrer">
                      {{ translate.translate('projects.github') }}
                    </a>
                  }
                </div>
              </div>
            }
          </aside>
        </div>

        @if (v.next; as next) {
          <a
            appCard
            appReveal
            [routerLink]="['/projects', next.slug]"
            class="mt-20 flex flex-wrap items-center justify-between gap-4 p-7"
          >
            <span>
              <span class="block text-[13px] text-ink-muted">{{ translate.translate('caseStudy.next') }}</span>
              <span class="mt-1.5 block font-display text-[1.375rem] tracking-tight">{{ next.name }}</span>
            </span>
            <span aria-hidden="true" class="inline-block text-2xl text-brand rtl:rotate-180">→</span>
          </a>
        }
      } @else if (state().status === 'loading') {
        <div class="mt-10 space-y-6" aria-busy="true">
          <div appCard class="h-10 w-2/3 animate-pulse"></div>
          <div appCard class="h-[320px] animate-pulse"></div>
        </div>
      } @else {
        <div appCard class="mt-10 flex flex-wrap items-center justify-between gap-4 p-8" role="alert">
          <p class="text-ink-soft">
            {{ translate.translate(notFound() ? 'caseStudy.notFound' : 'projects.error') }}
          </p>
          <a appButton variant="outline" routerLink="/projects">
            {{ translate.translate('caseStudy.back') }}
          </a>
        </div>
      }
    </div>
  `,
})
export class ProjectDetailComponent {
  protected readonly translate = inject(TranslateService);
  private readonly api = inject(ApiService);
  private readonly titleService = inject(Title);

  /** Bound from the `:slug` route param (withComponentInputBinding). */
  readonly slug = input.required<string>();

  protected readonly state = toSignal(
    toObservable(this.slug).pipe(
      switchMap((slug) =>
        forkJoin({
          project: this.api.getProject(slug),
          all: this.api.getProjects().pipe(catchError(() => of([] as Project[]))),
        }).pipe(
          map(({ project, all }): ProjectView => ({ project, next: pickNext(project, all) })),
          toLoadState(),
        ),
      ),
    ),
    { initialValue: { status: 'loading' } as LoadState<ProjectView> },
  );

  protected readonly view = computed(() => {
    const state = this.state();
    return state.status === 'ready' ? state.data : null;
  });

  protected readonly notFound = computed(() => {
    const state = this.state();
    return state.status === 'error' && state.notFound;
  });

    protected readonly heroImages = computed(() => {
    const view = this.view();
    return view ? projectImages(view.project) : [];
  });

  protected readonly meta = computed<MetaItem[]>(() => {
    const view = this.view();
    if (!view) {
      return [];
    }
    const { project } = view;
    const items = [
      { labelKey: 'caseStudy.role', value: project.caseStudy?.role },
      { labelKey: 'caseStudy.timeline', value: project.caseStudy?.timeline },
      { labelKey: 'caseStudy.client', value: project.caseStudy?.client },
      { labelKey: 'caseStudy.stack', value: project.techStack.join(' · ') },
    ];
    return items.filter((item): item is MetaItem => !!item.value);
  });

  protected readonly sections = computed<Section[]>(() => {
    const view = this.view();
    if (!view) {
      return [];
    }
    const { caseStudy, description } = view.project;
    const items = [
      { titleKey: 'caseStudy.overview', text: caseStudy?.overview ?? description },
      { titleKey: 'caseStudy.challenge', text: caseStudy?.challenge },
      { titleKey: 'caseStudy.solution', text: caseStudy?.solution },
    ];
    return items.filter((item): item is Section => !!item.text);
  });

  constructor() {
    effect(() => {
      const view = this.view();
      if (view) {
        this.titleService.setTitle(`${view.project.name} | MoazAli`);
      }
    });
  }
}