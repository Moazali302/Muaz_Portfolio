import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero.component';
import { AboutComponent } from './about.component';
import { SkillsComponent } from './skills.component';
import { ProjectsComponent } from './projects.component';
import { BlogComponent } from './blog.component';
import { ContactComponent } from './contact.component';
import { ScrollAnimateDirective } from '../shared/directives/scroll-animations-directives';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    BlogComponent,
    ContactComponent,
    ScrollAnimateDirective
  ],
  template: `
    <div class="space-y-24">
      <section scrollAnimate><app-hero></app-hero></section>
      <section scrollAnimate><app-about></app-about></section>
      <section scrollAnimate><app-skills></app-skills></section>
      <section scrollAnimate><app-projects></app-projects></section>
      <section scrollAnimate><app-blog></app-blog></section>
      <section scrollAnimate><app-contact></app-contact></section>
    </div>
  `,
})
export class HomeComponent {}
