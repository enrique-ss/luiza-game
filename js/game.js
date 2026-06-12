// [SISTEMA DE ASSETS/IMAGENS]
const ASSETS = {
    backgrounds: {
        casa_julia: "assets/bg_casa.jpg",
        quero_quero: "assets/bg_quero.quero.jpg",
        senac_aula: "assets/bg_aula.jpg",
        cantina: "assets/bg_cantina.jpg",
        parada: "assets/bg_parada.jpg",
        centro: "assets/bg_centro.jpg",
        oponente_bar: "assets/bg_bar.jpg",
        tributo_festa: "assets/bg_festa.jpg",
        praca: "assets/bg_praca.jpg",
        kalzone: "assets/bg_kalzone.jpg"
    },
    sprites: {
        luiza: "assets/luiza.png",
        enrique_zen: "assets/enrique_zen.png"
    }
};

// Estado do Jogo
let coracoes = {
    enrique: 5
};
let currentNodeKey = null;
let energiaLuiza = 80;
let roupaEscolhida = "";

let dialogHistory = [];
let storyQueue = [];
let queueIndex = 0;
let typingInterval = null;
let isTyping = false;
let currentText = "";
let chatStep = 0;

// SVG_SPRITES removidos - usando imagens PNG reais dos assets

// Roteiro Dinâmico do Jogo
const StoryNodes = {
    // ================= DESPERTAR =================
    inicio: {
        bg: "casa_julia",
        time: "08:00",
        dialogs: [
            { 
                speaker: "Narrador", 
                text: "O despertador toca às 8 da manhã. Luiza abre os olhos. Hoje é Dia dos Namorados."
            },
            { 
                speaker: "Luiza", 
                text: "Dia dos Namorados... O Enrique deve ter preparado algo."
            },
            { speaker: "Narrador", text: "Ela se levanta da cama e vai até a janela." }
        ],
        next: "checar_clima"
    },

    checar_clima: {
        bg: "casa_julia",
        time: "08:05",
        dialogs: [
            { speaker: "Luiza", text: "Vou me arrumar pro encontro com o Enrique." }
        ],
        next: "enrique_chega"
    },

    // ================= ENRIQUE CHEGA =================
    enrique_chega: {
        bg: "casa_julia",
        time: "09:00",
        dialogs: [
            { 
                speaker: "Narrador", 
                text: "Luiza tá pronta quando a campainha toca. É Enrique."
            },
            { 
                speaker: "Enrique", 
                text: "Feliz Dia dos Namorados! Você tá... tá muito bem, viu?",
                chars: ["luiza", "enrique"]
            },
            { speaker: "Luiza", text: "Enrique! Obrigada! O que você preparou pra hoje?", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Ah, preparei umas coisas. Vamos começar com café da manhã, tá bom?", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +20, hearts: { enrique: +1 } },
        next: "cafe_manha"
    },

    cafe_manha: {
        bg: "centro",
        time: "09:30",
        dialogs: [
            { speaker: "Narrador", text: "Enrique leva Luiza pra uma cafeteria no centro." },
            { speaker: "Enrique", text: "Reservei essa mesa pra gente. Espero que goste.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Isso é ótimo, Enrique! Você não precisava se esforçar tanto, sabe?", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Ah, tranquilo. Eu queria fazer algo legal pra você. É Dia dos Namorados, né?", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Eles tomam café da manhã conversando." }
        ],
        effects: { energia: +25, hearts: { enrique: +1 } },
        choices: [
            { text: "Dar um beijo no Enrique. (-10 energia)", target: "beijo_romantico", costEnergy: 10 },
            { text: "Dizer que ama ele e agradecer. (-5 energia)", target: "declaracao_amor", costEnergy: 5 },
            { text: "Segurar a mão dele. (-5 energia)", target: "segurar_mao", costEnergy: 5 }
        ]
    },

    beijo_romantico: {
        bg: "centro",
        time: "10:00",
        dialogs: [
            { speaker: "Luiza", text: "*(Puxa Enrique pra um beijo)* Te amo, Enrique.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(Corresponde ao beijo)* Eu também te amo, princesa. Feliz Dia dos Namorados.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "O beijo dura um tempo, e quando se separam, ambos estão sorrindo." }
        ],
        effects: { energia: -10, hearts: { enrique: +2 } },
        next: "passeio_parque"
    },

    declaracao_amor: {
        bg: "centro",
        time: "10:00",
        dialogs: [
            { speaker: "Luiza", text: "Enrique, eu preciso te dizer... eu te amo muito. Você me faz feliz.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Princesa, ouvir isso de você é... é muito bom. Eu também te amo. Você é importante pra mim.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Enrique segura as mãos de Luiza e olha pra ela." }
        ],
        effects: { energia: -5, hearts: { enrique: +1 } },
        next: "passeio_parque"
    },

    segurar_mao: {
        bg: "centro",
        time: "10:00",
        dialogs: [
            { speaker: "Luiza", text: "*(Segura a mão de Enrique)* Obrigada por tudo, Enrique.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(Aperta a mão dela)* Ah, tranquilo. Você merece, amor.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Eles ficam de mãos dadas, conversando." }
        ],
        effects: { energia: -5, hearts: { enrique: +1 } },
        next: "passeio_parque"
    },

    passeio_parque: {
        bg: "praca",
        time: "11:00",
        dialogs: [
            { speaker: "Narrador", text: "Depois do café, Enrique leva Luiza pra passear no parque." },
            { speaker: "Enrique", text: "Lembra da primeira vez que a gente veio aqui? Foi faz tempo, né?", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Lembro! Eu tô nervosa, e você foi super gentil. Desde então eu sei que você é especial.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Ah, parou. Desde então minha vida mudou. Você é... é importante pra mim.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +20, hearts: { enrique: +1 } },
        choices: [
            { text: "Sentar no banco e conversar sobre o futuro.", target: "conversa_futuro" },
            { text: "Dar uma volta de braço dado.", target: "volta_braco" },
            { text: "Tirar fotos juntos.", target: "fotos_romanticas" }
        ]
    },

    conversa_futuro: {
        bg: "praca",
        time: "11:30",
        dialogs: [
            { speaker: "Luiza", text: "Enrique, você já pensou sobre nosso futuro? Sabe, pra onde a gente vai daqui uns anos?", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Penso sim. Eu te vejo comigo, construindo uma vida. Viajando, rindo... enfrentando as coisas juntos.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Isso soa bom. Eu não imagino meu futuro sem você.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "E sem você meu futuro não faz sentido. Você é minha pessoa, amor. Sério.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +25, hearts: { enrique: +1 } },
        next: "almoco_romantico"
    },

    volta_braco: {
        bg: "praca",
        time: "11:30",
        dialogs: [
            { speaker: "Narrador", text: "Enrique oferece o braço pra Luiza, e ela aceita. Eles caminham pelo parque." },
            { speaker: "Enrique", text: "Cada passo com você me faz sortudo, sabe?", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "E eu me sinto amada. Obrigada por me fazer feliz, Enrique.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "O sol brilha sobre eles enquanto caminham." }
        ],
        effects: { energia: +20, hearts: { enrique: +1 } },
        next: "almoco_romantico"
    },

    fotos_romanticas: {
        bg: "praca",
        time: "11:30",
        dialogs: [
            { speaker: "Luiza", text: "Vamos tirar uma foto! Quero guardar esse momento.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Claro! *(Tira o celular e fica ao lado de Luiza)* Sorriso!", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Eles tiram várias fotos, abraçados, sorrindo." },
            { speaker: "Enrique", text: "Essas fotos vão ficar na minha tela. Você tá linda, princesa.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +25, hearts: { enrique: +1 } },
        next: "almoco_romantico"
    },

    // ================= ALMOÇO =================
    almoco_romantico: {
        bg: "kalzone",
        time: "12:30",
        dialogs: [
            { speaker: "Narrador", text: "Pra almoçar, Enrique leva Luiza num restaurante com vista pra cidade." },
            { speaker: "Enrique", text: "Escolhi esse lugar porque a comida é boa, e a vista daqui dá pra ver a cidade inteira.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Isso é legal, Enrique! Você pensou em tudo.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Ah, eu queria que hoje fosse especial. Porque você é especial pra mim.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Eles almoçam conversando." }
        ],
        effects: { energia: +30, hearts: { enrique: +1 } },
        next: "atividade_tarde"
    },

    atividade_tarde: {
        bg: "centro",
        time: "14:00",
        dialogs: [
            { speaker: "Narrador", text: "Depois do almoço, Enrique tem uma surpresa pra tarde." },
            { speaker: "Enrique", text: "Pra tarde, preparei umas coisas. O que você quer fazer?", chars: ["luiza", "enrique"] }
        ],
        choices: [
            { text: "Ir ao cinema ver um filme.", target: "cinema" },
            { text: "Fazer pintura juntos.", target: "pintura" },
            { text: "Ir num museu.", target: "museu" }
        ]
    },

    cinema: {
        bg: "centro",
        time: "14:30",
        dialogs: [
            { speaker: "Narrador", text: "Enrique leva Luiza pro cinema. Eles escolhem um filme que os dois queriam ver." },
            { speaker: "Enrique", text: "Comprei pipoca grande pra gente dividir. E chocolate também, porque sei que você gosta.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Você é o melhor! Isso é exatamente o que eu queria.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Durante o filme, Enrique segura a mão de Luiza. Eles riem das partes engraçadas e se abraçam nas emotivas." }
        ],
        effects: { energia: +25, hearts: { enrique: +1 } },
        next: "jantar_romantico"
    },

    pintura: {
        bg: "praca",
        time: "14:30",
        dialogs: [
            { speaker: "Narrador", text: "Enrique leva Luiza pra um workshop de pintura. O local tá cheio de telas e tintas." },
            { speaker: "Enrique", text: "Lembrei que você gosta de arte. Pensei que seria legal pintarmos algo juntos.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Isso é criativo! Mal posso esperar pra ver o que a gente vai criar.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Eles passam a tarde pintando, rindo dos erros um do outro e se ajudando. No final, têm uma pintura feita pelos dois." },
            { speaker: "Enrique", text: "Essa pintura vai ficar na nossa sala. Pra gente lembrar desse Dia dos Namorados.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +30, hearts: { enrique: +1 } },
        next: "jantar_romantico"
    },

    museu: {
        bg: "centro",
        time: "14:30",
        dialogs: [
            { speaker: "Narrador", text: "Enrique leva Luiza pra um museu de arte. O lugar é silencioso e cria uma atmosfera especial." },
            { speaker: "Enrique", text: "Sei que você gosta de arte. Quero compartilhar isso com você.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Isso é maravilhoso. Adoro quando você mostra que conhece meus gostos.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Eles caminham pelas galerias de mãos dadas, comentando as obras." }
        ],
        effects: { energia: +25, hearts: { enrique: +1 } },
        next: "jantar_romantico"
    },

    // ================= JANTAR =================
    jantar_romantico: {
        bg: "oponente_bar",
        time: "19:00",
        dialogs: [
            { speaker: "Narrador", text: "Pra jantar, Enrique reserva uma mesa num restaurante com luz suave." },
            { speaker: "Enrique", text: "Esse é o final perfeito pro nosso dia. Espero que goste do lugar.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Tô impressionada, Enrique. Você realmente pensou em tudo.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Você merece o mundo, Luiza. Hoje tentei te dar pelo menos uma parte do quanto você significa pra mim.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Eles jantam conversando sobre o dia, seus sonhos e o quanto se amam." }
        ],
        effects: { energia: +30, hearts: { enrique: +1 } },
        next: "surpresa_final"
    },

    surpresa_final: {
        bg: "centro",
        time: "21:00",
        dialogs: [
            { speaker: "Narrador", text: "Depois do jantar, Enrique tem mais uma surpresa." },
            { speaker: "Enrique", text: "Antes de te levar pra casa, tenho um último presente pra você.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Enrique tira um embrulho do bolso e entrega pra Luiza." },
            { speaker: "Enrique", text: "Abre, amor.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "*(Abre o presente)* Enrique... é um colar! É lindo!", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Tem uma gravação no centro. Diz 'Eu te amo'. Quero que você sempre lembre do quanto eu te amo.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "*(Com lágrimas nos olhos)* Eu vou usar todos os dias. Te amo tanto, Enrique.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(Coloca o colar no pescoço dela)* Você fica ainda mais linda com ele. Feliz Dia dos Namorados.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +35, hearts: { enrique: +1 } },
        next: "casa"
    },

    casa: {
        bg: "casa_julia",
        time: "22:00",
        dialogs: [
            { speaker: "Narrador", text: "Enrique leva Luiza pra casa. O dia foi perfeito." },
            { speaker: "Enrique", text: "Chegamos. Obrigado por ter me acompanhado hoje. Foi o melhor Dia dos Namorados da minha vida.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Pra mim também, Enrique. Cada momento foi especial. Você me fez sentir amada.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Você é a pessoa mais amada do mundo, princesa. E eu prometo que vou continuar te fazendo feliz.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Eles se abraçam na porta de casa, não querendo que o dia acabe." }
        ],
        effects: { energia: +20, hearts: { enrique: +1 } },
        choices: [
            { text: "Convidar o Enrique para entrar.", target: "enrique_entra" },
            { text: "Despedir-se com um beijo de boa noite.", target: "despedida_beijo" },
            { text: "Pedir para ele ficar mais um pouco.", target: "ficar_mais" }
        ]
    },

    enrique_entra: {
        bg: "casa_julia",
        time: "22:15",
        dialogs: [
            { speaker: "Luiza", text: "Quer entrar? Ainda é cedo, podemos conversar mais um pouco.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Com prazer. Qualquer momento com você é precioso.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Enrique entra e eles se sentam no sofá, abraçados. Conversam sobre o dia e sobre seus sonhos." },
            { speaker: "Enrique", text: "Princesa, hoje foi o dia mais especial da minha vida. Obrigado por ser minha namorada.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Você fez tudo perfeito, Enrique. Eu te amo.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +25, hearts: { enrique: +1 } },
        next: "whatsapp_noite"
    },

    despedida_beijo: {
        bg: "casa_julia",
        time: "22:15",
        dialogs: [
            { speaker: "Luiza", text: "Obrigada por tudo hoje, Enrique. Foi perfeito.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Foi um prazer. *(Dá um beijo de boa noite)* Até amanhã.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Luiza entra em casa com o coração cheio. O Dia dos Namorados foi inesquecível." }
        ],
        effects: { energia: +20, hearts: { enrique: +1 } },
        next: "whatsapp_noite"
    },

    ficar_mais: {
        bg: "casa_julia",
        time: "22:15",
        dialogs: [
            { speaker: "Luiza", text: "Fica mais um pouco? Não quero que o dia acabe ainda.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Eu também não quero que acabe. Vamos ficar aqui um pouco mais.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Eles ficam abraçados na porta, aproveitando cada último momento juntos." },
            { speaker: "Enrique", text: "Cada segundo com você é um presente. Feliz Dia dos Namorados, princesa.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +25, hearts: { enrique: +1 } },
        next: "whatsapp_noite"
    },

    // ================= WHATSAPP DA NOITE =================
    whatsapp_noite: {
        bg: "casa_julia",
        time: "23:00",
        dialogs: [
            { speaker: "Narrador", text: "Luiza tá em casa, sentindo-se a pessoa mais feliz do mundo. Ela decide mandar uma mensagem pro Enrique." }
        ],
        effects: { energia: +15 },
        isChat: true,
        chatPartner: "enrique"
    },

    fim_jogo: {
        bg: "casa_julia",
        time: "23:30",
        dialogs: [
            { speaker: "Narrador", text: "A escuridão abraça Luiza gentilmente. O Dia dos Namorados foi perfeito." },
            { speaker: "Narrador", text: "Luiza adormece com um sorriso no rosto, sabendo que é amada por alguém especial." },
            { speaker: "Narrador", text: "Boa noite, Luiza." }
        ],
        next: "show_goodnight_screen"
    },
};

// Diálogos de Chat do WhatsApp
const ChatScripts = {
    enrique: [
        { author: "Enrique", text: "Chegou bem em casa?", time: "23:05" },
        { author: "Enrique", text: "Tô aqui pensando em cada momento do nosso dia hoje... Foi perfeito. ❤️", time: "23:05" },
        { author: "Luiza", text: "Cheguei sim! Foi o melhor Dia dos Namorados da minha vida, Enrique.", time: "23:06" },
        { author: "Enrique", text: "Pra mim também. Você é a pessoa mais especial do mundo, princesa. Te amo muito!", time: "23:07" },
        { author: "Enrique", text: "O colar ficou lindo em você. Vai me lembrar do quanto te amo todos os dias. ❤️", time: "23:07", sticker: "love" },
        { author: "Luiza", text: "Vou usar sempre! Obrigada por tudo, Enrique. Te amo!", time: "23:08" },
        { author: "Enrique", text: "Dorme bem, princesa. Sonha comigo. Até amanhã! 💕", time: "23:09" }
    ]
};

// Imagens de Stickers do WhatsApp
const STICKERS = {
    love: "assets/sticker_love.png", // Sticker romântico "TE AMO" do Ruan
    sticker_vigia: "assets/sticker_vigia.png" // Sticker "VIGIA" do Otávio
};

// Inicializar o jogo ao carregar
window.onload = function() {
    createStars();
    preloadSprites();
};

function preloadSprites() {
    document.getElementById('img-luiza').src = ASSETS.sprites.luiza;
    document.getElementById('img-enrique').src = ASSETS.sprites.enrique_zen;
}

// Função para atualizar o sprite da Luiza
function updateLuizaSprite(nodeKey) {
    const imgLuiza = document.getElementById('img-luiza');
    if (imgLuiza && ASSETS.sprites.luiza) {
        imgLuiza.src = ASSETS.sprites.luiza;
    }
}

function fallbackSprite(character) {
    // Apenas silencia o erro, pois futuramente serão adicionados arquivos PNG válidos.
    const img = document.getElementById(`img-${character}`);
    if (img) {
        img.style.display = 'none'; // Esconde a imagem quebrada
    }
}

// Tornar a função globalmente acessível antes do carregamento das imagens
window.fallbackSprite = fallbackSprite;

// Criar estrelas piscando na tela de boa noite
function createStars(containerId = 'stars-container') {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    for(let i=0; i<60; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(star);
    }
}

// Iniciar Aventura
function startGame() {
    coracoes = {
        enrique: 5
    };
    roupaEscolhida = "";
    lastTime = "08:00";

    // Gerar Energia aleatória entre 80% e 100%
    energiaLuiza = Math.floor(Math.random() * (100 - 80 + 1)) + 80;

    dialogHistory = [];

    updateHUD();
    switchScreen('screen-game');
    loadNode('inicio');
}


// Mudar de Tela
function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// Modais
function openModal(modalId) {
    if (modalId === 'log-modal') {
        const body = document.getElementById('log-modal-body');
        if (dialogHistory.length === 0) {
            body.innerHTML = `<p style="color: var(--text-muted); text-align: center;">Nenhum diálogo registrado ainda. Inicie o jogo!</p>`;
        } else {
            body.innerHTML = dialogHistory.map(entry => `
                <div class="log-entry">
                    <div class="log-name" style="color: ${getNameColor(entry.name)}">${entry.name}</div>
                    <div class="log-text">${entry.text}</div>
                </div>
            `).join('');
        }
    }
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function getNameColor(name) {
    if (name === 'Enrique') return 'var(--primary)';
    if (name === 'Luiza') return '#ff5555';
    return 'var(--text-muted)';
}

// Atualizar Informações na HUD
function updateHUD() {
    // Enrique tem máximo de 5 corações
    coracoes.enrique = Math.max(0, Math.min(5, coracoes.enrique));

    updateHeartMeter('score-enrique', coracoes.enrique, 5);
    
    // Sincroniza também os valores no drawer mobile
    updateHeartMeter('drawer-score-enrique', coracoes.enrique, 5);
    
    energiaLuiza = Math.max(0, Math.min(100, energiaLuiza));

    document.getElementById('val-energia').textContent = energiaLuiza + '%';
    document.getElementById('bar-energia').style.width = energiaLuiza + '%';

    // Sincroniza barras do drawer mobile
    const dValEn = document.getElementById('drawer-val-energia');
    const dBarEn = document.getElementById('drawer-bar-energia');
    if (dValEn) dValEn.textContent = energiaLuiza + '%';
    if (dBarEn) dBarEn.style.width = energiaLuiza + '%';
}

function updateHeartMeter(elementId, amount, maxHearts = 5) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const filled = Math.max(0, Math.min(maxHearts, amount));
    element.innerHTML = Array.from({ length: maxHearts }, (_, index) => {
        const className = index < filled ? 'heart-full' : 'heart-empty';
        return `<span class="${className}">♥</span>`;
    }).join('');
}

// Atualiza o ícone de clima no HUD com base no horário e no clima do dia
function updateWeatherIcon(time) {
    const icon = document.getElementById('hud-weather-icon');
    if (!icon) return;

    // Converte "HH:MM" para minutos desde meia-noite
    const [hStr, mStr] = (time || '05:30').split(':');
    const totalMin = parseInt(hStr, 10) * 60 + parseInt(mStr, 10);

    // Noite só depois das 20:00
    if (totalMin >= 1200) {
        icon.innerHTML = '<i class="fa-solid fa-moon"></i>';
        return;
    }

    // Usa o clima sorteado no início
    switch (climaDoDia) {
        case 'chuva':
            icon.innerHTML = '<i class="fa-solid fa-cloud-rain"></i>';
            break;
        case 'frio':
            icon.innerHTML = '<i class="fa-solid fa-snowflake"></i>';
            break;
        case 'calor':
        default:
            icon.innerHTML = '<i class="fa-solid fa-sun"></i>';
            break;
    }
}

// Aplica decaimento de energia baseado no tempo que passou
let lastTime = "05:30";

function applyEnergyDecay(currentTime) {
    if (!currentTime || !lastTime) return;

    const [h1, m1] = lastTime.split(':').map(Number);
    const [h2, m2] = currentTime.split(':').map(Number);

    const totalMin1 = h1 * 60 + m1;
    const totalMin2 = h2 * 60 + m2;

    const diffMinutes = totalMin2 - totalMin1;

    if (diffMinutes > 0) {
        // Decaimento: 1 ponto de energia a cada 30 minutos
        const energyLoss = Math.floor(diffMinutes / 30);
        if (energyLoss > 0) {
            energiaLuiza = Math.max(0, energiaLuiza - energyLoss);
            updateHUD();
        }
    }

    lastTime = currentTime;
}


function toggleHamburgerMenu() {
    const drawer = document.getElementById('hamburger-drawer');
    if (drawer) {
        drawer.classList.toggle('active');
    }
}

// Abrir Diário a partir do Drawer lateral
function showHistoryFromDrawer() {
    toggleHamburgerMenu();
    showHistory();
}

// Carregar um nó da história
function loadNode(nodeKey) {
    currentNodeKey = nodeKey;

    if (nodeKey.startsWith("roupa_")) {
        roupaEscolhida = nodeKey.replace("roupa_", "");
        setupClimaDialogs();

        // Aplica efeitos APÓS setupClimaDialogs (que já definiu os effects corretos)
        const roupaNode = StoryNodes[nodeKey];
        if (roupaNode?.effects) {
            energiaLuiza = Math.max(0, Math.min(100, energiaLuiza + (roupaNode.effects.energia || 0)));
            updateHUD();
        }
    }

    const node = StoryNodes[nodeKey];
    if (!node) return;

    const gameScreen = document.getElementById('screen-game');
    gameScreen.className = 'screen active';

    const bgName = node.bg;
    gameScreen.style.backgroundImage = `url(${ASSETS.backgrounds[bgName]})`;
    gameScreen.classList.add(`fallback-bg-${bgName.replace('_', '-')}`);

    if (node.time) {
        document.getElementById('hud-time-val').textContent = node.time;
        updateWeatherIcon(node.time);
        // Aplica decaimento de energia baseado no tempo
        applyEnergyDecay(node.time);
    }

    hideAllSprites();

    // Atualiza o sprite da Luiza
    updateLuizaSprite(nodeKey);

    storyQueue = [...node.dialogs];
    queueIndex = 0;

    document.getElementById('choices-container').style.display = 'none';

    playNextDialog(node);
}

function hideAllSprites() {
    document.querySelectorAll('.character-sprite-container').forEach(sprite => {
        sprite.classList.remove('active', 'speaking', 'dimmed');
    });
}

// Toca o próximo diálogo na fila com avaliação de condicionais
function playNextDialog(currentNodeObj) {
    if (queueIndex < storyQueue.length) {
        const item = storyQueue[queueIndex];
        
        let textToPlay = item.text;
        if (item.conditional) {
            for (let branch of item.conditional) {
                if (branch.cond()) {
                    textToPlay = branch.text;
                    break;
                }
            }
        }
        
        showDialogText(item.speaker, textToPlay, item.chars || item.char);
        queueIndex++;
    } else {
        if (currentNodeObj.isChat) {
            startWhatsAppChat(currentNodeObj.chatPartner);
        } else if (currentNodeObj.choices) {
            if (currentNodeObj.effects) {
                energiaLuiza += (currentNodeObj.effects.energia || 0);
                applyHeartEffects(currentNodeObj.effects.hearts);
                updateHUD();
            }
            showChoices(currentNodeObj.choices);
        } else if (currentNodeObj.next === 'show_goodnight_screen') {
            showGoodnightScreen();
        } else if (currentNodeObj.next) {
            if (currentNodeObj.effects) {
                energiaLuiza += (currentNodeObj.effects.energia || 0);
                applyHeartEffects(currentNodeObj.effects.hearts);
                updateHUD();
            }
            loadNode(currentNodeObj.next);
        }
    }
}

function applyHeartEffects(heartEffects) {
    if (!heartEffects) return;

    Object.entries(heartEffects).forEach(([personagem, amount]) => {
        if (coracoes[personagem] === undefined) return;
        // Enrique tem máximo de 5 corações
        const maxHearts = 5;
        coracoes[personagem] = Math.max(0, Math.min(maxHearts, coracoes[personagem] + amount));
    });
}

// Exibir Diálogo com efeito de digitação gradual
function showDialogText(speaker, text, activeCharKey) {
    const nameTag = document.getElementById('dialog-name');
    const textBox = document.getElementById('dialog-text');
    const speakerCharKey = getCharacterKeyFromSpeaker(speaker);
    const activeCharKeys = getActiveCharacterKeys(activeCharKey, speakerCharKey);
    
    nameTag.textContent = speaker;
    nameTag.className = 'dialog-name-tag ' + getSpeakerClassName(speaker);

    dialogHistory.push({ name: speaker, text: text });

    manageSpritesState(activeCharKeys, speakerCharKey);

    if (typingInterval) clearInterval(typingInterval);
    isTyping = true;
    currentText = text;
    textBox.textContent = "";
    let i = 0;
    
    typingInterval = setInterval(() => {
        if (i < text.length) {
            textBox.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
            isTyping = false;
        }
    }, 18);
}

function getActiveCharacterKeys(activeCharKey, speakerCharKey) {
    if (Array.isArray(activeCharKey)) {
        return activeCharKey.filter(Boolean);
    }

    if (activeCharKey) {
        return [activeCharKey];
    }

    return speakerCharKey ? [speakerCharKey] : [];
}

function getCharacterKeyFromSpeaker(speaker) {
    const normalizedSpeaker = getSpeakerClassName(speaker);

    const speakerSpriteMap = {
        luiza: 'luiza',
        enrique: 'enrique'
    };

    return speakerSpriteMap[normalizedSpeaker] || null;
}

function getSpeakerClassName(speaker) {
    return speaker
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
}

function manageSpritesState(activeCharKeys, speakingCharKey) {
    const activeKeys = Array.isArray(activeCharKeys) ? activeCharKeys : [];

    document.querySelectorAll('.character-sprite-container').forEach(sprite => {
        sprite.classList.remove('active', 'speaking', 'speaking-otavio', 'speaking-ruan', 'dimmed');
    });

    // Adicionar/remover classe two-sprites no sprites-layer para mobile
    const spritesLayer = document.querySelector('.sprites-layer');
    if (spritesLayer) {
        if (activeKeys.length === 2) {
            spritesLayer.classList.add('two-sprites');
        } else {
            spritesLayer.classList.remove('two-sprites');
        }
    }

    activeKeys.forEach(activeCharKey => {
        const activeSprite = document.getElementById(`sprite-${activeCharKey}`);
        if (activeSprite) {
            activeSprite.classList.add('active');

            if (activeCharKey !== speakingCharKey) {
                activeSprite.classList.add('dimmed');
            } else {
                activeSprite.classList.add('speaking');
            }
        }
    });
}

// Ao clicar na caixa de diálogo
function onDialogBoxClick() {
    if (isTyping) {
        if (typingInterval) clearInterval(typingInterval);
        document.getElementById('dialog-text').textContent = currentText;
        isTyping = false;
    } else {
        const activeNodeKey = getActiveNodeKey();
        if (activeNodeKey) {
            playNextDialog(StoryNodes[activeNodeKey]);
        }
    }
}

// Retorna a chave do nó ativo
function getActiveNodeKey() {
    return currentNodeKey;
}

function hasRequiredHearts(requirements) {
    return Object.entries(requirements).every(([personagem, amount]) => {
        return (coracoes[personagem] || 0) >= amount;
    });
}

function getHeartRequirementText(requirements) {
    const names = {
        enrique: 'Enrique'
    };

    return Object.entries(requirements)
        .map(([personagem, amount]) => `${amount} coração com ${names[personagem] || personagem}`)
        .join(' e ');
}

// Exibir opções de escolha
function showChoices(choices) {
    const container = document.getElementById('choices-container');
    container.innerHTML = '';
    
    choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        
        let isLocked = false;
        let lockReason = "";

        // Requisito de corações
        if (choice.reqHearts) {
            if (!hasRequiredHearts(choice.reqHearts)) {
                isLocked = true;
                lockReason = getHeartRequirementText(choice.reqHearts);
            }
        }

        // Requisito de Energia Mínima
        if (choice.reqEnergyMin !== undefined && energiaLuiza < choice.reqEnergyMin) {
            isLocked = true;
            lockReason = `Requer Energia >= ${choice.reqEnergyMin}%`;
        }

        if (isLocked) {
            // Se o bloqueio for por corações, não mostra como bloqueado visualmente
            if (choice.reqHearts && !hasRequiredHearts(choice.reqHearts)) {
                btn.innerHTML = `
                    <span>${choice.text}</span>
                `;
                btn.onclick = () => {
                    // No Valentine's Day game, all choices should be available
                    loadNode(choice.target);
                };
            } else {
                btn.classList.add('locked');
                btn.innerHTML = `
                    <span>${choice.text}</span>
                    <span class="choice-requirement"><i class="fa-solid fa-lock"></i> ${lockReason}</span>
                `;
                btn.onclick = () => {
                    btn.classList.add('shake');
                    setTimeout(() => btn.classList.remove('shake'), 400);
                };
            }
        } else {
            btn.innerHTML = `
                <span>${choice.text}</span>
            `;
            btn.onclick = () => {
                if (choice.target === 'go_victory') {
                    showVictoryScreen();
                } else {
                    loadNode(choice.target);
                }
            };
        }

        container.appendChild(btn);
    });

    container.style.display = 'flex';
}

// ================= CHAT WHATSAPP =================
function startWhatsAppChat(partner) {
    chatStep = 0;
    switchScreen('screen-whatsapp');

    const chatBody = document.getElementById('wa-chat-body');
    chatBody.innerHTML = '';

    const title = document.getElementById('wa-chat-name');
    const status = document.getElementById('wa-chat-status');
    const avatarText = document.getElementById('wa-avatar-text');
    const avatarImg = document.getElementById('wa-avatar-img');

    if (partner === 'enrique') {
        title.textContent = "Meu Amor 💖 Enrique";
        status.textContent = "online";
        // Mostrar foto do Enrique
        avatarText.style.display = 'none';
        avatarImg.src = ASSETS.sprites.enrique_zen;
        avatarImg.style.display = 'block';
    }

    nextChatStep(partner);
}

function nextChatStep(partner) {
    if (!partner) {
        const titleText = document.querySelector('.wa-chat-name').textContent;
        partner = 'enrique';
    }

    const script = ChatScripts[partner];
    const chatBody = document.getElementById('wa-chat-body');
    
    if (chatStep < script.length) {
        const msg = script[chatStep];
        const msgDiv = document.createElement('div');
        
        const isIncoming = msg.author !== 'Luiza';
        msgDiv.className = `wa-msg ${isIncoming ? 'incoming' : 'outgoing'}`;
        
        let authorSpan = '';
        if (isIncoming) {
            authorSpan = `<span class="wa-msg-author ${msg.author.toLowerCase()}">${msg.author}</span>`;
        }

        let stickerContent = '';
        if (msg.sticker) {
            const stickerSrc = STICKERS[msg.sticker];
            if (stickerSrc) {
                stickerContent = `<img src="${stickerSrc}" class="wa-sticker" alt="sticker">`;
            }
        }

        msgDiv.innerHTML = `
            ${authorSpan}
            <div>${msg.text}</div>
            ${stickerContent}
            <span class="wa-time">${msg.time}</span>
        `;
        
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
        chatStep++;

        const inputText = document.getElementById('wa-input-text');
        if (chatStep < script.length && script[chatStep].author === 'Luiza') {
            inputText.textContent = "Tocar para responder...";
        } else {
            inputText.textContent = "Tocar para ler próximas mensagens...";
        }
    } else {
        // Pega o nó de chat ativo e aplica os efeitos
        const chatNodes = ['whatsapp_noite'];
        for (const key of chatNodes) {
            const n = StoryNodes[key];
            if (n?.isChat && n?.chatPartner === partner && n?.effects) {
                energiaLuiza += (n.effects.energia || 0);
                applyHeartEffects(n.effects.hearts);
                updateHUD();
                break;
            }
        }
        switchScreen('screen-game');
        loadNode('fim_jogo');
    }
}

// ================= TELA DE BOA NOITE =================
function showGoodnightScreen() {
    createStars('stars-container-goodnight');
    switchScreen('screen-goodnight');
}

// Funções Auxiliares de Navegação
backToMenu = () => {
    switchScreen('screen-menu');
};

showHistory = () => {
    openModal('log-modal');
};
