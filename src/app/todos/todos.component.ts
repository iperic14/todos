import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodosService } from '../todos.service';
import { Todos } from '../todos.model';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  constructor(private todosService: TodosService) { }
  priority: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  id: number;
  @ViewChild('f') form: NgForm;
  editingTodo: Todos;
  editMode = false;

  ngOnInit() {
    this.todosService.editSubObs.subscribe((todo: Todos) => {
      this.editingTodo = todo;
      const newData = {
        todo: todo.todo,
        dateFrom: todo.dateFrom,
        dateTo: todo.dateTo,
        priority: todo.priority,
        description: todo.description
      };
      setTimeout(() => {
        this.form.setValue(newData);
      }, 10);
    });
    this.todosService.editModeObs.subscribe((edit: boolean) => {
      this.editMode = edit;
    });
  }
  onSubmit(formData: NgForm) {
    if (formData.valid) {
         if (!this.editMode) {
          const newData = {
            todo: formData.value.todo,
            dateFrom: formData.value.dateFrom,
            dateTo: formData.value.dateTo,
            priority: formData.value.priority,
            done: false,
            description: formData.value.description
          };
          this.todosService.addTodo(newData);
          this.id++;
         } else {
          const editData = {
            todo: formData.value.todo,
            dateFrom: formData.value.dateFrom,
            dateTo: formData.value.dateTo,
            priority: formData.value.priority,
            done: this.editingTodo.done,
            description: formData.value.description
          };
           this.todosService.setTodo(editData);
           this.todosService.editMode.next(false);
         }

      formData.resetForm();
    }
  }
}
