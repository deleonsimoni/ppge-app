import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from './courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CoursesComponent implements OnInit {

  public coursesType = 1;
  public coursesInfo: any = {};

  constructor(
    private coursesService: CoursesService,
    private router: ActivatedRoute
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

  private getCoursesService(coursesType: number) {
    this.coursesService.getInfoCourses(coursesType).subscribe(data => {
      this.coursesInfo = data;
    });
  }

}
