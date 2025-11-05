import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateService } from '../guards/services/translate.service';
import { ApiService, BlogPost } from '../guards/services/api.service';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  template: `
    <article class="min-h-screen py-20 px-4 bg-white dark:bg-slate-900">
      <div class="container mx-auto max-w-4xl">
        @if (loading()) {
          <div class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            <p class="mt-4 text-slate-600 dark:text-slate-400">Loading post...</p>
          </div>
        } @else if (post()) {
          <a routerLink="/blog" class="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-8 hover:gap-3 transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </a>
          
          <header class="mb-8">
            <h1 class="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-100">
              {{ post()!.title }}
            </h1>
            @if (post()!.coverImage) {
              <img [src]="post()!.coverImage" [alt]="post()!.title" class="w-full h-64 md:h-96 object-cover rounded-xl mb-6" />
            }
            <div class="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
              @if (post()!.author) {
                <span>By {{ post()!.author.username }}</span>
              }
              @if (post()!.createdAt) {
                <span>{{ post()!.createdAt | date:'medium' }}</span>
              }
            </div>
            @if (post()!.tags && post()!.tags.length > 0) {
              <div class="flex flex-wrap gap-2 mt-4">
                @for (tag of post()!.tags; track tag) {
                  <span class="px-3 py-1 text-sm rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                    {{ tag }}
                  </span>
                }
              </div>
            }
          </header>
          
          <div class="prose prose-lg dark:prose-invert max-w-none">
            <div [innerHTML]="formatMarkdown(post()!.body)"></div>
          </div>
        } @else {
          <div class="text-center py-12">
            <p class="text-slate-600 dark:text-slate-400">Post not found</p>
            <a routerLink="/blog" class="inline-block mt-4 text-indigo-600 dark:text-indigo-400 hover:underline">
              Back to Blog
            </a>
          </div>
        }
      </div>
    </article>
  `
})
export class BlogPostComponent implements OnInit {
  translate = inject(TranslateService);
  apiService = inject(ApiService);
  route = inject(ActivatedRoute);
  
  post = signal<BlogPost | null>(null);
  loading = signal(true);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.loadPost(slug);
    }
  }

  loadPost(slug: string): void {
    this.loading.set(true);
    this.apiService.getBlogPost(slug).subscribe({
      next: (post) => {
        this.post.set(post);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load post:', err);
        this.loading.set(false);
      }
    });
  }

  formatMarkdown(markdown: string): string {
    // Simple markdown to HTML conversion (for production, use a proper markdown library)
    return markdown
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/\n/gim, '<br>');
  }
}

