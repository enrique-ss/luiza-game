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
            }
        ],
        effects: { energia: +20, hearts: { enrique: 0 } },
        choices: [
            { text: "Dar um abraço apertado e um beijo de bom dia", target: "enrique_reacao_beijo", costEnergy: 8, hearts: { enrique: 2 } },
            { text: "Ficar vermelha e agradecer timidamente", target: "enrique_reacao_timida", costEnergy: 0, hearts: { enrique: 0 } }
        ]
    },

    enrique_reacao_beijo: {
        bg: "casa_luiza_manha",
        time: "09:00",
        dialogs: [
            { speaker: "Luiza", text: "Enrique! Obrigada pelas flores! São lindas. *(Dá um beijo carinhoso de bom dia nele)*", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(sorri, com as bochechas um pouco coradas)* De nada, princesa. Fico feliz que gostou. Bora tomar café? Achei um lugar legal.", chars: ["luiza", "enrique"] }
        ],
        next: "cafe_manha_beijo"
    },

    enrique_reacao_timida: {
        bg: "casa_luiza_manha",
        time: "09:00",
        dialogs: [
            { speaker: "Luiza", text: "Enrique! Obrigada pelas flores! São lindas... *(agradece timidamente, um pouco vermelha)*", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(sorri gentilmente)* Você merece, princesa. Bora tomar café? Achei um lugar legal.", chars: ["luiza", "enrique"] }
        ],
        next: "cafe_manha_timida"
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
            }
        ],
        effects: { energia: +20, hearts: { enrique: 0 } },
        choices: [
            { text: "Dividir o chocolate com ele na hora", target: "enrique_rapido_chocolate", costEnergy: 5, hearts: { enrique: 2 } },
            { text: "Dar um abraço rápido de agradecimento", target: "enrique_rapido_abraco", costEnergy: 0, hearts: { enrique: 1 } }
        ]
    },

    enrique_rapido_chocolate: {
        bg: "casa_luiza_manha",
        time: "09:00",
        dialogs: [
            { speaker: "Luiza", text: "Enrique! Que fofo! Obrigada. *(Abre e dá um pedaço pra ele)* Vamos dividir! O que você planejou?", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(sorri aceitando o chocolate)* Valeu, princesa. Bora tomar café? Reservei um lugar legal.", chars: ["luiza", "enrique"] }
        ],
        next: "cafe_manha_chocolate"
    },

    enrique_rapido_abraco: {
        bg: "casa_luiza_manha",
        time: "09:00",
        dialogs: [
            { speaker: "Luiza", text: "Enrique! Que fofo! Obrigada. *(Dá um abraço rápido e carinhoso)* O que você tem planejado?", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(retribui o abraço)* Bora tomar café? Reservei um lugar legal.", chars: ["luiza", "enrique"] }
        ],
        next: "cafe_manha_rapido_abraco"
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
            }
        ],
        effects: { energia: +20, hearts: { enrique: 0 } },
        choices: [
            { text: "Pedir desculpas segurando a mão dele", target: "enrique_atrasada_mao", costEnergy: 5, hearts: { enrique: 2 } },
            { text: "Dizer que vai compensar o atraso com muitos beijos", target: "enrique_atrasada_compensar", costEnergy: 8, hearts: { enrique: 1 } }
        ]
    },

    enrique_atrasada_mao: {
        bg: "casa_luiza_manha",
        time: "09:00",
        dialogs: [
            { speaker: "Luiza", text: "Enrique, desculpa! Dormi mais do que devia... *(segura a mão dele)*", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(aperta a mão dela e sorri)* Tá de boa, amor. Sem estresse. Bora sair pra comer alguma coisa?", chars: ["luiza", "enrique"] }
        ],
        next: "cafe_manha_atrasada_mao"
    },

    enrique_atrasada_compensar: {
        bg: "casa_luiza_manha",
        time: "09:00",
        dialogs: [
            { speaker: "Luiza", text: "Desculpa o atraso! Prometo que vou compensar você o dia todo hoje!", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(ri)* Vou cobrar, hein! Bora sair pra comer alguma coisa?", chars: ["luiza", "enrique"] }
        ],
        next: "cafe_manha_atrasada_compensar"
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
            }
        ],
        effects: { energia: +20, hearts: { enrique: 0 } },
        choices: [
            { text: "Abraçar ele bem forte pedindo mil desculpas", target: "enrique_muito_atrasada_forte", costEnergy: 8, hearts: { enrique: 2 } },
            { text: "Rir do próprio sono e agradecer a paciência dele", target: "enrique_muito_atrasada_rir", costEnergy: 0, hearts: { enrique: 0 } }
        ]
    },

    enrique_muito_atrasada_forte: {
        bg: "casa_luiza_manha",
        time: "09:00",
        dialogs: [
            { speaker: "Luiza", text: "Enrique, me perdoa! Dormi demais mesmo! *(Dá um abraço bem forte nele)*", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(retribui o abraço apertado e ri)* Relaxa, amor. Tá tudo certo. Bora comer que estou com fome!", chars: ["luiza", "enrique"] }
        ],
        next: "cafe_manha_muito_atrasada_forte"
    },

    enrique_muito_atrasada_rir: {
        bg: "casa_luiza_manha",
        time: "09:00",
        dialogs: [
            { speaker: "Luiza", text: "*(ri)* Minha cama me prendeu hoje! Obrigada por me esperar tão pacientemente, você é o melhor.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(sorri)* Eu sei que você gosta de dormir. Tá tranquilo, amor. Bora comer alguma coisa?", chars: ["luiza", "enrique"] }
        ],
        next: "cafe_manha_muito_atrasada_rir"
    },

    // --- BRANCH: ROMÂNTICO (ABRAÇO E BEIJO DE BOM DIA) ---
    cafe_manha_beijo: {
        bg: "cantina_manha",
        time: "09:30",
        dialogs: [
            { speaker: "Narrador", text: "Enrique leva Luiza pra uma cafeteria aconchegante no centro. A atmosfera está cheia de romance após o beijo apaixonado." },
            { speaker: "Enrique", text: "Lembrei que você curte pão de queijo, por isso viemos aqui, princesa. Quero te dar o melhor dia de todos.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Você é perfeito, Enrique... *(sorri com ternura)*", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +10, hearts: { enrique: 0 } },
        choices: [
            { text: "Alimentar Enrique com um pedaço de bolo", target: "cafe_beijo_alimentar", costEnergy: 5, hearts: { enrique: 2 } },
            { text: "Conversar sobre morar juntos no futuro", target: "cafe_beijo_futuro", costEnergy: 10, hearts: { enrique: 1 } }
        ]
    },

    cafe_beijo_alimentar: {
        bg: "cantina_manha",
        time: "10:00",
        dialogs: [
            { speaker: "Luiza", text: "Abre a boca! *(dá um pedacinho de bolo na boca dele)* Hmmm, tá bom?", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(cora e sorri, mastigando)* Muito bom! Fica ainda melhor vindo de você, princesa. Bora dar uma volta na praça pra caminhar um pouco de mãos dadas?", chars: ["luiza", "enrique"] }
        ],
        next: "passeio_parque_beijo"
    },

    cafe_beijo_futuro: {
        bg: "cantina_manha",
        time: "10:00",
        dialogs: [
            { speaker: "Luiza", text: "Enrique, você já pensou sobre a gente dividindo uma casa no futuro?", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "Penso nisso direto, amor. Quero construir uma vida inteirinha com você do meu lado. Que tal se a gente for dar uma volta na praça agora?", chars: ["luiza", "enrique"] }
        ],
        next: "passeio_parque_beijo"
    },

    passeio_parque_beijo: {
        bg: "praca_manha",
        time: "10:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles passeiam de mãos dadas pelo parque, com um clima super apaixonado." }
        ],
        choices: [
            { text: "Dar um beijo roubado no parque", target: "parque_beijo_roubado", costEnergy: 8, hearts: { enrique: 2 } },
            { text: "Caminhar abraçadinha com ele", target: "parque_beijo_caminhar", costEnergy: 5, hearts: { enrique: 1 } }
        ]
    },

    parque_beijo_roubado: {
        bg: "praca_manha",
        time: "11:00",
        dialogs: [
            { speaker: "Luiza", text: "*(Dá um selinho rápido nele no meio do caminho)* Peguei você!", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(ri, surpreso e apaixonado)* Ei, gostei disso! Vou querer mais depois.", chars: ["luiza", "enrique"] }
        ],
        next: "almoco_beijo"
    },

    parque_beijo_caminhar: {
        bg: "praca_manha",
        time: "11:00",
        dialogs: [
            { speaker: "Narrador", text: "Eles andam bem grudadinhos, aproveitando o calor um do outro." },
            { speaker: "Enrique", text: "Estar assim com você me traz uma paz enorme, princesa.", chars: ["luiza", "enrique"] }
        ],
        next: "almoco_beijo"
    },

    almoco_beijo: {
        bg: "kalzone",
        time: "12:00",
        dialogs: [
            { speaker: "Narrador", text: "Eles chegam para o almoço romântico em um restaurante com vista panorâmica. O amor entre eles é visível." },
            { speaker: "Enrique", text: "Este dia está sendo maravilhoso, amor. E só melhora com você.", chars: ["luiza", "enrique"] }
        ],
        next: "fim_ato1_beijo"
    },

    fim_ato1_beijo: {
        bg: "centro_manha",
        time: "13:00",
        dialogs: [
            { speaker: "Narrador", text: "O almoço termina e eles se preparam para a tarde, cheios de carinho acumulado." }
        ],
        next: "inicio_ato2"
    },

    // --- BRANCH: TÍMIDA (AGRADECER TIMIDAMENTE) ---
    cafe_manha_timida: {
        bg: "cantina_manha",
        time: "09:30",
        dialogs: [
            { speaker: "Narrador", text: "Enrique leva Luiza pra cafeteria. A atmosfera é suave, confortável e cheia de carinho sutil." },
            { speaker: "Enrique", text: "Está confortável aqui, princesa? Achei esse cantinho bem calmo pra nós.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +10, hearts: { enrique: 0 } },
        choices: [
            { text: "Elogiar a escolha do lugar docemente", target: "cafe_timida_elogiar", costEnergy: 3, hearts: { enrique: 1 } },
            { text: "Ficar olhando pra ele em silêncio sorrindo", target: "cafe_timida_silencio", costEnergy: 0, hearts: { enrique: 0 } }
        ]
    },

    cafe_timida_elogiar: {
        bg: "cantina_manha",
        time: "10:00",
        dialogs: [
            { speaker: "Luiza", text: "Eu adorei aqui, Enrique. Você tem um gosto incrível para escolher lugares especiais.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(sorri aliviado)* Que bom, amor. Só quero que se sinta bem e acolhida hoje. Venha, vamos dar uma volta na praça. O ar fresco vai nos fazer muito bem.", chars: ["luiza", "enrique"] }
        ],
        next: "passeio_parque_timido"
    },

    cafe_timida_silencio: {
        bg: "cantina_manha",
        time: "10:00",
        dialogs: [
            { speaker: "Narrador", text: "Ela apenas sorri de forma dócil, observando o cuidado dele nos mínimos detalhes." },
            { speaker: "Enrique", text: "Você fica linda quando está pensativa assim, princesa. Venha, vamos dar uma volta na praça pra relaxar um pouco.", chars: ["luiza", "enrique"] }
        ],
        next: "passeio_parque_timido"
    },

    passeio_parque_timido: {
        bg: "praca_manha",
        time: "10:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles andam calmamente pela praça do parque, desfrutando da calmaria da manhã." }
        ],
        choices: [
            { text: "Segurar o dedo mindinho dele timidamente", target: "parque_timido_mindinho", costEnergy: 3, hearts: { enrique: 2 } },
            { text: "Conversar sobre a natureza ao redor", target: "parque_timido_natureza", costEnergy: 5, hearts: { enrique: 1 } }
        ]
    },

    parque_timido_mindinho: {
        bg: "praca_manha",
        time: "11:00",
        dialogs: [
            { speaker: "Narrador", text: "Ela estica o mindinho e engancha no dele. Enrique sorri e entrelaça a mão inteira." },
            { speaker: "Enrique", text: "Muito fofa... Adoro quando você faz essas coisas, amor.", chars: ["luiza", "enrique"] }
        ],
        next: "almoco_timido"
    },

    parque_timido_natureza: {
        bg: "praca_manha",
        time: "11:00",
        dialogs: [
            { speaker: "Luiza", text: "Olha que flores bonitas ali no canteiro! O dia está tão sereno.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "É verdade, princesa. E a sua companhia torna tudo ainda mais bonito.", chars: ["luiza", "enrique"] }
        ],
        next: "almoco_timido"
    },

    almoco_timido: {
        bg: "kalzone",
        time: "12:00",
        dialogs: [
            { speaker: "Narrador", text: "Eles desfrutam de um almoço sossegado em um restaurante agradável." },
            { speaker: "Enrique", text: "Espero que a comida esteja boa pro seu gosto, princesa.", chars: ["luiza", "enrique"] }
        ],
        next: "fim_ato1_timido"
    },

    fim_ato1_timido: {
        bg: "centro_manha",
        time: "13:00",
        dialogs: [
            { speaker: "Narrador", text: "Terminam o almoço e se preparam para a programação da tarde, em perfeita sintonia." }
        ],
        next: "inicio_ato2"
    },

    // --- BRANCH: CHOCOLATE (DIVIDIR O CHOCOLATE) ---
    cafe_manha_chocolate: {
        bg: "cantina_manha",
        time: "09:30",
        dialogs: [
            { speaker: "Narrador", text: "Na cafeteria, eles decidem abrir o chocolate que Enrique trouxe." },
            { speaker: "Luiza", text: "Hmm, esse chocolate é o meu favorito! Você acertou em cheio.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: +10, hearts: { enrique: 0 } },
        choices: [
            { text: "Passar um pouco de chocolate na bochecha dele brincando", target: "cafe_choco_brincar", costEnergy: 5, hearts: { enrique: 2 } },
            { text: "Agradecer de boca cheia deliciando-se", target: "cafe_choco_comer", costEnergy: 3, hearts: { enrique: 1 } }
        ]
    },

    cafe_choco_brincar: {
        bg: "cantina_manha",
        time: "10:00",
        dialogs: [
            { speaker: "Luiza", text: "Ih, se sujou! *(passa chocolate no rosto dele e ri)*", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(ri junto)* Boba! Agora vou ter que te limpar com um beijo!", chars: ["luiza", "enrique"] }
        ],
        next: "escolha_caminho_chocolate"
    },

    cafe_choco_comer: {
        bg: "cantina_manha",
        time: "10:00",
        dialogs: [
            { speaker: "Luiza", text: "Nossa... *(mastiga)* Isso tá muito bom mesmo, Enrique!", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(sorri satisfeito)* Vendo você feliz assim, já valeu o presente todinho.", chars: ["luiza", "enrique"] }
        ],
        next: "escolha_caminho_chocolate"
    },

    escolha_caminho_chocolate: {
        bg: "cantina_manha",
        time: "10:15",
        dialogs: [
            { speaker: "Narrador", text: "Eles terminam o chocolate e se preparam para sair da cafeteria." },
            { speaker: "Enrique", text: "E agora, princesa? Para onde você quer que a gente vá?", chars: ["luiza", "enrique"] }
        ],
        choices: [
            { text: "Caminhar pela praça do parque", target: "passeio_parque_chocolate", costEnergy: 5, hearts: { enrique: 1 } },
            { text: "Subir até o mirante da praça", target: "mirante_parque_chocolate", costEnergy: 8, hearts: { enrique: 2 } },
            { text: "Ir direto para o restaurante almoçar", target: "almoco_chocolate_direto", costEnergy: 0, hearts: { enrique: 0 } }
        ]
    },

    mirante_parque_chocolate: {
        bg: "parada_manha",
        time: "10:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles sobem os degraus até o mirante do parque. O vento fresco bate em seus rostos." },
            { speaker: "Luiza", text: "Nossa, que vista maravilhosa! Valeu totalmente a subida.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(sorri e a abraça de lado)* Realmente incrível. Mas a paisagem mais bonita pra mim tá bem aqui.", chars: ["luiza", "enrique"] }
        ],
        choices: [
            { text: "Apoiar a cabeça no ombro dele", target: "mirante_choco_ombro", costEnergy: 3, hearts: { enrique: 2 } },
            { text: "Elogiar o romantismo dele", target: "mirante_choco_elogio", costEnergy: 5, hearts: { enrique: 1 } }
        ]
    },

    mirante_choco_ombro: {
        bg: "parada_manha",
        time: "11:00",
        dialogs: [
            { speaker: "Narrador", text: "Ela encosta a cabeça no ombro de Enrique, em silêncio, apenas apreciando a vista." },
            { speaker: "Enrique", text: "*(beija o topo da cabeça dela)* Momentos assim são perfeitos, amor.", chars: ["luiza", "enrique"] }
        ],
        next: "almoco_chocolate"
    },

    mirante_choco_elogio: {
        bg: "parada_manha",
        time: "11:00",
        dialogs: [
            { speaker: "Luiza", text: "Nossa, você está tão galanteador hoje! Quem é você e o que fez com o meu Enrique? *(ri)*", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(ri)* É o efeito que você causa em mim, princesa. Sempre me deixa inspirado.", chars: ["luiza", "enrique"] }
        ],
        next: "almoco_chocolate"
    },

    almoco_chocolate_direto: {
        bg: "kalzone",
        time: "12:00",
        dialogs: [
            { speaker: "Narrador", text: "Decidindo pular a caminhada para economizar energia, eles vão direto para o restaurante." },
            { speaker: "Enrique", text: "Chegamos mais cedo para o almoço! Assim podemos aproveitar a mesa com a melhor vista panorâmica sem pressa.", chars: ["luiza", "enrique"] }
        ],
        next: "fim_ato1_chocolate"
    },

    passeio_parque_chocolate: {
        bg: "praca_manha",
        time: "10:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles passeiam rindo, dividindo o resto do chocolate pelo parque." }
        ],
        choices: [
            { text: "Desafiar Enrique para uma corrida até a árvore", target: "parque_choco_corrida", costEnergy: 10, hearts: { enrique: 1 } },
            { text: "Sentar no banco e falar sobre doces da infância", target: "parque_choco_banco", costEnergy: 5, hearts: { enrique: 2 } }
        ]
    },

    parque_choco_corrida: {
        bg: "praca_manha",
        time: "11:00",
        dialogs: [
            { speaker: "Luiza", text: "Quem chegar por último na árvore paga o almoço!", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(corre atrás)* Ei, isso é trapaça! Você saiu na frente!", chars: ["luiza", "enrique"] }
        ],
        next: "almoco_chocolate"
    },

    parque_choco_banco: {
        bg: "praca_manha",
        time: "11:00",
        dialogs: [
            { speaker: "Narrador", text: "Eles sentam lado a lado e conversam animadamente lembrando do passado." },
            { speaker: "Enrique", text: "Adoro saber essas histórias de quando você era pequena, princesa.", chars: ["luiza", "enrique"] }
        ],
        next: "almoco_chocolate"
    },

    almoco_chocolate: {
        bg: "kalzone",
        time: "12:00",
        dialogs: [
            { speaker: "Narrador", text: "Eles almoçam em alto astral, com muitas risadas compartilhadas." }
        ],
        next: "fim_ato1_chocolate"
    },

    fim_ato1_chocolate: {
        bg: "centro_manha",
        time: "13:00",
        dialogs: [
            { speaker: "Narrador", text: "O almoço termina e eles se sentem energizados para a tarde com Enrique." }
        ],
        next: "inicio_ato2"
    },

    // --- BRANCH: RÁPIDO ABRAÇO (ABRAÇO RÁPIDO DE AGRADECIMENTO) ---
    cafe_manha_rapido_abraco: {
        bg: "cantina_manha",
        time: "09:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles chegam animados na cafeteria aconchegante para repor as energias." }
        ],
        effects: { energia: +10, hearts: { enrique: 0 } },
        choices: [
            { text: "Comer rapidamente para aproveitar mais o dia", target: "cafe_rapido_comer", costEnergy: 5, hearts: { enrique: 1 } },
            { text: "Relaxar e pedir um suco especial", target: "cafe_rapido_suco", costEnergy: 0, hearts: { enrique: 1 } }
        ]
    },

    cafe_rapido_comer: {
        bg: "cantina_manha",
        time: "10:00",
        dialogs: [
            { speaker: "Luiza", text: "Vamos comer logo pra não perder tempo de namorar no parque!", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(ri)* Quanta pressa, princesa! Mas eu gosto desse seu entusiasmo hoje.", chars: ["luiza", "enrique"] }
        ],
        next: "escolha_caminho_rapido"
    },

    cafe_rapido_suco: {
        bg: "cantina_manha",
        time: "10:00",
        dialogs: [
            { speaker: "Luiza", text: "Esse suco de frutas vermelhas está uma delícia. Experimenta!", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(toma um gole)* Realmente ótimo, princesa. Você tem bom gosto.", chars: ["luiza", "enrique"] }
        ],
        next: "escolha_caminho_rapido"
    },

    escolha_caminho_rapido: {
        bg: "cantina_manha",
        time: "10:15",
        dialogs: [
            { speaker: "Narrador", text: "Eles terminam o café e saem da cafeteria empolgados." },
            { speaker: "Enrique", text: "Para onde quer ir agora, princesa? Você escolhe!", chars: ["luiza", "enrique"] }
        ],
        choices: [
            { text: "Caminhar rápido pela praça", target: "passeio_parque_rapido", costEnergy: 5, hearts: { enrique: 1 } },
            { text: "Subir correndo até o mirante", target: "mirante_parque_rapido", costEnergy: 8, hearts: { enrique: 2 } },
            { text: "Ir logo para o restaurante", target: "almoco_rapido_direto", costEnergy: 0, hearts: { enrique: 0 } }
        ]
    },

    mirante_parque_rapido: {
        bg: "parada_manha",
        time: "10:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles sobem os degraus do mirante em ritmo acelerado." },
            { speaker: "Enrique", text: "Ufa! Subida rápida, hein? Mas olha essa vista. Vale a pena cada degrau.", chars: ["luiza", "enrique"] }
        ],
        choices: [
            { text: "Desafiar ele para ver quem grita mais alto", target: "mirante_rapido_gritar", costEnergy: 5, hearts: { enrique: 1 } },
            { text: "Apostar uma corrida de descida", target: "mirante_rapido_corrida", costEnergy: 8, hearts: { enrique: 2 } }
        ]
    },

    mirante_rapido_gritar: {
        bg: "parada_manha",
        time: "11:00",
        dialogs: [
            { speaker: "Narrador", text: "Eles olham a cidade lá de cima e soltam gritos descontraídos." },
            { speaker: "Luiza", text: "*(grita)* EU AMO O DIA DE HOJE!", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(grita logo em seguida, rindo)* EU AMO VOCÊ, LUIZA!", chars: ["luiza", "enrique"] }
        ],
        next: "almoco_rapido"
    },

    mirante_rapido_corrida: {
        bg: "parada_manha",
        time: "11:00",
        dialogs: [
            { speaker: "Luiza", text: "Quem chegar primeiro lá embaixo ganha um beijo duplo!", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(já sai correndo)* Valendo! Não vou perder essa por nada!", chars: ["luiza", "enrique"] }
        ],
        next: "almoco_rapido"
    },

    almoco_rapido_direto: {
        bg: "kalzone",
        time: "12:00",
        dialogs: [
            { speaker: "Narrador", text: "Com o dinamismo do dia, eles decidem ir direto para o restaurante almoçar." },
            { speaker: "Enrique", text: "Reservamos o almoço bem cedo. Assim podemos comer com calma e ter mais tempo para a tarde!", chars: ["luiza", "enrique"] }
        ],
        next: "fim_ato1_rapido"
    },

    passeio_parque_rapido: {
        bg: "praca_manha",
        time: "10:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles andam em passo acelerado, felizes com o dinamismo do dia." }
        ],
        choices: [
            { text: "Tirar uma foto com o celular no parque", target: "parque_rapido_foto", costEnergy: 5, hearts: { enrique: 2 } },
            { text: "Observar os patos no lago", target: "parque_rapido_patos", costEnergy: 5, hearts: { enrique: 1 } }
        ]
    },

    parque_rapido_foto: {
        bg: "praca_manha",
        time: "11:00",
        dialogs: [
            { speaker: "Luiza", text: "Vem cá, Enrique! Faz pose pra nossa primeira selfie oficial do dia!", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(sorri e abraça ela para a foto)* Essa vai ficar perfeita na minha tela de bloqueio.", chars: ["luiza", "enrique"] }
        ],
        next: "almoco_rapido"
    },

    parque_rapido_patos: {
        bg: "praca_manha",
        time: "11:00",
        dialogs: [
            { speaker: "Narrador", text: "Eles olham os patos nadando tranquilamente no grande lago." },
            { speaker: "Enrique", text: "Momentos simples assim são os que eu mais guardo no coração, princesa.", chars: ["luiza", "enrique"] }
        ],
        next: "almoco_rapido"
    },

    almoco_rapido: {
        bg: "kalzone",
        time: "12:00",
        dialogs: [
            { speaker: "Narrador", text: "Eles aproveitam um almoço dinâmico e saboroso no restaurante." }
        ],
        next: "fim_ato1_rapido"
    },

    fim_ato1_rapido: {
        bg: "centro_manha",
        time: "13:00",
        dialogs: [
            { speaker: "Narrador", text: "O almoço acaba rapidamente, dando espaço para os próximos planos do dia." }
        ],
        next: "inicio_ato2"
    },

    // --- BRANCH: ATRASADA MÃO (PEDIR DESCULPAS SEGURANDO A MÃO DELE) ---
    cafe_manha_atrasada_mao: {
        bg: "cantina_manha",
        time: "09:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles chegam na cafeteria e Enrique a ajuda a sentar, mantendo o tom reconfortante." }
        ],
        effects: { energia: +10, hearts: { enrique: 0 } },
        choices: [
            { text: "Acariciar as mãos dele e agradecer a paciência", target: "cafe_atrasada_mao_agradecer", costEnergy: 5, hearts: { enrique: 2 } },
            { text: "Perguntar o que ele fez enquanto esperava", target: "cafe_atrasada_mao_perguntar", costEnergy: 5, hearts: { enrique: 1 } }
        ]
    },

    cafe_atrasada_mao_agradecer: {
        bg: "cantina_manha",
        time: "10:00",
        dialogs: [
            { speaker: "Luiza", text: "Obrigada por me esperar com tanto carinho, Enrique. Você é incrível.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(segura firme a mão dela)* Por você eu esperaria o dia inteiro, amor. Sem drama. E agora, bora dar uma volta na praça pra aproveitar o sol?", chars: ["luiza", "enrique"] }
        ],
        next: "passeio_parque_atrasada_mao"
    },

    cafe_atrasada_mao_perguntar: {
        bg: "cantina_manha",
        time: "10:00",
        dialogs: [
            { speaker: "Luiza", text: "Enrique, você ficou muito tempo esperando no celular?", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(ri)* Só um pouco, jogando algo. Mas o importante é que você já está aqui comigo. Venha, vamos dar uma volta na praça para esticar as pernas.", chars: ["luiza", "enrique"] }
        ],
        next: "passeio_parque_atrasada_mao"
    },

    passeio_parque_atrasada_mao: {
        bg: "praca_manha",
        time: "10:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles andam em sintonia pelo parque, a leveza do perdão acalmando o clima." }
        ],
        choices: [
            { text: "Sentar sob as sombras das árvores", target: "parque_atrasada_sombras", costEnergy: 5, hearts: { enrique: 2 } },
            { text: "Tomar uma água de coco fresca juntos", target: "parque_atrasada_coco", costEnergy: 8, hearts: { enrique: 1 } }
        ]
    },

    parque_atrasada_sombras: {
        bg: "praca_manha",
        time: "11:00",
        dialogs: [
            { speaker: "Narrador", text: "Sentados na grama, sob as folhas verdes, eles apenas curtem o vento fresco." },
            { speaker: "Enrique", text: "Estar aqui com você faz qualquer correria valer a pena, amor.", chars: ["luiza", "enrique"] }
        ],
        next: "almoco_atrasada_mao"
    },

    parque_atrasada_coco: {
        bg: "praca_manha",
        time: "11:00",
        dialogs: [
            { speaker: "Luiza", text: "Vamos dividir essa água de coco? Está bem geladinha!", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(sorri e bebe)* Uma delícia. Você sabe escolher as melhores coisas, princesa.", chars: ["luiza", "enrique"] }
        ],
        next: "almoco_atrasada_mao"
    },

    almoco_atrasada_mao: {
        bg: "kalzone",
        time: "12:00",
        dialogs: [
            { speaker: "Narrador", text: "Eles aproveitam um belo almoço, conversando sobre amenidades do cotidiano." }
        ],
        next: "fim_ato1_atrasada_mao"
    },

    fim_ato1_atrasada_mao: {
        bg: "centro_manha",
        time: "13:00",
        dialogs: [
            { speaker: "Narrador", text: "O almoço se encerra com sentimentos leves e a expectativa alta para a tarde." }
        ],
        next: "inicio_ato2"
    },

    // --- BRANCH: ATRASADA COMPENSAR (COMPENSAR ATRASO COM BEIJOS) ---
    cafe_manha_atrasada_compensar: {
        bg: "cantina_manha",
        time: "09:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles se sentam para o café da manhã, a promessa de compensação ainda no ar." }
        ],
        effects: { energia: +10, hearts: { enrique: 0 } },
        choices: [
            { text: "Dar um beijo estalado na bochecha dele agora", target: "cafe_compensar_beijo_agora", costEnergy: 8, hearts: { enrique: 2 } },
            { text: "Piscar pra ele de forma provocativa", target: "cafe_compensar_piscar", costEnergy: 5, hearts: { enrique: 1 } }
        ]
    },

    cafe_compensar_beijo_agora: {
        bg: "cantina_manha",
        time: "10:00",
        dialogs: [
            { speaker: "Luiza", text: "*(Dá um beijo bem barulhento na bochecha dele)* Começando a compensação!", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(ri alto, um pouco vermelho)* Gostei de ver! Quero ver o resto do dia então.", chars: ["luiza", "enrique"] }
        ],
        next: "escolha_caminho_compensar"
    },

    cafe_compensar_piscar: {
        bg: "cantina_manha",
        time: "10:00",
        dialogs: [
            { speaker: "Luiza", text: "Fica de olho em mim hoje... *(pisca pra ele)*", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(sorri de lado)* Não consigo tirar os olhos de você de qualquer forma, amor.", chars: ["luiza", "enrique"] }
        ],
        next: "escolha_caminho_compensar"
    },

    escolha_caminho_compensar: {
        bg: "cantina_manha",
        time: "10:15",
        dialogs: [
            { speaker: "Narrador", text: "Eles saem da cafeteria de mãos dadas, com o clima leve." },
            { speaker: "Enrique", text: "Princesa, qual a nossa próxima parada para continuar sua compensação? *(sorri de lado)*", chars: ["luiza", "enrique"] }
        ],
        choices: [
            { text: "Dar as mãos e ir para a praça", target: "passeio_parque_atrasada_compensar", costEnergy: 5, hearts: { enrique: 1 } },
            { text: "Ir ao mirante para namorarmos com privacidade", target: "mirante_parque_compensar", costEnergy: 8, hearts: { enrique: 2 } },
            { text: "Ir direto para o restaurante", target: "almoco_compensar_direto", costEnergy: 0, hearts: { enrique: 0 } }
        ]
    },

    mirante_parque_compensar: {
        bg: "parada_manha",
        time: "10:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles sobem ao mirante, onde a brisa suave os acolhe." },
            { speaker: "Luiza", text: "Aqui está tão calmo... Perfeito para continuarmos o que eu prometi.", chars: ["luiza", "enrique"] }
        ],
        choices: [
            { text: "Dar um beijo demorado e apaixonado nele", target: "mirante_compensar_beijo", costEnergy: 8, hearts: { enrique: 2 } },
            { text: "Fazer um cafuné e elogiar a beleza dele", target: "mirante_compensar_cafune", costEnergy: 5, hearts: { enrique: 1 } }
        ]
    },

    mirante_compensar_beijo: {
        bg: "parada_manha",
        time: "11:00",
        dialogs: [
            { speaker: "Narrador", text: "Eles trocam um beijo longo e apaixonado, esquecendo o tempo ao redor." },
            { speaker: "Enrique", text: "Nossa, amor... compensação mais do que aprovada até aqui! *(sorri bobo)*", chars: ["luiza", "enrique"] }
        ],
        next: "almoco_atrasada_compensar"
    },

    mirante_compensar_cafune: {
        bg: "parada_manha",
        time: "11:00",
        dialogs: [
            { speaker: "Narrador", text: "Ela faz um carinho nos cabelos dele, olhando em seus olhos." },
            { speaker: "Enrique", text: "*(fecha os olhos aproveitando o carinho)* Você é maravilhosa, princesa. Que paz estar aqui com você.", chars: ["luiza", "enrique"] }
        ],
        next: "almoco_atrasada_compensar"
    },

    almoco_compensar_direto: {
        bg: "kalzone",
        time: "12:00",
        dialogs: [
            { speaker: "Narrador", text: "Eles preferem pular o parque e seguir direto para o restaurante." },
            { speaker: "Enrique", text: "Chegar cedo ao restaurante significa que temos mais tempo para conversar à mesa!", chars: ["luiza", "enrique"] }
        ],
        next: "fim_ato1_atrasada_compensar"
    },

    passeio_parque_atrasada_compensar: {
        bg: "praca_manha",
        time: "10:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles caminham animados, com Enrique ansioso pelos gestos de Luiza." }
        ],
        choices: [
            { text: "Dar as mãos e correr rindo", target: "parque_compensar_correr", costEnergy: 10, hearts: { enrique: 1 } },
            { text: "Dar um abraço apertado por trás dele", target: "parque_compensar_por_tras", costEnergy: 8, hearts: { enrique: 2 } }
        ]
    },

    parque_compensar_correr: {
        bg: "praca_manha",
        time: "11:00",
        dialogs: [
            { speaker: "Narrador", text: "Eles correm de mãos dadas, desviando das pessoas e rindo alto." },
            { speaker: "Enrique", text: "Você é cheia de energia hoje, hein, princesa! Estou amando isso.", chars: ["luiza", "enrique"] }
        ],
        next: "almoco_atrasada_compensar"
    },

    parque_compensar_por_tras: {
        bg: "praca_manha",
        time: "11:00",
        dialogs: [
            { speaker: "Narrador", text: "Ela vem de mansinho e o abraça por trás. Enrique segura as mãos dela ao redor do seu peito." },
            { speaker: "Enrique", text: "Que abraço gostoso... assim eu me derreto todinho, amor.", chars: ["luiza", "enrique"] }
        ],
        next: "almoco_atrasada_compensar"
    },

    almoco_atrasada_compensar: {
        bg: "kalzone",
        time: "12:00",
        dialogs: [
            { speaker: "Narrador", text: "O almoço é regado a olhares intensos e brincadeiras fofas entre os dois." }
        ],
        next: "fim_ato1_atrasada_compensar"
    },

    fim_ato1_atrasada_compensar: {
        bg: "centro_manha",
        time: "13:00",
        dialogs: [
            { speaker: "Narrador", text: "Eles terminam a refeição muito sintonizados e felizes." }
        ],
        next: "inicio_ato2"
    },

    // --- BRANCH: MUITO ATRASADA FORTE (ABRAÇO BEM FORTE DE DESCULPAS) ---
    cafe_manha_muito_atrasada_forte: {
        bg: "cantina_manha",
        time: "09:30",
        dialogs: [
            { speaker: "Narrador", text: "Na cafeteria, eles escolhem uma mesa calma após o abraço aliviado na chegada." }
        ],
        effects: { energia: +10, hearts: { enrique: 0 } },
        choices: [
            { text: "Insistir para pagar a conta do café", target: "cafe_muito_forte_pagar", costEnergy: 10, hearts: { enrique: 2 } },
            { text: "Dar as mãos e fazer um carinho suave", target: "cafe_muito_forte_carinho", costEnergy: 5, hearts: { enrique: 1 } }
        ]
    },

    cafe_muito_forte_pagar: {
        bg: "cantina_manha",
        time: "10:00",
        dialogs: [
            { speaker: "Luiza", text: "Enrique, por favor, me deixa pagar hoje! É o mínimo depois do meu super atraso.", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(ri gentilmente)* Não precisa se cobrar tanto, amor. Mas se faz questão, eu aceito o agrado. Venha, vamos dar uma volta na praça agora.", chars: ["luiza", "enrique"] }
        ],
        next: "passeio_parque_muito_forte"
    },

    cafe_muito_forte_carinho: {
        bg: "cantina_manha",
        time: "10:00",
        dialogs: [
            { speaker: "Narrador", text: "Ela acaricia a mão de Enrique, mostrando o quanto valoriza a companhia dele." },
            { speaker: "Enrique", text: "Estou muito feliz por estarmos juntos hoje, de verdade, princesa. Venha, vamos dar uma volta na praça para aproveitar o clima.", chars: ["luiza", "enrique"] }
        ],
        next: "passeio_parque_muito_forte"
    },

    passeio_parque_muito_forte: {
        bg: "praca_manha",
        time: "10:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles caminham com calma, curtindo o final da manhã sob o sol." }
        ],
        choices: [
            { text: "Comprar um sorvete e dividir", target: "parque_forte_sorvete", costEnergy: 5, hearts: { enrique: 2 } },
            { text: "Descansar debaixo de uma árvore conversando", target: "parque_forte_descanso", costEnergy: 5, hearts: { enrique: 1 } }
        ]
    },

    parque_forte_sorvete: {
        bg: "praca_manha",
        time: "11:00",
        dialogs: [
            { speaker: "Luiza", text: "Olha, um carrinho de sorvete! Vamos pegar um de chocolate para nós dois?", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(sorri)* Adoro quando dividimos as coisas. Abre a boca!", chars: ["luiza", "enrique"] }
        ],
        next: "almoco_muito_forte"
    },

    parque_forte_descanso: {
        bg: "praca_manha",
        time: "11:00",
        dialogs: [
            { speaker: "Narrador", text: "Eles sentam na grama verde sob a sombra e conversam sobre amenidades." },
            { speaker: "Enrique", text: "Esse é o melhor Dia dos Namorados que eu poderia pedir, princesa.", chars: ["luiza", "enrique"] }
        ],
        next: "almoco_muito_forte"
    },

    almoco_muito_forte: {
        bg: "kalzone",
        time: "12:00",
        dialogs: [
            { speaker: "Narrador", text: "Eles aproveitam um almoço delicioso e conversam em total sintonia." }
        ],
        next: "fim_ato1_muito_forte"
    },

    fim_ato1_muito_forte: {
        bg: "centro_manha",
        time: "13:00",
        dialogs: [
            { speaker: "Narrador", text: "O almoço termina e eles se sentem gratos pelo tempo de qualidade compartilhado." }
        ],
        next: "inicio_ato2"
    },

    // --- BRANCH: MUITO ATRASADA RIR (RIR DO SONO E AGRADECER) ---
    cafe_manha_muito_atrasada_rir: {
        bg: "cantina_manha",
        time: "09:30",
        dialogs: [
            { speaker: "Narrador", text: "A cafeteria está animada. O clima é descontraído e cheio de boas risadas." }
        ],
        effects: { energia: +10, hearts: { enrique: 0 } },
        choices: [
            { text: "Fazer piada com a pressa para se arrumar", target: "cafe_muito_rir_pressa", costEnergy: 3, hearts: { enrique: 1 } },
            { text: "Pedir um pão de queijo gigante", target: "cafe_muito_rir_gigante", costEnergy: 5, hearts: { enrique: 1 } }
        ]
    },

    cafe_muito_rir_pressa: {
        bg: "cantina_manha",
        time: "10:00",
        dialogs: [
            { speaker: "Luiza", text: "Se você visse meu desespero colocando o vestido de ponta-cabeça... *(ri)*", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(ri alto)* Eu adoraria ter visto essa cena! Você é uma figura, princesa.", chars: ["luiza", "enrique"] }
        ],
        next: "escolha_caminho_rir"
    },

    cafe_muito_rir_gigante: {
        bg: "cantina_manha",
        time: "10:00",
        dialogs: [
            { speaker: "Luiza", text: "Nossa, estou com tanta fome que comeria esse pão de queijo gigante inteirinho!", chars: ["luiza", "enrique"] },
            { speaker: "Enrique", text: "*(sorri)* Pode comer tudo! A pressa de acordar gasta muita energia mesmo.", chars: ["luiza", "enrique"] }
        ],
        next: "escolha_caminho_rir"
    },

    escolha_caminho_rir: {
        bg: "cantina_manha",
        time: "10:15",
        dialogs: [
            { speaker: "Narrador", text: "Eles saem da cafeteria ainda rindo das piadas." },
            { speaker: "Enrique", text: "E agora, Luiza? Onde vamos descarregar toda essa sua energia de sono acumulado? *(ri)*", chars: ["luiza", "enrique"] }
        ],
        choices: [
            { text: "Ir brincar na praça do parque", target: "passeio_parque_muito_rir", costEnergy: 5, hearts: { enrique: 1 } },
            { text: "Ir rir da vista alta no mirante", target: "mirante_parque_rir", costEnergy: 8, hearts: { enrique: 2 } },
            { text: "Ir comer mais no restaurante direto", target: "almoco_rir_direto", costEnergy: 0, hearts: { enrique: 0 } }
        ]
    },

    mirante_parque_rir: {
        bg: "parada_manha",
        time: "10:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles sobem rindo os degraus até o mirante." },
            { speaker: "Luiza", text: "Olha as casinhas lá embaixo parecendo formigas! *(ri)*", chars: ["luiza", "enrique"] }
        ],
        choices: [
            { text: "Fazer cócegas nele de repente", target: "mirante_rir_cocegas", costEnergy: 8, hearts: { enrique: 2 } },
            { text: "Fazer uma pose engraçada para foto", target: "mirante_rir_pose", costEnergy: 5, hearts: { enrique: 1 } }
        ]
    },

    mirante_rir_cocegas: {
        bg: "parada_manha",
        time: "11:00",
        dialogs: [
            { speaker: "Narrador", text: "Ela começa a fazer cócegas na costela dele. Enrique se contorce rindo alto." },
            { speaker: "Enrique", text: "Ei, para! *(rindo sem fôlego)* No mirante não vale, vou acabar caindo de tanto rir!", chars: ["luiza", "enrique"] }
        ],
        next: "almoco_muito_rir"
    },

    mirante_rir_pose: {
        bg: "parada_manha",
        time: "11:00",
        dialogs: [
            { speaker: "Narrador", text: "Eles tiram uma foto fazendo caretas engraçadas com a cidade ao fundo." },
            { speaker: "Enrique", text: "*(olha a foto e ri)* Ficou hilária! Essa vai direto pro nosso álbum de momentos divertidos.", chars: ["luiza", "enrique"] }
        ],
        next: "almoco_muito_rir"
    },

    almoco_rir_direto: {
        bg: "kalzone",
        time: "12:00",
        dialogs: [
            { speaker: "Narrador", text: "Com fome após a pressa de acordar, eles decidem ir direto para o almoço." },
            { speaker: "Enrique", text: "Já que estamos com fome, bora direto pro restaurante comer um Kalzone gigante!", chars: ["luiza", "enrique"] }
        ],
        next: "fim_ato1_muito_rir"
    },

    passeio_parque_muito_rir: {
        bg: "praca_manha",
        time: "10:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles caminham alegremente, brincando sobre como Luiza gosta de dormir." }
        ],
        choices: [
            { text: "Imitar as pessoas andando no parque para fazer Enrique rir", target: "parque_rir_imitar", costEnergy: 8, hearts: { enrique: 2 } },
            { text: "Cantar uma música engraçada juntos", target: "parque_rir_cantar", costEnergy: 8, hearts: { enrique: 1 } }
        ]
    },

    parque_rir_imitar: {
        bg: "praca_manha",
        time: "11:00",
        dialogs: [
            { speaker: "Narrador", text: "Ela faz uma mímica engraçada de um corredor de rua. Enrique quase chora de tanto rir." },
            { speaker: "Enrique", text: "Você não existe, amor! Como eu amo esse seu bom humor contagiante.", chars: ["luiza", "enrique"] }
        ],
        next: "almoco_muito_rir"
    },

    parque_rir_cantar: {
        bg: "praca_manha",
        time: "11:00",
        dialogs: [
            { speaker: "Narrador", text: "Eles começam a cantarolar uma música antiga da infância, se divertindo muito." },
            { speaker: "Enrique", text: "Passar o tempo com você é a melhor diversão do mundo, princesa.", chars: ["luiza", "enrique"] }
        ],
        next: "almoco_muito_rir"
    },

    almoco_muito_rir: {
        bg: "kalzone",
        time: "12:00",
        dialogs: [
            { speaker: "Narrador", text: "O almoço é descontraído, com a energia lá em cima." }
        ],
        next: "fim_ato1_muito_rir"
    },

    fim_ato1_muito_rir: {
        bg: "centro_manha",
        time: "13:00",
        dialogs: [
            { speaker: "Narrador", text: "O almoço termina e eles se sentem muito felizes e conectados para os planos da tarde." }
        ],
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
            { text: "Convidar a Talita", target: "talita_convite", costEnergy: 15, hearts: { talita: 2 } },
            { text: "Conversar um pouco", target: "talita_conversa_rapida", costEnergy: 5, hearts: { talita: 0 } },
            { text: "Ir embora rápido", target: "talita_ir_embora", costEnergy: 0, hearts: { talita: -1 } },
            { text: "Fingir que não a viu", target: "talita_ignorar", costEnergy: 0, hearts: { talita: -2 } }
        ]
    },

    talita_convite: {
        bg: "centro_tarde",
        time: "13:50",
        dialogs: [
            { speaker: "Luiza", text: "Talita, quer passear com a gente? Seria legal você ir junto!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Claro, se a Talita quiser ir, será um prazer.", chars: ["enrique", "talita"] }
        ],
        effects: { energia: -5, hearts: { talita: 0 } },
        next: "talita_aceita"
    },

    talita_aceita: {
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
            { text: "Ir na livraria", target: "talita_livraria", costEnergy: 10, hearts: { talita: 2 } },
            { text: "Tomar café na cafeteria", target: "talita_cafe", costEnergy: 8, hearts: { talita: 1 } },
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
            { speaker: "Talita", text: "VOCÊ VAI AMAR! E DEPOIS A GENTE PODE DISCUTIR SOBRE OS SHIPS! EU TENHO TANTAS TEORIAS! MAS SÉRIO, LUIZA, VOCÊ DEVERIA LER TAMBÉM, AINDA QUE VOCÊ SÓ FIQUE LENDO AQUELES ROMANCES CHATOS!", chars: ["luiza", "talita"] }
        ],
        effects: { energia: -10, hearts: { talita: 0, enrique: 0 } },
        choices: [
            { text: "Comprar um dos mangás recomendados por ela", target: "talita_livraria_manga", costEnergy: 5, hearts: { talita: 2 } },
            { text: "Defender seus romances clássicos com carinho", target: "talita_livraria_defesa", costEnergy: 0, hearts: { talita: 1 } }
        ]
    },

    talita_livraria_manga: {
        bg: "centro_tarde",
        time: "14:30",
        dialogs: [
            { speaker: "Luiza", text: "Sabe de uma coisa? Vou levar esse aqui que você recomendou pra gente ler juntas!", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "SÉRIO?! MEU DEUS, LUIZA! VOCÊ NÃO VAI SE ARREPENDER! É O MELHOR DIA DA MINHA VIDA! *(pula de alegria)*", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "*(sorri)* Bom proveito na leitura, princesa. A Talita vai te encher de teorias agora.", chars: ["luiza", "enrique"] }
        ],
        next: "talita_despedida"
    },

    talita_livraria_defesa: {
        bg: "centro_tarde",
        time: "14:30",
        dialogs: [
            { speaker: "Luiza", text: "Meus romances não são chatos, Talita! Eles têm sentimentos profundos e clássicos!", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "Romance de verdade é Naruto e Sasuke! Mas tudo bem, aceito sua preferência ultrapassada! *(ri)*", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "*(ri)* Cada um com seu gosto, né. Mas 500 fanfics é bastante coisa mesmo.", chars: ["luiza", "enrique"] }
        ],
        next: "talita_despedida"
    },

        talita_cafe: {
        bg: "cantina_tarde",
        time: "14:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles vão até a cafeteria que Talita recomendou. O lugar é aconchegante com cheiro de café fresco." },
            { speaker: "Talita", text: "ESTE LUGAR É O MELHOR! O CAFÉ TÃO PERFEITO E OS PÃES DE QUEIJO SÃO DIVINOS! E OLHA SÓ, A GARÇOA TÃO LINDA! *(pisca)*", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Achei o lugar bem legal.", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "Talita, para de flertar com todo mundo! *(ri)* Mas o café realmente parece bom.", chars: ["luiza", "talita"] }
        ],
        effects: { energia: -8, hearts: { talita: 0, enrique: 0 } },
        choices: [
            { text: "Pagar o café e o pão de queijo da Talita", target: "talita_cafe_pagar", costEnergy: 5, hearts: { talita: 2 } },
            { text: "Sugerir dividir a conta com ela", target: "talita_cafe_dividir", costEnergy: 0, hearts: { talita: 1 } }
        ]
    },

    talita_cafe_pagar: {
        bg: "cantina_tarde",
        time: "14:30",
        dialogs: [
            { speaker: "Luiza", text: "Pode deixar que eu pago o seu café hoje, Talita! É o nosso presente de dia dos namorados por você ser essa amiga incrível.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "AWW! LUIZA! VOCÊ É A MELHOR AMIGA DO MUNDO! *(abraça Luiza)* Enrique, você tem uma namorada de ouro!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "*(sorri)* Eu sei bem disso. O café daqui realmente estava excelente.", chars: ["luiza", "enrique"] }
        ],
        next: "talita_despedida"
    },

    talita_cafe_dividir: {
        bg: "cantina_tarde",
        time: "14:30",
        dialogs: [
            { speaker: "Luiza", text: "Vamos pegar a conta e dividir hoje, tudo bem, Tali?", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "Justo! Cada um paga o seu e todo mundo fica feliz! *(ri)* Mas valeu pela companhia!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Fechado, melhor assim. E valeu pela recomendação do lugar.", chars: ["luiza", "enrique"] }
        ],
        next: "talita_despedida"
    },

        talita_centro: {
        bg: "centro_tarde",
        time: "14:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles continuam passeando pelo centro com Talita. Ela não para de apontar coisas e contar histórias." },
            { speaker: "Talita", text: "OLHA AQUELA LOJA! EU COMPREI MINHA PRIMEIRA CALCINHA LÁ! FOI UM MARCO NA MINHA VIDA! E AQUELE OUTRO LUGAR FOI ONDE EU TIVE MEU PRIMEIRO BEIJO COM UMA MENINA! FOI TÃO ROMÂNTICO MAS ELA ME DEPOIS ME BLOQUEOU NO WHATSAPP!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Putz... que mancada.", chars: ["luiza", "talita"] }
        ],
        effects: { energia: -12, hearts: { talita: 0, enrique: 0 } },
        choices: [
            { text: "Rir e se divertir com as histórias escandalosas dela", target: "talita_centro_rir", costEnergy: 5, hearts: { talita: 2 } },
            { text: "Pedir discretamente para ela falar um pouco mais baixo", target: "talita_centro_baixo", costEnergy: 0, hearts: { talita: 1 } }
        ]
    },

    talita_centro_rir: {
        bg: "centro_tarde",
        time: "14:30",
        dialogs: [
            { speaker: "Luiza", text: "*(ri alto)* Talita, você é inacreditável! Só você pra gritar sobre calcinhas no meio do centro!", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "MAS É A VERDADE! COMPARTILHAR É VIVER! ENRIQUE, VOCÊ DEVERIA RIR MAIS TAMBÉM! LUIZA TÁ SORTUDA COM VOCÊ!", chars: ["enrique", "talita"] },
            { speaker: "Enrique", text: "*(ri)* Estou rindo, estou rindo. Você é bem figura mesmo.", chars: ["enrique", "talita"] }
        ],
        next: "talita_despedida"
    },

    talita_centro_baixo: {
        bg: "centro_tarde",
        time: "14:30",
        dialogs: [
            { speaker: "Luiza", text: "Tali, fala um pouquinho mais baixo... *(ri sem jeito)* O pessoal tá olhando.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "Ops! Foi mal! Às vezes eu me empolgo! *(fala sussurrando)* Mas o beijo foi romântico mesmo! Enfim, o Enrique é um bom namorado.", chars: ["enrique", "talita"] },
            { speaker: "Enrique", text: "*(sorri aliviado)* Valeu. Tento fazer o meu melhor pela Luiza.", chars: ["enrique", "talita"] }
        ],
        next: "talita_despedida"
    },

        talita_despedida: {
        bg: "centro_tarde",
        time: "16:00",
        dialogs: [
            { speaker: "Narrador", text: "Talita olha para o relógio e arregala os olhos, se preparando para correr." },
            { speaker: "Talita", text: "GENTE, PRECISO VOAR! SE EU ATRASAR MINHA MÃE ME TRANCA NO QUARTO! MAS FOI MARAVILHOSO! ME MANDEM WHATSAPP!", chars: ["luiza", "talita"] }
        ],
        effects: { energia: +5, hearts: { talita: 0, enrique: 0 } },
        choices: [
            { text: "Dar um abraço de urso bem apertado nela", target: "talita_despedida_abraco", costEnergy: 0, hearts: { talita: 2 } },
            { text: "Dar um tchauzinho carinhoso", target: "talita_despedida_tchau", costEnergy: 0, hearts: { talita: 1 } }
        ]
    },

    talita_despedida_abraco: {
        bg: "centro_tarde",
        time: "16:00",
        dialogs: [
            { speaker: "Luiza", text: "*(Dá um abraço bem apertado nela)* Tchau, Tali! Se cuida e corre logo!", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "OBRIGADA! AMO VOCÊS! TCHAUU! *(corre e some no meio da multidão)*", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Ela é bem agitada, né. Mas é gente boa, fico feliz que tenhamos nos dado bem.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Isso significa muito pra mim, Enrique. Obrigado por ser tão paciente.", chars: ["luiza", "enrique"] }
        ],
        next: "fim_ato2"
    },

    talita_despedida_tchau: {
        bg: "centro_tarde",
        time: "16:00",
        dialogs: [
            { speaker: "Luiza", text: "Tchau, Tali! Nos falamos no WhatsApp logo mais!", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "BEIJOS! TCHAUU! *(corre embora)*", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Ela é agitada, mas bem legal. Fico feliz que nos demos bem.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Ela é minha melhor amiga. Fico aliviada que você gostou dela.", chars: ["luiza", "enrique"] }
        ],
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
            { text: "Subir ao mirante com Talita", target: "talita_mirante_noite", costEnergy: 15, reqWeather: [WeatherTypes.SOL, WeatherTypes.FRIO], hearts: { talita: 2 } },
            { text: "Caminhar pelo parque com Talita", target: "talita_parque_noite", costEnergy: 12, hearts: { talita: 1 } },
            { text: "Passear pelo centro com Talita", target: "talita_passeio_noturno", costEnergy: 10, hearts: { talita: -1 } },
            { text: "Pedir pra Talita ir embora", target: "talita_jantar", costEnergy: 0, hearts: { talita: -2 } }
        ]
    },

        talita_passeio_noturno: {
        bg: "centro_noite",
        time: "19:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles passeiam pelo centro iluminado com Talita. Ela não para de comentar sobre tudo e todos." },
            { speaker: "Talita", text: "A CIDADE À NOITE É TÃO LINDA! TÃO ROMÂNTICA! MAS EU SÓ TENHO DATE RUIM, GENTE! MEUS DATES PARECEM FILTRADOS DO PIOR JEITO!", chars: ["luiza", "talita"] }
        ],
        effects: { energia: -10, hearts: { talita: 0, enrique: 0 } },
        choices: [
            { text: "Fazer uma pose dramática de ninja para confortá-la", target: "talita_passeio_pose", costEnergy: 5, hearts: { talita: 2 } },
            { text: "Rir e brincar sobre a má sorte dela nos dates", target: "talita_passeio_rir", costEnergy: 0, hearts: { talita: 1 } }
        ]
    },

    talita_passeio_pose: {
        bg: "centro_noite",
        time: "19:30",
        dialogs: [
            { speaker: "Luiza", text: "*(faz pose de ninja)* Nós vamos superar todos os dates ruins com o poder da amizade!", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "*(grita e faz pose também)* ISSO! DATTEBAYO! VOCÊ ESTÁ APRENDENDO!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "*(se diverte vendo as duas)* Vocês duas não batem bem, na moral. Mas é engraçado.", chars: ["luiza", "enrique"] }
        ],
        next: "talita_jantar"
    },

    talita_passeio_rir: {
        bg: "centro_noite",
        time: "19:30",
        dialogs: [
            { speaker: "Luiza", text: "*(ri)* Calma, Tali! A sua hora vai chegar. Aquelas pessoas é que não sabiam o que estavam perdendo!", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "NÉ?! EU SOU UMA DIVERSÃO PURA! ELAS PERDERAM A CHANCE DE OUVIREM TODAS AS MINHAS TEORIAS! *(ri)*", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "*(sorri)* Com certeza seria um encontro inesquecível.", chars: ["luiza", "enrique"] }
        ],
        next: "talita_jantar"
    },

        talita_mirante_noite: {
        bg: "parada_noite",
        time: "19:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles sobem ao mirante com Talita. A vista das luzes da cidade é espetacular." },
            { speaker: "Talita", text: "MEU DEUS! ESSA VISTA! É TÃO LINDA! QUASE TÃO LINDA QUANTO A CENA FINAL DE NARUTO SHIPPUDEN! É MUITO EMOCIONANTE!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Vista bonita mesmo, amor. Mas não entendo nada de Naruto.", chars: ["luiza", "talita"] },
            { speaker: "Luiza", text: "Talita, tudo se resume a Naruto com você, né? *(ri)*", chars: ["luiza", "talita"] }
        ],
        effects: { energia: -15, hearts: { talita: 0, enrique: 0 } },
        choices: [
            { text: "Tirar uma selfie engraçada com a Talita", target: "talita_mirante_selfie", costEnergy: 5, hearts: { talita: 2 } },
            { text: "Admirar a vista noturna abraçando a amiga", target: "talita_mirante_vista", costEnergy: 0, hearts: { talita: 1 } }
        ]
    },

    talita_mirante_selfie: {
        bg: "parada_noite",
        time: "19:30",
        dialogs: [
            { speaker: "Luiza", text: "*(Puxa o celular)* Vamos tirar uma foto juntas com essa vista! Faz careta, Talita!", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "SIIIM! *(faz uma pose super expressiva)* Essa vai pro meu feed com certeza!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "*(ri)* Vocês duas parecem duas crianças juntas.", chars: ["luiza", "enrique"] }
        ],
        next: "talita_jantar"
    },

    talita_mirante_vista: {
        bg: "parada_noite",
        time: "19:30",
        dialogs: [
            { speaker: "Luiza", text: "Realmente é uma vista mágica... Fico tão feliz de compartilhar esse momento com você, Tali.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "Aww, Luiza! Me fez chorar de verdade agora! *(dá um abraço de lado)* Você é a melhor.", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "*(sorri abraçando Luiza por trás)* Verdade. O mirante é incrível.", chars: ["luiza", "enrique"] }
        ],
        next: "talita_jantar"
    },

        talita_parque_noite: {
        bg: "praca_noite",
        time: "19:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles caminham pelo parque à noite com Talita. O lugar está silencioso, exceto pela Talita." },
            { speaker: "Talita", text: "O PARQUE À NOITE É TÃO MISTERIOSO! PARECE UMA FLORESTA MÁGICA DE ANIME! MAS TÁ UM POUCO FRIO, NÉ?", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "É, a temperatura caiu bastante à noite.", chars: ["luiza", "talita"] }
        ],
        effects: { energia: -12, hearts: { talita: 0, enrique: 0 } },
        choices: [
            { text: "Sugerir dividir um chocolate quente para aquecer", target: "talita_parque_chocolate", costEnergy: 5, hearts: { talita: 2 } },
            { text: "Caminhar sob as árvores ouvindo as teorias dela", target: "talita_parque_caminhar", costEnergy: 0, hearts: { talita: 1 } }
        ]
    },

    talita_parque_chocolate: {
        bg: "praca_noite",
        time: "19:30",
        dialogs: [
            { speaker: "Luiza", text: "Tem um quiosque de chocolate quente logo ali, vamos comprar um pra dividir e nos aquecer!", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "EBA! CHOCOLATE QUENTE É O MEU PONTO FRACO! VOCÊ É A MELHOR!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Deixem que eu compro pra vocês, meninas. Fiquem aqui.", chars: ["luiza", "enrique"] }
        ],
        next: "talita_jantar"
    },

    talita_parque_caminhar: {
        bg: "praca_noite",
        time: "19:30",
        dialogs: [
            { speaker: "Luiza", text: "O frio deixa mais aconchegante! Conta mais sobre as suas teorias de Naruto na floresta, Tali.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "SÉRIO?! VOCÊ QUER MESMO SABER?! AI MEU DEUS! ENTÃO, TUDO COMEÇA COM ELES FICANDO PRESOS NUMA CAVERNA...", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "*(ri, ouvindo com atenção)* Quanta imaginação você tem, Talita.", chars: ["luiza", "enrique"] }
        ],
        next: "talita_jantar"
    },

        talita_jantar: {
        bg: "oponente_bar_jantar",
        time: "20:30",
        dialogs: [
            { speaker: "Narrador", text: "Eles vão jantar no restaurante que Enrique reservou. Talita se junta à mesa, animada como sempre." },
            { speaker: "Talita", text: "MEU DEUS! ESSE LUGAR É TÃO CHIQUE! EU NUNCA VI TANTA ELEGÂNCIA! E OLHA SÓ, ENRIQUE, VOCÊ É TÃO DE SORTE DE TER A LUIZA! ELA É PERFEITA! VOCÊS SÃO O CASAL MAIS FOFO!", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Valeu. A Luiza é tudo pra mim mesmo.", chars: ["luiza", "talita"] }
        ],
        effects: { energia: +10, hearts: { talita: 0, enrique: 0 } },
        choices: [
            { text: "Dizer que a Talita é a melhor amiga do mundo e abraçá-la", target: "talita_jantar_melhor_amiga", costEnergy: 5, hearts: { talita: 2 } },
            { text: "Brincar sobre a obsessão hilária dela por Naruto e Sasuke", target: "talita_jantar_obsessao", costEnergy: 0, hearts: { talita: 1 } }
        ]
    },

    talita_jantar_melhor_amiga: {
        bg: "oponente_bar_jantar",
        time: "20:30",
        dialogs: [
            { speaker: "Luiza", text: "E eu tenho muita sorte de ter você como minha melhor amiga, Tali. Obrigada por estar aqui.", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "AWW! EU VOU CHORAR DE NOVO! *(abraça Luiza)* Vocês são minha família! Mas preciso ir antes que meu anime termine! Tchau, se divirtam! *(corre embora)*", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Ela é bem doida, princesa, mas tem um coração de ouro.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "É. Fico aliviada que você se deu bem com ela.", chars: ["luiza", "enrique"] }
        ],
        next: "jantar_noturno"
    },

    talita_jantar_obsessao: {
        bg: "oponente_bar_jantar",
        time: "20:30",
        dialogs: [
            { speaker: "Luiza", text: "Se a gente casar um dia, a única regra é que você não pode ler fanfics de Naruto no altar! *(ri)*", chars: ["luiza", "talita"] },
            { speaker: "Talita", text: "*(ri alto)* Prometo nada! Mas gente, preciso ir correndo terminar meu anime! Tchauuu! *(corre embora)*", chars: ["luiza", "talita"] },
            { speaker: "Enrique", text: "Ela é uma figura completa, princesa. Bom, agora sobramos só nós dois.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "É... um tempinho só nosso.", chars: ["luiza", "enrique"] }
        ],
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
            { text: "Convidar o Enrique pra entrar", target: "enrique_convite_entrar", costEnergy: 15, hearts: { enrique: 1 } },
            { text: "Dar beijo de despedida", target: "despedida_beijo", costEnergy: 5, hearts: { enrique: 0 } },
            { text: "Ficar na porta conversando", target: "ficar_mais", costEnergy: 10, hearts: { enrique: -1 } },
            { text: "Ir direto pra casa dormir", target: "ir_dormir_cansada", costEnergy: 0, hearts: { enrique: -2 } }
        ]
    },

    enrique_convite_entrar: {
        bg: "casa_luiza_noite",
        time: "00:50",
        dialogs: [
            { speaker: "Enrique", text: "Luiza, quer que eu entre? Ainda é cedo, podemos conversar mais um pouco se você quiser.", chars: ["luiza", "enrique"] },
            { speaker: "Luiza", text: "Sim, eu queria muito! Adoraria conversar mais com você.", chars: ["luiza", "enrique"] }
        ],
        effects: { energia: -5, hearts: { enrique: 0 } },
        next: "enrique_entra"
    },

    enrique_entra: {
        bg: "casa_luiza_noite",
        time: "01:00",
        dialogs: [
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