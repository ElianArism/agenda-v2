import { Timestamp } from '@angular/fire/firestore';

export interface IContact {
  id: string;
  name: string;
  email: string;
  phone: number;
  action: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
