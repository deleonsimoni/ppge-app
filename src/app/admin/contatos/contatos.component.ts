import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.scss']
})
export class ContatosComponent implements OnInit {

  public form: FormGroup;
  constructor(
    private builder: FormBuilder,
    private siteService: SiteAdminService,
    private toastr: ToastrService,
  ) {
    
    this.form = this.builder.group({
      _id: [],
      email: [null, [Validators.required]],
      telefone: [null, [Validators.required]],
      endereco: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getInfoContatos();
  }

  getInfoContatos() {
    this.siteService.getInfoContatos()
    .pipe(
      catchError( err => {
        this.toastr.error('Ocorreu um erro ao buscar "Contatos"', 'Atenção: ');
        throw err;
      })
    )
    .subscribe((data: any) => {
      this.form.patchValue({...data})
    });
  }

  register() {

    if (this.form.valid) {
    

      if (this.form.value._id) {
        this.siteService.atualizarContatos(this.form.value)
          .subscribe((res: any) => {
            this.toastr.success('Contatos alterado com sucesso', 'Sucesso');
          }, (err: any) => {
            this.toastr.error('Ocorreu um erro ao atualizar', 'Atenção: ');
          });
      } else {
        this.siteService.cadastrarContatos(this.form.value)
          .subscribe((res: any) => {
            this.getInfoContatos();
            this.toastr.success('Contatos cadastrado com sucesso', 'Sucesso');
          }, (err: any) => {
            this.toastr.error('Ocorreu um erro ao cadastrar', 'Atenção: ');
          });
      }

    } else {
      this.toastr.error('Preencha corretamente o formulário!', 'Atenção: ');
    }

  }

}
