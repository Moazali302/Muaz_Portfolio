import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateService } from '../guards/services/translate.service';
import { SKILLS } from '../shared/config/skills.config';
import { MarqueeComponent } from '../shared/ui/marquee/marquee.component';
import { AboutComponent } from './about.component';
import { HeroComponent } from './hero.component';
import { ProjectsComponent } from './projects.component';
import { StatsStripComponent } from './stats-strip.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, MarqueeComponent, StatsStripComponent, AboutComponent, ProjectsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero />
    <app-marquee [items]="skillNames" [label]="translate.translate('skills.title')" />
    <app-stats-strip />
    <app-about />
    <app-projects />
  `,
})
export class HomeComponent {
  protected readonly translate = inject(TranslateService);
  protected readonly skillNames = SKILLS.map((skill) => skill.name);
}