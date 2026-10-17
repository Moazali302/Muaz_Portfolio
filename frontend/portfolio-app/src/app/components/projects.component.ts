import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  booleanAttribute,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { ApiService, Project } from '../guards/services/api.service';
import { TranslateService } from '../guards/services/translate.service';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ButtonDirective } from '../shared/directives/button.directive';
import { CardDirective } from '../shared/directives/card.directive';
import { RevealDirective } from '../shared/directives/reveal.directive';
import { SectionHeaderComponent } from '../shared/ui/section-header/section-header.component';

type LoadStatus = 'loading' | 'ready' | 'error';

const FEATURED_LIMIT = 3;
const FIELD_CLASSES =
  'h-14 rounded-[14px] border border-line-strong bg-raised px-5 text-base text-ink placeholder:text-ink-muted focus:border-brand focus:outline-none';

/** Used as the /projects page (route data `page: true`) and as the featured section on Home. */
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    RouterLink,
    ButtonDirective,
    CardDirective,
    RevealDirective,
    ProjectCardComponent,
    SectionHeaderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="projects"
      class="mx-auto max-w-[1240px] px-6 lg:px-8"
      [class]="page() ? 'pt-6 lg:pt-10' : 'pt-24 lg:pt-28'"
    >
      <app-section-header
        [eyebrow]="translate.translate('projects.eyebrow')"
        [title]="translate.translate('projects.heading')"
        [level]="page() ? 1 : 2"
      >
        @if (!page()) {
          <a appButton variant="outline" routerLink="/projects">
            {{ translate.translate('projects.viewAll') }}
          </a>
        }
      </app-section-header>

      @if (page() && status() === 'ready') {
        <div class="mb-10 flex flex-wrap gap-4">
          <input
            type="search"
            [class]="fieldClasses + ' min-w-[240px] flex-1'"
            [attr.aria-label]="translate.translate('projects.search')"
            [placeholder]="translate.translate('projects.search')"
            [value]="searchQuery()"
            (input)="onSearch($event)"
          />
          <select
            [class]="fieldClasses"
            [attr.aria-label]="translate.translate('projects.filter')"
            [value]="selectedTech()"
            (change)="onFilter($event)"
          >
            <option value="">{{ translate.translate('projects.filter') }}</option>
            @for (tech of technologies(); track tech) {
              <option [value]="tech">{{ tech }}</option>
            }
          </select>
        </div>
      }

      @switch (status()) {
        @case ('loading') {
          <ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
            @for (_ of skeletons; track $index) {
              <li appCard class="h-[420px] animate-pulse"></li>
            }
          </ul>
        }
        @case ('error') {
          <div appCard class="flex flex-wrap items-center justify-between gap-4 p-8" role="alert">
            <p class="text-ink-soft">{{ translate.translate('projects.error') }}</p>
            <button appButton variant="outline" type="button" (click)="loadProjects()">
              {{ translate.translate('projects.retry') }}
            </button>
          </div>
        }
        @default {
          @if (filteredProjects().length === 0) {
            <p class="text-ink-muted">{{ translate.translate('projects.empty') }}</p>
          } @else {
            <ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              @for (project of filteredProjects(); track project._id) {
                <li appReveal [appRevealDelay]="($index % 3) * 120">
                  <app-project-card [project]="project" />
                </li>
              }
            </ul>
          }
        }
      }
    </section>
  `,
})
export class ProjectsComponent implements OnInit {
  protected readonly translate = inject(TranslateService);
  private readonly api = inject(ApiService);
  private readonly destroyRef = inject(DestroyRef);

  /** Set by the router (`data: { page: true }`); false when embedded on Home. */
  readonly page = input(false, { transform: booleanAttribute });

  protected readonly fieldClasses = FIELD_CLASSES;
  protected readonly skeletons = Array.from({ length: FEATURED_LIMIT });

  protected readonly status = signal<LoadStatus>('loading');
  protected readonly projects = signal<Project[]>([]);
  protected readonly searchQuery = signal('');
  protected readonly selectedTech = signal('');

  protected readonly technologies = computed(() =>
    [...new Set(this.projects().flatMap((project) => project.techStack))].sort(),
  );

  protected readonly filteredProjects = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const tech = this.selectedTech();

    return this.projects().filter((project) => {
      const matchesTech = !tech || project.techStack.includes(tech);
      const matchesQuery =
        !query ||
        [project.name, project.description, ...project.techStack].some((value) =>
          value.toLowerCase().includes(query),
        );
      return matchesTech && matchesQuery;
    });
  });

  ngOnInit(): void {
    this.loadProjects();
  }

  protected loadProjects(): void {
    this.status.set('loading');

    const request$ = this.page()
      ? this.api.getProjects()
      : this.api.getProjects({ featured: true, limit: FEATURED_LIMIT });

    request$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (projects) => {
        this.projects.set(projects);
        this.status.set('ready');
      },
      error: (error) => {
        console.error('Failed to load projects:', error);
        this.status.set('error');
      },
    });
  }

  protected onSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  protected onFilter(event: Event): void {
    this.selectedTech.set((event.target as HTMLSelectElement).value);
  }
}