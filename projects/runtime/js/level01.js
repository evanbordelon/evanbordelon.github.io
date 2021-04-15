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
                { "type": "sawblade", "x": 600, "y": groundY - 45 },
                { "type": "sawblade", "x": 800, "y": groundY },
                { "type": "sawblade", "x": 1000, "y": groundY - 45},
                { "type": "sawblade", "x": 1200, "y": groundY},
                { "type": "sawblade", "x": 1400, "y": groundY - 45},
                { "type": "enemy", "x": 500, "y": groundY - 35},
                { "type": "spike", "x": 1000, "y": groundY - 50},
                { "type": "reward", "x": 700, "y": groundY - 100},
            ]
        };
        
        for(var i = 0; i < levelData.gameItems.length; i++) {
            obj = levelData.gameItems[i];
            objX = obj.x;
            objY = obj.y;
            objType = obj.type;
            if (objType === "sawblade") {
                createSawBlade(objX, objY);
            } else if (objType === "enemy") {
                createEnemy(objX, objY);  
            } else if (objType === "spike"){
                createSpike(objX, objY);
            } else {
                createReward(objX, objY);
            }
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
        var hitZoneSize = 20;
        var damageFromObstacle = 25;
        var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        sawBladeHitZone.x = x;
        sawBladeHitZone.y = y;
        game.addGameItem(sawBladeHitZone);
        var obstacleImage = draw.bitmap('img/spike.png');
        sawBladeHitZone.addChild(obstacleImage);
        obstacleImage.x = -20;
        obstacleImage.y = -20;
        obstacleImage.scaleX = .05;
        obstacleImage.scaleY = .05; 
    };

        function createEnemy(x , y) {
        var enemy = game.createGameItem('enemy',25);
        var redCircle = draw.circle(20, 'red');
        redCircle.x = -25;
        redCircle.y = -25;
        enemy.addChild(redCircle);
        enemy.x = x;
        enemy.y = y;
        game.addGameItem(enemy);
        enemy.velocityX = -1;
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
        var bluCircle = draw.circle(20,'blue');
        bluCircle.x = -25;
        bluCircle.y = -25;
        reward.addChild(bluCircle);
        reward.x = x;
        reward.y = y;
        game.addGameItem(reward);
        reward.velocityX = -1;
        reward.rotationVelocity = 10;
        
        reward.onPlayerCollision = function() {
            console.log('Halle has collected a reward')
            game.increaseScore(25);
            game.changeIntegrity(15);
            reward.fadeOut();
        };

    };

        
        /*createEnemy(400,groundY-10);
        createEnemy(800,groundY-20);
        createEnemy(200,groundY-50);
        createSpike(500, 100);
        createSawBlade(200, 100);
        createSawBlade(400, 250);
        createSawBlade(600, 100);
        createSawBlade(800, 250);
        createReward(500, 200); */
        
  
        
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
