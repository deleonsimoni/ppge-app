import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { ToastrService } from 'ngx-toastr';

export interface DialogParecerData {
  idProcesso: string;
  idInscricao: string;
}

@Component({
  selector: 'app-parecer',
  templateUrl: './parecer.component.html',
  styleUrls: ['./parecer.component.scss']
})
export class ParecerComponent {
  form: any;

  constructor(
    private builder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogParecerData,
    public dialogRef: MatDialogRef<ParecerComponent>,
    private toastr: ToastrService,
    private siteAdminService: SiteAdminService,
  ) {
    console.log(this.data);
    this.form = this.builder.group({
      abacaxi: [null, [Validators.required]],
      aprovado: ['false', [Validators.required]],
      nota: [0, [Validators.required, Validators.max(10), Validators.min(0)]]
    });
  }

  register() {
    console.log("register()")
    if(this.form.valid) {
      console.log("REGISTROUUUU: ", this.form.value)
      this.siteAdminService
        .registrarParecer(this.data.idInscricao, this.data.idProcesso, this.form.value)
        .subscribe(data => {
          console.log(data);
          this.dialogRef.close({refresh: true});
        })
    } else {
      this.toastr.error("Preencha os campos corretamente!")
    }
  }


}
