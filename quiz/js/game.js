// variaveis de controle do jogo

let perguntasFeitas = [];

// perguntas do jogo
const perguntas = [
    { pergunta: "Qual dessas linguagens nao é considerada uma linguagem de programacao?", 
      respostas: ["PHP", "JavaScript", "C++", "HTML"],
      correta: "resp3"
    },
    { pergunta: "Em que ano o Brasil foi descoberto?", 
      respostas: ["1498", "1500", "1375", "1828"],
      correta: "resp1"
    },
    { pergunta: "O que significa a sigla HTML", 
      respostas: ["Hyper Toonto Maluco Legal", "Hiper Text Markup Language", "Hey Trade More Language", "Hyper Text Mark Lang"],
      correta: "resp1"
    },
    { pergunta: "Qual dessas linguagens e considerada uma linguagem de marcacao?", 
      respostas: ["HTML", "JavaScript", "C++", "PHP"],
      correta: "resp0"
    }
]

var qtdPerguntas = perguntas.length -1 ; 

gerarPergunta(qtdPerguntas);

function gerarPergunta(maxPerguntas){
    //    gerar um numero aleatorio
    let aleatorio = (Math.random() * maxPerguntas).toFixed();
    //converter para numero
    aleatorio = Number(aleatorio);
    // mostrar no console
    console.log('A pergunta sorteada foi: ' + aleatorio);
    
    //verificar se a pergutna ja foi feita
    if (!perguntasFeitas.includes(aleatorio)){
        //colocar como pergunta feita
        perguntasFeitas.push(aleatorio);

        //passar para o html os dados da questao selecionada
        var p_selecionada = perguntas[aleatorio].pergunta;
        //console.log(p_selecionada);

        //alimentar pergunta vinda do sorteio
        $("#pergunta").html(p_selecionada);
        $("#pergunta").attr('data-indice',aleatorio);

        //colocar respostas
        for (var i=0; i<4; i++) {
          $("#resp" + i).html(perguntas[aleatorio].respostas[i]);
        }

        var pai = $("#respostas");
        var botoes = pai.children();
        
        for (var i=1; i<botoes.length; i++){
          pai.append(botoes.eq(Math.floor(Math.random() * botoes.length)));
        }

    }else {
      //se a pergunta ja foi feita
      console.log('A pergunta ja foi feita. Sorteando novamente...');
      if (perguntasFeitas.length < qtdPerguntas + 1){
        return gerarPergunta(maxPerguntas);
      }else{
        console.log('Acabaram as pergutnas!');
        $('#quiz').addClass('oculto');
        $('#mensagem').html('Parabens voce venceu!. Acertou tudo');
        $('#status').removeClass('oculto');
      }
    }
}

$('.resposta').click(function() {
  if ($("#quiz").attr('data-status') !== 'travado') { 
  //percorrer todas as respostas e desmarcar a classe selecionada
  /*$('.resposta').each(function(){
    if($(this).hasClass('selecionada')){
      $(this).removeClass('selecionada')
    }
  })*/
    resetaBotoes();
    //adicionaar a classe selecionada
    $(this).addClass('selecionada');
  }
});

$("#confirm").click(function(){
  //pegar indice da pergunta
  var indice = $("#pergunta").attr('data-indice');

  //qual resp certa
  var respCerta = perguntas[indice].correta;

  //resposta que o usuario selecionaou
  $('.resposta').each(function(){
    if ($(this).hasClass('selecionada')){
      var respostaEscolhida = $(this).attr('id');

      if (respCerta == respostaEscolhida) {
        //alert('Acertou!!!!');
        console.log('Acertou!!!!');
        proximaPergunta();
      }else{
        console.log('Errou!');
        $("#quiz").attr('data-status','travado');
        $("#confirm").addClass('oculto');
        $('#'+ respCerta).addClass('correta');
        $('#'+ respostaEscolhida).removeClass('selecionada');
        $('#'+ respostaEscolhida).addClass('errada');
        setTimeout(function () {
          gameOver();
        }, 4000);
      }
    }
  })
});

function newGame(){
  $("#confirm").removeClass('oculto');
  $("#quiz").attr('data-status', 'ok');
  perguntasFeitas = [];
  resetaBotoes(); 
  gerarPergunta(qtdPerguntas);
  $('#quiz').removeClass('oculto');
  $('#status').addClass('oculto');
}
function proximaPergunta(){
 /* //percorrer todas as respostas e desmarcar a classe selecionada
  $('.resposta').each(function(){
    if($(this).hasClass('selecionada')){
      $(this).removeClass('selecionada')
    }
  });
  */
  resetaBotoes(); 
  gerarPergunta(qtdPerguntas);

}

///refatoracao de codigo : criar funcao com a parte q se repete
function resetaBotoes(){
  $('.resposta').each(function(){
    if($(this).hasClass('selecionada')){
      $(this).removeClass('selecionada')
    }
    if($(this).hasClass('correta')){
      $(this).removeClass('correta')
    }
    if($(this).hasClass('errada')){
      $(this).removeClass('errada')
    }
  });
}

function gameOver() {
  $('#quiz').addClass('oculto');
  $('#mensagem').html('Game Over');
  $('#status').removeClass('oculto');
}

$('#novoJogo').click(function () {
  newGame();
})