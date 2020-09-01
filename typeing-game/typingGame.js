"use strict";

    /*Fisher–Yates shuffle Algo*/
    function shuffle(array) {
      
      var currentIndex = array.length, temporaryValue, randomIndex;
    
      // While there remain elements to shuffle...
      while (currentIndex) {
    
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
    
      return array;
    }
    
    let words = ["python", "monitor", "programmer" ,"keyboard",
"mouse", "javascript", "functional", "gaming", "network", "engineer"];

 
    //Start game
    $('.start_game').on('click', function(){
      $('.game-board.before').hide();
      shuffle(words);
      printingWords();
    });
    
    
      
    //Generate random position
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1));
    }
    
    //Print Word
    var i = -1;
    function  printingWords(){
    
      i = (i + 1) % words.length;
      $(".words-block").append('<div id="dump'+i+'" class="gamewords">' + words[i] + '</div>');
      
      setTimeout(printingWords , 2500)
      
      //For random bg color
      var colors = ["#C8D6B8","#F6ABB6","#CBCBCB","#46D3F9","#FF594C","#C9D970"];                
      var randColors = Math.floor(Math.random()*colors.length);           
      $("#dump"+i).css("background-color", colors[randColors]);
    
      //for random x-position
      $("#dump"+i).css({'left': getRandomInt(-50,200)});
    
      $("#dump"+i).animate({
        top : '100%'
      }, 10000, function(){
        var position = $(".gamewords").position();
        if(position.top > 270){
          $('.game-board.after').show();
        };
        
        
      });
      
    };
    
    
    //Match Words
    var score= 0;
    function matchWords(){
      if($('.input-field').val() == $('.gamewords:first-child').text()) {
          
          $('.input-field').val("");
          $('.gamewords:first-child').remove();
          $('.digit').text(score+=1);
          var targetedLblScore = $('.mainscore-board .digit').text();
          if(targetedLblScore >= 10){
            $('.message-text').text("Level Completed!").show().delay(500).fadeOut();
            setInterval( function(){
              $('.game-board.after').show().fadeIn();
              $('.game-board.after .game-title').text("Congrats! Level Completed");
              $('.btn.reset_game').text("Play Again");
            },1000);

          }
          
      }
      else{
        $('.message-text').text("Wrong word").show().delay(1000).fadeOut();
        var currentScore = $('.mainscore-board .digit').text();

        $('.input-field').val("");
          
      }
    }
    
    $('.input-field').on('keypress', function (e) {
      if(e.which === 13){
        matchWords();
      }
    
    });