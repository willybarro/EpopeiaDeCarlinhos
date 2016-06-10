/// <reference path="../phaser.js" />

// Cria o jogo e adiciona os estados
var game = new Phaser.Game(parameters.canvasSize.w, parameters.canvasSize.h, Phaser.AUTO, '');

game.state.add('loading', states.loading);
game.state.add('floresta', states.floresta);

game.state.start('loading');