import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '../services/translate.service';
import { ApiService, GitHubRepo } from '../services/api.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="projects" class="py-20 px-4 bg-white dark:bg-slate-900">
      <div class="container mx-auto max-w-7xl">
        <h2 class="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {{ translate.translate('projects.title') }}
        </h2>
        
        <div class="mb-8 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            [(ngModel)]="searchQuery"
            (input)="filterProjects()"
            [placeholder]="translate.translate('projects.search')"
            class="flex-1 px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            [(ngModel)]="selectedLanguage"
            (change)="filterProjects()"
            class="px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">{{ translate.translate('projects.filter') }}</option>
            @for (lang of uniqueLanguages(); track lang) {
              <option [value]="lang">{{ lang }}</option>
            }
          </select>
        </div>

        @if (loading()) {
          <div class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            <p class="mt-4 text-slate-600 dark:text-slate-400">Loading projects...</p>
          </div>
        } @else if (filteredProjects().length === 0) {
          <div class="text-center py-12 text-slate-600 dark:text-slate-400">
            No projects found
          </div>
        } @else {
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (repo of filteredProjects(); track repo.id) {
              <div class="group relative p-6 rounded-xl bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div class="absolute top-4 right-4 flex gap-2">
                  <span class="px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                    {{ repo.language || 'N/A' }}
                  </span>
                  <span class="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                    ⭐ {{ repo.stars }}
                  </span>
                </div>
                <h3 class="text-xl font-bold mb-2 text-slate-800 dark:text-slate-200">{{ repo.name }}</h3>
                <p class="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">{{ repo.description || 'No description available' }}</p>
                
                @if (repo.topics && repo.topics.length > 0) {
                  <div class="flex flex-wrap gap-2 mb-4">
                    @for (topic of repo.topics.slice(0, 3); track topic) {
                      <span class="px-2 py-1 text-xs rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {{ topic }}
                      </span>
                    }
                  </div>
                }
                
                <div class="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    [href]="repo.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex-1 px-4 py-2 text-center rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                  >
                    {{ translate.translate('projects.view') }}
                  </a>
                  @if (repo.homepage) {
                    <a
                      [href]="repo.homepage"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      {{ translate.translate('projects.demo') }}
                    </a>
                  }
                </div>
              </div>
            }
          </div>
        }
      </div>
    </section>
  `
})
export class ProjectsComponent implements OnInit {
  translate = inject(TranslateService);
  apiService = inject(ApiService);
  
  projects = signal<GitHubRepo[]>([]);
  loading = signal(true);
  searchQuery = '';
  selectedLanguage = '';
  
  uniqueLanguages = computed(() => {
    const langs = new Set(this.projects().map(p => p.language).filter(Boolean));
    return Array.from(langs).sort();
  });
  
  filteredProjects = computed(() => {
    let filtered = this.projects();
    
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        (p.description?.toLowerCase().includes(query) ?? false)
      );
    }
    
    if (this.selectedLanguage) {
      filtered = filtered.filter(p => p.language === this.selectedLanguage);
    }
    
    return filtered;
  });

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading.set(true);
    this.apiService.getRepos().subscribe({
      next: (repos) => {
        this.projects.set(repos);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load projects:', err);
        this.loading.set(false);
      }
    });
  }

  filterProjects(): void {
    // Computed signals will automatically update
  }
}

