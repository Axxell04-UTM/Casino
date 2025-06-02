import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonInput,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule
  ],
})
export class RegisterPage implements OnInit {
  form: FormGroup;
  alertMessage: string = "";
  successMessage: string = "";

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.validatePasswords })
  }

  validatePasswords(group: FormGroup) {
    return group.get('password')!.value === group.get('confirmPassword')!.value ? null : { notSame: true }
  }

  ngOnInit() {}

  onSubmit() {
    if (this.form.invalid) {
      this.alertMessage = "Complete todos los campos para continuar";
      setTimeout(() => {
        this.alertMessage = "";
      }, 3000)
      return
    }

    let user: User = {
      name: this.form.value!.name,
      password: this.form.value!.password,
      logged: false,
      money: 200,
      debts: []
    };
    this.authService.register(user);
    this.form.reset();
    this.successMessage = "Usuario creado con éxito";
    setTimeout(() => {
      this.successMessage = "";
    }, 3000)
  }
}
