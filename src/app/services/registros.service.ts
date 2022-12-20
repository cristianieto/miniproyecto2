import { Injectable } from '@angular/core';
import {
  Firestore, addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  docSnapshots,
} from '@angular/fire/firestore';
import { Presupuesto } from '../modelos/presupuesto';
import { Registro } from '../modelos/registro';


@Injectable({
  providedIn: 'root'
})
export class RegistrosService {

  constructor(private firestore: Firestore) { }

  get_registros() {
    const docRef = collection(this.firestore, 'registros');

    return collectionData(docRef, { idField: 'id' });
  }

  get_registro(id: string) {
    const docRef = doc(this.firestore, 'registros', id);
    return getDoc(docRef);
  }

  add_registro(nuevo: Registro) {
    const registroRef = collection(this.firestore, 'registros');
    return addDoc(registroRef, nuevo);
  }

  update_registro(registro: Registro) {
    const registroRef = doc(this.firestore, `registros/${registro.id}`);
    return setDoc(registroRef, { editada: new Date(), ...registro });
  }

  delete_registro(registro: Registro) {
    const registroRef = doc(this.firestore, `registros/${registro.id}`);
    return deleteDoc(registroRef);
  }

  get_presupuesto(id: string) {
    const docRef = doc(this.firestore, 'presupuestos', id);
    return getDoc(docRef);
  }

  update_presupuesto(presupuesto: Presupuesto) {
    const registroRef = doc(this.firestore, `presupuestos/${presupuesto.id}`);
    
    return setDoc(registroRef, {...presupuesto });
  }
}
