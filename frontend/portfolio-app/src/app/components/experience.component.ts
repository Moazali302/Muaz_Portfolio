import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateService } from '../guards/services/translate.service';
import { ApiService, Experience } from '../guards/services/api.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: `
    <section id="experience" class="py-20 px-4 bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
      <div class="container mx-auto max-w-4xl">
        <h2 class="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {{ translate.translate('experience.title') }}
        </h2>

        @if (loading()) {
          <div class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            <p class="mt-4 text-slate-600 dark:text-slate-400">Loading experience...</p>
          </div>
        } @else if (experiences().length === 0) {
          <div class="text-center py-12 text-slate-600 dark:text-slate-400">
            No experience added yet.
          </div>
        } @else {
          <div class="relative border-l-2 border-indigo-300 dark:border-indigo-700 ml-4">
            @for (exp of experiences(); track exp._id) {
              <div class="mb-10 ml-6">
                <span class="absolute -left-3 flex items-center justify-center w-6 h-6 bg-indigo-600 rounded-full ring-4 ring-white dark:ring-slate-900"></span>
                <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
                  <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 class="text-xl font-bold text-slate-800 dark:text-slate-200">{{ exp.role }}</h3>
                    <span class="text-sm px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                      {{ exp.employmentType }}
                    </span>
                  </div>

                  @if (exp.companyUrl) {
                    <a [href]="exp.companyUrl" target="_blank" class="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                      {{ exp.company }}
                    </a>
                  } @else {
                    <span class="text-indigo-600 dark:text-indigo-400 font-semibold">{{ exp.company }}</span>
                  }

                  <div class="text-sm text-slate-500 dark:text-slate-500 mt-1 mb-3">
                    {{ exp.startDate | date:'MMM yyyy' }} —
                    {{ exp.isCurrent ? 'Present' : (exp.endDate | date:'MMM yyyy') }}
                    @if (exp.location) {
                      <span> • {{ exp.location }}</span>
                    }
                  </div>

                  <p class="text-slate-600 dark:text-slate-400 mb-4">{{ exp.description }}</p>

                  @if (exp.technologies?.length) {
                    <div class="flex flex-wrap gap-2">
                      @for (tech of exp.technologies; track tech) {
                        <span class="px-2 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                          {{ tech }}
                        </span>
                      }
                    </div>
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
export class ExperienceComponent implements OnInit {
  translate = inject(TranslateService);
  apiService = inject(ApiService);

  experiences = signal<Experience[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.loadExperiences();
  }

  loadExperiences(): void {
    this.loading.set(true);
    this.apiService.getExperiences().subscribe({
      next: (experiences) => {
        this.experiences.set(experiences);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load experiences:', err);
        this.loading.set(false);
      }
    });
  }
}
