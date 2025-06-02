import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { NavComponent } from '../components/nav/nav.component';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.page.html',
  styleUrls: ['./loans.page.scss'],
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
    NavComponent,
    ReactiveFormsModule,
  ],
})
export class LoansPage implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private playerService: PlayerService) {
    function multipleOfTen(control: any) {
      const value = control.value;
      if (value % 10 !== 0) {
        return { notMultipleOfTen: true };
      }
      return null;
    }
    this.form = this.fb.group({
      amount: [
        0,
        [
          Validators.max(5000),
          Validators.min(10),
          Validators.required,
          multipleOfTen,
        ],
      ],
    });
  }

  alertMessage = '';
  successMessage = '';

  onSubmit() {
    if (this.form.invalid) { return }
    let res = this.playerService.makeLoan(this.form.value!.amount);
    if (!res) {
      this.alertMessage = "No se pudo realizar el prestamo";
      setTimeout(() => {
        this.alertMessage = "";
      }, 3000);
      return;
    }
    this.successMessage = "Prestamo realizado con éxito";
    setTimeout(() => {
      this.successMessage = "";
    }, 3000);
    this.form.reset();
  }

  ngOnInit() {}
}
