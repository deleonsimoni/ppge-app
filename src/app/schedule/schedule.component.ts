import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ScheduleService } from './schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ScheduleComponent implements OnInit {

  public scheduleType = 1;
  public scheduleInfo: any = {};

  constructor(
    private scheduleService: ScheduleService,
    private router: ActivatedRoute,
    private _sanitizer: DomSanitizer
  ) {
    window.scroll({ top: 0, left: 0 })
  }

  ngOnInit(): void {
    this.router.params.subscribe(routeParams => {
      this.scheduleType = routeParams.scheduleType;
      this.getCommitteeService(this.scheduleType);
      window.scroll({ top: 0, left: 0 });
    })
  }

  private getCommitteeService(scheduleType: number) {
    this.scheduleService.getInfoSchedule(scheduleType).subscribe(data => {
      data = data ? data : {};
      data.content = this._sanitizer.bypassSecurityTrustHtml(data.content);
      this.scheduleInfo = data;
    });
  }

}
