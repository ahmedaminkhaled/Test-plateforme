import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TestCaseService } from '../../services/test-case.service';
import { RequirementService } from '../../services/requirement.service';
import { RunResultService } from '../../services/run-result.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  private testCaseService = inject(TestCaseService);
  private requirementService = inject(RequirementService);
  private runResultService = inject(RunResultService);

  readonly requirementsCount = computed(() => this.requirementService.stories().length);
  readonly testCasesCount = computed(() => this.testCaseService.cases().length);
  readonly runsCount = computed(() => this.runResultService.runs().length);
  readonly reportsCount = computed(() => this.runResultService.reportsCount());

  readonly navItems = computed(() => [
    { label: 'Requirements', route: '/requirements', count: this.requirementsCount() },
    { label: 'Test cases', route: '/test-cases', count: this.testCasesCount() },
    { label: 'Runs', route: '/runs', count: this.runsCount() },
    { label: 'Reports', route: '/reports', count: this.reportsCount() }
  ]);
}
