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
        julia_pijama: "assets/julia_pijama.png",
        julia_moletom: "assets/julia_moletom.png",
        julia_leve: "assets/julia_leve.png",
        julia_capa: "assets/julia_capa.png",
        julia_uniforme: "assets/julia_uniforme.png",
        enrique_zen: "assets/enrique_zen.png",
        otavio_crente: "assets/otavio_crente.png",
        ruan_namorado: "assets/ruan_namorado.png"
    }
};

// Estado do Jogo
let coracoes = {
    enrique: 0,
    otavio: 0,
    ruan: 5
};
let currentNodeKey = null;
let energiaJulia = 80;
let dorJulia = 20;
let climaDoDia = "frio"; // 'frio', 'chuva' ou 'calor'
let roupaEscolhida = ""; // 'moletom', 'leve', 'capa'

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
    // ================= DESPERTAR E CLIMA =================
    inicio: {
        bg: "casa_julia",
        time: "05:30",
        dialogs: [
            { 
                speaker: "Narrador", 
                text: "O despertador toca um som estridente de corneta às 5:30 da manhã. Julia abre um olho.",
                conditional: [
                    { 
                        cond: () => energiaJulia >= 90 && dorJulia <= 15, 
                        text: "O despertador toca às 5:30 da manhã. Julia, surpreendentemente, acorda bem disposta hoje. Sem aquela dor chata nas costas e com o humor melhor do que a média. Um milagre!" 
                    },
                    { 
                        cond: () => energiaJulia < 75 || dorJulia > 35, 
                        text: "O despertador toca às 5:30 da manhã. Julia solta um gemido baixo. As costas estão doloridas e levantar da cama parece um esforço hercúleo." 
                    }
                ]
            },
            { 
                speaker: "Julia", 
                text: "Mais um dia... Por que eu não nasci herdeira?",
                conditional: [
                    {
                        cond: () => energiaJulia >= 90 && dorJulia <= 15,
                        text: "Nossa, até que não estou me sentindo um bagaço hoje! Dá pra encarar a Quero-Quero sorrindo."
                    },
                    {
                        cond: () => dorJulia > 40,
                        text: "Minhas costelas parecem que foram usadas de tambor ontem à noite... Socorro."
                    }
                ]
            },
            { speaker: "Narrador", text: "Ela olha pela janela para checar o clima lá fora antes de arrumar a mala e escolher a roupa." }
        ],
        next: "checar_clima"
    },

    checar_clima: {
        bg: "casa_julia",
        time: "05:35",
        dialogs: [],
        next: "escolha_roupa"
    },

    escolha_roupa: {
        bg: "casa_julia",
        time: "05:40",
        dialogs: [
            { speaker: "Julia", text: "Preciso decidir o que vestir. Tenho que passar a manhã inteira na Quero-Quero e depois ir direto pro Senac." }
        ],
        choices: [
            { text: "Vestir o moletom gigante e quentinho.", target: "roupa_moletom" },
            { text: "Colocar uma roupa leve.", target: "roupa_leve" },
            { text: "Usar a capa de chuva amarela e galochas.", target: "roupa_capa" }
        ]
    },

    roupa_moletom: {
        bg: "casa_julia",
        time: "05:45",
        dialogs: [], // Dinâmico no JS baseado no clima
        next: "ir_trabalho"
    },
    roupa_leve: {
        bg: "casa_julia",
        time: "05:45",
        dialogs: [], // Dinâmico no JS baseado no clima
        next: "ir_trabalho"
    },
    roupa_capa: {
        bg: "casa_julia",
        time: "05:45",
        dialogs: [], // Dinâmico no JS baseado no clima
        next: "ir_trabalho"
    },

    // ================= TRABALHO NA QUERO-QUERO =================
    ir_trabalho: {
        bg: "quero_quero",
        time: "06:00",
        dialogs: [
            { 
                speaker: "Narrador", 
                text: "Julia chega com o dia amanhecendo na filial das Lojas Quero-Quero bem às 6h da manhã.",
                conditional: [
                    {
                        cond: () => energiaJulia < 65,
                        text: "Julia se arrasta para o trabalho às 6h da manhã. A caminhada ou vento do dia só a fazem querer uma cama dobrável no setor de móveis."
                    },
                    {
                        cond: () => dorJulia > 40,
                        text: "Julia chega no trabalho com a mão na lombar. Ficar de pé no caixa hoje vai ser um verdadeiro teste de paciência."
                    }
                ]
            },
            { 
                speaker: "Julia", 
                text: "Bom dia, pessoal... Que o café nos ajude.",
                conditional: [
                    {
                        cond: () => energiaJulia >= 90 && dorJulia <= 15,
                        text: "Bom dia! Hoje acordei com tudo, pronta para descarregar um caminhão de cimento se precisar!"
                    },
                    {
                        cond: () => dorJulia > 40,
                        text: "Bom dia... Se alguém me pedir para carregar caixa hoje, eu choro aqui mesmo."
                    }
                ]
            },
            { speaker: "Narrador", text: "Logo no início do turno, um cliente confuso entra procurando parafuso sextavado e começa a reclamar do preço do cimento." }
        ],
        choices: [
            { text: "Atender o cliente com paciência zen absoluta.", target: "trabalho_zen" },
            { text: "Oferecer garantia estendida e consórcio com fervor.", target: "trabalho_crente", reqEnergyMin: 45 },
            { text: "Organizar o setor de ferramentas com cuidado meticuloso.", target: "trabalho_organizar" }
        ]
    },

    trabalho_zen: {
        bg: "quero_quero",
        time: "08:30",
        dialogs: [
            { speaker: "Julia", text: "Senhor, o preço do cimento oscila conforme o mercado. Vamos focar em achar seus parafusos primeiro." },
            { speaker: "Narrador", text: "O cliente se acalma com a postura tranquila da Ju. Ela passa o resto da manhã organizando o setor de fixação e repondo prateleiras no ritmo que as costas permitem." },
            { speaker: "Narrador", text: "Perto das 11h, o movimento cai. Julia confere o horário e começa a guardar as coisas. A gerente nota sua eficiência e dá um elogio discreto." }
        ],
        effects: { energia: +20, dor: -10 },
        next: "fim_trabalho"
    },

    trabalho_crente: {
        bg: "quero_quero",
        time: "09:00",
        dialogs: [
            { speaker: "Julia", text: "Olha, essa ferramenta tem garantia estendida! É a segurança de que você não vai ficar na mão quando mais precisar! Leve também o nosso consórcio!" },
            { speaker: "Narrador", text: "O cliente fica convencido pelo entusiasmo dela e resolve levar o pacote de serviços completo." },
            { speaker: "Narrador", text: "Julia bate a meta de vendas da manhã antes das 10h. O esforço pesou nas costas, mas a gerente até parabenizou e prometeu um bônus no próximo mês!" }
        ],
        effects: { energia: -20, dor: +15 },
        next: "fim_trabalho"
    },

    trabalho_organizar: {
        bg: "quero_quero",
        time: "09:30",
        dialogs: [
            { speaker: "Julia", text: "Vou aproveitar que tá calmo pra organizar esse setor de ferramentas. Tudo fora do lugar." },
            { speaker: "Narrador", text: "Julia passa a manhã organizando martelos, alicates e chaves com cuidado meticuloso. Cada ferramenta no seu lugar, por ordem de tamanho." },
            { speaker: "Narrador", text: "O trabalho repetitivo acalma a mente, e as costas agradecem por não ter que carregar peso. O setor ficou perfeito, facilitando o trabalho dos colegas." }
        ],
        effects: { energia: +15, dor: -25 },
        next: "fim_trabalho"
    },

    fim_trabalho: {
        bg: "quero_quero",
        time: "11:00",
        dialogs: [
            {
                speaker: "Narrador",
                text: "Turno da manhã encerrado. Julia bate o ponto, pega a mochila e sai pela porta da frente com a cabeça já no almoço.",
                conditional: [
                    {
                        cond: () => dorJulia > 50,
                        text: "Turno encerrado. Julia bate o ponto com a lombar reclamando de cada passo até o ponto de ônibus."
                    },
                    {
                        cond: () => energiaJulia < 40,
                        text: "Turno encerrado. Julia sai arrastando os pés. Ainda tem a aula à tarde — precisa comer alguma coisa rápido."
                    }
                ]
            }
        ],
        choices: [
            { text: "Comer um kalzone no centro.", target: "almoco_kalzone" },
            { text: "Não comer nada para economizar.", target: "almoco_economizar" },
            { text: "Ir pra praça pintar bob goodies.", target: "almoco_praca" }
        ]
    },

    almoco: {
        bg: "centro",
        time: "12:00",
        dialogs: [
            {
                speaker: "Narrador",
                text: "Com o turno encerrado, Julia tem uma hora e meia antes da aula. Ela decide comer alguma coisa no centro.",
                conditional: [
                    {
                        cond: () => energiaJulia < 40,
                        text: "Com o turno encerrado, Julia arrasta os pés pelo calçadão. Precisa comer algo antes de desabar na cadeira do Senac."
                    }
                ]
            },
            { speaker: "Julia", text: "Um caldo de cana e um pastel de queijo. Esse é o plano." },
            { speaker: "Narrador", text: "Ela senta numa mesa de plástico na beira da calçada, descansa os pés e recarrega as energias antes de pegar o ônibus pro Senac." }
        ],
        effects: { energia: +15, dor: -10 },
        next: "senac_inicio"
    },

    almoco_kalzone: {
        bg: "kalzone",
        time: "12:00",
        dialogs: [
            { speaker: "Narrador", text: "Julia vai até a pizzaria do centro. O kalzone tá delicioso e quentinho." },
            { speaker: "Narrador", text: "De repente, ela ouve uma voz familiar atrás dela." },
            { speaker: "Ruan", text: "Princesa! Que coincidência te ver aqui! Tava passando e resolvi dar uma olhada.", char: "ruan" },
            { speaker: "Julia", text: "Ruan! Que surpresa linda! Tava só comendo um kalzone antes da aula." },
            { speaker: "Ruan", text: "Deixa eu te pagar, amor. Você merece depois de trabalhar tanto.", char: "ruan" },
            { speaker: "Narrador", text: "Ruan paga o kalzone e dá um beijo na testa da Ju. Ela vai pro Senac com o coração quentinho." }
        ],
        effects: { energia: +25, dor: -15, hearts: { ruan: +1 } },
        next: "senac_inicio"
    },

    almoco_economizar: {
        bg: "centro",
        time: "12:00",
        dialogs: [
            { speaker: "Narrador", text: "Julia decide não gastar dinheiro com almoço. O bolso tá apertado esse mês." },
            { speaker: "Julia", text: "Vou aguentar até chegar em casa. Já tomei café da manhã, dá pra passar." },
            { speaker: "Narrador", text: "Ela caminha até o ponto de ônibus com o estômago roncando e tonturas de fome. A cabeça começa a doer de tanto tempo sem comer." }
        ],
        effects: { energia: -20, dor: +10 },
        next: "senac_inicio"
    },

    almoco_praca: {
        bg: "praca",
        time: "12:00",
        dialogs: [
            { speaker: "Narrador", text: "Julia decide ir pra praça. Ela leva o kit de pintura e começa a fazer bob goodies." },
            { speaker: "Julia", text: "Nada melhor que pintar pra relaxar depois de um turno chato." },
            { speaker: "Narrador", text: "De repente, alguém passa de skate pela praça com uma mochila nas costas." },
            { speaker: "Enrique", text: "Epa. Ju? Pintando um bob goodies?", char: "enrique" },
            { speaker: "Julia", text: "Enrique! Sabia que era tu pelo barulho de skate." },
            { speaker: "Enrique", text: "Ah, é... peço perdão pelo incômodo.", char: "enrique" },
            { speaker: "Narrador", text: "Enrique pega o skate na mão e fica olhando os bob goodies da Ju por um instante antes de continuar." },
            { speaker: "Enrique", text: "Ficaram bem legais. Gostei das cores, tá de parabéns.", char: "enrique" },
            { speaker: "Narrador", text: "Julia vai pro Senac sentindo-se inspirada e criativa." }
        ],
        effects: { energia: +15, dor: -10, hearts: { enrique: +1 } },
        next: "senac_inicio"
    },

    // ================= SENAC =================
    senac_inicio: {
        bg: "senac_aula",
        time: "13:30",
        dialogs: [
            { 
                speaker: "Narrador", 
                text: "Julia chega na sala do Senac correndo e se joga na cadeira da ponta. O ar condicionado congelante bate direto nas suas costas.",
                conditional: [
                    {
                        cond: () => energiaJulia < 45,
                        text: "Julia senta na cadeira com o olhar cansado. Os rapazes reparam que ela parece bem exausta hoje."
                    },
                    {
                        cond: () => dorJulia > 55,
                        text: "Julia senta soltando um suspiro de dor nas costas. Otávio e Enrique comentam que ela precisa de um descanso urgente."
                    },
                    {
                        cond: () => energiaJulia >= 80 && dorJulia <= 25,
                        text: "Julia senta com uma boa postura e parece disposta. Os rapazes comentam que hoje ela parece descansada."
                    }
                ]
            },
            { 
                speaker: "Julia", 
                text: "Oi, gente... Quase não cheguei a tempo hoje.",
                conditional: [
                    {
                        cond: () => energiaJulia >= 90 && dorJulia <= 15,
                        text: "Oi, gente! Nossa, hoje o dia na trabalho rendeu, mas ainda estou inteira e com foco total para programar!"
                    },
                    {
                        cond: () => energiaJulia < 45,
                        text: "Oi, gente... Se eu deitar a cabeça no teclado aqui, me acordem se o professor olhar."
                    },
                    {
                        cond: () => dorJulia > 45,
                        text: "Oi, pessoal... Ficar em pé naquela loja acabou com a minha coluna hoje. Não consigo nem sentar direito."
                    }
                ]
            }
        ],
        next: "senac_opcoes_genericas"
    },

    senac_casaco: {
        bg: "senac_aula",
        time: "13:40",
        dialogs: [], // Dinâmico para falar sobre a roupa dela e oferta do casaco
        choices: [
            { text: "Aceitar o casaco do Enrique e agradecer baixinho.", target: "ato1_casaco_enrique" },
            { text: "Recusar o casaco e tentar aguentar firme.", target: "ato1_recusar_casaco" }
        ]
    },

    senac_opcoes_genericas: {
        bg: "senac_aula",
        time: "13:45",
        dialogs: [],
        choices: [
            { text: "Pedir ajuda com JavaScript pra Enrique e Otávio.", target: "ato1_dormir" },
            { text: "Reclamar de dor nas costas e cansaço.", target: "ato1_dor" },
            { text: "Puxar assunto com Enrique e Otávio.", target: "ato1_conversar", reqEnergyMin: 40 }
        ]
    },

    ato1_casaco_enrique: {
        bg: "senac_aula",
        time: "13:45",
        dialogs: [
            { speaker: "Julia", text: "Tá... eu aceito. Minha dignidade já ficou na rua junto com a água da chuva.", chars: ["julia", "enrique"] },
            { speaker: "Enrique", text: "Casaco entregue. Temperatura corporal preservada. Risco de virar picolé reduzido em 73%.", chars: ["julia", "enrique"] },
            { speaker: "Julia", text: "Obrigada. E por favor ignora o barulho do meu jeans tentando virar papelão.", chars: ["julia", "enrique"] },
            { speaker: "Narrador", text: "Julia veste o casaco seco por cima da roupa úmida. Enrique finge olhar pro monitor, mas fica claramente satisfeito por ter ajudado.", chars: ["julia", "enrique"] }
        ],
        effects: { energia: +10, dor: -10, hearts: { enrique: +1 } },
        next: "senac_opcoes_genericas"
    },

    ato1_recusar_casaco: {
        bg: "senac_aula",
        time: "13:45",
        dialogs: [
            { speaker: "Julia", text: "Obrigada, mas vou tentar aguentar. Se eu pegar teu casaco, você vira estátua de gelo.", chars: ["julia", "enrique"] },
            { speaker: "Enrique", text: "Decisão altruísta registrada. Discordo, mas respeito.", chars: ["julia", "enrique"] },
            { speaker: "Narrador", text: "Julia passa os primeiros minutos da aula abraçada na própria mochila, esperando o ar condicionado desistir dela." }
        ],
        effects: { energia: -5, dor: +5 },
        next: "senac_opcoes_genericas"
    },

    ato1_dormir: {
        bg: "senac_aula",
        time: "13:50",
        dialogs: [
            { speaker: "Julia", text: "Meninos, socorro! Não tô entendendo esse loop de JavaScript da aula de hoje." },
            { speaker: "Enrique", text: "Julia, isso é básico. É bem fácil... *(Percebe o olhar raivoso da Julia)* Tá... nem tão fácil assim.", chars: ["julia", "enrique"] },
            { speaker: "Julia", text: "Mas eu coloquei o `i < 10`..." },
            { speaker: "Enrique", text: "E qual o valor inicial do `i`? Zero? Um? Você tá achando que o JavaScript adivinha? *(faz cara de julgamento)*", chars: ["julia", "enrique"] },
            { speaker: "Julia", text: "*(Cara de quem tá errada)* Ah... eu esqueci de declarar..." },
            { speaker: "Enrique", text: "Exatamente. Agora tenta de novo. *(pausa dramática)*... Brincadeira, você tá certa. Só faltava o `let i = 0`.", chars: ["julia", "enrique"] },
            { speaker: "Julia", text: "ENRIQUE! Você me fez pensar que eu era burra!", chars: ["julia", "enrique"] },
            { speaker: "Enrique", text: "É que sua cara de confusão é muito engraçada. Mas você tá certa, parabéns.", chars: ["julia", "enrique"] },
            { speaker: "Otávio", text: "Ju, segura minha mão, eu te projejo dele!", chars: ["julia", "enrique", "otavio"] }
        ],
        effects: { energia: +10, dor: -10, hearts: { enrique: +1, otavio: +1 } },
        next: "ato2_inicio"
    },

    ato1_dor: {
        bg: "senac_aula",
        time: "14:00",
        dialogs: [
            { speaker: "Julia", text: "Ai... minhas costelas. Acho que o Senac compra cadeiras projetadas por torturadores." },
            { speaker: "Otávio", text: "Calma! Não temas! Vou fazer uma oração pelas suas vértebras agora mesmo!", chars: ["julia", "otavio"] },
            { speaker: "Otávio", text: "*(Coloca a mão perto do ombro da Ju)* Senhor, alivia essa dor nas costas da nossa irmã Julia e dá força pra ela aguentar a aula!", chars: ["julia", "otavio"] },
            { speaker: "Enrique", text: "Amém. Mas se a oração falhar, eu tenho um remédio no bolso. Só não sei se ta na válidade. Quer?", chars: ["julia", "enrique"] },
            { speaker: "Julia", text: "Gente, eu só queria uma almofada..." }
        ],
        effects: { energia: -10, dor: -30, hearts: { otavio: +1 } },
        next: "ato2_inicio"
    },

    ato1_conversar: {
        bg: "senac_aula",
        time: "14:10",
        dialogs: [
            { speaker: "Julia", text: "Meninos, tá frio pra caraca hoje. Tá comendo meus seios de frio." },
            { speaker: "Enrique", text: "Espera... minha namorada nunca reclamou disso. Será que é só você?", chars: ["julia", "enrique"] },
            { speaker: "Otávio", text: "Não não, minha mãe sempre reclamava disso. É coisa de mulher mesmo.", chars: ["enrique", "otavio"] },
            { speaker: "Enrique", text: "Nunca reparei nos seios da minha mãe... *(silêncio constrangedor)*... Eu quis dizer, nunca reparei que ela reclamava disso.", chars: ["enrique", "otavio"] },
            { speaker: "Julia", text: "*(Olhar de tacho)* Enrique... vou fingir que não ouvi isso." }
        ],
        effects: { energia: -5, dor: 0, hearts: { enrique: +1, otavio: +1 } },
        next: "ato2_inicio"
    },

    // ================= ATO 2 =================
    ato2_inicio: {
        bg: "cantina",
        time: "15:30",
        dialogs: [
            { 
                speaker: "Narrador", 
                text: "O sinal toca: hora do intervalo! O trio desce para a cantina do Senac.",
                conditional: [
                    {
                        cond: () => energiaJulia < 35,
                        text: "O sinal do intervalo toca. Julia arrasta os pés como se estivesse andando sob gravidade dupla. A cantina parece a linha de chegada de uma maratona."
                    },
                    {
                        cond: () => dorJulia > 50,
                        text: "Julia desce os degraus da escada segurando firme no corrimão e soltando reclamações audíveis a cada pisada."
                    }
                ]
            },
            { speaker: "Narrador", text: "Otávio, para não gastar os 8 reais cobrados por um pão de queijo murcho, puxa sua garrafa térmica de inox com café passado em casa." },
            { speaker: "Otávio", text: "Glória! Café fresquinho! Quem quer poupar o bolso e alimentar a alma?", char: "otavio" }
        ],
        choices: [
            { text: "Aceitar o café caseiro do Otávio.", target: "ato2_cafe" },
            { text: "Forçar Enrique a aceitar um pedaço do seu salgado.", target: "ato2_salgado" },
            { text: "Dar uma volta no calçadão pra comer um Kalzone.", target: "ato2_centro", reqPainMax: 40 }
        ]
    },

    ato2_cafe: {
        bg: "cantina",
        time: "15:40",
        dialogs: [
            { speaker: "Julia", text: "Me serve um copo, Otávio. Meu estoque de cafeína zerou." },
            { speaker: "Otávio", text: "*(Serve o café com um sorriso radiante)* Aqui tá! Café fresquinho!", char: "otavio" },
            { speaker: "Enrique", text: "Esse café tá forte demais. Mas eu tá de boa, da pra aguentar.", char: "enrique" },
            { speaker: "Julia", text: "Eu queria ser assim. Tô sempre ansiosa por tudo, até por coisas que nem aconteceram ainda." },
            { speaker: "Otávio", text: "Eu também fico meio ansioso às vezes, mas a fé me acalma. Basta orar e respirar.", char: "otavio" },
            { speaker: "Enrique", text: "Às vezes ser de boa demais é ruim.", char: "enrique" },
            { speaker: "Julia", text: "Pelo menos você não sofre antecipadamente como eu. Minha ansiedade tá sempre no futuro." },
            { speaker: "Narrador", text: "O café tá forte o suficiente pra derreter chumbo, mas a conversa sobre ansiedade deixa a Ju mais leve." },
        ],
        effects: { energia: +35, dor: -5, hearts: { otavio: +1 } },
        next: "ato3_inicio"
    },

    ato2_salgado: {
        bg: "cantina",
        time: "15:45",
        dialogs: [
            { speaker: "Julia", text: "Enrique, deve ta cansado por ter vindo de skate, quer um pedaço?" },
            { speaker: "Enrique", text: "Não, obrigado Ju. Eu já comi antes de vir.", char: "enrique" },
            { speaker: "Julia", text: "*(Olhar sério)* Enrique... PEGA O SALGADO." },
            { speaker: "Enrique", text: "*(Pega a esfiha imediatamente)* Tá bom, tá bom. Até que tô com um pouco de fome.", char: "enrique" },
            { speaker: "Otávio", text: "Misericórdia! Hahaha", char: "otavio" },
            { speaker: "Enrique", text: "A cara de raiva da Ju é meio assustadora. Fica difícil de recusar.", char: "enrique" }
        ],
        effects: { energia: +10, dor: 0, hearts: { enrique: +1 } },
        next: "ato3_inicio"
    },

    ato2_centro: {
        bg: "kalzone",
        time: "15:50",
        dialogs: [
            { speaker: "Narrador", text: "Eles decidem dar uma volta no calçadão pra comer um Kalzone." },
            { speaker: "Julia", text: "Se eu não comer algo salgado agora, eu vou ter um treco." },
            { speaker: "Enrique", text: "É uma caminhada longa, mas o Kalzone vale a pena.", char: "enrique" },
            { speaker: "Otávio", text: "Glória! Vamos abençoar essa comida sagrada!", char: "otavio" },
            { speaker: "Enrique", text: "Eu passo. To morrendo de fome, quero comer logo.", char: "enrique" },
            { speaker: "Otávio", text: "Misericórdia! Vocês são uns pagões...", char: "otavio" },
            { speaker: "Narrador", text: "Eles comem o Kalzone correndo pra dar tempo de voltar antes do fim do intervalo. Julia se sente revigorada e a amizade do trio se fortalece." }
        ],
        effects: { energia: +25, dor: -15, hearts: { enrique: +1, otavio: +1 } },
        next: "ato3_inicio"
    },

    // ================= ATO 3 =================
    ato3_inicio: {
        bg: "senac_aula",
        time: "17:30",
        dialogs: [
            { speaker: "Narrador", text: "Fim da aula! A turma se dispersa e o cansaço do dia bate com força total." },
            { 
                speaker: "Narrador", 
                text: "O grupo sai pelo portão principal do Senac. Agora é a hora de decidir o rumo da noite da Julia.",
                conditional: [
                    {
                        cond: () => dorJulia > 65,
                        text: "Julia caminha de forma visivelmente torta, com as mãos nas costas, jurando que o Senac achatou suas vértebras."
                    },
                    {
                        cond: () => energiaJulia < 35,
                        text: "Julia mal consegue manter os olhos abertos e fala em frases de duas palavras de tão cansada."
                    }
                ]
            }
        ],
        choices: [
            { text: "Ir pra parada de ônibus com o Enrique.", target: "ato3_parada" },
            { text: "Encontro Romântico com o Ruan.", target: "ato3_ruan", reqEnergyMin: 50 },
            { text: "Chamar a galera pro Oponente!", target: "ato3_bar", reqHearts: { enrique: 2, otavio: 2 }, reqEnergyMin: 45, reqPainMax: 50 }
        ]
    },

    ato3_parada: {
        bg: "parada",
        time: "17:45",
        dialogs: [
            { speaker: "Narrador", text: "Julia caminha até a parada de ônibus sob o céu do fim de tarde. Enrique vai ao lado dela em silêncio confortável." },
            { speaker: "Julia", text: "Obrigada por me acompanhar, Enrique." },
            { speaker: "Enrique", text: "Tá tranquilo.", char: "enrique" },
            { speaker: "Narrador", text: "O ônibus chega. Enrique acena levemente com a cabeça e Julia entra no ônibus." }
        ],
        effects: { energia: -10, dor: +10 },
        next: "ato4_inicio"
    },

    ato3_ruan: {
        bg: "centro",
        time: "18:15",
        dialogs: [
            { speaker: "Narrador", text: "Julia decide ir direto ao centro. De repente, encostado num poste com visual descolado, tá Ruan, o namorado." },
            { speaker: "Ruan", text: "Oi, minha princesa! Sabia que você ia sair cansada hoje, então vim te buscar.", char: "ruan" },
            { speaker: "Narrador", text: "Ele tira de trás das costas uma Skol Beats vermelha trincando de gelada e um pacotinho de fini de banana." },
            { speaker: "Julia", text: "Meu Deus, Ruan! Você é um anjo na minha vida!" },
            { speaker: "Ruan", text: "Faria tudo por você, meu amor. Deixa eu levar sua mochila pesada, vem cá.", char: "ruan" },
            { speaker: "Narrador", text: "Julia ganha um cafuné maravilhoso e vai caminhando abraçada com o namorado perfeito." }
        ],
        effects: { energia: +40, dor: -30 },
        next: "ato4_inicio"
    },

    ato3_bar: {
        bg: "oponente_bar",
        time: "19:00",
        dialogs: [
            { speaker: "Narrador", text: "Eles chegam no Oponente. O lugar tá barulhento, mas o grupo pega uma mesa de sinuca." },
            { speaker: "Otávio", text: "Vou aplicar as leis da física sagrada nessa bola 8! *(tacada bizarra que encaçapa duas bolas impossíveis)*", char: "otavio" },
            { speaker: "Enrique", text: "Minha vez... *(tacada que erra completamente e a bola nem se mexe)*... A mesa tá torta.", char: "enrique" },
            { speaker: "Julia", text: "Deixa eu ver. *(encaçapa 4 bolas seguidas com facilidade)* Tá vendo? É só ângulo.", chars: ["julia", "enrique", "otavio"] },
            { speaker: "Narrador", text: "Julia domina a mesa enquanto Enrique finge que tá estudando a física da sinuca pra disfarçar que é péssimo." }
        ],
        effects: { energia: -10, dor: +10, hearts: { enrique: +1, otavio: +1 } },
        choices: [
            { text: "Ir pro Tributo depois do bar!", target: "ato3_festa", reqEnergyMin: 50, reqPainMax: 55 },
            { text: "Já basta por hoje. Ir pra casa depois do bar.", target: "ato4_inicio" }
        ]
    },

    ato3_festa: {
        bg: "tributo_festa",
        time: "21:00",
        dialogs: [
            { speaker: "Narrador", text: "Depois do bar, os três caminham até o Tributo. O som já bate lá de longe." },
            { speaker: "Otávio", text: "Glória! Que abençoada essa noite!", char: "otavio" },
            { speaker: "Enrique", text: "O volume tá 40% acima do recomendável. Mesmo assim... agradável.", char: "enrique" },
            { speaker: "Narrador", text: "Julia dança, ri e esquece por algumas horas que deve trabalhar cedo no dia seguinte." }
        ],
        effects: { energia: -15, dor: +15, hearts: { enrique: +1, otavio: +1 } },
        next: "ato4_inicio"
    },

    ato3_role_amarelou: {
        bg: "oponente_bar",
        time: "19:00",
        dialogs: [
            { speaker: "Narrador", text: "Julia tenta organizar o rolê no Oponente com a galera..." },
            { speaker: "Narrador", text: "Mas Enrique prefere ficar em casa jogando xadrez contra o computador, e Otávio tem um culto urgente pra ir." },
            { speaker: "Narrador", text: "Ambos amarelaram porque Julia não juntou corações suficientes com a dupla hoje. Mas nem tudo tá perdido..." },
            { speaker: "Ruan", text: "Seus amigos são uns bundões, amor! Mas eu tô aqui. Vamos nós dois tomar uma caipirinha e jogar sinuca juntinhos?", char: "ruan" },
            { speaker: "Julia", text: "Ruan! Você é o melhor namorado do mundo! Vamos sim!", chars: ["julia", "ruan"] },
            { speaker: "Narrador", text: "Eles chegam no Oponente. O lugar tá barulhento, mas o casal pega uma mesa de sinuca." },
            { speaker: "Ruan", text: "Vou te ensinar a jogar sinuca, princesa. É fácil, você vai ver!", char: "ruan" },
            { speaker: "Julia", text: "Tô pronta pra aprender! *(sorri)*", chars: ["julia", "ruan"] },
            { speaker: "Narrador", text: "Ruan ensina a Ju com paciência, e ela aprende rápido. Eles jogam várias partidas, rindo e se divertindo." },
            { speaker: "Ruan", text: "Você tá ficando boa nisso, amor! Quer ir pro Tributo depois?", char: "ruan" },
            { speaker: "Julia", text: "Quero! Vamos dançar!", chars: ["julia", "ruan"] }
        ],
        effects: { energia: +10, dor: -10 },
        next: "ato3_role_amarelou_tributo"
    },

    ato3_role_amarelou_tributo: {
        bg: "tributo_festa",
        time: "21:00",
        dialogs: [
            { speaker: "Narrador", text: "Depois do bar, os dois caminham até o Tributo. O som já bate lá de longe." },
            { speaker: "Ruan", text: "Vamos dançar, minha princesa!", char: "ruan" },
            { speaker: "Julia", text: "Vamos! *(puxa Ruan pra pista de dança)*", chars: ["julia", "ruan"] },
            { speaker: "Narrador", text: "Julia dança, ri e esquece por algumas horas que deve trabalhar cedo no dia seguinte. A melhor noite do dia." },
            { speaker: "Ruan", text: "Você tá linda quando dança, sabia?", char: "ruan" },
            { speaker: "Julia", text: "Ruan... *(se encosta nele)* Você é perfeito.", chars: ["julia", "ruan"] },
            { speaker: "Narrador", text: "Julia acaba tendo uma noite super divertida e romântica só com o Ruan!" }
        ],
        effects: { energia: -15, dor: +15 },
        next: "ato4_inicio"
    },

    // ================= ATO 4 =================
    ato4_inicio: {
        bg: "casa_julia",
        time: "21:30",
        dialogs: [
            { 
                speaker: "Narrador", 
                text: "Finalmente em casa. Julia se joga na cama.",
                conditional: [
                    {
                        cond: () => energiaJulia < 30,
                        text: "Finalmente em casa. Julia cai na cama feito uma tábua de madeira. Seu cérebro está prestes a entrar em hibernação forçada automática."
                    },
                    {
                        cond: () => dorJulia > 65,
                        text: "Finalmente em casa. Julia deita de barriga para cima soltando um gemido prolongado, procurando desesperadamente qualquer pomada ou remédio pras costas."
                    }
                ]
            },
            { speaker: "Narrador", text: "A grande viagem tá chegando em breve. Ela precisa decidir o que fazer antes de apagar." }
        ],
        choices: [
            { text: "Responder as mensagens de Ruan no WhatsApp.", target: "ato4_ruan_chat" },
            { text: "Ver as mensagens no grupo do Senac.", target: "ato4_grupo_chat" },
            { text: "Tomar banho quente, fazer alongamento e ignorar o mundo.", target: "ato4_descanso" }
        ]
    },

    ato4_ruan_chat: {
        bg: "casa_julia",
        time: "21:40",
        dialogs: [
            { speaker: "Narrador", text: "Julia abre o WhatsApp para falar com seu namorado querido." }
        ],
        effects: { energia: +15, dor: -20 },
        isChat: true,
        chatPartner: "ruan"
    },

    ato4_grupo_chat: {
        bg: "casa_julia",
        time: "21:45",
        dialogs: [
            { speaker: "Narrador", text: "Julia abre o grupo do Senac para rir das bobagens dos meninos." }
        ],
        effects: { energia: +10, dor: -10, hearts: { enrique: +1, otavio: +1 } },
        isChat: true,
        chatPartner: "grupo"
    },

    ato4_descanso: {
        bg: "casa_julia",
        time: "22:00",
        dialogs: [
            { speaker: "Julia", text: "Se eu apagar agora, acordo de madrugada sem saber nem em que ano tô. Vou tentar ser adulta por quinze minutos." },
            { speaker: "Narrador", text: "Julia toma um banho quente, faz dois alongamentos tortos e encosta uma bolsa morna nas costas." },
            { speaker: "Narrador", text: "O corpo não fica novo, mas para de reclamar em caixa alta. Pela primeira vez no dia, o quarto parece silencioso." }
        ],
        effects: { energia: +25, dor: -35 },
        next: "fim_dia"
    },

    fim_dia: {
        bg: "casa_julia",
        time: "23:00",
        dialogs: [
            { speaker: "Narrador", text: "Julia finalmente deita na cama. A luz tá apagada." },
            { speaker: "Julia", text: "Cabo... o dia foi longo, mas valeu a pena. Amanhã começa a aventura." },
        ],
        next: "fim_jogo"
    },

    go_victory_dormir: {
        bg: "casa_julia",
        time: "23:05",
        dialogs: [
            { speaker: "Narrador", text: "Julia fecha os olhos e adormece quase instantaneamente. O sono profundo recupera as energias dela." }
        ],
        effects: { energia: +20, dor: -15 },
        next: "fim_jogo"
    },

    go_victory_mentalizar: {
        bg: "casa_julia",
        time: "23:10",
        dialogs: [
            { speaker: "Narrador", text: "Julia mentaliza cada detalhe da viagem que tá por vir. A ansiedade positiva diminui a dor física." }
        ],
        effects: { energia: +10, dor: -25 },
        next: "fim_jogo"
    },

    go_victory_apagar: {
        bg: "casa_julia",
        time: "23:00",
        dialogs: [
            { speaker: "Narrador", text: "Julia apaga o abajur e se entrega à escuridão. O descanso é imediato e reparador." }
        ],
        effects: { energia: +15, dor: -20 },
        next: "fim_jogo"
    },

    fim_jogo: {
        bg: "casa_julia",
        time: "23:30",
        dialogs: [
            { speaker: "Narrador", text: "A escuridão abraça Julia gentilmente. O dia foi longo, cheio de decisões, consequências e momentos especiais." },
            { speaker: "Narrador", text: "Amanhã começa a grande aventura da viagem. Mas por agora..." },
            { speaker: "Narrador", text: "Boa noite, Ju." }
        ],
        next: "show_goodnight_screen"
    },
};

// Diálogos de Chat do WhatsApp (Ato 4)
const ChatScripts = {
    ruan: [
        { author: "Ruan", text: "Amor? Já chegou em casa?", time: "21:32" },
        { author: "Ruan", text: "Tô com saudades já... 🥺", time: "21:32" },
        { author: "Julia", text: "Cheguei sim lindo, acabei de deitar!", time: "21:33" },
        { author: "Ruan", text: "Que bom meu amor! Queria estar aí pra te fazer uma massagem nas costas e te dar muito cafuné.", time: "21:34" },
        { author: "Ruan", text: "Sonha comigo tá? Te amo infinitamente! ❤️", time: "21:34", sticker: "love" }
    ],
    grupo: [
        { author: "Otávio", text: "Irmãos, quem fez o exercício 3 de lógica? O meu deu erro na linha 666, repreendi na hora!", time: "21:30" },
        { author: "Enrique", text: "O meu rodou. O segredo é não forçar a entrada de dados. Se o compilador estiver calmo, tudo entra no fluxo natural.", time: "21:31" },
        { author: "Otávio", text: "Misericórdia Enrique! Vigia com essas palavras!", time: "21:32", sticker: "sticker_vigia" },
        { author: "Enrique", text: "Estou falando de fluxo de dados assíncronos. Você que é obcecado por pecados digitais.", time: "21:33" },
        { author: "Julia", text: "Vocês dois não existem kkkkkk vou sentir falta disso na viagem", time: "21:34" },
        { author: "Otávio", text: "Vá em paz, irmã Ju! Traremos café da cantina na sua volta (mentira, tá muito caro)", time: "21:35" }
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
    document.getElementById('img-julia').src = ASSETS.sprites.julia_pijama;
    document.getElementById('img-enrique').src = ASSETS.sprites.enrique_zen;
    document.getElementById('img-otavio').src = ASSETS.sprites.otavio_crente;
    document.getElementById('img-ruan').src = ASSETS.sprites.ruan_namorado;
}

// Função para determinar qual sprite da Julia usar baseado no contexto
function getJuliaSprite(nodeKey) {
    // Se está em um nó de trabalho na Quero-Quero, usa uniforme
    const trabalhoNodes = ['ir_trabalho', 'trabalho_zen', 'trabalho_crente', 'trabalho_organizar', 'fim_trabalho'];
    if (trabalhoNodes.includes(nodeKey)) {
        return 'julia_uniforme';
    }

    // Se não está em trabalho, usa o sprite baseado na roupa escolhida
    if (roupaEscolhida === 'moletom') {
        return 'julia_moletom';
    } else if (roupaEscolhida === 'leve') {
        return 'julia_leve';
    } else if (roupaEscolhida === 'capa') {
        return 'julia_capa';
    }

    // Se não escolheu roupa ainda, usa pijama
    return 'julia_pijama';
}

// Função para atualizar o sprite da Julia dinamicamente
function updateJuliaSprite(nodeKey) {
    const spriteKey = getJuliaSprite(nodeKey);
    const imgJulia = document.getElementById('img-julia');
    if (imgJulia && ASSETS.sprites[spriteKey]) {
        imgJulia.src = ASSETS.sprites[spriteKey];
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
        enrique: 0,
        otavio: 0,
        ruan: 5
    };
    roupaEscolhida = "";
    lastTime = "05:30";

    // Gerar Energia aleatória entre 70% e 100%
    energiaJulia = Math.floor(Math.random() * (100 - 70 + 1)) + 70;
    // Gerar Dor aleatória entre 0% e 50%
    dorJulia = Math.floor(Math.random() * (50 - 0 + 1)) + 0;

    dialogHistory = [];

    // Gerar Clima Aleatório
    const climas = ["frio", "chuva", "calor"];
    climaDoDia = climas[Math.floor(Math.random() * climas.length)];

    // Configurar diálogos iniciais de clima dinamicamente
    setupClimaDialogs();

    updateHUD();
    switchScreen('screen-game');
    loadNode('inicio');
}

function setupClimaDialogs() {
    // 1. Configura a tela de checar_clima
    const checarClima = StoryNodes.checar_clima;
    if (climaDoDia === "frio") {
        checarClima.dialogs = [
            { speaker: "Narrador", text: "O minuano sopra forte lá fora. O termômetro acusa o frio típico de Pelotas logo nas primeiras horas do dia." },
            { speaker: "Julia", text: "Minhas costelas já doem só de olhar pela janela. Esse vento de Pelotas não perdoa ninguém às 5h da manhã." }
        ];
    } else if (climaDoDia === "chuva") {
        checarClima.dialogs = [
            { speaker: "Narrador", text: "As nuvens estão pretas e o barulho de água batendo no telhado avisa: é chuva de alagar a rua principal." },
            { speaker: "Julia", text: "Que ótimo... se eu sair sem proteção vou parecer um pinto molhado quando chegar lá." }
        ];
    } else {
        checarClima.dialogs = [
            { speaker: "Narrador", text: "O sol nasceu forte e o mormaço avisa que hoje vai ser um calor de derreter o asfalto." },
            { speaker: "Julia", text: "Calor logo cedo? Minha maquiagem não vai durar nem até o meio-dia na loja." }
        ];
    }

    const rMoletom = StoryNodes.roupa_moletom;
    const rLeve = StoryNodes.roupa_leve;
    const rCapa = StoryNodes.roupa_capa;

    if (climaDoDia === "frio") {
        rMoletom.dialogs = [
            { speaker: "Narrador", text: "Julia veste o moletom felpudo super confortável. Ela se sente quentinha e protegida." },
            { speaker: "Julia", text: "Quentinha e confortável. A dor nas costas continua, mas pelo menos não morro congelada." }
        ];
        rMoletom.effects = { energia: +15, dor: -15 };

        rLeve.dialogs = [
            { speaker: "Narrador", text: "Julia decide usar a blusa leve. Assim que abre a porta da frente, o vento frio entra batendo direto nos ossos." },
            { speaker: "Julia", text: "*(Tremendo de frio)* Que ideia ruim... mas a blusa é bonita, pelo menos." }
        ];
        rLeve.effects = { energia: -20, dor: +20 };

        rCapa.dialogs = [
            { speaker: "Narrador", text: "Julia coloca a capa de chuva pesada por cima. Não tá chovendo, apenas frio." },
            { speaker: "Julia", text: "Ficou um pouco estranho e meio abafado, mas protegeu do vento frio." }
        ];
        rCapa.effects = { energia: +5, dor: -5 };
    } else if (climaDoDia === "chuva") {
        rMoletom.dialogs = [
            { speaker: "Narrador", text: "Julia coloca o moletom gigante. Ao sair na chuva, o tecido de algodão começa a absorver a água como uma esponja." },
            { speaker: "Julia", text: "Tô molhada, pesada e com frio. Devia ter pego uma capa." }
        ];
        rMoletom.effects = { energia: -15, dor: +15 };

        rLeve.dialogs = [
            { speaker: "Narrador", text: "Julia vai de roupa leve. A chuva molha seus braços e o vento gela seu corpo." },
            { speaker: "Julia", text: "Que arrependimento, o dia mal começou e já tô ensopada..." }
        ];
        rLeve.effects = { energia: -25, dor: +25 };

        rCapa.dialogs = [
            { speaker: "Narrador", text: "Julia veste a capa de chuva amarela e as galochas. A água bate nela e escorre direto." },
            { speaker: "Julia", text: "Capa de chuva devidamente colocada! Podem vir as poças d'água da rua!" }
        ];
        rCapa.effects = { energia: +20, dor: -15 };
    } else { // calor
        rMoletom.dialogs = [
            { speaker: "Narrador", text: "Julia insiste no moletom felpudo. Em menos de cinco minutos de caminhada sob o sol quente, ela começa a cozinhar." },
            { speaker: "Julia", text: "Parece que estou dentro de uma sauna. Que calor abafado!" }
        ];
        rMoletom.effects = { energia: -25, dor: +15 };

        rLeve.dialogs = [
            { speaker: "Narrador", text: "Julia vai de blusa leve. O ventinho do calor ajuda a refrescar." },
            { speaker: "Julia", text: "Perfeito! Bem fresca para aguentar o calor das ruas hoje." }
        ];
        rLeve.effects = { energia: +20, dor: -15 };

        rCapa.dialogs = [
            { speaker: "Narrador", text: "Julia coloca a capa de chuva amarela sob um sol de 32 graus." },
            { speaker: "Julia", text: "Estou suando tanto aqui dentro da capa que criei meu próprio clima tropical úmido." }
        ];
        rCapa.effects = { energia: -20, dor: +10 };
    }
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
    if (name === 'Otávio') return 'var(--secondary)';
    if (name === 'Ruan') return '#ffb86c';
    if (name === 'Julia') return '#ff5555';
    return 'var(--text-muted)';
}

// Atualizar Informações na HUD
function updateHUD() {
    // Enrique e Otávio têm máximo de 3 corações, Ruan tem 5
    coracoes.enrique = Math.max(0, Math.min(3, coracoes.enrique));
    coracoes.otavio = Math.max(0, Math.min(3, coracoes.otavio));
    coracoes.ruan = Math.max(0, Math.min(5, coracoes.ruan));

    updateHeartMeter('score-enrique', coracoes.enrique, 3);
    updateHeartMeter('score-otavio', coracoes.otavio, 3);
    updateHeartMeter('score-ruan', coracoes.ruan, 5);
    
    // Sincroniza também os valores no drawer mobile
    updateHeartMeter('drawer-score-enrique', coracoes.enrique, 3);
    updateHeartMeter('drawer-score-otavio', coracoes.otavio, 3);
    updateHeartMeter('drawer-score-ruan', coracoes.ruan, 5);
    
    energiaJulia = Math.max(0, Math.min(100, energiaJulia));
    dorJulia = Math.max(0, Math.min(100, dorJulia));

    document.getElementById('val-energia').textContent = energiaJulia + '%';
    document.getElementById('bar-energia').style.width = energiaJulia + '%';

    document.getElementById('val-dor').textContent = dorJulia + '%';
    document.getElementById('bar-dor').style.width = dorJulia + '%';

    // Sincroniza barras do drawer mobile
    const dValEn = document.getElementById('drawer-val-energia');
    const dBarEn = document.getElementById('drawer-bar-energia');
    const dValDor = document.getElementById('drawer-val-dor');
    const dBarDor = document.getElementById('drawer-bar-dor');
    if (dValEn) dValEn.textContent = energiaJulia + '%';
    if (dBarEn) dBarEn.style.width = energiaJulia + '%';
    if (dValDor) dValDor.textContent = dorJulia + '%';
    if (dBarDor) dBarDor.style.width = dorJulia + '%';
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
            energiaJulia = Math.max(0, energiaJulia - energyLoss);
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

        const precisaDeCasaco = (climaDoDia === "chuva" && roupaEscolhida !== "capa")
            || (climaDoDia === "frio" && roupaEscolhida === "leve");
        StoryNodes.senac_inicio.next = precisaDeCasaco ? "senac_casaco" : "senac_opcoes_genericas";

        // Reseta senac_opcoes_genericas para o diálogo neutro sempre
        StoryNodes.senac_opcoes_genericas.dialogs = [
            { speaker: "Narrador", text: "Os guris a analisam de cima a baixo, analisando suas roupas." }
        ];

        // Popula o nó correto com os comentários de roupa
        const targetNode = precisaDeCasaco
            ? StoryNodes.senac_casaco
            : StoryNodes.senac_opcoes_genericas;

        // Adiciona comentários baseados em clima + roupa
        if (roupaEscolhida === "moletom") {
            if (climaDoDia === "calor") {
                targetNode.dialogs.push({ speaker: "Enrique", text: "Ju, você tá de moletom nesse mormaço de 30 graus? Lógica de casaco no sol é suspeita.", char: "enrique" });
                targetNode.dialogs.push({ speaker: "Otávio", text: "Misericórdia, Julia! Vai desidratar com esse casaco quente nesse sol!", char: "otavio" });
            } else if (climaDoDia === "chuva") {
                targetNode.dialogs.push({ speaker: "Otávio", text: "Irmã, esse moletom absorveu tanta chuva que já pode ser considerado batismo por imersão.", char: "otavio" });
            } else {
                targetNode.dialogs.push({ speaker: "Enrique", text: "Visual altamente protegido. Decisão inteligente para o frio.", char: "enrique" });
                targetNode.dialogs.push({ speaker: "Otávio", text: "Tá bem quentinha, irmã! Fica confortável!", char: "otavio" });
            }
        } else if (roupaEscolhida === "leve") {
            if (climaDoDia === "frio" || climaDoDia === "chuva") {
                targetNode.dialogs.push({ speaker: "Otávio", text: "Irmã Julia, você veio com essa roupa leve nessa ventania? Vai acabar pegando um resfriado!", char: "otavio" });
                targetNode.dialogs.push({ speaker: "Enrique", text: "A análise de probabilidade de resfriar com essa blusa leve é alta. Quer meu casaco?", char: "enrique" });
            } else {
                targetNode.dialogs.push({ speaker: "Enrique", text: "Roupa fresca e adequada para o calor do dia.", char: "enrique" });
                targetNode.dialogs.push({ speaker: "Otávio", text: "Ficou bem leve, irmã! Perfeito pra esse calor!", char: "otavio" });
            }
        } else if (roupaEscolhida === "capa") {
            if (climaDoDia === "calor") {
                targetNode.dialogs.push({ speaker: "Enrique", text: "Ju, você tá de capa de chuva amarela nesse sol limpo de calor?", char: "enrique" });
                targetNode.dialogs.push({ speaker: "Otávio", text: "Parece que vai chover bençãos, mas por enquanto só tem sol forte mesmo!", char: "otavio" });
            } else if (climaDoDia === "chuva") {
                targetNode.dialogs.push({ speaker: "Enrique", text: "Capa de chuva amarela. À prova d'água e altamente visível. Decisão segura.", char: "enrique" });
            } else {
                targetNode.dialogs.push({ speaker: "Enrique", text: "Capa de chuva no frio? Proteção extra contra o vento. Estratégico.", char: "enrique" });
                targetNode.dialogs.push({ speaker: "Otávio", text: "Tá preparada pra qualquer eventualidade climática!", char: "otavio" });
            }
        }

        if (precisaDeCasaco) {
            targetNode.dialogs.push({ speaker: "Enrique", text: "Você chegou encharcada. Eu tenho um casaco seco na mochila; pega antes que a sala congele você.", char: "enrique" });
        }

        // Aplica efeitos APÓS setupClimaDialogs (que já definiu os effects corretos)
        const roupaNode = StoryNodes[nodeKey];
        if (roupaNode?.effects) {
            energiaJulia = Math.max(0, Math.min(100, energiaJulia + (roupaNode.effects.energia || 0)));
            dorJulia = Math.max(0, Math.min(100, dorJulia + (roupaNode.effects.dor || 0)));
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

    // Atualiza o sprite da Julia baseado no contexto
    updateJuliaSprite(nodeKey);

    storyQueue = [...node.dialogs];
    queueIndex = 0;

    document.getElementById('choices-container').style.display = 'none';

    playNextDialog(node);
}

function hideAllSprites() {
    document.querySelectorAll('.character-sprite-container').forEach(sprite => {
        sprite.classList.remove('active', 'speaking', 'speaking-otavio', 'speaking-ruan', 'dimmed');
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
                energiaJulia += (currentNodeObj.effects.energia || 0);
                dorJulia += (currentNodeObj.effects.dor || 0);
                applyHeartEffects(currentNodeObj.effects.hearts);
                updateHUD();
            }
            showChoices(currentNodeObj.choices);
        } else if (currentNodeObj.next === 'show_goodnight_screen') {
            showGoodnightScreen();
        } else if (currentNodeObj.next) {
            if (currentNodeObj.effects) {
                energiaJulia += (currentNodeObj.effects.energia || 0);
                dorJulia += (currentNodeObj.effects.dor || 0);
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
        // Enrique e Otávio têm máximo de 3 corações, Ruan tem 5
        const maxHearts = (personagem === 'enrique' || personagem === 'otavio') ? 3 : 5;
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
        julia: 'julia',
        enrique: 'enrique',
        otavio: 'otavio',
        ruan: 'ruan'
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
            } else if (activeCharKey === 'otavio') {
                activeSprite.classList.add('speaking-otavio', 'bounce');
                setTimeout(() => activeSprite.classList.remove('bounce'), 500);
            } else if (activeCharKey === 'ruan') {
                activeSprite.classList.add('speaking-ruan', 'bounce');
                setTimeout(() => activeSprite.classList.remove('bounce'), 500);
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
        enrique: 'Enrique',
        otavio: 'Otávio',
        ruan: 'Ruan'
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
        if (choice.reqEnergyMin !== undefined && energiaJulia < choice.reqEnergyMin) {
            isLocked = true;
            lockReason = `Requer Energia >= ${choice.reqEnergyMin}%`;
        }

        // Requisito de Dores Máximas
        if (choice.reqPainMax !== undefined && dorJulia > choice.reqPainMax) {
            isLocked = true;
            lockReason = `Requer Dores <= ${choice.reqPainMax}%`;
        }

        if (isLocked) {
            // Se o bloqueio for por corações, não mostra como bloqueado visualmente
            if (choice.reqHearts && !hasRequiredHearts(choice.reqHearts)) {
                btn.innerHTML = `
                    <span>${choice.text}</span>
                `;
                btn.onclick = () => {
                    loadNode('ato3_role_amarelou');
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

    if (partner === 'ruan') {
        title.textContent = "Meu Amor 💖 Ruan";
        status.textContent = "online";
        // Mostrar foto do Ruan
        avatarText.style.display = 'none';
        avatarImg.src = ASSETS.sprites.ruan_namorado;
        avatarImg.style.display = 'block';
    } else {
        title.textContent = "Grupo do Senac 💻🍻";
        status.textContent = "Enrique, Otávio, Você";
        // Mostrar emoji de computador
        avatarText.style.display = 'block';
        avatarText.textContent = '💻';
        avatarImg.style.display = 'none';
    }

    nextChatStep(partner);
}

function nextChatStep(partner) {
    if (!partner) {
        const titleText = document.querySelector('.wa-chat-name').textContent;
        partner = titleText.includes('Senac') ? 'grupo' : 'ruan';
    }

    const script = ChatScripts[partner];
    const chatBody = document.getElementById('wa-chat-body');
    
    if (chatStep < script.length) {
        const msg = script[chatStep];
        const msgDiv = document.createElement('div');
        
        const isIncoming = msg.author !== 'Julia';
        msgDiv.className = `wa-msg ${isIncoming ? 'incoming' : 'outgoing'}`;
        
        let authorSpan = '';
        if (isIncoming && partner === 'grupo') {
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
        if (chatStep < script.length && script[chatStep].author === 'Julia') {
            inputText.textContent = "Tocar para responder...";
        } else {
            inputText.textContent = "Tocar para ler próximas mensagens...";
        }
    } else {
        // Pega o nó de chat ativo e aplica os efeitos
        const chatNodes = ['ato4_ruan_chat', 'ato4_grupo_chat'];
        for (const key of chatNodes) {
            const n = StoryNodes[key];
            if (n?.isChat && n?.chatPartner === partner && n?.effects) {
                energiaJulia += (n.effects.energia || 0);
                dorJulia += (n.effects.dor || 0);
                applyHeartEffects(n.effects.hearts);
                updateHUD();
                break;
            }
        }
        switchScreen('screen-game');
        loadNode('fim_dia');
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
