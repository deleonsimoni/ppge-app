import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SiteAdminService } from '@app/shared/services/site-admin.service';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RankComponent implements OnInit {
  listProcessoSeletivo: any;
  listInscricoes: any;

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
      data.enrolled.forEach(inscricao => {
        // let somatoria = 0;
        // let divisor = 0;
        // for(const property in inscricao.parecer) {
        //   const nota = parseFloat(inscricao.parecer[property]);
        //   if(typeof inscricao.parecer[property] != 'boolean' && !isNaN(nota)) {
        //     console.log("somatoria aaaaaaaaaaaa: ",somatoria);
        //     console.log("nota bbbbbbbbbbbbb: ", nota);

        //     somatoria = somatoria+nota;
        //     divisor++;
        //     console.log(`${property}: ${inscricao.parecer[property]} ===== somatoria: ${somatoria} ======divisor: ${divisor}`)
        //   }
        // }
        // inscricao.media = somatoria/divisor;
      })
      this.listInscricoes = data.enrolled.sort((a, b) => b.parecer.nota - a.parecer.nota);
    });
  }

}
