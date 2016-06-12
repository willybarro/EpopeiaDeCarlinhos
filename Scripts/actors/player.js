var player = null;
var lastDirection = parameters.directions.UP;
var spawnPlayer = function(x, y) {
    console.info('Player loaded');
    player = game.add.sprite(x, y, 'ash');
    
    // Colisão
    




    // player.body.collideWorldBounds = true;
    // this.enableBody = true;

    // Animações
    player.animations.add('down', [0, 1, 2, 3], 10, true);
    player.animations.add('up', [4, 5, 6, 7], 10, true);
    player.animations.add('left', [8, 9, 10, 11], 10, true);
    player.animations.add('right', [12, 13, 14, 15], 10, true);

    // Tamanho
    player.body.width = 15;
    player.body.height = 16;

    // Câmera
    game.camera.follow(player);
};