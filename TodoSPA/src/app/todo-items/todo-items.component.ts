import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.css']
})
export class TodoItemsComponent implements OnInit {

  todoItems: any;
  private url = 'http://localhost:5000/api/todo';
  constructor(private http: HttpClient) { }

  log(x){console.log(x);}

  ngOnInit() {
    this.getTodoItems();
    console.log(this.todoItems);
  }

  getTodoItems() {
    this.http.get(this.url).subscribe(
      response => {
        this.todoItems = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  toggleComplete(item){
    item.isComplete = !item.isComplete;
    this.http.put(this.url + "/" + item.id, item)
      .subscribe(
        response=>{
          this.getTodoItems();
        },
        error=>{
          console.log(error);
        }
      );
  }

  deleteTodo(item){
    this.http.delete(this.url + "/" + item.id, item)
      .subscribe(
        response=>{
          this.getTodoItems();
        },
        error=>{
          console.log(error);
        }
      );
  }

  createTodo(form: NgForm) {
    if (form.valid){
      let newItem = form.value;
      newItem.isComplete = false;

      this.http.post(this.url, newItem)
      .subscribe(
        response => {
          this.getTodoItems();
          form.reset();
        }
      );
    }else{console.log('invalid');}
  }

}
