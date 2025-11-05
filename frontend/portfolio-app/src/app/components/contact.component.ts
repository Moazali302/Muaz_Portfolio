import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '../guards/services/translate.service';
import { ApiService, ContactMessage } from '../guards/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact" class="py-20 px-4 bg-white dark:bg-slate-900">
      <div class="container mx-auto max-w-4xl">
        <h2 class="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {{ translate.translate('contact.title') }}
        </h2>
        
        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200">Contact Information</h3>
            <div class="space-y-4">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-slate-800 dark:text-slate-200">Email</p>
                  <a href="mailto:moazj049@gmail.com" class="text-indigo-600 dark:text-indigo-400 hover:underline">
                    moazj049@gmail.com
                  </a>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-slate-800 dark:text-slate-200">Phone</p>
                  <a href="tel:03278031032" class="text-indigo-600 dark:text-indigo-400 hover:underline">
                    03278031032
                  </a>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-teal-600 dark:text-teal-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-slate-800 dark:text-slate-200">LinkedIn</p>
                  <a href="https://www.linkedin.com/in/moaz-ali-4710ba397/" target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 hover:underline">
                    View Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <form (ngSubmit)="onSubmit()" class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-semibold mb-2 text-slate-800 dark:text-slate-200">
                {{ translate.translate('contact.name') }}
              </label>
              <input
                type="text"
                id="name"
                [(ngModel)]="contactForm.name"
                name="name"
                required
                class="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label for="email" class="block text-sm font-semibold mb-2 text-slate-800 dark:text-slate-200">
                {{ translate.translate('contact.email') }}
              </label>
              <input
                type="email"
                id="email"
                [(ngModel)]="contactForm.email"
                name="email"
                required
                class="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label for="message" class="block text-sm font-semibold mb-2 text-slate-800 dark:text-slate-200">
                {{ translate.translate('contact.message') }}
              </label>
              <textarea
                id="message"
                [(ngModel)]="contactForm.message"
                name="message"
                rows="5"
                required
                class="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              [disabled]="submitting()"
              class="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              @if (submitting()) {
                Sending...
              } @else {
                {{ translate.translate('contact.send') }}
              }
            </button>
          </form>
        </div>
        
        <div class="mt-12 p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 border border-indigo-100 dark:border-slate-600">
          <h3 class="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200">
            {{ translate.translate('contact.newsletter') }}
          </h3>
          <div class="flex gap-2">
            <input
              type="email"
              [(ngModel)]="newsletterEmail"
              [placeholder]="translate.translate('contact.newsletter.placeholder')"
              class="flex-1 px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              (click)="subscribeNewsletter()"
              [disabled]="subscribing()"
              class="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {{ translate.translate('contact.newsletter.subscribe') }}
            </button>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ContactComponent {
  translate = inject(TranslateService);
  apiService = inject(ApiService);
  
  contactForm: ContactMessage = {
    name: '',
    email: '',
    message: ''
  };
  newsletterEmail = '';
  submitting = signal(false);
  subscribing = signal(false);

  onSubmit(): void {
    if (!this.contactForm.name || !this.contactForm.email || !this.contactForm.message) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please fill in all fields.',
        confirmButtonColor: '#6366f1'
      });
      return;
    }
    
    this.submitting.set(true);
    this.apiService.sendContactMessage(this.contactForm).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: 'Thank you for contacting me. I will get back to you soon.',
          confirmButtonColor: '#6366f1',
          timer: 3000
        });
        this.contactForm = { name: '', email: '', message: '' };
        this.submitting.set(false);
      },
      error: (err) => {
        console.error('Failed to send message:', err);
        Swal.fire({
          icon: 'error',
          title: 'Failed to Send',
          text: 'Please try again later or contact me directly via email.',
          confirmButtonColor: '#6366f1'
        });
        this.submitting.set(false);
      }
    });
  }

  subscribeNewsletter(): void {
    if (!this.newsletterEmail) {
      Swal.fire({
        icon: 'warning',
        title: 'Email Required',
        text: 'Please enter your email address.',
        confirmButtonColor: '#6366f1'
      });
      return;
    }
    
    this.subscribing.set(true);
    this.apiService.subscribeNewsletter(this.newsletterEmail).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Subscribed!',
          text: 'You have been successfully subscribed to our newsletter.',
          confirmButtonColor: '#6366f1',
          timer: 2500
        });
        this.newsletterEmail = '';
        this.subscribing.set(false);
      },
      error: (err) => {
        console.error('Failed to subscribe:', err);
        const errorMessage = err.error?.error?.includes('already subscribed') 
          ? 'This email is already subscribed.'
          : 'Failed to subscribe. Please try again.';
        Swal.fire({
          icon: err.error?.error?.includes('already subscribed') ? 'info' : 'error',
          title: err.error?.error?.includes('already subscribed') ? 'Already Subscribed' : 'Subscription Failed',
          text: errorMessage,
          confirmButtonColor: '#6366f1'
        });
        this.subscribing.set(false);
      }
    });
  }
}

