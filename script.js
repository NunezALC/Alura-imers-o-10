document.addEventListener('DOMContentLoaded', () => {
    // --- SELETORES DO DOM ---
    const cardContainer = document.querySelector(".card-container");
    const campoBusca = document.querySelector("#campoBusca");
    const searchToggle = document.querySelector('#search-toggle');
    const themeToggle = document.querySelector('#theme-toggle');
    const body = document.body;
    const floatingBar = document.querySelector('.floating-social-bar');
    const footer = document.querySelector('.footer');

    // --- SELETORES DO MODAL ---
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    let allData = [];
    let searchTimeout;

    // --- FUNÇÕES ---

    /**
     * Cria um único card de álbum.
     * @param {object} dado - O objeto contendo as informações do álbum.
     * @returns {HTMLElement} O elemento <article> do card.
     */
    const createCard = (dado) => {
        const tracklistHtml = dado.tracklist
            .split(', ')
            .map(musica => `<li>${musica}</li>`)
            .join('');

        const article = document.createElement("article");
        article.className = "card";
        article.innerHTML = `
            <img class="card-image" src="${dado.imagem}" alt="Capa do álbum ${dado.album} da banda ${dado.banda}" loading="lazy">
            <div class="card-content">
                <h2 class="card-title">${dado.banda} - ${dado.album}</h2>
                <p class="card-year"><strong>Ano:</strong> ${dado.ano}</p>
                <p class="card-description">${dado.descricao}</p>
                <div class="tracklist-container">
                    <p><strong>Tracklist:</strong></p>
                    <ul>${tracklistHtml}</ul>
                </div>
                <div class="card-links">
                    <a href="${dado.link}" target="_blank" class="card-link">Saiba Mais</a>
                    <a href="${dado.spotify_link}" target="_blank" class="spotify-link" aria-label="Ouvir no Spotify"><i class="fa-brands fa-spotify"></i></a>
                </div>
            </div>
        `;
        return article;
    };

    /**
     * Renderiza uma lista de cards no contêiner principal de forma eficiente.
     * @param {Array<object>} dataToRender - Os dados a serem renderizados.
     */
    const renderizarCards = (dataToRender) => {
        cardContainer.innerHTML = ""; // Limpa o container
        const fragment = document.createDocumentFragment(); // Cria um fragmento para otimização
        dataToRender.forEach((dado, index) => {
            const card = createCard(dado);
            card.style.animationDelay = `${index * 0.05}s`; // Adiciona um atraso em cascata
            
            // Adiciona o evento de clique para abrir o modal
            card.addEventListener('click', () => openModal(card));

            fragment.appendChild(card);
        });
        cardContainer.appendChild(fragment); // Adiciona o fragmento ao DOM de uma só vez
    };

    /**
     * Abre o modal com o conteúdo do card clicado.
     * @param {HTMLElement} cardElement - O elemento do card que foi clicado.
     */
    const openModal = (cardElement) => {
        modalContent.innerHTML = cardElement.innerHTML; // Copia o HTML do card para o modal
        modalOverlay.classList.add('active');
        body.classList.add('modal-open'); // Impede o scroll do fundo
    };

    /**
     * Fecha o modal.
     */
    const closeModal = () => {
        modalOverlay.classList.remove('active');
        body.classList.remove('modal-open');
    };

    /**
     * Filtra os dados com base no termo buscado e chama a renderização.
     */
    const realizarBusca = () => {
        const termoBuscado = campoBusca.value.toLowerCase();
        const dadosFiltrados = allData.filter(dado =>
            dado.banda.toLowerCase().includes(termoBuscado) ||
            dado.album.toLowerCase().includes(termoBuscado) ||
            dado.ano.toString().includes(termoBuscado)
        );
        renderizarCards(dadosFiltrados);
    };

    /**
     * Aplica um debounce na função de busca para melhorar a performance.
     */
    const handleSearchInput = () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(realizarBusca, 300); // Aguarda 300ms após o usuário parar de digitar
    };

    /**
     * Alterna a visibilidade da caixa de busca.
     */
    const toggleSearch = () => {
        const searchBox = document.querySelector('.search-box');
        searchBox.classList.toggle('active');
        if (searchBox.classList.contains('active')) {
            campoBusca.focus();
        }
    };

    /**
     * Atualiza o ícone do tema com base no tema atual.
     * @param {string} theme - O tema atual ('light' ou 'dark').
     */
    const updateThemeIcon = (theme) => {
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle('fa-sun', theme === 'light');
        icon.classList.toggle('fa-moon', theme === 'dark');
    };

    /**
     * Alterna entre o tema claro e escuro.
     */
    const toggleTheme = () => {
        const isLightTheme = body.classList.toggle('light-theme');
        const newTheme = isLightTheme ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    };

    /**
     * Controla a visibilidade da barra social flutuante com base na posição de rolagem.
     */
    const handleFloatingBarVisibility = () => {
        if (!floatingBar || !footer) return;

        // Calcula a distância do final da página
        const scrollPosition = window.innerHeight + window.scrollY;
        const pageHeight = document.body.offsetHeight;
        const footerHeight = footer.offsetHeight;

        // Esconde a barra flutuante quando o usuário se aproxima do rodapé
        if (scrollPosition >= pageHeight - footerHeight) {
            floatingBar.classList.add('hidden');
        } else {
            floatingBar.classList.remove('hidden');
        }
    };

    /**
     * Carrega o tema salvo do localStorage.
     */
    const loadTheme = () => {
        const savedTheme = localStorage.getItem('theme') || 'dark'; // Padrão é 'dark'
        if (savedTheme === 'light') {
            body.classList.add('light-theme');
        }
        updateThemeIcon(savedTheme);
    };

    /**
     * Função principal de inicialização.
     */
    const inicializar = async () => {
        try {
            const resposta = await fetch("data.json");
            if (!resposta.ok) throw new Error(`HTTP error! status: ${resposta.status}`);
            allData = await resposta.json();
            
            renderizarCards(allData);
            
            campoBusca.addEventListener("input", handleSearchInput);
            searchToggle.addEventListener('click', toggleSearch);
            themeToggle.addEventListener('click', toggleTheme);
            
            // Eventos para fechar o modal
            modalCloseBtn.addEventListener('click', closeModal);
            modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

            window.addEventListener('scroll', handleFloatingBarVisibility); // Adiciona o listener de scroll
            
        } catch (error) {
            console.error("Falha ao carregar ou inicializar os dados:", error);
            cardContainer.innerHTML = "<p>Ocorreu um erro ao carregar os álbuns. Tente novamente mais tarde.</p>";
        }
    };

    // --- INICIALIZAÇÃO ---
    loadTheme();
    inicializar();

});