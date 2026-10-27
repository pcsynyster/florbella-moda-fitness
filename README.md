# Florbella Moda Fitness

Site da loja Florbella Moda Fitness (Av. Boa Sorte, 102 - Zona Norte, Natal/RN). HTML, CSS e JS puros.

## Estrutura
- `index.html` - estrutura da página
- `style.css` - estilos
- `script.js` - produtos, sacola, horário de funcionamento e envio do pedido para o WhatsApp
- `assets/img` - fotos dos produtos e capas dos vídeos
- `assets/video/loja.mp4` - vídeo da abertura (por dentro da loja)
- `assets/video/conjunto-pink.mp4` - vídeo da seção "Florbella em movimento"

## Configurar
No topo do `script.js`, objeto `CONFIG`:
- `whatsapp`: número da loja com DDI e DDD, só números
- `instagram`: link do perfil
- `horarios`: horários por dia da semana (1 = segunda ... 6 = sábado), usados no aviso "Aberto agora"

Produtos ficam no array `PRODUCTS` (nome, ref, categoria, preço Pix, preço cartão, tamanhos, cores, imagem).
Os preços atuais são fictícios, apenas para apresentação.

## Pedido
Não há pagamento no site. A cliente escolhe cor, tamanho e quantidade, monta a sacola, informa nome,
pagamento e recebimento, e o botão abre o WhatsApp com a mensagem do pedido pronta.
