import { TreeNode } from 'primeng/api';

export const defaultTreeData: TreeNode[] = [
  {
    key: '0',
    label: 'src',
    expanded: true,
    icon: 'pi pi-folder',
    children: [
      {
        key: '0-0',
        label: 'index.js',
        icon: 'pi pi-file',
      },
    ],
  },
  {
    key: '4',
    label: 'public',
    icon: 'pi pi-folder',
  },
  {
    key: '1',
    label: 'package.json',
    icon: 'pi pi-file',
  },
  {
    key: '2',
    label: 'README.md',
    icon: 'pi pi-file',
  },
  {
    key: '3',
    label: '.gitignore',
    icon: 'pi pi-file',
  },
  {
    key: '5',
    label: 'LICENSE',
    icon: 'pi pi-file',
  },
  {  key: '6',
    label: '.env.example',
    icon: 'pi pi-file',
  },
];
