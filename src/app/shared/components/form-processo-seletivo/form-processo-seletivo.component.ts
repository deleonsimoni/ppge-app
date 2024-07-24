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

  register() {
    if(this.passoInscricao < 3) {
      this.passoInscricao++;
      window.scroll({
        top: 0,
        left: 0
      });
      return;
    }
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

  public questionsPerfilCandidato = [
    {
        id: 1,
        question: "Qual a data do seu nascimento? *",
        type: "text",
        varName: "dataNascimento"
    },
    {
        id: 2,
        question: "Qual é a sua cor/ raça? *",
        options: [
            "Amarelo",
            "Branco",
            "Indígena",
            "Pardo",
            "Preto",
            "Não desejo declarar"
        ],
        type: "radio",
        varName: "corRaca"
    },
    {
        id: 3,
        question: "E o seu gênero? *",
        options: [
            "Feminino",
            "Masculino",
            "Outro",
            "Prefiro não declarar"
        ],
        type: "radio",
        varName: "genero"
    },
    {
        id: 4,
        question: "Pessoa com deficiência? *",
        options: ["Sim", "Não"],
        type: "radio",
        varName: "pessoaComDeficiencia"
    },
    {
        id: 5,
        question: "Em caso de resposta afirmativa na pergunta acima, tem alguma necessidade de tecnologia assistiva ou acessibilidade para realizar o curso?",
        type: "text",
        condition: "Sim",
        varName: "necessidadeTecnologia"
    },
    {
        id: 6,
        question: "Qual é a sua nacionalidade? *",
        options: [
            "Brasileiro(a)",
            "Outro:"
        ],
        type: "radio",
        varName: "nacionalidade"
    },
    {
        id: 7,
        question: "Se estrangeiro(a), especifique de qual país em \"Outros\".",
        type: "text",
        condition: "Outro:",
        varName: "paisEstrangeiro"
    },
    {
        id: 8,
        question: "Você tem filhos(as)? *",
        options: ["Sim", "Não"],
        type: "radio",
        varName: "temFilhos"
    },
    {
        id: 9,
        question: "Caso tenha filhos(as), quantos? *",
        options: [
            "1 filho(a)",
            "2 filhos(as)",
            "3 filhos(as)",
            "4 filhos(as) ou mais",
            "Não tenho filhos(as)"
        ],
        type: "radio",
        condition: "Sim",
        varName: "quantosFilhos"
    },
    {
        id: 10,
        question: "Tem filhos(as) menores de 5 anos de idade? *",
        options: ["Sim", "Não"],
        type: "radio",
        varName: "filhosMenores5"
    },
    {
        id: 11,
        question: "Quantos filhos(as) menores de 5 anos de idade? *",
        options: [
            "1 filho(a)",
            "2 filhos(as)",
            "3 filhos(as)",
            "4 filhos(as) ou mais",
            "Não tenho filhos(as) menores de 5 anos de idade"
        ],
        type: "radio",
        condition: "Sim",
        varName: "quantosFilhosMenores5"
    },
    {
        id: 12,
        question: "Tem filhos(as) menores de 18 anos de idade? *",
        options: ["Sim", "Não"],
        type: "radio",
        varName: "filhosMenores18"
    },
    {
        id: 13,
        question: "Quantos filhos(as) menores de 18 anos de idade? *",
        options: [
            "1 filho(a)",
            "2 filhos(as)",
            "3 filhos(as)",
            "4 filhos(as) ou mais",
            "Não tenho filhos(as) menores de 18 anos de idade"
        ],
        type: "radio",
        condition: "Sim",
        varName: "quantosFilhosMenores18"
    },
    {
        id: 14,
        question: "Bairro: *",
        type: "text",
        varName: "bairro"
    },
    {
        id: 15,
        question: "Cidade: *",
        type: "text",
        varName: "cidade"
    },
    {
        id: 16,
        question: "Estado: *",
        options: [
            "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
        ],
        type: "radio",
        varName: "estado"
    },
    {
        id: 17,
        question: "Você cursou a maior parte do Ensino Médio em qual rede de ensino? *",
        options: [
            "Privada",
            "Pública municipal",
            "Pública estadual",
            "Pública federal"
        ],
        type: "radio",
        varName: "redeEnsinoMedio"
    },
    {
        id: 18,
        question: "Curso:",
        type: "text",
        varName: "curso1"
    },
    {
        id: 19,
        question: "Instituição:",
        type: "text",
        varName: "instituicao1"
    },
    {
        id: 20,
        question: "Ano de término:",
        type: "text",
        varName: "anoTermino1"
    },
    {
        id: 21,
        question: "Curso:",
        type: "text",
        varName: "curso2"
    },
    {
        id: 22,
        question: "Instituição:",
        type: "text",
        varName: "instituicao2"
    },
    {
        id: 23,
        question: "Ano de término:",
        type: "text",
        varName: "anoTermino2"
    },
    {
        id: 24,
        question: "Na graduação, você atuou em qual ou quais dos programas/atividades acadêmicas abaixo? *",
        options: [
            "Monitoria",
            "Iniciação Científica - PIBIC (com bolsa)",
            "Iniciação Científica - FAPERJ",
            "Participação em grupo de pesquisa voluntário (sem bolsa)",
            "Programa de Iniciação à Docência - PIBID",
            "Programas de extensão (PIBEX/PIBIAC) com bolsa",
            "Programas de extensão como voluntário (sem bolsa)",
            "Não participei"
        ],
        type: "checkbox",
        varName: "programasGraduacao"
    },
    {
        id: 25,
        question: "Caso tenha participado de um grupo de pesquisa durante a graduação, por quanto tempo foi sua participação?",
        type: "text",
        varName: "tempoPesquisaGraduacao"
    },
    {
        id: 26,
        question: "Na graduação você recebeu algum tipo de bolsa ou auxílio da assistência estudantil? *",
        options: ["Sim", "Não", "Não sei/ não me lembro"],
        type: "radio",
        varName: "recebeuAuxilioGraduacao"
    },
    {
        id: 27,
        question: "Se sim, qual?",
        options: [
            "auxílio financeiro/ bolsa auxílio",
            "auxílio transporte/ Riocard/ vale transporte etc.",
            "residência estudantil",
            "restaurante universitário/ bandejão",
            "Outro:"
        ],
        type: "radio",
        condition: "Sim",
        varName: "tipoAuxilioGraduacao"
    },
    {
        id: 28,
        question: "Quando cursou sua graduação, você ingressou por algum tipo de ação afirmativa ou cota? *",
        options: ["Sim", "Não"],
        type: "radio",
        varName: "ingressoCota"
    },
    {
        id: 29,
        question: "Se sim, qual?",
        options: [
            "Renda",
            "Renda + Escola pública",
            "Renda + Escola pública + raça",
            "Escola pública + raça",
            "Renda + raça",
            "Pessoa com deficiência",
            "Outro:"
        ],
        type: "radio",
        condition: "Sim",
        varName: "tipoCota"
    },
    {
        id: 30,
        question: "Você trabalha ou já trabalhou anteriormente? *",
        options: [
            "Nunca trabalhei",
            "Já trabalhei, mas não estou trabalhando no momento",
            "Trabalho atualmente"
        ],
        type: "radio",
        varName: "experienciaTrabalho"
    },
    {
        id: 31,
        question: "Trabalha ou trabalhou na área da educação? *",
        options: ["Sim", "Não"],
        type: "radio",
        varName: "trabalhoEducacao"
    },
    {
        id: 32,
        question: "Caso trabalhe atualmente na área educacional, responda:",
        type: "text",
        condition: "Sim",
        varName: "respostaEducacional"
    },
    {
        id: 33,
        question: "Você atua em qual ou quais funções?",
        options: [
            "Professor/a",
            "Direção/Coordenação pedagógica",
            "Gestão em secretaria de educação (municipal ou estadual)",
            "Outro:"
        ],
        type: "checkbox",
        condition: "Sim",
        varName: "funcoesAtuais"
    },
    {
        id: 34,
        question: "Você trabalha em quantas instituições?",
        type: "text",
        varName: "quantasInstituicoes"
    },
    {
        id: 35,
        question: "Em qual ou quais redes de ensino você trabalha? É possível assinalar mais de uma opção.",
        options: [
            "Privada",
            "Pública municipal",
            "Pública estadual",
            "Pública federal"
        ],
        type: "checkbox",
        varName: "redesEnsino"
    },
    {
        id: 36,
        question: "Em qual ou quais nível/níveis de ensino você trabalha? É possível assinalar mais de uma opção.",
        options: [
            "Educação Infantil (creche e pré-escola)",
            "Educação Fundamental I (1º ao 5º ano)",
            "Educação Fundamental II (6º ou 9º ano)",
            "Ensino Médio",
            "Graduação",
            "Outro:"
        ],
        type: "checkbox",
        varName: "niveisEnsino"
    },
    {
        id: 37,
        question: "Qual rendimento da sua FAMÍLIA, somando a renda mensal bruta de todas as pessoas que moram na sua residência? *",
        options: [
            "Não possuo/possuímos rendimento",
            "Até 1 salário mínimo (R$ 1.412)",
            "Acima de 1 (R$ 1.412) a 3 salários mínimos (R$ 4.236)",
            "Acima de 3 (R$ 4.236 ) a 5 salários mínimos (R$ 7.060)",
            "Acima de 5 (R$ 7.060) a 7 salários mínimos (R$ 9.884)",
            "Acima de 7 (R$ 9.884) a 10 salários mínimos (R$ 14.120)",
            "Acima de 10 salários mínimos (R$ 14.120)"
        ],
        type: "radio",
        varName: "rendimentoFamiliar"
    },
    {
        id: 38,
        question: "Você tem dependentes? *",
        options: ["Não", "Sim"],
        type: "radio",
        varName: "temDependentes"
    },
    {
        id: 39,
        question: "Quantos dependentes?",
        options: [
            "1 dependente",
            "2 dependentes",
            "3 dependentes",
            "4 dependentes ou mais",
            "Não tenho dependentes"
        ],
        type: "radio",
        condition: "Sim",
        varName: "quantosDependentes"
    },
    {
        id: 40,
        question: "Qual o nível de escolaridade do seu PAI? *",
        options: [
            "Não sei",
            "Sem escolaridade",
            "Ensino Fundamental I (1º ao 5º ano)",
            "Ensino Fundamental II (6º ao 9º ano)",
            "Ensino Médio",
            "Graduação",
            "Pós-graduação Lato Sensu (Especialização)",
            "Mestrado",
            "Doutorado"
        ],
        type: "radio",
        varName: "escolaridadePai"
    },
    {
        id: 41,
        question: "Qual o nível de escolaridade da sua MÃE? *",
        options: [
            "Não sei",
            "Sem escolaridade",
            "Ensino Fundamental I (1º ao 5º ano)",
            "Ensino Fundamental II (6º ao 9º ano)",
            "Ensino Médio",
            "Graduação",
            "Pós-graduação Lato Sensu (Especialização)",
            "Mestrado",
            "Doutorado"
        ],
        type: "radio",
        varName: "escolaridadeMae"
    },
    {
        id: 42,
        question: "Na sua família há alguém que concluiu curso de pós-graduação (Mestrado ou Doutorado)? *",
        options: ["Sim", "Não"],
        type: "radio",
        varName: "posGraduacaoFamilia"
    },
    {
        id: 43,
        question: "Se sim, quem?",
        options: [
            "Pai/padrasto",
            "Mãe/madrasta",
            "Irmã(o)",
            "Esposo(a) ou companheiro(a)",
            "Outra pessoa"
        ],
        type: "radio",
        condition: "Sim",
        varName: "quemPosGraduacao"
    }
  ];

}
