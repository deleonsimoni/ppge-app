import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SiteAdminService } from '@app/shared/services/site-admin.service';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RankComponent implements OnInit {
  displayedColumns = [
    "nome",
    "nota",
    "aprovado"
  ]

  listProcessoSeletivo: any;
  listInscricoes: any[] = [];

  constructor(
    private siteService: SiteAdminService,
  ) { }

  ngOnInit(): void {
    this.siteService.getProcessosSeletivoTitle().subscribe((data: any) => {
      this.listProcessoSeletivo = data;
    });
  }

  detalharAllInscricoes(idProcesso) {

    this.siteService.detalharAllInscricoes(idProcesso).subscribe((data: any) => {
      let dataExibir: any = {};
      data.enrolled.forEach(inscricao => {
        const {parecer, linhaPesquisa} = inscricao;
        if(!dataExibir[linhaPesquisa._id]) {
          dataExibir[linhaPesquisa._id] = {titleLinha: linhaPesquisa.title, inscritos: []}
        }

        let aux: any = {};
        aux.titleLinhaPesquisa = linhaPesquisa.title
        console.log("LINHA PESQUISA: ", linhaPesquisa.title)
        if(parecer) {
          let nota = 0;
          if(parecer.notasHomologacao) {
            Object.values(parecer.notasHomologacao).forEach(section => {
              Object.values(section).forEach(question => {
                nota+=question;
              })
            })
          }

          if(parecer.notasAprovacao) {
            Object.values(parecer.notasAprovacao).forEach(section => {
              Object.values(section).forEach(question => {
                nota+=question;
              })
            })
          }
          console.log("NOTA: ", nota)
          dataExibir[linhaPesquisa._id].inscritos.push({fullname: inscricao.idUser.fullname, nota, aprovado: parecer.aprovado})
          dataExibir[linhaPesquisa._id].inscritos = dataExibir[linhaPesquisa._id].inscritos.sort((a, b) => Number(b.nota) - Number(a.nota))
        }
        
      });
      console.log("data: ", data);
      console.log("APARECER: ", dataExibir);
      this.listInscricoes = Object.values(dataExibir);
    });
  }

}
