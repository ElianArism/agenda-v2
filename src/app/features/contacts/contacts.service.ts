import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  DocumentReference,
  Firestore,
  getDoc,
  orderBy,
  query,
  updateDoc,
} from '@angular/fire/firestore';
import { environment } from '@envs/environment';
import { from, map, Observable } from 'rxjs';
import { IContact } from 'src/app/interfaces';

@Injectable({ providedIn: 'root' })
export class ContactsService {
  private readonly firestore: Firestore = inject(Firestore);
  private readonly contactsRef = collection(
    this.firestore,
    environment.COLLECTION_NAME
  );

  async createContact(contact: Partial<IContact>): Promise<void> {
    await addDoc(this.contactsRef, {
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...contact,
    });
  }

  updateContact(id: string, contact: Partial<IContact>): Promise<void> {
    const docRef: DocumentReference = this.getContactDocRef(id);
    return updateDoc(docRef, {
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...contact,
    });
  }

  deleteContact(id: string): Promise<void> {
    const docRef: DocumentReference = this.getContactDocRef(id);
    return deleteDoc(docRef);
  }

  getAllContacts(): Observable<IContact[]> {
    const getAllQuery = query(this.contactsRef, orderBy('createdAt', 'desc'));
    return collectionData(getAllQuery, {
      idField: 'id ',
    }) as Observable<IContact[]>;
  }

  getContactById(id: string): Observable<IContact> {
    const docRef: DocumentReference = this.getContactDocRef(id);
    return from(getDoc(docRef)).pipe(map((doc) => doc.data() as IContact));
  }

  // Looks for a document with the provided id and returns its reference.
  private getContactDocRef(id: string): DocumentReference {
    return doc(this.firestore, environment.COLLECTION_NAME, id);
  }
}
