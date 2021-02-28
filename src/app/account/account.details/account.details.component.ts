import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountLogin } from 'src/model/account-login';
import { AccountLoginService } from 'src/services/account.service';
import { timer } from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/services/alert.service';
import { AccountEmail } from 'src/model/account-email';

@Component({
  selector: 'app-account.details',
  templateUrl: './account.details.component.html',
  styleUrls: ['./account.details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  accountLogin: AccountLogin | null;
  resource: number | undefined;

  addEmailForm: FormGroup;
  addEmailLoading = false;
  addEmailSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountLoginService: AccountLoginService,
    private modalService: NgbModal,
    private alertService: AlertService
  ) {
    this.accountLogin = this.accountLoginService.accountLoginValue;
    timer(0, 1000).subscribe(() => {
      this.resource = this.accountLogin?.account?.available_resource();
    });
  }

  ngOnInit() {
    this.addEmailForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  open(content: any) {
    this.resetAddEmailModal();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {
      console.log(this.addEmailForm.valid);
      if (this.addEmailForm.valid) {
        this.onSubmit();
      }
    }, (reason: any) => {
    });
  }

  setPrimary(email: AccountEmail) {
    this.accountLoginService.updateEmail(email.email, true)
      .pipe(first())
      .subscribe(
        (data: any) => {
          if (data.status === "Ok") {
            this.alertService.success(data.message, { keepAfterRouteChange: true });
            this.accountLoginService.updateAccountInfo();
          } else if (data.status === "Error") {
            this.alertService.error(data.message);
          }
        },
        error => {
          this.alertService.error(error);
        });
  }

  resendVerification(email: AccountEmail) {
    this.accountLoginService.updateEmail(email.email, email.primary)
      .pipe(first())
      .subscribe(
        (data: any) => {
          if (data.status === "Ok") {
            this.alertService.success(data.message, { keepAfterRouteChange: true });
            this.accountLoginService.updateAccountInfo();
          } else if (data.status === "Error") {
            this.alertService.error(data.message);
          }
        },
        error => {
          this.alertService.error(error);
        });
  }

  deleteEmail(content: any, email: AccountEmail) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {
      this.accountLoginService.deleteEmail(email.email)
      .pipe(first())
      .subscribe(
        (data: any) => {
          if (data.status === "Ok") {
            this.alertService.success(data.message, { keepAfterRouteChange: true });
            this.accountLoginService.updateAccountInfo();
          } else if (data.status === "Error") {
            this.alertService.error(data.message);
          }
        },
        error => {
          this.alertService.error(error);
        });
    }, (reason: any) => {
      this.modalService.dismissAll();
    });
  }

  onSubmit() {
    this.addEmailSubmitted = true;

    // stop here if form is invalid
    if (this.addEmailForm.invalid) {
      return;
    }

    this.accountLoginService.updateEmail(this.addEmailForm.controls.email.value, false)
      .pipe(first())
      .subscribe(
        (data: any) => {
          if (data.status === "Ok") {
            this.alertService.success(data.message, { keepAfterRouteChange: true });
            this.accountLoginService.updateAccountInfo();
            this.resetAddEmailModal();
            this.modalService.dismissAll();
          } else if (data.status === "Error") {
            this.alertService.error(data.message);
            this.resetAddEmailModal();
          }
        },
        error => {
          this.alertService.error(error);
          this.resetAddEmailModal();
        });
  }

  resetAddEmailModal() {
    this.addEmailLoading = false;
    this.addEmailForm.controls.email.setValue('');
    this.addEmailSubmitted = false;
  }
}
