import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeGraduateEnum, TypeOpcaoVagaEnum } from '@app/shared/shared.model';
import { ToastrService } from 'ngx-toastr';
import { FormProcessoSeletivoService } from './form-processo-seletivo.service';

@Component({
  selector: 'app-form-processo-seletivo',
  templateUrl: './form-processo-seletivo.component.html',
  styleUrls: ['./form-processo-seletivo.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class FormProcessoSeletivoComponent implements OnInit {
  @Input() type: number;
  @Input() idProcessoSeletivo: string;
  @Output() inscrever: EventEmitter<any> = new EventEmitter();

  public form: FormGroup;
  public listLinhaPesquisa: any = [];
  public listCorpoDocente: any = [];
  public typeGraduateEnum = TypeGraduateEnum;
  public typeOpcaoVagaEnum = TypeOpcaoVagaEnum;
  public listCotas: any;

  fileLattes: FileList;
  fileComprovantePagamento: FileList;
  filePreProjeto: FileList;
  fileMemorial: FileList;
  fileProjetoTese: FileList;
  filePrincipalPubli: FileList;

  constructor(
    private builder: FormBuilder,
    private serviceFormProcesso: FormProcessoSeletivoService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0
    })

    this.getProcessoSeletivoInfosById();
    this.getAllCotas();
    this.createForm();
  }

  clearSegundoOrientador() {
    this.form.get('segundoOrientador')?.setValue(null)
  }

  getAllCotas() {
    this.serviceFormProcesso.getAllCotas().subscribe(listCotas => {
      this.listCotas = listCotas
    })
  }

  public getFileNameLattes(): string {
    const fileName = this.fileLattes ? this.fileLattes[0].name : 'Curriculo LATTES';
    return fileName;
  }

  public getFileNameProjetoTese(): string {
    const fileName = this.fileProjetoTese ? this.filePrincipalPubli[0].name : 'PDF Pré Projeto';
    return fileName;
  }

  public getFileNamePrincipalPubli(): string {
    const fileName = this.filePrincipalPubli ? this.filePrincipalPubli[0].name : 'PDF Memorial';
    return fileName;
  }

  public getFileNamePreProjeto(): string {
    const fileName = this.filePreProjeto ? this.filePreProjeto[0].name : 'PDF Pré Projeto';
    return fileName;
  }

  public getFileNameMemorial(): string {
    const fileName = this.fileMemorial ? this.fileMemorial[0].name : 'PDF Memorial';
    return fileName;
  }

  public setFileNameProjetoTese(files: FileList): void {
    this.fileProjetoTese = files;
  }

  public setFileNamePrincipalPubli(files: FileList): void {
    this.filePrincipalPubli = files;
  }

  public setFileNamePreProjeto(files: FileList): void {
    this.filePreProjeto = files;
  }

  public setFileNameMemorial(files: FileList): void {
    this.fileMemorial = files;
  }

  public setFileNameComprovantePagamento(files: FileList): void {
    this.fileComprovantePagamento = files;
  }

  public setFileNameLattes(files: FileList): void {
    this.fileLattes = files;
  }

  private createForm() {

    let groupForm: any = {
      idProcesso: [this.idProcessoSeletivo, [Validators.required]],
      tipoFormulario: [this.type, [Validators.required]],
      linhaPesquisa: [null, [Validators.required]],
      primeiroOrientador: [null, [Validators.required]],
      opcaoVaga: [null, []],
      opcaoVagaCotaSub: [null, []],
      deficienciaSub: [null, []],
      graduacao: this.builder.group({
        nome: [null, [Validators.required]],
        instituicao: [null, [Validators.required]],
        anoConclusao: [null, [Validators.required]],
        termoNaoColacaoGrau: [null, [Validators.required]]
      }),
      posGraduacao: this.builder.group({
        nome: [null, []],
        instituicao: [null, []],
        anoConclusao: [null, []],
      }),
      termoConcordanciaEdital: [null, [Validators.required]],
      termoResponsabilidadeInfo: [null, [Validators.required]]
    };

    if (this.type == TypeGraduateEnum.DOUTORADO) {
      groupForm = {
        ...groupForm,
        posGraduacaoMestrado: this.builder.group({
          nome: [null, [Validators.required]],
          instituicao: [null, [Validators.required]],
          anoConclusao: [null, [Validators.required]],
          tituloDissertacao: [null, [Validators.required]],
          nomeOrientador: [null, [Validators.required]],
        }),

      };
    } else if (this.type == TypeGraduateEnum.MESTRADO) {
      groupForm = {
        ...groupForm,
        termoLeituraEdital: [null, [Validators.required]],
        segundoOrientador: [null, [Validators.required]],

      };

    }
    this.form = this.builder.group(groupForm);
  }


  private getProcessoSeletivoInfosById() {
    this.serviceFormProcesso.getProcessoSeletivoInfosById(this.idProcessoSeletivo)
      .subscribe((data: any) => {
        if (data) {
          this.listLinhaPesquisa = data.researchLine
        }
      });
  }

  limpaOpcaoVagaCotaSub() {
    this.form.patchValue({ opcaoVagaCotaSub: null });
  }

  register() {

    //TODO vai ter limite de tamanho?

    if (!this.fileLattes) {
      this.toastr.error('É necessário selecionar o Curriculo Lattes', 'Atenção');
      return;
    }

    if(this.type == TypeGraduateEnum.MESTRADO) {
      if (!this.filePreProjeto) {
        this.toastr.error('É necessário selecionar o Pré-projeto', 'Atenção');
        return;
      }
      
    } else if(this.type == TypeGraduateEnum.DOUTORADO) {
      if (!this.fileProjetoTese) {
        this.toastr.error('É necessário selecionar o Projeto de Tese', 'Atenção');
        return;
      }
      if (!this.filePrincipalPubli) {
        // tslint:disable-next-line: align
        this.toastr.error('É necessário selecionar a Principal Publicação', 'Atenção');
        return;
      }

    }


    this.inscrever.emit({
      fileLattes: this.fileLattes, 
      filePreProjeto: this.filePreProjeto, 
      fileProjetoTese: this.fileProjetoTese, 
      filePrincipalPubli: this.filePrincipalPubli, 
      formRetorno: this.form
    });

  }

  getCorpoDocenteByLinhaPesquisa() {
    const idLinhaPesquisa = this.form.value.linhaPesquisa;
    const linhaPesquisa = this.listLinhaPesquisa.find(linha => linha._id == idLinhaPesquisa)
    this.listCorpoDocente = linhaPesquisa.corpoDocente;
  }

}
