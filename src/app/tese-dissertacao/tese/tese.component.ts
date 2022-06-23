import { Component, Input, OnInit } from '@angular/core';
import { array } from 'joi';
import { TeseDissertacaoService } from '../tese-dissertacao.service';

@Component({
  selector: 'app-tese',
  templateUrl: './tese.component.html',
  styleUrls: ['./../tese-dissertacao.component.scss']
})
export class TeseComponent implements OnInit {

  @Input()
  datas: any[] | undefined;

  checkAno: any | false;
  teses: any[] | undefined;

  constructor(private teseDissertacaoService: TeseDissertacaoService) { }

  ngOnInit(): void {}

  getAllTeseAno(dataSelect: string) {
    this.checkAno = true;
    this.teseDissertacaoService.getTeseDissertacao(dataSelect, '1').subscribe(arr => {
      this.teses = arr;
    });
  }
}  