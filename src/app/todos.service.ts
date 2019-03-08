import { Todos } from './todos.model';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Timestamp } from '@firebase/firestore-types';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  editSub = new BehaviorSubject<Todos>({todo: '', dateFrom: null, dateTo: null, priority: null});
  editSubObs = this.editSub.asObservable();
  todos: Observable<Todos[]>;
  private firestoreCollection: AngularFirestoreCollection<Todos>;
  constructor(private db: AngularFirestore) {
    this.firestoreCollection = db.collection('todos');
    this.todos = this.db.collection('todos').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Todos;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
   }

  addTodo(todo: Todos) {
    // this.firestoreCollection.doc(id).set(todo);
    this.firestoreCollection.add(todo);
  }

  getTodos() {
    return this.todos;
  }

  setCompleted(id: string, todo: Todos) {
    this.firestoreCollection.doc(id).set(todo);
  }
  deleteTodo(id: string) {
    // console.log(id);
    this.db.collection('todos').doc(id).delete();
  }
}
