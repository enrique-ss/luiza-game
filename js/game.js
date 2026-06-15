// As configurações (ASSETS, WeatherTypes, STICKERS) estão em config.js

// Configuração de estilos por sprite - fácil de modificar
const SPRITE_STYLES = {
    luiza: {
        color: '#ff5555',
        glow: 'rgba(255, 85, 85, 0.4)',
        name: 'Luiza'
    },
    enrique_zen: {
        color: '#98c379',
        glow: 'rgba(152, 195, 121, 0.4)',
        name: 'Enrique'
    },
    enrique: {
        color: '#98c379',
        glow: 'rgba(152, 195, 121, 0.4)',
        name: 'Enrique'
    },
    talita: {
        color: '#f1fa8c',
        glow: 'rgba(241, 250, 140, 0.4)',
        name: 'Talita'
    }
};

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
        updateWeatherIconHUD();
        console.log('updateWeatherIconHUD() finished');
    } catch (error) {
        console.error('Error in updateWeatherIconHUD:', error);
    }
}

function updateWeatherIconHUD() {
    console.log('updateWeatherIconHUD() called');
    const weatherIcon = document.getElementById('weather-icon');
    console.log('Weather icon element:', weatherIcon);
    console.log('Current weather:', currentWeather);
    if (!weatherIcon) {
        console.log('Weather icon element not found!');
        return;
    }
    
    const icons = {
        [WeatherTypes.SOL]: 'fa-sun',
        [WeatherTypes.CHUVA]: 'fa-cloud-rain',
        [WeatherTypes.FRIO]: 'fa-snowflake'
    };
    
    const newIconClass = icons[currentWeather] || icons[WeatherTypes.SOL];
    console.log('Setting icon class to:', newIconClass);
    
    // Force update by setting className directly with fa-solid prefix
    weatherIcon.className = 'fa-solid ' + newIconClass;
    console.log('Weather icon className set to:', weatherIcon.className);
    
    // Force a reflow to ensure the icon updates
    void weatherIcon.offsetWidth;
}


// Estado do Jogo
let coracoes = {
    enrique: 0,
    talita: 0
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

// A história (StoryNodes e ChatScripts) está em history.js

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

// Função para atualizar o sprite da Luiza
function updateLuizaSprite(nodeKey) {
    const imgLuiza = document.getElementById('img-luiza');
    if (imgLuiza && ASSETS.sprites.luiza) {
        imgLuiza.style.display = '';
        imgLuiza.src = ASSETS.sprites.luiza;
    }
}

function fallbackSprite(character) {
    const img = document.getElementById(`img-${character}`);
    // Apenas esconde se a imagem realmente falhou ao tentar carregar um src válido
    if (img && img.src && !img.src.endsWith('/') && img.getAttribute('src') !== '') {
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
        talita: 0
    };
    roupaEscolhida = "";
    lastTime = "08:00";

    // Gerar Energia aleatória entre 80 e 100 pontos
    energiaLuiza = Math.floor(Math.random() * (100 - 80 + 1)) + 80;

    dialogHistory = [];

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
    if (name === 'Enrique') return 'var(--primary)';
    if (name === 'Luiza') return '#ff5555';
    return 'var(--text-muted)';
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
    
    // Reset previous speaker when loading a new scene for dynamic sprite alternation
    previousSpeaker = null;

    // Check if energy is too low and trigger bad ending
    if (energiaLuiza <= 0 && nodeKey !== "fim_jogo_ruim" && nodeKey !== "fim_jogo") {
        loadNode("fim_jogo_ruim");
        return;
    }

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
        // Enrique tem máximo de 10 corações
        const maxHearts = 10;
        coracoes[personagem] = Math.max(0, Math.min(maxHearts, coracoes[personagem] + amount));
    });
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
    
    // Embaralha as opções para não ficarem na mesma ordem
    const shuffledChoices = [...choices].sort(() => Math.random() - 0.5);
    
    shuffledChoices.forEach(choice => {
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

        // Requisito de Clima
        if (choice.reqWeather && !choice.reqWeather.includes(currentWeather)) {
            isLocked = true;
            const weatherNames = {
                [WeatherTypes.SOL]: 'Sol',
                [WeatherTypes.CHUVA]: 'Chuva',
                [WeatherTypes.FRIO]: 'Frio'
            };
            lockReason = `Clima inadequado`;
        }

        if (isLocked) {
            // Se o bloqueio for por corações, não mostra como bloqueado visualmente
            if (choice.reqHearts && !hasRequiredHearts(choice.reqHearts)) {
                btn.innerHTML = `
                    <span>${choice.text}</span>
                `;
                btn.onclick = () => {
                    // No Valentine's Day game, all choices should be available
                    if (choice.hearts) {
                        applyHeartEffects(choice.hearts);
                    }
                    if (choice.costEnergy) {
                        energiaLuiza -= choice.costEnergy;
                    }
                    updateHUD();
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
                // Deduct energy cost if specified
                if (choice.costEnergy) {
                    energiaLuiza -= choice.costEnergy;
                }
                
                // Apply hearts change from choice
                if (choice.hearts) {
                    applyHeartEffects(choice.hearts);
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
                energiaLuiza += (n.effects.energia || 0);
                applyHeartEffects(n.effects.hearts);
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

// Funções Auxiliares de Navegação
backToMenu = () => {
    switchScreen('screen-menu');
};

showHistory = () => {
    openModal('log-modal');
};
