import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(
    http: HttpClient
  ) { }

  public getInfoCourses(coursesType: number): Observable<any> {

    return of(this.getInfoCoursesByType(coursesType));
  }

  private getInfoCoursesByType(coursesType: number) {
    switch (Number(coursesType)) {
      case 1:
        return {
          textTitle: "Mestrado",
          urlImage: "",
          textBody: `
          <h3>Bloco A: Disciplinas/Atividades Obrigatórias (225 horas)</h3>
          <ul>
            <li><a href=""><strong>Educação Brasileira</strong></a> (45h)</li>
            <li><a href=""><strong>Pesquisa Educacional</strong></a> (45h)</li>
            <li><a href=""><strong>Prática de Pesquisa I</strong></a> (45h)</li>
            <li><a href=""><strong>Prática de Pesquisa II</strong></a> (45h)</li>
            <li><a href=""><strong>Seminário de Dissertação</strong></a> (45h)</li>
            <li><a href=""><strong>Pesquisa de Dissertação</strong></a> (não conta crédito)</li>
          </ul>

          <h3>Bloco B: Disciplinas de Livre Escolha</h3>

          <ul>
            <li><a href=""><strong>Ações afirmativas no ensino superior brasileiro- história e atualidades</strong></a></li>
            <li><a href=""><strong>Análise das poíticas educacionais</strong></a></li>
            <li><a href=""><strong>Antirracismo e Educação na América Latina e na Europa</strong></a></li>
            <li><a href=""><strong>Avaliação de programas</strong></a></li>
            <li><a href=""><strong>Avaliação Multicultural</strong></a></li>
            <li><a href=""><strong>Cinema e educação</strong></a></li>
            <li><a href=""><strong>Construção da Personalidade Moral na prática escolar</strong></a></li>
            <li><a href=""><strong>Criatividade e educação</strong></a></li>
            <li><a href=""><strong>Criatividade, educação e processo inclusivo - linguagens diferenciadas habitando a escola</strong></a></li>
            <li><a href=""><strong>Culturas, Políticas e Práticas de Inclusão em Educação</strong></a></li>
            <li><a href=""><strong>Currículo e Culturas</strong></a></li>
            <li><a href=""><strong>Currículo e Linguagem</strong></a></li>
            <li><a href=""><strong>Didática e trabalho docente</strong></a></li>
            <li><a href=""><strong>Diversidade e Desigualdade...</strong></a></li>
            <li><a href=""><strong>Educação Ambiental</strong></a></li>
            <li><a href=""><strong>Educação do corpo</strong></a></li>
            <li><a href=""><strong>Educação e Inclusão de alunos com deficiências,TGD e AH-SD</strong></a></li>
            <li><a href=""><strong>Educação e olhar da psicopedagogia</strong></a></li>
            <li><a href=""><strong>Educação e Relação raciais</strong></a></li>
            <li><a href=""><strong>Estágio supervisionado</strong></a></li>
            <li><a href=""><strong>Estatística Aplicada a Educação</strong></a></li>
            <li><a href=""><strong>Estruturas sociocognitivas e Ética</strong></a></li>
            <li><a href=""><strong>Estudos de Bakhtin</strong></a></li>
            <li><a href=""><strong>Estudos Etnográficos em Educação</strong></a></li>
            <li><a href=""><strong>Estudos Individuais I</strong></a></li>
            <li><a href=""><strong>Estudos Individuais II</strong></a></li>
            <li><a href=""><strong>Estudos longitudinais e de eficácia escolar</strong></a></li>
            <li><a href=""><strong>Estudos Teóricos em História da Educação</strong></a></li>
            <li><a href=""><strong>Estudos Teóricos em História da Educação II</strong></a></li>
            <li><a href=""><strong>Estudos teóricos em história da educação: a escrita, a educação e o moderno</strong></a></li>
            <li><a href=""><strong>Filosofia da educação</strong></a></li>
            <li><a href=""><strong>Formação de professores</strong></a></li>
            <li><a href=""><strong>Gestão e organizações escolares</strong></a></li>
            <li><a href=""><strong>Gramsci e educação</strong></a></li>
            <li><a href=""><strong>História do currículo e das disciplinas</strong></a></li>
            <li><a href=""><strong>História e Historiografia Educacional</strong></a></li>
            <li><a href=""><strong>Infância e Linguagem</strong></a></li>
            <li><a href=""><strong>Leituras de Norbet Elias</strong></a></li>
            <li><a href=""><strong>Letramento e escola</strong></a></li>
            <li><a href=""><strong>Motivos visuais dos cinemas do sul</strong></a></li>
            <li><a href=""><strong>Movimentos Sociais e Educação Popular</strong></a></li>
            <li><a href=""><strong>Multiculturalismo na Educação</strong></a></li>
            <li><a href=""><strong>Oficina de pesquisa histórica</strong></a></li>
            <li><a href=""><strong>Pedagogias da Montagem</strong></a></li>
            <li><a href=""><strong>Pensamento e Linguagem</strong></a></li>
            <li><a href=""><strong>Pensamento pós-moderno e currículo</strong></a></li>
            <li><a href=""><strong>Pesquisa Histórica e história das práticas corporais</strong></a></li>
            <li><a href=""><strong>Políticas Públicas da Educação</strong></a></li>
            <li><a href=""><strong>Psicologia da Educação</strong></a></li>
            <li><a href=""><strong>Questões Éticas da Educação</strong></a></li>
            <li><a href=""><strong>Retórica e Argumentação em Educação</strong></a></li>
            <li><a href=""><strong>Seminário Anísio Teixeira</strong></a></li>
            <li><a href=""><strong>Socialização política e ideológica</strong></a></li>
            <li><a href=""><strong>Sociologia da Educação</strong></a></li>
            <li><a href=""><strong>Sociologia das organizações escolares</strong></a></li>
            <li><a href=""><strong>Sociologia dos Sistemas Educacionais</strong></a></li>
            <li><a href=""><strong>Sujeito e Poder</strong></a></li>
            <li><a href=""><strong>Sujeitos e Processos Educacionais na Modernidade</strong></a></li>
            <li><a href=""><strong>Teorias da Aprendizagem na Educação</strong></a></li>
            <li><a href=""><strong>Teorias da Linguagem</strong></a></li>
            <li><a href=""><strong>Teorias de Currículo</strong></a></li>
            <li><a href=""><strong>Tópicos Especiais</strong></a></li>
            <li><a href=""><strong>Trabalho, educação e movimentos sociais</strong></a></li>
          </ul>
          `
        };

      case 2:
        return {
          textTitle: "",
          urlImage: "",
          textBody: ""
        };
      default:
        return {
          textTitle: "",
          urlImage: "",
          textBody: ""
        };
    }
  }
}