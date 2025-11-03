import {
  Component,
  ElementRef,
  inject,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateService } from '../services/translate.service';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';
import { trigger, style, animate, transition, state } from '@angular/animations';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  animations: [
    trigger('fadeInUp', [
      state('hidden', style({ opacity: 0, transform: 'translateY(50px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hidden => visible', [
        animate('1000ms cubic-bezier(0.23, 1, 0.32, 1)'),
      ]),
    ]),
  ],
  template: `
    <section
      id="hero"
      [@fadeInUp]="isVisible ? 'visible' : 'hidden'"
      class="min-h-screen flex items-center justify-center px-4 pt-20 pb-12 
             bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 
             dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 
             transition-all duration-700"
    >
      <div class="container mx-auto max-w-6xl">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <!-- Left Side -->
          <div>
            <div
              class="w-48 h-48 mx-auto md:mx-0 mb-8 rounded-full 
                     bg-gradient-to-br from-indigo-400 to-purple-600 p-[3px] shadow-2xl"
            >
              <div
                class="w-full h-full rounded-full overflow-hidden bg-white dark:bg-slate-800 
                       flex items-center justify-center"
              >
                <img
                  src="assets/profile.jpeg"
                  alt="Moaz Ali Profile"
                  class="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            <h1
              class="text-5xl md:text-6xl font-bold mb-4 
                     bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
                     bg-clip-text text-transparent"
            >
              {{ translate.translate('hero.title') }}
            </h1>
            <p class="text-2xl md:text-3xl text-slate-700 dark:text-slate-300 mb-2">
              {{ translate.translate('hero.subtitle') }}
            </p>
            <p class="text-lg text-slate-600 dark:text-slate-400 mb-8">
              {{ translate.translate('hero.education') }}
            </p>

            <!-- ✅ Hire / Resume / Contact Buttons -->
            <div class="flex flex-wrap gap-4 mb-6">
              <button
                (click)="openHireEmail()"
                class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg 
                       font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
              >
                {{ translate.translate('hero.hire') }}
              </button>

              <button
                (click)="downloadResume()"
                class="px-6 py-3 border-2 border-indigo-600 dark:border-indigo-400 
                       text-indigo-600 dark:text-indigo-400 rounded-lg font-semibold 
                       hover:bg-indigo-50 dark:hover:bg-slate-800 transform hover:-translate-y-1 
                       transition-all duration-200"
              >
                {{ translate.translate('hero.resume') }}
              </button>

              <a
                routerLink="/contact"
                class="px-6 py-3 border-2 border-purple-600 dark:border-purple-400 
                       text-purple-600 dark:text-purple-400 rounded-lg font-semibold 
                       hover:bg-purple-50 dark:hover:bg-slate-800 transform hover:-translate-y-1 
                       transition-all duration-200"
              >
                {{ translate.translate('hero.contact') }}
              </a>
            </div>

            <!-- ✅ Social Links -->
            <div class="flex gap-4">
              <a
                href="https://github.com/Moazali302"
                target="_blank"
                class="text-slate-600 dark:text-slate-400 hover:text-indigo-600 
                       dark:hover:text-indigo-400 transition-colors"
              >
                <i class="fa-brands fa-github text-2xl"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/moaz-ali-4710ba397/"
                target="_blank"
                class="text-slate-600 dark:text-slate-400 hover:text-indigo-600 
                       dark:hover:text-indigo-400 transition-colors"
              >
                <i class="fa-brands fa-linkedin text-2xl"></i>
              </a>
            </div>
          </div>

          <!-- Right Side -->
          <div class="hidden md:block">
            <div class="relative">
              <div
                class="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-600 
                       rounded-3xl transform rotate-6 opacity-20"
              ></div>
              <div
                class="relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl"
              >
                <h3 class="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200">
                  Quick Stats
                </h3>
                <div class="space-y-4">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 
                             flex items-center justify-center text-white font-bold"
                    >
                      JS
                    </div>
                    <div>
                      <p class="font-semibold text-slate-800 dark:text-slate-200">
                        JavaScript Expert
                      </p>
                      <p class="text-sm text-slate-600 dark:text-slate-400">Frontend & Backend</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <div
                      class="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 
                             flex items-center justify-center text-white font-bold"
                    >
                      AN
                    </div>
                    <div>
                      <p class="font-semibold text-slate-800 dark:text-slate-200">
                        Angular Developer
                      </p>
                      <p class="text-sm text-slate-600 dark:text-slate-400">Modern Web Apps</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <div
                      class="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 
                             flex items-center justify-center text-white font-bold"
                    >
                      ND
                    </div>
                    <div>
                      <p class="font-semibold text-slate-800 dark:text-slate-200">
                        Node.js Developer
                      </p>
                      <p class="text-sm text-slate-600 dark:text-slate-400">API & Backend</p>
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
export class HeroComponent implements AfterViewInit {
  translate = inject(TranslateService);
  apiService = inject(ApiService);
  private el = inject(ElementRef);
  isVisible = false;

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.isVisible = true;
          observer.unobserve(this.el.nativeElement);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(this.el.nativeElement);
  }

  // ✅ FINAL — Works in all browsers (no popup block)
  openHireEmail() {
    Swal.fire({
      title: 'Contact Moaz Ali',
      text: 'Would you like to open your email app to send a Hire Inquiry?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Open Mail App',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#6366f1',
      background: '#fff',
    }).then((result) => {
      if (result.isConfirmed) {
        const email = 'moazj049@gmail.com';
        const subject = encodeURIComponent('Hire Inquiry');
        const body = encodeURIComponent(
          'Hello Moaz Ali,\n\nI would like to discuss a project opportunity with you.\n\nBest regards,\n'
        );
        const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;

        setTimeout(() => {
          Swal.fire({
            title: 'Did not open?',
            html: `
              <p class="text-slate-700">You can copy my email below 👇</p>
              <div class="p-3 mt-2 bg-slate-100 rounded-md font-mono text-indigo-700">
                ${email}
              </div>
            `,
            confirmButtonText: 'Copy Email',
            confirmButtonColor: '#6366f1',
          }).then((copyRes) => {
            if (copyRes.isConfirmed) {
              navigator.clipboard.writeText(email);
              Swal.fire({
                icon: 'success',
                title: 'Copied!',
                text: 'My email has been copied to your clipboard.',
                timer: 1800,
                showConfirmButton: false,
              });
            }
          });
        }, 2000);
      }
    });
  }

  // ✅ Resume download
  downloadResume(): void {
    Swal.fire({
      title: 'Downloading Resume',
      text: 'Please wait...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
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
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Resume Not Available',
          text: 'Please contact me via email instead.',
          confirmButtonText: 'OK',
          confirmButtonColor: '#6366f1',
        });
      },
    });
  }
}
