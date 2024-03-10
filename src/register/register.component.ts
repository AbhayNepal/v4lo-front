import { Component, inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formBuilder: FormBuilder =inject(FormBuilder);

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
      console.log(this.registrationForm.value)
    }
  }
