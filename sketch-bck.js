let ra = 34;
let f0;
let w0;

let time = 0;
let wave = [];
let termo = 1;
let run = 1;

function setup(){
    f0 = 100 * ra;
    w0 = 2 * 180 * f0;
    createCanvas(960, 530);
    document.querySelector('#termo').addEventListener('change', e => {
        e.target.value < 1 ? e.target.value = 1 : e.target.value = e.target.value;
        termo = e.target.value;
        update();
    });
    document.querySelector('#ra').addEventListener('change', e => {
        e.target.value < 1 ? e.target.value = 1 : e.target.value = e.target.value;
        ra = e.target.value;
        f0 = 100 * ra;
        w0 = 2 * 180 * f0;
        update();
    });
    document.querySelector('#parar').addEventListener('click', e => {
        if(run){
            noLoop();
            run = 0;
            e.target.innerHTML = 'Continuar';
        }else {
            loop();
            run = 1;
            e.target.innerHTML = 'Parar';
        }
    })
}

function draw() {
    background(15);                             // Define um fundo escuro à area do canvas
    data();                                     // Função que mostra os dados do gráfico
    translate(100, 270);                        
    line(-30,0,760,0);
    text('0', -50, 5);

    let y = 0.5;      
    if(termo !== 1){
        for(let i = 0; i < termo - 1; i++){
            let n = i * 2 + 1;                  // Apenas números ímpares são utilizados na fórmula
            y += (2/(n * PI)) * sin(radians(n * w0 * time));    // Função matemática que gera os dados
        }
    }
    wave.push(y);                               
    let drawY;    
    beginShape();
    stroke(255);                                // Define a cor branca para a linha da curva
    noFill();                                   // retira o preenchimento
    for(let i = 0; i < wave.length; i++){
        drawY = wave[i] * -200;                 // No canvas, o eixo vertical é orientado positivamente para baixo
        vertex(i, drawY);                       
        if(i >= 740) noLoop();                  // Para de desenhar assim que o eixo x chega no pixel 740
    }
    endShape();
    stroke(50)                                  // Muda a cor da linha 
    line(-30, drawY, 760, drawY)                // Desenha uma linha que acompanha o valor do eixo y
    stroke(150)                                 
    text(`Ponto atual: ${drawY/-200}`, -80, -250);   // Escreve o ponto atual no canto superior 
    time += 0.000001;                           // Tempo utilizado na Função matemática
}

function data(){
    textSize(14);
    stroke(100)
    textFont('Lucida Sans')
    text(`Maior ponto: ${max(wave)}`, 20, 440);
    text(`Menor ponto: ${min(wave)}`, 20, 460);
    text(`Amplitude: ${max(wave) - min(wave)}`, 20, 480);
    text(`Frequência: ${f0}Hz`, 20, 500);
}

function update(){
    wave = [];
    time = 0;
    loop();
}