import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeGraduateEnum, TypeOpcaoVagaEnum } from '@app/shared/shared.model';
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

  fileLattes: FileList;
  fileComprovantePagamento: FileList;
  filePreProjeto: FileList;
  fileMemorial: FileList;

  constructor(
    private builder: FormBuilder,
    private serviceFormProcesso: FormProcessoSeletivoService,
  ) {
  }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0
    })

    this.getProcessoSeletivoInfosById();
    this.createForm();
  }

  public getFileNameLattes(): string {
    const fileName = this.fileLattes ? this.fileLattes[0].name : 'Curriculo LATTES';
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

  public getFileNameComprovantePagamento(): string {
    const fileName = this.fileComprovantePagamento ? this.fileComprovantePagamento[0].name : 'PDF Comprovante de Pagamento';
    return fileName;
  }

  public setFileNamComprovantePreProjeto(files: FileList): void {
    this.filePreProjeto = files;
  }

  public setFileNamComprovanteMemorial(files: FileList): void {
    this.fileMemorial = files;
  }

  public setFileNamComprovantePagamento(files: FileList): void {
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
        nome: [null, []],
        instituicao: [null, []],
        anoConclusao: [null, []],
        termoNaoColacaoGrau: [null, []]
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
          nome: [null, []],
          instituicao: [null, []],
          anoConclusao: [null, []],
          tituloDissertacao: [null, []],
          nomeOrientador: [null, []],
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
        console.log("BBBBBBBBBBBBBBBB: ", data);
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
      //this.toastr.error('É necessário selecionar o curriculo Lattes', 'Atenção');
      return;
    }
    if (!this.filePreProjeto) {
      //this.toastr.error('É necessário selecionar o curriculo Lattes', 'Atenção');
      return;
    }
    if (!this.fileComprovantePagamento) {
      //this.toastr.error('É necessário selecionar o curriculo Lattes', 'Atenção');
      return;
    }
    if (!this.fileMemorial) {
      // tslint:disable-next-line: align
      //this.toastr.error('É necessário selecionar o arquivo DOC', 'Atenção');
      return;
    }


    this.inscrever.emit(this.fileLattes, this.filePreProjeto, this.fileComprovantePagamento, this.fileMemorial, this.form);

  }

  getCorpoDocenteByLinhaPesquisa() {
    const idLinhaPesquisa = this.form.value.linhaPesquisa;
    const linhaPesquisa = this.listLinhaPesquisa.find(linha => linha._id == idLinhaPesquisa)
    this.listCorpoDocente = linhaPesquisa.corpoDocente;
  }

}
