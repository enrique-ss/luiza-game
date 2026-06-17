let currentWeather = WeatherTypes.SOL;
let previousSpeaker = null;

function getRandomWeather() {
    const weatherOptions = [WeatherTypes.SOL, WeatherTypes.CHUVA, WeatherTypes.FRIO];
    const randomWeather = weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
    console.log('Random weather generated:', randomWeather);
    return randomWeather;
}

function setWeather(weather) {
    currentWeather = weather;
    console.log('Weather set to:', currentWeather);
    try {
        updateWeatherIcon(document.getElementById('hud-time-val')?.textContent || '08:00');
    } catch (error) {
        console.error('Error in updateWeatherIcon:', error);
    }
}


// Estado do Jogo
let coracoes = {
    enrique: 0,
    talita: 0
};
let currentNodeKey = null;
let energiaLuiza = 80;
let visitedNodes = new Set();
const EXHAUSTION_ENERGY_THRESHOLD = 20;

const ENERGY_EFFECTS = {
    'cansativa': -10,
    'neutra': 0,
    'tranquila': 15
};

const HEART_EFFECTS = {
    'muito bom': 1,
    'bom': 0.5,
    'neutro': 0,
    'ruim': -1
};

function applyEnergyEffect(effectName) {
    const change = ENERGY_EFFECTS[effectName] || 0;
    energiaLuiza = Math.max(0, Math.min(100, energiaLuiza + change));
}

let dialogHistory = [];
let storyQueue = [];
let queueIndex = 0;
let typingInterval = null;
let isTyping = false;
let currentText = "";
let chatStep = 0;
let exhaustionWarningShownForNode = null;

// Inicializar o jogo ao carregar
window.onload = function() {
    createStars();
    preloadSprites();
};

function preloadSprites() {
    const imgLuiza = document.getElementById('img-luiza');
    const imgEnrique = document.getElementById('img-enrique');
    const imgTalita = document.getElementById('img-talita');

    if (imgLuiza) {
        imgLuiza.style.display = '';
        imgLuiza.src = ASSETS.sprites.luiza;
    }
    if (imgEnrique) {
        imgEnrique.style.display = '';
        imgEnrique.src = ASSETS.sprites.enrique_zen;
    }
    if (imgTalita) {
        imgTalita.style.display = '';
        imgTalita.src = ASSETS.sprites.talita;
    }
}


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
        talita: 0
    };
    lastTime = "08:00";

    // Gerar Energia aleatória entre 90 e 100 pontos
    energiaLuiza = Math.floor(Math.random() * (100 - 90 + 1)) + 90;

    dialogHistory = [];
    visitedNodes = new Set();
    exhaustionWarningShownForNode = null;

    updateHUD();
    switchScreen('screen-game');
    
    // Initialize random weather after screen switch to ensure element exists
    setTimeout(() => {
        console.log('Attempting to set weather...');
        setWeather(getRandomWeather());
    }, 500);
    
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
    const key = getCharacterKeyFromSpeaker(name);
    return SPRITE_STYLES[key]?.color || 'var(--text-muted)';
}

// Atualizar Informações na HUD
function updateHUD() {
    // Enrique tem máximo de 10 corações
    coracoes.enrique = Math.max(0, Math.min(10, coracoes.enrique));

    updateHeartMeter('score-enrique', coracoes.enrique, 10);
    
    // Talita tem máximo de 10 corações
    coracoes.talita = Math.max(0, Math.min(10, coracoes.talita));

    updateHeartMeter('score-talita', coracoes.talita, 10);
    
    // Sincroniza também os valores no drawer mobile
    updateHeartMeter('drawer-score-enrique', coracoes.enrique, 10);
    updateHeartMeter('drawer-score-talita', coracoes.talita, 10);
    
    energiaLuiza = Math.max(0, Math.min(100, energiaLuiza));

    document.getElementById('val-energia').textContent = energiaLuiza;
    document.getElementById('bar-energia').style.width = energiaLuiza + '%';

    // Sincroniza barras do drawer mobile
    const dValEn = document.getElementById('drawer-val-energia');
    const dBarEn = document.getElementById('drawer-bar-energia');
    if (dValEn) dValEn.textContent = energiaLuiza;
    if (dBarEn) dBarEn.style.width = energiaLuiza + '%';
    
    console.log('HUD atualizado - Enrique:', coracoes.enrique, 'Talita:', coracoes.talita, 'Energia:', energiaLuiza);
}

function updateHeartMeter(elementId, amount, maxHearts = 5) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.log('Elemento não encontrado:', elementId);
        return;
    }

    const filled = Math.max(0, Math.min(maxHearts, amount));
    element.innerHTML = Array.from({ length: maxHearts }, (_, index) => {
        const className = index < filled ? 'heart-full' : 'heart-empty';
        return `<span class="${className}">♥</span>`;
    }).join('');
    
    console.log('Heart meter atualizado:', elementId, 'amount:', amount, 'filled:', filled, 'maxHearts:', maxHearts);
}

function updateWeatherIcon(time) {
    const weatherIcon = document.getElementById('weather-icon');
    if (!weatherIcon) return;

    const [hStr, mStr] = (time || '08:00').split(':');
    const totalMin = parseInt(hStr, 10) * 60 + parseInt(mStr, 10);

    if (totalMin >= 1200) {
        weatherIcon.className = 'fa-solid fa-moon';
        return;
    }

    const icons = {
        [WeatherTypes.SOL]: 'fa-sun',
        [WeatherTypes.CHUVA]: 'fa-cloud-rain',
        [WeatherTypes.FRIO]: 'fa-snowflake'
    };

    const newIconClass = icons[currentWeather] || 'fa-sun';
    weatherIcon.className = 'fa-solid ' + newIconClass;
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
        // Decaimento: 1 ponto de energia a cada 60 minutos
        const energyLoss = Math.floor(diffMinutes / 60);
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
    visitedNodes.add(nodeKey);
    
    // Reset previous speaker when loading a new scene for dynamic sprite alternation
    previousSpeaker = null;

    // Check if energy is too low and trigger bad ending
    if (energiaLuiza <= 0 && nodeKey !== "fim_jogo_ruim" && nodeKey !== "fim_jogo") {
        loadNode("fim_jogo_ruim");
        return;
    }

    const node = StoryNodes[nodeKey];
    if (!node) return;

    if (node.effects) {
        if (node.effects.energia) {
            applyEnergyEffect(node.effects.energia);
        }
        if (node.effects.hearts) {
            applyHeartEffects(node.effects.hearts);
        }
        updateHUD();
    }

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
        
        // Check for weather-based dialogue variations
        if (item.weatherDialogs && item.weatherDialogs[currentWeather]) {
            textToPlay = item.weatherDialogs[currentWeather];
        }
        
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
            if (
                energiaLuiza < EXHAUSTION_ENERGY_THRESHOLD &&
                energiaLuiza > 0 &&
                exhaustionWarningShownForNode !== currentNodeKey
            ) {
                exhaustionWarningShownForNode = currentNodeKey;
                showDialogText(
                    "Luiza",
                    "*(suspiro)* Estou tão exausta... Será que ainda tenho forças pra ser romântica?"
                );
                return;
            }
            showChoices(currentNodeObj.choices);
        } else if (currentNodeObj.next === 'show_goodnight_screen') {
            showGoodnightScreen();
        } else if (currentNodeObj.next === 'show_bad_ending_screen') {
            showBadEndingScreen();
        } else if (currentNodeObj.next) {
            loadNode(currentNodeObj.next);
        }
    }
}

function applyHeartEffects(heartEffects) {
    if (!heartEffects) {
        console.log('Heart effects é null/undefined');
        return;
    }

    console.log('Aplicando heart effects:', heartEffects);
    console.log('Antes - Enrique:', coracoes.enrique, 'Talita:', coracoes.talita);

    Object.entries(heartEffects).forEach(([personagem, effectName]) => {
        if (coracoes[personagem] === undefined) {
            console.log('Personagem não encontrado no coracoes:', personagem);
            return;
        }
        
        const change = HEART_EFFECTS[effectName] || 0;
        coracoes[personagem] = Math.max(0, Math.min(10, coracoes[personagem] + change));
        
        console.log('Aplicado', change, 'corações para', personagem, '- Total agora:', coracoes[personagem]);
    });
    
    // Aplica exclusão mútua: total máximo de 10 corações entre Enrique e Talita
    const totalHearts = coracoes.enrique + coracoes.talita;
    console.log('Total de corações:', totalHearts);
    if (totalHearts > 10) {
        // Se passou de 10, reduz proporcionalmente para manter o total em 10
        const excess = totalHearts - 10;
        const enriqueRatio = coracoes.enrique / totalHearts;
        const talitaRatio = coracoes.talita / totalHearts;
        
        coracoes.enrique = Math.max(0, coracoes.enrique - Math.ceil(excess * enriqueRatio));
        coracoes.talita = Math.max(0, coracoes.talita - Math.ceil(excess * talitaRatio));
        
        console.log('Excesso de corações detectado. Reduzindo proporcionalmente.');
    }
    
    // Garante que cada um não passe de 10 individualmente e não seja menor que 0
    coracoes.enrique = Math.max(0, Math.min(10, coracoes.enrique));
    coracoes.talita = Math.max(0, Math.min(10, coracoes.talita));
    
    console.log('Depois - Enrique:', coracoes.enrique, 'Talita:', coracoes.talita);
}

// Exibir Diálogo com efeito de digitação gradual
function showDialogText(speaker, text, activeCharKey) {
    const nameTag = document.getElementById('dialog-name');
    const textBox = document.getElementById('dialog-text');
    const dialogBox = document.getElementById('dialog-box');
    const speakerCharKey = getCharacterKeyFromSpeaker(speaker);
    
    // Track previous speaker for dynamic sprite alternation
    const previousSpeakerCharKey = previousSpeaker ? getCharacterKeyFromSpeaker(previousSpeaker) : null;
    previousSpeaker = speaker;
    
    // Dynamic sprite logic: always show current speaker + previous speaker (if different), but hide all if Narrator
    let activeCharKeys = [];
    if (getSpeakerClassName(speaker) !== 'narrador') {
        if (speakerCharKey) {
            activeCharKeys.push(speakerCharKey);
        }
        if (previousSpeakerCharKey && previousSpeakerCharKey !== speakerCharKey) {
            activeCharKeys.push(previousSpeakerCharKey);
        }
    }
    
    nameTag.textContent = speaker;
    nameTag.className = 'dialog-name-tag ' + getSpeakerClassName(speaker);

    // Aplicar border dinâmico baseado no speaker
    if (speakerCharKey && SPRITE_STYLES[speakerCharKey]) {
        const style = SPRITE_STYLES[speakerCharKey];
        dialogBox.style.borderColor = style.color;
        
        // Atualizar cor da seta pulsante (dialog cursor)
        const dialogCursor = document.querySelector('.dialog-cursor');
        if (dialogCursor) {
            dialogCursor.style.color = style.color;
        }
    } else {
        dialogBox.style.borderColor = 'var(--surface-border)';
        
        // Resetar cor da seta para branco se for narrador, ou padrão caso contrário
        const dialogCursor = document.querySelector('.dialog-cursor');
        if (dialogCursor) {
            if (speaker === 'Narrador') {
                dialogCursor.style.color = '#ffffff';
            } else {
                dialogCursor.style.color = 'var(--primary)';
            }
        }
    }

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



function getCharacterKeyFromSpeaker(speaker) {
    const normalizedSpeaker = getSpeakerClassName(speaker);

    const speakerSpriteMap = {
        luiza: 'luiza',
        enrique: 'enrique',
        talita: 'talita'
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
        // Remove glow inline styles
        sprite.style.filter = '';
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
                
                // Aplicar glow dinâmico baseado no sprite
                const spriteStyle = SPRITE_STYLES[activeCharKey];
                if (spriteStyle && spriteStyle.glow) {
                    activeSprite.style.filter = `drop-shadow(0 0 15px ${spriteStyle.glow})`;
                }
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
        // Se as opções estiverem visíveis na tela, o jogador é obrigado a escolher uma
        const choicesContainer = document.getElementById('choices-container');
        if (choicesContainer && choicesContainer.style.display === 'flex') {
            return;
        }

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
        talita: 'Talita'
    };

    return Object.entries(requirements)
        .map(([personagem, amount]) => `${amount} coração com ${names[personagem] || personagem}`)
        .join(' e ');
}

function isExpressiveChoice(choice) {
    const effects = resolveChoiceEffects(choice);
    if (!effects.hearts) return false;
    return Object.values(effects.hearts).includes('muito bom');
}

function isOutdoorContext(context) {
    return context === 'parque' || context === 'mirante';
}

function isIndoorComfortContext(context) {
    return context === 'cinema' || context === 'cafe' || context === 'bar' || context === 'restaurante';
}

function isPhysicalContactChoice(choice) {
    return choice.energy === 'cansativa' || choice.context === 'fisico';
}

function downgradeHeartTier(tier) {
    const order = ['muito bom', 'bom', 'neutro', 'ruim'];
    const index = order.indexOf(tier);
    return index === -1 ? tier : order[Math.min(order.length - 1, index + 1)];
}

function upgradeHeartTier(tier) {
    const order = ['ruim', 'neutro', 'bom', 'muito bom'];
    const reverseOrder = ['muito bom', 'bom', 'neutro', 'ruim'];
    const index = reverseOrder.indexOf(tier);
    return index === -1 ? tier : reverseOrder[Math.max(0, index - 1)];
}

function resolveChoiceEffects(choice) {
    let energy = choice.energy;
    let hearts = choice.hearts ? { ...choice.hearts } : null;
    const context = choice.context;

    if (currentWeather === WeatherTypes.CHUVA) {
        if (isOutdoorContext(context)) {
            if (energy === 'neutra' || energy === 'tranquila') {
                energy = 'cansativa';
            }
            if (hearts) {
                Object.keys(hearts).forEach(personagem => {
                    hearts[personagem] = downgradeHeartTier(hearts[personagem]);
                });
            }
        }

        if (isIndoorComfortContext(context) && hearts) {
            Object.keys(hearts).forEach(personagem => {
                if (hearts[personagem] !== 'ruim') {
                    hearts[personagem] = upgradeHeartTier(hearts[personagem]);
                }
            });
        }
    }

    if (hearts && isPhysicalContactChoice(choice)) {
        if (currentWeather === WeatherTypes.FRIO) {
            Object.keys(hearts).forEach(personagem => {
                hearts[personagem] = upgradeHeartTier(hearts[personagem]);
            });
        } else if (currentWeather === WeatherTypes.SOL) {
            Object.keys(hearts).forEach(personagem => {
                hearts[personagem] = downgradeHeartTier(hearts[personagem]);
            });
        }
    }

    return { energy, hearts };
}

function meetsChoiceCondition(choice) {
    const condition = choice.condition;
    if (!condition) return true;

    if (condition.heartsEnriqueMin !== undefined && coracoes.enrique < condition.heartsEnriqueMin) {
        return false;
    }
    if (condition.heartsTalitaMin !== undefined && coracoes.talita < condition.heartsTalitaMin) {
        return false;
    }
    if (condition.energyMin !== undefined && energiaLuiza < condition.energyMin) {
        return false;
    }
    if (condition.visitedNode && !visitedNodes.has(condition.visitedNode)) {
        return false;
    }

    return true;
}

function getChoiceLockState(choice) {
    const condition = choice.condition || {};

    if (condition.visitedNode && !visitedNodes.has(condition.visitedNode)) {
        return { locked: true, hidden: true, reason: '' };
    }

    if (!meetsChoiceCondition(choice)) {
        if (condition.heartsEnriqueMin !== undefined && coracoes.enrique < condition.heartsEnriqueMin) {
            return { locked: true, reason: `Requer ${condition.heartsEnriqueMin} corações com Enrique` };
        }
        if (condition.heartsTalitaMin !== undefined && coracoes.talita < condition.heartsTalitaMin) {
            return { locked: true, hidden: true, reason: '' };
        }
        if (condition.energyMin !== undefined && energiaLuiza < condition.energyMin) {
            return { locked: true, reason: `Requer Energia >= ${condition.energyMin}%` };
        }

        return { locked: true, reason: 'Requisito não atendido' };
    }

    if (choice.reqHearts && !hasRequiredHearts(choice.reqHearts)) {
        return { locked: true, reason: getHeartRequirementText(choice.reqHearts), hidden: true };
    }

    if (choice.reqEnergyMin !== undefined && energiaLuiza < choice.reqEnergyMin) {
        return { locked: true, reason: `Requer Energia >= ${choice.reqEnergyMin}%` };
    }

    if (energiaLuiza < EXHAUSTION_ENERGY_THRESHOLD && isExpressiveChoice(choice)) {
        return { locked: true, reason: 'Luiza está exausta demais para isso' };
    }

    if (choice.reqWeather && !choice.reqWeather.includes(currentWeather)) {
        return { locked: true, reason: 'Clima inadequado' };
    }

    return { locked: false, reason: '' };
}

function applyWeatherHeartModifier(heartEffects, choice) {
    return resolveChoiceEffects(choice).hearts || heartEffects;
}

// Exibir opções de escolha
function showChoices(choices) {
    const container = document.getElementById('choices-container');
    container.innerHTML = '';

    const visibleChoices = choices.filter(choice => {
        const lockState = getChoiceLockState(choice);
        return !lockState.hidden;
    });

    visibleChoices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';

        const lockState = getChoiceLockState(choice);

        if (lockState.locked) {
            btn.classList.add('locked');
            btn.innerHTML = `
                <span>${choice.text}</span>
                <span class="choice-requirement"><i class="fa-solid fa-lock"></i> ${lockState.reason}</span>
            `;
            btn.onclick = () => {
                btn.classList.add('shake');
                setTimeout(() => btn.classList.remove('shake'), 400);
            };
        } else {
            btn.innerHTML = `
                <span>${choice.text}</span>
            `;
            btn.onclick = () => {
                const resolved = resolveChoiceEffects(choice);

                if (resolved.energy) {
                    applyEnergyEffect(resolved.energy);
                }

                if (resolved.hearts) {
                    applyHeartEffects(resolved.hearts);
                }

                updateHUD();

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
                if (n.effects.energia) {
                    applyEnergyEffect(n.effects.energia);
                }
                updateHUD();
                break;
            }
        }
        switchScreen('screen-final');
    }
}

// ================= TELA DE BOA NOITE =================
function showGoodnightScreen() {
    createStars('stars-container-goodnight');
    switchScreen('screen-goodnight');
}

// ================= TELA DE FIM DE JOGO RUIM =================
function showBadEndingScreen() {
    switchScreen('screen-final');
}

// Funções Auxiliares de Navegação
backToMenu = () => {
    switchScreen('screen-menu');
};

showHistory = () => {
    openModal('log-modal');
};
