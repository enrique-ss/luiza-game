# Guia de Design de Choices — Um Dia Doce (V2.0)

## 🎯 Regra Fundamental

> **Toda escolha deve ter peso real.** Duas opções com a mesma consequência não são uma escolha — são uma ilusão. O jogador deve gerenciar o equilíbrio entre **Afeto (Hearts)** e **Vigor (Energy)**. Se ele tentar ser perfeito em tudo, Luiza ficará exausta antes do fim do dia.

---

## 🛠 Estrutura de Choices (O Matriz de Design)

### 4 Opções (Padrão Ouro)
Utilize este formato nos momentos principais de cada ato.

| Posição | Hearts | Energy | Arquétipo de Ação | Descrição Narrativa |
| :--- | :--- | :--- | :--- | :--- |
| **1ª** | `muito bom` | `cansativa` | **Expressiva** | Ação romântica ativa, beijos, declarações, esforço físico. |
| **2ª** | `bom` | `neutra` | **Receptiva** | Diálogo positivo, escuta ativa, concordar com o parceiro. |
| **3ª** | `neutro` | `tranquila` | **Pragmática** | Focar no ambiente, descansar, observar ou economizar tempo. |
| **4ª** | `ruim` | `neutra` | **Distante** | Reclamação, desinteresse, grosseria ou priorizar algo trivial. |

---

### 2 Opções (O Dilema Estratégico)
Utilize em transições ou momentos de intimidade.

| Tipo | Hearts | Energy | Lógica |
| :--- | :--- | :--- | :--- |
| **Opção A** | `muito bom` | `cansativa` | Ganho alto de afeto, mas consome o fôlego da Luiza. |
| **Opção B** | `bom` | `tranquila` | Ganho moderado, permitindo que Luiza relaxe. |

> ⚠️ **PROIBIDO:** Nunca ofereça duas opções com o mesmo valor de Hearts. Se ambas forem positivas, uma deve obrigatoriamente custar mais Energy que a outra.

---

## ⚡ Gerenciamento de Energy

### Valores de Impacto
*   **`cansativa` (-10):** Ações de alta intensidade (Correr, dançar, discussões profundas, subir mirantes, arrumação complexa).
*   **`neutra` (0):** Ações cotidianas (Conversar sentado, caminhar no plano, olhar vitrines).
*   **`tranquila` (+15):** Ações de recuperação (Sentar no banco, silêncio confortável, fechar os olhos, ir embora cedo para descansar).

### A Regra do Cansaço
Se a energia da Luiza cair abaixo de **20%**, diálogos específicos de "Exaustão" devem ser ativados, e opções `muito bom` (Expressivas) podem ser bloqueadas, pois ela não tem forças para ser romântica.

---

## ❤️ O Equilíbrio de Hearts (Enrique vs. Talita)

*   **Enrique (Foco Principal):** O objetivo é o final romântico.
*   **Talita (O Fator Social):** Interações com a Talita testam o relacionamento. 
*   **Conflito de Interesses:** Escolhas que dão `muito bom` para a Talita (como convidá-la para o passeio noturno) geralmente resultam em `ruim` ou `neutro` para o Enrique (pela perda de privacidade).

---

## ⛈️ Integração de Clima (Weather)

As escolhas devem refletir o ambiente. O clima não é apenas visual, ele altera a narrativa:
*   **Chuva:** Opções de "Caminhar no Parque" tornam-se `cansativa` ou perdem Hearts. Opções de "Cinema/Café" ganham bônus de conforto.
*   **Frio:** Opções de contato físico (abraços, cafuné) ganham bônus de Hearts.
*   **Calor:** Opções de contato físico (abraços, cafuné) perdem Hearts.

---

## 🔐 Requisitos de Choice (Conditions)

Para dar profundidade, algumas escolhas só devem aparecer se certos critérios forem atendidos:

1.  **Requisito de Afeto:** "Fazer declaração de amor" só aparece se `hearts.enrique` > 7.
2.  **Requisito de Energia:** "Dançar a noite toda" só aparece se `energy` > 30.
3.  **Requisito de Memória:** "Falar sobre o livro que compramos" só aparece se o jogador escolheu o node `livraria` no Ato 2.

---

## 🏗 Arquitetura dos Nodes

Para manter o fluxo orgânico, use os efeitos de entrada:

*   **`effects.energia`:** Aplique `tranquila` em nodes de transição (ex: "No táxi a caminho do restaurante") para simular um descanso natural.
*   **`effects.hearts`:** Use para penalizar atrasos (ex: se o jogador escolheu "Dormir mais", o node de chegada do Enrique já aplica um `hearts.enrique: 'bom'` automático em vez de `muito bom`).

---

## ✅ Checklist de Qualidade (Antes de Publicar)

1.  [ ] **Variedade:** Em um bloco de 4, eu tenho pelo menos uma opção para recuperar energia?
2.  [ ] **Consequência:** Se eu escolher a opção 4 (`ruim`), o Enrique reage negativamente no diálogo seguinte?
3.  [ ] **Narrativa:** O texto da escolha descreve a **intenção** da Luiza? (Ex: em vez de "Beijar", use "Envolvê-lo em um beijo apaixonado").
4.  [ ] **Talita:** Se a Talita está em cena, a escolha equilibra a atenção entre ela e o Enrique?
5.  [ ] **Clima:** O diálogo de resposta considera se está chovendo ou fazendo sol?

---

## 📖 Exemplo de Node "Perfeito"

```javascript
jantar_conversa: {
    bg: "restaurante_noite",
    time: "21:00",
    effects: { energia: 'neutra' },
    dialogs: [
        { speaker: "Enrique", text: "Esse dia foi incrível, Luiza. Eu não queria que acabasse nunca." }
    ],
    choices: [
        { 
            text: "Dizer que ele é o amor da sua vida", 
            target: "final_declaracao", 
            energy: 'cansativa', 
            hearts: { enrique: 'muito bom' },
            condition: { heartsEnriqueMin: 8 }
        },
        { 
            text: "Segurar a mão dele por cima da mesa", 
            target: "final_carinho", 
            energy: 'tranquila', 
            hearts: { enrique: 'bom' } 
        },
        { 
            text: "Falar sobre os planos para a próxima semana", 
            target: "final_futuro", 
            energy: 'neutra', 
            hearts: { enrique: 'neutro' } 
        },
        { 
            text: "Bocejar e perguntar da conta", 
            target: "final_cansada", 
            energy: 'tranquila', 
            hearts: { enrique: 'ruim' } 
        }
    ]
}
```