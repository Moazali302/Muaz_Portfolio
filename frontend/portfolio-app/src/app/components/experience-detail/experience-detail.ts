import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { ApiService, Experience } from '../../guards/services/api.service';
import { TranslateService } from '../../guards/services/translate.service';
import { ButtonDirective } from '../../shared/directives/button.directive';
import { CardDirective } from '../../shared/directives/card.directive';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { ChipComponent } from '../../shared/ui/chip/chip.component';
import { LoadState,toLoadState } from '../../shared/utlis/load-state';

interface ExperienceView {
  readonly experience: Experience;
  readonly previous: Experience | null;
  readonly next: Experience | null;
}

function withNeighbours(experience: Experience, all: Experience[]): ExperienceView {
  const index = all.findIndex((item) => item._id === experience._id);
  return {
    experience,
    previous: index > 0 ? all[index - 1] : null,
    next: index >= 0 && index < all.length - 1 ? all[index + 1] : null,
  };
}

@Component({
  selector: 'app-experience-detail',
  standalone: true,
  imports: [DatePipe, RouterLink, ButtonDirective, CardDirective, RevealDirective, ChipComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './experience-detail.html',
})
export class ExperienceDetailComponent {
  protected readonly translate = inject(TranslateService);
  private readonly api = inject(ApiService);
  private readonly titleService = inject(Title);

  /** Bound from the `:slug` route param (withComponentInputBinding). */
  readonly slug = input.required<string>();

  private readonly state = toSignal(
    toObservable(this.slug).pipe(
      switchMap((slug) =>
        forkJoin({
          experience: this.api.getExperience(slug),
          all: this.api.getExperiences().pipe(catchError(() => of([] as Experience[]))),
        }).pipe(
          map(({ experience, all }) => withNeighbours(experience, all)),
          toLoadState(),
        ),
      ),
    ),
    { initialValue: { status: 'loading' } as LoadState<ExperienceView> },
  );

  protected readonly status = computed(() => this.state().status);
  protected readonly view = computed(() => {
    const state = this.state();
    return state.status === 'ready' ? state.data : null;
  });

  constructor() {
    effect(() => {
      const view = this.view();
      if (view) {
        this.titleService.setTitle(
          `${view.experience.role} · ${view.experience.company} | MoazAli`,
        );
      }
    });
  }
}