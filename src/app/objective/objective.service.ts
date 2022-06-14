import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ObjectiveService {

  constructor(
    private http: HttpClient
  ) { }

  public getInfoObjective(): Observable<any> {
    return of({
      textTitle: "Objetivo",
      urlImage: "",
      textBody: `
      <p>
        O Programa de Pós-Graduação em Educação da Faculdade de Educação da Universidade Federal do Rio de Janeiro (PPGE) tem como objetivo principal contribuir para a produção de conhecimento no campo educacional, formando mestres e doutores para atuarem em atividades de pesquisa e docência. Participa do desenvolvimento da investigação científica nesse campo trabalhando com a associação entre o desenvolvimento do pensamento teórico e as questões suscitadas no cotidiano escolar, com vistas no aperfeiçoamento democrático das instituições, das políticas e das práticas educacionais.
        <br><br>
        O PPGE em 2016 orientou sua investigação em torno de quatro grandes vertentes expressas na organização em quatro linhas de pesquisa, cada qual com seus objetivos específicos, a saber:
        <br><br>
        A linha de pesquisa “Currículo, Docência e Linguagem” reúne estudos que exploram, em variadas perspectivas teóricas, a interface entre educação, cultura, ideologia, poder e linguagem. Tais investigações abordam: a história de currículos e disciplinas acadêmicas e escolares; os processos de produção e distribuição social dos conhecimentos nas diversas áreas disciplinares; as políticas de currículo; a formação discente e docente em contextos distintos; a identidade de professores nos processos formativos; didática, fazeres curriculares, trabalho e saberes docentes; a linguagem nas suas diferentes manifestações e expressões, o que inclui as artes visuais, cinema, música, dança, teatro e literatura; concepções e práticas de alfabetização, leitura e escrita.
        <br><br>
        Em 2016, a linha foi coordenada pela Maria Margarida Pereira de Lima Gomes e contava com 15 docentes, a saber: 1. Adriana Mabel Fresquet; 2. Amilcar Araújo Pereira; 3. Ana Maria Ferreira da Costa Monteiro; 4. Anita Handfas ( colaboradora); 5.Carmen Teresa Gabriel Le Ravallec; 6. Giseli Barreto da Cruz; 7. Ludmila Thomé de Andrade; 8. Marcia Serra Ferreira; 9. Marcos Antônio Carneiro da Silva; 10. Maria Margarida Pereira de Lima Gomes; 11.Monique Andries Nogueira; 12. Paolo Vittoria ; 13. Patrícia Corsino; 14. Teresa Paula Nico Rego Gonçalves; 15. Antônio Flávio Barbosa Moreira (Prof Emérito colaborador)
        <br><br>
        A linha “Politicas e Instituições Educacionais” reúne pesquisas sobre políticas públicas de educação e organização das instituições educacionais em diferentes contextos de formação. Em seu conjunto, prioriza os processos sócio-históricos de formulação e implementação de políticas educacionais, particularmente sobre os aspectos da associação entre desigualdade social e educacional, tais como hierarquização, estratificação, segregação, reprodução, exclusão e dominação, proporcionados pelos arranjos manifestos no âmbito das políticas educacionais.
        <br><br>
        Em 2016, a linha foi coordenada pela Professora Mariane Campelo Koslinski e contava com os seguintes docentes: 1. Ana Maria Villela Cavaliere; 2. Antônio Jorge Gonçalves Soares; 3. Carlos Frederico Bernardo Loureiro; 4. Daniela Patti do Amaral; 5. José Jairo Vieira; 6. Luiz Antônio Constant Rodrigues da Cunha; 7. Marcio da Costa; 8. Mariane Campelo Koslinski; 9.Roberto Leher; 10. Rodrigo Rosistolato; 11. Rosana Rodrigues Heringer; 12. Vânia Cardoso da Motta.
        <br><br>
        A linha de pesquisa “História, Sujeitos e Processos Educacionais” tem como foco o estudo dos movimentos e processos educacionais mobilizados em tempos e espaços historicamente situados. Procede, também, à análise da intervenção de sujeitos e grupos articulados em torno a projetos educacionais específicos, às práticas culturais e às representações sociais que conformam a educação em suas dimensões material e simbólica.
        <br><br>
        Em 2016, a linha foi coordenada pela Professora Irma Rizzini e contava com os seguintes docentes: 1. Irma Rizzini; 2. José Claudio Sooma Silva; 3. Libânia Nacif Xavier; 4. Miriam Waidenfeld Chaves; 5. Sonia Maria de Castro Nogueira Lopes; 6. Victor Andrade de Melo.
        <br><br>
        A linha de pesquisa “Inclusão, Ética e Interculturalidade” tem por foco central a compreensão da educação a partir de referenciais relativos à inclusão, ética, interculturalidade e criatividade, considerando suas contribuições sociopolíticas, psicológicas e culturais ao entendimento dos processos ensino-aprendizagem e da experiência educacional. Os estudos que ela compreende preocupam-se com a análise e produção de conhecimento em níveis micro, meso e macro, articulados a categorias como: poder; corporeidade; descolonização; diferenças; diversidade; igualdade/desigualdade; práticas pedagógicas, psicopedagógicas, sociais e discursivas; justiça social; cidadania; princípios éticos, estéticos e morais. Tais temáticas são investigadas nos processos educacionais desenvolvidos dentro e fora da escola, na família e nos espaços educativos não formais.
        <br><br>
        Em 2016, a linha foi coordenada pela Professora Mônica Pereira dos Santos e contava com os seguintes docentes: 1.Ana Ivenicki (ex-Canen); 2. Celeste Azulay Kelman; 3. Maria Judith Sucupira da Costa Lins; 4. Maria Vitória Mamede Maia; 5. Mônica Pereira dos Santos; 6. Renato José de Oliveira.
      </p>
      `
    });
  }

}