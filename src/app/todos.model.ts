import { Timestamp } from '@firebase/firestore-types';

export interface Todos {
  id?: string;
  todo?: string;
  dateFrom?: Timestamp;
  dateTo?: Timestamp;
  priority?: number;
  done?: Boolean;
  // checked?: Boolean;
}
