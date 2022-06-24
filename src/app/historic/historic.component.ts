import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HistoricService } from './historic.service';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HistoricComponent implements OnInit {

  public historicInfo: any = {};

  constructor(private historicService: HistoricService) {
    window.scroll({
      top: 0,
      left: 0
    })
  }

  private getInfoHistoric() {
    this.historicService.getInfoHistoric().subscribe(historicInfo => {
      this.historicInfo = historicInfo;
    });
  }

  ngOnInit(): void {
    this.getInfoHistoric();
  }

}
