import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 
import { MenuController } from '@ionic/angular'; 
import { Title } from '@angular/platform-browser';
import { 
  IonApp, 
  IonRouterOutlet, 
  IonMenu, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonList, 
  IonItem, 
  IonIcon, 
  IonLabel
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { homeOutline, constructOutline, imagesOutline, mailOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    CommonModule,     
    RouterModule,     
    IonApp, 
    IonRouterOutlet, 
    IonMenu, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonList, 
    IonItem, 
    IonIcon, 
    IonLabel
  ],
})
export class AppComponent {
  constructor(private menu: MenuController, private titleService: Title) {
    addIcons({ homeOutline, constructOutline, imagesOutline, mailOutline });
    
    // Establece el nombre que aparecerá en la pestaña
    this.titleService.setTitle('Servicios Profesionales de Ingeniería y CAD');
  }

  closeMenu() {
    this.menu.close();
  }
}