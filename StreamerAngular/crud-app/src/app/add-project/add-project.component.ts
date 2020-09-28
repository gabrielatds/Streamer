import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { template } from '@angular/core/src/render3';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Projects } from '../_models/projects';
import { ProjectService } from '../_services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  title = 'Novo Projeto';

  projects: Projects[];
  project: Projects;
  registerForm: FormGroup;
  modoSalvar = 'post';

  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder,
    private router: Router,
    ) { }

  ngOnInit() {
    this.validation();
  }
  
  editarProject(project: Projects){
    console.log('to editando');
    console.log(project);
    this.modoSalvar = 'put';
    this.project = project;
    this.registerForm.patchValue(project);
    this.router.navigate(['/create']);
  }

  getProjects(){
    this.projectService.getAllProjects().subscribe(
      (_projects: Projects[]) => {this.projects = _projects;
      console.log(_projects)},
      error => {console.log(error)},
    );
  }

  validation(){
    this.registerForm = this.fb.group({
      name: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
      image: ['',Validators.required],
      why: ['',Validators.required],
      what: ['',Validators.required],
      whatWillWeDo: ['',Validators.required],
      courseId: ['', Validators.required],
    });
  }

  salvarAlteracao(){
    if(this.registerForm.valid){
      if(this.modoSalvar === 'post'){
        this.project = Object.assign({}, this.registerForm.value);
        this.projectService.postProject(this.project).subscribe(
          () => {
            this.getProjects();
          }, error => {
            console.log(error);
          }
        );
      } else{
        console.log('salvando editado')
        this.project = Object.assign({id: this.project.id}, this.registerForm.value);
        this.projectService.putProject(this.project).subscribe(
          () => {
            this.getProjects();
          }, error => {
            console.log(error);
          }
        );
      }
      }
      this.router.navigate(['/projects']);
  }
}
