import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service'; 

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers : [TodoService]
})

export class TodoComponent implements OnInit {

	// Class Variables
	todos    = [];
	editMode : boolean = false;
	editId   : number;
	title    : string;

	// Constructor
	constructor(private todoService : TodoService) { 

	}

	ngOnInit() {
		this.todoService.getAll()
			.subscribe(todos => this.todos = todos.result);
	}

	// Save Todo Event
	createTodoFormSubmit(){

		if(this.editMode==true){
			let tempTodos = this.todos;
			
			this.todoService.update( this.editId, this.title )
				.subscribe(rs => {
				if(rs.status===true){
					alert("UPDATED!");
					for (var i = tempTodos.length - 1; i >= 0; i--) {
						if(this.editId == tempTodos[i].id){
							tempTodos[i].title = this.title;
						}
						console.log(tempTodos[i]);
					}
					this.todos = tempTodos;
					this.cancelUpdate();
				}
			});

		}else{ 
			this.todoService.save({
				title : this.title,
				isDone: false
			}).subscribe(rs => {
				if(rs.status===true){
					alert("SAVED");
					this.todos.push(rs.todo);
				}
			});
		}

		// this.title = "";
	}

	// Edit Todo
	editTodo(todo){
		this.title    = todo.title
		this.editId   = todo.id;
		this.editMode = true;

		console.log({
			title : this.title,
			editId: this.editId,
			editMode:this.editMode
		});

	}

	// Cancel Edit
	cancelUpdate(){
		this.title    = "";
		this.editMode = false;
		this.editId   = -1;
	}

	// Remove Todo
	removeTodo(todo){

		this.todoService.delete(todo.id)
		.subscribe(rs => {
			for (var i = this.todos.length - 1; i >= 0; i--) {
				if( todo.id == this.todos[i].id ){
					this.todos.splice(i,1);
				}
			}	
			if(rs.status===true){
				alert("Deleted!");
			}
		});
		
	}		

}
