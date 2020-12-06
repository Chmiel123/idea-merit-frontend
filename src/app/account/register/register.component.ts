import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountLoginService } from 'src/services/account.service';
import { AlertService } from 'src/services/alert.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private accountLoginService: AccountLoginService,
      private alertService: AlertService
  ) {
    if (this.accountLoginService.accountLoginValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
      this.form = this.formBuilder.group({
          username: ['', Validators.required],
          email: ['', Validators.required],
          password: ['', [Validators.required]]
      });
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountLoginService.register(this.form.controls.username.value, this.form.controls.password.value, this.form.controls.email.value)
        .pipe(first())
        .subscribe(
          data => {
              if (data.status === "Ok") {
                  this.alertService.success(data.message, { keepAfterRouteChange: true });
                  this.router.navigate(['../login'], { relativeTo: this.route });
              } else if (data.status === "Error") {
                  this.alertService.error(data.message);
                  this.loading = false;
              }
          },
          error => {
              this.alertService.error(error);
              this.loading = false;
          });
  }
}
