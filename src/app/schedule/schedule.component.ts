import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScheduleService } from './schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  public scheduleType = 1;
  public scheduleInfo: any = {};

  constructor(
    private scheduleService: ScheduleService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(routeParams => {
      this.scheduleType = routeParams.scheduleType;
      this.getCommitteeService(this.scheduleType);
    })
  }

  private getCommitteeService(scheduleType: number) {
    this.scheduleService.getInfoSchedule(scheduleType).subscribe(data => {
      this.scheduleInfo = data;
    });
  }

}
