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
  ngOnInit() {
    this.todosService.editSubObs.subscribe((todo: Todos) => {
      const newData = {
        todo: todo.todo,
        dateFrom: todo.dateFrom,
        dateTo: todo.dateTo,
        priority: todo.priority
      };
      setTimeout(() => {
        this.form.setValue(newData);
      }, 10);
    });
  }
  onSubmit(formData: NgForm) {
    if (formData.valid) {
      const newData = {
         todo: formData.value.todo,
         dateFrom: formData.value.dateFrom,
         dateTo: formData.value.dateTo,
         priority: formData.value.priority,
         done: false};
      this.todosService.addTodo(newData);
      this.id++;
      formData.resetForm();
    }
  }
}
