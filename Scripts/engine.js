var states = {};
var cursors = null;
var music = null;

var gameUpdate = function() {
    game.physics.arcade.collide(player, this.collidablelayer);
    game.physics.arcade.collide(player, this.grasslayer);


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

var gameRender = function() {
    game.debug.text(game.time.fps, 2, 14, "#000000");
};