states.loading = {
    preload: function(){
        var loadingLabel = game.add.text(600, 550, 'Loading...', { font: '30px Courier', fill: '#ffffff' });

        gamePreload();
    },
    create: gameCreate
};