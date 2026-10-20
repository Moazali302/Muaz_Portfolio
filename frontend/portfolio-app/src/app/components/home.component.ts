import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateService } from '../guards/services/translate.service';
import { SKILLS } from '../shared/config/skills.config';
import { MarqueeComponent } from '../shared/ui/marquee/marquee.component';
import { AboutComponent } from './about.component';
import { HeroComponent } from './hero.component';
import { ProjectsComponent } from './projects.component';
import { StatsStripComponent } from './stats-strip.component';
import { BlogComponent } from './blog.component';
import { ContactComponent } from './contact.component';
import { ExperienceComponent } from './experience-list/experience-list';
import { ExperienceDetailComponent } from './experience-detail/experience-detail';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, MarqueeComponent, StatsStripComponent, AboutComponent, ProjectsComponent, BlogComponent, ContactComponent, ExperienceComponent,ExperienceDetailComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero />
    <app-marquee [items]="skillNames" [label]="translate.translate('skills.title')" />
    <app-stats-strip />
    <app-about />
    <app-projects />
    <app-experience-list/>
    <app-blog/>
    <app-contact/>
  `,
})
export class HomeComponent {
  protected readonly translate = inject(TranslateService);
  protected readonly skillNames = SKILLS.map((skill) => skill.name);
}