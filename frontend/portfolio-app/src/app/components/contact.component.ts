import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { ApiService } from '../guards/services/api.service';
import { TranslateService } from '../guards/services/translate.service';
import { SITE } from '../shared/config/site.config';
import { ButtonDirective } from '../shared/directives/button.directive';
import { CardDirective } from '../shared/directives/card.directive';
import { RevealDirective } from '../shared/directives/reveal.directive';
import { SectionHeaderComponent } from '../shared/ui/section-header/section-header.component';

interface ContactMethod {
  readonly labelKey: string;
  readonly value: string;
  readonly href: string;
  readonly external: boolean;
  readonly icon: string;
  readonly filled: boolean;
}

const SWAL_CONFIRM_COLOR = '#6366f1';

const FIELD_BASE =
  'w-full rounded-[14px] border border-line-strong bg-base px-5 text-base text-ink placeholder:text-ink-muted focus:border-brand focus:outline-none aria-[invalid=true]:border-red-500';
const INPUT_CLASSES = `${FIELD_BASE} h-14`;
const TEXTAREA_CLASSES = `${FIELD_BASE} min-h-[140px] resize-y py-4`;

const EMAIL_ICON =
  'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z';
const PHONE_ICON =
  'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z';
const LINKEDIN_ICON =
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z';
const GITHUB_ICON =
  'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z';

const CONTACT_METHODS: readonly ContactMethod[] = [
  { labelKey: 'contact.email', value: SITE.email, href: `mailto:${SITE.email}`, external: false, icon: EMAIL_ICON, filled: false },
  { labelKey: 'contact.phone', value: SITE.phone.label, href: SITE.phone.href, external: false, icon: PHONE_ICON, filled: false },
  { labelKey: 'contact.linkedin', value: 'moaz-ali-4710ba397', href: SITE.linkedinUrl, external: true, icon: LINKEDIN_ICON, filled: true },
  { labelKey: 'contact.github', value: 'Moazali302', href: SITE.githubUrl, external: true, icon: GITHUB_ICON, filled: true },
];

function isAlreadySubscribed(error: unknown): boolean {
  return (
    error instanceof HttpErrorResponse &&
    typeof error.error?.error === 'string' &&
    error.error.error.includes('already subscribed')
  );
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonDirective, CardDirective, RevealDirective, SectionHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contact" class="mx-auto max-w-[1240px] px-6 pt-6 lg:px-8 lg:pt-10">
      <app-section-header
        class="block animate-reveal"
        [level]="1"
        [eyebrow]="translate.translate('contact.eyebrow')"
        [title]="translate.translate('contact.heading')"
        [subtitle]="translate.translate('contact.subheading')"
      />

      <div class="flex flex-wrap items-start gap-12">
        <div class="flex min-w-0 flex-[1_1_360px] flex-col gap-4">
          <p
            class="inline-flex items-center gap-2.5 self-start rounded-full border border-line-strong px-4 py-2 text-sm text-ink-soft"
          >
            <span class="h-2 w-2 animate-ping-soft rounded-full bg-brand" aria-hidden="true"></span>
            {{ translate.translate('hero.education') }}
          </p>

          <ul class="flex flex-col gap-4">
            @for (method of methods; track method.labelKey) {
              <li appReveal [appRevealDelay]="$index * 100">
                <a
                  appCard
                  class="flex items-center gap-4 px-6 py-5"
                  [href]="method.href"
                  [attr.target]="method.external ? '_blank' : null"
                  [attr.rel]="method.external ? 'noopener noreferrer' : null"
                >
                  <span
                    class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line-strong text-brand"
                    aria-hidden="true"
                  >
                    <svg
                      class="h-5 w-5"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      [attr.fill]="method.filled ? 'currentColor' : 'none'"
                      [attr.stroke]="method.filled ? 'none' : 'currentColor'"
                    >
                      <path [attr.d]="method.icon" />
                    </svg>
                  </span>
                  <span class="min-w-0">
                    <span class="block text-xs uppercase tracking-[0.08em] text-ink-muted">
                      {{ translate.translate(method.labelKey) }}
                    </span>
                    <span class="mt-1 block truncate font-display text-lg tracking-tight" dir="ltr">
                      {{ method.value }}
                    </span>
                  </span>
                </a>
              </li>
            }
          </ul>
        </div>

        <form
          appCard
          appReveal
          novalidate
          class="flex min-w-0 flex-[1_1_420px] flex-col gap-5 p-6 sm:p-9"
          [formGroup]="contactForm"
          (ngSubmit)="onSubmit()"
        >
          <h2 class="font-display text-[1.625rem] font-bold tracking-tight">
            {{ translate.translate('contact.formTitle') }}
          </h2>

          <div>
            <label for="contact-name" class="mb-2 block text-sm text-ink-muted">
              {{ translate.translate('contact.name') }}
            </label>
            <input
              id="contact-name"
              type="text"
              autocomplete="name"
              formControlName="name"
              [class]="inputClasses"
              [attr.aria-invalid]="showError(contactForm.controls.name)"
              aria-describedby="contact-name-error"
            />
            @if (showError(contactForm.controls.name)) {
              <p id="contact-name-error" class="mt-1.5 text-sm text-red-500" role="alert">
                {{ translate.translate(errorKey(contactForm.controls.name)) }}
              </p>
            }
          </div>

          <div>
            <label for="contact-email" class="mb-2 block text-sm text-ink-muted">
              {{ translate.translate('contact.email') }}
            </label>
            <input
              id="contact-email"
              type="email"
              autocomplete="email"
              formControlName="email"
              [class]="inputClasses"
              [attr.aria-invalid]="showError(contactForm.controls.email)"
              aria-describedby="contact-email-error"
            />
            @if (showError(contactForm.controls.email)) {
              <p id="contact-email-error" class="mt-1.5 text-sm text-red-500" role="alert">
                {{ translate.translate(errorKey(contactForm.controls.email)) }}
              </p>
            }
          </div>

          <div>
            <label for="contact-message" class="mb-2 block text-sm text-ink-muted">
              {{ translate.translate('contact.message') }}
            </label>
            <textarea
              id="contact-message"
              rows="5"
              formControlName="message"
              [class]="textareaClasses"
              [attr.aria-invalid]="showError(contactForm.controls.message)"
              aria-describedby="contact-message-error"
            ></textarea>
            @if (showError(contactForm.controls.message)) {
              <p id="contact-message-error" class="mt-1.5 text-sm text-red-500" role="alert">
                {{ translate.translate(errorKey(contactForm.controls.message)) }}
              </p>
            }
          </div>

          <button appButton type="submit" class="w-full" [disabled]="submitting()">
            {{ translate.translate(submitting() ? 'contact.sending' : 'contact.send') }}
          </button>
        </form>
      </div>

      <!-- <form
        appCard
        appReveal
        novalidate
        class="mt-12 flex flex-wrap items-center justify-between gap-6 p-6 sm:p-9"
        [formGroup]="newsletterForm"
        (ngSubmit)="subscribe()"
      >
        <h2 class="font-display text-[1.375rem] tracking-tight">
          {{ translate.translate('contact.newsletter') }}
        </h2>
        <div class="flex min-w-0 flex-[1_1_360px] flex-wrap gap-3 sm:flex-nowrap">
          <input
            type="email"
            autocomplete="email"
            formControlName="email"
            [class]="inputClasses"
            [attr.aria-label]="translate.translate('contact.email')"
            [placeholder]="translate.translate('contact.newsletter.placeholder')"
          />
          <button appButton type="submit" class="shrink-0" [disabled]="subscribing()">
            {{ translate.translate('contact.newsletter.subscribe') }}
          </button>
        </div>
      </form> -->
    </section>
  `,
})
export class ContactComponent {
  protected readonly translate = inject(TranslateService);
  private readonly api = inject(ApiService);
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly methods = CONTACT_METHODS;
  protected readonly inputClasses = INPUT_CLASSES;
  protected readonly textareaClasses = TEXTAREA_CLASSES;

  protected readonly contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
  });

  protected readonly newsletterForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  protected readonly submitting = signal(false);
  protected readonly subscribing = signal(false);

  protected showError(control: FormControl<string>): boolean {
    return control.invalid && control.touched;
  }

  protected errorKey(control: FormControl<string>): string {
    return control.hasError('required') ? 'contact.required' : 'contact.invalidEmail';
  }

  protected onSubmit(): void {
    if (this.submitting()) {
      return;
    }
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.notify({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please fill in all fields correctly.',
      });
      return;
    }

    this.submitting.set(true);
    this.api
      .sendContactMessage(this.contactForm.getRawValue())
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: () => {
          this.notify({
            icon: 'success',
            title: 'Message Sent!',
            text: 'Thank you for contacting me. I will get back to you soon.',
            timer: 3000,
          });
          this.contactForm.reset();
        },
        error: (error) => {
          console.error('Failed to send message:', error);
          this.notify({
            icon: 'error',
            title: 'Failed to Send',
            text: 'Please try again later or contact me directly via email.',
          });
        },
      });
  }

  protected subscribe(): void {
    if (this.subscribing()) {
      return;
    }
    const { email } = this.newsletterForm.controls;
    if (email.invalid) {
      email.markAsTouched();
      this.notify({
        icon: 'warning',
        title: 'Email Required',
        text: 'Please enter a valid email address.',
      });
      return;
    }

    this.subscribing.set(true);
    this.api
      .subscribeNewsletter(email.value)
      .pipe(finalize(() => this.subscribing.set(false)))
      .subscribe({
        next: () => {
          this.notify({
            icon: 'success',
            title: 'Subscribed!',
            text: 'You have been successfully subscribed to our newsletter.',
            timer: 2500,
          });
          this.newsletterForm.reset();
        },
        error: (error: unknown) => {
          console.error('Failed to subscribe:', error);
          const alreadySubscribed = isAlreadySubscribed(error);
          this.notify({
            icon: alreadySubscribed ? 'info' : 'error',
            title: alreadySubscribed ? 'Already Subscribed' : 'Subscription Failed',
            text: alreadySubscribed
              ? 'This email is already subscribed.'
              : 'Failed to subscribe. Please try again.',
          });
        },
      });
  }

  private notify(options: SweetAlertOptions): void {
    void Swal.fire({ confirmButtonColor: SWAL_CONFIRM_COLOR, ...options });
  }
}