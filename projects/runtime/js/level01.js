var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade(x , y) {
        var hitZoneSize = 25;
        var damageFromObstacle = 10;
        var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        sawBladeHitZone.x = x;
        sawBladeHitZone.y = y;
        game.addGameItem(sawBladeHitZone);
        var obstacleImage = draw.bitmap('img/sawblade.png');
        sawBladeHitZone.addChild(obstacleImage);
        obstacleImage.x = -25;
        obstacleImage.y = -25;
        };

        function createSpike(x , y) {
        var hitZoneSize = 10;
        var damageFromObstacle = 25;
        var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        sawBladeHitZone.x = x;
        sawBladeHitZone.y = y;
        game.addGameItem(sawBladeHitZone);
        var obstacleImage = draw.bitmap('img/spike.png');
        sawBladeHitZone.addChild(obstacleImage);
        obstacleImage.x = -10;
        obstacleImage.y = -10;
        };

        function createEnemy(x , y) {
        var enemy = game.createGameItem('enemy',25);
        var redSquare = draw.rect(50,50,'red');
        redSquare.x = -25;
        redSquare.y = -25;
        enemy.addChild(redSquare);
        enemy.x = x;
        enemy.y = y;
        game.addGameItem(enemy);
        enemy.velocityX = 1;
        enemy.rotationVelocity = 10;
   
        enemy.onPlayerCollision = function() {
        console.log('The enemy has hit Halle');
        game.changeIntegrity(-10);
        enemy.fadeOut();
        };
        
        enemy.onProjectileCollision = function() {
        console.log('Halle has hit the enemy');
        game.increaseScore(10);
        enemy.shrink();
        };
        
    };
        
        function createReward(x , y) {
       var reward = game.createGameItem('reward',25);
        var bluSquare = draw.rect(50,50,'blue');
        bluSquare.x = -25;
        bluSquare.y = -25;
        reward.addChild(bluSquare);
        reward.x = x;
        reward.y = y;
        game.addGameItem(reward);
        reward.velocityX = 0;
        reward.rotationVelocity = 0;
        
        reward.onPlayerCollision() = function() {
            game.increaseScore(25);
            game.changeIntegrity(15);
            reward.fadeOut();
        };

    };

        
        createEnemy(400,groundY-10);
        createEnemy(800,groundY-20);
        createEnemy(200,groundY-50);
        createSpike(500, 100);
        createSawBlade(200, 100);
        createSawBlade(400, 250);
        createSawBlade(600, 100);
        createSawBlade(800, 250);
        createReward(500, 200);
        

        
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
