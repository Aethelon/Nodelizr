import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

 isLight = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      this.enableLightTheme();
    }
  }

  toggleTheme(): void {
    this.isLight = !this.isLight;
    if (this.isLight) {
      this.enableLightTheme();
      localStorage.setItem('theme', 'light');
    } else {
      this.disableLightTheme();
      localStorage.setItem('theme', 'dark');
    }
  }

  enableLightTheme(): void {
    this.renderer.setAttribute(document.body, 'data-theme', 'light');
    const icon = document.querySelector('#themeToggle i');
    icon?.classList.remove('pi-sun');
    icon?.classList.add('pi-moon');
  }

  disableLightTheme(): void {
    this.renderer.removeAttribute(document.body, 'data-theme');
    const icon = document.querySelector('#themeToggle i');
    icon?.classList.remove('pi-moon');
    icon?.classList.add('pi-sun');
  }
}