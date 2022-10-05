import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HistoricService } from './historic.service';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HistoricComponent implements OnInit {

  public historicInfo: any = {};

  constructor(
    private historicService: HistoricService,
    private _sanitizer: DomSanitizer
    ) {
    window.scroll({
      top: 0,
      left: 0
    })
  }

  private getInfoHistoric() {
    this.historicService.getInfoHistoric().subscribe(historicInfo => {
      // historicInfo[0].content = this._sanitizer.bypassSecurityTrustHtml(historicInfo[0].content);
      this.historicInfo = historicInfo ? historicInfo : {};
    });
  }

  ngOnInit(): void {
    this.getInfoHistoric();
  }

}
