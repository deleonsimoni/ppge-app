import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ObjectiveService } from './objective.service';

@Component({
  selector: 'app-objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ObjectiveComponent implements OnInit {

  public objectiveInfo: any = {};

  constructor(
    private objectiveService: ObjectiveService,
    private _sanitizer: DomSanitizer
  ) {
    window.scroll({
      top: 0,
      left: 0
    })
  }

  ngOnInit(): void {
    this.getOnjectiveInfo();
  }

  private getOnjectiveInfo() {
    this.objectiveService.getInfoObjective().subscribe(data => {
      data.content = this._sanitizer.bypassSecurityTrustHtml(data.content);
      this.objectiveInfo = data;
    });
  }

}
