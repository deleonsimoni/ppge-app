import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RegulationService } from './regulation.service';

@Component({
  selector: 'app-regulation',
  templateUrl: './regulation.component.html',
  styleUrls: ['./regulation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegulationComponent implements OnInit {

  public regulationType = 1;
  public regulationInfo: any = {};

  constructor(
    private regulationService: RegulationService,
    private router: ActivatedRoute,
    private _sanitizer: DomSanitizer
  ) {
    window.scroll({
      top: 0,
      left: 0
    })
  }

  ngOnInit(): void {
    this.router.params.subscribe(routeParams => {
      this.regulationType = routeParams.regulationType;
      this.getCommitteeService(this.regulationType);
      window.scroll({ top: 0, left: 0 });
    })
  }

  private getCommitteeService(regulationType: number) {
    this.regulationService.getInfoRegulation(regulationType).subscribe(data => {
      data = data ? data : {};
      data.content = this._sanitizer.bypassSecurityTrustHtml(data.content);
      this.regulationInfo = data;
    });
  }

}
