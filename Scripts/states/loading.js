states.loading = {
    preload: function(){
        game.time.advancedTiming = true;

        var loadingLabel = game.add.text(600, 550, 'Loading...', { font: '30px Courier', fill: '#ffffff' });
        game.load.spritesheet('ash', 'Content/assets/ash.png', 16, 16);
        game.load.tilemap('tilemap', 'Content/assets/tileMap/pokemon2.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'Content/assets/tileMap/tilesheet.png');
        game.load.audio('bg-palette', 'Content/assets/102-palette-town-theme.mp3');        
    },
    create: function () {
        //
        game.physics.startSystem(Phaser.Physics.ARCADE);

        cursors = game.input.keyboard.addKeys({ 'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D });

        game.state.start('floresta');
    }
};