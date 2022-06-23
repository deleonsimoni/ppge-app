import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommitteeService } from './committee.service';

@Component({
  selector: 'app-committee',
  templateUrl: './committee.component.html',
  styleUrls: ['./committee.component.scss']
})
export class CommitteeComponent implements OnInit {

  public committeeType = 1;
  public committeeInfo: any = {};

  constructor(
    private committeeService: CommitteeService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(routeParams => {
      this.committeeType = routeParams.committeeType;
      this.getCommitteeService(this.committeeType);
    })
  }

  private getCommitteeService(committeeType: number) {
    this.committeeService.getInfoCommittee(committeeType).subscribe(data => {
      this.committeeInfo = data;
    });
  }

}
