import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../guards/services/api.service';
import { TranslateService } from '../../guards/services/translate.service';
import { ButtonDirective } from '../../shared/directives/button.directive';
import { CardDirective } from '../../shared/directives/card.directive';
import { ChipComponent } from '../../shared/ui/chip/chip.component';
import { ImageCarouselComponent } from '../../shared/ui/image-carousel/image-carousel.component';
import { projectImages } from '../../shared/utlis/project-images';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterLink, ButtonDirective, CardDirective, ChipComponent, ImageCarouselComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article appCard class="flex h-full flex-col p-6">
      <div
        class="relative mb-5 h-[190px] overflow-hidden rounded-[14px] bg-gradient-to-br from-brand/30 to-iris/30"
      >
        <span
          class="absolute inset-0 flex items-center justify-center font-display text-5xl font-bold"
          aria-hidden="true"
        >
          {{ initials() }}
        </span>
        @if (images().length) {
          <app-image-carousel class="absolute inset-0" [images]="images()" [alt]="project().name" />
        }
      </div>

      @if (project().category) {
        <p class="text-[13px] text-ink-muted">{{ project().category }}</p>
      }
      <h3 class="mb-3 mt-2 font-display text-[1.625rem] leading-tight tracking-tight">
        {{ project().name }}
      </h3>
      <p class="mb-5 text-[15px] leading-relaxed text-ink-muted">{{ project().description }}</p>

      <ul class="mb-6 flex flex-wrap gap-2" aria-label="Tech stack">
        @for (tech of project().techStack; track tech) {
          <li><app-chip size="sm">{{ tech }}</app-chip></li>
        }
      </ul>

      <div class="mt-auto flex flex-wrap gap-3">
        <a appButton [routerLink]="['/projects', project().slug]">
          {{ translate.translate('projects.caseStudy') }}
        </a>
        @if (project().githubUrl; as url) {
          <a appButton variant="outline" [href]="url" target="_blank" rel="noopener noreferrer">
            {{ translate.translate('projects.github') }}
          </a>
        }
      </div>
    </article>
  `,
})
export class ProjectCardComponent {
  protected readonly translate = inject(TranslateService);

  readonly project = input.required<Project>();

  protected readonly images = computed(() => projectImages(this.project()));

  protected readonly initials = computed(() =>
    this.project()
      .name.split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0])
      .join('')
      .toUpperCase(),
  );
}