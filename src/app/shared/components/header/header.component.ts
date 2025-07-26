import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLight = false;

  constructor() {}

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    this.isLight = savedTheme === 'light';
    this.updateBodyTheme();
  }

  toggleTheme(): void {
    this.isLight = !this.isLight;
    localStorage.setItem('theme', this.isLight ? 'light' : 'dark');
    this.updateBodyTheme();
  }

  updateBodyTheme(): void {
    document.body.setAttribute('data-theme', this.isLight ? 'light' : 'dark');
  }
}
