import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, switchMap } from 'rxjs';
import { ApiService, Experience } from '../../guards/services/api.service';
import { TranslateService } from '../../guards/services/translate.service';
import { ButtonDirective } from '../../shared/directives/button.directive';
import { CardDirective } from '../../shared/directives/card.directive';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { ChipComponent } from '../../shared/ui/chip/chip.component';
import { SectionHeaderComponent } from '../../shared/ui/section-header/section-header.component';
import { LoadState, toLoadState } from '../../shared/utlis/load-state';

const SKELETON_COUNT = 3;

@Component({
  selector: 'app-experience-list',
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
  templateUrl: './experience-list.html',
})
export class ExperienceComponent {
  protected readonly translate = inject(TranslateService);
  private readonly api = inject(ApiService);
  private readonly reload$ = new BehaviorSubject<void>(undefined);

  protected readonly skeletons = Array.from({ length: SKELETON_COUNT });

  private readonly state = toSignal(
    this.reload$.pipe(switchMap(() => this.api.getExperiences().pipe(toLoadState()))),
    { initialValue: { status: 'loading' } as LoadState<Experience[]> },
  );

  protected readonly status = computed(() => this.state().status);
  protected readonly experiences = computed(() => {
    const state = this.state();
    return state.status === 'ready' ? state.data : [];
  });

  protected reload(): void {
    this.reload$.next();
  }
}