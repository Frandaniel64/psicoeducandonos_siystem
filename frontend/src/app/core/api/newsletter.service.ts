import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface NewsletterSubscribePayload {
  email: string;
}

@Injectable({ providedIn: 'root' })
export class NewsletterService {
  private readonly http = inject(HttpClient);

  subscribe(email: string): Observable<void> {
    const payload: NewsletterSubscribePayload = { email };
    return this.http.post<void>(`${environment.apiUrl}/newsletter/subscribe`, payload);
  }
}
