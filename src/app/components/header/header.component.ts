import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonIcon, 
  IonButtons, 
  IonButton, 
  IonMenuButton 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true, 
  imports: [
    CommonModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonIcon, 
    IonButtons, 
    IonButton, 
    IonMenuButton
  ] 
})
export class HeaderComponent implements OnInit {
  constructor() { }
  ngOnInit() {} 
}