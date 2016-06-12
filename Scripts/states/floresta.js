states.floresta = {
    map : null,
    layers : {
        stone: null,
        hole: null,
        lake: null,
        tree: null,
        grass: null
    },
    preload: function () {},
    create : function() {
        console.log('Floresta loaded');
        this.map = game.add.tilemap('floresta.tilemap');
        this.map.addTilesetImage('forest_tiles', 'floresta.tiles');

        this.layers.grass = this.map.createLayer('grass');
        this.layers.hole = this.map.createLayer('hole');
        this.layers.lake = this.map.createLayer('lake');
        this.layers.tree = this.map.createLayer('tree');
        this.layers.stone = this.map.createLayer('stone');

        this.layers.grass.resizeWorld();

        // Cria o personagem no mapa
        cgplayer = game.physics.p2.createCollisionGroup();
        cgwalls = game.physics.p2.createCollisionGroup();
        //spawnPlayer(230, 500);

        // player
        player = game.add.sprite(230, 500, 'ash');
        game.physics.p2.enable(player, false);
        player.anchor.setTo(0.5, 0.5);

        player.enableBody = true;
        player.physicsBodyType = Phaser.Physics.P2JS;
        player.body.setCollisionGroup(cgplayer);
        player.body.setCircle(28);

        player.body.collides(cgwalls, function() {
            console.log('collide');
        });

        // Habilita a colisão do player com as paredes
        var walls = game.physics.p2.convertCollisionObjects(this.map, "collision", true);   
        for(var wall in walls) {
            walls[wall].setCollisionGroup(cgwalls);
            walls[wall].collides(cgplayer);
        }

        
        //spawnEnemy(342, 750);



        // this.music = game.add.audio('bg-palette');
        // this.music.play();
    },
    update : gameUpdate,
    render: gameRender
};