import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'

// ---------- Interfaces ----------
export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  url: string
  homepage: string | null
  language: string | null
  topics: string[]
  stars: number
  forks: number
  created_at: string
  updated_at: string
  default_branch: string
}

export interface BlogPost {
  _id?: string
  title: string
  slug: string
  excerpt: string
  body: string
  coverImage?: string
  tags: string[]
  author?: any
  published: boolean
  createdAt?: string
  updatedAt?: string
}

export interface ContactMessage {
  name: string
  email: string
  message: string
}

// ---------- Service ----------
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient)
  private apiUrl = environment.apiUrl || 'http://localhost:3000/api'

  // ----- GitHub -----
  getRepos(): Observable<GitHubRepo[]> {
    return this.http.get<GitHubRepo[]>(`${this.apiUrl}/github/repos`)
  }

  getRepoReadme(owner: string, repo: string): Observable<{ content: string; url: string }> {
    return this.http.get<{ content: string; url: string }>(
      `${this.apiUrl}/github/repo/${owner}/${repo}/readme`
    )
  }

  // ----- Blog -----
  getBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.apiUrl}/blog`)
  }

  getBlogPost(slug: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.apiUrl}/blog/${slug}`)
  }

  // ----- Contact -----
  sendContactMessage(message: ContactMessage): Observable<{ message: string; id: string }> {
    return this.http.post<{ message: string; id: string }>(`${this.apiUrl}/contact`, message)
  }

  // ----- Newsletter -----
  subscribeNewsletter(email: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/newsletter`, { email })
  }

  // ----- Resume -----
  downloadResume(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/upload/resume`, {
      responseType: 'blob'
    })
  }

  uploadResume(file: File): Observable<{ message: string; filename: string; path: string }> {
    const formData = new FormData()
    formData.append('resume', file)
    return this.http.post<{ message: string; filename: string; path: string }>(
      `${this.apiUrl}/upload/resume`,
      formData
    )
  }
}
