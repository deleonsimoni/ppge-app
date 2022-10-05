import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeGraduateEnum } from '@app/shared/shared.model';
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

  constructor(
    private builder: FormBuilder,
    private serviceFormProcesso: FormProcessoSeletivoService,
  ) {
  }

  ngOnInit(): void {
    console.log("this.type: ",this.type)
    if(this.type == TypeGraduateEnum.MESTRADO) console.log("MESTRADO");
    if(this.type == TypeGraduateEnum.DOUTORADO) console.log("DOUTORADO");

    this.getProcessoSeletivoInfosById();
    // this.getTitleLinhaPesquisa();
    this.createForm();
  }

  private createForm() {
    console.log("createForm()");
    console.log("createForm() type: ", );

    let groupForm: any = {
      tipoFormulario: this.type,
      idProcessoSeletivo: [this.idProcessoSeletivo, [Validators.required]],
      linhaPesquisa: [null, [Validators.required]],
      primeiroOrientador: [null, [Validators.required]],
      opcaoVagaAmpla: [false, []],
      opcaoVagaCota: [false, []],
      opcaoVagaCotaSub: ["", []],
      deficienciaSub: [null, []],
      graduacao: this.builder.group({
        nome: [null, []],
        campo: [null, []],
        instituicao: [null, []],
        anoConclusao: [null, []],
        termoNaoColacaoGrau: [null, []]
      }),
      posGraduacao: this.builder.group({
        nome: [null, []],
        campo: [null, []],
        instituicao: [null, []],
        anoConclusao: [null, []],
      }),
      termoConcordanciaEdital: [null, [Validators.required]],
      termoResponsabilidadeInfo: [null, [Validators.required]]
    };

    if(this.type == TypeGraduateEnum.DOUTORADO) {
      groupForm = {
        ...groupForm,
        opcaoVagaDocente: [false, []],
        posGraduacaoMestrado: this.builder.group({
          nome: [null, []],
          campo: [null, []],
          instituicao: [null, []],
          anoConclusao: [null, []],
          tituloDissertacao: [null, []],
          nomeOrientador: [null, []],
        }),

      };
    } else if(this.type == TypeGraduateEnum.MESTRADO) {
      groupForm = {
        ...groupForm,
        termoLeituraEdital: [null, [Validators.required]],
        segundoOrientador: [null, [Validators.required]],

      };

    }
    console.log("groupForm: ", groupForm)
    this.form = this.builder.group(groupForm);
  }

  // private getTitleLinhaPesquisa() {
  //   this.serviceFormProcesso.getTitleLinhaPesquisa()
  //     .subscribe(data => {
  //       this.listLinhaPesquisa = data;
        
  //     });
  // }

  private getProcessoSeletivoInfosById() {
    this.serviceFormProcesso.getProcessoSeletivoInfosById(this.idProcessoSeletivo)
      .subscribe((data:any) => {
        console.log("BBBBBBBBBBBBBBBB: ", data);
        if(data) { 
          this.listLinhaPesquisa = data.researchLine
        }
      });
  }

  register() {
    console.log("register()");
    this.inscrever.emit(this.form);
    console.log("register()");
  }

  getCorpoDocenteByLinhaPesquisa() {
    const idLinhaPesquisa = this.form.value.linhaPesquisa;
    const linhaPesquisa = this.listLinhaPesquisa.find(linha => linha._id == idLinhaPesquisa)
    this.listCorpoDocente = linhaPesquisa.corpoDocente;
  }

}
