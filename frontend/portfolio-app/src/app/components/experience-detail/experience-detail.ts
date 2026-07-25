import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService, Experience } from '../../guards/services/api.service';

@Component({
  selector: 'app-experience-detail',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterModule],
  templateUrl: './experience-detail.html'
})
export class ExperienceDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);

  experience = signal<Experience | null>(null);
  loading = signal(true);
  error = signal(false);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.loadExperience(slug);
    } else {
      this.error.set(true);
      this.loading.set(false);
    }
  }

  loadExperience(slug: string): void {
    this.loading.set(true);
    this.error.set(false);

    this.apiService.getExperience(slug).subscribe({
      next: (exp) => {
        this.experience.set(exp);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load experience:', err);
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }
}