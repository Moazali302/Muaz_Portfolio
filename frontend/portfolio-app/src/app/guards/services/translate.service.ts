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
      'nav.signup': 'Sign Up',
      'nav.login': 'Login',
      'nav.contact': 'Contact',
      'hero.title': 'MoazAli',
      'hero.subtitle': 'Full Stack Developer & Student',
      'hero.education': 'Riphah International University (2022–2026)',
      'hero.hire': 'Hire Me',
      'hero.resume': 'View Resume',
      'hero.contact': 'Contact',
      'about.title': 'About Me',
      'about.description': 'I am a passionate Full Stack developer and student at Riphah International University, pursuing my degree from 2022 to 2026. I love creating innovative solutions and learning new technologies.',
      'skills.title': 'Skills',
      'projects.title': 'Projects',
      'projects.filter': 'Filter by technology',
      'projects.search': 'Search projects...',
      'projects.view': 'View Repository',
      'projects.demo': 'Live Demo',
      'projects.details': 'View Details',
      'blog.title': 'Blog',
      'blog.read': 'Read More',
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
      'nav.contact': 'رابطہ',
      'hero.title': 'MoazAli',
      'hero.subtitle': 'سافٹ ویئر ڈویلپر اور طالب علم',
      'hero.education': 'ریفاہ انٹرنیشنل یونیورسٹی (2022–2026)',
      'hero.hire': 'مجھے ملازمت دیں',
      'hero.resume': 'ریزیومے دیکھیں',
      'hero.contact': 'رابطہ',
      'about.title': 'میرے بارے میں',
      'about.description': 'میں ریفاہ انٹرنیشنل یونیورسٹی میں ایک پرجوش سافٹ ویئر ڈویلپر اور طالب علم ہوں، جو 2022 سے 2026 تک اپنی ڈگری حاصل کر رہا ہوں۔ مجھے اختراعی حل بنانے اور نئی ٹیکنالوجیز سیکھنے کا شوق ہے۔',
      'skills.title': 'مہارتیں',
      'projects.title': 'پروجیکٹس',
      'projects.filter': 'ٹیکنالوجی کے لحاظ سے فلٹر کریں',
      'projects.search': 'پروجیکٹس تلاش کریں...',
      'projects.view': 'ریپوزیٹری دیکھیں',
      'projects.demo': 'لائیو ڈیمو',
      'projects.details': 'تفصیلات دیکھیں',
      'blog.title': 'بلاگ',
      'blog.read': 'مزید پڑھیں',
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

