import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { merge, Observable, take } from "rxjs";
import { User } from '../shared/interfaces';
import { AuthService } from "../shared/services";
import { ProcessoSeletivoService } from "./processo-seletivo.service";

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

    constructor(
      private processoSeletivoService: ProcessoSeletivoService,
      private authService: AuthService,
      private toastr: ToastrService,
      private router: Router,
    ) {
      window.scroll({
        top: 0,
        left: 0
      })
    }
  
    ngOnInit(): void {
      this.getMinhasIncricoes();
      this.getProcessoSeletivo();
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

    iniciarInscricaoNoProcesso(idProcesso, type) {
      this.user$.pipe(take(1)).subscribe(myUser => {
        if(myUser != null) {
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

    inscreverNoProcesso(formRetorno: FormGroup) {
      console.log("VOLTOUUUUUUUUUUU ");
      console.log("iniciarInsNoProcesso: ", formRetorno.value);
      console.log("formRetornoformRetornoformRetornoformRetorno: ", formRetorno);
      //AAAAAAAAAAAA
      const invalid = [];
      const controls = formRetorno.controls;
      for (const name in controls) {
          if (controls[name].invalid) {
              invalid.push(name);
          }
      }
      console.log("invalid: ", invalid)
      //AAAAAAAAAAAA
      if(formRetorno.valid) {
        this.processoSeletivoService.inscreverProcessoSeletivo(formRetorno.value.idProcessoSeletivo, formRetorno.value)
          .subscribe(
            () => {
              this.toastr.success('Inscrito com sucesso', 'Sucesso');
              this.completarInscricao = false;
              this.getMinhasIncricoes();
            },
            erro => {
              this.toastr.error('Ocorreu um erro inesperado!', 'Atenção: ');
            }
          );
      } else {
        this.toastr.error('Preencha os campos corretamente', 'Atenção: ')
      }
    }

    cancelarInscricao(idProcesso) {
      this.user$.pipe(take(1)).subscribe(myUser => {
        if(myUser != null) {
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