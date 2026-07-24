import { Injectable, signal } from '@angular/core';

export interface Translations {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  currentLang = signal<'en' | 'ur'>('en');
  translations: { en: Translations; ur: Translations } = {
    en: {
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.skills': 'Skills',
      'nav.projects': 'Projects',
      'nav.blog': 'Blog',
      'nav.experience': 'Experience',
      'nav.signup': 'Sign Up',
      'nav.login': 'Login',
      'nav.contact': 'Contact',
      'hero.title': 'MoazAli',
      'hero.subtitle': 'Frontend Developer (Angular)',
      'hero.education': 'Available for freelance & full-time opportunities',
      'hero.hire': 'Hire Me',
      'hero.resume': 'View Resume',
      'hero.contact': 'Contact',
      'about.title': 'About Me',
      'about.description': "Frontend Developer specializing in Angular with hands-on production experience building enterprise-grade, multi-portal web applications. I focus on crafting scalable, reusable UI components using Angular, TypeScript, and ag-Grid, with strong expertise in role-based access control, multilingual (i18n) implementation, and real-time data synchronization. I bring a problem-solving mindset to complex state management challenges, consistently delivering clean, production-ready code that follows Angular best practices — with a passion for building efficient, user-focused solutions.",
      'skills.title': 'Skills',
      'projects.title': 'Projects',
      'projects.filter': 'Filter by technology',
      'projects.search': 'Search projects...',
      'projects.view': 'View Repository',
      'projects.demo': 'Live Demo',
      'projects.details': 'View Details',
      'blog.title': 'Blog',
      'blog.read': 'Read More',
      'experience.title': 'Experience',
      'contact.title': 'Get In Touch',
      'contact.name': 'Name',
      'contact.email': 'Email',
      'contact.message': 'Message',
      'contact.send': 'Send Message',
      'contact.newsletter': 'Subscribe to Newsletter',
      'contact.newsletter.placeholder': 'Enter your email',
      'contact.newsletter.subscribe': 'Subscribe',
      'footer.copyright': '© 2025 MoazAli. All rights reserved.',
      'auth.login': 'Login',
      'auth.signup': 'Sign Up',
      'auth.logout': 'Logout',
      'auth.email': 'Email',
      'auth.password': 'Password',
      'auth.username': 'Username',
      'auth.country': 'Country',
      'auth.city': 'City'
    },
    ur: {
      'nav.home': 'ہوم',
      'nav.about': 'میرے بارے میں',
      'nav.skills': 'مہارتیں',
      'nav.projects': 'پروجیکٹس',
      'nav.blog': 'بلاگ',
      'nav.experience': 'تجربہ',
      'nav.contact': 'رابطہ',
      'hero.title': 'MoazAli',
      'hero.subtitle': 'فرنٹ اینڈ ڈویلپر (اینگولر)',
      'hero.education': 'فری لانس اور فل ٹائم مواقع کے لیے دستیاب',
      'hero.hire': 'مجھے ملازمت دیں',
      'hero.resume': 'ریزیومے دیکھیں',
      'hero.contact': 'رابطہ',
      'about.title': 'میرے بارے میں',
      'about.description':  "میں ایک فرنٹ اینڈ ڈیولپر ہوں جو Angular میں مہارت رکھتا ہے اور انٹرپرائز گریڈ، ملٹی پورٹل ویب ایپلیکیشنز بنانے کا عملی تجربہ رکھتا ہوں۔ میری توجہ Angular، TypeScript اور ag-Grid کا استعمال کرتے ہوئے قابلِ توسیع اور دوبارہ قابلِ استعمال UI کمپوننٹس بنانے پر مرکوز ہے، جس میں رول بیسڈ ایکسس کنٹرول، ملٹی لینگول (i18n) امپلیمینٹیشن، اور ریئل ٹائم ڈیٹا سنکرونائزیشن میں مضبوط مہارت شامل ہے۔ میں پیچیدہ اسٹیٹ مینجمنٹ چیلنجز کو حل کرنے کے لیے مسئلہ حل کرنے کی صلاحیت رکھتا ہوں، اور مسلسل صاف ستھرا، پروڈکشن کے لیے تیار کوڈ فراہم کرتا ہوں جو Angular کی بہترین پریکٹسز کی پیروی کرتا ہے — مؤثر اور یوزر فوکسڈ حل تیار کرنے کے جذبے کے ساتھ۔",
      'skills.title': 'مہارتیں',
      'projects.title': 'پروجیکٹس',
      'projects.filter': 'ٹیکنالوجی کے لحاظ سے فلٹر کریں',
      'projects.search': 'پروجیکٹس تلاش کریں...',
      'projects.view': 'ریپوزیٹری دیکھیں',
      'projects.demo': 'لائیو ڈیمو',
      'projects.details': 'تفصیلات دیکھیں',
      'blog.title': 'بلاگ',
      'blog.read': 'مزید پڑھیں',
      'experience.title': 'تجربہ',
      'contact.title': 'رابطہ کریں',
      'contact.name': 'نام',
      'contact.email': 'ای میل',
      'contact.message': 'پیغام',
      'contact.send': 'پیغام بھیجیں',
      'contact.newsletter': 'نیوزلیٹر کو سبسکرائب کریں',
      'contact.newsletter.placeholder': 'اپنا ای میل درج کریں',
      'contact.newsletter.subscribe': 'سبسکرائب کریں',
      'footer.copyright': '© 2024 MoazAli. تمام حقوق محفوظ ہیں۔',
      'auth.login': 'لاگ ان',
      'auth.signup': 'سائن اپ',
      'auth.logout': 'لاگ آؤٹ',
      'auth.email': 'ای میل',
      'auth.password': 'پاس ورڈ',
      'auth.username': 'صارف نام',
      'auth.country': 'ملک',
      'auth.city': 'شہر'
    }
  };

  translate(key: string): string {
    const lang = this.currentLang();
    return this.translations[lang][key] || key;
  }

  toggleLang(): void {
    this.currentLang.set(this.currentLang() === 'en' ? 'ur' : 'en');
    document.documentElement.setAttribute('lang', this.currentLang());
    document.documentElement.setAttribute('dir', this.currentLang() === 'ur' ? 'rtl' : 'ltr');
  }
}

