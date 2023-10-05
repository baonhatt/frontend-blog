import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../model/blog.model';
import { User } from '../model/user.model';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  blogCreated = new EventEmitter<Blog>();
  constructor(
    private http: HttpClient
  ) {

  }

  getmovie(): Observable<any>{
    return this.http.get(`https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies`);
  }
  getlogin(data: User): Observable<any>{
    return this.http.post(`http://localhost:3000/auth/login`, data);
  }
  getCity(): Observable <any>{
    return this.http.get(`https://provinces.open-api.vn/api/`);
  }
  getblog(): Observable<Blog[]>{
    return this.http.get<Blog[]>(`http://localhost:3000/blog`);
  }
  createBlog(data: Blog){
    return this.http.post(`http://localhost:3000/blog`, data);
  }
  deleteBlog(id: string){
    return this.http.delete(`http://localhost:3000/blog/${id}`);
  }
  getBlogDetail(id: string): Observable<any[]>{
    return this.http.get<Blog[]>(`http://localhost:3000/blog/${id}`);
  }
  comment( blogId: string, data: Comment): Observable<Comment> {
    return this.http.post<any>(`http://localhost:3000/blog/${blogId}/comments`, data);
  }
}
