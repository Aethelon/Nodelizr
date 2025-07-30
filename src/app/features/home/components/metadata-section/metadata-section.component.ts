import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ProjectTreeComponent } from '../project-tree/project-tree.component';

@Component({
  standalone: true,
  selector: 'app-metadata-section',
  templateUrl: './metadata-section.component.html',
  styleUrls: ['./metadata-section.component.scss'],
  imports: [
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ProjectTreeComponent,
  ],
})
export class MetadataSectionComponent {
  @Input() filterForm!: FormGroup;
  @Output() generate = new EventEmitter<void>();
}
