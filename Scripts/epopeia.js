// http://plnkr.co/edit/zTEX2W2XJiBKTfC88ONc?p=preview
/// <reference path="../phaser.js" />

var playerCG,wallsCG, mummyCG, shroomcollisiongroup;
var parameters = {
  canvasSize: {w: 832, h: 640},
  player: {
    velocity: 100
  },
  directions: { UP: 'up', DOWN: 'Down', LEFT: 'left', RIGHT: 'right' },
  enemies: {
    seeDistance: 100
  }
};

var player = null;
var spawn = {}
spawn.player = function(x, y, cg) {
    var spt = game.add.sprite(x, y, 'ash');

    game.physics.p2.enable(spt,false); 
    spt.body.enableBody = true;
    spt.body.fixedRotation = true;
    spt.body.setCollisionGroup(cg);

    // Animações
    spt.animations.add('down', [0, 1, 2, 3], 10, true);
    spt.animations.add('up', [4, 5, 6, 7], 10, true);
    spt.animations.add('left', [8, 9, 10, 11], 10, true);
    spt.animations.add('right', [12, 13, 14, 15], 10, true);

    spt.anchor.setTo(0.5, 0.5);

    return spt;
}

var states = {};
states.boot = {
  create: function() {
    // Inicia física
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);
    game.physics.p2.updateBoundsCollisionGroup();
    cursors = game.input.keyboard.createCursorKeys();

    game.time.advancedTiming = true;

    game.state.start('loading');
  }
};

states.loading = {
  preload: function() {
    game.load.image('floresta.tiles', 'Content/assets/sprite/forest_tiles.png');
    game.load.tilemap('floresta.tilemap', "Content/assets/tilemap/floresta/json/carlinhosFloresta.json", null, Phaser.Tilemap.TILED_JSON);
    
    game.load.spritesheet('ash', ash_sprite, 16, 16);
    game.load.spritesheet('mummy', mummy_sprite, 37, 45, 18);
    game.load.audio('bg-palette', 'Content/assets/102-palette-town-theme.mp3');

    var loadingLabel = game.add.text(600, 550, 'Loading...', { font: '30px Courier', fill: '#ffffff' });
  },
  create: function() {
    game.state.start('menu');
  }
};

states.menu = {
  create: function() {
    game.add.text(80, 80, 'A Epopeia de Carlinhos', {font: '50px Arial', fill: '#ffffff'});
    game.add.text(80, game.world.height-80, 'Pressione ENTER para iniciar', {font: '50px Arial', fill: '#ffffff'});

    var key = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    key.onDown.addOnce(function() {
      game.state.start('fase.floresta');

    }, this);
  }
};

states.floresta = {
  update: update,
  create: function() {
    map = game.add.tilemap('floresta.tilemap');
    map.addTilesetImage('forest_tiles', 'floresta.tiles');

    var shroomcollisiongroup = game.physics.p2.createCollisionGroup();
    var playerCG = game.physics.p2.createCollisionGroup();
    var wallsCG =  game.physics.p2.createCollisionGroup();
    var mummyCG = game.physics.p2.createCollisionGroup();

    var walls = game.physics.p2.convertCollisionObjects(map, "collision", true);   
    for(var wall in walls)
    {
      walls[wall].setCollisionGroup(wallsCG);
      walls[wall].collides(playerCG);
    }
    layer = map.createLayer("background");
    map.createLayer("foreground");

    mushrooms = game.add.group();  
    mushrooms.enableBody = true;
    mushrooms.physicsBodyType = Phaser.Physics.P2JS;

    // create some guys randomly on our world
    for (i = 0; i < 10; i++)
    {
      var shroom = mushrooms.create(game.world.randomX, game.world.randomY, shroom_name);
      shroom.body.setCollisionGroup(shroomcollisiongroup);
      shroom.body.collides([playerCG, wallsCG]);
    }

    console.log('Groups: ', playerCG, mummyCG);

    player = spawn.player(230, 500, playerCG);
    player.body.collides(mummyCG);
    player.body.collides(wallsCG);
    player.body.collides(shroomcollisiongroup,collectCoin,this); // 16

    mummy = spawn.player(270, 500, mummyCG);
    mummy.body.collides(playerCG, die);
    


    layer.resizeWorld();

    game.camera.follow(sprite);

    // create our score text in the top left corner
    text = game.add.text(game.camera.x,game.camera.y, "Score: 0", {
      font: "24px Arial",
      fill: "#ff0044",
      align: "center"
    });
  }
}

// Inicialização do phaser, registro das fases e inicio do jogo
var game = new Phaser.Game(parameters.canvasSize.w, parameters.canvasSize.h, Phaser.AUTO, '');

game.state.add('boot', states.boot);
game.state.add('loading', states.loading);
game.state.add('menu', states.menu);
game.state.add('fase.floresta', states.floresta);

game.state.start('boot');


////////////////////////////////////////////////////////////////////////////////////////////////////
// BEM DESORGANIZADO DAQUI PRA BAIXO. Vou arrumar, prometo!
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////


var map;
var layer;

var cursors;
var sprite;
var fort;
var mushrooms;
var tileset_name = 'grass';
var tileset_url = 'Content/assets/sprite/forest_tiles.png';

var thing_name = 'thing';
var thing_url = '';

var shroom_name = 'littleshrooms_0';
var shroom_url = '';

var background_name = 'Ground';
var fort_name = 'Fort';

var mummy_sprite = ''

var ash_sprite = 'Content/assets/sprite/ash.png';
var boundaries;
var text;
var count = 0;
var mummy;




function die(mummy, player) 
{
  player.sprite.kill();
  var dieText = this.game.add.text(game.camera.width / 2, game.camera.height / 2, "Score: 0", {
    font: "48px Arial",
    fill: "#ff0044",
    align: "left"
  });
  dieText.fixedToCamera = false;
  dieText.setText("YOU DIED");

}

function updateText() {

// This updates every frame
text.setText("Score:" + count);

}
var mummy_speed = 20;

function followash()
{
  // Se o player está longe, 
  if (Phaser.Math.distance(player.body.x, player.body.y, mummy.body.x, mummy.body.y) > 100) {
    mummy.body.setZeroVelocity();
    return;
  }

  if (player.body.x < mummy.body.x)
  {
    mummy.body.velocity.x = mummy_speed * -2;
  }
  else
  {
    mummy.body.velocity.x = mummy_speed;
  }
  if (player.body.y < mummy.body.y)
  {
    mummy.body.velocity.y = mummy_speed * -2;
  }
  else
  {
    mummy.body.velocity.y = mummy_speed;
  }

}

function update() {
// Velocity and movement
player.body.velocity.x = 0;
player.body.velocity.y = 0;

if (cursors.left.isDown) {
  player.body.velocity.x = parameters.player.velocity * -1;
  player.animations.play('left');
  this.lastDirection = parameters.directions.LEFT;
}
else if (cursors.right.isDown) {
  player.body.velocity.x = parameters.player.velocity;
  player.animations.play('right');
  this.lastDirection = parameters.directions.RIGHT;
}
else if (cursors.up.isDown) {
  player.body.velocity.y = parameters.player.velocity * -1;
  player.animations.play('up');
  this.lastDirection = parameters.directions.UP;
}
else if (cursors.down.isDown) {
  player.body.velocity.y = parameters.player.velocity;
  player.animations.play('down');
  this.lastDirection = parameters.directions.DOWN;
}
else {
  player.animations.stop();
  switch (this.lastDirection) {

    case parameters.directions.UP:
    player.frame = 4;
    break;

    case parameters.directions.DOWN:
    player.frame = 1;
    break;

    case parameters.directions.LEFT:
    player.frame = 9;
    break;

    case parameters.directions.RIGHT:
    player.frame = 12;
    break;

  }
}


followash();


}

function collectCoin(player, coin) {
// we touched a coin, so kill it, update our score, and then update our score text


coin.sprite.kill();
count++;
updateText();

}

function render() {
  game.debug.body(sprite, '#ff0000', false);
  game.debug.text('FPS: ' + game.time.fps, 2, 14, "#fff");

//game.input.renderDebugInfo(16, 16);
};