import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResearchLineService } from './research-line.service';

@Component({
  selector: 'app-research-line',
  templateUrl: './research-line.component.html',
  styleUrls: ['./research-line.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResearchLineComponent implements OnInit {

  public researchLineType = 1;
  public researchLineInfo: any = {};

  constructor(
    private researchLineService: ResearchLineService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(routeParams => {
      this.researchLineType = routeParams.researchLineType;
      this.getCommitteeService(this.researchLineType);
    })
  }

  private getCommitteeService(researchLineType: number) {
    this.researchLineService.getInfoResearchLine(researchLineType).subscribe(data => {
      this.researchLineInfo = data;
    });
  }

}
