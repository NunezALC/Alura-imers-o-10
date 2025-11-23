Heavy Metalpedia - Uma Base de Conhecimento

Esta é uma aplicação web interativa que funciona como uma enciclopédia para álbuns clássicos e influentes do Heavy Metal. O objetivo é oferecer uma plataforma onde fãs e curiosos possam navegar, pesquisar e descobrir informações sobre os discos icônicos que moldaram o gênero, desde seus primórdios até os subgêneros mais importantes.

A interface foi projetada para ser intuitiva e agradável, permitindo que o usuário explore o conteúdo de forma fluida. As principais funcionalidades incluem:

Navegação por Cards: Os álbuns são apresentados em cards visuais, facilitando a navegação.
Busca Dinâmica: É possível filtrar os álbuns em tempo real por nome da banda, título do álbum ou ano de lançamento.
Detalhes em Modal: Ao clicar em um álbum, uma janela modal exibe informações detalhadas, como a lista de faixas (tracklist), um resumo sobre o disco e links externos para ouvir no Spotify ou ler mais na Wikipedia.
Tema Claro/Escuro: O usuário pode alternar entre um tema claro e um escuro para maior conforto visual, e a preferência é salva para visitas futuras.
Design Responsivo: A aplicação se adapta a diferentes tamanhos de tela, garantindo uma boa experiência tanto em computadores quanto em dispositivos móveis.

🛠️ Tecnologias Utilizadas
HTML5: Foi utilizado para a estruturação semântica do conteúdo da página. Elementos como <header>, <main>, <footer>, <section> e <article> foram usados para organizar o layout de forma clara e acessível, definindo o esqueleto da aplicação, desde o cabeçalho até os cards individuais de cada álbum.

CSS3: Responsável por toda a apresentação visual e pela responsividade da interface. Foi aplicado para:

Criar o layout com Flexbox e Grid, garantindo que a página se adapte a diferentes tamanhos de tela (desktop, tablet e mobile).
Implementar os temas claro e escuro através de variáveis CSS (:root), permitindo uma troca de paleta de cores rápida e eficiente.
Desenvolver animações, como o efeito de "fogo" no título e o surgimento suave dos cards (@keyframes), tornando a experiência mais dinâmica.
Estilizar todos os componentes, incluindo os cards, o modal e os controles de busca e tema.
JavaScript (ES6+): É o cérebro da aplicação, responsável por toda a interatividade e lógica. Suas principais funções no projeto foram:

Carregamento de Dados: Utilizar a Fetch API com async/await para carregar as informações dos álbuns de forma assíncrona a partir do arquivo data.json.
Manipulação do DOM: Criar e renderizar dinamicamente os cards dos álbuns na página, além de controlar a exibição e o conteúdo do modal.
Eventos e Interatividade: Implementar a funcionalidade de busca em tempo real (filtrando os álbuns conforme o usuário digita), a troca de tema e a abertura/fechamento do modal.
Otimização: Aplicar a técnica de debounce na busca para evitar processamento excessivo e usar DocumentFragment para adicionar os cards ao DOM de uma só vez, melhorando a performance.
Persistência de Dados: Usar o localStorage do navegador para salvar a preferência de tema do usuário.
JSON (JavaScript Object Notation): Atua como uma base de dados simples e local. O arquivo data.json armazena de forma estruturada todas as informações sobre os álbuns (banda, ano, descrição, links, etc.), que são então lidas e processadas pelo JavaScript.

Font Awesome: Biblioteca de ícones utilizada para enriquecer a interface do usuário com elementos visuais intuitivos, como os ícones de busca, de troca de tema (lua/sol), do Spotify e das redes sociais.
