// ==================== HISTÓRIA DO JOGO ====================
// Este arquivo contém toda a história do jogo (StoryNodes e ChatScripts)
// Estrutura em 4 atos com horários definidos e personagens com profundidade

// Roteiro Dinâmico do Jogo
const StoryNodes = {
    // ==================== ATO 1: CAFÉ DA MANHÃ E ALMOÇO (08:00 - 13:00) ====================
    
    inicio: {
        bg: "casa_luiza_manha",
        time: "08:00",
        dialogs: [
            { 
                speaker: "Narrador", 
                text: "O despertador toca às 8 da manhã. Luiza abre os olhos devagar, sentindo o calor do sol pela janela. Hoje é Dia dos Namorados."
            },

            { speaker: "Narrador", text: "Ela se levanta da cama e vai até a janela, o coração acelerado de antecipação." },
            
            { 
                speaker: "Luiza", 
                text: "Dia dos Namorados... *(sorri)* Meu primeiro com o Enrique. Será que ele preparou algo especial?",
                weatherDialogs: {
                    [WeatherTypes.CHUVA]: "Dia dos Namorados... *(olha pela janela)* Tá chovendo. Espero que o Enrique não se molhe muito vindo.",
                    [WeatherTypes.FRIO]: "Dia dos Namorados... *(se agasalha)* Tá frio hoje. Espero que o Enrique tenha pensado em algo quentinho.",
                    [WeatherTypes.SOL]: "Dia dos Namorados... *(abre a janela)* O dia tá lindo! Perfeito pra sair com o Enrique."
                }
            },
        ],
        effects: { energia: 0, hearts: { enrique: 0 } },
        choices: [
            { text: "Se arrumar com cuidado", target: "arrumar_cuidado", costEnergy: 5, hearts: { enrique: 1 } },
            { text: "Se arrumar rápido", target: "arrumar_rapido", costEnergy: 3, hearts: { enrique: 0 } },
            { text: "Dormir mais 10 minutos", target: "dormir_mais", costEnergy: 0, hearts: { enrique: -1 } },
            { text: "Ficar enrolando na cama", target: "ficar_enrolando", costEnergy: 0, hearts: { enrique: -2 } }
        ]
    },

    arrumar_cuidado: {
        bg: "casa_luiza_manha",
        time: "08:15",
        dialogs: [
            { speaker: "Narrador", text: "Luiza escolhe o vestido favorito, penteia o cabelo com atenção. Quer se sentir especial hoje." },
            { speaker: "Luiza", text: "Vou ficar bonita pro Enrique. Ele merece ver o melhor de mim." }
        ],
        effects: { energia: -5, hearts: { enrique: 0 } },
        next: "enrique_chega_cuidado"
    },

    arrumar_rapido: {
        bg: "casa_luiza_manha",
        time: "08:05",
        dialogs: [
            { speaker: "Narrador", text: "Luiza se arruma rápido, a mente já no encontro. Tá ansiosa pra ver o Enrique." },
            { speaker: "Luiza", text: "Consegui! Tô pronta pro nosso Dia dos Namorados." }
        ],
        effects: { energia: -3, hearts: { enrique: 0 } },
        next: "enrique_chega_rapido"
    },

    dormir_mais: {
        bg: "casa_luiza_manha",
        time: "08:35",
        dialogs: [
            { speaker: "Narrador", text: "Luiza decide dormir mais um pouco. Quando acorda, percebe que se atrasou." },
            { speaker: "Luiza", text: "Ah não! Dormi demais... *(se arruma correndo)* Espero que o Enrique não espere muito." },
            { speaker: "Narrador", text: "Ela se arruma às pressas, o coração batendo forte." }
        ],
        effects: { energia: +10, hearts: { enrique: 0 } },
        next: "enrique_chega_atrasada"
    },

    ficar_enrolando: {
        bg: "casa_luiza_manha",
        time: "08:55",
        dialogs: [
            { speaker: "Narrador", text: "Luiza decide voltar a dormir. Quando acorda, percebe que se atrasou bastante." },
            { speaker: "Luiza", text: "Ah não! Dormi demais... *(se arruma correndo)* Espero que o Enrique não fique bravo." },
            { speaker: "Narrador", text: "Ela se arruma às pressas, o coração batendo forte." }
        ],
        effects: { energia: +15, hearts: { enrique: 0 } },
        next: "enrique_chega_muito_atrasada"
    },

    enrique_chega_cuidado: {
        bg: "casa_luiza_manha",
        time: "09:00",
        dialogs: [
            { 
                speaker: "Narrador", 
                text: "A campainha toca pontualmente. Luiza abre a porta e encontra Enrique com um buquê de flores."
            },
            { 
                speaker: "Enrique", 
                text: "Feliz Dia dos Namorados, princesa! *(entrega as flores)* Você tá linda demais hoje, de verdade.",
                chars: ["luiza", "enrique"]
            },
            { speaker: "Luiza", text: "Enrique! Obrigada pelas flores! São lindas. O que você preparou pra hoje?", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Bora tomar café? Achei um lugar legal.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +20, hearts: { enrique: +1 } },
        next: "cafe_manha"
    },

    enrique_chega_rapido: {
        bg: "casa_luiza_manha",
        time: "09:00",
        dialogs: [
            { 
                speaker: "Narrador", 
                text: "A campainha toca. Enrique tá lá, com um sorriso tímido e um pequeno presente."
            },
            { 
                speaker: "Enrique", 
                text: "Feliz Dia dos Namorados, princesa! Trouxe isso aqui pra você... *(entrega um chocolate)*",
                chars: ["luiza", "enrique"]
            },
            { speaker: "Luiza", text: "Enrique! Que fofo! Obrigada. O que você tem planejado?", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Bora tomar café? Reservei um lugar legal.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +20, hearts: { enrique: +1 } },
        next: "cafe_manha"
    },

    enrique_chega_atrasada: {
        bg: "casa_luiza_manha",
        time: "09:00",
        dialogs: [
            { 
                speaker: "Narrador", 
                text: "Luiza tá se arrumando correndo quando a campainha toca. Enrique espera pacientemente."
            },
            { 
                speaker: "Enrique", 
                text: "Feliz Dia dos Namorados, princesa! Relaxa com o atraso, sem estresse.",
                chars: ["luiza", "enrique"]
            },
            { speaker: "Luiza", text: "Enrique, desculpa! Dormi mais do que devia. O que você preparou?", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Ta de boa, amor. Bora sair pra comer alguma coisa?", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +20, hearts: { enrique: +1 } },
        next: "cafe_manha"
    },

    enrique_chega_muito_atrasada: {
        bg: "casa_luiza_manha",
        time: "09:00",
        dialogs: [
            { 
                speaker: "Narrador", 
                text: "Luiza tá se arrumando correndo quando a campainha toca. Enrique espera pacientemente."
            },
            { 
                speaker: "Enrique", 
                text: "Feliz Dia dos Namorados, princesa! Dormiu bastante, hein? Mas tudo bem.",
                chars: ["luiza", "enrique"]
            },
            { speaker: "Luiza", text: "Enrique, desculpa! Dormi mais do que devia. O que você preparou?", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Ta de boa, amor. Bora sair pra comer alguma coisa?", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +20, hearts: { enrique: +1 } },
        next: "cafe_manha"
    },

    cafe_manha: {
        bg: "cantina_manha",
        time: "09:30",
        dialogs: [
            { speaker: "Narrador", text: "Enrique leva Luiza pra uma cafeteria aconchegante no centro. O cheiro de pão quente e café fresco enche o ar.", weatherDialogs: {
                [WeatherTypes.CHUVA]: "Enrique leva Luiza pra uma cafeteria aconchegante. O som da chuva lá fora torna o lugar ainda mais íntimo.",
                [WeatherTypes.FRIO]: "Enrique leva Luiza pra uma cafeteria com lareira. O calor do fogo combate o frio lá fora."
            }},
            { speaker: "Enrique", text: "Lembrei que você curte pão de queijo, por isso a gente veio aqui. O café daqui é bom.", chars: ["luiza", "enrique"], weatherDialogs: {
                [WeatherTypes.CHUVA]: "Escolhi esse lugar porque é aconchegante, amor. A chuva deixa mais de boa.",
                [WeatherTypes.FRIO]: "Escolhi esse lugar porque tem lareira, amor. Tá quentinho aqui."
            }},
            { speaker: "Luiza", text: "Você se lembrou disso? Isso é muito doce, Enrique. Você não precisava se esforçar tanto.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Lembrei porque presto atenção em você, amor. Quero que nosso dia seja massa.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Eles tomam café da manhã conversando sobre as pequenas coisas do dia a dia, rindo juntos." }
        ],
        effects: { energia: +10, hearts: { enrique: 0 } },
        choices: [
            { text: "Perguntar sobre futuro", target: "conversa_futuro_cafe", costEnergy: 10, hearts: { enrique: 1 } },
            { text: "Segurar a mão dele", target: "segurar_mao_cafe", costEnergy: 5, hearts: { enrique: 0 } },
            { text: "Ficar em silêncio", target: "silencio_cafe", costEnergy: 0, hearts: { enrique: -1 } },
            { text: "Reclamar do barulho", target: "reclamar_cafe", costEnergy: 0, hearts: { enrique: -2 } }
        ]
    },

    conversa_futuro_cafe: {
        bg: "cantina_manha",
        time: "10:00",
        dialogs: [
            { speaker: "Luiza", text: "Enrique, você já pensou sobre a gente? Sabe, pra onde nosso relacionamento vai?", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Penso sim, amor. Quero você na minha vida, construindo nosso futuro junto. Não tenho plano perfeito, mas sei que quero você comigo.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Isso me deixa feliz, Enrique. Eu também te vejo no meu futuro.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Fechou então, princesa. Vamos construir isso juntos.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -10, hearts: { enrique: 0 } },
        next: "passeio_manha"
    },

    memoria_feliz: {
        bg: "cantina_manha",
        time: "10:00",
        dialogs: [
            { speaker: "Luiza", text: "Lembro do nosso primeiro encontro. Você estava tão nervoso que derrubou o cardápio.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(ri)* Lembro sim! Fiquei nervoso demais, mas deu bom. Você riu e eu me apaixonei mais ainda, amor.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Foi aquele sorriso seu que me conquistou. Você é especial, Enrique.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "E você é a melhor coisa que me aconteceu, princesa. Cada dia com você é bom.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -8, hearts: { enrique: 0 } },
        next: "passeio_manha"
    },

    segurar_mao_cafe: {
        bg: "cantina_manha",
        time: "10:00",
        dialogs: [
            { speaker: "Luiza", text: "*(Segura a mão de Enrique sobre a mesa)* Obrigada por hoje, Enrique. Isso significa muito pra mim.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(Aperta a mão dela)* Você merece o melhor, princesa. Fico feliz em te ver bem.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Eles permanecem de mãos dadas, o momento de intimidade no meio da cafeteria movimentada." }
        ],
        effects: { energia: -5, hearts: { enrique: 0 } },
        next: "passeio_manha"
    },

    silencio_cafe: {
        bg: "cantina_manha",
        time: "10:00",
        dialogs: [
            { speaker: "Narrador", text: "Luiza fica em silêncio, comendo seu pão de queijo. Enrique percebe o silêncio e fica um pouco sem jeito." },
            { speaker: "Enrique", text: "Está tudo bem, amor? Tá meio quieta.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Sim, está tudo bem. Só estava distraída olhando a rua.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: 0, hearts: { enrique: 0 } },
        next: "passeio_manha"
    },

    reclamar_cafe: {
        bg: "cantina_manha",
        time: "10:00",
        dialogs: [
            { speaker: "Luiza", text: "Nossa, esse lugar está cheio demais e muito barulhento. Detesto comer com tanta gente falando.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Putz, desculpa, princesa. Achei que ia curtir por causa do pão de queijo... Quer ir pra outro lugar?", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Enrique abaixa o olhar, visivelmente desapontado consigo mesmo por não ter escolhido um lugar melhor." }
        ],
        effects: { energia: 0, hearts: { enrique: 0 } },
        next: "passeio_manha"
    },

    passeio_manha: {
        bg: "praca_manha",
        time: "10:30",
        dialogs: [
            { speaker: "Narrador", text: "Depois do café, Enrique sugere um passeio pelo parque. O ar fresco da manhã faz bem.", weatherDialogs: {
                [WeatherTypes.CHUVA]: "Enrique sugere caminhar pelo parque mesmo com a chuva. Eles compartilham o guarda-chuva.",
                [WeatherTypes.FRIO]: "Enrique sugere caminhar pelo parque. O frio da manhã é combatido com abraços e conversas."
            }},
            { speaker: "Enrique", text: "Quer caminhar um pouco, princesa? O parque tá bem legal hoje.", chars: ["luiza", "enrique"], weatherDialogs: {
                [WeatherTypes.CHUVA]: "Quer caminhar um pouco, amor? Dividimos o guarda-chuva.",
                [WeatherTypes.FRIO]: "Quer caminhar um pouco? Se estiver com frio, te dou um abraço."
            }},
            { speaker: "Luiza", text: "Adoro a ideia! O parque é um dos nossos lugares favoritos.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Lembro quando a gente veio aqui pela primeira vez, amor. Eu não sabia o que falar, você era linda demais.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +5, hearts: { enrique: 0 } },
        choices: [
            { text: "Conversar sobre nós", target: "conversa_profunda", costEnergy: 10, hearts: { enrique: 1 } },
            { text: "Caminhar de mãos dadas", target: "caminhar_maos", costEnergy: 8, hearts: { enrique: 0 } },
            { text: "Ficar parada sem dizer nada", target: "ficar_parada", costEnergy: 0, hearts: { enrique: -1 } },
            { text: "Reclamar que está chato", target: "tedio_parque", costEnergy: 0, hearts: { enrique: -2 } }
        ]
    },

    conversa_profunda: {
        bg: "praca_manha",
        time: "11:00",
        dialogs: [
            { speaker: "Luiza", text: "Enrique, o que te faz feliz? De verdade.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(pensa)* Momentos como esse, de boa com você. E quando resolvo algo difícil no trabalho. E você, princesa?", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Eu amo quando você fala sobre o trabalho. Seus olhos brilham.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "E você? O que te faz feliz?", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Você. E dias como hoje, onde a gente só fica junto, sem preocupações.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -10, hearts: { enrique: 0 } },
        next: "almoco"
    },

    caminhar_maos: {
        bg: "praca_manha",
        time: "11:00",
        dialogs: [
            { speaker: "Narrador", text: "Eles caminham pelo parque, mãos dadas, observando as pessoas ao redor." },
            { speaker: "Enrique", text: "Cada passo com você é especial. Sabe, às vezes me pego pensando como fui sortudo de te encontrar.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Eu também me sinto sortuda, Enrique. Você é gentil, atencioso... *(sorri)* E tem aquele jeito todo seu de me fazer rir.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Espero continuar te fazendo rir por muito tempo. Esse é meu plano.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -8, hearts: { enrique: 0 } },
        next: "almoco"
    },

    mirante_manha: {
        bg: "parada_manha",
        time: "11:00",
        dialogs: [
            { speaker: "Narrador", text: "Eles sobem até o mirante. A vista da cidade despertando é espetacular." },
            { speaker: "Enrique", text: "Olha essa vista. A cidade acordando... Mas sabe, a vista mais bonita tá aqui do meu lado.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "*(cora)* Você tá muito romântico hoje, Enrique. Não tô acostumada com tanto charme.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "É que hoje é especial. E você merece ouvir isso sempre, não só no Dia dos Namorados.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -12, hearts: { enrique: 0 } },
        next: "almoco"
    },

    ficar_parada: {
        bg: "praca_manha",
        time: "11:00",
        dialogs: [
            { speaker: "Narrador", text: "Luiza fica parada, sem saber o que fazer. Enrique percebe e tenta quebrar o gelo." },
            { speaker: "Enrique", text: "Luiza? Tá tudo bem? Você parece... distante.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Ah, é... só tô pensando. Desculpa.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Sem problemas. Quer que a gente sente um pouco?", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: 0, hearts: { enrique: 0 } },
        next: "almoco"
    },

    tedio_parque: {
        bg: "praca_manha",
        time: "11:00",
        dialogs: [
            { speaker: "Luiza", text: "Nossa, que tédio caminhar por aqui. É sempre a mesma coisa, não tem nada mais interessante pra fazer?", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Ah... sério? Pensei que você gostava de caminhar aqui pra conversar e ver o lago... Se preferir, podemos ir logo pro restaurante.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Enrique põe as mãos nos bolsos, parecendo bastante constrangido e desapontado com a reação dela." }
        ],
        effects: { energia: 0, hearts: { enrique: 0 } },
        next: "almoco"
    },

    almoco: {
        bg: "kalzone",
        time: "12:00",
        dialogs: [
            { speaker: "Narrador", text: "Já é meio-dia. Enrique leva Luiza almoçar num restaurante com vista panorâmica da cidade.", weatherDialogs: {
                [WeatherTypes.CHUVA]: "Enrique leva Luiza almoçar num restaurante com vista. A chuva cria um efeito bonito nas janelas.",
                [WeatherTypes.FRIO]: "Enrique leva Luiza almoçar num restaurante aquecido. O contraste com o frio lá fora é reconfortante."
            }},
            { speaker: "Enrique", text: "Escolhi esse lugar porque a comida é boa e a vista é massa. Espero que goste, princesa.", chars: ["luiza", "enrique"], weatherDialogs: {
                [WeatherTypes.CHUVA]: "Escolhi esse lugar porque a comida é boa e dá pra ver a chuva caindo. Fica aconchegante, amor.",
                [WeatherTypes.FRIO]: "Escolhi esse lugar porque é quentinho e a comida é quente, princesa."
            }},
            { speaker: "Luiza", text: "Tá lindo, Enrique! Você realmente pensou em tudo hoje.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Quero que você se sinta especial hoje, amor. Porque você é tudo pra mim.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Eles almoçam conversando sobre seus sonhos e planos, a conexão entre eles crescendo." }
        ],
        effects: { energia: +10, hearts: { enrique: 0 } },
        next: "fim_ato1"
    },

    fim_ato1: {
        bg: "centro_manha",
        time: "13:00",
        dialogs: [
            { speaker: "Narrador", text: "O almoço termina e o relógio marca 13:00. A manhã foi perfeita, mas o dia ainda está só começando." },
            { speaker: "Enrique", text: "A manhã foi muito boa, princesa. Mas preparei umas coisas pra tarde também. Bora continuar?", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Com certeza! Não quero que esse dia acabe nunca.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +5, hearts: { enrique: 0 } },
        next: "inicio_ato2"
    },

    // ==================== ATO 2: PASSEIO À TARDE (13:00 - 18:00) ====================
    
    inicio_ato2: {
        bg: "centro_tarde",
        time: "13:15",
        dialogs: [
            { speaker: "Narrador", text: "A tarde começa com o sol a pino. Enrique tem várias opções pra o passeio da tarde." },
            { speaker: "Enrique", text: "Pra tarde, pensei em algumas coisas que a gente pode fazer. Qual você prefere?", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +5, hearts: { enrique: 0 } },
        choices: [
            { text: "Workshop de pintura", target: "pintura_tarde", costEnergy: 20, hearts: { enrique: 1 } },
            { text: "Ir ao cinema", target: "cinema_tarde", costEnergy: 15, hearts: { enrique: 0 } },
            { text: "Visitar museu de arte", target: "museu_tarde", costEnergy: 12, hearts: { enrique: -1 } },
            { text: "Procurar a Talita", target: "encontro_talita", costEnergy: 10, hearts: { enrique: -2 } }
        ]
    },

    cinema_tarde: {
        bg: "centro_tarde",
        time: "14:00",
        dialogs: [
            { speaker: "Narrador", text: "Enrique leva Luiza ao cinema. Eles compram pipoca e escolhem bons lugares." },
            { speaker: "Enrique", text: "Lembrei que você queria ver esse filme, princesa. Comprei pipoca grande pra nós e chocolate.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Você é incrível, Enrique! Se lembra de tudo.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Durante o filme, Enrique segura a mão de Luiza. Eles riem juntos das cenas engraçadas e se emocionam nos momentos dramáticos." }
        ],
        effects: { energia: -15, hearts: { enrique: 0 } },
        next: "pos_cinema"
    },

    pos_cinema: {
        bg: "centro_tarde",
        time: "16:00",
        dialogs: [
            { speaker: "Narrador", text: "O filme termina e eles saem do cinema, ainda comentando sobre a história." },
            { speaker: "Enrique", text: "Gostei do filme, amor. Mas curti mais ficar com você. E aí, o que achou?", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Eu amei! E você segurando minha mão o tempo todo... *(sorri)* Foi perfeito.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Bora dar um rolê antes do jantar? Ainda dá tempo.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +5, hearts: { enrique: 0 } },
        choices: [
            { text: "Ir à livraria", target: "livraria", costEnergy: 8, hearts: { enrique: 1 } },
            { text: "Voltar pro parque", target: "volta_parque", costEnergy: 12, hearts: { enrique: 0 } },
            { text: "Olhar vitrines no centro", target: "passeio_centro", costEnergy: 10, hearts: { enrique: -1 } },
            { text: "Ir direto pra casa", target: "ir_casa_cansada", costEnergy: 0, hearts: { enrique: -2 } }
        ]
    },

    pintura_tarde: {
        bg: "praca_tarde",
        time: "14:00",
        dialogs: [
            { speaker: "Narrador", text: "Enrique leva Luiza pra um workshop de pintura ao ar livre. O local está cheio de telas e cores vibrantes." },
            { speaker: "Enrique", text: "Lembrei que você curte arte, princesa. Bora pintar algo? Nunca fiz isso, mas topo tentar com você.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Isso é tão criativo! Vamos se divertir muito. E não se preocupe, a gente aprende juntos.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Eles passam a tarde pintando, rindo dos erros e se ajudando. Enrique pinta com dedicação, mesmo sem experiência." }
        ],
        effects: { energia: -20, hearts: { enrique: 0 } },
        next: "pos_pintura"
    },

    pos_pintura: {
        bg: "praca_tarde",
        time: "16:30",
        dialogs: [
            { speaker: "Narrador", text: "As pinturas ficam prontas. Não são perfeitas, mas são especiais porque foram feitas juntos." },
            { speaker: "Enrique", text: "Até que a minha pintura não tá tão ruim, amor. *(mostra a tela)* Tentei fazer nosso canto do parque.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Ficou lindo, Enrique! Você tem talento. E a minha... *(sorri)* Pintei você.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(emociona-se)* Princesa... Esse é o presente mais bonito que já ganhei. Vou guardar com carinho.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +5, hearts: { enrique: 0 } },
        next: "fim_ato2"
    },

    museu_tarde: {
        bg: "centro_tarde",
        time: "14:00",
        dialogs: [
            { speaker: "Narrador", text: "Enrique leva Luiza ao museu de arte da cidade. O lugar é silencioso, com galerias amplas e obras impressionantes." },
            { speaker: "Enrique", text: "Sei que você ama arte, princesa. Quero aprender mais sobre o que você gosta.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Isso é maravilhoso, Enrique. Adoro quando você mostra interesse nas coisas que eu amo.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Eles caminham pelas galerias de mãos dadas. Enrique faz perguntas genuínas sobre as obras, realmente interessado." }
        ],
        effects: { energia: -12, hearts: { enrique: 0 } },
        next: "pos_museu"
    },

    pos_museu: {
        bg: "centro_tarde",
        time: "16:00",
        dialogs: [
            { speaker: "Narrador", text: "Depois de explorar o museu, eles sentam num banco do pátio interno." },
            { speaker: "Enrique", text: "Foi muito massa, amor. Nunca tinha prestado atenção em arte. Você me ensinou a ver as coisas de outro jeito.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Fico feliz que tenha gostado. Arte é sobre sentir, e você tem um coração que sabe sentir, Enrique.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Com você eu sinto tudo de forma mais intensa, princesa. É difícil explicar.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +5, hearts: { enrique: 0 } },
        next: "fim_ato2"
    },

    passeio_centro: {
        bg: "centro_tarde",
        time: "16:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles passeiam pelo centro, olhando vitrines e conversando sobre as coisas que veem." },
            { speaker: "Enrique", text: "Olha aquela loja, princesa. Lembrei que você curte esse estilo. Quer dar uma olhada?", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Só olhar, tá bom? Não precisamos comprar nada. Só passear já é ótimo.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "De boa, amor. O importante é a gente estar junto. Qualquer lugar fica legal com você.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -10, hearts: { enrique: 0 } },
        next: "fim_ato2"
    },

    livraria: {
        bg: "centro_tarde",
        time: "16:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles entram numa livraria aconchegante. O cheiro de livros velhos e novos enche o ar." },
            { speaker: "Enrique", text: "Você curte ler, né princesa? Qual foi o último livro que você leu?", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Gosto muito. O último foi... *(pensa)* Um romance sobre tempo e memória. Me fez pensar sobre a gente.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Sobre a gente? De que jeito, amor?", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Sobre como cada momento conta. Como eu quero guardar todos os nossos momentos juntos.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -8, hearts: { enrique: 0 } },
        next: "fim_ato2"
    },

    ir_casa_cansada: {
        bg: "centro_tarde",
        time: "16:30",
        dialogs: [
            { speaker: "Narrador", text: "Luiza diz que tá muito cansada e quer ir pra casa. Enrique parece preocupado, mas entende." },
            { speaker: "Enrique", text: "Tá tudo bem, amor? Se você tá cansada, bora pra casa. Sem grilo.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "É... só tô exausta. Desculpa por estragar o passeio.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Relaxa, princesa. Seu descanso é mais importante. Bora pra casa.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +10, hearts: { enrique: 0 } },
        next: "fim_ato2"
    },

    volta_parque: {
        bg: "praca_tarde",
        time: "16:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles voltam ao parque, agora com a luz dourada do fim da tarde." },
            { speaker: "Enrique", text: "O parque tá bem calmo com essa luz, princesa. É bom voltar aqui.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "É nosso lugar. Cada vez que a gente vem, cria mais memórias.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Quando a gente for velhinho, vamos voltar aqui e lembrar de hoje, amor.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "*(sorri)* Nossos netos? Você já tá planejando tão longe?", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Se é com você, eu planejo tudo, princesa. Quero passar a vida contigo.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -12, hearts: { enrique: 0 } },
        next: "fim_ato2"
    },

    // ==================== ENCONTRO COM A TALITA ====================
    encontro_talita: {
        bg: "centro_tarde",
        time: "13:30",
        dialogs: [
            { speaker: "Narrador", text: "Luiza e Enrique caminham pelo centro procurando Talita. De repente, uma voz familiar e hiperativa ecoa pela rua." },
            { speaker: "Talita", text: "LUIIIIZA! MEU DEUS, VOCÊ TÁ AQUI! *(corre na direção deles)* EU TAVA JUSTO PENSANDO EM VOCÊ!", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "Talita! *(abraça)* Tava procurando você! Como você tá?", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "TÓXICA! MAS SÓ PORQUE ACABEI DE LER UMA FANFIC DO NARUTO E SASUKE QUE ME DESTRUIU EMOCIONALMENTE! ELES SÃO ALMAS GÊMEAS, LUIZA! ALMAS GÊMEAS!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "... *(olha confuso)*", chars: ["enrique", "talita"] },
            { speaker: "Talita", text: "AH! E você deve ser o Enrique! A Luiza não para de falar de você. 'O Enrique é tão gentil', 'O Enrique é tão quieto', 'O Enrique é tão... Enrique'. *(ri alto)*", chars: ["enrique", "talita"] },
            { speaker: "Enrique", text: "Prazer... *(sorri timidamente)*", chars: ["enrique", "talita"] },
            { speaker: "Talita", text: "ELE TÃO TIMIDO! É ADORÁVEL! LUIZA, VOCÊ ACERTOU EM CHEIO! MAS SÉRIO, PRECISO TE CONTAR SOBRE A MINHA ÚLTIMA CRUSH, ELA TÃO LINDA MAIS NÃO ME DÁ BOLA, CHOREI TRÊS VEZES HOJE!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "*(fica visivelmente sem jeito)* Putz... que chato.", chars: ["enrique", "talita"] },
            { speaker: "Luiza", text: "Talita, deixa o Enrique respirar! *(ri)* Mas conte tudo depois, quero saber!", chars: ["luiza", "talita"] }
        ],
        effects: { energia: -10, hearts: { talita: 0 } },
        choices: [
            { text: "Convidar a Talita", target: "talita_passeio", costEnergy: 15, hearts: { talita: 1 } },
            { text: "Conversar um pouco", target: "talita_conversa_rapida", costEnergy: 5, hearts: { talita: 0 } },
            { text: "Ir embora rápido", target: "talita_ir_embora", costEnergy: 0, hearts: { talita: -1 } },
            { text: "Fingir que não a viu", target: "talita_ignorar", costEnergy: 0, hearts: { talita: -2 } }
        ]
    },

    talita_passeio: {
        bg: "centro_tarde",
        time: "14:00",
        dialogs: [
            { speaker: "Narrador", text: "Talita aceita imediatamente o convite, pulando de alegria. Enrique parece um pouco sobrecarregado com a energia repentina." },
            { speaker: "Talita", text: "VAMOS PASSEAR! EU CONHEÇO OS MELHORES LUGARES! TEM UMA LIVRARIA QUE VENDE MANGÁS E UMA CAFETERIA QUE TEM O MELHOR CAFÉ DO MUNDO! E TALVEZ A GENTE ENCONTRE ALGUMA GATA LINDA PRA MIM!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Isso soa... bem intenso.", chars: ["enrique", "talita"] },
            { speaker: "Talita", text: "INTENSO É A PALAVRA! SABE, EU TAVA LENDO ESSA FANFIC ONDE O SASUKE TEM QUE ESCOLHER ENTRE O NARUTO E A SAKURA, E É TÃO DRAMÁTICO! EU QUASE MORRI! MAS NO FINAL ELE ESCOLHE O NARUTO OBVIAMENTE, PORQUE ELES SÃO DESTINADOS!", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "Talita, você já leu essa fanfic como dez vezes.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "E CADA VEZ FICO MAIS EMOCIONADA! É ARTE, LUIZA! ARTE PURA! MAS SÉRIO, ENRIQUE, VOCÊ GOSTA DE ALGUÉM ALÉM DA LUIZA? TIPO, VOCÊ JÁ TEVE CRUSH EM ALGUÉM?", chars: ["enrique", "talita"] },
            { speaker: "Enrique", text: "*(fica sem jeito)* Não... não sinto isso por outras pessoas. Só pela Luiza.", chars: ["enrique", "talita"] },
            { speaker: "Talita", text: "AH! VOCÊ É DEMI? OU ASEXUAL? ISSO É TÃO LEGAL! MINHA AMIGA É ASEXUAL E ELA ME EXPLICA TUDO, É TÃO INTERESSANTE!", chars: ["enrique", "talita"] },
            { speaker: "Enrique", text: "*(alivia-se)* Asexual... é, faz sentido. Valeu por entender.", chars: ["enrique", "talita"] },
            { speaker: "Talita", text: "ISSO EXPLICA TANTO COISA! MAS SÉRIO, A LUIZA TÃO SORTUDADA! VOCÊ TÃO ATENTO E GENTIL! MAS ME DIZ, VOCÊ JÁ VIAM ALGUMA FANFIC DE NARUTO? PORQUE TEM UMA QUE É TÃO BOA QUE...", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "Talita, deixa o Enrique em paz! *(ri)* Mas é bom ver vocês conversando.", chars: ["luiza", "talita"] }
        ],
        effects: { energia: -15, hearts: { talita: 0, enrique: 0 } },
        choices: [
            { text: "Ir na livraria", target: "talita_livraria", costEnergy: 10, hearts: { talita: 1 } },
            { text: "Tomar café na cafeteria", target: "talita_cafe", costEnergy: 8, hearts: { talita: 0 } },
            { text: "Caminhar pelo centro", target: "talita_centro", costEnergy: 12, hearts: { talita: -1 } },
            { text: "Sugerir que a Talita vá embora", target: "talita_despedida", costEnergy: 0, hearts: { talita: -2 } }
        ]
    },

    talita_conversa_rapida: {
        bg: "centro_tarde",
        time: "13:45",
        dialogs: [
            { speaker: "Narrador", text: "Eles conversam rapidamente com Talita. Ela não para de falar um segundo, mas é ótimo ver a amiga." },
            { speaker: "Talita", text: "MAS SÉRIO, PRECISO CORRER! TENHO UM ENCONTRO COM UMA MENINA QUE CONHECI NO TINDER, ELA TÃO LINDA! ESPERO QUE ELA NÃO ME CANCELE DE NOVO, PORQUE A ÚLTIMA VEZ EU CHOREI NO BANCO DO PARQUE!", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "Boa sorte, Talita! Me conta como foi depois!", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "VAI SER PERFEITO! E VOCÊS DOIS SÃO TÃO FOFOS JUNTOS! QUASE TÃO FOFO QUANTO NARUTO E SASUKE! MAS MENOS, PORQUE ELES SÃO LITERAIS ALMAS GÊMEAS! TCHAUU! *(corre embora)*", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Ela... tem bastante energia, né.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "(ri) É assim que ela é. Mas é a melhor amiga que eu tenho. Você se saiu bem com ela.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Intensa, mas parece gente boa, amor. E ela entendeu bem sobre... você sabe.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Isso é importante pra mim. Que vocês se deem bem.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -5, hearts: { talita: 0, enrique: 0 } },
        next: "fim_ato2"
    },

    talita_ir_embora: {
        bg: "centro_tarde",
        time: "13:45",
        dialogs: [
            { speaker: "Narrador", text: "Luiza precisa ir embora rapidamente. Talita parece decepcionada, mas entende." },
            { speaker: "Talita", text: "Ah, tudo bem... Tinha tanto pra contar! Mas a gente se vê outro dia, né? Não sum!", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "Claro que não! É só que hoje é Dia dos Namorados e...", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "Ah, entendi! Dia dos Namorados! Vocês são tão fofos! Vão se divertir muito! TCHAUU!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Tchau, Talita.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Desculpa por ter sido tão rápida.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Relaxa, princesa. É importante você ter tempo com suas amigas também.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -5, hearts: { talita: 0, enrique: 0 } },
        next: "fim_ato2"
    },

    talita_ignorar: {
        bg: "centro_tarde",
        time: "13:45",
        dialogs: [
            { speaker: "Narrador", text: "Luiza finge que não viu Talita e continua andando. Talita percebe e parece magoada." },
            { speaker: "Talita", text: "LUIIIIZA! EU VI VOCÊ ME IGNORAR! QUE ISSO!", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "Ah... oi, Talita. Não te vi, desculpa.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "CLARO QUE VOCÊ ME VIU! MAS TÁ BOM, SE VOCÊ QUER FICAR SOZINHA COM SEU NAMORADO PERFEITO, TÁ BOM! TCHAU!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Isso foi meio vacilo, não foi amor?", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "É... só não queria interromper nosso dia.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "É... mas ela é sua amiga, princesa.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -5, hearts: { talita: 0, enrique: 0 } },
        next: "fim_ato2"
    },

    talita_livraria: {
        bg: "centro_tarde",
        time: "14:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles vão até a livraria que Talita recomendou. O lugar é cheio de livros de todos os tipos." },
            { speaker: "Enrique", text: "Ela realmente gosta disso.", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "É a maior paixão dela. Já tentou me converter várias vezes.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "*(volta com uma pilha de livros)* ENRIQUE! VOCÊ PRECISA LER ESTA! É A MELHOR FANFIC DE TODOS OS TEMPOS! O NARUTO E O SASUKE TÃO TÃO EMOCIONANTES NELA! VOU EMPRESTAR PRA VOCÊ!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Valeu. Vou dar uma olhada depois.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "VOCÊ VAI AMAR! E DEPOIS A GENTE PODE DISCUTIR SOBRE OS SHIPS! EU TENHO TANTAS TEORIAS! MAS SÉRIO, LUIZA, VOCÊ DEVERIA LER TAMBÉM, AINDA QUE VOCÊ SÓ FIQUE LENDO AQUELES ROMANCES CHATOS!", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "Meus romances não são chatos! São românticos!", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "ROMÂNTICO É NARUTO E SASUKE! O RESTO É SÓ... BOM, MAS NÃO A MESMA COISA! *(ri)* MAS SÉRIO, ENRIQUE, SE VOCÊ PRECISAR DE RECOMENDAÇÕES DE FANFICS, É SÓ PEDI! EU TENHO UMA LISTA DE 500!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Bastante coisa... mas valeu.", chars: ["luiza", "talita"] }
        ],
        effects: { energia: -10, hearts: { talita: 0, enrique: 0 } },
        next: "talita_despedida"
    },

    talita_cafe: {
        bg: "cantina_tarde",
        time: "14:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles vão até a cafeteria que Talita recomendou. O lugar é aconchegante com cheiro de café fresco." },
            { speaker: "Talita", text: "ESTE LUGAR É O MELHOR! O CAFÉ TÃO PERFEITO E OS PÃES DE QUEIJO SÃO DIVINOS! E OLHA SÓ, A GARÇOA TÃO LINDA! *(pisca)*", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Achei o lugar bem legal.", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "Talita, para de flertar com todo mundo! *(ri)* Mas o café realmente parece bom.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "EU NÃO ESTOU FLERTANDO! SÓ APRECIANDO A BELEZA HUMANA! MAS SÉRIO, ENRIQUE, VOCÊ E A LUIZA SÃO TÃO FOFOSS JUNTOS! QUASE TÃO FOFO QUANTO NARUTO E HINATA, MAS SÉRIO, NARUTO E SASUKE SÃO O VERDADEIRO SHIP CANON!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Naruto e... Sasuke? De novo?", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "PORQUE SÃO PERFEITOS! ELES TÃO JUNTOS DESDE CRIANÇA, SE SALVARAM MUTUAMENTE, SE ENTENDEM COMO NINGUÉM! É DESTINO! É COMO VOCÊ E A LUIZA, MAS COM MAIS DRAMA E NINJUTSU!", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "Talita, a gente não tem ninjutsu na nossa relação.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "MAS VOCÊS TÃO AMOR! QUE É QUASE A MESMA COISA! MAS SÉRIO, ENRIQUE, VOCÊ DEVERIA VER OS ANIMES, TÃO TÃO BONS! EU POSSO TE PASSAR MINHA CONTA DE STREAMING!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Qualquer dia eu olho. Valeu.", chars: ["luiza", "talita"] }
        ],
        effects: { energia: -8, hearts: { talita: 0, enrique: 0 } },
        next: "talita_despedida"
    },

    talita_centro: {
        bg: "centro_tarde",
        time: "14:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles continuam passeando pelo centro com Talita. Ela não para de apontar coisas e contar histórias." },
            { speaker: "Talita", text: "OLHA AQUELA LOJA! EU COMPREI MINHA PRIMEIRA CALCINHA LÁ! FOI UM MARCO NA MINHA VIDA! E AQUELE OUTRO LUGAR FOI ONDE EU TIVE MEU PRIMEIRO BEIJO COM UMA MENINA! FOI TÃO ROMÂNTICO MAS ELA ME DEPOIS ME BLOQUEOU NO WHATSAPP!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Putz... que mancada.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "MAS SÉRIO, RELAÇÕES SÃO DIFÍCEIS! EU JÁ TIVE TANTAS CRUSHES QUE NÃO DERAM EM NADA! MAS A LUIZA TÁ SORTUDA DE TER VOCÊ, ENRIQUE! VOCÊ TÃO CALMO E ESTÁVEL, DIFERENTE DE TODAS AS PESSOAS CAÓTICAS QUE EU CONHEÇO!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Valeu. Ela é tudo pra mim também.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "AWW! VOCÊS TÃO ME FAZENDO TER FÉ NO AMOR DE NOVO! TALVEZ EU ENCONTRE ALGUÉM TÃO QUANTO VOCÊS! MAS SÉRIO, PRECISO IR, TENHO QUE CHEGAR EM CASA ANTES QUE MINHA MÃE ME MATA POR NÃO TER FEITO AS TAREFAS! MAS FOI TÃO BOM VER VOCÊS!", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "Foi ótimo te ver, Talita! Nos encontramos logo!", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "COM CERTEZA! E ENRIQUE, PENSE NA FANFIC QUE TE RECOMENDEI! VAI MUDAR SUA VIDA! TCHAUU! *(corre embora)*", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Ela é bem figura.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "É. Mas é a minha melhor amiga. E você se deu bem com ela.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -12, hearts: { talita: 0, enrique: 0 } },
        next: "talita_despedida"
    },

    talita_despedida: {
        bg: "centro_tarde",
        time: "16:00",
        dialogs: [
            { speaker: "Narrador", text: "Talita se despede deles, correndo para seu próximo compromisso. Enrique e Luiza continuam o passeio." },
            { speaker: "Talita", text: "FOI TÃO BOM! VOCÊS PRECISAM ME CONVIDAR PRA SAIR MAIS VEZES! E ENRIQUE, NÃO ESQUECE DA FANFIC! E LUIZA, ME MANDA WHATSAPP DEPOIS! TCHAU AMIGOS! TCHAU AMOR! *(corre embora)*", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "Ela nunca muda. *(ri)* Mas é bom ter ela por perto.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Ela é bem agitada, né. Mas é gente boa, e entendeu sobre... você sabe.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Isso é importante. Que ela entenda e aceite. Você se saiu muito bem com ela, Enrique.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Valeu. Foi da hora o papo. Vou ver aquela fanfic depois.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "(ri) Você não precisa ler se não quiser. Mas é fofo que você esteja considerando.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +5, hearts: { talita: 0, enrique: 0 } },
        next: "fim_ato2"
    },

    fim_ato2: {
        bg: "centro_tarde",
        time: "18:00",
        dialogs: [
            { speaker: "Narrador", text: "O sol começa a se pôr às 18:00. A tarde foi inesquecível, mas Enrique tem mais planos." },
            { speaker: "Enrique", text: "A tarde foi muito boa, amor. Mas o dia não acabou. Preparei algo especial pra noite.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Você tá me surpreendendo a cada momento, Enrique. O que mais você tem guardado?", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +5, hearts: { enrique: 0 } },
        next: "inicio_ato3"
    },

    // ==================== ATO 3: PASSEIO NOTURNO E JANTAR (18:00 - 22:00) ====================
    
    inicio_ato3: {
        bg: "centro_noite",
        time: "18:15",
        dialogs: [
            { speaker: "Narrador", text: "A noite começa a cair. Enrique sugere um passeio noturno antes do jantar.", weatherDialogs: {
                [WeatherTypes.SOL]: "O céu fica laranja e roxo com o pôr do sol. Uma noite perfeita se aproxima.",
                [WeatherTypes.FRIO]: "O frio da noite começa a aparecer. Enrique se oferece pra emprestar o casaco."
            }},
            { speaker: "Enrique", text: "Antes do jantar, quer fazer um passeio noturno? A cidade fica linda à noite.", chars: ["luiza", "enrique"], weatherDialogs: {
                [WeatherTypes.FRIO]: "Antes do jantar, quer fazer um passeio? Tá ficando frio, mas se você quiser, posso emprestar meu casaco."
            }},
            { speaker: "Luiza", text: "Adoro a cidade à noite! Vamos sim.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +5, hearts: { enrique: 0 } },
        choices: [
            { text: "Subir ao mirante", target: "mirante_noite", costEnergy: 15, reqWeather: [WeatherTypes.SOL, WeatherTypes.FRIO], hearts: { enrique: 1 } },
            { text: "Caminhar pelo parque", target: "parque_noite", costEnergy: 12, hearts: { enrique: 0 } },
            { text: "Passear pelo centro", target: "passeio_noturno", costEnergy: 10, hearts: { enrique: -1 } },
            { text: "Chamar a Talita", target: "talita_noite", costEnergy: 15, reqHearts: { talita: 3 }, hearts: { enrique: -2 } }
        ]
    },

    passeio_noturno: {
        bg: "centro_noite",
        time: "19:00",
        dialogs: [
            { speaker: "Narrador", text: "As luzes do centro acendem, criando uma atmosfera mágica. Eles caminham de mãos dadas." },
            { speaker: "Enrique", text: "A cidade à noite fica bonita demais. Fica ainda melhor com você do lado, amor.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Você tá muito charmoso hoje, Enrique. Sério, não sei o que eu fiz pra merecer alguém tão atencioso.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Você merece tudo de bom, princesa. Fico feliz em poder te ver assim.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -10, hearts: { enrique: 0 } },
        next: "jantar_noturno"
    },

    mirante_noite: {
        bg: "parada_noite",
        time: "19:00",
        dialogs: [
            { speaker: "Narrador", text: "Eles sobem ao mirante. As luzes da cidade se espalham como um tapete de estrelas." },
            { speaker: "Enrique", text: "Vista muito bonita, amor. Mas ficar aqui do seu lado é bem melhor.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "*(emociona-se)* Enrique... Isso é tão poético. Não sabia que você tinha esse lado.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Você me faz muito bem, princesa. Só tenho a agradecer.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -15, hearts: { enrique: 0 } },
        next: "jantar_noturno"
    },

    parque_noite: {
        bg: "praca_noite",
        time: "19:00",
        dialogs: [
            { speaker: "Narrador", text: "O parque à noite é silencioso e pacífico. Alguns postes iluminam o caminho." },
            { speaker: "Enrique", text: "O parque à noite é bem sossegado, amor. Lembra quando a gente veio aqui a primeira vez?", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Lembro! Foi quando você me disse que gostava de mim pela primeira vez.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Tava nervoso demais pra falar que gostava de você, princesa. Mas foi a melhor coisa que fiz.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -12, hearts: { enrique: 0 } },
        next: "jantar_noturno"
    },

    // ==================== TALITA NA NOITE ====================
    talita_noite: {
        bg: "centro_noite",
        time: "18:30",
        dialogs: [
            { speaker: "Narrador", text: "Luiza chama Talita pra ir junto no passeio noturno. Ela aceita imediatamente com entusiasmo." },
            { speaker: "Talita", text: "LUIIIIZA! VOCÊ ME CHAMOU! EU TAVA ASSISTINDO ANIME MAS ISSO É MELHOR! VAMOS SAIR! VAMOS APROVEITAR A NOITE! *(pula de alegria)*", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "E aí, Talita. Beleza?", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "ENRIQUE! VOCÊ TÃO BONITO À LUZ DA LUA! QUASE TÃO BONTO QUANTO O SASUKE! MAS SÉRIO, VOCÊ LEU A FANFIC QUE TE RECOMENDEI? EU TAVA PENSANDO NELA O DIA TODO!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Ainda não, mas valeu pela dica. Parece bem legal.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "IMPORTANTE? É A OBRA PRIMA DA HUMANIDADE! MAS SÉRIO, A GENTE VAI ONDE? TEM ALGUM LUGAR COM GATAS LINDAS? PORQUE EU PRECISO ENCONTRAR ALGUÉM, MINHA VIDA TÁ TÃO VAZIA SEM AMOR!", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "Talita, a gente tá aqui pra passear romântico! Mas você pode vir, desde que não atrapalhe muito!", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "EU NUNCA ATRAPALHO! SOU A MELHOR WINGWOMAN DA HISTÓRIA! VOU AJUDAR VOCÊS A SEREM AINDA MAIS ROMÂNTICOS! E TALVEZ ENCONTRE ALGUÉM PRA MIM NO PROCESSO!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Isso... soa intenso. Mas... obrigado.", chars: ["luiza", "talita"] }
        ],
        effects: { energia: -15, hearts: { talita: 0, enrique: 0 } },
        choices: [
            { text: "Subir ao mirante com Talita", target: "talita_mirante_noite", costEnergy: 15, reqWeather: [WeatherTypes.SOL, WeatherTypes.FRIO], hearts: { talita: 1 } },
            { text: "Caminhar pelo parque com Talita", target: "talita_parque_noite", costEnergy: 12, hearts: { talita: 0 } },
            { text: "Passear pelo centro com Talita", target: "talita_passeio_noturno", costEnergy: 10, hearts: { talita: -1 } },
            { text: "Pedir pra Talita ir embora", target: "talita_jantar", costEnergy: 0, hearts: { talita: -2 } }
        ]
    },

    talita_passeio_noturno: {
        bg: "centro_noite",
        time: "19:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles passeiam pelo centro iluminado com Talita. Ela não para de comentar sobre tudo e todos." },
            { speaker: "Talita", text: "OLHA AQUELA LOJA! EU COMPREI MINHA PRIMEIRA CALCINHA LÁ! E AQUELE RESTAURANTE FOI ONDE EU TIVE MEU PIOR DATE! ELA ME DEIXOU PAGAR A CONTA E SUMIU! MAS SÉRIO, A CIDADE À NOITE TÃO LINDA! TÃO ROMÂNTICA!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Putz... date ruim é foda.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "MAS AGORA EU TÃO AQUI COM VOCÊS! VOCÊS TÃO TÃO FOFOSS JUNTOS! É QUASE NARUTO E SASUKE, MAS MENOS DRAMÁTICO! MAS SÉRIO, ENRIQUE, VOCÊ DEVERIA SER MAIS EXPRESSIVO! MOSTRAR MAIS EMOÇÃO!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "É meu jeito, sou mais quieto mesmo.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "ISSO É TÃO FOFO! VOCÊ TÃO TÍMIDO! MAS A LUIZA GOSTA DISSO, ENTÃO TÁ BOM! MAS SÉRIO, PRECISO ENCONTRAR ALGUÉM! OLHA SÓ, AQUELA MENINA TÃO LINDA! *(aponta)*", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "Talita, para de flertar com todo mundo! *(ri)* Mas é bom ver você aqui.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "EU NÃO ESTOU FLIRTANDO! SÓ APRECIANDO! MAS SÉRIO, VOCÊS DOIS PRECISAM SER MAIS ROMÂNTICOS! ENRIQUE, SEGURA A MÃO DELA! FAÇA ALGO ROMÂNTICO!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "*(segura a mão de Luiza)* Assim, amor?", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "ISSO! AGORA BEIJA ELA! OU PELO MENOS DIGA ALGO FOFO! VAMOS, ENRIQUE, SEJA ROMÂNTICO!", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "(ri) Talita, deixa o Enrique em paz! Ele é romântico do jeito dele.", chars: ["luiza", "talita"] }
        ],
        effects: { energia: -10, hearts: { talita: 0, enrique: 0 } },
        next: "talita_jantar"
    },

    talita_mirante_noite: {
        bg: "parada_noite",
        time: "19:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles sobem ao mirante com Talita. A vista das luzes da cidade é espetacular." },
            { speaker: "Talita", text: "MEU DEUS! ESSA VISTA! É TÃO LINDA! QUASE TÃO LINDA QUANTO A CENA FINAL DE NARUTO SHIPPUDEN! SABE, QUANDO ELES SE REENCONTRAM APÓS ANOS? É TÃO EMOCIONANTE!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Vista bonita mesmo, amor. Mas não entendo nada de Naruto.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "VOCÊ NÃO VIU? É A OBRA PRIMA! O FINAL TÃO TÃO EMOCIONANTE! MAS SÉRIO, OLHA ESSAS LUZES! CADA UMA É UMA HISTÓRIA! ASSIM COMO CADA PERSONAGEM DE NARUTO TEM UMA HISTÓRIA TRÁGICA!", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "Talita, tudo se resume a Naruto com você, né? *(ri)*", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "PORQUE NARUTO E HINATA SÃO FOFOS, MAS NARUTO E SASUKE SÃO ALMAS GÊMEAS! MAS SÉRIO, ENRIQUE, VOCÊ DEVERIA DECLARAR SEU AMOR AQUI! NESSE MOMENTO!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Já falo que te amo direto, amor.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "MAS NÃO AQUI! NESTE MOMENTO! COM ESSA VISTA! É CINEMATOGRÁFICO! FAZ ASSIM: 'LUIZA, EU TE AMO MAIS DO QUE NARUTO AMA RAMEN'! SERIA PERFEITO!", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "(ri muito) Enrique, por favor, não diga isso!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Vou falar isso não, amor. *(ri)* Mas você sabe que te amo muito.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "AWW! ISSO FOI TÃO FOFO! QUASE TÃO BOM QUANTO NARUTO E SASUKE! MAS VOCÊ PRECISA TRABALHAR NAS SUAS DECLARAÇÕES, ENRIQUE!", chars: ["luiza", "talita"] }
        ],
        effects: { energia: -15, hearts: { talita: 0, enrique: 0 } },
        next: "talita_jantar"
    },

    talita_parque_noite: {
        bg: "praca_noite",
        time: "19:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles caminham pelo parque à noite com Talita. O lugar está silencioso, exceto pela Talita." },
            { speaker: "Talita", text: "O PARQUE À NOITE TÃO MISTERIOSO! É QUASE A FLORESTA DA MORTE! MAS MENOS ASSUSTADOR! SABE, EU TINHA UMA FANFIC ONDE O NARUTO E O SASUKE SE ENCONTRAVAM NA FLORESTA À NOITE E ERA TÃO ROMÂNTICO!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Floresta da Morte soa meio tenso.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "ERA SÓ UMA FANFIC! MAS SÉRIO, ESSE PARQUE TÃO BONITO! PERFEITO PRA ENCONTROS ROMÂNTICOS! SE EU TIVESSE ALGUÉM, TRARIA AQUI PRA DECLARAR!", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "Talita, você já trouxe quantas pessoas aqui?", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "CINCO! E TODAS ME DEIXARAM! MAS SÉRIO, ENRIQUE, VOCÊ PRECISA SER MAIS AVENTUROSO! FAZER COISAS ROMÂNTICAS! COMO LEVAR A LUIZA PRA UM PICNIC NOTURNO AQUI!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Fazer picnic à noite? Pode ser legal, amor. Qualquer dia a gente faz.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "DA PRÓXIMA VEZ? FAÇA AGORA! OU PELO MENOS DÊ UM BEIJO NELA! ESTAMOS NUM PARQUE ROMÂNTICO À NOITE! É O CENÁRIO PERFEITO!", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "Talita, deixa a gente em paz! *(ri)* Mas é fofo que você queira que a gente seja mais romântica.", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Ela tem umas ideias bem doidas.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "TODAS SÃO BOAS! EU SOU UM GÊNIO DO ROMANCE! SÓ QUE NINGUÉM QUER FICAR COMIGO! MAS SÉRIO, VOCÊS DOIS PRECISAM ME AGRADECER POR ESTAR AQUI!", chars: ["luiza", "talita"] }
        ],
        effects: { energia: -12, hearts: { talita: 0, enrique: 0 } },
        next: "talita_jantar"
    },

    talita_jantar: {
        bg: "oponente_bar_jantar",
        time: "20:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles vão jantar no restaurante que Enrique reservou. Talita se junta à mesa, animada como sempre." },
            { speaker: "Talita", text: "MEU DEUS! ESSE LUGAR TÃO CHIQUE! EU NUNCA VI TANTA ELEGÂNCIA! E OLHA SÓ, A GARÇOA TÃO LINDA! *(pisca)*", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Calma aí, Talita... *(ri)*", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "DESCULPA! DESCULPA! MAS SÉRIO, VOCÊS DOIS TÃO TÃO FOFOSS JUNTOS! É QUASE UM CASAMENTO! VOCÊS JÁ PENSARAM EM CASAR? PORQUE EU QUERO SER MADRINHA!", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "Talita, a gente tá namorando há pouco tempo! Calma!", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "MAS O AMOR NÃO TEM TEMPO! QUANDO É VERDADEIRO, VOCÊ SABE! COMO NARUTO E SASUKE! ELES SE CONHECERAM CRIANÇAS E JÁ ESTAVAM DESTINADOS!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Você curte mesmo esses dois, hein.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "ELES SÃO MEU SHIP OBSESSIVO! MAS SÉRIO, ENRIQUE, VOCÊ TÃO DE SORTA DE TER A LUIZA! ELA TÃO PERFEITA! E VOCÊ TÃO GENTIL! VOCÊS SÃO O CASAL PERFEITO!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Valeu. A Luiza é tudo pra mim.", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "E você é especial pra mim, Talita. Obrigada por estar aqui conosco.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "AWW! EU AMO VOCÊS! SÃO TÃO FOFOSS! MAS SÉRIO, PRECISO IR, TENHO QUE TERMINAR MEU ANIME! MAS FOI TÃO BOM! TCHAU AMIGOS! TCHAU AMOR! *(corre embora)*", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Ela é bem doida, princesa, mas é gente boa.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "É a minha melhor amiga. E você se deu bem com ela, Enrique. Isso significa muito pra mim.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +10, hearts: { talita: 0, enrique: 0 } },
        next: "jantar_noturno"
    },

    jantar_noturno: {
        bg: "oponente_bar_jantar",
        time: "20:00",
        dialogs: [
            { speaker: "Narrador", text: "Enrique reserva uma mesa num restaurante elegante com luz suave e música ambiente." },
            { speaker: "Enrique", text: "Queria te trazer aqui, amor. A comida é boa e o lugar é tranquilo.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Tá lindo, Enrique! Você realmente pensou em cada detalhe.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Quero que nossa noite seja da hora, princesa. Você merece.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Eles jantam conversando sobre o dia, seus sentimentos e o quanto se amam." }
        ],
        effects: { energia: +10, hearts: { enrique: 0 } },
        choices: [
            { text: "Fazer declaração de amor", target: "declaracao_especial", costEnergy: 15, hearts: { enrique: 1 } },
            { text: "Agradecer por tudo", target: "agradecimento", costEnergy: 5, hearts: { enrique: 0 } },
            { text: "Ficar em silêncio", target: "ficar_silencio", costEnergy: 0, hearts: { enrique: -1 } },
            { text: "Reclamar da comida", target: "reclamar_comida", costEnergy: 0, hearts: { enrique: -2 } }
        ]
    },

    declaracao_especial: {
        bg: "oponente_bar_jantar",
        time: "20:30",
        dialogs: [
            { speaker: "Luiza", text: "Enrique, preciso te dizer algo. Hoje me fez perceber o quanto eu te amo. Não só como namorado, mas como pessoa. Você é meu melhor amigo, meu confidente, meu amor.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(emociona-se)* Ouvir isso é muito bom, princesa. Também te amo demais. Você mudou minha vida pra melhor.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "E você mudou a minha. Cada dia ao seu lado é um presente que eu não mereço, mas que agradeço todos os dias.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -15, hearts: { enrique: 0 } },
        next: "fim_ato3"
    },

    reclamar_comida: {
        bg: "oponente_bar_jantar",
        time: "20:30",
        dialogs: [
            { speaker: "Luiza", text: "Nossa, achei que a comida viria mais quente. E o atendimento está super demorado hoje, esperava mais desse lugar.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Putz, sério amor? Pensei que era muito bom pelas notas... Desculpa pelo erro na escolha.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Enrique desvia o olhar, parecendo extremamente decepcionado consigo mesmo por ter frustrado a Luiza." }
        ],
        effects: { energia: 0, hearts: { enrique: 0 } },
        next: "fim_ato3"
    },

    momento_favorito: {
        bg: "oponente_bar_jantar",
        time: "20:30",
        dialogs: [
            { speaker: "Luiza", text: "Qual foi o seu momento favorito do dia, Enrique?", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(pensa)* Sabe... não foi um momento específico. Foi cada vez que te vi sorrir. Cada vez que seus olhos brilharam. Cada momento que percebi que você tá feliz. Isso é meu favorito.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Você sabe como me deixar emocionada. Meu momento favorito foi... todos. Porque estive com você.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -8, hearts: { enrique: 0 } },
        next: "fim_ato3"
    },

    agradecimento: {
        bg: "oponente_bar_jantar",
        time: "20:30",
        dialogs: [
            { speaker: "Luiza", text: "Enrique, obrigada por hoje. Por cada detalhe, por cada pensamento, por me fazer sentir tão amada. Não tenho palavras.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Não precisa agradecer, Luiza. Fazer você feliz é a maior recompensa. Ver você sorrindo é tudo que eu preciso.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Você é único, Enrique. Nunca conheci alguém com um coração tão grande.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -5, hearts: { enrique: 0 } },
        next: "fim_ato3"
    },

    ficar_silencio: {
        bg: "oponente_bar_jantar",
        time: "20:30",
        dialogs: [
            { speaker: "Narrador", text: "Luiza fica em silêncio, apenas comendo. Enrique parece desconfortável com a falta de conversa." },
            { speaker: "Enrique", text: "Luiza? Tá tudo bem? Você tá... muito quieta.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Ah... é. Só tô comendo. A comida tá boa.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Sim, a comida é ótima. Mas... esperava que a gente conversasse mais.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Desculpa. Só não tenho muito pra dizer.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +5, hearts: { enrique: 0 } },
        next: "fim_ato3"
    },

    fim_ato3: {
        bg: "centro_noite",
        time: "22:00",
        dialogs: [
            { speaker: "Narrador", text: "O jantar termina às 22:00. A noite ainda é jovem, e Enrique tem mais uma surpresa." },
            { speaker: "Enrique", text: "O jantar foi perfeito, mas o dia ainda não acabou. Quer fazer mais uma coisa comigo?", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Com certeza! O que mais você tem planejado?", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +5, hearts: { enrique: 0 } },
        next: "inicio_ato4"
    },

    // ==================== ATO 4: FESTA, BARZINHO OU CINEMA (22:00 - 01:00) ====================
    
    inicio_ato4: {
        bg: "centro_noite",
        time: "22:15",
        dialogs: [
            { speaker: "Narrador", text: "Já é tarde da noite, mas a energia ainda tá alta. Enrique oferece opções pra finalizar o Dia dos Namorados." },
            { speaker: "Enrique", text: "Pra finalizar nosso Dia dos Namorados, temos algumas opções. O que você prefere?", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +5, hearts: { enrique: 0 } },
        choices: [
            { text: "Ir a um barzinho", target: "barzinho", costEnergy: 15, hearts: { enrique: 1 } },
            { text: "Ver filme no cinema", target: "filme_noite", costEnergy: 12, hearts: { enrique: 0 } },
            { text: "Ir para uma balada", target: "festa_noite", costEnergy: 20, hearts: { enrique: -1 } },
            { text: "Ir direto pra casa", target: "casa_final", costEnergy: 0, hearts: { enrique: -2 } }
        ]
    },

    festa_noite: {
        bg: "tributo_festa",
        time: "22:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles chegam numa festa animada. A música tá alta, as pessoas dançam, a energia é contagiante." },
            { speaker: "Enrique", text: "A festa tá animada! Quer dançar? Eu... eu não sou muito bom, mas com você posso tentar.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Claro! Vamos nos divertir! Não importa se dança bem ou não, o importante é se divertir juntos.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Eles dançam juntos, rindo dos movimentos desajeitados de Enrique. A noite fica ainda mais especial." }
        ],
        effects: { energia: -20, hearts: { enrique: 0 } },
        next: "pos_festa"
    },

    pos_festa: {
        bg: "tributo_festa",
        time: "00:00",
        dialogs: [
            { speaker: "Narrador", text: "Meia-noite chega na festa. O ano novo não tá chegando, mas parece que sim com tanta celebração." },
            { speaker: "Enrique", text: "Meia-noite! Dia dos Namorados oficialmente acabou, mas nosso amor não. Nunca vai acabar.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Você tá certo. Hoje foi especial, mas todos os dias com você são especiais.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Vamos pra casa? Acho que a gente precisa descansar depois de tudo isso.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -10, hearts: { enrique: 0 } },
        next: "casa_final"
    },

    barzinho: {
        bg: "oponente_bar_noite",
        time: "22:30",
        dialogs: [
            { speaker: "Narrador", text: "Enrique leva Luiza a um barzinho aconchegante e descontraído. A música é baixa, perfeita pra conversar." },
            { speaker: "Enrique", text: "Esse barzinho é especial. Eles têm drinks ótimos e a vibe é relaxada. Perfeito pra finalizar a noite.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Adorei! É mais intimista que a festa, mas ainda assim animado. Ótima escolha.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Pensei que depois de um dia tão intenso, você gostaria de algo mais calmo. Pra gente só conversar.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -15, hearts: { enrique: 0 } },
        next: "pos_barzinho"
    },

    pos_barzinho: {
        bg: "oponente_bar_noite",
        time: "00:00",
        dialogs: [
            { speaker: "Narrador", text: "Meia-noite chega enquanto eles conversam no barzinho. A noite foi perfeita." },
            { speaker: "Enrique", text: "Meia-noite. Dia dos Namorados acabou, mas sabe o que? Eu já tô pensando no próximo. E em todos os outros que vamos ter.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Eu também. Cada Dia dos Namorados com você vai ser especial. E cada dia normal também.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Vamos pra casa? Tô cansado, mas feliz. Muito feliz.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -8, hearts: { enrique: 0 } },
        next: "casa_final"
    },

    filme_noite: {
        bg: "centro_noite",
        time: "22:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles escolhem um filme de última sessão. O cinema tá quase vazio, criando uma atmosfera intimista." },
            { speaker: "Enrique", text: "Última sessão. O cinema tá quase vazio, praticamente privado pra nós. Escolhi um filme romântico, apropriado pro dia.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Perfeito! Assim a gente pode se concentrar no filme e um no outro sem distrações.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Durante o filme, Enrique abraça Luiza. Eles assistem em silêncio, aproveitando a intimidade do momento." }
        ],
        effects: { energia: -12, hearts: { enrique: 0 } },
        next: "pos_filme"
    },

    pos_filme: {
        bg: "centro_noite",
        time: "00:30",
        dialogs: [
            { speaker: "Narrador", text: "O filme termina e eles saem do cinema. Já passou da meia-noite." },
            { speaker: "Enrique", text: "O filme foi bom, mas estar com você foi melhor. Sabe, não importa o que a gente faz, se estamos juntos, é perfeito.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Eu sinto o mesmo. Você é meu filme favorito, Enrique. A melhor história da minha vida.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Vamos pra casa? Foi um dia longo, mas incrível. Não quero que acabe, mas preciso descansar com você.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -10, hearts: { enrique: 0 } },
        next: "casa_final"
    },

    casa_final: {
        bg: "casa_luiza_noite",
        time: "00:45",
        dialogs: [
            { speaker: "Narrador", text: "Enrique leva Luiza pra casa. O dia foi perfeito do começo ao fim." },
            { speaker: "Enrique", text: "Chegamos. Luiza, hoje foi o melhor dia da minha vida. Sério. Cada momento foi especial.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Pra mim também, Enrique. Você me fez sentir a pessoa mais amada do mundo.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Você é a pessoa mais amada do mundo, Luiza. E eu prometo que vou continuar te fazendo feliz todos os dias.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Eles se abraçam na porta de casa, não querendo que o dia acabe." }
        ],
        effects: { energia: +5, hearts: { enrique: 0 } },
        choices: [
            { text: "Convidar o Enrique pra entrar", target: "enrique_entra", costEnergy: 15, hearts: { enrique: 1 } },
            { text: "Dar beijo de despedida", target: "despedida_beijo", costEnergy: 5, hearts: { enrique: 0 } },
            { text: "Ficar na porta conversando", target: "ficar_mais", costEnergy: 10, hearts: { enrique: -1 } },
            { text: "Ir direto pra casa dormir", target: "ir_dormir_cansada", costEnergy: 0, hearts: { enrique: -2 } }
        ]
    },

    enrique_entra: {
        bg: "casa_luiza_noite",
        time: "01:00",
        dialogs: [
            { speaker: "Luiza", text: "Quer entrar? Ainda é cedo, podemos conversar mais um pouco.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Com prazer. Qualquer momento a mais com você é precioso.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Enrique entra e eles se sentam no sofá, abraçados. Conversam sobre o dia e sobre seus sonhos." },
            { speaker: "Enrique", text: "Luiza, hoje mudou algo em mim. Me fez perceber o quanto eu te amo e o quanto quero construir com você.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Você mudou algo em mim também. Me fez sentir que o amor real existe. E tá aqui, com você.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -15, hearts: { enrique: 0 } },
        next: "whatsapp_noite"
    },

    despedida_beijo: {
        bg: "casa_luiza_noite",
        time: "01:00",
        dialogs: [
            { speaker: "Luiza", text: "Obrigada por tudo hoje, Enrique. Foi perfeito.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Foi um prazer. *(Dá um beijo de boa noite)* Até amanhã, meu amor.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Luiza entra em casa com o coração cheio. O Dia dos Namorados foi inesquecível." }
        ],
        effects: { energia: -5, hearts: { enrique: 0 } },
        next: "whatsapp_noite"
    },

    ir_dormir_cansada: {
        bg: "casa_luiza_noite",
        time: "01:00",
        dialogs: [
            { speaker: "Luiza", text: "Enrique, tô muito cansada. Preciso ir dormir agora.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Ah... entendo. Desculpa se te mantive acordada. Boa noite, Luiza.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Não se culpe. O dia foi maravilhoso. Só tô exausta mesmo.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Boa noite. Te amo.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Luiza entra em casa e vai direto pra cama. O dia foi bom, mas ela tá muito cansada." }
        ],
        effects: { energia: +15, hearts: { enrique: 0 } },
        next: "whatsapp_noite"
    },

    ficar_mais: {
        bg: "casa_luiza_noite",
        time: "01:00",
        dialogs: [
            { speaker: "Luiza", text: "Fica mais um pouco? Não quero que o dia acabe ainda.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Eu também não quero que acabe. Vamos ficar aqui um pouco mais.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Eles ficam abraçados na porta, aproveitando cada último momento juntos." },
            { speaker: "Enrique", text: "Cada segundo com você é um presente. Feliz Dia dos Namorados, Luiza. Te amo.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -10, hearts: { enrique: 0 } },
        next: "whatsapp_noite"
    },

    // ================= WHATSAPP DA NOITE =================
    whatsapp_noite: {
        bg: "casa_luiza_noite",
        time: "01:15",
        dialogs: [
            { speaker: "Narrador", text: "Luiza tá em casa, sentindo-se a pessoa mais feliz do mundo. Ela decide mandar uma mensagem pro Enrique." }
        ],
        effects: { energia: +15 },
        isChat: true,
        chatPartner: "enrique"
    },

    fim_jogo: {
        bg: "casa_luiza_noite",
        time: "01:30",
        dialogs: [
            { speaker: "Narrador", text: "A escuridão abraça Luiza gentilmente. O Dia dos Namorados foi perfeito." },
            { speaker: "Narrador", text: "Luiza adormece com um sorriso no rosto, sabendo que é amada por alguém especial." },
            { speaker: "Narrador", text: "Boa noite, Luiza." }
        ],
        next: "show_goodnight_screen"
    },

    fim_jogo_ruim: {
        bg: "casa_luiza_noite",
        time: "01:30",
        dialogs: [
            { speaker: "Narrador", text: "Luiza tá exausta. O dia foi muito intenso e ela não teve energia pra aproveitar tudo." },
            { speaker: "Narrador", text: "Ela adormece triste, sentindo que poderia ter feito mais." },
            { speaker: "Narrador", text: "Fim de jogo. Tente novamente e gerencie sua energia melhor!" }
        ],
        next: "show_bad_ending_screen"
    },
};

// Diálogos de Chat do WhatsApp
const ChatScripts = {
    enrique: [
        { author: "Enrique", text: "Chegou bem em casa?", time: "01:20" },
        { author: "Enrique", text: "Tô aqui deitado, pensando em cada momento do nosso dia... Foi perfeito. ❤️", time: "01:20" },
        { author: "Luiza", text: "Cheguei sim! Foi o melhor Dia dos Namorados da minha vida, Enrique.", time: "01:21" },
        { author: "Enrique", text: "Pra mim também. Você é a pessoa mais especial do mundo, Luiza. Te amo muito!", time: "01:22" },
        { author: "Enrique", text: "Já tô ansioso pelo próximo ano. E por todos os anos que vamos ter juntos. 💕", time: "01:22", sticker: "love" },
        { author: "Luiza", text: "Eu também! Cada dia com você é especial. Obrigada por tudo, Enrique. Te amo!", time: "01:23" },
        { author: "Enrique", text: "Dorme bem, meu amor. Sonha comigo. Até amanhã! 💕", time: "01:24" }
    ]
};
