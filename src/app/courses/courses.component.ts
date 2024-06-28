import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from './courses.service';
import { TypeBlocoEnum, TypeGraduateEnum } from '@app/shared/shared.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CoursesComponent implements OnInit {

  courseTypeOptions = {
    mestrado: {
      title: "Cursos de Mestrado",
      tipo: TypeGraduateEnum.MESTRADO,
    },
    doutorado: {
      title: "Cursos de Doutorado",
      tipo: TypeGraduateEnum.DOUTORADO,
    },
    ementas: {
      title: "Ementário e Programas",
      tipo: null,
    },
  }

  public flagViewCourse = false;
  public coursesType = '';
  public coursesInfo: any = {};
  public listCursosObrigatorios: any[] = [];
  public listCursosLivreEscolha: any[] = [];

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
      //this.getCoursesService(this.coursesType);
      this.convertCourseType(this.coursesType)
      this.getHeaderPage(this.courseTypeOptions[this.coursesType]?.tipo);

      window.scroll({ top: 0, left: 0 })
    })
  }

  toggleViewCourse(flag) {
    this.flagViewCourse = flag;

  }

  public getCoursesService(_id: string) {
    this.coursesService.getInfoCourses(_id).subscribe(data => {
      
      if(data.length > 0) {
        data[0].content = this._sanitizer.bypassSecurityTrustHtml(data[0].content);
        this.coursesInfo = data[0];
        this.toggleViewCourse(true);
      } else {
        this.coursesInfo = {title: "Página não encontrada!", content: "<h3>Verifique a url, ou tente acessá-la através do menu acima.</h3>"}
      }
    });
  }

  private getHeaderPage(coursesType) {
    
    this.coursesService
      .getHeaderPage(coursesType)
      .subscribe(listCursos => {
        this.listCursosObrigatorios = listCursos.filter(curso => curso.tipoBloco== TypeBlocoEnum.OBRIGATORIO);
        this.listCursosLivreEscolha = listCursos.filter(curso => curso.tipoBloco== TypeBlocoEnum.LIVRE_ESCOLHA);;

        
      })
  }

  private convertCourseType(coursesType) {
    if(coursesType == "mestrado") {
      return TypeGraduateEnum.MESTRADO;
    } else if(coursesType == "doutorado") {
      return TypeGraduateEnum.DOUTORADO;
    } else {
      return null;
    }
  }

}
