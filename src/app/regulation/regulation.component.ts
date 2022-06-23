import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegulationService } from './regulation.service';

@Component({
  selector: 'app-regulation',
  templateUrl: './regulation.component.html',
  styleUrls: ['./regulation.component.scss']
})
export class RegulationComponent implements OnInit {

  public regulationType = 1;
  public regulationInfo: any = {};

  constructor(
    private regulationService: RegulationService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(routeParams => {
      this.regulationType = routeParams.regulationType;
      this.getCommitteeService(this.regulationType);
    })
  }

  private getCommitteeService(regulationType: number) {
    this.regulationService.getInfoRegulation(regulationType).subscribe(data => {
      this.regulationInfo = data;
    });
  }

}
