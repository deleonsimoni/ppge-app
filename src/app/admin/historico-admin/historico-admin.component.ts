import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SiteAdminService } from '@app/shared/services/site-admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-historico-admin',
  templateUrl: './historico-admin.component.html',
  styleUrls: ['./historico-admin.component.scss']
})
export class HistoricoAdminComponent implements OnInit {

  public form: FormGroup;
  carregando = false;
  data: any;
  @ViewChild('imageRender', { static: false }) imageRender: ElementRef;
  private image: FileList;

  constructor(
    private builder: FormBuilder,
    private siteService: SiteAdminService,
    private toastr: ToastrService,
  ) {
    this.form = this.builder.group({
      _id: [],
      title: [null, [Validators.required]],
      subTitle: [null, [Validators.required]],
      content: [null, [Validators.required]],
      logo: [null, []],
      facebook: [null, []],
      youtube: [null, []],
      instagram: [null, []],
      twitter: [null, []]
    });
  }

  ngOnInit(): void {
    this.siteService.listHistorico().subscribe((res: any) => {
      this.carregando = false;
      this.data = res;
      this.form.patchValue(res[0]);
    }, err => {
      this.carregando = false;
      this.toastr.error('Ocorreu um erro ao listar Histórico', 'Atenção: ');
    });;
  }

  public register() {

    if (this.form.valid) {

      if (this.form.value._id) {

        this.siteService.atualizarHistorico(this.image[0], this.form.value)
          .subscribe((res: any) => {
            this.toastr.success('Histórico alterado com sucesso', 'Sucesso');
          }, (err: any) => {
            this.toastr.error('Ocorreu um erro ao atualizar', 'Atenção: ');
            console.log(err);
          });

      } else {
        this.siteService.cadastrarHistorico(this.image[0], this.form.value)
          .subscribe((res: any) => {
            this.toastr.success('Histórico cadastrado', 'Sucesso');
          }, (err: any) => {
            this.toastr.error('Ocorreu um erro ao cadastrar', 'Atenção: ');
            console.log(err);
          });
      }

    }
  }

  public loadImage() {
    let element: HTMLElement = document.getElementById('image') as HTMLElement;
    element.click();
  }

  public setImage(files: FileList): void {
    this.image = files;

    const reader = new FileReader();
    reader.readAsDataURL(this.image[0]); // Read file as data url
    reader.onloadend = (e) => { // function call once readAsDataUrl is completed
      this.imageRender.nativeElement.src = e.target['result']; // Set image in element
    };
  }

}
