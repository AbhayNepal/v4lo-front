import { Component, inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Users } from '../app/users.model';
import { CrudService } from '../app/crud.service';
import { Router } from '@angular/router';
import { json } from 'stream/consumers';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formBuilder: FormBuilder =inject(FormBuilder);
  formEnabled:boolean = true;
  users!:Users ;

  crudService:CrudService = inject(CrudService);
  router:Router = inject(Router);
  registrationForm!:FormGroup;
  ngOnInit(){

  this.registrationForm = this.formBuilder.group(
    { 
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.email]],
        confirmPassword:['',[Validators.required,Validators.email]],
        userName:['',[Validators.required,Validators.email]]
    }
    
    );}
    registerUser(){
    
      this.crudService.registerUsers(this.registrationForm.value ).subscribe((data: {}) => {
        this.router.navigate([''])
      })
      this.formEnabled = false;
    }
  }
