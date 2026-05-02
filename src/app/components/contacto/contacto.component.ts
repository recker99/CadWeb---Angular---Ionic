import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Importar formularios
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule] // Agregar ReactiveFormsModule 
})
export class ContactoComponent implements OnInit {

  contactForm!: FormGroup; // Variable para el grupo de controles

  // Inyectamos FormBuilder en el constructor
  constructor(
    private fb: FormBuilder, 
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    // Inicializamos las reglas de validación
    this.contactForm = this.fb.group({
      from_name: ['', [Validators.required, Validators.minLength(3)]],
      reply_to: ['', [Validators.required, Validators.email]],
      service_type: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  async enviarSolicitud(event: Event) {
    event.preventDefault();

    // Validamos antes de intentar enviar a EmailJS
    if (this.contactForm.invalid) {
      this.mostrarToast('Por favor, completa correctamente todos los campos.', 'warning');
      return;
    }
    
    //  configurar  emailjs.com
    const serviceID = 'service_2ukbi6q'; 
    const templateID = 'template_0cy82dp';
    const publicKey = 'ifvp214xeAVG6KpFC';

    try {
      await emailjs.sendForm(serviceID, templateID, event.target as HTMLFormElement, publicKey);
      this.mostrarToast('¡Solicitud enviada! Te contactaré a la brevedad.', 'success');
      
      // Reseteamos el formulario reactivo
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