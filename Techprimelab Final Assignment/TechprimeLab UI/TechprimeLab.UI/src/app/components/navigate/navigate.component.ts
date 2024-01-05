import { Component } from '@angular/core';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrl: './navigate.component.css'
})
export class NavigateComponent {


  activeImage: { [key: string]: boolean } = {
    dashboard: true,
    projectList: false,
    addCustomer: false
  };

  changeImage(imageKey: string): void {
    for (const key in this.activeImage) {
      if (key === imageKey) {
        this.activeImage[key] = true; // Set the clicked image as active
      } else {
        this.activeImage[key] = false; // Set other images as inactive
      }
    }
  }
}
