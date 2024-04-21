# Conjunto de Mandelbrot - A simples e complexa beleza da matemática

## Fractais

Fractais são um dos objetos matemáticos mais intrigantes que existem. Eles possuem 
formas peculiares e não convencionais e, a medida que se aplica zoom na imagem, pode-se
perceber que há figuras menores e que se assemelham às figuras grandes.

Um dos fractais mais conhecidos é o descoberto pelo matemático Benoit B. Mandelbrot. 
O conjunto de Mandelbrot surge a partir da expressao ![expressão_de_Mandelbrot](https://wikimedia.org/api/rest_v1/media/math/render/svg/1a54e8358cb6b679f0936e282906d718bd34ecb3), onde C é um número complexo qualquer.
A expressão começa em ![z0](https://wikimedia.org/api/rest_v1/media/math/render/svg/81f6f4311c47cbb4b4e5de7b5984f7773f7c34ad) e a partir daí os valores serão incrementados na fórmula.
Um detalhe importante é que o valor só é considerado com pertencente ao conjunto caso o módulo de Zn 
seja menor ou igual a 2. Caso contrário, está fora do conjunto.


## Criando o fractal de Mandelbrot no navegador

Fascinado com esse conceito matemático, decidi criar uma representação desse conjunto. Foi desafiador.
Criei um programa em JS que gera esse fractal. Utilizei o próprio Canvas para renderizar a imagem no navegador.
Os dos maiores desafios foi de como otimizar meu programa e aplicar o zoom. Pesquisando muito, encontrei
um outro usuário do GitHub e me inspirei na ideia dele (https://dev.to/foqc/mandelbrot-set-in-js-zoom-in-2hmc). Claro que não copiei o código dele, 
apenas usei a ideia dele de usar o worker para otimizar o programa e o cálculo do zoom, mas a estruturação 
do código se difere.

Vou deixar as imagens do resultado que obtive após a conclusão desse projeto.

### Imagem 1

<a href="Mandelbrot-Set/screenshots/fractal-img-1.png" alt="imagem-1"></a>

### Imagem 2

<a href="Mandelbrot-Set/screenshots/fractal-img-2.png" alt="imagem-2"></a>


### Imagem 3

<a href="Mandelbrot-Set/screenshots/fractal-img-3.png" alt="imagem-3"></a>

### Imagem 4

<a href="Mandelbrot-Set/screenshots/fractal-img-4.png"a lt="imagem-4"></a>


### Imagem 5

<a href="Mandelbrot-Set/screenshots/fractal-img-5.png" alt="imagem-5"></a>

### Imagem 6

<a href="Mandelbrot-Set/screenshots/fractal-img-6.png" alt="imagem-6"></a>