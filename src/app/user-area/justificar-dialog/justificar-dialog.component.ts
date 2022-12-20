import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { UserAreaService } from '../user-area.service';

@Component({
  selector: 'app-justificar-dialog',
  templateUrl: './justificar-dialog.component.html',
  styleUrls: ['./justificar-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class JustificarDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private builder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userAreaService: UserAreaService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<JustificarDialogComponent>,
  ) {

    this.form = this.builder.group({
      justificativa: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  register() {
    if (this.form.valid) {
      this.userAreaService
        .registrarJustificativa(this.data.idInscricao, this.data.idProcesso, this.form.value.justificativa)
        .pipe(take(1))
        .subscribe(data => {
          this.toastr.success('Justificativa cadastrada com sucesso!')
          this.dialogRef.close({ refresh: true })
        })

    } else {
      this.toastr.error('Preencha o formulário corretamente!')
    }

  }

}
