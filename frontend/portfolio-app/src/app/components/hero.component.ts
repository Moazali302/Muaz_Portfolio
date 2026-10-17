import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslateService } from '../guards/services/translate.service';
import { ApiService } from '../guards/services/api.service';
import { ButtonDirective } from '../shared/directives/button.directive';

interface QuickStat {
  readonly label: string;
  readonly value: string;
}

const QUICK_STATS: readonly QuickStat[] = [
  { label: 'Angular Developer', value: 'Enterprise Web Apps' },
  { label: 'ag-Grid Expert', value: 'Hierarchical Data Systems' },
  { label: 'RBAC & i18n', value: 'Multi-Portal Architecture' },
  { label: 'Tailwind CSS', value: 'Responsive UI Styling' },
];

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, ButtonDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="hero"
      class="mx-auto grid max-w-[1240px] items-center gap-14 px-6 pb-16 pt-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pb-24"
      aria-labelledby="hero-title"
    >
      <div class="animate-reveal">
        <div
          class="mb-7 h-[132px] w-[132px] animate-float rounded-full bg-gradient-to-br from-brand to-iris p-1"
        >
          <img
            src="assets/profile.jpeg"
            width="132"
            height="132"
            fetchpriority="high"
            alt="Moaz Ali Profile"
            class="h-full w-full rounded-full bg-raised object-cover"
          />
        </div>

        <p
          class="inline-flex items-center gap-2.5 rounded-full border border-line-strong px-4 py-2 text-sm text-ink-soft"
        >
          <span class="h-2 w-2 animate-ping-soft rounded-full bg-brand" aria-hidden="true"></span>
          {{ translate.translate('hero.education') }}
        </p>

        <h1
          id="hero-title"
          class="mb-6 mt-7 font-display text-[length:clamp(2.5rem,5.4vw,4.5rem)] leading-[1.04] tracking-tight"
        >
          {{ translate.translate('hero.headline.before')
          }}<span class="text-brand">{{ translate.translate('hero.headline.highlight') }}</span
          >{{ translate.translate('hero.headline.after') }}
        </h1>

        <p class="mb-9 max-w-xl text-lg leading-relaxed text-ink-muted">
          {{ translate.translate('hero.summary') }}
        </p>

        <div class="flex flex-wrap gap-4">
          <button appButton type="button" (click)="openHireEmail()">
            {{ translate.translate('hero.hire') }}
          </button>
          <button appButton variant="outline" type="button" (click)="downloadResume()">
            {{ translate.translate('hero.resume') }}
          </button>
          <a appButton variant="outline" routerLink="/contact">
            {{ translate.translate('hero.contact') }}
          </a>
        </div>
      </div>

      <div class="animate-reveal [animation-delay:150ms]">
        <div class="animate-float">
          <section
            class="flex flex-col gap-3.5 rounded-3xl border border-line bg-raised p-6 sm:p-7"
            aria-labelledby="quick-stats-title"
          >
            <div class="flex gap-2" aria-hidden="true">
              <span class="h-3 w-3 rounded-full bg-[#ff6b6b]"></span>
              <span class="h-3 w-3 rounded-full bg-[#ffc857]"></span>
              <span class="h-3 w-3 rounded-full bg-brand"></span>
            </div>
            <h2 id="quick-stats-title" class="font-display text-2xl font-bold tracking-tight">
              Quick Stats
            </h2>

            <ul class="flex flex-col gap-3.5">
              @for (stat of quickStats; track stat.label) {
                <li class="rounded-[14px] border border-line-strong bg-base px-5 py-4">
                  <p class="text-xs uppercase tracking-[0.08em] text-ink-muted">{{ stat.label }}</p>
                  <p class="mt-1.5 font-display text-xl tracking-tight">{{ stat.value }}</p>
                </li>
                @if (!$last) {
                  <li class="flex justify-center" aria-hidden="true">
                    <span
                      class="h-2.5 w-2.5 animate-ping-soft rounded-full"
                      [class]="$even ? 'bg-brand' : 'bg-iris'"
                    ></span>
                  </li>
                }
              }
            </ul>
          </section>
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent {
  protected readonly translate = inject(TranslateService);
  private readonly apiService = inject(ApiService);
  protected readonly quickStats = QUICK_STATS;

  // ✅ FINAL — Works in all browsers (no popup block)
  protected openHireEmail(): void {
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
          'Hello Moaz Ali,\n\nI would like to discuss a project opportunity with you.\n\nBest regards,\n',
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
  protected downloadResume(): void {
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