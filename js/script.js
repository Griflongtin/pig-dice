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

Die.prototype.roll = function(turnCount, turnScore) {
  var rolledSide = this.sides[Math.floor(Math.random() * this.sides.length)];
  if (rolledSide === 1) {
    turnScore = 0;
    turnCount++;
  } else {
    turnScore += rolledSide;
  }
}

var turnPlayer = function(player1, player2, turnCount) {
  if (turnCount % 2 === 0) {
    return player2;
  } else {
    return player1;
  }
}


//ui logic
$(function() {
  $('form').submit(function(event) {
    var player1Name = $('input#player1name').val();
    var player2Name = $('input#player2name').val();
    var player1 = new Player(player1Name);
    var player2 = new Player(player2Name);
    var die = new Die();
    console.log(player1);
    console.log(player2);
    console.log(die);

    event.preventDefault();
  });
});
