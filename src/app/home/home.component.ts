import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SiteUserService } from '@app/shared/services/site-user.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, take } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {  
  private fromInitialsToLanguageCode = {
    br: 'pt-br',
    us: 'en-us',
    es: 'es-es'
  }
  homeApresentacaoInfo = {content: "<strong>BRENO</strong>"}
  pageNumber = 1;
  pageSize = 4;
  isLoadingNews = false;
  isLoadingRevista = false;
  news = [];
  revistas;

  constructor(
    private siteService: SiteUserService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getNoticias();
    this.getHomeApresentacao();
    this.getRevistas();

    // this.siteService.getHome()
    //   .subscribe((res: any) => {
    //     this.news = res.news;
    //     this.revistas = res.revistas;
    //   }, err => {
    //     console.log(err);
    //   });

  }

  getHomeApresentacao() {
    
    
    this.siteService.getInfoHomeApresentacao()
      .pipe(
        catchError( err => {
          this.toastr.error('Ocorreu um erro ao buscar "Apresentação"', 'Atenção: ');
          throw err;
        })
      )
      .subscribe((data: any) => {
        
        const languageStorage = localStorage.getItem('language');
        const languageParsed = languageStorage ? this.fromInitialsToLanguageCode[languageStorage] : this.fromInitialsToLanguageCode.br;
        this.homeApresentacaoInfo.content = data[languageParsed].content
      });
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
          this.news = data;
          this.isLoadingNews = false;
        });
  }

  getRevistas() {
    this.isLoadingNews = true;
    const languageStorage = localStorage.getItem('language');
    const languageParsed = languageStorage ? this.fromInitialsToLanguageCode[languageStorage] : this.fromInitialsToLanguageCode.br;
    
    this.siteService
        .getRevistas(this.pageNumber, this.pageSize)
        .pipe(
          take(1),
          catchError(err => {
            this.isLoadingRevista = false;
            this.toastr.error("Ocorreu um erro ao carregar revistas!", "Atenção");
            throw err;
          })
        )
        .subscribe(data => {
          this.revistas = data.map(revista => ({
            navTitle: revista[languageParsed]?.navTitle,
            title: revista[languageParsed]?.title,
            content: revista[languageParsed]?.content,
            img: revista.imagePathS3,
            _id: revista._id
          }));
          this.isLoadingRevista = false;
        });
  }

  nextPage() {
    this.pageNumber++;
    this.getNoticias();
  }

  viewDetail(item: any) {
    this.router.navigate(['/revista', item._id], { queryParams: { title: item.title, img: item.img, navTitle: item.navTitle, content: item.content } });
  }

  previousPage() {
    if(this.pageNumber > 1) {
      this.pageNumber--;
      this.getNoticias();
    }

  }



}
