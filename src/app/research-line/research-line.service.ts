import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResearchLineService {
  constructor(
    http: HttpClient
  ) { }

  public getInfoResearchLine(regulationType: number): Observable<any> {
    console.log("chamou: ", this.getObjectResearchLineInfo(regulationType))
    return of(this.getObjectResearchLineInfo(regulationType));
  }

  private getObjectResearchLineInfo(regulationType: number) {
    switch (Number(regulationType)) {
      case 1:
        return {
          textTitle: "Currículo, Ensino e Diferença",
          urlImage: "",
          textBody: `
            <h4><strong>> Currículo, Ensino e Diferença</strong></h4>
            <br>
            <p>A linha de pesquisa 'Currículo, Ensino e Diferença' reúne estudos que exploram, em variadas perspectivas teóricas, a interface entre educação, currículo, poder, ensino e diferença. Tais investigações abordam: a história de currículos e disciplinas acadêmicas e escolares; os processos de produção e distribuição social dos conhecimentos nas diversas áreas disciplinares; as políticas de currículo; o ensino, os fazeres curriculares, o trabalho e os saberes docentes; os discursos e os processos de subjetivação; a corporificação; o gênero, a sexualidade, o afeto e a diferença; a educação antirracista; os feminismos negros e interseccionais.a linha conta com 13 docentes e é coordenada pela Professora Ana Maria Ferreira da Costa Monteiro.</p>
            <br><br>
            <ol>
              <li>Amilcar Araújo Pereira</li>
              <li>Antonio Flavio Barbosa Moreira</li>
              <li>Ana Maria Ferreira da Costa Monteiro (Coordenadora da linha)</li>
              <li>Ana Angelita Costa Neves da Rocha</li>
              <li>Antonio Flavio Barbosa Moreira</li>
              <li>António Manuel Seixas Sampaio da Nóvoa</li>
              <li>Carmen Teresa Gabriel Le Ravallec</li>
              <li>Giovana Xavier da Conceição Nascimento</li>
              <li>Marcia Serra Ferreira</li>
              <li>Maria Margarida Pereira de Lima Gomes</li>
              <li>Thiago Ranniery Moreira de Oliveira</li>
              <li>Victor Augusto Giraldo</li>
              <li>Nastassja Saramago de Araújo Pugliese</li>
            </ol>
          `
        };

      case 2:
        return {
          textTitle: "Formação docente, linguagens e subjetividade",
          urlImage: "",
          textBody: `
            <h4><strong>> Formação docente, linguagens e subjetividade</strong></h4>
            <br>
            <p>A linha de pesquisa Formação Docente, Linguagens e Subjetividade reúne estudos que exploram a linguagem a partir de diferentes modos de manifestação, expressão e produção, em seus aspectos formativos e de subjetivação, em âmbito educacional. Assim, por meio de abordagens envolvendo interfaces entre educação, pedagogia e didática, e também práticas diversas em artes visuais, teatro, dança, música, cinema e literatura, são desenvolvidas pesquisas ligadas à formação docente, ao desenvolvimento profissional, à leitura e escrita, ao lugar do corpo e do sensível no pensamento e práticas educacionais e, de modo mais abrangente, às relações entre linguagem, poder, ideologia e cultura em suas interfaces com a educação.Em 2021, a linha conta com 11 docentes e é coordenada pelo Professor Andre Bocchetti.</p>
            <br><br>
            <ol>
              <li>Adriana Mabel Fresquet</li>
              <li>António Manuel Seixas Sampaio da Nóvoa (Professor visitante)</li>
              <li>Graça Regina Reis</li>
              <li>Giseli Barreto da Cruz</li>
              <li>André Bocchetti (Coordenador da Linha)</li>
              <li>Marcos Antonio Carneiro da Silva</li>
              <li>Maria das Graças Chagas de Arruda Nascimento</li>
              <li>Monique Andries Nogueira</li>
              <li>Patricia Corsino</li>
              <li>Teresa Paula Nico Rego Gonçalves</li>
              <li>Daniela de Oliveira Guimarães</li>
            </ol>
          `
        };
      case 3:
        return {
          textTitle: "Políticas e Instituições Educacionais",
          urlImage: "",
          textBody: `
            <h4><strong>> Políticas e Instituições Educacionais</strong></h4>
            <br>
            <p>A linha de pesquisa Políticas e Instituições Educacionais reúne pesquisas sobre políticas públicas de educação e organização das instituições educacionais em diferentes contextos de formação. Em seu conjunto, prioriza os processos sócio-históricos de formulação e implementação de políticas educacionais, particularmente sobre os aspectos da associação entre desigualdade social e educacional, tais como hierarquização, estratificação, segregação, reprodução, exclusão e dominação, proporcionados pelos arranjos manifestos no âmbito das políticas educacionais. Em 2020, a linha conta com 9 docentes e é coordenada pela Professora Mariane Campelo Koslinski.</p>
            <br><br>
            <h4><strong>> Docentes vinculados à linha</strong></h4>
            <br>
            <ol>
              <li>Ana Pires do Prado</li>
              <li>Antonio Jorge Gonçalves Soares</li>
              <li>Daniela Patti do Amaral</li>
              <li>Luiz Antonio Constant Rodrigues da Cunha</li>
              <li>Marcio da Costa</li>
              <li>Mariane Campelo Koslinski (Coordenadora da Linha)</li>
              <li>Rodrigo Pereira da Rocha Rosistolato</li>
              <li>Rosana Rodrigues Heringer</li>
              <li>Tiago Lisboa Bartholo</li>
            </ol>
          `
        };
      case 4:
        return {
          textTitle: "História, Sujeitos & Processos Educacionais",
          urlImage: "",
          textBody: `
            <h4><strong>> História, Sujeitos & Processos Educacionais</strong></h4>
            <br>
            <p>A linha de pesquisa História, Sujeitos & Processos Educacionais tem como foco o estudo dos movimentos e processos educacionais mobilizados em tempos e espaços historicamente situados. Procede, também, à análise da intervenção de sujeitos e grupos articulados em torno a projetos educacionais específicos, às práticas culturais e às representações sociais que conformam a educação em suas dimensões material e simbólica. Iniciada em 2013, em 2021 a linha conta com 4 docentes e é coordenada pelo Professor Victor Andrade de Melo.</p>
            <br><br>
            <h4><strong>> Docentes vinculados à linha</strong></h4>
            <br>
            <ol>
              <li>José Claudio Sooma Silva</li>
              <li>Libânia Nacif Xavier    </li>
              <li>Victor Andrade de Melo (Coordenador da Linha)</li>
              <li>Diana Gonçalves Vidal</li>
            </ol>
          `
        };
      case 5:
        return {
          textTitle: "Inclusão, Ética & Interculturalidade",
          urlImage: "",
          textBody: `
            <h4><strong>> Inclusão, Ética & Interculturalidade</strong></h4>
            <br>
            <p>A linha de pesquisa Inclusão, Ética & Interculturalidade tem por foco central a compreensão da educação a partir de referenciais relativos à inclusão, ética, interculturalidade e criatividade, considerando suas contribuições sociopolíticas, psicológicas e culturais ao entendimento dos processos ensino-aprendizagem e da experiência educacional. Os estudos que ela compreende preocupam-se com a análise e produção de conhecimento em níveis micro, meso e macro, articulados a categorias como: poder; corporeidade; descolonização; diferenças; diversidade; igualdade/desigualdade; práticas pedagógicas, psicopedagógicas, sociais e discursivas; justiça social; cidadania; princípios éticos, estéticos e morais. Tais temáticas são investigadas nos processos educacionais desenvolvidos dentro e fora da escola, na família e nos espaços educativos não formais. Iniciada em 2014, em 2021 a linha conta com 6 docentes e é coordenada pela Professora Celeste Azulay Kelman.</p>
            <br><br>
            <h4><strong>> Docentes vinculados à linha</strong></h4>
            <br>
            <ol>
              <li>Ana Ivenicki</li>
              <li>Celeste Azulay Kelman</li>
              <li>Maria Judith Sucupira da Costa Lins</li>
              <li>Maria Vitória Campos Mamede Maia</li>
              <li>Mônica Pereira dos Santos (Coordenadora da linha)</li>
              <li>Sandra Cordeiro de Melo</li>
            </ol>
          `
        };
      case 6:
        return {
          textTitle: "Estado, Trabalho-Educação e Movimentos Sociais",
          urlImage: "",
          textBody: `
            <h4><strong>> Estado, Trabalho-Educação e Movimentos Sociais.</strong></h4>
            <br>
            <p>A linha de pesquisa Estado, Trabalho-Educação e Movimentos Sociais reúne estudos no campo trabalho-educação, tendo em vista a análise das condições históricas, políticas, sociais, ideológicas, econômicas e culturais do processo educativo, considerando sua dimensão escolar. Coloca em relevo a teoria social crítica, a teoria do conhecimento e a teoria política, em diferentes abordagens, para apreender as políticas públicas de educação e socioambientais, os processos de produção e difusão do conhecimento escolar e o protagonismo dos diversos movimentos sociais nesta dinâmica. As pesquisas envolvem questões relativas à formação humana na perspectiva do trabalho e às práticas sociais, educacionais e escolares conexas. Em 2021 a linha conta com 7 docentes e é coordenada pelo Professor Carlos Frederico Bernardo Loureiro.</p>
            <br><br>
            <h4><strong>> Docentes vinculados à linha</strong></h4>
            <br>
            <ol>
              <li>Bruno Gawryszewski</li>
              <li>Carlos Frederico Bernardo Loureiro (Coordenador de linha)</li>
              <li>José Jairo Vieira</li>
              <li>Marcelo Paula de Melo</li>
              <li>Roberto Leher</li>
              <li>Fábio Araujo de Souza</li>
              <li>Vânia Cardoso da Motta</li>
            </ol>
          `
        };
      default:
        console.log(typeof regulationType);
        break;
    }
  }
}