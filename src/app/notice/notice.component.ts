import { Component, OnInit } from '@angular/core';
import { NoticeService } from './notice.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { catchError, take } from 'rxjs';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent implements OnInit {
  
  idNoticia = null;
  notice = {};

  constructor(
    private serviceNotice: NoticeService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
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
            console.log("notice: ", this.notice);
          });
      }
    });

  }

}
