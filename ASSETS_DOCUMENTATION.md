# Documentação de Assets - Imagens do Jogo

Este documento lista todas as imagens necessárias para o funcionamento do jogo Otome.

## Estrutura da Pasta assets/

```
assets/
├── backgrounds/  (Imagens de fundo dos cenários)
└── sprites/      (Sprites dos personagens)
```

## Imagens de Fundo (Backgrounds)

Todas as imagens de fundo devem ser colocadas na pasta `assets/`:

| Nome do Arquivo | Cenário | Descrição |
|----------------|---------|-----------|
| `bg_casa.jpg` | Casa da Julia | Quarto de Julia onde ela escolhe a roupa |
| `bg_quero.quero.jpg` | Loja Quero-Quero | Ambiente de trabalho da Julia |
| `bg_aula.jpg` | Sala do Senac | Sala de aula onde Julia estuda |
| `bg_cantina.jpg` | Cantina | Cantina do Senac onde fazem lanche |
| `bg_parada.jpg` | Parada de ônibus | Parada onde Julia espera o ônibus |
| `bg_centro.jpg` | Centro da cidade | Rua central do centro |
| `bg_bar.jpg` | Bar Oponente | Bar onde o grupo se encontra |
| `bg_festa.jpg` | Festa Tributo | Festa onde Julia dança |
| `bg_praca.jpg` | Praça | Praça tranquila bem arborizada onde Julia pinta bob goodies |
| `bg_kalzone.jpg` | Kalzone | Interior do Kalzone, cafeteria bem movimentada com cor primária verde |

### Especificações Técnicas para Backgrounds:
- **Formato**: JPG ou PNG
- **Resolução recomendada**: 1920x1080 pixels (16:9)
- **Tamanho máximo**: 2MB por imagem
- **Deve cobrir toda a tela** sem distorção

## Sprites dos Personagens

Todas as imagens dos personagens devem ser colocadas na pasta `assets/`:

### Sistema de Sprites da Julia

A Julia possui **4 variações de sprite** que mudam dinamicamente conforme a roupa que ela escolhe e o contexto da história:

| Nome do Arquivo | Personagem | Estado/Emoção | Descrição | Quando é Usado |
|----------------|-----------|---------------|-----------|----------------|
| `julia_pijama.png` | Julia | Pijama | Julia usando pijama confortável em casa | Antes de escolher roupa |
| `julia_moletom.png` | Julia | Com Moletom | Julia usando moletom gigante e quentinho | Após escolher moletom (fora do trabalho) |
| `julia_leve.png` | Julia | Roupa Leve | Julia usando blusa leve, cropped e fresca | Após escolher roupa leve (fora do trabalho) |
| `julia_capa.png` | Julia | Capa de Chuva | Julia usando capa de chuva amarela e galochas | Após escolher capa (fora do trabalho) |
| `julia_uniforme.png` | Julia | Uniforme Quero-Quero | Julia usando uniforme da loja | Durante o trabalho na Quero-Quero |

**Regra importante:** Durante o período de trabalho na Quero-Quero, a Julia SEMPRE usa o sprite `julia_uniforme.png`, independente da roupa que escolheu. Só após o trabalho que ela volta a usar o estilo escolhido.

### Sprites dos Personagens Masculinos

| Nome do Arquivo | Personagem | Estado/Emoção | Descrição |
|----------------|-----------|---------------|-----------|
| `enrique_zen.png` | Enrique | Zen/Calmo | Sprite do Enrique expressão serena |
| `otavio_crente.png` | Otávio | Crente/Religioso | Sprite do Otávio com expressão religiosa |
| `ruan_namorado.png` | Ruan | Namorando | Sprite do Ruan como namorado perfeito |

### Especificações Técnicas para Sprites:
- **Formato**: PNG com transparência
- **Resolução recomendada**: 512x512 pixels
- **Fundo**: Deve ser transparente (canal alpha)
- **Posição**: Personagem centralizado, corpo completo ou até a cintura
- **Tamanho máximo**: 500KB por sprite

## Notas Importantes

1. **Nomes dos arquivos**: Os nomes devem ser EXATAMENTE como listados acima, pois são referenciados no código JavaScript
2. **Extensões**: Use as extensões especificadas (.jpg para backgrounds, .png para sprites)
3. **Localização**: Todos os arquivos devem estar diretamente na pasta `assets/` (não em subpastas)
4. **Fallback**: O jogo tem um sistema de fallback que esconde sprites que não carregam, mas é ideal ter todas as imagens

## Como Adicionar Novas Imagens

1. Coloque a imagem na pasta `assets/`
2. Renomeie para o nome exato especificado acima
3. Verifique se o formato e tamanho estão dentro das especificações
4. Recarregue o jogo para testar

## Prompts para IA - Gerar Imagens no Mesmo Estilo

Use estes prompts para gerar todas as imagens do jogo com IA (como Midjourney, DALL-E, Stable Diffusion, etc.). Todos os prompts foram criados para manter um estilo artístico consistente.

### Estilo Artístico Base
**Estilo:** Anime/Mangá com influência de visual novel brasileira, cores vibrantes mas suaves, iluminação natural, estilo semi-realista com traços de anime.

---

### Prompts para Backgrounds (Cenários)

**Estilo para todos os backgrounds:**
> "Anime visual novel background, soft anime art style, warm lighting, detailed environment, 1920x1080, high quality, no characters"

**Prompts específicos:**

1. **bg_casa.jpg** (Quarto de Julia):
> "Cozy bedroom interior, anime visual novel style, morning sunlight through window, messy bed with stuffed animals, desk with laptop and books, wardrobe with clothes, warm color palette, soft anime art, 1920x1080"

2. **bg_quero.quero.jpg** (Loja Quero-Quero):
> "Hardware store interior, anime visual novel style, shelves with tools and construction materials, organized displays, bright fluorescent lighting, retail environment, orange and green color scheme, soft anime art, 1920x1080"

3. **bg_aula.jpg** (Sala do Senac):
> "Modern classroom interior, anime visual novel style, rows of computers and desks, projector screen, whiteboard, air conditioning units, clean and professional, blue and white color scheme, soft anime art, 1920x1080"

4. **bg_cantina.jpg** (Cantina do Senac):
> "School cafeteria interior, anime visual novel style, tables and chairs, food counter, vending machines, casual atmosphere, warm lighting, yellow and orange tones, soft anime art, 1920x1080"

5. **bg_parada.jpg** (Parada de ônibus):
> "Bus stop exterior, anime visual novel style, evening sunset lighting, urban street, bus shelter, city buildings in background, warm orange and purple sky, soft anime art, 1920x1080"

6. **bg_centro.jpg** (Centro da cidade):
> "City street exterior, anime visual novel style, downtown area, shops and storefronts, pedestrians walking, daytime natural lighting, vibrant colors, soft anime art, 1920x1080"

7. **bg_bar.jpg** (Bar Oponente):
> "Bar interior, anime visual novel style, pool table, dim lighting, neon signs, casual atmosphere, wooden furniture, warm amber lighting, soft anime art, 1920x1080"

8. **bg_festa.jpg** (Festa Tributo):
> "Party interior, anime visual novel style, dance floor with colorful lights, people dancing, energetic atmosphere, disco ball, vibrant neon colors, soft anime art, 1920x1080"

9. **bg_praca.jpg** (Praça tranquila):
> "Quiet park exterior, anime visual novel style, peaceful green space with many trees, benches, walking paths, natural sunlight filtering through leaves, serene atmosphere, soft green and blue tones, soft anime art, 1920x1080"

10. **bg_kalzone.jpg** (Interior do Kalzone):
> "Busy cafeteria interior, anime visual novel style, pizzeraria with green as primary color, tables and chairs, pizza counter, people eating and talking, lively atmosphere, warm lighting, green and warm color scheme, soft anime art, 1920x1080"

---

### Prompts para Sprites da Julia

**Estilo base para todos os sprites da Julia:**
> "Anime character sprite, visual novel style, full body shot, transparent background, soft anime art, consistent character design, 512x512"

**Prompts específicos:**

1. **julia_pijama.png** (Sprite de pijama):
> "Young Brazilian woman, anime visual novel style, wearing comfortable pajamas, cozy morning look, medium length brown hair, sleepy but friendly expression, standing pose, transparent background, soft anime art, 512x512"

2. **julia_moletom.png** (Com moletom):
> "Young Brazilian woman, anime visual novel style, wearing oversized gray hoodie, comfortable and cozy, medium length brown hair, friendly expression, standing pose, transparent background, soft anime art, 512x512"

3. **julia_leve.png** (Roupa leve):
> "Young Brazilian woman, anime visual novel style, wearing light cropped t-shirt and comfortable pants, fresh and casual look, medium length brown hair, friendly expression, standing pose, transparent background, soft anime art, 512x512"

4. **julia_capa.png** (Capa de chuva):
> "Young Brazilian woman, anime visual novel style, wearing yellow raincoat and rain boots, cute and practical, medium length brown hair, friendly expression, standing pose, transparent background, soft anime art, 512x512"

5. **julia_uniforme.png** (Uniforme Quero-Quero):
> "Young Brazilian woman, anime visual novel style, wearing retail store uniform (orange vest with name tag, black pants), professional but approachable, medium length brown hair, friendly expression, standing pose, transparent background, soft anime art, 512x512"

---

### Prompts para Sprites dos Personagens Masculinos

**Estilo base para todos os sprites masculinos:**
> "Anime male character sprite, visual novel style, full body shot, transparent background, soft anime art, consistent character design, 512x512"

**Prompts específicos:**

1. **enrique_zen.png** (Enrique zen):
> "Young Brazilian man, anime visual novel style, calm and zen expression, wearing casual skater/nerd style clothes, dark hair, peaceful demeanor, standing pose, transparent background, soft anime art, 512x512"

2. **otavio_crente.png** (Otávio crente):
> "Young Brazilian man, anime visual novel style, warm religious expression, wearing modest casual clothes, dark hair, kind and gentle face, standing pose, transparent background, soft anime art, 512x512"

3. **ruan_namorado.png** (Ruan namorado):
> "Young Brazilian man, anime visual novel style, romantic and loving expression, wearing stylish casual clothes, dark hair, handsome and caring face, standing pose, transparent background, soft anime art, 512x512"

---

### Dicas para Gerar Imagens Consistentes

1. **Use sempre o mesmo estilo base** nos prompts para manter consistência visual
2. **Mantenha as características físicas consistentes** (cor de cabelo, tipo de corpo, etc.)
3. **Use as mesmas palavras-chave de estilo** em todos os prompts: "anime visual novel style, soft anime art"
4. **Gere várias variações** e escolha a melhor para cada sprite
5. **Teste as imagens no jogo** para verificar se ficam bem no contexto

## Verificação

Antes de lançar o jogo, verifique se todos os 18 arquivos estão presentes:

### Backgrounds (10 arquivos):
- [ ] bg_casa.jpg
- [ ] bg_quero.quero.jpg
- [ ] bg_aula.jpg
- [ ] bg_cantina.jpg
- [ ] bg_parada.jpg
- [ ] bg_centro.jpg
- [ ] bg_bar.jpg
- [ ] bg_festa.jpg
- [ ] bg_praca.jpg
- [ ] bg_kalzone.jpg

### Sprites da Julia (5 arquivos):
- [ ] julia_pijama.png
- [ ] julia_moletom.png
- [ ] julia_leve.png
- [ ] julia_capa.png
- [ ] julia_uniforme.png

### Sprites dos Personagens Masculinos (3 arquivos):
- [ ] enrique_zen.png
- [ ] otavio_crente.png
- [ ] ruan_namorado.png

## Figurinhas/Stickers do WhatsApp

As figurinhas são usadas nas conversas do WhatsApp do jogo (Ato 4). Devem ser colocadas na pasta `assets/`:

| Nome do Arquivo | Personagem | Descrição | Quando é Usado |
|----------------|-----------|-----------|----------------|
| `sticker_love.png` | Ruan | Sticker romântico "TE AMO" | No chat do WhatsApp com Ruan |
| `sticker_vigia.png` | Otávio | Sticker "VIGIA" | No chat do grupo do Senac |

### Especificações Técnicas para Stickers:
- **Formato**: PNG com transparência
- **Resolução recomendada**: 512x512 pixels (quadrado)
- **Fundo**: Deve ser transparente (canal alpha)
- **Estilo**: Estilo de sticker/emoji, cartoon ou anime simplificado
- **Tamanho máximo**: 300KB por sticker
- **Texto**: Deve incluir o texto principal visível ("TE AMO" ou "VIGIA")

### Prompts para Stickers

**Estilo base para todos os stickers:**
> "Anime sticker style, WhatsApp sticker, cute cartoon style, transparent background, bold text, 512x512, high quality"

**Prompts específicos:**

1. **sticker_love.png** (Sticker "TE AMO" do Ruan):
> "Cute romantic anime sticker, young Brazilian man holding heart, loving expression, text 'TE AMO' in bold letters, pink and red color scheme, WhatsApp sticker style, transparent background, 512x512"

2. **sticker_vigia.png** (Sticker "VIGIA" do Otávio):
> "Funny anime sticker, young Brazilian man with surprised/warning expression, text 'VIGIA' in bold letters, yellow and orange color scheme, WhatsApp sticker style, transparent background, 512x512"

### Stickers (2 arquivos):
- [ ] sticker_love.png
- [ ] sticker_vigia.png
