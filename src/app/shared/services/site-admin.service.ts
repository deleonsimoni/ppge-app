import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteAdminService {
  private readonly URL_API_USER = '/api/user';
  private readonly URL_API_PPGE = '/api/ppge';
  private readonly URL_HISTORICO = `${this.URL_API_PPGE}/historico`;
  private readonly URL_CORPO_DOCENTE = `${this.URL_API_PPGE}/corpo-docente`;
  private readonly URL_OBJETIVOS = `${this.URL_API_PPGE}/objetivos`;
  private readonly URL_TESE_DISSERTACAO = '/api/projetos/tese-dissertacao';
  private readonly URL_PROCESSO_SELETIVO = `${this.URL_API_PPGE}/processo-seletivo`;
  private readonly URL_PAGE = `${this.URL_API_PPGE}/page`;
  private readonly URL_PARECERISTAS = `${this.URL_API_PPGE}/parecerista`;
  private readonly URL_CRITERIO = `${this.URL_API_PPGE}/criterio-avaliacao`;
  private readonly URL_COTA = `${this.URL_API_PPGE}/cota-acao-afirmativa`;

  constructor(
    private http: HttpClient
  ) { }

  getUserByIdOnlyProcesso(idUser, idProcesso) {
    let params = new HttpParams();
    params = params.set("idProcesso", idProcesso);
    return this.http.get(`${this.URL_PROCESSO_SELETIVO}/inscritos/detalhe/${idUser}`, { params });
  }

  getTitleLinhaPesquisa() {
    return this.http.get(`${this.URL_PAGE}/linha_pesquisa/headers-professors`);
  }

  listCorpoDocenteName() {
    return this.http.get(`${this.URL_CORPO_DOCENTE}/name`);
  }

  /* Page */

  listPage(pageSelected: string, language: string, _idPage = null) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    let params = new HttpParams()
      .set('language', language);
    params = _idPage ? params.set('_id', _idPage) : params;
    return this.http.get(`${this.URL_PAGE}/${pageSelected}`, { params });
  }

  cadastrarPage(form: any, pageSelected: string) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.post(`${this.URL_PAGE}/${pageSelected}`, { formulario: form }, { headers });
  }

  deletarPage(form: any, pageSelected: string) {
    return this.http.delete(`${this.URL_PAGE}/${pageSelected}/${form._id}`);
  }

  atualizarPage(form: any, pageSelected: string) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.put(`${this.URL_PAGE}/${pageSelected}/${form._id}`, { formulario: form }, { headers });
  }
  /* Fim Page */



  /* Historico */
  listHistorico() {
    return this.http.get(`${this.URL_HISTORICO}`);
  }

  cadastrarHistorico(form: any) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.post(`${this.URL_HISTORICO}`, { formulario: form }, { headers });
  }

  deletarHistorico(form: any) {
    return this.http.delete(`${this.URL_HISTORICO}/${form._id}`);
  }

  atualizarHistorico(form: any) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.put(`${this.URL_HISTORICO}/${form._id}`, { formulario: form }, { headers });
  }
  /* Fim Historico */

  /* Objetivos */
  testObjetivo = [{}];
  listObjetivo() {
    return this.http.get(`${this.URL_OBJETIVOS}`);
  }

  cadastrarObjetivo(form: any) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.post(`${this.URL_OBJETIVOS}`, { formulario: form }, { headers });
  }

  atualizarObjetivo(form: any) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.put(`${this.URL_OBJETIVOS}/${form._id}`, { formulario: form }, { headers });
  }
  /* Fim Objetivos */

  /* Corpo Docente */
  listCorpoDocente() {
    return this.http.get(`${this.URL_CORPO_DOCENTE}`);
  }

  cadastrarCorpoDocente(file: any, form: any) {
    const formData: FormData = new FormData();
    formData.append('formulario', JSON.stringify(form));

    if (file) {
      formData.append('fileArray', file, `${file.name}`);
    }
    return this.http.post(`${this.URL_CORPO_DOCENTE}`, formData);
  }

  atualizarCorpoDocente(file: any, form: any) {
    const formData: FormData = new FormData();
    formData.append('formulario', JSON.stringify(form));

    if (file) {
      formData.append('fileArray', file, `${file.name}`);
    }
    return this.http.put(`${this.URL_CORPO_DOCENTE}/${form._id}`, formData);
  }

  deletarCorpoDocente(form: any) {
    return this.http.delete(`${this.URL_CORPO_DOCENTE}/${form._id}`);
  }

  /* Fim Corpo Docente */
  /* Tese DISSERTACAO */
  listTeseDissertacao(tipo: string) {
    return this.http.get(`${this.URL_TESE_DISSERTACAO}/${tipo}`);
  }

  cadastrarTeseDissertacao(form: any) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.post(`${this.URL_TESE_DISSERTACAO}`, { formulario: form }, { headers });
  }

  atualizarTeseDissertacao(form: any) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.put(`${this.URL_TESE_DISSERTACAO}/${form._id}`, { formulario: form }, { headers });
  }

  getTeseDissertacao(form: any) {
    let params = new HttpParams();
    if (form.tipo) params = params.set('tipo', form.tipo)
    if (form.ano) params = params.set('ano', form.ano)
    if (form.ingresso) params = params.set('ingresso', form.ingresso)
    if (form.autor) params = params.set('autor', form.autor)
    if (form.titulo) params = params.set('titulo', form.titulo)
    if (form.dataSala) params = params.set('dataSala', form.dataSala)
    if (form.banca) params = params.set('banca', form.banca)
    if (form.metadados) params = params.set('metadados', form.metadados)

    return this.http.get(`${this.URL_TESE_DISSERTACAO}/get-filter/filter`, { params: params });
  }

  deletarTeseDissertacao(id: any) {
    return this.http.delete(`${this.URL_TESE_DISSERTACAO}/${id}`);
  }
  /* Fim Tese DISSERTACAO */
  /* Processo Seletivo */

  changeHomologInscricao(value, idInscricaoSelecionada, idProcessoSelecionado) {
    return this.http.put(`${this.URL_PROCESSO_SELETIVO}/parecer/homologacao`, {value, idInscricaoSelecionada, idProcessoSelecionado});

  }

  getParecer(idInscricao, idProcesso) {
    let params = new HttpParams()
      .set("idInscricao", idInscricao)
      .set("idProcesso", idProcesso);

    return this.http.get(`${this.URL_PROCESSO_SELETIVO}/parecer`, { params });
  }

  registrarParecer(idInscricao, idProcesso, formulario) {
    let params = new HttpParams()
      .set("idInscricao", idInscricao)
      .set("idProcesso", idProcesso);
    return this.http.post(`${this.URL_PROCESSO_SELETIVO}/parecer`, { formulario }, { params });
  }

  cadastrarProcessoSeletivo(form: any) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.post(`${this.URL_PROCESSO_SELETIVO}`, { formulario: form }, { headers });
  }

  listProcessoSeletivo() {
    return this.http.get(this.URL_PROCESSO_SELETIVO);
  }

  mudarEtapa(etapa, idProcesso) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.put(`${this.URL_PROCESSO_SELETIVO}/mudar-etapa`, {idProcesso, etapa});
  }

  deletarProcessoSeletivo(id: any) {
    return this.http.delete(`${this.URL_PROCESSO_SELETIVO}/${id}`);
  }

  atualizarProcessoSeletivo(form: any) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.put(`${this.URL_PROCESSO_SELETIVO}/${form._id}`, { formulario: form }, { headers });
  }

  listProcessoSeletivoInscritos(id) {
    return this.http.get(`${this.URL_PROCESSO_SELETIVO}/inscritos/${id}`);
  }

  atualizarProcessoAtivo(checked, id) {
    return this.http.post(`${this.URL_PROCESSO_SELETIVO}/ativo/${id}`, { isAtivo: checked });
  }

  getProcessosSeletivoTitle() {
    return this.http.get(`${this.URL_PROCESSO_SELETIVO}/headers`);

  }

  getInscritosProcessoById(idProcesso, filtroConsulta = null) {
    let params = new HttpParams()

    if (filtroConsulta && filtroConsulta != 'todos') {
      params = params.set("filtroConsulta", filtroConsulta);
    }

    return this.http.get(`${this.URL_PROCESSO_SELETIVO}/inscritos/${idProcesso}`, { params });

  }

  vincularParecerista(idInscricao, idParecerista, idProcesso) {
    return this.http.put(`${this.URL_PROCESSO_SELETIVO}/inscritos/vincular-parecerista`, { idInscricao, idParecerista, idProcesso });
  }

  detalharInscricao(idInscricao, idProcesso) {
    let params = new HttpParams();
    params = params.set("idProcesso", idProcesso);
    params = params.set("idInscricao", idInscricao);
    return this.http.get(`${this.URL_PROCESSO_SELETIVO}/inscritos/parecer/detalhe`, { params });
  }

  detalharAllInscricoes(idProcesso) {
    let params = new HttpParams();
    params = params.set("idProcesso", idProcesso);
    return this.http.get(`${this.URL_PROCESSO_SELETIVO}/inscritos/parecer/all`, { params });

  }

  salvarVinculoCriterio(criterio, idProcessoSeletivo) {
    return this.http.put(`${this.URL_PROCESSO_SELETIVO}/criterio/${idProcessoSeletivo}`, {criterio})
  }

  /* Fim Processo Seletivo */

  /* Parecerista */

  cadastrarParecerista(email, idLinhaPesquisa) {
    return this.http.post(`${this.URL_PARECERISTAS}`, { email, idLinhaPesquisa });
  }

  removerParecerista(idUser, idLinhaPesquisa) {
    let params = new HttpParams();
    params = params.set("idLinhaPesquisa", idLinhaPesquisa)

    return this.http.delete(`${this.URL_PARECERISTAS}/${idUser}`, { params });
  }

  listarPareceristas(idLinhaPesquisa: string = null) {
    let params = new HttpParams();
    if (idLinhaPesquisa) {
      params = params.set("idLinhaPesquisa", idLinhaPesquisa)
    }
    return this.http.get(`${this.URL_PARECERISTAS}`, { params });
  }

  adicionarCoordenador(idUser) {
    return this.http.post(`${this.URL_PARECERISTAS}/coordenador/${idUser}`, {});

  }

  removerCoordenador(idUser) {
    return this.http.delete(`${this.URL_PARECERISTAS}/coordenador/${idUser}`);

  }

  /* Fim Parecerista */

  /* Criterio de avaliacao */
  cadastrarCriterio(formulario) {
    return this.http.post(`${this.URL_CRITERIO}`, {formulario});
  }

  atualizarCriterio(formulario) {
    return this.http.put(`${this.URL_CRITERIO}/${formulario._id}`, {formulario});
  }

  getAllCriterios() {
    return this.http.get(`${this.URL_CRITERIO}`);

  }

  deleteById(idCriterio) {
    return this.http.delete(`${this.URL_CRITERIO}/${idCriterio}`);
  }
  /* Fim Criterio de avaliacao */


  /* Cotas de Ação Afirmativa */

  cadastrarCota(formulario) {
    return this.http.post(`${this.URL_COTA}`, {formulario});
  }

  atualizarCota(formulario) {
    return this.http.put(`${this.URL_COTA}/${formulario._id}`, {formulario});
  }

  getAllCotas() {
    return this.http.get(`${this.URL_COTA}`);

  }

  deleteCotaById(idCota) {
    return this.http.delete(`${this.URL_COTA}/${idCota}`);
  }

  /* Fim Cotas de Ação Afirmativa */
}
