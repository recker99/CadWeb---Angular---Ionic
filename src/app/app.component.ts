import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 
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
  IonLabel,
  MenuController //  importar desde standalone
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { homeOutline, constructOutline, imagesOutline, mailOutline, compassOutline } from 'ionicons/icons';

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
  // Ahora el controlador está correctamente inyectado
  constructor(private menu: MenuController, private titleService: Title) {
    // Registramos todos los iconos, incluyendo el del logo
    addIcons({ 
      'home-outline': homeOutline, 
      'construct-outline': constructOutline, 
      'images-outline': imagesOutline, 
      'mail-outline': mailOutline,
      'compass-outline': compassOutline 
    });
    
    this.titleService.setTitle('Servicios Profesionales de Ingeniería y CAD');
  }

  // Aseguramos que el menú se cierre al clickear
  async closeMenu() {
    await this.menu.close('principal');
  }
}