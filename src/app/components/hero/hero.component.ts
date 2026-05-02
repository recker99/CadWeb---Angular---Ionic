import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'; 
import { CommonModule } from '@angular/common'; 
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  standalone: true, 
  imports: [IonicModule, CommonModule] 
})
export class HeroComponent implements OnInit {

  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit() {
    // Título único para esta sección
    this.titleService.setTitle('Servicios de AutoCAD y Proyectos de Ingeniería | Tu Nombre');

    // Etiquetas Meta para Google
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'Dibujante Proyectista con 20 años de experiencia. Especialista en digitalización de planos, modelado 3D y layouts técnicos en Santiago, Chile.' 
    });

    // Keywords (Palabras clave)
    this.metaService.updateTag({ 
      name: 'keywords', 
      content: 'AutoCAD, Planos, Ingeniería Industrial, Digitalización, 3D, Chile, Proyectista CAD' 
    });
  }

}