import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormArray, FormBuilder, FormControl, Validators } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { SiteAdminService } from "@app/shared/services/site-admin.service";
import { TypeGraduateEnum } from "@app/shared/shared.model";
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from "ngx-toastr";
import { CriterioAvaliacaoDialogComponent } from "./criterio-avaliacao-dialog/criterio-avaliacao-dialog.component";
import { ComfirmDeleteProcessoComponent } from "./modal/confirm-delet-processo.component";
import { ViewHtmlProcessoSeletivoComponent } from "./modal/view-html-processo-seletivo.component";
import { ViewInscritosProcessoSeletivoComponent } from "./modal/view-inscritos-processo-seletivo.component";

@Component({
  selector: 'app-processo-seletivo-admin',
  templateUrl: './processo-seletivo-admin.component.html',
  styleUrls: ['./processo-seletivo-admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProcessoSeletivoAdminComponent implements OnInit {
  form: any;
  datas: any[];
  listLinhaPesquisa: any = [];
  typeGraduateEnum = TypeGraduateEnum;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "15rem",
    minHeight: "5rem",
    placeholder: "Enter text here...",
    translate: "no",
    defaultParagraphSeparator: "p",
    defaultFontName: "Arial",
    toolbarHiddenButtons: [["bold"]],
    sanitize: false,
    customClasses: [
      {
        name: "quote",
        class: "quote"
      },
      {
        name: "redText",
        class: "redText"
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1"
      }
    ]
  };

  constructor(
    private builder: FormBuilder,
    private siteService: SiteAdminService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
    this.form = this.builder.group({
      _id: [],
      type: ["1", [Validators.required]],
      title: [null, [Validators.required]],
      researchLine: [null, [Validators.required]],
      content: new FormArray([]),
      vagas: new FormArray([]),
    });
  }


  ngOnInit(): void {
    this.getProcessoSeletivo();
    this.getTitleLinhaPesquisa();
    this.addContentLine();
  }

  limpaFormLinha() {
    this.form.controls['researchLine'].reset();
    this.form.controls['vagas'].clear();
    
  }

  editVagas(eventSource, isUserInput, vagas = null) {
    
    const idLinhaPesquisaSelecionada = eventSource.value
    const linhaPesquisaArray = this.form.get('vagas') as FormArray;
    if(isUserInput) {
      if(eventSource.selected) {
        let group: any = {
          idLinhaPesquisa: new FormControl(idLinhaPesquisaSelecionada),
        };
        if(this.form.value.type == this.typeGraduateEnum.DOUTORADO) {
          const linhaSelecionada = this.listLinhaPesquisa.find(linha => linha._id == idLinhaPesquisaSelecionada);
          
          
          const arrayToForm = linhaSelecionada?.corpoDocente.map(cd => {
            let maxVagaProf = null;
            let maxVagaCotaProf = null;
            if(vagas) {
              
              console.log("avaliador: ", cd);
              console.log("vagas.professors: ", vagas.professors);
              const prof = vagas.professors?.find(prof => prof.idProfessor == cd._id)
              if(prof) {
                maxVagaProf = prof.maxVaga;
                maxVagaCotaProf = prof.maxVagaCota;
              }
            }
            return this.builder.group({
              idProfessor: new FormControl(cd._id, Validators.required),
              maxVaga: new FormControl(maxVagaProf, Validators.required),
              maxVagaCota: new FormControl(maxVagaCotaProf, Validators.required),
            })
          });
          group.professors = new FormArray(arrayToForm ? arrayToForm : [])
        }else if(this.form.value.type == this.typeGraduateEnum.MESTRADO) {
          let valueMaxVagaMestrado = null;
          let valueMaxVagaCotaMestrado = null;
          if(vagas) {
            valueMaxVagaMestrado = vagas.maxVaga
            valueMaxVagaCotaMestrado = vagas.maxVagaCota
          }
          group.maxVaga = new FormControl(valueMaxVagaMestrado, Validators.required)
          group.maxVagaCota = new FormControl(valueMaxVagaCotaMestrado, Validators.required)
        }
        linhaPesquisaArray.push(this.builder.group(group));
      } else {
        linhaPesquisaArray.value.forEach((linhaForm, index) => {
          if(linhaForm.idLinhaPesquisa == idLinhaPesquisaSelecionada) {
            linhaPesquisaArray.removeAt(index);
          }
        })
  
      }
    }
  }

  getFormProfessor(stepIndex) {
    return this.form.controls['vagas'].controls[stepIndex].controls['professors']
  }

  public mudarEtapa(value, idProcesso) {
    //FEITO
    this.siteService
      .mudarEtapa(value, idProcesso)
      .subscribe(
        () => {
          this.datas.forEach(d => {
            if(d._id == idProcesso) 
              d.etapa = value
          })
          this.toastr.success('Etapa do Processo Seletivo alterado com sucesso', 'Sucesso');
        },
        (err) => {
          this.toastr.error('Ocorreu um erro ao atualizar etapa', 'Atenção: ');
        }
      );
  }

  public getTitleLinhaPesquisa() {
    //FEITO
    this.siteService.getTitleLinhaPesquisa().subscribe(data => {
      this.listLinhaPesquisa = data;
    })
  }

  public initContentLine() {
    return this.builder.group({
      contentTitle: new FormControl('', Validators.required),
      contentLink: new FormControl('', Validators.required),
    });
  }

  public addContentLine(content = null) {
    const control = <FormArray>this.form.controls['content'];
    if (content != null) {
      control.push(this.builder.group({
        contentTitle: new FormControl(content.contentTitle, Validators.required),
        contentLink: new FormControl(content.contentLink, Validators.required),
      }));
    } else {
      control.push(this.initContentLine());
    }

  }

  public removeContentLine(index) {
    const teste = <FormArray>this.form.controls['content'];
    teste.removeAt(index);
  }

  get getFormContent() {
    return this.form.controls['content']
  }

  getTitleLinhaById(idLinha) {
    return this.listLinhaPesquisa.find(linha => linha._id == idLinha)?.title;
  }

  getProfessorName(idLinha, idProfessor) {
    const linhaSelecionada = this.listLinhaPesquisa.find(linha => linha._id == idLinha);
    if(linhaSelecionada) {
      return linhaSelecionada.corpoDocente?.find(ava => ava._id == idProfessor)?.fullName
    }
    return '';
  }

  public register() {
    if (this.form.valid) {
      if (this.form.value._id) {
        //FEITO
        this.siteService.atualizarProcessoSeletivo(this.form.value)
          .subscribe((res: any) => {
            this.toastr.success('Processo Seletivo alterado com sucesso', 'Sucesso');
            this.getProcessoSeletivo();
            this.limparForm();
          }, (err: any) => {
            this.toastr.error('Ocorreu um erro ao atualizar', 'Atenção: ');
          });
      } else {
        //FEITO
        this.siteService.cadastrarProcessoSeletivo(this.form.value)
          .subscribe((res: any) => {
            this.toastr.success('Processo Seletivo cadastrado', 'Sucesso');
            this.getProcessoSeletivo();
            this.limparForm();
          }, (err: any) => {
            this.toastr.error('Ocorreu um erro ao cadastrar', 'Atenção: ');
          });
      }

    } else {
      this.toastr.error('Preencha corretamente o formulário!', 'Atenção: ');
    }
  }

  getProcessoSeletivo() {
    this.siteService.listProcessoSeletivo().subscribe((res: any) => {
      this.datas = res;
    }, err => {
      this.toastr.error('Ocorreu um erro ao listar', 'Atenção: ');
    });
  }

  limparForm() {
    this.form.reset();
    const formArray = <FormArray>this.form.controls['content'];
    formArray.clear();
    this.addContentLine();
  }

  apagar(id, title) {
    const dialogRef = this.dialog.open(ComfirmDeleteProcessoComponent, {
      width: '750px',
      data: { title: title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //FEITO
        this.siteService.deletarProcessoSeletivo(id).subscribe((res: any) => {
          this.getProcessoSeletivo();
        }, err => {
          this.toastr.error('Ocorreu um erro ao apagar', 'Atenção: ');
        });
      }
    });
  }

  editar(obj) {
    this.getTitleLinhaPesquisa();

    this.form.patchValue({ ...obj, type: String(obj.type) });
    const formArray = <FormArray>this.form.controls['content'];
    formArray.clear();
    obj.content.forEach(element => {
      this.addContentLine(element)
    });
    
    const formArrayVagas = <FormArray>this.form.controls['vagas'];
    formArrayVagas.clear();
    if(obj.vagas) {
      obj.vagas.forEach(element => {
        this.editVagas({value: element.idLinhaPesquisa, selected: true}, true, element)
        // TODO
      });
    }
  }

  visualizar(title, content) {
    const dialogRef = this.dialog.open(ViewHtmlProcessoSeletivoComponent, {
      width: '750px',
      data: { title: title, content: content }
    });
  }

  criterioAvaliacao(criterio, idProcessoSeletivo, titleProcesso, etapaProcesso) {
    const dialogRef = this.dialog.open(CriterioAvaliacaoDialogComponent, {
      width: '1040px',
      data: {criterio, idProcessoSeletivo, titleProcesso, etapaProcesso },
      
    })
    dialogRef.afterClosed().subscribe(isEdited => {
      if(isEdited) {
        this.getProcessoSeletivo();
      }
    })
  }

  inscritos(id, title) {
    //FEITO
    this.siteService.listProcessoSeletivoInscritos(id).subscribe((res: any) => {

      const dialogRef = this.dialog.open(ViewInscritosProcessoSeletivoComponent, {
        width: '750px',
        data: { title: title, users: res.enrolled, idProcesso: id },

      });
    }, err => {
      this.toastr.error('Ocorreu um erro ao listar', 'Atenção: ');
    });
  }

  atualizarProcessoAtivo(event: MatSlideToggleChange, idProcesso) {
    //FEITO
    this.siteService.atualizarProcessoAtivo(event.checked, idProcesso).subscribe(() => {
      this.toastr.success('Visibilidade atualizada com sucesso.', 'Sucesso');
    },
      err => {
        this.toastr.error('Ocorreu um erro ao atualizar a visibilidade.', 'Atenção: ');

      });
  }
}