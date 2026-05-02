import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DatabaseService } from '../../services/database'; 
import { Title, Meta } from '@angular/platform-browser';
// Importación de iconos y controlador
import { addIcons } from 'ionicons';
import { documentTextOutline, openOutline, searchOutline, imageOutline } from 'ionicons/icons';

// Definimos la agrupación de tus subcarpetas de GitHub/Firebase
const GRUPOS_CATEGORIAS: { [key: string]: string[] } = {
  'arquitectura': ['arquitectura', 'construcciones', 'modelamiento3d'],
  'ingenieria':   ['ingenieria', 'mecanica', 'electricidad', 'saneamiento'],
  'terreno':      ['terreno', 'topografia', 'camaras'],
  'diseño':      ['diseño','grafica', 'catalogo'],
  'otros':        ['otros']
};

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.page.html',
  styleUrls: ['./proyectos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProyectosPage implements OnInit {

  proyectosFiltrados: any[] = [];
  todosLosProyectos: any[] = [];

  constructor(private db: DatabaseService, private titleService: Title, private metaService: Meta) {
    // Registro de iconos para evitar errores de URL base
    addIcons({ documentTextOutline, openOutline, searchOutline, imageOutline });
  }

   ngOnInit() {
    this.db.getProyectos().subscribe(res => {
      this.todosLosProyectos = res;
      this.proyectosFiltrados = this.todosLosProyectos;
      console.log('Proyectos cargados:', res);
    });

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


  filterProjects(event: any) {
  const seleccion = event.detail.value;

  if (seleccion === 'todos') {
    this.proyectosFiltrados = this.todosLosProyectos;
    return;
  }

  this.proyectosFiltrados = this.todosLosProyectos.filter(p => {
    // Usamos trim() para eliminar espacios accidentales al inicio o final
    const categoriaProyecto = p.categoria?.toLowerCase().trim();
    const subcarpetasPermitidas = GRUPOS_CATEGORIAS[seleccion];
    
    return subcarpetasPermitidas && subcarpetasPermitidas.includes(categoriaProyecto);
  });
}
}