import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  forks: number;
  created_at: string;
  updated_at: string;
  default_branch: string;
}

export interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImage?: string;
  tags: string[];
  author?: any;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  country: string;
  city: string;
  role?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: AuthUser;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl || 'http://localhost:3000/api';

  // Auth endpoints
  signup(data: { username: string; email: string; password: string; country: string; city: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/signup`, data);
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, { email, password });
  }

  getCurrentUser(): Observable<{ user: AuthUser }> {
    return this.http.get<{ user: AuthUser }>(`${this.apiUrl}/auth/me`, {
      headers: this.getAuthHeaders()
    });
  }

  getCities(country: string): Observable<{ cities: string[] }> {
    return this.http.get<{ cities: string[] }>(`${this.apiUrl}/auth/cities/${country}`);
  }

  // GitHub endpoints
  getRepos(): Observable<GitHubRepo[]> {
    return this.http.get<GitHubRepo[]>(`${this.apiUrl}/github/repos`);
  }

  getRepoReadme(owner: string, repo: string): Observable<{ content: string; url: string }> {
    return this.http.get<{ content: string; url: string }>(`${this.apiUrl}/github/repo/${owner}/${repo}/readme`);
  }

  // Blog endpoints
  getBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.apiUrl}/blog`);
  }

  getBlogPost(slug: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.apiUrl}/blog/${slug}`);
  }

  createBlogPost(post: Partial<BlogPost>): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${this.apiUrl}/blog`, post, {
      headers: this.getAuthHeaders()
    });
  }

  // Contact endpoints
  sendContactMessage(message: ContactMessage): Observable<{ message: string; id: string }> {
    return this.http.post<{ message: string; id: string }>(`${this.apiUrl}/contact`, message);
  }

  // Newsletter endpoints
  subscribeNewsletter(email: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/newsletter`, { email });
  }

  // Resume endpoints
  downloadResume(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/upload/resume`, {
      responseType: 'blob'
    });
  }

  uploadResume(file: File): Observable<{ message: string; filename: string; path: string }> {
    const formData = new FormData();
    formData.append('resume', file);
    return this.http.post<{ message: string; filename: string; path: string }>(
      `${this.apiUrl}/upload/resume`,
      formData,
      { headers: this.getAuthHeaders() }
    );
  }

  private getAuthHeaders(): { [key: string]: string } {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}

