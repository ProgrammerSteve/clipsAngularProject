import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
// import { AngularFireAuth } from '@angular/fire/compat/auth'
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import IUser from 'src/app/models/user.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  inSubmission = false
  constructor(private auth: AuthService) { }

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(2)
  ])
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ])
  age = new FormControl<number | null>(null, [
    Validators.required,
    Validators.min(18),
    Validators.max(120)
  ])
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ])
  confirm_password = new FormControl('', [
    Validators.required,
  ])
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13)
  ])


  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phonenumber: this.phoneNumber
  })
  alertMsg = "Please wait, your account is being created."
  showAlert = false
  alertColor = 'blue'

  async register() {
    this.alertMsg = "Please wait, your account is being created."
    this.showAlert = true
    this.alertColor = 'blue'
    this.inSubmission = true



    try {
      this.auth.createUser(this.registerForm.value as IUser)

    } catch (e) {
      console.log("error firebase:", e)
      this.alertMsg = "An unexpected error occurred. Please try again later"
      this.alertColor = 'red'
      this.inSubmission = false
      return
    }
    this.alertMsg = "Success! Your account has been created."
    this.alertColor = 'green'


  }
}


