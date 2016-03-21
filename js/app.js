// wait for the DOM to finish loading
$(document).ready(function() {
  // all code to manipulate the DOM
  // goes inside this function

  var $boxes = $('.box');

  var turn = "Kitty";
  $('.message').html( "Let's Play!" );

///resets game, winner plays first move///
  function resetGame() {
    $('.message').html( "Go " + turn+ "!");
    $boxes.text("");
    $boxes.removeClass("Kitty");
    $boxes.removeClass("Doggy");
  }

  function changeTurn() {
    if (turn === "Kitty") {
      turn = "Doggy";
    } else {
      turn = "Kitty";
    }
    $('.message').html( "Go " + turn + "!");
  }



  // returns "X" if player X owns all three boxes passed in,
  //   "O" if player O owns all three boxes passed in, or
  //   null otherwise
  function allThree($firstBox, $secondBox, $thirdBox) {
   var firstBoxOwner = $firstBox.text(),
        secondBoxOwner = $secondBox.text(),
        thirdBoxOwner = $thirdBox.text();

    if ((firstBoxOwner === secondBoxOwner) && (secondBoxOwner === thirdBoxOwner)){
      if (firstBoxOwner === "Kitty"){
        return "Kitty";
      } else if (firstBoxOwner === "Doggy"){
        return "Doggy";
      }
    }

    return null;
  }

  function diagonalWinner() {
    var leftDownDiag = allThree($boxes.eq(0), $boxes.eq(4), $boxes.eq(8));
    var rightUpDiag = allThree($boxes.eq(2), $boxes.eq(4), $boxes.eq(6));

    return leftDownDiag || rightUpDiag;
  }

  function columnWinner() {
    var leftCol = allThree($boxes.eq(0), $boxes.eq(3), $boxes.eq(6));
    var middleCol = allThree($boxes.eq(1), $boxes.eq(4), $boxes.eq(7));
    var rightCol = allThree($boxes.eq(2), $boxes.eq(5), $boxes.eq(8));

    return leftCol || (middleCol || rightCol);
  }

  function rowWinner() {
    var topRow = allThree($boxes.eq(0), $boxes.eq(1), $boxes.eq(2));
    var middleRow = allThree($boxes.eq(3), $boxes.eq(4), $boxes.eq(5));
    var bottomRow = allThree($boxes.eq(6), $boxes.eq(7), $boxes.eq(8));

    return topRow || (middleRow || bottomRow);
  }

  function getWinner() {
    return diagonalWinner() || (rowWinner() || columnWinner());
  }

  // helper function to check if whole board is full
  function boardHasEmptyBoxes() {
    // start by assuming no empty boxes
    var hasEmptyBoxes = false;
    // check if every box is empty
    for (var i=0; i<$boxes.length; i++){
      // as soon as an empty box is found, update hasEmptyBoxes
      if ($boxes.eq(i).text() === ''){
        hasEmptyBoxes = true;
      }
    }
    return hasEmptyBoxes;
  }



  /**** EVENT LISTENERS ****/

  // listen for clicks on reset button to reset the game
  $('#reset').on('click', function() {
    resetGame();
  });


  // listen for clicks on each box to play the game
  $boxes.on('click', function() {
    // check if this box is already claimed
    if ($(this).text() === "") {

      // box is empty! continue with the turn
      // mark this box
      $(this).text(turn);
      $(this).addClass(turn);


      // check for a winner
      var winner = getWinner();
      if (winner === "Kitty") {
        $('.message').html( "Kitty is the winner!");
        // $boxes.addClass(winner);
          $boxes.addClass("Kitty");
          $boxes.removeClass("Doggy");

        }  else if (winner === "Doggy") {
            $('.message').html( "Doggy is the winner!");
            // $boxes.addClass(winner);
              $boxes.addClass("Doggy");
              $boxes.removeClass("Kitty");

      } else if (boardHasEmptyBoxes()) {
        changeTurn();
      } else {
        $('.message').html( "Wow, that's a tie!" );
      }
    }
  });


});
