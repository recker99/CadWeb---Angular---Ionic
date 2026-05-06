import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { DatabaseService } from '../../services/database';
import { Title, Meta } from '@angular/platform-browser';

// Importa los componentes específicos de Ionic para asegurar sus estilos en producción
import { 
  IonSegment, 
  IonSegmentButton, 
  IonLabel, 
  IonCard, 
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonGrid, 
  IonRow, 
  IonCol, 
  IonButton, 
  IonIcon 
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { gridOutline, arrowBackOutline, eyeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    // Declaramos cada componente individualmente para producción
    IonSegment, 
    IonSegmentButton, 
    IonLabel, 
    IonCard, 
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonGrid, 
    IonRow, 
    IonCol, 
    IonButton, 
    IonIcon
  ]
})
export class PortafolioComponent implements OnInit {

  proyectosDestacados: any[] = [];
  categoriaSeleccionada: string = 'todos';

  constructor(
    private db: DatabaseService, 
    private titleService: Title, 
    private metaService: Meta
  ) { 
    // Registramos los iconos que se usan dentro del portafolio (como el botón volver o el grid)
    addIcons({ 
      'grid-outline': gridOutline, 
      'arrow-back-outline': arrowBackOutline,
      'eye-outline': eyeOutline
    });
  }

  ngOnInit() {
    this.db.getProyectos().subscribe((res: any[]) => {
      this.proyectosDestacados = res.filter((p: any) => p.destacado === true);
    });

    this.titleService.setTitle('Servicios de AutoCAD y Proyectos de Ingeniería | Iván Bustos');

    this.metaService.updateTag({ 
      name: 'description', 
      content: 'Dibujante Proyectista con 20 años de experiencia. Especialista en digitalización de planos, modelado 3D y layouts técnicos en Santiago, Chile.' 
    });

    this.metaService.updateTag({ 
      name: 'keywords', 
      content: 'AutoCAD, Planos, Ingeniería Industrial, Digitalización, 3D, Chile, Proyectista CAD' 
    });
  }

  segmentChanged(event: any) {
    this.categoriaSeleccionada = event.detail.value;
  }
}