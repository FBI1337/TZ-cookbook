import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  emailError: string | null = null;
  passwordError: string | null = null;
  generalError: string | null = null;

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
  }


  async login() {

    this.emailError = null;
    this.passwordError = null;
    this.generalError = null;

    try {
      await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      this.router.navigate(['/recipes']);
    } catch (error: any) {
      
      if (error.code === 'auth/invalid-email'){
        this.emailError = 'Неверный Email';
      } else if (error.code === 'auth/user-disabled') {
        this.emailError = 'Пользователь уже есть';
      } else if (error.code === 'auth/user-not-found') {
        this.emailError = 'Пользователь не найден'
      } else if (error.code === 'auth/wrong-password') {
        this.passwordError = 'Неправильный пароль'
      } else {
        this.generalError = 'Произошла ошибка'
        console.error(error);
      }
    }
  }
}