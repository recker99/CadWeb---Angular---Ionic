import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { 
  logoWhatsapp, 
  logoLinkedin, 
  logoGithub, 
  mailOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class FooterComponent implements OnInit {

  // definir el año dinámicamente 
  currentYear: number = new Date().getFullYear();

  constructor() {
        addIcons({
        'logo-whatsapp': logoWhatsapp,
        'logo-linkedin': logoLinkedin,
        'logo-github': logoGithub,
        'mail-outline': mailOutline
      });
   }

  ngOnInit() {}

}