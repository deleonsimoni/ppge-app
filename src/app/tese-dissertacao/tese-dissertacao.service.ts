import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

const teses = require("./teses.json");
const dissertacoes = require("./dissertacoes.json");
const datas = require("./datas.json");

@Injectable({
    providedIn: "root"
  })
  export class TeseDissertacaoService {
  
    constructor(
      private http: HttpClient
    ) { }
  
    public getTeseDissertacao(data: string, tipo: string): Observable<any> {
      if(tipo === '1') {
        return of(teses);
      } else {
        return of(dissertacoes);
      }
    }

    public getDatasTeseDissertacao(tipo: string): Observable<any> {
      return of(datas);
    }
}