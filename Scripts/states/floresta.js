states.floresta = {
    map : null,
    backgroundlayer : null,
    collidablelayer : null,
    grasslayer : null,
    preload: function () {},
    create : function() {
        this.map = game.add.tilemap('tilemap');
        this.map.addTilesetImage('tiles', 'tiles');

        this.backgroundlayer = this.map.createLayer('Background');
        this.collidablelayer = this.map.createLayer('Collidable');
        this.grasslayer = this.map.createLayer('Grass');

        spawnPlayer(342, 774);
        spawnEnemy(342, 750);

        this.map.setCollisionBetween(1, 50 * 50, true, 'Collidable');

        this.collidablelayer.resizeWorld();

        this.music = game.add.audio('bg-palette');
        this.music.play();
    },
    update : gameUpdate,
    render: gameRender
};