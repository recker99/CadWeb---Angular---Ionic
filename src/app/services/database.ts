import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private firestore = inject(Firestore);

  // Esta función traerá todos tus planos desde Firebase
  getProyectos(): Observable<any[]> {
    const proyectosRef = collection(this.firestore, 'proyectos');
    return collectionData(proyectosRef, { idField: 'id' });
  }
}