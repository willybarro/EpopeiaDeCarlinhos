var player = null;
var states = {};
var cursors = null;
var music = null;
var cg = {
    player: null,
    enemies: null,
    walls: null
};

var gameUpdate = function() {
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
};

var gameCreate = function () {
    //
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);
    game.physics.p2.updateBoundsCollisionGroup();

    // Cria os grupos de colisão
    cg.player = game.physics.p2.createCollisionGroup();
    cg.walls = game.physics.p2.createCollisionGroup();

    //
    game.time.advancedTiming = true;
    cursors = game.input.keyboard.addKeys({ 'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D });

    // Inicia a primeira fase
    game.state.start('floresta');
};

var gamePreload = function() {
    /**
     * Carrega os assets
     */

    // Player
    game.load.spritesheet('ash', 'Content/assets/sprite/ash.png', 16, 16);
    
    // Musica de fundo
    game.load.audio('bg-palette', 'Content/assets/audio/bgm/102-palette-town-theme.mp3');

    // Floresta
    game.load.tilemap('floresta.tilemap', 'Content/assets/tilemap/floresta/json/carlinhosFloresta.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('floresta.tiles', 'Content/assets/sprite/forest_tiles.png');
}

var gameRender = function() {
    game.debug.body(player, '#ff0000', false);
    game.debug.text('FPS: ' + game.time.fps, 2, 14, "#fff");

    //game.input.renderDebugInfo(16, 16);
};