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
            { 
                speaker: "Luiza", 
                text: "Dia dos Namorados... *(sorri)* Meu primeiro com o Enrique. Será que ele preparou algo especial?",
                weatherDialogs: {
                    [WeatherTypes.CHUVA]: "Dia dos Namorados... *(olha pela janela)* Tá chovendo. Será que o Enrique preparou algo pra dentro de casa?",
                    [WeatherTypes.FRIO]: "Dia dos Namorados... *(se agasalha)* Tá frio hoje. Espero que o Enrique tenha pensado em algo quentinho.",
                    [WeatherTypes.SOL]: "Dia dos Namorados... *(abre a janela)* O dia tá lindo! Perfeito pra sair com o Enrique."
                }
            },
            { speaker: "Narrador", text: "Ela se levanta da cama e vai até a janela, o coração acelerado de antecipação." }
        ],
        effects: { energia: +10, hearts: { enrique: 0 } },
        choices: [
            { text: "Se arrumar com cuidado e carinho.", target: "arrumar_cuidado", costEnergy: 5 },
            { text: "Se arrumar rápido, ansiosa.", target: "arrumar_rapido", costEnergy: 3 },
            { text: "Dormir mais 10 minutos, tá cansada.", target: "dormir_mais", costEnergy: 0 },
            { text: "Ficar na cama mais um pouco, preguiça.", target: "dormir_mais", costEnergy: 0, hearts: { enrique: -1 } }
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
        effects: { energia: +15, hearts: { enrique: 0 } },
        next: "enrique_chega_atrasada"
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
                text: "Feliz Dia dos Namorados, Luiza! *(entrega as flores)* Você... você tá deslumbrante hoje. Sério, não tô exagerando.",
                chars: ["luiza", "enrique"]
            },
            { speaker: "Luiza", text: "Enrique! Obrigada pelas flores! São lindas. O que você preparou pra hoje?", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Preparei um dia especial pra gente. Começando com café da manhã num lugar que eu acho que você vai gostar. Vamos?", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +20, hearts: { enrique: +2 } },
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
                text: "Feliz Dia dos Namorados! Você tá... você tá ótima, Luiza. Trouxe isso pra você... *(entrega um chocolate)*",
                chars: ["luiza", "enrique"]
            },
            { speaker: "Luiza", text: "Enrique! Que fofo! Obrigada. O que você tem planejado?", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Tenho algumas surpresas. Vamos começar com café da manhã? Reservei um lugar especial.", chars: ["luiza", "enrique"] }
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
                text: "Feliz Dia dos Namorados! Não se preocupe com o atraso, tá tudo bem. Levei o tempo que precisasse.",
                chars: ["luiza", "enrique"]
            },
            { speaker: "Luiza", text: "Enrique, desculpa! Dormi mais do que devia. O que você preparou?", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Sem problemas, Luiza. O importante é que a gente tá junto hoje. Vamos tomar café da manhã?", chars: ["luiza", "enrique"] }
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
            { speaker: "Enrique", text: "Escolhi esse lugar porque lembrei que você disse que gostava de pão de queijo. E o café aqui é especial.", chars: ["luiza", "enrique"], weatherDialogs: {
                [WeatherTypes.CHUVA]: "Escolhi esse lugar porque é aconchegante e a chuva lá fora deixa tudo mais romântico.",
                [WeatherTypes.FRIO]: "Escolhi esse lugar porque tem lareira. Tá quentinho aqui dentro, perfeito pro frio lá fora."
            }},
            { speaker: "Luiza", text: "Você se lembrou disso? Isso é muito doce, Enrique. Você não precisava se esforçar tanto.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Claro que me lembrei. Eu presto atenção nas coisas que você diz. Quero que hoje seja memorável.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Eles tomam café da manhã conversando sobre as pequenas coisas do dia a dia, rindo juntos." }
        ],
        effects: { energia: +5, hearts: { enrique: +1 } },
        choices: [
            { text: "Perguntar sobre os planos dele pro futuro.", target: "conversa_futuro_cafe", costEnergy: 10 },
            { text: "Compartilhar uma memória feliz do relacionamento.", target: "memoria_feliz", costEnergy: 8 },
            { text: "Segurar a mão dele e agradecer.", target: "segurar_mao_cafe", costEnergy: 5 },
            { text: "Ficar em silêncio, apenas observando.", target: "segurar_mao_cafe", costEnergy: 0, hearts: { enrique: -1 } }
        ]
    },

    conversa_futuro_cafe: {
        bg: "cantina_manha",
        time: "10:00",
        dialogs: [
            { speaker: "Luiza", text: "Enrique, você já pensou sobre a gente? Sabe, pra onde nosso relacionamento vai?", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Penso sim, Luiza. Eu te vejo na minha vida, construindo coisas juntos. Não tenho todos os planos prontos, mas sei que quero você neles.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Isso me deixa feliz, Enrique. Eu também te vejo no meu futuro.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Então tá combinado. Vamos construir esse futuro juntos, um dia de cada vez.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -10, hearts: { enrique: +1 } },
        next: "passeio_manha"
    },

    memoria_feliz: {
        bg: "cantina_manha",
        time: "10:00",
        dialogs: [
            { speaker: "Luiza", text: "Lembro do nosso primeiro encontro. Você estava tão nervoso que derrubou o cardápio.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(ri)* Eu lembro! Foi terrível na hora, mas agora é uma história engraçada. Você riu e eu me apaixonei mais ainda.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Foi aquele sorriso seu que me conquistou. Você é especial, Enrique.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "E você é a melhor coisa que me aconteceu. Cada dia com você é um presente.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -8, hearts: { enrique: +1 } },
        next: "passeio_manha"
    },

    segurar_mao_cafe: {
        bg: "cantina_manha",
        time: "10:00",
        dialogs: [
            { speaker: "Luiza", text: "*(Segura a mão de Enrique sobre a mesa)* Obrigada por hoje, Enrique. Isso significa muito pra mim.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(Aperta a mão dela)* Você merece todo o carinho do mundo, Luiza. Fico feliz em poder te dar isso.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Eles permanecem de mãos dadas, o momento de intimidade no meio da cafeteria movimentada." }
        ],
        effects: { energia: -5, hearts: { enrique: +1 } },
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
            { speaker: "Enrique", text: "Quer caminhar um pouco? O parque tá bonito hoje. E a gente pode conversar mais.", chars: ["luiza", "enrique"], weatherDialogs: {
                [WeatherTypes.CHUVA]: "Quer caminhar um pouco? Com a chuva, o parque fica quase vazio, mais romântico.",
                [WeatherTypes.FRIO]: "Quer caminhar um pouco? O frio tá forte, mas se a gente caminhar, esquentamos."
            }},
            { speaker: "Luiza", text: "Adoro a ideia! O parque é um dos nossos lugares favoritos.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Lembro quando a gente veio aqui pela primeira vez. Eu não sabia o que falar, você era tão... *(sorri)* Tão você.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +5, hearts: { enrique: 0 } },
        choices: [
            { text: "Sentar no banco e conversar profundamente.", target: "conversa_profunda", costEnergy: 10 },
            { text: "Caminhar de mãos dadas pelo parque.", target: "caminhar_maos", costEnergy: 8 },
            { text: "Ir até o mirante ver a cidade.", target: "mirante_manha", costEnergy: 12, reqWeather: [WeatherTypes.SOL, WeatherTypes.FRIO] },
            { text: "Ficar parada, sem fazer nada.", target: "caminhar_maos", costEnergy: 0, hearts: { enrique: -1 } }
        ]
    },

    conversa_profunda: {
        bg: "praca_manha",
        time: "11:00",
        dialogs: [
            { speaker: "Luiza", text: "Enrique, o que te faz feliz? De verdade.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(pensa)* Sabe... momentos como esse. Estar com você, conversando, sem pressa. E também quando consigo resolver um problema difícil no trabalho, me sinto realizado.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Eu amo quando você fala sobre o trabalho. Seus olhos brilham.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "E você? O que te faz feliz?", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Você. E dias como hoje, onde a gente só fica junto, sem preocupações.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -10, hearts: { enrique: +1 } },
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
        effects: { energia: -12, hearts: { enrique: +1 } },
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
            { speaker: "Enrique", text: "Escolhi esse lugar porque a comida é excelente e a vista é incrível. Espero que goste.", chars: ["luiza", "enrique"], weatherDialogs: {
                [WeatherTypes.CHUVA]: "Escolhi esse lugar porque a comida é excelente e dá pra ver a chuva caindo lá fora.",
                [WeatherTypes.FRIO]: "Escolhi esse lugar porque é aquecido e a comida é quentinha, perfeito pro frio."
            }},
            { speaker: "Luiza", text: "Tá lindo, Enrique! Você realmente pensou em tudo hoje.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Quero que você se sinta especial, Luiza. Porque você é especial pra mim.", chars: ["luiza", "enrique"] },
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
            { speaker: "Enrique", text: "A manhã foi incrível, mas preparei coisas pra tarde também. O que você acha de continuarmos?", chars: ["luiza", "enrique"] },
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
            { text: "Ir ao cinema ver aquele filme que queríamos.", target: "cinema_tarde", costEnergy: 15 },
            { text: "Fazer um workshop de pintura juntos.", target: "pintura_tarde", costEnergy: 20 },
            { text: "Visitar o museu de arte da cidade.", target: "museu_tarde", costEnergy: 12 },
            { text: "Procurar a Talita no centro - ela adora passear aqui.", target: "encontro_talita", costEnergy: 10 }
        ]
    },

    cinema_tarde: {
        bg: "centro_tarde",
        time: "14:00",
        dialogs: [
            { speaker: "Narrador", text: "Enrique leva Luiza ao cinema. Eles compram pipoca e escolhem bons lugares." },
            { speaker: "Enrique", text: "Lembrei que você disse que queria ver esse filme. Comprei pipoca grande pra dividir, e chocolate porque sei que você adora.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Você é incrível, Enrique! Se lembra de tudo.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Durante o filme, Enrique segura a mão de Luiza. Eles riem juntos das cenas engraçadas e se emocionam nos momentos dramáticos." }
        ],
        effects: { energia: -15, hearts: { enrique: +1 } },
        next: "pos_cinema"
    },

    pos_cinema: {
        bg: "centro_tarde",
        time: "16:00",
        dialogs: [
            { speaker: "Narrador", text: "O filme termina e eles saem do cinema, ainda comentando sobre a história." },
            { speaker: "Enrique", text: "Gostei do filme. Mas gostei mais de estar com você. O que você achou?", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Eu amei! E você segurando minha mão o tempo todo... *(sorri)* Foi perfeito.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Quer passear um pouco antes do jantar? Ainda temos tempo.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +5, hearts: { enrique: +1 } },
        choices: [
            { text: "Passear pelo centro e fazer compras de vitrine.", target: "passeio_centro", costEnergy: 10 },
            { text: "Ir pra uma livraria explorar juntos.", target: "livraria", costEnergy: 8 },
            { text: "Voltar pro parque e conversar mais.", target: "volta_parque", costEnergy: 12 },
            { text: "Ir direto pra casa, cansada.", target: "volta_parque", costEnergy: 0, hearts: { enrique: -1 } }
        ]
    },

    pintura_tarde: {
        bg: "praca_tarde",
        time: "14:00",
        dialogs: [
            { speaker: "Narrador", text: "Enrique leva Luiza pra um workshop de pintura ao ar livre. O local está cheio de telas e cores vibrantes." },
            { speaker: "Enrique", text: "Lembrei que você gosta de arte. Pensei que seria legal criarmos algo juntos. Nunca pintei antes, mas... tô disposto a tentar.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Isso é tão criativo! Vamos se divertir muito. E não se preocupe, a gente aprende juntos.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Eles passam a tarde pintando, rindo dos erros e se ajudando. Enrique pinta com dedicação, mesmo sem experiência." }
        ],
        effects: { energia: -20, hearts: { enrique: +1 } },
        next: "pos_pintura"
    },

    pos_pintura: {
        bg: "praca_tarde",
        time: "16:30",
        dialogs: [
            { speaker: "Narrador", text: "As pinturas ficam prontas. Não são perfeitas, mas são especiais porque foram feitas juntos." },
            { speaker: "Enrique", text: "Olha, a minha não tá tão ruim quanto eu pensei. *(mostra a tela)* Pintei o nosso lugar favorito no parque.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Ficou lindo, Enrique! Você tem talento. E a minha... *(sorri)* Pintei você.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(emociona-se)* Luiza... Isso é o presente mais bonito que já recebi. Vou guardar pra sempre.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +5, hearts: { enrique: 0 } },
        next: "fim_ato2"
    },

    museu_tarde: {
        bg: "centro_tarde",
        time: "14:00",
        dialogs: [
            { speaker: "Narrador", text: "Enrique leva Luiza ao museu de arte da cidade. O lugar é silencioso, com galerias amplas e obras impressionantes." },
            { speaker: "Enrique", text: "Sei que você ama arte. Quero compartilhar isso com você, aprender mais sobre o que você gosta.", chars: ["luiza", "enrique"] },
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
            { speaker: "Enrique", text: "Foi incrível. Eu nunca tinha prestado tanta atenção em arte antes. Você me ensinou a ver as coisas de outro jeito.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Fico feliz que tenha gostado. Arte é sobre sentir, e você tem um coração que sabe sentir, Enrique.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Quando estou com você, sinto tudo mais intensamente. É... é difícil explicar.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +5, hearts: { enrique: +1 } },
        next: "fim_ato2"
    },

    passeio_centro: {
        bg: "centro_tarde",
        time: "16:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles passeiam pelo centro, olhando vitrines e conversando sobre as coisas que veem." },
            { speaker: "Enrique", text: "Olha aquela loja. Lembrei que você disse que gostava daquele estilo. Quer entrar dar uma olhada?", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Só olhar, tá bom? Não precisamos comprar nada. Só passear já é ótimo.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Claro. O importante é estar junto. Qualquer lugar é divertido com você.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -10, hearts: { enrique: 0 } },
        next: "fim_ato2"
    },

    livraria: {
        bg: "centro_tarde",
        time: "16:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles entram numa livraria aconchegante. O cheiro de livros velhos e novos enche o ar." },
            { speaker: "Enrique", text: "Você gosta de ler, né? Qual foi o último livro que te marcou?", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Gosto muito. O último foi... *(pensa)* Um romance sobre tempo e memória. Me fez pensar sobre a gente.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Sobre a gente? De que jeito?", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Sobre como cada momento conta. Como eu quero guardar todos os nossos momentos juntos.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -8, hearts: { enrique: +1 } },
        next: "fim_ato2"
    },

    volta_parque: {
        bg: "praca_tarde",
        time: "16:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles voltam ao parque, agora com a luz dourada do fim da tarde." },
            { speaker: "Enrique", text: "O parque tá diferente agora, com essa luz. Mais calmo. É bom voltar aqui.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "É nosso lugar. Cada vez que a gente vem, cria mais memórias.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Um dia, quando a gente for mais velha, a gente vai voltar aqui e contar todas essas histórias pro nossos netos.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "*(sorri)* Nossos netos? Você já tá planejando tão longe?", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Quando é sobre você, eu planejo tudo. Inclusive um futuro longo juntos.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -12, hearts: { enrique: +1 } },
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
            { speaker: "Talita", text: "ELE TÃO TIMIDO! É ADORÁVEL! LUIZA, VOCÊ ACERTOU EM CHEIO! MAS SÉRIO, PRECISO TE CONTAR SOBRE A MINHA ÚLTIMA CRUSH, ELA TÃO LINDA MAS NÃO ME DÁ BOLA, CHOREI TRÊS VEZES HOJE!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "*(fica visivelmente sem jeito)* Ah... que pena...", chars: ["enrique", "talita"] },
            { speaker: "Luiza", text: "Talita, deixa o Enrique respirar! *(ri)* Mas conte tudo depois, quero saber!", chars: ["luiza", "talita"] }
        ],
        effects: { energia: -10, hearts: { talita: +1 } },
        choices: [
            { text: "Convidar Talita pra passear com a gente.", target: "talita_passeio", costEnergy: 15 },
            { text: "Só conversar um pouco e depois continuar o passeio a sós.", target: "talita_conversa_rapida", costEnergy: 5 },
            { text: "Ir embora rapidamente, sem tempo pra conversa.", target: "talita_conversa_rapida", costEnergy: 0, hearts: { talita: -1 } },
            { text: "Fingir que não viu ela e continuar o passeio.", target: "talita_conversa_rapida", costEnergy: 0, hearts: { talita: -2 } }
        ]
    },

    talita_passeio: {
        bg: "centro_tarde",
        time: "14:00",
        dialogs: [
            { speaker: "Narrador", text: "Talita aceita imediatamente o convite, pulando de alegria. Enrique parece um pouco sobrecarregado com a energia repentina." },
            { speaker: "Talita", text: "VAMOS PASSEAR! EU CONHEÇO OS MELHORES LUGARES! TEM UMA LIVRARIA QUE VENDE MANGÁS E UMA CAFETERIA QUE TEM O MELHOR CAFÉ DO MUNDO! E TALVEZ A GENTE ENCONTRE ALGUMA GATA LINDA PRA MIM!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Isso soa... intenso.", chars: ["enrique", "talita"] },
            { speaker: "Talita", text: "INTENSO É A PALAVRA! SABE, EU TAVA LENDO ESSA FANFIC ONDE O SASUKE TEM QUE ESCOLHER ENTRE O NARUTO E A SAKURA, E É TÃO DRAMÁTICO! EU QUASE MORRI! MAS NO FINAL ELE ESCOLHE O NARUTO OBVIAMENTE, PORQUE ELES SÃO DESTINADOS!", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "Talita, você já leu essa fanfic como dez vezes.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "E CADA VEZ FICO MAIS EMOCIONADA! É ARTE, LUIZA! ARTE PURA! MAS SÉRIO, ENRIQUE, VOCÊ GOSTA DE ALGUÉM ALÉM DA LUIZA? TIPO, VOCÊ JÁ TEVE CRUSH EM ALGUÉM?", chars: ["enrique", "talita"] },
            { speaker: "Enrique", text: "*(fica sem jeito)* Não... não exatamente. Eu... não sinto isso por outras pessoas.", chars: ["enrique", "talita"] },
            { speaker: "Talita", text: "AH! VOCÊ É DEMI? OU ASEXUAL? ISSO É TÃO LEGAL! MINHA AMIGA É ASEXUAL E ELA ME EXPLICA TUDO, É TÃO INTERESSANTE!", chars: ["enrique", "talita"] },
            { speaker: "Enrique", text: "*(alivia-se)* Asexual... sim, isso. Obrigada por entender.", chars: ["enrique", "talita"] },
            { speaker: "Talita", text: "ISSO EXPLICA TANTO COISA! MAS SÉRIO, A LUIZA TÃO SORTUDADA! VOCÊ TÃO ATENTO E GENTIL! MAS ME DIZ, VOCÊ JÁ VIAM ALGUMA FANFIC DE NARUTO? PORQUE TEM UMA QUE É TÃO BOA QUE...", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "Talita, deixa o Enrique em paz! *(ri)* Mas é bom ver vocês conversando.", chars: ["luiza", "talita"] }
        ],
        effects: { energia: -15, hearts: { talita: +1, enrique: 0 } },
        choices: [
            { text: "Ir pra livraria que Talita mencionou.", target: "talita_livraria", costEnergy: 10 },
            { text: "Ir na cafeteria que ela recomendou.", target: "talita_cafe", costEnergy: 8 },
            { text: "Continuar passeando pelo centro.", target: "talita_centro", costEnergy: 12 },
            { text: "Sugerir ir embora, cansada da energia dela.", target: "talita_despedida", costEnergy: 0, hearts: { talita: -1 } }
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
            { speaker: "Enrique", text: "Ela... tem muita energia.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "(ri) É assim que ela é. Mas é a melhor amiga que eu tenho. Você se saiu bem com ela.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Ela é... intensa. Mas parece legal. E entendeu sobre... você sabe.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Isso é importante pra mim. Que vocês se deem bem.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -5, hearts: { talita: +1, enrique: 0 } },
        next: "fim_ato2"
    },

    talita_livraria: {
        bg: "centro_tarde",
        time: "14:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles vão até a livraria que Talita mencionou. O lugar é cheio de mangás e livros de ficção." },
            { speaker: "Talita", text: "OLHA SÓ! ELES TÊM A COLEÇÃO COMPLETA DE NARUTO! E TÊM FANFICS IMPRESSAS! EU PRECISO COMPRAR TUDO! *(corre pras prateleiras)*", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Ela realmente gosta disso.", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "É a maior paixão dela. Já tentou me converter várias vezes.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "*(volta com uma pilha de livros)* ENRIQUE! VOCÊ PRECISA LER ESTA! É A MELHOR FANFIC DE TODOS OS TEMPOS! O NARUTO E O SASUKE TÃO TÃO EMOCIONANTES NELA! VOU EMPRESTAR PRA VOCÊ!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Ah... obrigado. Vou... tentar ler.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "VOCÊ VAI AMAR! E DEPOIS A GENTE PODE DISCUTIR SOBRE OS SHIPS! EU TENHO TANTAS TEORIAS! MAS SÉRIO, LUIZA, VOCÊ DEVERIA LER TAMBÉM, AINDA QUE VOCÊ SÓ FIQUE LENDO AQUELES ROMANCES CHATOS!", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "Meus romances não são chatos! São românticos!", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "ROMÂNTICO É NARUTO E SASUKE! O RESTO É SÓ... BOM, MAS NÃO A MESMA COISA! *(ri)* MAS SÉRIO, ENRIQUE, SE VOCÊ PRECISAR DE RECOMENDAÇÕES DE FANFICS, É SÓ PEDI! EU TENHO UMA LISTA DE 500!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "500... isso é muito. Mas... obrigado.", chars: ["luiza", "talita"] }
        ],
        effects: { energia: -10, hearts: { talita: +1, enrique: 0 } },
        next: "talita_despedida"
    },

    talita_cafe: {
        bg: "cantina_tarde",
        time: "14:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles vão até a cafeteria que Talita recomendou. O lugar é aconchegante com cheiro de café fresco." },
            { speaker: "Talita", text: "ESTE LUGAR É O MELHOR! O CAFÉ TÃO PERFEITO E OS PÃES DE QUEIJO SÃO DIVINOS! E OLHA SÓ, A GARÇOA TÃO LINDA! *(pisca)*", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "*(fica sem jeito)* Ah... sim, parece um lugar legal.", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "Talita, para de flertar com todo mundo! *(ri)* Mas o café realmente parece bom.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "EU NÃO ESTOU FLERTANDO! SÓ APRECIANDO A BELEZA HUMANA! MAS SÉRIO, ENRIQUE, VOCÊ E A LUIZA SÃO TÃO FOFOSS JUNTOS! QUASE TÃO FOFO QUANTO NARUTO E HINATA, MAS SÉRIO, NARUTO E SASUKE SÃO O VERDADEIRO SHIP CANON!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Naruto e... Sasuke? De novo?", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "PORQUE SÃO PERFEITOS! ELES TÃO JUNTOS DESDE CRIANÇA, SE SALVARAM MUTUAMENTE, SE ENTENDEM COMO NINGUÉM! É DESTINO! É COMO VOCÊ E A LUIZA, MAS COM MAIS DRAMA E NINJUTSU!", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "Talita, a gente não tem ninjutsu na nossa relação.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "MAS VOCÊS TÃO AMOR! QUE É QUASE A MESMA COISA! MAS SÉRIO, ENRIQUE, VOCÊ DEVERIA VER OS ANIMES, TÃO TÃO BONS! EU POSSO TE PASSAR MINHA CONTA DE STREAMING!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Talvez... um dia. Obrigado.", chars: ["luiza", "talita"] }
        ],
        effects: { energia: -8, hearts: { talita: +1, enrique: 0 } },
        next: "talita_despedida"
    },

    talita_centro: {
        bg: "centro_tarde",
        time: "14:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles continuam passeando pelo centro com Talita. Ela não para de apontar coisas e contar histórias." },
            { speaker: "Talita", text: "OLHA AQUELA LOJA! EU COMPREI MINHA PRIMEIRA CALCINHA LÁ! FOI UM MARCO NA MINHA VIDA! E AQUELE OUTRO LUGAR FOI ONDE EU TIVE MEU PRIMEIRO BEIJO COM UMA MENINA! FOI TÃO ROMÂNTICO MAS ELA ME DEPOIS ME BLOQUEOU NO WHATSAPP!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "*(fica visivelmente sem jeito)* Ah... que pena.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "MAS SÉRIO, RELAÇÕES SÃO DIFÍCEIS! EU JÁ TIVE TANTAS CRUSHES QUE NÃO DERAM EM NADA! MAS A LUIZA TÁ SORTUDA DE TER VOCÊ, ENRIQUE! VOCÊ TÃO CALMO E ESTÁVEL, DIFERENTE DE TODAS AS PESSOAS CAÓTICAS QUE EU CONHEÇO!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Obrigado. A Luiza também é especial pra mim.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "AWW! VOCÊS TÃO ME FAZENDO TER FÉ NO AMOR DE NOVO! TALVEZ EU ENCONTRE ALGUÉM TÃO QUANTO VOCÊS! MAS SÉRIO, PRECISO IR, TENHO QUE CHEGAR EM CASA ANTES QUE MINHA MÃE ME MATA POR NÃO TER FEITO AS TAREFAS! MAS FOI TÃO BOM VER VOCÊS!", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "Foi ótimo te ver, Talita! Nos encontramos logo!", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "COM CERTEZA! E ENRIQUE, PENSE NA FANFIC QUE TE RECOMENDEI! VAI MUDAR SUA VIDA! TCHAUU! *(corre embora)*", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Ela é... muito única.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "É. Mas é a minha melhor amiga. E você se deu bem com ela.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -12, hearts: { talita: +1, enrique: 0 } },
        next: "talita_despedida"
    },

    talita_despedida: {
        bg: "centro_tarde",
        time: "16:00",
        dialogs: [
            { speaker: "Narrador", text: "Talita se despede deles, correndo para seu próximo compromisso. Enrique e Luiza continuam o passeio." },
            { speaker: "Talita", text: "FOI TÃO BOM! VOCÊS PRECISAM ME CONVIDAR PRA SAIR MAIS VEZES! E ENRIQUE, NÃO ESQUECE DA FANFIC! E LUIZA, ME MANDA WHATSAPP DEPOIS! TCHAU AMIGOS! TCHAU AMOR! *(corre embora)*", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "Ela nunca muda. *(ri)* Mas é bom ter ela por perto.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Ela é... muita energia. Mas parece ser uma boa amiga. E entendeu sobre... você sabe.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Isso é importante. Que ela entenda e aceite. Você se saiu muito bem com ela, Enrique.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Obrigado. Foi... interessante. Vou pensar sobre aquela fanfic.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "(ri) Você não precisa ler se não quiser. Mas é fofo que você esteja considerando.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +5, hearts: { talita: +1, enrique: 0 } },
        next: "fim_ato2"
    },

    fim_ato2: {
        bg: "centro_tarde",
        time: "18:00",
        dialogs: [
            { speaker: "Narrador", text: "O sol começa a se pôr às 18:00. A tarde foi inesquecível, mas Enrique tem mais planos." },
            { speaker: "Enrique", text: "A tarde foi maravilhosa, Luiza. Mas o dia não acabou. Preparei algo especial pra noite também.", chars: ["luiza", "enrique"] },
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
            { text: "Passear pelo centro iluminado.", target: "passeio_noturno", costEnergy: 10 },
            { text: "Ir ao mirante ver as luzes da cidade.", target: "mirante_noite", costEnergy: 15, reqWeather: [WeatherTypes.SOL, WeatherTypes.FRIO] },
            { text: "Caminhar pelo parque à noite.", target: "parque_noite", costEnergy: 12 },
            { text: "Chamar a Talita pra ir junto (precisa de 3+ corações).", target: "talita_noite", costEnergy: 15, reqHearts: { talita: 3 } }
        ]
    },

    passeio_noturno: {
        bg: "centro_noite",
        time: "19:00",
        dialogs: [
            { speaker: "Narrador", text: "As luzes do centro acendem, criando uma atmosfera mágica. Eles caminham de mãos dadas." },
            { speaker: "Enrique", text: "A cidade à noite tem uma energia diferente. Mais romântica. Mas sabe, tudo fica mais romântico quando estou com você.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Você tá muito charmoso hoje, Enrique. Sério, não sei o que eu fiz pra merecer alguém tão atencioso.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Você merece tudo de bom, Luiza. E eu tô feliz por poder te dar pelo menos uma parte disso.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -10, hearts: { enrique: 0 } },
        next: "jantar_noturno"
    },

    mirante_noite: {
        bg: "parada_noite",
        time: "19:00",
        dialogs: [
            { speaker: "Narrador", text: "Eles sobem ao mirante. As luzes da cidade se espalham como um tapete de estrelas." },
            { speaker: "Enrique", text: "Olha essa vista. Milhares de luzes, cada uma representando uma vida, uma história. Mas a história mais bonita que eu conheço é a nossa.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "*(emociona-se)* Enrique... Isso é tão poético. Não sabia que você tinha esse lado.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Com você, eu sou uma pessoa melhor. Você me inspira a ser mais, a sentir mais.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -15, hearts: { enrique: +1 } },
        next: "jantar_noturno"
    },

    parque_noite: {
        bg: "praca_noite",
        time: "19:00",
        dialogs: [
            { speaker: "Narrador", text: "O parque à noite é silencioso e pacífico. Alguns postes iluminam o caminho." },
            { speaker: "Enrique", text: "O parque à noite é completamente diferente. Mais íntimo. Lembra quando a gente veio aqui à noite pela primeira vez?", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Lembro! Foi quando você me disse que gostava de mim pela primeira vez.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Eu estava tão nervoso. Mas sabia que tinha que dizer. E não me arrependo nem um segundo.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -12, hearts: { enrique: +1 } },
        next: "jantar_noturno"
    },

    // ==================== TALITA NA NOITE ====================
    talita_noite: {
        bg: "centro_noite",
        time: "18:30",
        dialogs: [
            { speaker: "Narrador", text: "Luiza chama Talita pra ir junto no passeio noturno. Ela aceita imediatamente com entusiasmo." },
            { speaker: "Talita", text: "LUIIIIZA! VOCÊ ME CHAMOU! EU TAVA ASSISTINDO ANIME MAS ISSO É MELHOR! VAMOS SAIR! VAMOS APROVEITAR A NOITE! *(pula de alegria)*", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Olá, Talita. Prazer em ver você de novo.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "ENRIQUE! VOCÊ TÃO BONITO À LUZ DA LUA! QUASE TÃO BONTO QUANTO O SASUKE! MAS SÉRIO, VOCÊ LEU A FANFIC QUE TE RECOMENDEI? EU TAVA PENSANDO NELA O DIA TODO!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Ainda não... mas pensei sobre ela. Parece... importante pra você.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "IMPORTANTE? É A OBRA PRIMA DA HUMANIDADE! MAS SÉRIO, A GENTE VAI ONDE? TEM ALGUM LUGAR COM GATAS LINDAS? PORQUE EU PRECISO ENCONTRAR ALGUÉM, MINHA VIDA TÁ TÃO VAZIA SEM AMOR!", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "Talita, a gente tá aqui pra passear romântico! Mas você pode vir, desde que não atrapalhe muito!", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "EU NUNCA ATRAPALHO! SOU A MELHOR WINGWOMAN DA HISTÓRIA! VOU AJUDAR VOCÊS A SEREM AINDA MAIS ROMÂNTICOS! E TALVEZ ENCONTRE ALGUÉM PRA MIM NO PROCESSO!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Isso... soa intenso. Mas... obrigado.", chars: ["luiza", "talita"] }
        ],
        effects: { energia: -15, hearts: { talita: +1, enrique: 0 } },
        choices: [
            { text: "Passear pelo centro com a Talita.", target: "talita_passeio_noturno", costEnergy: 10 },
            { text: "Ir ao mirante com a Talita.", target: "talita_mirante_noite", costEnergy: 15, reqWeather: [WeatherTypes.SOL, WeatherTypes.FRIO] },
            { text: "Caminhar pelo parque com a Talita.", target: "talita_parque_noite", costEnergy: 12 },
            { text: "Sugerir ir embora, cansada da energia dela.", target: "talita_jantar", costEnergy: 0, hearts: { talita: -1 } }
        ]
    },

    talita_passeio_noturno: {
        bg: "centro_noite",
        time: "19:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles passeiam pelo centro iluminado com Talita. Ela não para de comentar sobre tudo e todos." },
            { speaker: "Talita", text: "OLHA AQUELA LOJA! EU COMPREI MINHA PRIMEIRA CALCINHA LÁ! E AQUELE RESTAURANTE FOI ONDE EU TIVE MEU PIOR DATE! ELA ME DEIXOU PAGAR A CONTA E SUMIU! MAS SÉRIO, A CIDADE À NOITE TÃO LINDA! TÃO ROMÂNTICA!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "*(fica sem jeito)* Ah... que pena com o date.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "MAS AGORA EU TÃO AQUI COM VOCÊS! VOCÊS TÃO TÃO FOFOSS JUNTOS! É QUASE NARUTO E SASUKE, MAS MENOS DRAMÁTICO! MAS SÉRIO, ENRIQUE, VOCÊ DEVERIA SER MAIS EXPRESSIVO! MOSTRAR MAIS EMOÇÃO!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Eu... tento. Mas não sou muito... expressivo.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "ISSO É TÃO FOFO! VOCÊ TÃO TÍMIDO! MAS A LUIZA GOSTA DISSO, ENTÃO TÁ BOM! MAS SÉRIO, PRECISO ENCONTRAR ALGUÉM! OLHA SÓ, AQUELA MENINA TÃO LINDA! *(aponta)*", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "Talita, para de flertar com todo mundo! *(ri)* Mas é bom ter você aqui.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "EU NÃO ESTOU FLIRTANDO! SÓ APRECIANDO! MAS SÉRIO, VOCÊS DOIS PRECISAM SER MAIS ROMÂNTICOS! ENRIQUE, SEGURA A MÃO DELA! FAÇA ALGO ROMÂNTICO!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "*(segura a mão de Luiza)* Assim?", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "ISSO! AGORA BEIJA ELA! OU PELO MENOS DIGA ALGO FOFO! VAMOS, ENRIQUE, SEJA ROMÂNTICO!", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "(ri) Talita, deixa o Enrique em paz! Ele é romântico do jeito dele.", chars: ["luiza", "talita"] }
        ],
        effects: { energia: -10, hearts: { talita: +1, enrique: 0 } },
        next: "talita_jantar"
    },

    talita_mirante_noite: {
        bg: "parada_noite",
        time: "19:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles sobem ao mirante com Talita. A vista das luzes da cidade é espetacular." },
            { speaker: "Talita", text: "MEU DEUS! ESSA VISTA! É TÃO LINDA! QUASE TÃO LINDA QUANTO A CENA FINAL DE NARUTO SHIPPUDEN! SABE, QUANDO ELES SE REENCONTRAM APÓS ANOS? É TÃO EMOCIONANTE!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "A vista realmente é incrível. Mas... Naruto Shippuden?", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "VOCÊ NÃO VIU? É A OBRA PRIMA! O FINAL TÃO TÃO EMOCIONANTE! MAS SÉRIO, OLHA ESSAS LUZES! CADA UMA É UMA HISTÓRIA! ASSIM COMO CADA PERSONAGEM DE NARUTO TEM UMA HISTÓRIA TRÁGICA!", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "Talita, tudo se resume a Naruto com você, né? *(ri)*", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "PORQUE NARUTO É VIDA! MAS SÉRIO, VOCÊS DOIS AQUI... É TÃO ROMÂNTICO! É QUASE UM SHIP CANON! ENRIQUE, VOCÊ DEVERIA DECLARAR SEU AMOR AQUI! NESSE MOMENTO!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "*(fica sem jeito)* Eu... já declarei. Várias vezes.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "MAS NÃO AQUI! NESTE MOMENTO! COM ESSA VISTA! É CINEMATOGRÁFICO! FAZ ASSIM: 'LUIZA, EU TE AMO MAIS DO QUE NARUTO AMA RAMEN'! SERIA PERFEITO!", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "(ri muito) Enrique, por favor, não diga isso!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Não... não vou dizer isso. Mas Luiza, eu realmente te amo. Mais do que qualquer coisa.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "AWW! ISSO FOI TÃO FOFO! QUASE TÃO BOM QUANTO NARUTO E SASUKE! MAS VOCÊ PRECISA TRABALHAR NAS SUAS DECLARAÇÕES, ENRIQUE!", chars: ["luiza", "talita"] }
        ],
        effects: { energia: -15, hearts: { talita: +1, enrique: 0 } },
        next: "talita_jantar"
    },

    talita_parque_noite: {
        bg: "praca_noite",
        time: "19:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles caminham pelo parque à noite com Talita. O lugar está silencioso, exceto pela Talita." },
            { speaker: "Talita", text: "O PARQUE À NOITE TÃO MISTERIOSO! É QUASE A FLORESTA DA MORTE! MAS MENOS ASSUSTADOR! SABE, EU TINHA UMA FANFIC ONDE O NARUTO E O SASUKE SE ENCONTRAVAM NA FLORESTA À NOITE E ERA TÃO ROMÂNTICO!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Floresta da Morte? Isso soa... perigoso.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "ERA SÓ UMA FANFIC! MAS SÉRIO, ESSE PARQUE TÃO BONITO! PERFEITO PRA ENCONTROS ROMÂNTICOS! SE EU TIVESSE ALGUÉM, TRARIA AQUI PRA DECLARAR!", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "Talita, você já trouxe quantas pessoas aqui?", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "CINCO! E TODAS ME DEIXARAM! MAS SÉRIO, ENRIQUE, VOCÊ PRECISA SER MAIS AVENTUROSO! FAZER COISAS ROMÂNTICAS! COMO LEVAR A LUIZA PRA UM PICNIC NOTURNO AQUI!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Picnic noturno? Isso... soa interessante. Talvez da próxima vez.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "DA PRÓXIMA VEZ? FAÇA AGORA! OU PELO MENOS DÊ UM BEIJO NELA! ESTAMOS NUM PARQUE ROMÂNTICO À NOITE! É O CENÁRIO PERFEITO!", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "Talita, deixa a gente em paz! *(ri)* Mas é fofo que você queira que a gente seja mais romântica.", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Talita tem... muitas ideias. Algumas são boas.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "TODAS SÃO BOAS! EU SOU UM GÊNIO DO ROMANCE! SÓ QUE NINGUÉM QUER FICAR COMIGO! MAS SÉRIO, VOCÊS DOIS PRECISAM ME AGRADECER POR ESTAR AQUI!", chars: ["luiza", "talita"] }
        ],
        effects: { energia: -12, hearts: { talita: +1, enrique: 0 } },
        next: "talita_jantar"
    },

    talita_jantar: {
        bg: "oponente_bar_jantar",
        time: "20:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles vão jantar no restaurante que Enrique reservou. Talita se junta à mesa, animada como sempre." },
            { speaker: "Talita", text: "MEU DEUS! ESSE LUGAR TÃO CHIQUE! EU NUNCA VI TANTA ELEGÂNCIA! E OLHA SÓ, A GARÇOA TÃO LINDA! *(pisca)*", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "*(fica sem jeito)* Talita, por favor...", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "DESCULPA! DESCULPA! MAS SÉRIO, VOCÊS DOIS TÃO TÃO FOFOSS JUNTOS! É QUASE UM CASAMENTO! VOCÊS JÁ PENSARAM EM CASAR? PORQUE EU QUERO SER MADRINHA!", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "Talita, a gente tá namorando há pouco tempo! Calma!", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "MAS O AMOR NÃO TEM TEMPO! QUANDO É VERDADEIRO, VOCÊ SABE! COMO NARUTO E SASUKE! ELES SE CONHECERAM CRIANÇAS E JÁ ESTAVAM DESTINADOS!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Naruto e Sasuke de novo? Você realmente gosta deles.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "ELES SÃO MEU SHIP OBSESSIVO! MAS SÉRIO, ENRIQUE, VOCÊ TÃO DE SORTA DE TER A LUIZA! ELA TÃO PERFEITA! E VOCÊ TÃO GENTIL! VOCÊS SÃO O CASAL PERFEITO!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Obrigado, Talita. A Luiza é especial pra mim também.", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "E você é especial pra mim, Talita. Obrigada por estar aqui conosco.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "AWW! EU AMO VOCÊS! SÃO TÃO FOFOSS! MAS SÉRIO, PRECISO IR, TENHO QUE TERMINAR MEU ANIME! MAS FOI TÃO BOM! TCHAU AMIGOS! TCHAU AMOR! *(corre embora)*", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Ela... tem muita energia. Mas é legal.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "É a minha melhor amiga. E você se deu bem com ela, Enrique. Isso significa muito pra mim.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +10, hearts: { talita: +1, enrique: 0 } },
        next: "jantar_noturno"
    },

    jantar_noturno: {
        bg: "oponente_bar_jantar",
        time: "20:00",
        dialogs: [
            { speaker: "Narrador", text: "Enrique reserva uma mesa num restaurante elegante com luz suave e música ambiente." },
            { speaker: "Enrique", text: "Esse é o restaurante que eu queria te trazer. A comida é excelente e o ambiente é... bem, apropriado pra hoje.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Tá lindo, Enrique! Você realmente pensou em cada detalhe.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Quero que esse dia seja perfeito. Porque você é perfeita pra mim.", chars: ["luiza", "enrique"] },
            { speaker: "Narrador", text: "Eles jantam conversando sobre o dia, seus sentimentos e o quanto se amam." }
        ],
        effects: { energia: +10, hearts: { enrique: 0 } },
        choices: [
            { text: "Fazer uma declaração especial.", target: "declaracao_especial", costEnergy: 15 },
            { text: "Perguntar sobre o momento favorito dele do dia.", target: "momento_favorito", costEnergy: 8 },
            { text: "Agradecer por tudo de forma sincera.", target: "agradecimento", costEnergy: 5 },
            { text: "Ficar em silêncio, apenas comendo.", target: "agradecimento", costEnergy: 0, hearts: { enrique: -1 } }
        ]
    },

    declaracao_especial: {
        bg: "oponente_bar_jantar",
        time: "20:30",
        dialogs: [
            { speaker: "Luiza", text: "Enrique, preciso te dizer algo. Hoje me fez perceber o quanto eu te amo. Não só como namorado, mas como pessoa. Você é meu melhor amigo, meu confidente, meu amor.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(emociona-se)* Luiza... Ouvir isso é... é tudo. Eu também te amo. Mais do que consigo expressar. Você mudou minha vida de um jeito que eu nem sabia que era possível.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "E você mudou a minha. Cada dia ao seu lado é um presente que eu não mereço, mas que agradeço todos os dias.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -15, hearts: { enrique: +1 } },
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
        effects: { energia: -8, hearts: { enrique: +1 } },
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
        effects: { energia: -5, hearts: { enrique: +1 } },
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
            { text: "Ir numa festa animada.", target: "festa_noite", costEnergy: 20 },
            { text: "Conhecer um barzinho novo.", target: "barzinho", costEnergy: 15 },
            { text: "Ver um filme de última sessão.", target: "filme_noite", costEnergy: 12 },
            { text: "Ir direto pra casa, cansada.", target: "casa_final", costEnergy: 0, hearts: { enrique: -1 } }
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
        effects: { energia: -20, hearts: { enrique: +1 } },
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
            { speaker: "Enrique", text: "Esse barzinho é especial. Eles têm drinks ótimos e a vibe é super relaxada. Perfeito pra finalizar a noite.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Adorei! É mais intimista que a festa, mas ainda assim animado. Ótima escolha.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Pensei que depois de um dia tão intenso, você gostaria de algo mais calmo. Pra gente só conversar.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -15, hearts: { enrique: +1 } },
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
        effects: { energia: -12, hearts: { enrique: +1 } },
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
            { text: "Convidar o Enrique para entrar.", target: "enrique_entra", costEnergy: 15 },
            { text: "Despedir-se com um beijo de boa noite.", target: "despedida_beijo", costEnergy: 5 },
            { text: "Pedir para ele ficar mais um pouco.", target: "ficar_mais", costEnergy: 10 },
            { text: "Dizer que tá muito cansada e ir dormir.", target: "despedida_beijo", costEnergy: 0, hearts: { enrique: -1 } }
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
        effects: { energia: -15, hearts: { enrique: +1 } },
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
