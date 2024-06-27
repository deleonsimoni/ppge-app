import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { catchError, take } from 'rxjs';

@Component({
  selector: 'app-administrar-home',
  templateUrl: './administrar-home.component.html',
  styleUrls: ['./administrar-home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdministrarHomeComponent implements OnInit {

  public form: FormGroup;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "15rem",
    minHeight: "5rem",
    placeholder: "Enter text here...",
    translate: "no",
    defaultParagraphSeparator: "p",
    defaultFontName: "Arial",
    sanitize: false,
    customClasses: []
  };

  constructor(
    private builder: FormBuilder,
    private siteService: SiteAdminService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
    this.form = this.builder.group({
      _id: [],
      "pt-br": this.builder.group({
        content: [null, [Validators.required]],
      }),
      "en-us": this.builder.group({
        content: [null, [Validators.required]],
      }),
      "es-es": this.builder.group({
        content: [null, [Validators.required]],
      }),
    });
  }

  ngOnInit(): void {
    this.getInfoHomeApresentacao();
  }

  register() {
    if(this.form.valid) {

      if (this.form.value._id) {
        this.siteService.atualizarApesentacaoHome(this.form.value)
          .pipe(
            catchError( err => {
              this.toastr.error('Ocorreu um erro ao cadastrar', 'Atenção: ');
              throw err;
            })
          )
          .subscribe((res: any) => {
            this.getInfoHomeApresentacao();
            
            this.toastr.success(`Página atualizada`, 'Sucesso');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });

      } else {
        this.siteService.cadastrarApesentacaoHome(this.form.value)
          .pipe(
            catchError( err => {
              this.toastr.error('Ocorreu um erro ao cadastrar', 'Atenção: ');
              throw err;
            })
          )
          .subscribe((res: any) => {
            this.getInfoHomeApresentacao();
            
            this.toastr.success(`Página cadastrada`, 'Sucesso');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });

      }

    } else {
      this.toastr.error('Formulários da seção "Apresentação" está inválido!');
    }
    
  }

  getInfoHomeApresentacao() {
    
    this.siteService.getInfoHomeApresentacao()
      .pipe(
        catchError( err => {
          this.toastr.error('Ocorreu um erro ao buscar "Apresentação"', 'Atenção: ');
          throw err;
        })
      )
      .subscribe((data: any) => {
        this.form.patchValue({...data})
      });
  }

}
