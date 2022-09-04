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
      switch (tipo) {
        case '1':
          console.log('entrou tese', teses);
          return of(teses);
        case '2':
          console.log('entrou dissertacoes');
          return of(dissertacoes);
        case '3' : default:
          console.log('entrou ambas');
          return of(teses, dissertacoes);
      }
    }

    public getDatasTeseDissertacao(tipo: string): Observable<any> {
      return of(datas);
    }
}