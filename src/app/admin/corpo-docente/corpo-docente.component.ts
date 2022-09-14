import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { TypeProfileEnum } from './corpo-docente.model';

@Component({
  selector: 'app-corpo-docente',
  templateUrl: './corpo-docente.component.html',
  styleUrls: ['./corpo-docente.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CorpoDocenteComponent implements OnInit {
  public form: FormGroup;
  public listProfile: any;
  public isForm = false;

  constructor(
    private builder: FormBuilder,
    private siteAdminService: SiteAdminService,
    private toastr: ToastrService,
  ) { 
    this.form = this.builder.group({
      _id: [],
      fullName: [null, [Validators.required]],
      academicFormation: [null, [Validators.required]],
      researchLine: [null, [Validators.required]],
      twitter: [null, []],
      facebook: [null, []],
      instagram: [null, []],
      linkedin: [null, []],
      imagePathS3: [null, []],
      type: [String(TypeProfileEnum.PROFESSOR), [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAllCorpoDocente();
  }

  getAllCorpoDocente() {
    this.siteAdminService.listCorpoDocente().subscribe(data => {
      this.listProfile = data;
    }, () => {
      this.toastr.error('Ocorreu um erro ao listar', 'Atenção: ');
    })
  }

  register() {
    if(this.form.valid) {
      if(this.form.value._id) {
        this.siteAdminService.atualizarCorpoDocente(this.form.value)
          .subscribe(() => {
            this.getAllCorpoDocente();
            this.alternarForm(false);
            this.toastr.success(`Perfil atualizado com sucesso`, 'Sucesso');
          }, () => {
            this.toastr.error('Ocorreu um erro ao atualizar', 'Atenção: ');
          });

      } else {
        this.siteAdminService.cadastrarCorpoDocente(this.form.value)
          .subscribe(() => {
            this.getAllCorpoDocente();
            this.alternarForm(false);
            this.toastr.success(`Perfil cadastrado com sucesso`, 'Sucesso');
          }, () => {
            this.toastr.error('Ocorreu um erro ao cadastrar', 'Atenção: ');
          });
      }
    }
  }

  edit(profile: any) {
    this.alternarForm(true);
    this.form.patchValue({...profile})
  }

  delete(profile: any, index: number) {
    this.siteAdminService.deletarCorpoDocente(profile)
      .pipe(take(1))
      .subscribe(() => {
        this.listProfile.splice(index, 1);
        this.toastr.success(`Perfil deletado`, 'Sucesso');
      },
      () => {
        this.toastr.error('Ocorreu um erro ao deletar', 'Atenção: ');
      });
  }

  alternarForm(isForm) {
    this.isForm = isForm;
    this.form.reset();
    this.form.patchValue({type: String(TypeProfileEnum.PROFESSOR)});
  }

}
