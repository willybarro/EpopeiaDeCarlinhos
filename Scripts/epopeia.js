// http://plnkr.co/edit/zTEX2W2XJiBKTfC88ONc?p=preview
/// <reference path="../phaser.js" />

var playerCG, wallsCG, enemiesCG, mummyCG, hotdogCG, bulletsCG;
var walls, bullets, hotdogs, enemies;
var map, cursors;
var bulletTime = 0;
var bgm = null;

var parameters = {
  BGMEnabled: true,
  debug: {
    body: false
  },
  canvasSize: {w: 832, h: 640},
  player: {
    velocity: 100,
    lives: 3
  },
  bullet: {
    speed: 200,
    lifespan: 600,
    timeBetweenShots: 400
  },
  directions: { UP: 'up', DOWN: 'Down', LEFT: 'left', RIGHT: 'right' },
  enemies: {
    seeDistance: 100
  }
};

var player = null;
var spawn = {}
spawn.ash = function(x, y, cg) {
    var lastDirection = parameters.directions.DOWN;
    var spt = game.add.sprite(x, y, 'ash');

    game.physics.p2.enable(spt, parameters.debug.body); 
    spt.body.enableBody = true;
    spt.body.fixedRotation = true;
    spt.body.setCollisionGroup(cg);

    // Animações
    spt.animations.add('down', [0, 1, 2, 3], 10, true);
    spt.animations.add('up', [4, 5, 6, 7], 10, true);
    spt.animations.add('left', [8, 9, 10, 11], 10, true);
    spt.animations.add('right', [12, 13, 14, 15], 10, true);

    spt.anchor.setTo(0.5, 0.5);

    spt.animateLeft = function() {
      spt.animations.play('left');
      lastDirection = parameters.directions.LEFT;
    }

    spt.animateUp = function() {
      spt.animations.play('up');
      lastDirection = parameters.directions.UP;

    }

    spt.animateRight = function() {
      spt.animations.play('right');
      lastDirection = parameters.directions.RIGHT;
    }

    spt.animateDown = function() {
      spt.animations.play('down');
      lastDirection = parameters.directions.DOWN;
    }

    spt.animateStop = function() {
      spt.animations.stop();

      switch (lastDirection) {
        case parameters.directions.UP:
          spt.frame = 4;
        break;
        case parameters.directions.DOWN:
          spt.frame = 1;
        break;
        case parameters.directions.LEFT:
          spt.frame = 9;
        break;
        case parameters.directions.RIGHT:
          spt.frame = 12;
        break;
      }
    }

    return spt;
}

spawn.carlinhos = function(x, y, cg) {
    var lastDirection = parameters.directions.DOWN;
    var spt = game.add.sprite(x, y, 'carlinhos');

    game.physics.p2.enable(spt, parameters.debug.body); 
    spt.body.setRectangle(16, 24, 0, 2); // hitbox
    spt.body.enableBody = true;
    spt.body.fixedRotation = true;
    spt.body.setCollisionGroup(cg);

    // Animações
    spt.animations.add('up', [105, 106, 107, 108, 109, 110, 111, 112], 15, true);
    spt.animations.add('down', [131, 132, 133, 134, 135, 136, 137, 138], 15, true);
    spt.animations.add('left', [118, 119, 120, 121, 122, 123, 124, 125], 15, true);
    spt.animations.add('right', [144, 145, 146, 147, 148, 149, 150, 151], 15, true);
    spt.animations.add('death', [260, 261, 262, 263, 264, 265, 265, 267, 267, 265, 265, 267, 267, 265, 265, 267, 267, 265, 265], 8, false);

    spt.anchor.setTo(0.5, 0.5);

    spt.animateLeft = function() {
      spt.animations.play('left');
      lastDirection = parameters.directions.LEFT;
    }

    spt.animateUp = function() {
      spt.animations.play('up');
      lastDirection = parameters.directions.UP;

    }

    spt.animateRight = function() {
      spt.animations.play('right');
      lastDirection = parameters.directions.RIGHT;
    }

    spt.animateDown = function() {
      spt.animations.play('down');
      lastDirection = parameters.directions.DOWN;
    }

    var dying = false;
    spt.animateDeath = function() {
      spt.animations.stop();
      dying = true;

      g.sfx.play(g.sfx.list.DEATH);
      spt.alive = false;
      spt.animations.play('death', false, false, true);
    }

    spt.animateStop = function() {
      if (!dying) {
        spt.animations.stop();

        switch (lastDirection) {
          case parameters.directions.UP:
            spt.frame = 104;
          break;
          case parameters.directions.DOWN:
            spt.frame = 131;
          break;
          case parameters.directions.LEFT:
            spt.frame = 117;
          break;
          case parameters.directions.RIGHT:
            spt.frame = 143;
          break;
        }
      }
    }

    return spt;
}

spawn.player = function(x, y, cg) {
  var carlinhos = spawn.carlinhos(x, y, cg);

  // Controles do carlinhos
  carlinhos.update = function() {
    if (carlinhos.alive) {
      carlinhos.body.setZeroVelocity();

      // Movimentação
      if (cursors.A.isDown) {
        carlinhos.body.velocity.x = parameters.player.velocity * -1;
        carlinhos.animateLeft();
      }
      else if (cursors.D.isDown) {
        carlinhos.body.velocity.x = parameters.player.velocity;
        carlinhos.animateRight();
      }
      else if (cursors.W.isDown) {
        carlinhos.body.velocity.y = parameters.player.velocity * -1;
        carlinhos.animateUp();
      }
      else if (cursors.S.isDown) {
        carlinhos.body.velocity.y = parameters.player.velocity;
        carlinhos.animateDown();
      }
      else {
        carlinhos.animateStop();
      }

      // Tiro
      if (cursors.left.isDown) {
        carlinhos.shoot(parameters.directions.LEFT);
      }
      else if (cursors.right.isDown) {
        carlinhos.shoot(parameters.directions.RIGHT);
      }
      else if (cursors.up.isDown) {
        carlinhos.shoot(parameters.directions.UP);
      }
      else if (cursors.down.isDown) {
        carlinhos.shoot(parameters.directions.DOWN);
      }
    }
  }

  // Projétil
  bullets = game.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.P2JS;
  bullets.enableBodyDebug = parameters.debug.body;
  bullets.createMultiple(30, 'bullet');

  for (i in bullets.children) {
    var bullet = bullets.children[i];
    bullet.body.setCollisionGroup(bulletsCG);
    bullet.body.collides(wallsCG, function(b, o) {
      b.sprite.kill();
    });
    bullet.body.collides(enemiesCG, hitEnemy);
  }

  carlinhos.shoot = function(direction) {
    if (game.time.now > bulletTime)
    {
      var bullet = bullets.getFirstExists(false);

      if (bullet) {
        bullet.reset(player.x, player.y);
        switch (direction) {
          case parameters.directions.LEFT:
            bullet.body.velocity.x = -parameters.bullet.speed;
          break;
          case parameters.directions.RIGHT:
            bullet.body.velocity.x = parameters.bullet.speed;
          break;
          case parameters.directions.UP:
            bullet.body.velocity.y = -parameters.bullet.speed;
          break;
          case parameters.directions.DOWN:
            bullet.body.velocity.y = parameters.bullet.speed;
          break;
        }

        bulletTime = game.time.now + parameters.bullet.timeBetweenShots;
        bullet.lifespan = parameters.bullet.lifespan;

        g.sfx.play(g.sfx.list.BULLET_AK);
      }
    }
  }

  // Morte do carlinhos
  carlinhos.die = function() {
    carlinhos.body.velocity.x = 0;
    carlinhos.body.velocity.y = 0;
    carlinhos.body.kinematic = true;

    carlinhos.animateDeath();
    g.loseLife();

    var dieText = this.game.add.text(game.camera.width / 2, game.camera.height / 2, "", {
      font: "48px Arial",
      fill: "#ffffff",
      align: "center"
    });
    
    if (g.lives >= 0) {
      dieText.setText("Morreu!");

      window.setTimeout(function() {
        g.restartLevel();
      }, 3000);
    } else {
      dieText.setText("Game Over!");

      window.setTimeout(function() {
        g.restartGame();
      }, 3000);
    }

    dieText.fixedToCamera = false;
    dieText.x -= dieText.width/2;
    dieText.y -= dieText.height/2;
  }

  // Colisões do Carlinhos
  carlinhos.body.collides([wallsCG, enemiesCG]);
  carlinhos.body.collides(hotdogCG, collectHotdog, this);

  return carlinhos;
}

spawn.enemy = function(sprite, x, y) {
  var enemy;
  if (sprite == 'ash') {
    enemy = spawn.ash(x, y, enemiesCG);
    enemy.tint = Math.random() * 0xffffff;
  }

  enemy.body.collides(playerCG, die);
  enemy.body.collides(bulletsCG);

  enemy.update = function() {
    var enemy_speed = 20;
    // Se o player está longe do inimigo ou o player está morto, o inimigo para
    if (
      Phaser.Math.distance(player.body.x, player.body.y, enemy.body.x, enemy.body.y) > parameters.enemies.seeDistance ||
      !player.alive
      ) {
      enemy.body.setZeroVelocity();
      enemy.animateStop();
      return;
    }

    if (player.body.x < enemy.body.x) {
      enemy.body.velocity.x = enemy_speed * -2;
      enemy.animateLeft();
    } else {
      enemy.body.velocity.x = enemy_speed * 2;
      enemy.animateRight();
    }

    if (player.body.y < enemy.body.y) {
      enemy.body.velocity.y = enemy_speed * -2;
    } else {
      enemy.body.velocity.y = enemy_speed * 2;
    }
  }

  return enemy;
}

spawn.enemies = function() {
  /**
   * Acho que essa não é a melhor forma de criar os inimigos a partir da layer de objetos
   * Mas tá funcionando muito bem :)
   */
  var mockenemies = game.add.group();
  map.createFromObjects('enemies', 531, 'ash', 0, true, false, mockenemies);
  mockenemies.forEach(function(e) {
    e.kill();
    spawn.enemy('ash', e.x, e.y);
  });
}

spawn.hotdogs = function(map) {
  hotdogs = game.add.group();  
  hotdogs.enableBody = true;
  hotdogs.enableBodyDebug = parameters.debug.body;
  hotdogs.physicsBodyType = Phaser.Physics.P2JS;

  // Cria os hotdogs a partir dos objetos posicionados via Tiled
  map.createFromObjects('hotdogs', 530, 'hotdog', 0, true, false, hotdogs);
  for (var i in hotdogs.children) {
    var hotdog = hotdogs.children[i];
    hotdog.body.setCollisionGroup(hotdogCG);
    hotdog.body.collides([playerCG, wallsCG]);
  }
}

var states = {};
states.boot = {
  create: function() {
    // Inicia física
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);
    game.physics.p2.updateBoundsCollisionGroup();

    // Cria os grupos de colisão
    hotdogCG = game.physics.p2.createCollisionGroup();
    playerCG = game.physics.p2.createCollisionGroup();
    wallsCG =  game.physics.p2.createCollisionGroup();
    enemiesCG = game.physics.p2.createCollisionGroup();
    bulletsCG = game.physics.p2.createCollisionGroup();

    // Registra as setas e o WASD
    cursors = game.input.keyboard.createCursorKeys();
    cursors.W = game.input.keyboard.addKey(Phaser.Keyboard.W);
    cursors.A = game.input.keyboard.addKey(Phaser.Keyboard.A);
    cursors.S = game.input.keyboard.addKey(Phaser.Keyboard.S);
    cursors.D = game.input.keyboard.addKey(Phaser.Keyboard.D);

    game.time.advancedTiming = true;

    game.state.start('loading');
    //game.stage.smoothed = false;
  }
};

states.loading = {
  preload: function() {
    // Fases
    game.load.image('floresta.tiles', 'Content/assets/sprite/forest_tiles.png');
    game.load.tilemap('floresta.tilemap', "Content/assets/tilemap/floresta/json/carlinhosFloresta.json", null, Phaser.Tilemap.TILED_JSON);
    
    // BGM
    game.load.audio('bgm.floresta', 'Content/assets/audio/bgm/00-over-the-bay.ogg');

    // SFX
    game.load.audio(g.sfx.list.DEATH[0], 'Content/assets/audio/sfx/death-1.ogg');
    game.load.audio(g.sfx.list.DEATH[1], 'Content/assets/audio/sfx/death-2.ogg');
    game.load.audio(g.sfx.list.DEATH[2], 'Content/assets/audio/sfx/death-3.ogg');
    game.load.audio(g.sfx.list.DEATH[3], 'Content/assets/audio/sfx/death-4.ogg');
    game.load.audio(g.sfx.list.DEATH[4], 'Content/assets/audio/sfx/death-5.ogg');
    game.load.audio(g.sfx.list.DEATH[5], 'Content/assets/audio/sfx/death-6.ogg');
    game.load.audio(g.sfx.list.DEATH[6], 'Content/assets/audio/sfx/death-7.ogg');

    game.load.audio(g.sfx.list.BULLET_RIFLE, 'Content/assets/audio/sfx/bullet-rifle.ogg');
    game.load.audio(g.sfx.list.BULLET_AK, 'Content/assets/audio/sfx/bullet-ak.ogg');

    game.load.audio(g.sfx.list.HOTDOG_PICKUP, 'Content/assets/audio/sfx/hotdog-pickup.ogg');

    game.load.audio(g.sfx.list.DIRT_HIT[0], 'Content/assets/audio/sfx/dirt-hit1.ogg');
    game.load.audio(g.sfx.list.DIRT_HIT[1], 'Content/assets/audio/sfx/dirt-hit2.ogg');

    // Inimigos
    game.load.spritesheet('ash', 'Content/assets/sprite/ash.png', 16, 16);
    game.load.spritesheet('carlinhos', 'Content/assets/sprite/carlinhos_32.png', 32, 32);

    // Itens
    game.load.spritesheet('hotdog', 'Content/assets/sprite/hotdog_16.png', 16, 16);

    // Sprites
    game.load.spritesheet('bullet', 'Content/assets/sprite/bullet.png', 9, 9);

    // Loading
    game.add.text(600, 550, 'Loading...', { font: '30px Courier', fill: '#ffffff' });
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
  render: render,
  create: function() {
    g.currentStage = 'fase.floresta';

    // Criação do mapa e dos objetos de colisão
    map = game.add.tilemap('floresta.tilemap');
    map.addTilesetImage('forest_tiles', 'floresta.tiles');
    walls = game.physics.p2.convertCollisionObjects(map, "collision", true);   
    for(var wall in walls) {
      walls[wall].setCollisionGroup(wallsCG);
      walls[wall].collides([playerCG, bulletsCG]);
    }
    layer = map.createLayer("background");
    map.createLayer("foreground");

    // Cria os atores e itens
    player = spawn.player(240, 500, playerCG);
    game.camera.follow(player);

    spawn.enemies();
    spawn.hotdogs(map);

    // Resize, atualiza o hud e toca a musica
    layer.resizeWorld();
    g.createHud();
    g.updateHud();
    g.bgm.play(g.bgm.list.FLORESTA);
  }
}

var scoreText, livesText;
var g = {
  score: 0,
  currentStage: null,
  lives: 3,
  sfx: {
    list: {
      DEATH: [
        'sfx.death_1',
        'sfx.death_2',
        'sfx.death_3',
        'sfx.death_4',
        'sfx.death_5',
        'sfx.death_6',
        'sfx.death_7'
      ],
      DIRT_HIT: [
        'sfx.dirt_hit1',
        'sfx.dirt_hit2'
      ],
      BULLET_RIFLE: 'sfx.bullet_rifle',
      BULLET_AK: 'sfx.bullet_ak',
      HOTDOG_PICKUP: 'sfx.hotdog_pickup'
    },
    /**
     * Toca o efeito sonoro escolhido. Se for um array, toca um som aleatório.
     */
    play: function(asset) {
      if (typeof asset == "object") {
        multiAsset = asset;
        var randomKey = Math.floor(Math.random() * multiAsset.length);

        asset = asset[randomKey];
      }
      game.add.audio(asset).play();
    }
  },
  bgm: {
    list: {
      FLORESTA: 'bgm.floresta'
    },
    play: function(asset) {
      if (parameters.BGMEnabled) {
        g.bgm.stop();
        bgm = game.add.audio(asset);
        bgm.play('', 0, 1, true);
      }
    },
    stop: function() {
      if (bgm) {
        bgm.stop();
      }
    }
  },
  loseLife: function() {
    --g.lives;
  },
  restartLevel: function() {
    game.state.start(g.currentStage);
  },
  restartGame: function() {
    game.state.start('menu');
    g.bgm.stop();
    g.lives = 3;
  },
  createHud: function() {
    scoreText = game.add.text(game.camera.x + 10, game.camera.y + 10, "", {
      font: "24px Arial",
      fill: "#ffffff",
      align: "center"
    });

    livesText = game.add.text(game.width, game.camera.y + 10, "", {
      font: "24px Arial",
      fill: "#ffffff",
      align: "center"
    });
    //text.anchor.set(0.5);
  },
  updateHud: function() {
    scoreText.setText("Score: " + g.score);

    livesText.setText("Lives: " + g.lives);
    livesText.x = game.width - livesText.width - 10;
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


function die(m, p) {
  if (p.sprite.alive) {
    player.die();
  }
}

function update() {
  
}

function collectHotdog(player, coin) {
  if (coin.sprite.alive) {
    g.sfx.play(g.sfx.list.HOTDOG_PICKUP);
    coin.sprite.kill();

    g.score += 100;
    g.updateHud();
  }
}

function hitEnemy(bullet, enemy) {
  if (bullet.sprite.alive) {
    bullet.sprite.kill();
    g.sfx.play(g.sfx.list.DIRT_HIT);
  }

  if (enemy.sprite.alive) {
    enemy.sprite.kill();

    g.score += 1000;
    g.updateHud();
  }
}

function render() {
  game.debug.text('FPS: ' + game.time.fps, 2, 14, "#fff");
};