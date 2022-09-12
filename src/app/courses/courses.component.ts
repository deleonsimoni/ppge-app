import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from './courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CoursesComponent implements OnInit {

  public coursesType = '';
  public coursesInfo: any = {};

  constructor(
    private coursesService: CoursesService,
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
      this.coursesType = routeParams.coursesType;
      this.getCoursesService(this.coursesType);
      window.scroll({ top: 0, left: 0 })
    })
  }

  private getCoursesService(coursesType: string) {
    this.coursesService.getInfoCourses(coursesType).subscribe(data => {
      
      if(data.length > 0) {
        data[0].content = this._sanitizer.bypassSecurityTrustHtml(data[0].content);
        this.coursesInfo = data[0];
      } else {
        this.coursesInfo = {title: "Página não encontrada!", content: "<h3>Verifique a url, ou tente acessá-la através do menu acima.</h3>"}
      }
    });
  }

}
