import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HistoricService {

  constructor(
    private http: HttpClient
  ) { }

  public getInfoHistoric(): Observable<any> {
    return of({
      textTitle: "Histórico",
      urlImage: "",
      textBody: `<p>
      O Programa de Pós-Graduação em Educação da Universidade Federal do Rio de Janeiro teve início em 1972, com a criação do Mestrado, e se ampliou em 1980, com a criação do Doutorado. O pioneirismo desse Programa, um dos primeiros surgidos no país, o coloca como um dos principais formadores de mestres e, posteriormente, de doutores na área educacional, qualificando e titulando uma quantidade expressiva de pesquisadores que, ao longo desses quase 45 anos, vieram constituindo o corpo docente de inúmeras universidades brasileiras.
      <br>
      <br>
      Até dezembro de 2016, foram defendidas 1.151 dissertações de mestrado e 283 teses de doutorado. De 2006 em diante, esses trabalhos estão disponíveis também em formato PDF, para download, no sítio eletrônico da Faculdade de Educação da UFRJ.
      <br>
      <br>
      A longevidade dessa trajetória faz do Programa de Pós-Graduação em Educação da Universidade Federal do Rio de Janeiro um testemunho dos caminhos percorridos pela pesquisa educacional no país. Se, por um lado, essa característica permitiu o acúmulo de uma rica e consistente experiência na produção de conhecimento, por outro lado, implicou em variadas e necessárias reformulações de sua estrutura, em meio às transformações ocorridas no cenário de ampliação das Universidades Públicas Federais e da Pós-Graduação no Brasil. Todas essas mudanças envolveram permanências e rupturas nos aspectos organizacionais e curriculares do Programa, bem como nas formas de se compreender e fazer a pesquisa acadêmica, deixando transparecer momentos de recomeço sob as marcas das tradições e também momentos de ampliações e inovações. Assim, no processo de aprimoramento do programa, houve uma virada qualitativa expressa na mudança da nota 3 (três) para 5 (cinco) na avaliação trienal da CAPES- 2007-2009. Nota que se manteve na avaliação do último triênio (2009-2012) quando o PPGE obteve conceito muito bom em todos os quesitos. Registramos neste histórico que, devido a inconsistência dos argumentos do relatório enviado pela CAPES que não sustentavam a manutenção da nota 5 (cinco) no triênio, solicitamos recurso. Entretanto, em que pese o reconhecimento da área sobre o aumento da nota do PPGE, o CTC da CAPES manteve a conceito 5.
      <br>
      <br>
      O momento atual, de fechamento do quadriênio 2013-2016, cabe apresentar as conquistas que teceram mais um capitulo da história recente e traçar novas metas para o quadriênio que se inicia em 2017.
      <br>
      <br>
      Trazemos a seguir, alguns pontos que se destacaram neste último quadriênio, são sínteses do que será detalhado ao longo deste relatório:
      <br>
      <br>
      (i) Ampliação gradativa do corpo docente- Ao final do triênio passado, o PPGE contava com 28 professores, está fechando o quadriênio com 41 e iniciando 2017 com mais 4 credenciados. Este aumento tem mantido o percentual de cerca de 30% dos professores efetivos da Faculdade de Educação. A política sistemática de credenciamento e autoavalição tem favorecido uma ampliação sustentada em regras e critérios claros para o ingresso e permanência dos docentes no PPGE. Isso fez com que os professores da Faculdade de Educação investissem em produções qualificadas e se inserissem em linhas de pesquisa de forma articulada às suas propostas de ensino e pesquisa. O acompanhamento da produção docente e discente pela coordenação e pelos coordenadores de linha também exerceu um papel importante nos processos auto avaliativos dos professores credenciados. Assim, a ampliação quantitativa de docentes do PPGE significou também um crescimento qualitativo do Programa.
      <br>
      <br>
      (ii) Reconfiguração das linhas de pesquisa em função do crescimento quantitativo e qualitativo do corpo docente da Faculdade de Educação da UFRJ- A ampliação gradativa e bem estruturada das linhas foi uma forma de atualizar a articulação entre os grupos de pesquisa e ampliar com consistência o escopo do programa. O PPGE manteve a coerência interna de cada linha que foi sendo criada, o que se expressa na visível articulação entre projetos de pesquisa, a produção docente/discente e as orientações. As linhas foram se reconfigurando de forma orgânica e coerente, o que permitiu delinear cada vez melhor suas especificidades temáticas e teórico-conceituais. Com esta ampliação está em curso uma reforma curricular.
      <br>
      <br>
      O PPGE até 2012 orientou sua investigação em torno de duas linhas de pesquisa: Currículo e Linguagem e Políticas e Instituições Educacionais. O amadurecimento das discussões acerca da reconfiguração das linhas de pesquisa, as condições objetivas exigidas para a implementação de uma nova linha e as demandas de formação em pós-graduação no Estado do Rio de Janeiro possibilitaram a criação em 2013 de uma terceira linha intitulada “História, Sujeitos e Processos Educacionais”, em 2014 de uma quarta linha, “Inclusão, ética e interculturalidade” e , em 2017, abrindo o novo quadriênio, uma quinta linha “Estado, Trabalho-Educação e movimentos sociais”. A linha Currículo e Linguagem, com a nova configuração, passou a ser denominada Currículo, Docência e Linguagem.
      <br>
      <br>
      (iv) Reformulação curricular e reformulação do Regulamento do PPGE- Em função das ampliações realizadas nas linhas, está em curso no PPGE uma reformulação curricular, o que implica também numa reformulação do Regulamento. Como será observado no item currículo desta Plataforma, cada linha oferece disciplinas referentes aos seus objetivos e interesses de pesquisa e também disciplinas obrigatórias consideradas básicas e integradoras do PPGE. Todo processo de reformulação curricular tem sido debatido no colegiado do PPGE e em um grupo de trabalho composto pelos coordenadores de linha e representantes da comissão deliberativa, o que inclui representação discente, entendida no processo como fundamental para propor as mudanças e inovações necessárias. Além da alteração de disciplinas e suas ementas, estão sendo pensadas também inovações curriculares, além das que já estão em curso. É nosso objetivo concluir todo processo em 2017.
      <br>
      <br>
      (iii) Melhoria na gestão da produção coletiva do corpo docente e discente em relação ao veículo onde esta produção é socializada- Ao final deste quadriênio, mais de 70% da produção docente estão concentradas em periódicos dos estratos qualis A1 até B2. Também foi expressivo o número de publicações em livros avaliados por agências de fomento que são resultados de pesquisa, publicações em língua estrangeira e produção discente. A visibilidade destas produções é evidente tanto pela participação dos professores como membros externos de bancas, conferencistas, pareceristas ad hoc etc quanto pelo expressivo número de postulantes ao mestrado e doutorado, oriundos de diferentes municípios e estados brasileiros, que a cada ano procura o PPGE, buscando os projetos específicos dos professores.
      <br>
      <br>
      (iv) Melhoria do fluxo de estudantes e da qualidade das produções- A participação semanal no grupo de pesquisa do orientador (são 2 semestres obrigatórios de Prática de Pesquisa para o mestrando e 3 semestres para o doutorando) tem favorecido não apenas o acompanhamento e a melhoria do fluxo discente com defesas de teses e dissertações no prazo, como também tem repercutido na qualidade dos trabalhos defendidos. A proximidade com o grupo de pesquisa integra os projetos individuais, dando identidade e densidade às produções. Isso favorece o acompanhamento mais de perto das pesquisas em andamento. Assim é que no quadriênio a média de meses para conclusão de mestrado foi de 26 e do doutorado 48,5 meses. Em ambos os cursos o PPGE conseguiu diminuir o tempo de titulação cumprindo uma de suas metas.
      <br>
      <br>
      (v) intercâmbios nacionais - O quadriênio evidencia também a ampliação de parcerias, intercâmbios e trocas acadêmicas. Expressos em projetos, seminários, congressos, visitas técnicas, pós-doutorado (tanto dos professores fazendo seus estágios quanto supervisionando), disciplinas partilhadas entre programas, intenso fluxo de alunos externos ao PPGE, entre outros. Houve uma significativa ampliação da nucleação de grupos de pesquisa com atividades de pesquisas em diferentes Universidade do Brasil e também estrangeiras. Em 2016, estão em andamento no PPGE 17 projetos interinstitucionais. O DINTER com a UFPI- Campus Floriano terá sua última tese defendida em março de 2017 (dos 12 doutorandos apenas 1 desistiu). No final de 2016 foi aprovado um novo DINTER agora com a Universidade Estadual da Bahia – UEBA -Campus Caetité, evidenciando a solidariedade necessária entre programas e docentes.
      <br>
      <br>
      (v) intercâmbios internacionais- O final do quadriênio também foi marcado pela consolidação de algumas importantes parcerias internacionais. Entre elas, destacamos: a) desenvolvimento de pesquisas em rede com 4 projetos em andamento: “Projeto Linha de Base Brasil: Um Estudo Longitudinal Sobre a Trajetória de Aprendizagem de Crianças”, “Projeto observatório internacional de inclusão, interculturalidade e inovação pedagógica”, “Projeto Formação da Rede em Educação Infantil: avaliação de contexto”, “Ingresso e permanência de estudantes pretos e pardos no ensino superior: avanços e desafios em perspectiva comparada Brasil-EUA”; b) aumento de professores visitantes e missões internacionais- Recebemos no PPGE neste quadriênio vários professores estrangeiros que participaram de seminários e reuniões de pesquisa e também foi notório o aumento de participação de professores do PPGE em seminários internacionais. Destacamos, porém, algumas missões de maior profundidade: Professor António Nóvoa -como professor visitante em 2016 e que dará continuidade a um projeto amplo de formação de professores na UFRJ com sua vinda por um ano, em 2017, como Pesquisador Visitante Sênior; Prof Christophe Niewiadomski da Université de Lille 3 – supervisor de pós-doutorado de Carmen Teresa Gabriel que ministrou Ciclo de palestras na FE , Professores Peter Tymms e Christine Merrell -Durham University – ampliação e consolidação do intercambio da pesquisa “Linha de base”; missão técnica da Professora Rosana Heringer a New York University e Wayne State University no âmbito do programa intercâmbio acadêmico Abdias Nascimento; c) aumento de publicações em língua estrangeira e/ou em parcerias com professores estrangeiros; d) aumento do trânsito de alunos em doutorados sanduiche que tem resultado também numa maior proximidade entre o PPGE e programas de Pós-Graduação de diferentes países como Cuba, Portugal, França, Espanha, USA, Inglaterra, Itália e México.
      <br>
      <br>
      (vi) Melhoria do sistema de informações e divulgação da produção do PPGE- O site do PPGE passou por uma reformulação e atualização, tendo suas informações também traduzidas para o inglês. Vários laboratórios e grupos de pesquisa investiram em páginas e sites, dando maior visibilidades às ações e produções dos seus integrantes.
      <br>
      <br>
      (vii) Continuidade na formação de mestres e doutores para atuarem em atividades de pesquisa e docência - No quadriênio 2013-2016 o PPGE titulou 78 doutores e 173 mestres, uma média de 18 doutores e 43 mestres por ano. No triênio anterior (2010-2012) havia titulado 25 doutores e 69 mestres, uma média de 8 doutores e 23 mestres por ano. Este crescimento se deu não apenas pelo aumento do corpo docente (28 professores para 39), mas pelo próprio ritmo das pesquisas, articulações dos grupos e demandas do campo educacional. O perfil dos egressos evidencia que dos doutores egressos, 62% dos vínculos empregatícios estão no ensino superior e o restante na Educação básica e outros; já o vinculo dos mestres 70% estão na Educação Básica e o restante no Ensino Superior e outros. Também é expressiva a formação de professores, técnicos e gestores que atuam nas redes públicas de ensino, cerca de 70% dos doutores e mestres egressos. Portanto, o PPGE tem se configurado como um programa acadêmico com vocação para pesquisa educacional, com análise e avaliação de políticas, mas de forte articulação com a formação docente do Ensino Superior e da Educação Básica, especialmente, das redes públicas de ensino.
      <br>
      <br>
      Em 2016, o PPGE contou com 39 professores permanentes e dois professores colaboradores, distribuídos da seguinte forma: 15 professores permanentes e 2 colaboradores na linha Currículo, Docência e Linguagem - sendo que 2 destes só orientam mestrado-; 12. professores na linha “Políticas e Instituições Educacionais”, sendo que 3 só orientam mestrado; 6 professores na linha “História, sujeitos e processos educacionais”, sendo que 1 só orienta mestrado, 6 professores da linha “Inclusão, Ética e interculturalidade”, sendo que 1 só orienta mestrado.
      <br>
      <br>
      Em 2016 este grupo participou e/ou coordenou 94 projetos ( 64 pesquisa, 15 interinstitucionais, 15 de extensão) e teve, junto com discentes e colaboradores, 312 produções intelectuais ( 95 artigos em periódicos, 94 livros/capítulos de livros, 107 trabalhos publicados em anais de congresso, 9 artigos em jornal e revistas e 7 outras produções).
      <br>
      <br>
      <strong>Objetivos:</strong>
      <br>
      <br>
      O Programa de Pós-Graduação em Educação da Faculdade de Educação da Universidade Federal do Rio de Janeiro (PPGE) tem como objetivo principal contribuir para a produção de conhecimento no campo educacional, formando mestres e doutores para atuarem em atividades de pesquisa e docência. Participa do desenvolvimento da investigação científica nesse campo trabalhando com a associação entre o desenvolvimento do pensamento teórico e as questões suscitadas no cotidiano escolar, com vistas no aperfeiçoamento democrático das instituições, das políticas e das práticas educacionais.
      <br>
      <br>
      O PPGE em 2016 orientou sua investigação em torno de quatro grandes vertentes expressas na organização em quatro linhas de pesquisa, cada qual com seus objetivos específicos, a saber:
      <br>
      <br>
      A linha de pesquisa “Currículo, Docência e Linguagem” reúne estudos que exploram, em variadas perspectivas teóricas, a interface entre educação, cultura, ideologia, poder e linguagem. Tais investigações abordam: a história de currículos e disciplinas acadêmicas e escolares; os processos de produção e distribuição social dos conhecimentos nas diversas áreas disciplinares; as políticas de currículo; a formação discente e docente em contextos distintos; a identidade de professores nos processos formativos; didática, fazeres curriculares, trabalho e saberes docentes; a linguagem nas suas diferentes manifestações e expressões, o que inclui as artes visuais, cinema, música, dança, teatro e literatura; concepções e práticas de alfabetização, leitura e escrita.
      <br>
      <br>
      Em 2016, a linha foi coordenada pela Maria Margarida Pereira de Lima Gomes e contava com 15 docentes, a saber: 1. Adriana Mabel Fresquet; 2. Amilcar Araújo Pereira; 3. Ana Maria Ferreira da Costa Monteiro; 4. Anita Handfas ( colaboradora); 5.Carmen Teresa Gabriel Le Ravallec; 6. Giseli Barreto da Cruz; 7. Ludmila Thomé de Andrade; 8. Marcia Serra Ferreira; 9. Marcos Antônio Carneiro da Silva; 10. Maria Margarida Pereira de Lima Gomes; 11.Monique Andries Nogueira; 12. Paolo Vittoria ; 13. Patrícia Corsino; 14. Teresa Paula Nico Rego Gonçalves; 15. Antônio Flávio Barbosa Moreira (Prof Emérito colaborador)
      <br>
      <br>
      A linha “Politicas e Instituições Educacionais” reúne pesquisas sobre políticas públicas de educação e organização das instituições educacionais em diferentes contextos de formação. Em seu conjunto, prioriza os processos sócio-históricos de formulação e implementação de políticas educacionais, particularmente sobre os aspectos da associação entre desigualdade social e educacional, tais como hierarquização, estratificação, segregação, reprodução, exclusão e dominação, proporcionados pelos arranjos manifestos no âmbito das políticas educacionais.
      <br>
      <br>
      Em 2016, a linha foi coordenada pela Professora Mariane Campelo Koslinski e contava com os seguintes docentes: 1. Ana Maria Villela Cavaliere; 2. Antônio Jorge Gonçalves Soares; 3. Carlos Frederico Bernardo Loureiro; 4. Daniela Patti do Amaral; 5. José Jairo Vieira; 6. Luiz Antônio Constant Rodrigues da Cunha; 7. Marcio da Costa; 8. Mariane Campelo Koslinski; 9.Roberto Leher; 10. Rodrigo Rosistolato; 11. Rosana Rodrigues Heringer; 12. Vânia Cardoso da Motta.
      <br>
      <br>
      A linha de pesquisa “História, Sujeitos e Processos Educacionais” tem como foco o estudo dos movimentos e processos educacionais mobilizados em tempos e espaços historicamente situados. Procede, também, à análise da intervenção de sujeitos e grupos articulados em torno a projetos educacionais específicos, às práticas culturais e às representações sociais que conformam a educação em suas dimensões material e simbólica.
      <br>
      <br>
      Em 2016, a linha foi coordenada pela Professora Irma Rizzini e contava com os seguintes docentes: 1. Irma Rizzini; 2. José Claudio Sooma Silva; 3. Libânia Nacif Xavier; 4. Miriam Waidenfeld Chaves; 5. Sonia Maria de Castro Nogueira Lopes; 6. Victor Andrade de Melo.
      <br>
      <br>
      A linha de pesquisa “Inclusão, Ética e Interculturalidade” tem por foco central a compreensão da educação a partir de referenciais relativos à inclusão, ética, interculturalidade e criatividade, considerando suas contribuições sociopolíticas, psicológicas e culturais ao entendimento dos processos ensino-aprendizagem e da experiência educacional. Os estudos que ela compreende preocupam-se com a análise e produção de conhecimento em níveis micro, meso e macro, articulados a categorias como: poder; corporeidade; descolonização; diferenças; diversidade; igualdade/desigualdade; práticas pedagógicas, psicopedagógicas, sociais e discursivas; justiça social; cidadania; princípios éticos, estéticos e morais. Tais temáticas são investigadas nos processos educacionais desenvolvidos dentro e fora da escola, na família e nos espaços educativos não formais.
      <br>
      <br>
      Em 2016, a linha foi coordenada pela Professora Mônica Pereira dos Santos e contava com os seguintes docentes: 1.Ana Ivenicki (ex-Canen); 2. Celeste Azulay Kelman; 3. Maria Judith Sucupira da Costa Lins; 4. Maria Vitória Mamede Maia; 5. Mônica Pereira dos Santos; 6. Renato José de Oliveira.
      </p>
    `
    });
  }
}