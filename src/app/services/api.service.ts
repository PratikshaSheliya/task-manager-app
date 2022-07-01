import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  signUp(data: any): Observable<any> {
    return this.http.post('http://localhost:5000/signup', data);
  }
  login(data: any): Observable<any> {
    return this.http.post('http://localhost:5000/login', data);
  }
  addTask(data: any): Observable<any> {
    return this.http.post('http://localhost:5000/task', data, {
      headers: this.getHeaders(),
    });
  }
  getAllTask(): Observable<any> {
    return this.http.get('http://localhost:5000/alltask',{
      headers: this.getHeaders(),
    });
  }
  editUserTask(data: any): Observable<any> {
    return this.http.get('http://localhost:5000/edittask',  {params:{id:data}});
  }
  updateUserTask(data:any):Observable<any>{
    return this.http.put('http://localhost:5000/updatetask',data)
  }
  deleteTask(data:any):Observable<any>{
    return this.http.delete('http://localhost:5000/deletetask',{params:{id:data}})
  }
  getAllUser():Observable<any>{
    return this.http.get('http://localhost:5000/userdata')
  }
  getUserTask(): Observable<any> {
    return this.http.get('http://localhost:5000/usertask', {
      headers: this.getHeaders(),
    });
  }
  profileData(data:any):Observable<any>{
    return this.http.put('http://localhost:5000/profile',data)
  }
  getProfileUserData():Observable<any>{
    return this.http.get("http://localhost:5000/profiledata",{
      headers: this.getHeaders(),
    })
  }
  postEmail(data:any):Observable<any>{
    return this.http.post("http://localhost:5000/sendmail",data)
  }
  chagePassword(data:any):Observable<any>{
    return this.http.put("http://localhost:5000/password",data)
  }
  taskCount():Observable<any>{
    return this.http.get("http://localhost:5000/userdata")
  }
  showUserTask(id:any):Observable<any>{
    return this.http.get("http://localhost:5000/showtask",{params:{id:id}})
  }

  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();
  emitChange(change: any) {
    this.emitChangeSource.next(change);
  }

  loggedin(): Observable<any> {
    return this.http.get('http://localhost:5000/loggedin', {
      headers: this.getHeaders(),
    });
  }
  getHeaders() {
    let headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    return headers;
  }
}
