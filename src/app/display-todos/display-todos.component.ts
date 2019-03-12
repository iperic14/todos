import { Component, OnInit } from '@angular/core';
import { TodosService } from './../todos.service';
import { Todos } from './../todos.model';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-display-todos',
  templateUrl: './display-todos.component.html',
  styleUrls: ['./display-todos.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DisplayTodosComponent implements OnInit {
  todos;
  id: string;
  selectedRowIndex = -1;
  selected = false;
  selectedTodo: Todos;
  displayedColumns: string[] = ['task', 'dateFrom', 'dateTo', 'priority', 'done'];
  expandedElement: Todos | null;

  constructor(private todosService: TodosService) { }

  ngOnInit() {
    this.todosService.getTodos().subscribe((data: Todos[]) => {
      data.sort((a, b) => b.priority - a.priority);
      this.todos = data.map((todos: Todos) => {
        const tt = todos.id;
        const kk = todos.todo;
        const mm = todos.dateFrom.toDate();
        const nn = todos.dateTo.toDate();
        const dd = todos.priority;
        const pp = todos.done;
        const cc = todos.description;
        // const cc = todos.checked;
        const bb = {id: tt, todo: kk, dateFrom: mm, dateTo: nn, priority: dd, done: pp, description: cc};
        return bb;
      });

    });
  }

  onSelect(e, row) {
    this.selectedTodo = row;
    this.todosService.getId(row.id);
    // console.log(row);
    this.id = row.id;
    const parentArr = e.target.parentElement.parentElement.children;

    if (e.target.parentElement.classList.contains('highlight')) {
      e.target.parentElement.classList.remove('highlight');
    } else {
      for (const el of parentArr) {
      el.classList.remove('highlight');
      }
      e.target.parentElement.classList.add('highlight');
      this.selected = true;
    }
    this.selectedRowIndex = row.id;
  }

  onDelete() {
    if (confirm('Are you sure?')) {
      this.todosService.deleteTodo(this.id);
    }
  }

  onCompleted() {
    const newTodo = {
      id: this.selectedTodo.id,
      todo: this.selectedTodo.todo,
      dateFrom: this.selectedTodo.dateFrom,
      dateTo: this.selectedTodo.dateTo,
      priority: this.selectedTodo.priority,
      done: !this.selectedTodo.done,
      description: this.selectedTodo.description
    };
    this.todosService.setTodo(newTodo);
  }

  onEdit(el: Todos) {
    // console.log(el);
    this.todosService.editSub.next(el);
    this.todosService.editMode.next(true);
  }
}
