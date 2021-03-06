﻿// http://plnkr.co/edit/zTEX2W2XJiBKTfC88ONc?p=preview
/// <reference path="../phaser.js" />

/**
Ideias para o futuro:
- Usar Raycasting para os inimigos só irem em direção do player quando realmente o estiverem vendo.

Falta para a entrega:
*/

var playerCG, wallsCG, enemiesCG, mummyCG, hotdogCG, bulletsCG;
var walls, bullets, hotdogs, enemies;
var map, cursors;
var bulletTime = 0;
var bgm = null;

var parameters = {
  BGMEnabled: true,
  debug: {
    body: false,
    fps: false
  },
  // canvasSize: {w: 832, h: 640},
  canvasSize: {w: 832/2, h: 640/2},
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
    seeDistance: 150,
    perState: {

    }
  }
};

var player = null;
var spawn = {}

var enemyList = {
  ASH: 'ash',
  PIRATA_M: 'pirata_m',
  PIRATA_F: 'pirata_f',
  WOLF: 'wolf',
  RAT: 'rat',
  DOG: 'dog',
  CAT: 'cat',
};

var stateList = {
  BOOT: 'boot',
  LOADING: 'loading',
  MENU: 'menu',

  FLORESTA: 'fase.floresta',
  CALCADAO: 'fase.calcadao',
  BARCO: 'fase.barco',

  GAME_FINISH: 'game_finish'
};


spawn.ash = function(x, y, cg) {
    var lastDirection = parameters.directions.DOWN;
    var spt = game.add.sprite(x, y, enemyList.ASH);

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

spawn.pirata_m = function(x, y, cg) {
  var lastDirection = parameters.directions.DOWN;
  var spt = game.add.sprite(x, y, enemyList.PIRATA_M);

  game.physics.p2.enable(spt, parameters.debug.body);
  spt.body.enableBody = true;
  spt.body.fixedRotation = true;
  spt.body.setRectangle(15, 35, 16, 16); // hitbox
  spt.body.setCollisionGroup(cg);


  // Animações
  spt.animations.add('down', [6, 7, 8], 10, true);
  spt.animations.add('up', [0, 1, 2], 10, true);
  spt.animations.add('left', [9, 10, 11], 10, true);
  spt.animations.add('right', [3, 4, 5], 10, true);

  spt.anchor.setTo(0 , 0);

  spt.events.onKilled.add(function() {
    // console.log("morri", this);
  }, this);

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
        spt.frame = 1;
        break;
      case parameters.directions.DOWN:
        spt.frame = 7;
        break;
      case parameters.directions.LEFT:
        spt.frame = 10;
        break;
      case parameters.directions.RIGHT:
        spt.frame = 11;
        break;
    }
  }

  return spt;
}

spawn.pirata_f = function(x, y, cg) {
  var lastDirection = parameters.directions.DOWN;
  var spt = game.add.sprite(x, y, enemyList.PIRATA_F);

  game.physics.p2.enable(spt, parameters.debug.body);
  spt.body.enableBody = true;
  spt.body.fixedRotation = true;
  spt.body.setRectangle(15, 35, 16, 16); // hitbox
  spt.body.setCollisionGroup(cg);

  // Animações
  spt.animations.add('down', [6, 7, 8], 2, true);
  spt.animations.add('up', [0, 1, 2], 10, true);
  spt.animations.add('left', [9, 10, 11], 10, true);
  spt.animations.add('right', [3, 4, 5], 10, true);

  spt.anchor.setTo(0 , 0);

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
        spt.frame = 1;
        break;
      case parameters.directions.DOWN:
        spt.frame = 7;
        break;
      case parameters.directions.LEFT:
        spt.frame = 10;
        break;
      case parameters.directions.RIGHT:
        spt.frame = 11;
        break;
    }
  }

  return spt;
}

spawn.wolf = function(x, y, cg) {
  var lastDirection = parameters.directions.DOWN;
  var spt = game.add.sprite(x, y, enemyList.WOLF);

  game.physics.p2.enable(spt, parameters.debug.body);
  spt.body.enableBody = true;
  spt.body.fixedRotation = true;
  spt.body.setRectangle(32, 16, 16, 22); // hitbox
  spt.body.setCollisionGroup(cg);

  // Animações
  spt.animations.add('down', [16, 17, 18, 19], 2, true);
  spt.animations.add('up', [24, 25, 26, 27], 10, true);
  spt.animations.add('left', [0, 1, 2, 3], 10, true);
  spt.animations.add('right', [8, 9, 10, 11], 10, true);

  spt.anchor.setTo(0 , 0);

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
        spt.frame = 24;
        break;
      case parameters.directions.DOWN:
        spt.frame = 16;
        break;
      case parameters.directions.LEFT:
        spt.frame = 0;
        break;
      case parameters.directions.RIGHT:
        spt.frame = 8;
        break;
    }
  }

  return spt;
}

spawn.rat = function(x, y, cg) {
  var lastDirection = parameters.directions.DOWN;
  var spt = game.add.sprite(x, y, enemyList.RAT);

  game.physics.p2.enable(spt, parameters.debug.body);
  spt.body.enableBody = true;
  spt.body.fixedRotation = true;
  spt.body.setRectangle(32, 16, 16, 22); // hitbox
  spt.body.setCollisionGroup(cg);

  // Animações
  spt.animations.add('down', [0, 1, 2], 10, true);
  spt.animations.add('up', [27, 28, 29], 10, true);
  spt.animations.add('left', [9, 10, 11], 10, true);
  spt.animations.add('right', [18, 19, 20], 10, true);

  spt.anchor.setTo(0 , 0);

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
        spt.frame = 24;
        break;
      case parameters.directions.DOWN:
        spt.frame = 27;
        break;
      case parameters.directions.LEFT:
        spt.frame = 9;
        break;
      case parameters.directions.RIGHT:
        spt.frame = 18;
        break;
    }
  }

  return spt;
}

spawn.cat = function(x, y, cg) {
  var lastDirection = parameters.directions.DOWN;
  var spt = game.add.sprite(x, y, 'rat');

  game.physics.p2.enable(spt, parameters.debug.body);
  spt.body.enableBody = true;
  spt.body.fixedRotation = true;
  spt.body.setRectangle(32, 30, 16, 22); // hitbox
  spt.body.setCollisionGroup(cg);

  // Animações
  spt.animations.add('down', [6, 7, 8], 10, true);
  spt.animations.add('up', [33, 34, 35], 10, true);
  spt.animations.add('left', [15, 16, 17], 10, true);
  spt.animations.add('right', [24, 25, 26], 10, true);

  spt.anchor.setTo(0 , 0);

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
        spt.frame = 0;
        break;
      case parameters.directions.DOWN:
        spt.frame = 6;
        break;
      case parameters.directions.LEFT:
        spt.frame = 15;
        break;
      case parameters.directions.RIGHT:
        spt.frame = 24;
        break;
    }
  }

  return spt;
}

spawn.dog = function(x, y, cg) {
  var lastDirection = parameters.directions.DOWN;
  var spt = game.add.sprite(x, y, 'rat');

  game.physics.p2.enable(spt, parameters.debug.body);
  spt.body.enableBody = true;
  spt.body.fixedRotation = true;
  spt.body.setRectangle(32, 30, 16, 22); // hitbox
  spt.body.setCollisionGroup(cg);

  // Animações
  spt.animations.add('down', [36, 37, 38], 10, true);
  spt.animations.add('up', [63, 64, 65], 10, true);
  spt.animations.add('left', [45, 46, 47], 10, true);
  spt.animations.add('right', [54, 55, 56], 10, true);

  spt.anchor.setTo(0 , 0);

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
        spt.frame = 63;
        break;
      case parameters.directions.DOWN:
        spt.frame = 36;
        break;
      case parameters.directions.LEFT:
        spt.frame = 45;
        break;
      case parameters.directions.RIGHT:
        spt.frame = 54;
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
    if (carlinhos.alive && !g.changingStages) {
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
    bullet.events.onKilled.add(function() {
      g.sfx.play(g.sfx.list.BULLET_HIT);
    }, this);

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

        g.sfx.play(g.sfx.list.BULLET);
      }
    }
  }

  // Morte do carlinhos
  carlinhos.die = function() {
    carlinhos.body.setZeroVelocity();
    carlinhos.body.kinematic = true;

    carlinhos.animateDeath();
    g.loseLife();

    var dieText = this.game.add.text(game.camera.x + game.camera.width/2, game.camera.y + game.camera.height/2, "", {
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
  enemy = window['spawn'][sprite](x, y, enemiesCG);

  enemy.body.collides(playerCG, die);
  enemy.body.collides(bulletsCG);
  enemy.body.collides(wallsCG);

  // Todos os inimigos seguem o player caso ele esteja perto o suficiente
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


spawn.enemies = function(enemyGid, enemyList) {
  enemies = game.add.group();

  // Pega um inimigo aleatório da enemylist e spawna na posição definida no Tiled
  var mockenemies = game.add.group();
  map.createFromObjects('enemies', enemyGid, 'ash', 0, true, false, mockenemies);
  mockenemies.forEach(function(e) {
    e.kill();
    var randomEnemy = enemyList[Math.floor(Math.random() * enemyList.length)];
    enemies.add(spawn.enemy(randomEnemy, e.x, e.y));
  });
}

spawn.hotdogs = function(gid, map) {
  hotdogs = game.add.group();  
  hotdogs.enableBody = true;
  hotdogs.enableBodyDebug = parameters.debug.body;
  hotdogs.physicsBodyType = Phaser.Physics.P2JS;

  // Cria os hotdogs a partir dos objetos posicionados via Tiled
  map.createFromObjects('hotdogs', gid, 'hotdog', 0, true, false, hotdogs);
  for (var i in hotdogs.children) {
    var hotdog = hotdogs.children[i];
    hotdog.body.setCollisionGroup(hotdogCG);
    hotdog.body.collides([playerCG, wallsCG]);
  }
}

var states = {};
states.boot = function() {
  return {
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

      // Teclas de debugging
      cursors.J = game.input.keyboard.addKey(Phaser.Keyboard.J);
      cursors.K = game.input.keyboard.addKey(Phaser.Keyboard.K);


      game.time.advancedTiming = true;

      g.gotoNextState();
    }
  };
}

states.loading = function() {
  return {
    preload: function() {
      // Fases
      game.load.image('floresta.tiles', 'Content/assets/sprite/forest_tiles.png');
      game.load.tilemap('floresta.tilemap', "Content/assets/tilemap/floresta/json/carlinhosFloresta.json", null, Phaser.Tilemap.TILED_JSON);

      game.load.image('calcadao.tiles', 'Content/assets/sprite/city_outside.png');
      game.load.tilemap('calcadao.tilemap', "Content/assets/tilemap/floresta/json/carlinhosCalcadao.json", null, Phaser.Tilemap.TILED_JSON);

      game.load.image('barco.tiles.ship', 'Content/assets/sprite/ship.png');
      game.load.image('barco.tiles.stone', 'Content/assets/sprite/stone-bridge2.png');
      game.load.tilemap('barco.tilemap', "Content/assets/tilemap/floresta/json/carlinhosBarco.json", null, Phaser.Tilemap.TILED_JSON);
      
      // BGM
      game.load.audio('bgm.floresta', 'Content/assets/audio/bgm/00-over-the-bay.ogg');
      game.load.audio('bgm.calcadao', 'Content/assets/audio/bgm/00-make-me-dance.ogg');
      game.load.audio('bgm.barco', 'Content/assets/audio/bgm/00-long-distance.mp3');

      // SFX
      game.load.audio(g.sfx.list.DEATH[0], 'Content/assets/audio/sfx/death-1.ogg');
      game.load.audio(g.sfx.list.DEATH[1], 'Content/assets/audio/sfx/death-2.ogg');
      game.load.audio(g.sfx.list.DEATH[2], 'Content/assets/audio/sfx/death-3.ogg');
      game.load.audio(g.sfx.list.DEATH[3], 'Content/assets/audio/sfx/death-4.ogg');
      game.load.audio(g.sfx.list.DEATH[4], 'Content/assets/audio/sfx/death-5.ogg');
      game.load.audio(g.sfx.list.DEATH[5], 'Content/assets/audio/sfx/death-6.ogg');
      game.load.audio(g.sfx.list.DEATH[6], 'Content/assets/audio/sfx/death-7.ogg');

      game.load.audio(g.sfx.list.BULLET, 'Content/assets/audio/sfx/bullet.ogg');

      game.load.audio(g.sfx.list.HOTDOG_PICKUP, 'Content/assets/audio/sfx/hotdog-pickup.ogg');

      game.load.audio(g.sfx.list.BULLET_HIT, 'Content/assets/audio/sfx/bullet-hit.ogg');

      // Inimigos
      game.load.spritesheet('carlinhos', 'Content/assets/sprite/carlinhos_32.png', 32, 32);
      game.load.spritesheet(enemyList.ASH, 'Content/assets/sprite/ash.png', 16, 16);
      game.load.spritesheet(enemyList.PIRATA_M, 'Content/assets/sprite/ranger_m.png', 32, 36);
      game.load.spritesheet(enemyList.PIRATA_F, 'Content/assets/sprite/ranger_f.png', 32, 36);
      game.load.spritesheet(enemyList.WOLF, 'Content/assets/sprite/Wolfpack.png', 32, 32);
      game.load.spritesheet(enemyList.RAT, 'Content/assets/sprite/lpccatratdog.png', 32, 32);
      game.load.spritesheet(enemyList.DOG, 'Content/assets/sprite/ash.png', 16, 16);
      game.load.spritesheet(enemyList.CAT, 'Content/assets/sprite/ash.png', 16, 16);

      // Itens
      game.load.spritesheet('hotdog', 'Content/assets/sprite/hotdog_16.png', 16, 16);

      // Sprites
      game.load.spritesheet('bullet', 'Content/assets/sprite/bullet.png', 9, 9);

      // Loading
      game.add.text(600, 550, 'Loading...', { font: '30px Courier', fill: '#ffffff' });
    },
    create: function() {
      g.gotoNextState();
    }
  }
};

states.menu = function() {
  return {
    create: function() {
      game.add.text(40, 40, 'A Epopeia de Carlinhos', {font: '24px Arial', fill: '#ffffff'});
      game.add.text(40, game.world.height-80, 'Pressione ENTER para iniciar', {font: '24px Arial', fill: '#ffffff'});

      var key = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
      key.onDown.addOnce(function() {
        g.gotoNextState();
      }, this);
    }
  }
};

states.floresta = function() {
  var stageEnemies = [
    enemyList.RAT,
    enemyList.WOLF
  ];
  return {
    update: update,
    render: render,
    create: function() {
      // Criação do mapa e dos objetos de colisão
      map = game.add.tilemap('floresta.tilemap');
      map.addTilesetImage('forest_tiles', 'floresta.tiles');
      walls = game.physics.p2.convertCollisionObjects(map, "collision", true);   
      for(var wall in walls) {
        walls[wall].setCollisionGroup(wallsCG);
        walls[wall].collides([playerCG, bulletsCG, enemiesCG]);
      }
      layer = map.createLayer("background");
      map.createLayer("foreground");

      // Cria os atores e itens
      player = spawn.player(240, 500, playerCG);
      game.camera.follow(player);

      spawn.enemies(531, stageEnemies);
      spawn.hotdogs(530, map);

      // Resize, atualiza o hud e toca a musica
      layer.resizeWorld();
      g.createHud();
      g.updateHud();
      g.bgm.play(g.bgm.list.FLORESTA);
    }
  };
}

states.calcadao = function() {
  var stageEnemies = [
    enemyList.DOG,
    enemyList.CAT
  ];

  return {
    update: update,
    render: render,
    create: function() {
      // Criação do mapa e dos objetos de colisão
      map = game.add.tilemap('calcadao.tilemap');
      map.addTilesetImage('city_outside', 'calcadao.tiles');
      walls = game.physics.p2.convertCollisionObjects(map, "collision", true);   
      for(var wall in walls) {
        walls[wall].setCollisionGroup(wallsCG);
        walls[wall].collides([playerCG, bulletsCG, enemiesCG]);
      }
      layer = map.createLayer("background");
      map.createLayer("foreground");

      // Cria os atores e itens
      player = spawn.player(240, 500, playerCG);
      game.camera.follow(player);

      spawn.enemies(706, stageEnemies);
      spawn.hotdogs(722, map);
      
      // Resize, atualiza o hud e toca a musica
      layer.resizeWorld();
      g.createHud();
      g.updateHud();
      g.bgm.play(g.bgm.list.CALCADAO);
    }
  };
}

states.barco = function() {
  var stageEnemies = [
    enemyList.PIRATA_M,
    enemyList.PIRATA_F
  ];

  return {
    update: update,
    render: render,
    create: function() {
      // Criação do mapa e dos objetos de colisão
      map = game.add.tilemap('barco.tilemap');
      map.addTilesetImage('stone-bridge2', 'barco.tiles.stone');
      map.addTilesetImage('ship', 'barco.tiles.ship');
      map.addTilesetImage('forest_tiles', 'floresta.tiles');
      walls = game.physics.p2.convertCollisionObjects(map, "collision", true);   
      for(var wall in walls) {
        walls[wall].setCollisionGroup(wallsCG);
        walls[wall].collides([playerCG, bulletsCG, enemiesCG]);
      }
      layer = map.createLayer("background");
      map.createLayer("floor");
      map.createLayer("ship");

      // // Cria os atores e itens
      player = spawn.player(90, 30, playerCG);
      game.camera.follow(player);

      spawn.enemies(682, stageEnemies);
      spawn.hotdogs(689, map);

      // Resize, atualiza o hud e toca a musica
      layer.resizeWorld();
      g.createHud();
      g.updateHud();
      g.bgm.play(g.bgm.list.BARCO);
    }
  };
};

states.gameFinish = function() {
  return {
    create: function() {
      var textScore = g.pad(g.score, 5);
      game.add.text(40, 40, 'Fim de jogo! Vá buscar seu pão', {font: '24px Arial', fill: '#ffffff'});
      //game.add.text(40, 70, 'Vá buscar seu pão', {font: '22px Arial', fill: '#ffffff'});
      game.add.text(40, 80, 'Pontuação total: ' + textScore, {font: '18px Arial', fill: '#ffffff', textAlign: 'center'});
      game.add.text(40, 210, "IBTA - Ciências da Computação - 2016/06\nGuilherme P. Gomides\nTaís Guimarães Lima\nWilly G. M. Barro Raffel", {font: '16px Arial', fill: '#ffffff'});
    }
  }
};

var scoreText, livesText;
var g = {
  score: 0,
  currentState: null,
  currentStateNum: 0,
  changingStages: false,
  lives: 3,
  gameplayEnabled: false,
  stateOrder: [
    stateList.BOOT,
    stateList.LOADING,
    stateList.MENU,

    stateList.FLORESTA,
    stateList.CALCADAO,
    stateList.BARCO,

    stateList.GAME_FINISH
  ],
  stopGameplay: function() {
    // Para o movimento do jogador
    player.body.setZeroVelocity();
    player.body.kinematic = true;
    player.animateStop();
  },
  stageCleared: function() {
    g.stopGameplay();
    g.changingStages = true;

    var t = game.add.text(0, 0, "", {
      font: "24px Arial",
      fill: "#ffffff",
      align: "center"
    });
    
    t.setText("Passou de fase!");

    t.fixedToCamera = true;
    t.cameraOffset.setTo(game.camera.width/2 - t.width/2, 60);

    window.setTimeout(function() {
      g.gotoNextState();
    }, 3000);
  },
  gotoState: function(state) {
    g.changingStages = false;

    g.currentState = state;
    g.currentStateNum = g.getStateNumber(state);

    g.bgm.stop();

    game.state.start(state);
  },
  getStateNumber: function(state) {
    return g.stateOrder.indexOf(state);
  },
  gotoNextState: function() {
    if (g.stateOrder[g.currentStateNum+1]) {
      g.gotoState(g.stateOrder[g.currentStateNum+1]);
    } else {
      console.log('Next state not found');
    }
  },
  gotoPreviousState: function() {
    if (g.stateOrder[g.currentStateNum-1]) {
      g.gotoState(g.stateOrder[g.currentStateNum-1]);
    } else {
      console.log('Previous state not found');
    }
  },
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
      BULLET_HIT: 'sfx.bullet_hit',
      BULLET: 'sfx.bullet',
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
      FLORESTA: 'bgm.floresta',
      CALCADAO: 'bgm.calcadao',
      BARCO: 'bgm.barco',
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
    game.state.start(g.currentState);
  },
  restartGame: function() {
    game.state.start('menu');
    g.bgm.stop();
    g.lives = 3;
  },
  createHud: function() {
    scoreText = game.add.text(game.camera.x + 10, game.camera.y + 10, "", {
      font: "16px Arial",
      fill: "#ffffff",
      align: "center"
    });

    livesText = game.add.text(game.width, game.camera.y + 10, "", {
      font: "16px Arial",
      fill: "#ffffff",
      align: "center"
    });
  },
  updateHud: function() {
    scoreText.setText("Pontos: " + g.pad(g.score, 5));
    scoreText.fixedToCamera = true;
    scoreText.cameraOffset.setTo(game.camera.width - scoreText.width - 10, 10);

    livesText.setText("Vidas: " + g.lives);
    livesText.fixedToCamera = true;
    livesText.cameraOffset.setTo(10, 10);
  },
  pad :function(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
}

// Inicialização do phaser, registro das fases e inicio do jogo
var game = new Phaser.Game(parameters.canvasSize.w, parameters.canvasSize.h, Phaser.AUTO, '');

game.state.add(stateList.BOOT, states.boot);
game.state.add(stateList.LOADING, states.loading);
game.state.add(stateList.MENU, states.menu);
game.state.add(stateList.GAME_FINISH, states.gameFinish);

game.state.add(stateList.FLORESTA, states.floresta);
game.state.add(stateList.CALCADAO, states.calcadao);
game.state.add(stateList.BARCO, states.barco);

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
  // Teclas de debugging, vai pra tela anterior e próximo
  if (cursors.J.isDown) {
    g.gotoPreviousState();
  } else if (cursors.K.isDown) {
    g.gotoNextState();
  }

  // Atualiza o score e passa de fase quando todos os inimigos morrem
  g.updateHud();
  if (enemies && enemies.countLiving() == 0 && !g.changingStages) {
    g.stageCleared();
  }
}

function collectHotdog(player, coin) {
  if (coin.sprite.alive) {
    g.sfx.play(g.sfx.list.HOTDOG_PICKUP);
    coin.sprite.kill();

    g.score += 50;
  }
}

function hitEnemy(bullet, enemy) {
  if (bullet.sprite.alive) {
    bullet.sprite.kill();
  }

  if (enemy.sprite.alive) {
    enemy.sprite.kill();

    g.score += 100;
  }
}

function render() {
  if (parameters.debug.fps) {
    game.debug.text('FPS: ' + game.time.fps, 2, 14, "#fff");
  }
};