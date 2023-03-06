import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class RankViewDialogService {

  private readonly URL_API_PPGE = '/api/ppge';
  private readonly URL_RANK = `${this.URL_API_PPGE}/rank`;

  constructor(
    private http: HttpClient,
  ) {}

  public getDetalheRank(idProcesso, idRank) {
    return this.http.get(`${this.URL_RANK}/detalhe/${idProcesso}/${idRank}`);
  }
}