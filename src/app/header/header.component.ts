import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '@app/shared/interfaces';

import { AuthService } from '@app/shared/services';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() user: User | null = null;

  private listUrlHeaders = [
    'linha_pesquisa',
    'cursos',
  ]
  private fromInitialsToLanguageCode = {
    br: 'pt-br',
    us: 'en-us',
    es: 'es-es'
  }
  headerData: any = {};

  constructor(
    private router: Router,
    private authService: AuthService,
    public translate: TranslateService,
    private headerService: HeaderService,
  ) { }

  ngOnInit(): void {
    this.getHeaders();
  }

  public getHeaders() {
    console.log("this.selectedCountryCode: ", this.selectedCountryCode);
    
    this.listUrlHeaders.forEach((pageSelected, index) => {
      this.headerService.getHeaderPage(pageSelected, this.fromInitialsToLanguageCode[this.selectedCountryCode]).subscribe((data) => {
        this.headerData[pageSelected] = data;
        console.log("this.headerData: ", this.headerData);
        
      });
    });
  }
  

  public loadScript() {
    let body = <HTMLDivElement> document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = "../../assets/js/ppge2.js";
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }

  ngAfterViewInit(){
    this.loadScript();
  }
  logout(): void {
    this.authService.signOut();
    this.router.navigateByUrl('/auth/login');
  }

  selectedCountryCode = 'br';
  countryCodes = ['us', 'es', 'br'];

  changeSelectedCountryCode(value: string): void {
    this.selectedCountryCode = value;
    this.translate.use(value);
    this.getHeaders();
    this.router.navigateByUrl('');
  }
}
