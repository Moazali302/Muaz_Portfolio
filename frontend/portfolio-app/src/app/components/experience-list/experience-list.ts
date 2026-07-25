import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateService } from '../../guards/services/translate.service';
import { ApiService, Experience } from '../../guards/services/api.service';

@Component({
  selector: 'app-experience-list',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterModule],
  templateUrl: './experience-list.html'
})
export class ExperienceComponent implements OnInit {
  translate = inject(TranslateService);
  apiService = inject(ApiService);

  experiences = signal<Experience[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.loadExperiences();
  }

  loadExperiences(): void {
    this.loading.set(true);
    this.apiService.getExperiences().subscribe({
      next: (experiences) => {
        this.experiences.set(experiences);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load experiences:', err);
        this.loading.set(false);
      }
    });
  }
}