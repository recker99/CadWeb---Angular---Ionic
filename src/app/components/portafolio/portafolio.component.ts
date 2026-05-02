import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { IonicModule } from '@ionic/angular'; 
import { RouterModule } from '@angular/router';
import { DatabaseService } from '../../services/database';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class PortafolioComponent implements OnInit {

  // Declaramos la variable que el HTML no encontraba
  proyectosDestacados: any[] = [];
  categoriaSeleccionada: string = 'todos';

  constructor(private db: DatabaseService, private titleService: Title, private metaService: Meta) { }

  ngOnInit() {
    this.db.getProyectos().subscribe((res: any[]) => {
      // Filtrar por el campo 'destacado' agregado en Firebase
      this.proyectosDestacados = res.filter((p: any) => p.destacado === true);
    });

    // Título único para esta sección
    this.titleService.setTitle('Servicios de AutoCAD y Proyectos de Ingeniería | Tu Nombre');

    //Etiquetas Meta para Google
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'Dibujante Proyectista con 20 años de experiencia. Especialista en digitalización de planos, modelado 3D y layouts técnicos en Santiago, Chile.' 
    });

    //Keywords (Palabras clave)
    this.metaService.updateTag({ 
      name: 'keywords', 
      content: 'AutoCAD, Planos, Ingeniería Industrial, Digitalización, 3D, Chile, Proyectista CAD' 
    });
  }

  segmentChanged(event: any) {
    this.categoriaSeleccionada = event.detail.value;
  }
}
