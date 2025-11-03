import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Lazy loaded standalone components
  { path: 'home', loadComponent: () => import('./components/home.component').then(m => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./components/about.component').then(m => m.AboutComponent) },
  { path: 'skills', loadComponent: () => import('./components/skills.component').then(m => m.SkillsComponent) },
  { path: 'projects', loadComponent: () => import('./components/projects.component').then(m => m.ProjectsComponent) },

  // ✅ Blog list + Blog detail (lazy-loaded routing)
  {
    path: 'blog',
    loadComponent: () => import('./components/blog.component').then(m => m.BlogComponent)
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./components/blog-post.component').then(m => m.BlogPostComponent)
  },

  { path: 'contact', loadComponent: () => import('./components/contact.component').then(m => m.ContactComponent) },

  // Wildcard route (fallback)
  { path: '**', redirectTo: 'home' }
];
