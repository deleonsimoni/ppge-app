import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ResearchLineService } from './research-line.service';

@Component({
  selector: 'app-research-line',
  templateUrl: './research-line.component.html',
  styleUrls: ['./research-line.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResearchLineComponent implements OnInit {

  public researchLineType = '';
  public researchLineInfo: any = {};

  constructor(
    private researchLineService: ResearchLineService,
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
      this.researchLineType = routeParams.researchLineType;
      this.getCommitteeService(this.researchLineType);
      window.scroll({ top: 0, left: 0 });
    })
  }

  private getCommitteeService(researchLineType: string) {
    console.log("researchLineType: ", typeof researchLineType);
    
    this.researchLineService.getInfoResearchLine(researchLineType).subscribe(data => {
      console.log("DATA: ", data);
      
      if(data.length > 0) {
        data[0].content = this._sanitizer.bypassSecurityTrustHtml(data[0].content);
        this.researchLineInfo = data[0];
      } else {
        this.researchLineInfo = {title: "Página não encontrada!", content: "<h3>Verifique a url, ou tente acessá-la através do menu acima.</h3>"}
      }
    });
  }

}
