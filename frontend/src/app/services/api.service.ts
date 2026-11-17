import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

export interface HealthResponse {
  status: string;
  app_env?: string;
  timestamp?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);

  getHealth(): Observable<HealthResponse> {
    return this.http.get<HealthResponse>('/api/health').pipe(
      catchError((error) => {
        return of({
          status: 'offline',
          app_env: 'backend unavailable (' + (error.statusText || error.message || 'connection failed') + ')'
        });
      })
    );
  }
}
