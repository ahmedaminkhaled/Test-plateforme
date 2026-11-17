import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RunResultService } from '../../services/run-result.service';
import { RunSummary } from '../../models/run-result.model';

@Component({
  selector: 'app-runs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './runs.component.html',
  styleUrls: ['./runs.component.scss']
})
export class RunsComponent {
  readonly service = inject(RunResultService);

  get run(): RunSummary {
    return this.service.currentRun();
  }

  runAgain(): void {
    alert('Triggering full automated test execution across Chrome, Firefox, and Grid nodes.');
  }

  exportReport(): void {
    alert('Generating HTML and JSON execution reports from automation artifacts.');
  }
}
