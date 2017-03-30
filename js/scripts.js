//business logic
//object containing data regarding each player
function Player(name, number) {
  this.playerName = name;
  this.turnScore = 0;
  this.playerScore = 0;
  this.playerNumber = number;
}

//ends the current Player's turn and adds their turn score to their total score
Player.prototype.hold = function() {
  this.playerScore += this.turnScore;
  this.turnScore = 0;
}

Player.prototype.checkForWin = function() {

}


//object representing a six-sided die
function Die() {
  this.sides = [1,2,3,4,5,6];
}

/* returns a random number from 1-6, simulating the roll of a die.
   takes a Player object as an argument and manipulates the turnScore key according to the number 'rolled' */
Die.prototype.roll = function(player) {
  var rolledSide = this.sides[Math.floor(Math.random() * this.sides.length)];
  if (rolledSide == 1) {
    player.turnScore = 0;
  } else {
    player.turnScore += rolledSide;
  }
  return rolledSide;
}

//returns who the turn player is based on how many turns have passed
var whichTurn = function(player1, player2, turns) {
  if (turns % 2 === 0) {
    return player2;
  } else {
    return player1;
  }
}


//ui logic
$(function() {
  $('form').submit(function(event) {
    event.preventDefault();
    var player1Name = $('input#player1name').val(),
        player2Name = $('input#player2name').val(),
        player1 = new Player(player1Name, 1),
        player2 = new Player(player2Name, 2),
        die = new Die(),
        turnCount = 1;

    //reset the form and display player1 as turn player
    $(this).trigger('reset');
    $('#turn-player-name').text(player1Name);


    $('button#roll-button').click(function() {
      //determine the turn Player (will be an object),
      var turnPlayer = whichTurn(player1, player2, turnCount);

      //get a random number 1-6
      var roll = die.roll(turnPlayer);


      //insert current game info (dice roll/turn score/total score) into the div of the current player (1 or 2)
      $('#player' + turnPlayer.playerNumber + ' .die-roll').text(roll);
      $('#player' + turnPlayer.playerNumber + ' .turnscore').text(turnPlayer.turnScore);

      //if a 1 was rolled, increment the turn count and display the new turn player
      if (turnPlayer.turnScore === 0) {
        turnCount++;
        turnPlayer = whichTurn(player1, player2, turnCount);
        $('#turn-player-name').text(turnPlayer.playerName);
      }

    });

    $('button#hold-button').click(function() {
      var turnPlayer = whichTurn(player1, player2, turnCount)
      turnPlayer.hold();
      $('#player' + turnPlayer.playerNumber + ' .playerscore').text(turnPlayer.playerScore);
      console.log(turnCount);
      turnCount++;
      turnPlayer = whichTurn(player1, player2, turnCount);
      $('#turn-player-name').text(turnPlayer.playerName);

    });
  });
});
