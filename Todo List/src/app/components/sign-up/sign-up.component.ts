import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}

  reactiveForm = new FormGroup({
    fullName: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    address: new FormGroup({
      street: new FormControl(''),
      suite: new FormControl(''),
      city: new FormControl(''),
      zipcode: new FormControl(''),
    }),
  });

  get email() {
    return this.reactiveForm.get('email');
  }

  get phone() {
    return this.reactiveForm.get('phone');
  }

  ngOnInit(): void {}

  onSubmit() {
    this.router.navigate(['/todo']);
    this.http
      .post(
        'https://jsonplaceholder.typicode.com/users',
        this.reactiveForm.value
      )
      .subscribe((res) => {
        console.log(res);
      });
  }
}
