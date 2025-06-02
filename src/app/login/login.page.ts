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
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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
export class LoginPage implements OnInit {
  form: FormGroup;
  alertMessage = "";

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      this.alertMessage = "Complete todos los campos para continuar";
      setTimeout(() => {
        this.alertMessage = "";
      }, 3000)
      return;
    }

    const res = this.authService.login(this.form.value!.name, this.form.value!.password);
    if (res === null) {
      this.alertMessage = "El usuario no existe";
      setTimeout(() => {
        this.alertMessage = "";
      }, 3000);
      return;
    } else if (res === false) {
      this.alertMessage = "Contraseña incorrecta";
      setTimeout(() => {
        this.alertMessage = "";
      }, 3000);
      return;
    }

    this.form.reset();

    this.router.navigate(['/']);

  }

  ngOnInit() {}
}
