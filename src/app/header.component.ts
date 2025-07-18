import { Component } from '@angular/core';

@Component({
  selector: 'manager-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  collapsed = true;
}
