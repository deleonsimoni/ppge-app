import { Component, Input, OnInit } from '@angular/core';
import { TeseDissertacaoService } from '../tese-dissertacao.service';

@Component({
  selector: 'app-dissertacao',
  templateUrl: './dissertacao.component.html',
  styleUrls: ['./../tese-dissertacao.component.scss']
})
export class DissertacaoComponent implements OnInit {
  @Input()
  datas: any[] | undefined;

  checkAno: any | false;
  dissertacoes: any[] | undefined;

  constructor(private teseDissertacaoService: TeseDissertacaoService) { }

  ngOnInit(): void { }

  getAllDissertacaoAno(dataSelect: string) {
    this.checkAno = true;
    this.teseDissertacaoService.getTeseDissertacao(dataSelect, '2').subscribe(arr => {
      console.log(arr);
      this.dissertacoes = arr;
    });
  }
}  