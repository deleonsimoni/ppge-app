import { Component, OnInit } from '@angular/core';
import { SiteUserService } from '@app/shared/services/site-user.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, take } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  pageNumber = 1;
  pageSize = 4;
  isLoadingNews = false;

  news = [];
  revistas;

  constructor(
    private siteService: SiteUserService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getNoticias();
    
    // this.siteService.getHome()
    //   .subscribe((res: any) => {
    //     this.news = res.news;
    //     this.revistas = res.revistas;
    //   }, err => {
    //     console.log(err);
    //   });

  }

  getNoticias() {
    this.isLoadingNews = true;
    this.siteService
        .getNoticias(this.pageNumber, this.pageSize)
        .pipe(
          take(1),
          catchError(err => {
            this.isLoadingNews = false;
            this.toastr.error("Ocorreu um erro ao carregar notícias!", "Atenção");
            throw err;
          })
        )
        .subscribe(data => {
          console.log("DATA: ", data);
          this.news = data;
          this.isLoadingNews = false;
        });
  }

  nextPage() {
    this.pageNumber++;
    this.getNoticias();
  }

  previousPage() {
    if(this.pageNumber > 1) {
      this.pageNumber--;
      this.getNoticias();
    }

  }



}
