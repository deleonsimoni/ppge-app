import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegulationService {
  constructor(
    http: HttpClient
  ) { }

  public getInfoRegulation(regulationType: number): Observable<any> {
    const result =
      regulationType == 1 ?
        {
          textTitle: "Regulamentos " + regulationType,
          urlImage: "",
          textBody: `
            <h3>Regulamento do PPGE - FE / UFRJ 1</h3>
            <ul>
              <li>Novo Regulamento PPGE: PDF(Válido a partir de 2013)</li>
              <li><strong><a href="https://ppge.educacao.ufrj.br/ppgeinfos/manual-teses-dissertacoes-6ed.rev.pdf">Manual de dissertações e teses</a></strong></li>
              <li><strong><a href="https://ppge.educacao.ufrj.br/normascredenciamentorecredenciamentodocente%20CORRETO">Normas para credenciamento/descredenciamento de docente do PPGE</a></strong></li>
            </ul>
            <h3>Resoluções do CEPG 1</h3>
            <p><strong><a href="">http://app.pr2.ufrj.br/resolucoesCEPG</a></strong></p>
        `
        } :
        {
          textTitle: "Regulamentos " + regulationType,
          urlImage: "",
          textBody: `
              <h3>Regulamento do PPGE - FE / UFRJ 2</h3>
              <ul>
                <li>Novo Regulamento PPGE: PDF(Válido a partir de 2013)</li>
                <li><strong><a href="https://ppge.educacao.ufrj.br/ppgeinfos/manual-teses-dissertacoes-6ed.rev.pdf">Manual de dissertações e teses</a></strong></li>
                <li><strong><a href="https://ppge.educacao.ufrj.br/normascredenciamentorecredenciamentodocente%20CORRETO">Normas para credenciamento/descredenciamento de docente do PPGE</a></strong></li>
              </ul>
              <h3>Resoluções do CEPG 2</h3>
              <p><strong><a href="https://app.pr2.ufrj.br/resolucoesCEPG">http://app.pr2.ufrj.br/resolucoesCEPG</a></strong></p>
            `
        }
      ;

    return of(result);
  }
}