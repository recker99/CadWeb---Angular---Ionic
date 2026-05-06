import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; 
import { Title, Meta } from '@angular/platform-browser';


// Importa tus nuevos componentes
import { HeaderComponent } from '../components/header/header.component';
import { HeroComponent } from '../components/hero/hero.component';
import { ServiciosComponent } from '../components/servicios/servicios.component';
import { PortafolioComponent } from '../components/portafolio/portafolio.component';
import { ContactoComponent } from '../components/contacto/contacto.component';
import { FooterComponent } from '../components/footer/footer.component';
import { DatabaseService } from '../services/database'; 
import { TarifaComponent } from '../components/tarifa/tarifa.component'; 
import { ExperienciaComponent } from '../components/experiencia/experiencia.component';

import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    HeaderComponent,
    HeroComponent,
    ServiciosComponent,
    PortafolioComponent,
    ContactoComponent,
    FooterComponent,
    TarifaComponent, 
    ExperienciaComponent
  ],
})
export class HomePage implements OnInit {
  
  proyectosDestacados: any[] = [];
  categoriaSeleccionada: string = 'todos';

  // Inyectar ActivatedRoute en el constructor
  constructor(
    private db: DatabaseService,
    private route: ActivatedRoute ,
    private titleService: Title, private metaService: Meta
  ) {
    addIcons({
      'home-outline': allIcons.homeOutline,
      'construct-outline': allIcons.constructOutline,
      'images-outline': allIcons.imagesOutline,
      'mail-outline': allIcons.mailOutline,
      'arrow-forward-outline': allIcons.arrowForwardOutline,
      'logo-whatsapp': allIcons.logoWhatsapp,
      'location-outline': allIcons.locationOutline,
      'call-outline': allIcons.callOutline,
      'layers-outline': allIcons.layersOutline,
      'cube-outline': allIcons.cubeOutline,
      'logo-linkedin': allIcons.logoLinkedin,
      'logo-github': allIcons.logoGithub,
      'compass-outline': allIcons.compassOutline, // Agregado para usar el logo

      // AGREGA ESTOS DOS AQUÍ:
      'code-working-outline': allIcons.codeWorkingOutline, 
      'ribbon-outline': allIcons.ribbonOutline,
      'send-outline': allIcons.sendOutline 
    });
  }

  ngOnInit() {
    // CARGA DE PROYECTOS
    this.db.getProyectos().subscribe((res: any[]) => {
      this.proyectosDestacados = res
        .filter((p: any) => p.destacado === true)
        .slice(0, 6); 
      console.log('Destacados cargados:', this.proyectosDestacados);
    });

    // LÓGICA DE NAVEGACIÓN (SCROLL)
    // Escuchamos los cambios en el fragmento (#id) de la URL
    this.route.fragment.subscribe(frag => {
      if (frag) {
        // Un pequeño timeout asegura que los componentes ya cargaron en el DOM
        setTimeout(() => {
          this.scrollToElement(frag);
        }, 100);
      }
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

  // Función auxiliar para el scroll
  scrollToElement(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  segmentChanged(event: any) {
    this.categoriaSeleccionada = event.detail.value;
  }
}