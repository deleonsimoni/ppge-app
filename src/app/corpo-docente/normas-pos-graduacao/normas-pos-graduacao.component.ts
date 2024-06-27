import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NormaPosGraduacaoService } from "./normas-pos-graduacao.service";

@Component({
    selector: 'app-normas-pos-graduacao',
    templateUrl: './normas-pos-graduacao.component.html',
    styleUrls: ['./normas-pos-graduacao.component.scss'],
    encapsulation: ViewEncapsulation.None
  })
  export class NormaPosGraduacaoComponent implements OnInit {

    public normasInfo: any = {};

    normaPosGraduacao: any;

    constructor(private normaPosGraduacaoService: NormaPosGraduacaoService) {
      window.scroll({
        top: 0,
        left: 0
      })
    }
  
    ngOnInit(): void {
      this.getNormaPosGraduacao();
    }

    getNormaPosGraduacao() {
    this.normaPosGraduacaoService.getNormaPosGraduacao().subscribe(normasInfo => {
        this.normasInfo = normasInfo ? normasInfo : {};
      });
    }
}