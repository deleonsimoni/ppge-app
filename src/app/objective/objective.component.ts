import { Component, OnInit } from '@angular/core';
import { ObjectiveService } from './objective.service';

@Component({
  selector: 'app-objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.scss']
})
export class ObjectiveComponent implements OnInit {

  public objectiveInfo: any = {};

  constructor(
    private objectiveService: ObjectiveService
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
      this.objectiveInfo = data;
    });
  }

}
