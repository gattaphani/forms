import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { interval } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
import { Employee } from './employee.model';





@Injectable({
  providedIn: 'root'
})
export class EmpService {
  
  constructor(private http: HttpClient) 
  { 
    
  }
  
 
  // login(Username:string,password:string){
  //   var headersForToken = new Headers({
  //     'Content-Type':'application/json; charset=utf-8'
  //   })
  //   var data = "grant_type=password&username="+ Username + "&password="+password;
  //   return this.http.post('http://localhost:3000/token/',data,{ headers : headersForToken})
  // }


  //  var headers = new HttpHeaders({
  //    'Authorization':'bearer Token',
  //    'X-pagination' : '2'
  // })


  // var headers = new HttpHeaders();
  //   headers.set('Content-Type', 'application/json; charset=utf-8');
  //   let data={
  //     headers:headers
  //   }


  //  var headers = new HttpHeaders({
  //    'Authorization':'bearer Token',
  //    'X-pagination' : '2'
  // })


  // logIn(logindata):Observable<any>{
    
  
  //   let headers = new HttpHeaders().set( 'Authorization','bearer Token')
  //   let params = new HttpParams().append('age','100');
  //   params = params.append('color','blue')
    
  //   return this.http.post('http://localhost:3000/token/', { headers:headers, params:params })
  // }


  logIn(logindata):Observable<any>{
   var headers = new HttpHeaders({
    'Authorization': localStorage.getItem('Token'),
 })
    return this.http.post('http://localhost:3000/login/', logindata,{headers:headers})
    .pipe(
      retry(1),
      catchError(this.errorHandler)
        );
  }

  getToken():Observable<any>{
    return this.http.get('http://localhost:3000/token/')
  }


  // getEmployees():Observable<any> {
  //   return interval(5000).pipe(flatMap(()=>{
  //     return this.http.get('http://localhost:3000/employees/')
  //     .pipe(
  //     retry(3),
  //     catchError(this.errorHandler)
  //       );
  //   }));
   
    
  // }



  getEmployees():Observable<any> {
    var headers = new HttpHeaders({
      'Authorization': localStorage.getItem('Token'),
   })
    return this.http.get('http://localhost:3000/employees/',{headers:headers})
    .pipe(
    retry(3),
    catchError(this.errorHandler)
      );
    
  }

  createUser(employee) {
    var headers = new HttpHeaders({
      'Authorization': localStorage.getItem('Token'),
   })
    return this.http.post('http://localhost:3000/employees/', employee,{headers:headers})
    .pipe(
      retry(3),
      catchError(this.errorHandler)
        );
   
  }
  getEmployeeById(id:number) {
    return this.http.get('http://localhost:3000/employees/'+ id)
    .pipe(
      retry(3),
      catchError(this.errorHandler)
        );
    
  }
  updateEmployee(employee,id) {
    var headers = new HttpHeaders({
      'Authorization': localStorage.getItem('Token'),
   })
    return this.http.put('http://localhost:3000/employees/'+ id, employee,{headers:headers})
    .pipe(
      retry(3),
      catchError(this.errorHandler)
        );
   
  }
  deleteEmployees(id){
    var headers = new HttpHeaders({
      'Authorization': localStorage.getItem('Token'),
   })
    return this.http.delete('http://localhost:3000/employees/'+ id,{headers:headers})
    .pipe(
      retry(3),
      catchError(this.errorHandler)
        );
    
  }
  
    
  errorHandler(error:HttpErrorResponse){
    return throwError(error.message || 'Server Error')
  }
  
}

