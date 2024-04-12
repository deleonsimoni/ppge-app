import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ImagePathComplementPipe } from '@app/shared/pipes/image-path/image-path-complement.pipe';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { ComfirmDeleteProcessoComponent } from '../processo-seletivo-admin/modal/confirm-delet-processo.component';
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
  public logo: any;
  public imagePathS3: any;

  constructor(
    private builder: FormBuilder,
    private siteAdminService: SiteAdminService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private pipeImage: ImagePathComplementPipe
  ) {
    this.form = this.builder.group({
      _id: [],
      fullName: [null, [Validators.required]],
      academicFormation: [null, [Validators.required]],
      twitter: [null, []],
      facebook: [null, []],
      instagram: [null, []],
      linkedin: [null, []],
      lattes: [null, []],
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
    if (this.form.valid) {
      if (this.form.value._id) {
        this.siteAdminService.atualizarCorpoDocente(this.imagePathS3, this.form.value)
          .subscribe(() => {
            this.getAllCorpoDocente();
            this.alternarForm(false);
            this.toastr.success(`Perfil atualizado com sucesso`, 'Sucesso');
          }, () => {
            this.toastr.error('Ocorreu um erro ao atualizar', 'Atenção: ');
          });

      } else {
        this.siteAdminService.cadastrarCorpoDocente(this.imagePathS3, this.form.value)
          .subscribe(() => {
            this.getAllCorpoDocente();
            this.alternarForm(false);
            this.toastr.success(`Perfil cadastrado com sucesso`, 'Sucesso');
          }, () => {
            this.toastr.error('Ocorreu um erro ao cadastrar', 'Atenção: ');
          });
      }
    } else {
      this.toastr.error("É necessário preencher todos os campos!", "Atenção: ")
    }
  }

  getImagePath(imgUrl) {
    return imgUrl?.includes('https:')? imgUrl : 'https://ppge-public.s3.sa-east-1.amazonaws.com/'+imgUrl
  }

  edit(profile: any) {
    this.alternarForm(true);
    this.logo = profile.imagePathS3;
    this.form.patchValue({ ...profile })
  }


  delete(profile: any, index: number) {

    const dialogRef = this.dialog.open(ComfirmDeleteProcessoComponent, {
      width: '750px',
      data: { title: profile.fullName }
    });
    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if (result) {
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
    })
  }


  public getProfileImageCode(event: any): void {
    const that = this;
    const FR = new FileReader();
    const files = event.target.files;

    FR.addEventListener("load", function (e) {
      that.logo = e.target.result;
    });

    if (files && files[0]) {
      that.imagePathS3 = files[0];
      FR.readAsDataURL(files[0]);
    } else {
      that.logo = null;
      that.imagePathS3 = null;
    }
  }

  alternarForm(isForm) {
    this.isForm = isForm;
    this.imagePathS3 = null;
    this.form.reset();
    this.form.patchValue({ type: String(TypeProfileEnum.PROFESSOR) });
  }

}
