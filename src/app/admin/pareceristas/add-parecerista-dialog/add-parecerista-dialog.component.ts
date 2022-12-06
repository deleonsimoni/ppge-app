import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, take } from 'rxjs';

@Component({
  selector: 'app-add-parecerista-dialog',
  templateUrl: './add-parecerista-dialog.component.html',
  styleUrls: ['./add-parecerista-dialog.component.scss']
})
export class AddPareceristaDialogComponent {
  formParecerista: any;

  constructor(
    private builder: FormBuilder,
    public dialogRef: MatDialogRef<AddPareceristaDialogComponent>,
    private toastr: ToastrService,
    private siteService: SiteAdminService,
  ) { 
    this.formParecerista = this.builder.group({
      email: [null, [Validators.required]],
    });
  }
    
  onNoClick(): void {
    this.dialogRef.close();
  }

  addParecerista() {
    const email = new String(this.formParecerista.value.email).trim();
    if(this.validateEmail(email)) {
      this.siteService
        .cadastrarParecerista(email)
        .pipe(take(1))
        .pipe(catchError((data) => of(data.error)))
        .subscribe((data: any) => {
          console.log(data);
          if(data.hasError)
            this.toastr.error(data.msg);
          else {
            this.toastr.success(data.msg);
            this.dialogRef.close({refresh: true});
          }
        });
    } else {
      this.toastr.error('Email inválido!', 'Atenção: ')
    }
    
  }
  
  private validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

}
