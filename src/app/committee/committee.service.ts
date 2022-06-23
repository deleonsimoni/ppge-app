import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommitteeService {
  constructor(
    http: HttpClient
  ) { }

  public getInfoCommittee(committeeType: number): Observable<any> {
    const result =
      committeeType == 1 ?
        {
          textTitle: "Comissão Deliberativa",
          urlImage: "",
          textBody: `
        <p>
          A Comissão Deliberativa administra o PPGE, e tem funções deliberativas e executivas. Essa Comissão se reúne no mínimo a cada dois meses, ou extraordinariamente, a qualquer tempo, quando convocada pelo Coordenador ou por dois de seus membros.
        </p>
  
        <h3>Membros:</h3>
        <ul>
          <li>Patricia Corsino - docente</li>
          <li>Antônio Jorge Gonçalves Soares - docente</li>
          <li>Mônica Pereira dos Santos - docente</li>
          <li>José Jairo Vieira - docente</li>
          <li>Jose Claudio Sooma Silva - docente</li>
          <li>Vinicius Moraes Monção - discente</li>
          <li>Solange Rosa de Araujo - Secretária do PPGE</li>
        </ul>
        `
        } :
        {
          textTitle: "Comissão de Gestão",
          urlImage: "",
          textBody: `
        <p>
          A Comissão de Gestão administra o PPGE, e tem funções deliberativas e executivas. Essa Comissão se reúne no mínimo a cada dois meses, ou extraordinariamente, a qualquer tempo, quando convocada pelo Coordenador ou por dois de seus membros.
        </p>
  
        <h3>Membros:</h3>
        <ul>
          <li>Patricia Corsino - docente de Gestão</li>
          <li>Antônio Jorge Gonçalves Soares - docente de Gestão</li>
          <li>Mônica Pereira dos Santos - docente de Gestão</li>
          <li>José Jairo Vieira - docente de Gestão</li>
          <li>Jose Claudio Sooma Silva - docente de Gestão</li>
          <li>Vinicius Moraes Monção - discente de Gestão</li>
          <li>Solange Rosa de Araujo - Secretária do PPGE de Gestão</li>
        </ul>
        `
        }
      ;

    return of(result);
  }
}