import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateService } from '../guards/services/translate.service';
import { ApiService, BlogPost } from '../guards/services/api.service';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink],
  template: `
    <section class="py-20 px-4 bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 min-h-screen">
      <div class="container mx-auto max-w-3xl">
        <a routerLink="/blog" class="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold mb-8 hover:gap-3 transition-all">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </a>

        @if (loading()) {
          <div class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        } @else if (post(); as p) {
          <article>
            <h1 class="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {{ p.title }}
            </h1>

            <div class="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-500 mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
              <span class="font-mono">{{ p.createdAt ? (p.createdAt | date:'MMMM d, y') : '' }}</span>
              <span>&bull;</span>
              <span>{{ readTime(p.body) }} min read</span>
              @for (tag of p.tags; track tag) {
                <span class="px-2.5 py-1 text-xs font-medium rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                  {{ tag }}
                </span>
              }
            </div>

            <div class="prose dark:prose-invert max-w-none">
              @for (block of parsedBody(); track $index) {
                @if (block.type === 'code') {
                  <div class="bg-slate-900 rounded-lg overflow-hidden my-6 border border-slate-700">
                    @if (block.lang) {
                      <div class="px-4 py-2 text-xs text-slate-400 border-b border-slate-700 font-mono">{{ block.lang }}</div>
                    }
                    <pre class="p-4 overflow-x-auto text-sm text-slate-200 font-mono"><code>{{ block.content }}</code></pre>
                  </div>
                } @else if (block.type === 'heading') {
                  <h2 class="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-3">{{ block.content }}</h2>
                } @else {
                  <p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 whitespace-pre-line">{{ block.content }}</p>
                }
              }
            </div>
          </article>
        } @else {
          <div class="text-center py-12 text-slate-600 dark:text-slate-400">
            Blog post not found.
          </div>
        }
      </div>
    </section>
  `
})
export class BlogPostComponent implements OnInit {
  route = inject(ActivatedRoute);
  translate = inject(TranslateService);
  apiService = inject(ApiService);

  post = signal<BlogPost | null>(null);
  loading = signal(true);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.apiService.getBlogPost(slug).subscribe({
        next: (post) => {
          this.post.set(post);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Failed to load blog post:', err);
          this.loading.set(false);
        }
      });
    }
  }

  readTime(body: string): number {
    const words = body.trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
  }

  parsedBody(): { type: 'text' | 'heading' | 'code'; content: string; lang?: string }[] {
    const post = this.post();
    if (!post) return [];

    const blocks: { type: 'text' | 'heading' | 'code'; content: string; lang?: string }[] = [];
    const lines = post.body.split('\n');
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      if (line.trim().startsWith('```')) {
        const lang = line.trim().replace(/```/g, '').trim();
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        blocks.push({ type: 'code', content: codeLines.join('\n'), lang });
        i++;
      } else if (line.trim().startsWith('## ')) {
        blocks.push({ type: 'heading', content: line.replace(/^##\s*/, '') });
        i++;
      } else if (line.trim() === '') {
        i++;
      } else {
        const paragraphLines: string[] = [line];
        i++;
        while (i < lines.length && lines[i].trim() !== '' && !lines[i].trim().startsWith('```') && !lines[i].trim().startsWith('## ')) {
          paragraphLines.push(lines[i]);
          i++;
        }
        blocks.push({ type: 'text', content: paragraphLines.join('\n') });
      }
    }

    return blocks;
  }
}