import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import{RouterLink} from '@angular/router';
import { TranslateService } from '../guards/services/translate.service';
import { ApiService, BlogPost } from '../guards/services/api.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  template: `
    <section id="blog" class="py-20 px-4 bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
      <div class="container mx-auto max-w-6xl">
        <h2 class="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {{ translate.translate('blog.title') }}
        </h2>
        
        @if (loading()) {
          <div class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            <p class="mt-4 text-slate-600 dark:text-slate-400">Loading posts...</p>
          </div>
        } @else if (posts().length === 0) {
          <div class="text-center py-12 text-slate-600 dark:text-slate-400">
            No blog posts yet. Check back soon!
          </div>
        } @else {
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (post of posts(); track post._id) {
              <article class="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                @if (post.coverImage) {
                  <img [src]="post.coverImage" [alt]="post.title" class="w-full h-48 object-cover" />
                } @else {
                  <div class="w-full h-48 bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center">
                    <span class="text-6xl">📝</span>
                  </div>
                }
                <div class="p-6">
                  <div class="flex flex-wrap gap-2 mb-3">
                    @for (tag of post.tags.slice(0, 3); track tag) {
                      <span class="px-2 py-1 text-xs rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                        {{ tag }}
                      </span>
                    }
                  </div>
                  <h3 class="text-xl font-bold mb-2 text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {{ post.title }}
                  </h3>
                  <p class="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">{{ post.excerpt }}</p>
                  <div class="flex items-center justify-between text-sm text-slate-500 dark:text-slate-500 mb-4">
                    <span>{{ post.createdAt ? (post.createdAt | date:'medium') : '' }}</span>
                    @if (post.author) {
                      <span>{{ post.author.username }}</span>
                    }
                  </div>
                  <a
                    [routerLink]="['/blog', post.slug]"
                    class="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:gap-3 transition-all"
                  >
                    {{ translate.translate('blog.read') }}
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </article>
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

