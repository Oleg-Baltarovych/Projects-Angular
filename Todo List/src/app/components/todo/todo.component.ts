import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos = [];
  todo = '';
  editedTodo = '';

  constructor(private http: HttpClient) {
    this.setTodos();
  }

  ngOnInit(): void {
    if (this.todo != '') {
      this.todos.push({ title: this.todo });
    }
  }

  setTodos(): void {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then((data) => data.json())
      .then((res) =>
        res.forEach((todo) => {
          return this.todos.push(todo);
        })
      );
  }

  editStatus(id) {
    this.todos.map((todo, index) => {
      if (index + 1 == id) todo.completed = !todo.completed;
      return todo;
    });
  }

  addTodo() {
    return this.http
      .post('https://jsonplaceholder.typicode.com/todos', this.todo)
      .subscribe((res) => {
        console.log(this.todo);
        this.ngOnInit();
        this.todo = '';
      });
  }

  editTodo(todo) {}

  deleteTodo(todo) {
    return this.http
      .delete('https://jsonplaceholder.typicode.com/todos' + '/' + todo)
      .subscribe((res) => {
        this.todos = this.todos.filter((x, y) => y != todo);
      });
  }
}
