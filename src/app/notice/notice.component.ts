import { Component, OnInit } from '@angular/core';
import { NoticeService } from './notice.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, take } from 'rxjs';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent implements OnInit {
  
  idNoticia = null;
  notice: any = {};
  revista: any = {};;

  constructor(
    private serviceNotice: NoticeService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.revista.title = this.route.snapshot.queryParams['title'];
    this.revista.img = this.route.snapshot.queryParams['img'];
    this.revista.navTitle = this.route.snapshot.queryParams['navTitle'];
    this.revista.content = this.route.snapshot.queryParams['content'];

    if(this.revista.title){
      this.notice = this.revista;
    } else {
      this.route.params.subscribe(routeParams => {
        this.idNoticia = routeParams.idNoticia;
        if(this.idNoticia) {
          this.serviceNotice.getNotice(this.idNoticia)
            .pipe(
              take(1),
              catchError( err => {
                this.toastr.error("Ocorreu um erro ao carregar a notícia!", "Atenção");
                throw err;
              })
            ).subscribe(data => {
              if(data.length > 0)
                this.notice = data[0];
            });
        }
      });
    }
    

  }

}
