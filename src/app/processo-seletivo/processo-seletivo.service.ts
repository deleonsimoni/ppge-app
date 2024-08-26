import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TypeGraduateEnum } from "@app/shared/shared.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProcessoSeletivoService {
  private readonly URL_PROCESSO_SELETIVO = '/api/ppge/processo-seletivo';

  constructor(
    private http: HttpClient
  ) { }

  public getProcessoSeletivo(): Observable<any> {
    let params = new HttpParams().set('isAtivo', true);
    return this.http.get(`${this.URL_PROCESSO_SELETIVO}`, { params });
  }

  public salvarPerfilCandidato(idProcesso, idInscricao, formulario) {
    
    return this.http.post(`${this.URL_PROCESSO_SELETIVO}/inscrever/perfil-candidato/${idProcesso}/${idInscricao}`, { formulario });
  }

  public inscreverProcessoSeletivo(idProcesso, formulario, files) {

    const formData: FormData = new FormData();
    formData.append('fileArray', files.fileLattes);

    if(formulario.tipoFormulario == TypeGraduateEnum.MESTRADO) {
      formData.append('fileArray', files.filePreProjeto);
      formData.append('fileConclusaoGraduacao', files.fileConclusaoGraduacao);
      formData.append('fileIndigena', files.fileIndigena);
      formData.append('fileCondicaoDeficiencia', files.fileCondicaoDeficiencia);
      formData.append('fileCondicaoDeficienciaDois', files.fileCondicaoDeficienciaDois);
      formData.append('fileCertidaoNascimentoFilho', files.fileCertidaoNascimentoFilho);
      formData.append('fileComprovanteResidencia', files.fileComprovanteResidencia);
    } else if(formulario.tipoFormulario == TypeGraduateEnum.DOUTORADO) {
      formData.append('fileArray', files.fileProjetoTese);
      formData.append('fileArray', files.filePrincipalPubli);
      formData.append('fileComprovantePagamento', files.fileComprovantePagamento);
    }
    formData.append('formulario', JSON.stringify(formulario));
    return this.http.post(`${this.URL_PROCESSO_SELETIVO}/inscrever/${idProcesso}`, formData);

  }

  public buscarMinhasInscricoes() {
    return this.http.get(`${this.URL_PROCESSO_SELETIVO}/minha-inscricoes`);
  }

  public cancelarInscricao(idProcesso) {
    return this.http.delete(`${this.URL_PROCESSO_SELETIVO}/inscrever/${idProcesso}`);
  }
}