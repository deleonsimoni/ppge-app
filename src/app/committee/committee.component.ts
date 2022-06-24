import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommitteeService } from './committee.service';

@Component({
  selector: 'app-committee',
  templateUrl: './committee.component.html',
  styleUrls: ['./committee.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommitteeComponent implements OnInit {

  public committeeType = 1;
  public committeeInfo: any = {};

  constructor(
    private committeeService: CommitteeService,
    private router: ActivatedRoute
  ) {
    window.scroll({
      top: 0,
      left: 0
    })
  }

  ngOnInit(): void {
    this.router.params.subscribe(routeParams => {
      this.committeeType = routeParams.committeeType;
      this.getCommitteeService(this.committeeType);
      window.scroll({ top: 0, left: 0 });
    })
  }

  private getCommitteeService(committeeType: number) {
    this.committeeService.getInfoCommittee(committeeType).subscribe(data => {
      this.committeeInfo = data;
    });
  }

}
