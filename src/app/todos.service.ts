import { Todos } from './todos.model';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  editSub = new BehaviorSubject<Todos>({todo: '', dateFrom: null, dateTo: null, priority: null, description: ''});
  editSubObs = this.editSub.asObservable();

  editMode = new BehaviorSubject<boolean>(false);
  editModeObs = this.editMode.asObservable();

  id: string;

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

  setTodo(todo: Todos) {
    this.firestoreCollection.doc(this.id).set(todo);
  }
  deleteTodo(id: string) {
    // console.log(id);
    this.db.collection('todos').doc(id).delete();
  }

  getId(id: string) {
    this.id = id;
    // console.log(id);
  }
}
