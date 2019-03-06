import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodosService } from '../todos.service';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  constructor(private todosService: TodosService) { }
  priority: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  id: number;
  ngOnInit() {
    // this.todosService.getTodos().subscribe((data) => {
    //   const idArr = [];
    //   data.forEach((el) => {
    //     idArr.push(el.id);
    //   });
    //   idArr.sort();
    //   if (idArr.length === 0) {
    //     this.id = 1;
    //   } else {
    //     this.id = idArr.length + 1;
    //   }
    // });
  }
  onSubmit(formData: NgForm) {
    if (formData.valid) {
      const newData = {
         todo: formData.value.todo,
         dateFrom: formData.value.dateFrom,
         dateTo: formData.value.dateTo,
         priority: formData.value.p,
         done: false};
      this.todosService.addTodo(newData);
      this.id++;
      formData.resetForm();
    }
  }
}
