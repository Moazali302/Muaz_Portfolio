import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateService } from '../guards/services/translate.service';
import { SKILLS } from '../shared/config/skills.config';
import { CardDirective } from '../shared/directives/card.directive';
import { RevealDirective } from '../shared/directives/reveal.directive';
import { SectionHeaderComponent } from '../shared/ui/section-header/section-header.component';

const STAGGER_COLUMNS = 4;
const STAGGER_MS = 100;

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CardDirective, RevealDirective, SectionHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="skills" class="mx-auto max-w-[1240px] px-6 pt-6 lg:px-8 lg:pt-10">
      <app-section-header
        class="block animate-reveal"
        [level]="1"
        [eyebrow]="translate.translate('skills.title')"
        [title]="translate.translate('skills.heading')"
      />

      <ul class="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
        @for (skill of skills; track skill.name) {
          <li
            appCard
            appReveal
            [appRevealDelay]="delay($index)"
            class="flex flex-col items-center gap-4 px-4 py-8"
          >
            <span
              class="flex h-[68px] w-[68px] items-center justify-center rounded-[18px] border border-line-strong bg-base"
            >
              <img
                [src]="skill.icon"
                alt=""
                width="44"
                height="44"
                loading="lazy"
                class="h-11 w-11 object-contain"
              />
            </span>
            <span class="text-center font-semibold">{{ skill.name }}</span>
          </li>
        }
      </ul>
    </section>
  `,
})
export class SkillsComponent {
  protected readonly translate = inject(TranslateService);
  protected readonly skills = SKILLS;

  protected delay(index: number): number {
    return (index % STAGGER_COLUMNS) * STAGGER_MS;
  }
}