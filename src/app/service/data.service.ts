import { Injectable } from '@angular/core';
import { collectionData, docSnapshots, Firestore } from '@angular/fire/firestore';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }


// agregar un contacto a la collecion
  createContact(contacts: any){
    const document = doc(collection(this.firestore, 'contacts'));
    return setDoc(document, contacts);
  }
  
// trael todos los contactos almacenados
  getContacts(): Observable<any[]>{
    const contactsCollection = collection(this.firestore, 'contacts');
    return collectionData(contactsCollection, { idField: 'id'})
      .pipe(map(contacts => contacts as any[]));
  }
// optener todos los contacto especifico
  getContactById(id: string): Observable<any[]>{
    const document = doc(this.firestore, `contacts/${id}`);
    return docSnapshots(document)
      .pipe(map(doc =>{
        const id = doc.id;
        const data = doc.data();
        return { id, ...data} as any;
      }));
  }

// editar contactos
  editContact(contact: any){
    const document = doc(this.firestore, 'contacts', contact?.id);
    const { id, ...data} = contact;
    return setDoc(document, data);
  }
  
// eliminar/remover contactos epecificos
  removeContact(id: string){
    const document = doc(this.firestore, 'contacts', id);
    return deleteDoc(document);
  }
}
