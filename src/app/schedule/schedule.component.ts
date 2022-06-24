import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
    private router: ActivatedRoute
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
      this.scheduleInfo = data;
    });
  }

}
