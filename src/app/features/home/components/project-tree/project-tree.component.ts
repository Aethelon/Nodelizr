import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { defaultTreeData } from '@shared/data/tree-structure';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-project-tree',
  templateUrl: './project-tree.component.html',
  styleUrls: ['./project-tree.component.scss'],
  imports: [ CommonModule ],
})
export class ProjectTreeComponent {
  files: TreeNode[] = defaultTreeData;
}
