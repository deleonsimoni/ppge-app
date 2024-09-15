import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { catchError, merge, Observable, take } from "rxjs";
import { User } from '../shared/interfaces';
import { AuthService } from "../shared/services";
import { ProcessoSeletivoService } from "./processo-seletivo.service";
import { RanklistDialogComponent } from "./ranklist-dialog/ranklist-dialog.component";
import { questionsPerfilCandidato } from "@app/shared/shared.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-processo-seletivo',
  templateUrl: './processo-seletivo.component.html',
  styleUrls: ['./processo-seletivo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProcessoSeletivoComponent implements OnInit {
  user$: Observable<User | null> = merge(
    // Init on startup
    this.authService.me(),
    // Update after login/register/logout
    this.authService.getUser()
  );

  processoSeletivo: any;
  minhasInscricoes: any;
  completarInscricao: boolean = false;
  typeFormInscricaoSelected;
  idProcessoSelected;
  isLoadingRegister: boolean = false;
  isPreencherPerfilCandidato: boolean = false;
  idNovaInscricaoSelected: any;
  public questionsPerfilCandidato = questionsPerfilCandidato;
  public formPerfilCandidato: FormGroup;

  constructor(
    private processoSeletivoService: ProcessoSeletivoService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    public dialog: MatDialog,
    private builder: FormBuilder,
  ) {
    window.scroll({
      top: 0,
      left: 0
    })
  }

  ngOnInit(): void {
    this.getMinhasIncricoes();
    this.getProcessoSeletivo();
    this.createFormPerfilCandidato();
  }
  private limparDadosPerfilCandidato() {
    this.createFormPerfilCandidato();
    this.idNovaInscricaoSelected = null;
  }
  private createFormPerfilCandidato() {
    let questionsPerfilCandidatoForm = {};
    this.questionsPerfilCandidato.forEach(question => {
      if(question.type == 'checkbox') {
        let groupCheckbox = {}
        for(let i =0; i<question.options.length; i++) {
          groupCheckbox[question.options[i]] = [null, []]
        }
        questionsPerfilCandidatoForm[question.varName] = this.builder.group(groupCheckbox);
      } else {
        let validator = question.required ? [Validators.required] : [];
        questionsPerfilCandidatoForm[question.varName] = this.builder.control(null, validator);
      }
    });
    this.formPerfilCandidato = this.builder.group(questionsPerfilCandidatoForm);
  }

  registerPerfilCandidato() {
    
    if(this.formPerfilCandidato.valid) {
      this.processoSeletivoService.salvarPerfilCandidato(this.idProcessoSelected, this.idNovaInscricaoSelected, this.formPerfilCandidato.value)
        .pipe(
          take(1),
          catchError( err => {
            throw err;
          })
        ).subscribe(data => {
          this.toastr.success("Perfil registrado com sucesso!");
          this.sairProcessoPerfilCandidato()
        })
    } else {
      this.toastr.error('Preencha o formulário corretamente!', 'Atenção: ');
    }

  }
  sairProcessoPerfilCandidato() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.completarInscricao = false;
    this.isPreencherPerfilCandidato = false;
    this.limparDadosPerfilCandidato();
  }

  cancelarProcessoDeInscricao() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.completarInscricao = false
  }

  getMinhasIncricoes() {
    this.processoSeletivoService.buscarMinhasInscricoes().subscribe((data: any) => {
      this.minhasInscricoes = [];
      data.forEach(element => {
        this.minhasInscricoes.push(element._id);
      });
    })
  }

  getProcessoSeletivo() {
    this.processoSeletivoService.getProcessoSeletivo().subscribe(arr => {
      
      this.processoSeletivo = arr;
    });
  }

  listarRank(idProcesso) {

    this.dialog.open(RanklistDialogComponent, {
      width: '80%',
      data: {
        idProcesso
      }
    });

  }
  getNomeProcessoSelecionado() {
    return this.processoSeletivo.find(p => p._id == this.idProcessoSelected)?.title
  }

  iniciarInscricaoNoProcesso(idProcesso, type) {
    this.user$.pipe(take(1)).subscribe(myUser => {
      if (myUser != null) {
        this.typeFormInscricaoSelected = type;
        this.idProcessoSelected = idProcesso;
        this.completarInscricao = true;
        // this.processoSeletivoService.inscreverProcessoSeletivo(idProcesso).subscribe(() => {
        //   this.toastr.success('Inscrito com sucesso', 'Sucesso');
        //   this.getMinhasIncricoes();
        // });
      } else {
        this.toastr.error('Precisa estar logado para se inscrever em um processo seletivo', 'Atenção: ');
        setTimeout(() => {
          this.router.navigateByUrl('/auth/login')
        }, 2000);
      }
    },
      err => {
        console.log("ERRO: ", err);

      })
  }

  inscreverNoProcesso(objectReturned) {
    this.isLoadingRegister = true;
    let { 
      fileLattes, 
      filePreProjeto, 
      fileProjetoTese, 
      filePrincipalPubli, 
      fileConclusaoGraduacao,
      fileIndigena,
      fileCondicaoDeficiencia,
      fileCondicaoDeficienciaDois,
      fileCertidaoNascimentoFilho,
      fileComprovanteResidencia,
      fileComprovantePagamento,
      formRetorno,
      isPreencherPerfilCandidato,
    } = objectReturned;
    const files = {
      fileLattes: fileLattes ? fileLattes[0] : null, 
      filePreProjeto: filePreProjeto ? filePreProjeto[0] : null, 
      fileProjetoTese: fileProjetoTese ? fileProjetoTese[0] : null, 
      filePrincipalPubli: filePrincipalPubli ? filePrincipalPubli[0] : null, 
      
      fileConclusaoGraduacao: fileConclusaoGraduacao ? fileConclusaoGraduacao[0] : null,
      fileIndigena: fileIndigena ? fileIndigena[0] : null,
      fileCondicaoDeficiencia: fileCondicaoDeficiencia ? fileCondicaoDeficiencia[0] : null,
      fileCondicaoDeficienciaDois: fileCondicaoDeficienciaDois ? fileCondicaoDeficienciaDois[0] : null,
      fileCertidaoNascimentoFilho: fileCertidaoNascimentoFilho ? fileCertidaoNascimentoFilho[0] : null,
      fileComprovanteResidencia: fileComprovanteResidencia ? fileComprovanteResidencia[0] : null,

      fileComprovantePagamento: fileComprovantePagamento ? fileComprovantePagamento[0] : null,
    }
    if (formRetorno.valid) {
      this.processoSeletivoService.inscreverProcessoSeletivo(formRetorno.value.idProcesso, formRetorno.value, files)
        .subscribe(
          (data: any) => {
            this.toastr.success('Inscrito com sucesso', 'Sucesso');
            if(!isPreencherPerfilCandidato) {
              this.completarInscricao = false;
            } else {
              this.idNovaInscricaoSelected = data.idInscricao;
            }
            this.isPreencherPerfilCandidato = isPreencherPerfilCandidato;
            this.isLoadingRegister = false;
            this.getMinhasIncricoes();
          },
          erro => {
            this.isLoadingRegister = false;
            this.toastr.error('Ocorreu um erro inesperado!', 'Atenção: ');
          }
        );
    } else {
      this.isLoadingRegister = false;
      this.toastr.error('Preencha os campos corretamente', 'Atenção: ')
    }
  }

  cancelarInscricao(idProcesso) {
    this.user$.pipe(take(1)).subscribe(myUser => {
      if (myUser != null) {
        this.processoSeletivoService.cancelarInscricao(idProcesso).subscribe(() => {
          this.toastr.success('Inscrição cancelada com sucesso', 'Sucesso');
          this.getMinhasIncricoes();
        });
      } else {
        this.toastr.error('Precisa estar logado para cancelar uma inscrição', 'Atenção: ');
      }
    },
      err => {
        console.log("ERRO: ", err);

      })

  }
}