var Slime = function (game, x, y, destination) {
    Phaser.Sprite.call(this, game, x, y, "ash");
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.collideWorldBounds = true;
    this.enableBody = true;
    this.animations.add('right', [0, 1, 2, 3, 4], 5, true);
    this.animations.add('left', [5, 6, 7, 8, 9], 5, true);
    this.body.gravity.y = 800;
    this.body.bounce.y = 0;// 0.7 + Math.random() * 0.2;
    this.body.bounce.x = 1;
    this.body.collideWorldBounds = true;
    this.body.velocity.x = 80;
};
Slime.prototype = Object.create(Phaser.Sprite.prototype);
Slime.prototype.constructor = Slime;

var spawnEnemy = function() {
    return;
}