import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateService } from '../services/translate.service';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section
      id="hero"
      class="min-h-screen flex items-center justify-center px-4 pt-20 pb-12 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
    >
      <div class="container mx-auto max-w-6xl">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <!-- Left side -->
          <div class="animate-fade-in-up">
            <!-- Profile Image with Gradient Border -->
            <div
              class="w-48 h-48 mx-auto md:mx-0 mb-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 p-[3px] shadow-2xl"
            >
              <div
                class="w-full h-full rounded-full overflow-hidden bg-white dark:bg-slate-800 flex items-center justify-center"
              >
                <img
                  src="assets/profile.jpeg"
                  alt="Moaz Ali Profile"
                  class="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            <h1
              class="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              {{ translate.translate('hero.title') }}
            </h1>
            <p
              class="text-2xl md:text-3xl text-slate-700 dark:text-slate-300 mb-2"
            >
              {{ translate.translate('hero.subtitle') }}
            </p>
            <p class="text-lg text-slate-600 dark:text-slate-400 mb-8">
              {{ translate.translate('hero.education') }}
            </p>

            <!-- Buttons -->
            <div class="flex flex-wrap gap-4 mb-6">
              <a
                href="mailto:moazj049@gmail.com?subject=Hire Inquiry"
                class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
              >
                {{ translate.translate('hero.hire') }}
              </a>

              <button
                (click)="downloadResume()"
                class="px-6 py-3 border-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 rounded-lg font-semibold hover:bg-indigo-50 dark:hover:bg-slate-800 transform hover:-translate-y-1 transition-all duration-200"
              >
                {{ translate.translate('hero.resume') }}
              </button>

              <a
                routerLink="/contact"
                class="px-6 py-3 border-2 border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 rounded-lg font-semibold hover:bg-purple-50 dark:hover:bg-slate-800 transform hover:-translate-y-1 transition-all duration-200"
              >
                {{ translate.translate('hero.contact') }}
              </a>
            </div>

            <!-- Social Links -->
            <div class="flex gap-4">
              <a
                href="https://github.com/Moazali302"
                target="_blank"
                rel="noopener noreferrer"
                class="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <svg
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/moaz-ali-4710ba397/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <svg
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  />
                </svg>
              </a>
            </div>
          </div>

          <!-- Right side -->
          <div class="animate-fade-in-up hidden md:block">
            <div class="relative">
              <div
                class="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-600 rounded-3xl transform rotate-6 opacity-20"
              ></div>
              <div
                class="relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl"
              >
                <h3
                  class="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200"
                >
                  Quick Stats
                </h3>
                <div class="space-y-4">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold"
                    >
                      JS
                    </div>
                    <div>
                      <p
                        class="font-semibold text-slate-800 dark:text-slate-200"
                      >
                        JavaScript Expert
                      </p>
                      <p
                        class="text-sm text-slate-600 dark:text-slate-400"
                      >
                        Frontend & Backend
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <div
                      class="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white font-bold"
                    >
                      AN
                    </div>
                    <div>
                      <p
                        class="font-semibold text-slate-800 dark:text-slate-200"
                      >
                        Angular Developer
                      </p>
                      <p
                        class="text-sm text-slate-600 dark:text-slate-400"
                      >
                        Modern Web Apps
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <div
                      class="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white font-bold"
                    >
                      ND
                    </div>
                    <div>
                      <p
                        class="font-semibold text-slate-800 dark:text-slate-200"
                      >
                        Node.js Developer
                      </p>
                      <p
                        class="text-sm text-slate-600 dark:text-slate-400"
                      >
                        API & Backend
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent {
  translate = inject(TranslateService);
  apiService = inject(ApiService);

  downloadResume(): void {
    Swal.fire({
      title: 'Downloading Resume',
      text: 'Please wait...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.apiService.downloadResume().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'MoazAli_Resume.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        Swal.fire({
          icon: 'success',
          title: 'Download Started!',
          text: 'Your resume download has started.',
          timer: 2000,
          showConfirmButton: false,
        });
      },
      error: (err) => {
        console.error('Failed to download resume:', err);
        Swal.fire({
          icon: 'error',
          title: 'Resume Not Available',
          text:
            err.status === 404
              ? 'Resume file is not available yet. Please contact me directly via email.'
              : 'Failed to download resume. Please try again later.',
          confirmButtonText: 'OK',
          confirmButtonColor: '#6366f1',
        });
      },
    });
  }
}
