import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { addIcons } from 'ionicons';
import { 
  layersOutline, 
  constructOutline, 
  printOutline, 
  cubeOutline, 
  locationOutline, 
  schoolOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ServiciosComponent implements OnInit {
  constructor(private titleService: Title, private metaService: Meta) {
    /* Mapeamos los nombres exactamente como los busca Ionic */
    addIcons({ 
      'layers-outline': layersOutline,
      'construct-outline': constructOutline,
      'print-outline': printOutline,
      'cube-outline': cubeOutline,
      'location-outline': locationOutline,
      'school-outline': schoolOutline // Registro estándar
    });
  }
  ngOnInit() {
     this.configurarSEO();

      // Título único para esta sección
      this.titleService.setTitle('Servicios de AutoCAD y Proyectos de Ingeniería | Tu Nombre');

      //  Etiquetas Meta para Google
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

    configurarSEO() {
    // Cambia esto por tu URL real de Firebase
    const baseUrl = 'https://ingenieria-cad-pro.web.app'; 
    
    const titulo = 'Servicios de Ingeniería y AutoCAD Senior';
    const descripcion = 'Más de 20 años de trayectoria en digitalización y proyectos técnicos.';
    
    // La ruta a la imagen que apareceria en WhatsApp/LinkedIn
    const imagenSEO = `${baseUrl}/assets/images/preview-portafolio.jpg`;

    this.titleService.setTitle(titulo);

    // Google
    this.metaService.updateTag({ name: 'description', content: descripcion });

    // Facebook / LinkedIn / WhatsApp (Open Graph)
    this.metaService.updateTag({ property: 'og:title', content: titulo });
    this.metaService.updateTag({ property: 'og:description', content: descripcion });
    this.metaService.updateTag({ property: 'og:image', content: imagenSEO });
    this.metaService.updateTag({ property: 'og:url', content: baseUrl });
  }
    
}