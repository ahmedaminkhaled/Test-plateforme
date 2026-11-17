import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  readonly navItems = [
    { label: 'Requirements', route: '/requirements', count: 6 },
    { label: 'Test cases', route: '/test-cases', count: 48 },
    { label: 'Runs', route: '/runs', count: 14 },
    { label: 'Reports', route: '/reports', count: 3 }
  ];
}
