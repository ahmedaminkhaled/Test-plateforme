import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, HealthResponse } from '../../services/api.service';

@Component({
  selector: 'app-health',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.scss']
})
export class HealthComponent implements OnInit {
  private api = inject(ApiService);

  readonly loading = signal<boolean>(true);
  readonly healthData = signal<HealthResponse | null>(null);
  readonly lastChecked = signal<string>('');

  ngOnInit(): void {
    this.checkHealth();
  }

  checkHealth(): void {
    this.loading.set(true);
    this.api.getHealth().subscribe({
      next: (res) => {
        this.healthData.set(res);
        this.lastChecked.set(new Date().toLocaleTimeString());
        this.loading.set(false);
      },
      error: (err) => {
        this.healthData.set({
          status: 'error',
          app_env: 'Error: ' + err.message
        });
        this.lastChecked.set(new Date().toLocaleTimeString());
        this.loading.set(false);
      }
    });
  }
}
