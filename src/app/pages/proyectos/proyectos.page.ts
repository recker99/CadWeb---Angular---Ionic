import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../../services/database'; 
import { Title, Meta } from '@angular/platform-browser';

// IMPORTACIONES DE PRECISIÓN (Ionic Standalone)
import { 
  IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonSegment, IonSegmentButton, IonLabel, IonGrid, IonRow, IonCol,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonButton, IonCardSubtitle,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { 
  documentTextOutline, openOutline, searchOutline, 
  imageOutline, arrowBackOutline, gridOutline 
} from 'ionicons/icons';

const GRUPOS_CATEGORIAS: { [key: string]: string[] } = {
  'arquitectura': ['arquitectura', 'construcciones', 'modelamiento3d'],
  'ingenieria':   ['ingenieria', 'mecanica', 'electricidad', 'saneamiento'],
  'terreno':      ['terreno', 'topografia', 'camaras'],
  'diseño':       ['diseño','grafica', 'catalogo'],
  'otros':        ['otros']
};

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.page.html',
  styleUrls: ['./proyectos.page.scss'],
  standalone: true,
  // IMPORTANTE: Listamos cada componente para que los estilos carguen en el hosting
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
    IonSegment, IonSegmentButton, IonLabel, IonGrid, IonRow, IonCol,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonButton, IonCardSubtitle
  ]
})
export class ProyectosPage implements OnInit {

  proyectosFiltrados: any[] = [];
  todosLosProyectos: any[] = [];

  constructor(private db: DatabaseService, private titleService: Title, private metaService: Meta) {
    // Registramos todos los iconos, incluyendo los que pedía la consola (grid y arrow-back)
    addIcons({ 
      documentTextOutline, 
      openOutline, 
      searchOutline, 
      imageOutline,
      'arrow-back-outline': arrowBackOutline,
      'grid-outline': gridOutline 
    });
  }

  ngOnInit() {
    this.db.getProyectos().subscribe(res => {
      this.todosLosProyectos = res;
      this.proyectosFiltrados = this.todosLosProyectos;
    });

    this.titleService.setTitle('Portafolio de Proyectos CAD e Ingeniería | Iván Bustos');

    this.metaService.updateTag({ 
      name: 'description', 
      content: 'Explora mi portafolio de proyectos: Planos de arquitectura, estructuras industriales y levantamientos de terreno realizados en AutoCAD.' 
    });
  }

  filterProjects(event: any) {
    const seleccion = event.detail.value;

    if (seleccion === 'todos') {
      this.proyectosFiltrados = this.todosLosProyectos;
      return;
    }

    this.proyectosFiltrados = this.todosLosProyectos.filter(p => {
      const categoriaProyecto = p.categoria?.toLowerCase().trim();
      const subcarpetasPermitidas = GRUPOS_CATEGORIAS[seleccion];
      return subcarpetasPermitidas && subcarpetasPermitidas.includes(categoriaProyecto);
    });
  }
}