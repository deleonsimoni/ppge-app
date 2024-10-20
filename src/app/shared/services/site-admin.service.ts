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
  private readonly URL_CRITERIO_HOMOLOGACAO = `${this.URL_API_PPGE}/criterio-homologacao`;
  private readonly URL_COTA = `${this.URL_API_PPGE}/cota-acao-afirmativa`;
  private readonly URL_RANK = `${this.URL_API_PPGE}/rank`;

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

  cadastrarPageWithImage(file: any, form: any, pageSelected: string) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");

    const formData: FormData = new FormData();
    formData.append('formulario', JSON.stringify(form));

    if (file) {
      formData.append('fileArray', file, `${file.name}`);
    }
    return this.http.post(`${this.URL_PAGE}-img/${pageSelected}`, formData );
  }

  atualizarPageWithImage(file: any, form: any, pageSelected: string) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");

    const formData: FormData = new FormData();
    formData.append('formulario', JSON.stringify(form));

    if (file) {
      formData.append('fileArray', file, `${file.name}`);
    }
    return this.http.put(`${this.URL_PAGE}-img/${pageSelected}/${form._id}`, formData);
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
  getAnosCadastrados() {
    return this.http.get(`${this.URL_TESE_DISSERTACAO}/anos-cadastrados/all`);
  }

  listTeseDissertacao(tipo: string, page = null, limit= null, searchOrientador = null, searchAutor = null, searchAno = null, searchTitulo = null) {
    let params = new HttpParams();
    if(page && limit) {
      params = params.set("page", page);
      params = params.set("limit", limit);
    }
    if(searchOrientador && searchOrientador.trim() != "") params = params.set("searchOrientador", searchOrientador);
    if(searchAutor && searchAutor.trim() != "") params = params.set("searchAutor", searchAutor);
    if(searchAno && searchAno.trim() != "") params = params.set("searchAno", searchAno);
    if(searchTitulo && searchTitulo.trim() != "") params = params.set("searchTitulo", searchTitulo);
    
    return this.http.get(`${this.URL_TESE_DISSERTACAO}/${tipo}`, { params });
  }

  cadastrarTeseDissertacao(form: any) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.post(`${this.URL_TESE_DISSERTACAO}`, { formulario: form }, { headers });
  }

  atualizarTeseDissertacao(form: any) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.put(`${this.URL_TESE_DISSERTACAO}/${form._id}`, { formulario: form }, { headers });
  }

  getTeseDissertacao(form: any, page = null, limit= null) {
    let params = new HttpParams();
    
    if(page && limit) {
      params = params.set("page", page);
      params = params.set("limit", limit);
    }
    
    if (form.tipo) params = params.set('tipo', form.tipo)
    if (form.ano) params = params.set('ano', form.ano)
    if (form.autor) params = params.set('autor', form.autor)
    if (form.orientador) params = params.set('orientador', form.orientador)
    if (form.titulo) params = params.set('titulo', form.titulo)
    if (form.resumo) params = params.set('resumo', form.resumo)

    return this.http.get(`${this.URL_TESE_DISSERTACAO}/get-filter/filter`, { params: params });
  }

  deletarTeseDissertacao(id: any) {
    return this.http.delete(`${this.URL_TESE_DISSERTACAO}/${id}`);
  }
  /* Fim Tese DISSERTACAO */
  /* Processo Seletivo */

  // Recurso


  public registrarRespostaJustificativa(idInscricao, idProcesso, idStep, justificativa, recursoAceito) {
    const params = new HttpParams()
      .set('idInscricao', idInscricao)
      .set('idStep', idStep)
      .set('prefixoRecurso', 'respostaJustificativa')
      .set('idProcesso', idProcesso);

    return this.http.post(`${this.URL_PROCESSO_SELETIVO}/minha-inscricoes/justificar`, { justificativa, recursoAceito }, { params });

  }

  public registrarRespostaJustificativaHomolog(idInscricao, idProcesso, justificativa, recursoAceito) {
    const params = new HttpParams()
      .set('idInscricao', idInscricao)
      .set('prefixoRecurso', 'respostaJustificativa')
      .set('idProcesso', idProcesso);

    return this.http.post(`${this.URL_PROCESSO_SELETIVO}/minha-inscricoes/justificar-homolog`, { justificativa, recursoAceito }, { params });

  }
  // FIM Recurso

  changeHomologInscricao(value, idInscricaoSelecionada, idProcessoSelecionado, justificaIndeferido) {
    return this.http.put(`${this.URL_PROCESSO_SELETIVO}/parecer/homologacao`, { value, idInscricaoSelecionada, idProcessoSelecionado, justificaIndeferido });

  }

  getParecer(idInscricao, idProcesso) {
    let params = new HttpParams()
      .set("idInscricao", idInscricao)
      .set("idProcesso", idProcesso);

    return this.http.get(`${this.URL_PROCESSO_SELETIVO}/parecer`, { params });
  }

  registrarParecer(idInscricao, idProcesso, formulario, emailInscrito, isAnother, idPareceristaSelected) {
    let params = new HttpParams()
      .set("idInscricao", idInscricao)
      .set("idProcesso", idProcesso);
    return this.http.post(`${this.URL_PROCESSO_SELETIVO}/parecer`, { formulario, emailInscrito, isAnother, idPareceristaSelected }, { params });
  }

  registrarHomologacao(idInscricao, idProcesso, formulario, deferido, justificaIndeferido) {
    return this.http.put(`${this.URL_PROCESSO_SELETIVO}/homologacao`, { idInscricao, idProcesso, formulario, deferido, justificaIndeferido });
  }

  getHomologacao(idInscricao, idProcesso) {
    let params = new HttpParams()
      .set("idInscricao", idInscricao)
      .set("idProcesso", idProcesso);
    return this.http.get(`${this.URL_PROCESSO_SELETIVO}/homologacao`, { params });
  }

  cadastrarProcessoSeletivo(form: any) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.post(`${this.URL_PROCESSO_SELETIVO}`, { formulario: form }, { headers });
  }

  listProcessoSeletivo() {
    return this.http.get(this.URL_PROCESSO_SELETIVO);
  }

  mudarRecursoHabilitado(recursoHabilitado, idProcesso) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.put(`${this.URL_PROCESSO_SELETIVO}/mudar-recurso-habilitado`, { idProcesso, recursoHabilitado });
  }

  mudarEtapa(etapa, idProcesso) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.put(`${this.URL_PROCESSO_SELETIVO}/mudar-etapa`, { idProcesso, etapa });
  }

  mudarEtapaAvaliacao(etapa, idProcesso) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.put(`${this.URL_PROCESSO_SELETIVO}/mudar-etapa-avalicao`, { idProcesso, etapa });
  }

  deletarProcessoSeletivo(id: any) {
    return this.http.delete(`${this.URL_PROCESSO_SELETIVO}/${id}`);
  }

  atualizarProcessoSeletivo(form: any) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.put(`${this.URL_PROCESSO_SELETIVO}/${form._id}`, { formulario: form }, { headers });
  }

  listProcessoSeletivoInscritos(id, searchText = null, page = null, limit= null) {
    let params = new HttpParams();
    if (searchText && searchText.trim() != '') {
      params = params.set("searchText", searchText.trim());
    }
    if(page && limit) {
      params = params.set("page", page);
      params = params.set("limit", limit);
    }
    return this.http.get(`${this.URL_PROCESSO_SELETIVO}/inscritos/${id}`, {params});
  }

  atualizarProcessoAtivo(checked, id) {
    return this.http.post(`${this.URL_PROCESSO_SELETIVO}/ativo/${id}`, { isAtivo: checked });
  }

  getProcessosSeletivoTitle(onlyActive = true) {
    let params = new HttpParams().set("onlyActive", onlyActive);
    return this.http.get(`${this.URL_PROCESSO_SELETIVO}/headers`, {params});
  }

  getInscritosProcessoById(idProcesso, filtroConsulta = null, page = null, limit = null) {
    let params = new HttpParams()

    if (filtroConsulta && filtroConsulta != 'todos') {
      params = params.set("filtroConsulta", filtroConsulta);
    }
    if(page && limit) {
      params = params.set("page", page);
      params = params.set("limit", limit);
    }

    return this.http.get(`${this.URL_PROCESSO_SELETIVO}/inscritos/${idProcesso}`, { params });

  }

  vincularParecerista(idInscricao, pareceristas, idProcesso) {
    return this.http.put(`${this.URL_PROCESSO_SELETIVO}/inscritos/vincular-parecerista`, { idInscricao, pareceristas, idProcesso });
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
    return this.http.put(`${this.URL_PROCESSO_SELETIVO}/criterio/${idProcessoSeletivo}`, { criterio })
  }

  salvarVinculoCriterioHomologacao(criterioHomologacao, idProcessoSeletivo) {
    return this.http.put(`${this.URL_PROCESSO_SELETIVO}/criterio-homologacao/${idProcessoSeletivo}`, { criterioHomologacao })
  }

  consolidarAvaliacao(idProcesso, idInscricao, idStep, mediaStep, isApproveStep) {
    return this.http.put(`${this.URL_PROCESSO_SELETIVO}/${idProcesso}/inscricao/${idInscricao}/consolidar`, { idStep, mediaStep, isApproveStep })
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

  adicionarCoordenador(idUser, idLinhaPesquisa) {
    return this.http.post(`${this.URL_PARECERISTAS}/coordenador/${idUser}`, { idLinhaPesquisa });

  }

  removerCoordenador(idUser, idLinhaPesquisa) {
    let params = new HttpParams();
    params = params.set("idLinhaPesquisa", idLinhaPesquisa)

    return this.http.delete(`${this.URL_PARECERISTAS}/coordenador/${idUser}`, { params });

  }

  /* Fim Parecerista */

  /* Criterio de avaliacao */
  cadastrarCriterio(formulario) {
    return this.http.post(`${this.URL_CRITERIO}`, { formulario });
  }

  atualizarCriterio(formulario) {
    return this.http.put(`${this.URL_CRITERIO}/${formulario._id}`, { formulario });
  }

  getAllCriterios() {
    return this.http.get(`${this.URL_CRITERIO}`);

  }

  deleteById(idCriterio) {
    return this.http.delete(`${this.URL_CRITERIO}/${idCriterio}`);
  }
  /* Fim Criterio de avaliacao */

  /* Criterio de homologacao */
  cadastrarCriterioHomologacao(formulario) {
    return this.http.post(`${this.URL_CRITERIO_HOMOLOGACAO}`, { formulario });
  }

  atualizarCriterioHomologacao(formulario) {
    return this.http.put(`${this.URL_CRITERIO_HOMOLOGACAO}/${formulario._id}`, { formulario });
  }

  getAllCriteriosHomologacao() {
    return this.http.get(`${this.URL_CRITERIO_HOMOLOGACAO}`);

  }

  deleteCriterioHomologacaoById(idCriterio) {
    return this.http.delete(`${this.URL_CRITERIO_HOMOLOGACAO}/${idCriterio}`);
  }

  /* Fim Criterio de homologacao */

  /* Cotas de Ação Afirmativa */

  cadastrarCota(formulario) {
    return this.http.post(`${this.URL_COTA}`, { formulario });
  }

  atualizarCota(formulario) {
    return this.http.put(`${this.URL_COTA}/${formulario._id}`, { formulario });
  }

  atualizarQuestionCota(title) {
    return this.http.put(`${this.URL_COTA}/question`, { formulario: {title, isQuestion: true} });
  }

  getAllCotas() {
    return this.http.get(`${this.URL_COTA}`);

  }

  deleteCotaById(idCota) {
    return this.http.delete(`${this.URL_COTA}/${idCota}`);
  }

  /* Fim Cotas de Ação Afirmativa */

  /* Rank */
  gerarRank(idProcessoSeletivo, isFinalRank) {
    return this.http.post(`${this.URL_RANK}/${idProcessoSeletivo}`, { isFinalRank });
  }

  getAllRanks(idProcessoSeletivo) {
    return this.http.get(`${this.URL_RANK}/${idProcessoSeletivo}`);
  }

  atualizarStatusRankAtivo(checked, idProcessoSeletivo, idRank) {
    return this.http.post(`${this.URL_RANK}/status-rank/${idProcessoSeletivo}/${idRank}`, { checked });
  }

  deleteRankById(idProcessoSeletivo, idRank) {
    return this.http.delete(`${this.URL_RANK}/${idProcessoSeletivo}/${idRank}`);
  }
  /* Fim Rank */

  /* Gerenciar Usuários */

  pesquisarUsuarios(nameSearch, page = null, limit= null) {
    let params = new HttpParams();
    if (nameSearch && nameSearch.trim() != '') {
      params = params.set("nameSearch", nameSearch.trim());
    }
    if(page && limit) {
      params = params.set("page", page);
      params = params.set("limit", limit);
    }

    return this.http.get(`${this.URL_API_USER}/all/users`, { params });
  }

  adicionarOuRemoverAdmin(idUser, isAdicionarAdmin) {
    const params = new HttpParams()
      .set('isAdicionarAdmin', isAdicionarAdmin);
    return this.http.get(`${this.URL_API_USER}/adicionar-remover-admin/${idUser}`, { params });
  }

  /* FIM Gerenciar Usuários */

  /* Administrar home */

  cadastrarApesentacaoHome(form) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.post(`${this.URL_PAGE}/home_apresentacao`, { formulario: form }, { headers });
  }

  atualizarApesentacaoHome(form) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.put(`${this.URL_PAGE}/home_apresentacao/${form._id}`, { formulario: form }, { headers });
  }

  getInfoHomeApresentacao() {
    return this.http.get(`${this.URL_PAGE}/home_apresentacao`);
  }

  /* FIM Administrar home */

  /* Contatos */

  cadastrarContatos(form) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.post(`${this.URL_PAGE}/contatos`, { formulario: form }, { headers });

  }

  atualizarContatos(form) {
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf-8");
    return this.http.put(`${this.URL_PAGE}/contatos/${form._id}`, { formulario: form }, { headers });

  }

  getInfoContatos() {
    return this.http.get(`${this.URL_PAGE}/contatos`);
  }

  
  /* FIM Contatos */
}
