import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RunResultService } from '../../services/run-result.service';
import { RunSummary, RunAnomaly } from '../../models/run-result.model';

@Component({
  selector: 'app-runs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './runs.component.html',
  styleUrls: ['./runs.component.scss']
})
export class RunsComponent {
  readonly service = inject(RunResultService);

  get allRuns(): RunSummary[] {
    return this.service.runs();
  }

  get run(): RunSummary {
    return this.service.currentRun();
  }

  get isExecuting(): boolean {
    return this.service.isExecuting();
  }

  get executionMessage(): string {
    return this.service.executionStatusMessage();
  }

  readonly anomalySummaryText = computed(() => {
    const anomalies = this.run.anomalies;
    if (anomalies.length === 0) {
      return 'All assertions passed cleanly across all test suites.';
    }

    const browserFailures: Record<string, number> = {};
    for (const a of anomalies) {
      const b = a.browser || 'General';
      browserFailures[b] = (browserFailures[b] || 0) + 1;
    }

    const details = Object.entries(browserFailures)
      .map(([k, v]) => `${v} on ${k}`)
      .join(', ');

    return `Failures detected: ${details}.`;
  });

  onSelectRun(runId: number): void {
    this.service.selectRun(runId);
  }

  runAgain(): void {
    this.service.triggerRun();
  }

  exportReport(): void {
    this.service.exportCurrentRunJson();
  }
}
