//business logic
function Player(name) {
  this.playerName = name;
  this.turnScore = 0;
  this.playerScore = 0;
}

Player.prototype.hold = function(turnScore, playerScore, turnCount) {
  playerScore += turnScore;
  turnCount++;
}


function Die() {
  this.sides = [1,2,3,4,5,6];
}

Die.prototype.roll = function(turnCount, player) {
  var rolledSide = this.sides[Math.floor(Math.random() * this.sides.length)];
  console.log(rolledSide);
  if (rolledSide === 1) {
    player.turnScore = 0;
    turnCount++;
  } else {
    player.turnScore += rolledSide;
  }
}

var whichTurn = function(player1, player2, turnCount) {
  if (turnCount % 2 === 0) {
    return player2;
  } else {
    return player1;
  }
}


//ui logic
$(function() {
  var die = new Die();

  $('form').submit(function(event) {
    var player1Name = $('input#player1name').val();
    var player2Name = $('input#player2name').val();
    var player1 = new Player(player1Name);
    var player2 = new Player(player2Name);
    var turnCount = 1;

    
    $('button#roll-button').click(function() {
      var turnPlayer = whichTurn(player1, player2, turnCount);
      die.roll(turnCount, turnPlayer);
      console.log(turnPlayer.turnScore);
      console.log(turnPlayer);
      // debugger;
    });

    event.preventDefault();
  });


});
