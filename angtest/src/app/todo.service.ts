import { Injectable } from '@angular/core';
import { Http, Response,RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TodoService {

  constructor(private http : Http) { 
  }

  extractData(res : Response){
  	return res.json();
  }

  getAll() : Observable<any>{
  	return this.http.get('http://localhost/testapi/index.php/').map(this.extractData);
  }

  save(todo : Object) : Observable<any>{
 	let headers    = new Headers({'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'});
	let options    = new RequestOptions({ headers : headers });
	return this.http.post('http://localhost/testapi/index.php/', todo ,options)
			.map(this.extractData)
			.catch((error : any) => Observable.throw(error.json().error || 'Server Error'))
  }
	
  update(id : number,title : string) : Observable<any>{
  	 	let headers    = new Headers({'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'});
  		let options    = new RequestOptions({ headers : headers });
  		return this.http.put('http://localhost/testapi/index.php/', { id : id, title : title } ,options)
  				.map(this.extractData)
  				.catch((error : any) => Observable.throw(error.json().error || 'Server Error'))
  }

  delete( id : number) : Observable<any>{
	return this.http
				.delete('http://localhost/testapi/index.php?id='+id)
				.map(this.extractData);
  }

}	
