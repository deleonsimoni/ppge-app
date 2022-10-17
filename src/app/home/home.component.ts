import { Component, OnInit } from '@angular/core';
import { SiteUserService } from '@app/shared/services/site-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  news;
  revistas;

  constructor(
    private siteService: SiteUserService,
  ) { }

  ngOnInit(): void {

    this.siteService.getHome()
      .subscribe((res: any) => {
        this.news = res.news;
        this.revistas = res.revistas;
      }, err => {
        console.log(err);
      });

  }


}
