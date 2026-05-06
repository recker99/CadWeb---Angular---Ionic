import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

// Importaciones para Standalone
import { 
  IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, 
  IonTextarea, IonButton, IonIcon, ToastController,
  IonGrid, IonRow, IonCol 
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { sendOutline, logoWhatsapp } from 'ionicons/icons';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
  standalone: true,
  // Listamos los componentes específicos para asegurar los estilos en el hosting
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, 
    IonTextarea, IonButton, IonIcon,
    IonGrid, IonRow, IonCol 
  ]
})
export class ContactoComponent implements OnInit {

  contactForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private toastCtrl: ToastController
  ) {
    // Registramos el iconos  para limpiar errores de la consola
    addIcons({ 'send-outline': sendOutline, 'logo-whatsapp': logoWhatsapp });
  }

  ngOnInit() {
    this.contactForm = this.fb.group({
      from_name: ['', [Validators.required, Validators.minLength(3)]],
      reply_to: ['', [Validators.required, Validators.email]],
      service_type: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  async enviarSolicitud(event: Event) {
    event.preventDefault();

    if (this.contactForm.invalid) {
      this.mostrarToast('Por favor, completa correctamente todos los campos.', 'warning');
      return;
    }
    
    const serviceID = 'service_2ukbi6q'; 
    const templateID = 'template_0cy82dp';
    const publicKey = 'ifvp214xeAVG6KpFC';

    try {
      // Nota: Si usas sendForm, asegúrate de que los 'name' en el HTML coincidan con el template de EmailJS
      await emailjs.sendForm(serviceID, templateID, event.target as HTMLFormElement, publicKey);
      this.mostrarToast('¡Solicitud enviada! Te contactaré a la brevedad.', 'success');
      this.contactForm.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      this.mostrarToast('Error al enviar. Intenta por WhatsApp.', 'danger');
    }
  }

  irAWhatsApp() {
    const msg = encodeURIComponent('Hola Iván, te contacto desde tu portafolio para una cotización.');
    window.open(`https://wa.me/56955366462?text=${msg}`, '_blank');
  }

  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }
}