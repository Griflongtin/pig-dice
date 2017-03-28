//business logic
function Player(name) {
  this.playerName = name;
  this.turnScore = 0;
  this.playerScore = 0;
}

Player.prototype.hold = function(turnScore, playerScore, turns) {
  playerScore += turnScore;
  turns++;
}


function Die() {
  this.sides = [1,2,3,4,5,6];
}

Die.prototype.roll = function(player) {
  var rolledSide = this.sides[Math.floor(Math.random() * this.sides.length)];
  console.log(rolledSide);
  if (rolledSide == 1) {
    player.turnScore = 0;
  } else {
    player.turnScore += rolledSide;
  }
}

var whichTurn = function(player1, player2, turns) {
  if (turns % 2 === 0) {
    return player2;
  } else {
    return player1;
  }
}


//ui logic
$(function() {
  var player1;
  var player2;
  $('form').submit(function(event) {
    var player1Name = $('input#player1name').val(),
        player2Name = $('input#player2name').val(),
        die = new Die(),
        turnCount = 1;
        player1 = new Player(player1Name);
        player2 = new Player(player2Name);

    $('button#roll-button').click(function() {
      var turnPlayer = whichTurn(player1, player2, turnCount);
      die.roll(turnPlayer);
      if (turnPlayer.turnScore === 0) {
        turnCount++;
      }
      console.log(turnPlayer.turnScore);
      console.log(turnPlayer);
      console.log('turn count: ' + turnCount);
    });

    event.preventDefault();
  });
});
