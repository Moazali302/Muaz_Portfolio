import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateService } from '../guards/services/translate.service';
import { ApiService, BlogPost } from '../guards/services/api.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  template: `
    <section id="blog" class="py-20 px-4 bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 min-h-screen">
      <div class="container mx-auto max-w-4xl">
        <h1 class="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {{ translate.translate('blog.title') }}
        </h1>
        <p class="text-slate-600 dark:text-slate-400 mb-12">
          Thoughts, learnings, and real debugging stories from production.
        </p>

        @if (loading()) {
          <div class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        } @else if (posts().length === 0) {
          <div class="text-center py-12 text-slate-600 dark:text-slate-400">
            No blog posts yet. Check back soon!
          </div>
        } @else {
          <div class="space-y-4">
            @for (post of posts(); track post._id) {
               [routerLink]="['/blog', post.slug]"
                class="block bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors duration-200"
              >
                <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                  <div class="flex-1">
                    <h2 class="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                      {{ post.title }}
                    </h2>
                    <p class="text-slate-600 dark:text-slate-400 mb-4">
                      {{ post.excerpt }}
                    </p>
                    <div class="flex flex-wrap items-center gap-2">
                      @for (tag of post.tags.slice(0, 3); track tag) {
                        <span class="px-2.5 py-1 text-xs font-medium rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                          {{ tag }}
                        </span>
                      }
                    </div>
                  </div>
                  <div class="flex md:flex-col md:items-end justify-between md:justify-start gap-2 md:gap-4 md:text-right md:min-w-[140px]">
                    <span class="text-sm text-slate-500 dark:text-slate-500 font-mono">
                      {{ post.createdAt ? (post.createdAt | date:'MMM d, y') : '' }}
                    </span>
                    <span class="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                      <a> ReadMore</a>
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
            }
          </div>
        }
      </div>
    </section>
  `
})
export class BlogComponent implements OnInit {
  translate = inject(TranslateService);
  apiService = inject(ApiService);

  posts = signal<BlogPost[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading.set(true);
    this.apiService.getBlogPosts().subscribe({
      next: (posts) => {
        this.posts.set(posts);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load blog posts:', err);
        this.loading.set(false);
      }
    });
  }
}