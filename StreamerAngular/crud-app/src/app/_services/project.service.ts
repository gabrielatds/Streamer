import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Projects } from '../_models/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseUrl='http://localhost:52666/api/projects'; 

constructor(private http: HttpClient) { }

  getAllProjects(): Observable<Projects[]>{
    return this.http.get<Projects[]>(this.baseUrl);
  }

  getProjectById(id: number): Observable<Projects>{
    return this.http.get<Projects>(`${this.baseUrl}/${id}`);
  }

  getProjectByCourse(id: number): Observable<Projects>{
    return this.http.get<Projects>(`${this.baseUrl}/courses/${id}`)
  }

  postProject(project: Projects){
    return this.http.post(`${this.baseUrl}`, project);
  }

  putProject(project: Projects){
    console.log(project);
    return this.http.put(`${this.baseUrl}/${project.id}`, project);
  }

  deleteProject(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
