import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-dependencies-section',
  templateUrl: './dependencies-section.component.html',
  styleUrls: ['./dependencies-section.component.scss'],
})
export class DependenciesSectionComponent {
  @Input() filterForm!: FormGroup;
}
