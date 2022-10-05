import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class FormProcessoSeletivoService {
  private readonly URL_API_PPGE = '/api/ppge';
  private readonly URL_PAGE = `${this.URL_API_PPGE}/page`;

  constructor(
    private http: HttpClient
  ) { }

  // getTitleLinhaPesquisa() {
  //   return this.http.get(`${this.URL_PAGE}/linha_pesquisa/all-titles`);
  // }

  getProcessoSeletivoInfosById(idProcessoSeletivo) {
    return this.http.get(`${this.URL_API_PPGE}/processo-seletivo/inscrever/infos/${idProcessoSeletivo}`);
  }

  getCorpoDocenteByLinhaPesquisa(idLinhaPesquisa) {
    return of([
      {
        _id: "11111111",
        fullName: "Breninho"
      },
      {
        _id: "22222222",
        fullName: "Brenin 2"
      },
    ])
  }
}