import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { questionsPerfilCandidato, TypeGraduateEnum, TypeOpcaoVagaEnum } from '@app/shared/shared.model';
import { ToastrService } from 'ngx-toastr';
import { FormProcessoSeletivoService } from './form-processo-seletivo.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { take } from 'rxjs';

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

  public passoInscricao = 1;
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
  fileConclusaoGraduacao: FileList;
  fileIndigena: FileList;
  fileCondicaoDeficiencia: FileList;
  fileCondicaoDeficienciaDois: FileList;
  fileCertidaoNascimentoFilho: FileList;
  fileComprovanteResidencia: FileList;

  constructor(
    private builder: FormBuilder,
    private serviceFormProcesso: FormProcessoSeletivoService,
    private toastr: ToastrService,
    public dialog: MatDialog
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

  public setFileConclusaoGraduacao(files: FileList): void {
    this.fileConclusaoGraduacao = files;
  }

  public setFileIndigena(files: FileList): void {
    this.fileIndigena = files;
  }

  public setFileCondicaoDeficiencia(files: FileList): void {
    this.fileCondicaoDeficiencia = files;
  }

  public setFileCondicaoDeficienciaDois(files: FileList): void {
    this.fileCondicaoDeficienciaDois = files;
  }

  public setFileCertidaoNascimentoFilho(files: FileList): void {
    this.fileCertidaoNascimentoFilho = files;
  }

  public setFileComprovanteResidencia(files: FileList): void {
    this.fileComprovanteResidencia = files;
  }

  private createForm() {

    let groupForm: any = {
      idProcesso: [this.idProcessoSeletivo, [Validators.required]],
      tipoFormulario: [this.type, [Validators.required]],
      linhaPesquisa: [null, [Validators.required]],
      primeiroOrientador: [null, [Validators.required]],
      opcaoVaga: [null, []],
      opcaoVagaCotaSub: [null, []],
      deficiencia: [null, []],
      graduacao: this.builder.group({
        nome: [null, [Validators.required]],
        instituicao: [null, [Validators.required]],
        anoInicio: [null, [Validators.required]],
        anoConclusao: [null, [Validators.required]],
        termoNaoColacaoGrau: [null, [Validators.required]]
      }),
      posGraduacao: this.builder.group({
        nome: [null, []],
        instituicao: [null, []],
        anoInicio: [null, [Validators.required]],
        anoConclusao: [null, []],
      }),
      perfilCandidato: this.builder.group({}),
      termoConcordanciaEdital: [null, [Validators.required]],
      termoResponsabilidadeInfo: [null, [Validators.required]]
    };

    if (this.type == TypeGraduateEnum.DOUTORADO) {
      groupForm = {
        ...groupForm,
        posGraduacaoMestrado: this.builder.group({
          nome: [null, [Validators.required]],
          instituicao: [null, [Validators.required]],
          anoInicio: [null, [Validators.required]],
          anoConclusao: [null, [Validators.required]],
          tituloDissertacao: [null, [Validators.required]],
          nomeOrientador: [null, [Validators.required]],
        }),
        outrosCursos: [null, []],
      };
    } else if (this.type == TypeGraduateEnum.MESTRADO) {
      groupForm = {
        ...groupForm,
        termoLeituraEdital: [null, [Validators.required]],
        segundoOrientador: [null, [Validators.required]],
        qualDeficiencia: [null, []],
        atendimentoEspecialDeficiencia: [null, []],
        deficienciaSub: [null, []],
        isMaeFilhoMenorCinco: [null, []],
        resideDistanciaLonga: [null, []],
        declaracaoResideDistanciaLonga: [null, []],
      };

    }

    let questionsPerfilCandidatoForm = {};
    this.questionsPerfilCandidato.forEach(question => {
      if(question.type == 'checkbox') {
        let a = {}
        for(let i =0; i<question.options.length; i++) {
          a[question.options[i]] = [null, []]
        }
        questionsPerfilCandidatoForm[question.varName] = this.builder.group(a);
      } else {
        questionsPerfilCandidatoForm[question.varName] = [null, []];
      }
    });
    groupForm.perfilCandidato = this.builder.group(questionsPerfilCandidatoForm);
    
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

  passoAnterior() {
    window.scroll({
      top: 0,
      left: 0
    });
    this.passoInscricao = this.passoInscricao-1
  }

  async register() {
    console.log("111111111");
    if(this.passoInscricao == 2) {
      const dialogRef = await this.dialog.open(ConfirmDialogComponent, {
        width: '750px',
        data: { 
          title: `Ainda falta preencher os dados do perfil do candidato, que é opcional. Deseja finalizar a inscrição?`,
          textIfFalse: 'Não',
          textIfTrue: 'Sim'
        }
      })
      dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
        if (typeof result == 'boolean') {
          if(result) {
            console.log("VERDADE");
            this.finalizarInscricao();
          } else {
            this.proximoPasso();
          }
        }
      })
      return;
    }
    console.log("2222222");

    if(this.passoInscricao < 3) {
      this.proximoPasso();
      return;
    }
    console.log("3333333");

    this.finalizarInscricao();

  }

  proximoPasso() {
    this.passoInscricao++;
    window.scroll({
      top: 0,
      left: 0
    });
  }

  finalizarInscricao() {
    
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
      fileConclusaoGraduacao: this.fileConclusaoGraduacao,
      fileIndigena: this.fileIndigena,
      fileCondicaoDeficiencia: this.fileCondicaoDeficiencia,
      fileCondicaoDeficienciaDois: this.fileCondicaoDeficienciaDois,
      fileCertidaoNascimentoFilho: this.fileCertidaoNascimentoFilho,
      fileComprovanteResidencia: this.fileComprovanteResidencia,
      fileComprovantePagamento: this.fileComprovantePagamento,

      formRetorno: this.form,
    });
  }
 
  getCorpoDocenteByLinhaPesquisa() {
    const idLinhaPesquisa = this.form.value.linhaPesquisa;
    const linhaPesquisa = this.listLinhaPesquisa.find(linha => linha._id == idLinhaPesquisa)
    this.listCorpoDocente = linhaPesquisa.corpoDocente;
  }

  public questionsPerfilCandidato = questionsPerfilCandidato;

}
