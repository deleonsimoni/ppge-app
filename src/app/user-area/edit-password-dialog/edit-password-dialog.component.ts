import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAreaService } from '../user-area.service';
import { catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-password-dialog',
  templateUrl: './edit-password-dialog.component.html',
  styleUrls: ['./edit-password-dialog.component.scss']
})
export class EditPasswordDialogComponent implements OnInit {

  public form: FormGroup = this.builder.group({
    password: ["", [Validators.required]],
    newPassword: ["", [Validators.required]],
    repeatNewPassword: ["", [Validators.required]],
  });

  constructor(
    private builder: FormBuilder,
    private userAreaService: UserAreaService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<EditPasswordDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  editPassword() {
    this.userAreaService
      .alterarSenha(this.form.value.password, this.form.value.newPassword, this.form.value.repeatNewPassword)
      .pipe(
        catchError(err => {
          if(err.status == 401 || err.status == 400) {
            this.toastr.error(err.error.message);
          } else {
            this.toastr.error("Ocorreu um erro ao tentar alterar a senha!");
          }
          throw err;
        })
      )
      .subscribe(data => {
        this.toastr.success("Senha alterada com sucesso!");
        this.dialogRef.close();
      });
  }

}
