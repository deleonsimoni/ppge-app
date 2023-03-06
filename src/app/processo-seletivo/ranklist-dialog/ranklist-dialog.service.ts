import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class RanklistDialogService {
  private readonly URL_PROCESSO_SELETIVO = '/api/ppge/processo-seletivo';
  private readonly URL_API_PPGE = '/api/ppge';
  private readonly URL_RANK = `${this.URL_API_PPGE}/rank`;

  constructor(
    private http: HttpClient
  ) { }

  listarRanksAtivo(idProcesso) {
    return this.http.get(`${this.URL_RANK}/${idProcesso}/ativos`);

  }

}