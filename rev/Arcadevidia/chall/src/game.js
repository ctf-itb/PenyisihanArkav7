var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var cursors;
var attackTime = Date.now();
var playerTarget = null;
var monsters = [];
var monstersKilled = [];
var gameOver = false;
var gameOverText;
var explosion;
var scoreText;
var score = 0;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('tile', 'assets/tile/floor_1.png');

    this.load.image('character_idle_0', 'assets/character/wizzard_f_idle_anim_f0.png');
    this.load.image('character_idle_1', 'assets/character/wizzard_f_idle_anim_f1.png');
    this.load.image('character_idle_2', 'assets/character/wizzard_f_idle_anim_f2.png');
    this.load.image('character_idle_3', 'assets/character/wizzard_f_idle_anim_f3.png');
    this.load.image('weapon', 'assets/character/weapon_red_magic_staff.png');

    this.load.image('imp_idle_0', 'assets/monsters/imp/imp_idle_anim_f0.png');
    this.load.image('imp_idle_1', 'assets/monsters/imp/imp_idle_anim_f1.png');
    this.load.image('imp_idle_2', 'assets/monsters/imp/imp_idle_anim_f2.png');
    this.load.image('imp_idle_3', 'assets/monsters/imp/imp_idle_anim_f3.png');
    this.load.image('imp_run_0', 'assets/monsters/imp/imp_run_anim_f0.png');
    this.load.image('imp_run_1', 'assets/monsters/imp/imp_run_anim_f1.png');
    this.load.image('imp_run_2', 'assets/monsters/imp/imp_run_anim_f2.png');
    this.load.image('imp_run_3', 'assets/monsters/imp/imp_run_anim_f3.png');

    this.load.image('demon_idle_0', 'assets/monsters/demon/big_demon_idle_anim_f0.png');
    this.load.image('demon_idle_1', 'assets/monsters/demon/big_demon_idle_anim_f1.png');
    this.load.image('demon_idle_2', 'assets/monsters/demon/big_demon_idle_anim_f2.png');
    this.load.image('demon_idle_3', 'assets/monsters/demon/big_demon_idle_anim_f3.png');
    this.load.image('demon_run_0', 'assets/monsters/demon/big_demon_run_anim_f0.png');
    this.load.image('demon_run_1', 'assets/monsters/demon/big_demon_run_anim_f1.png');
    this.load.image('demon_run_2', 'assets/monsters/demon/big_demon_run_anim_f2.png');
    this.load.image('demon_run_3', 'assets/monsters/demon/big_demon_run_anim_f3.png');

    this.load.image('ogre_idle_0', 'assets/monsters/ogre/ogre_idle_anim_f0.png');
    this.load.image('ogre_idle_1', 'assets/monsters/ogre/ogre_idle_anim_f1.png');
    this.load.image('ogre_idle_2', 'assets/monsters/ogre/ogre_idle_anim_f2.png');
    this.load.image('ogre_idle_3', 'assets/monsters/ogre/ogre_idle_anim_f3.png');
    this.load.image('ogre_run_0', 'assets/monsters/ogre/ogre_run_anim_f0.png');
    this.load.image('ogre_run_1', 'assets/monsters/ogre/ogre_run_anim_f1.png');
    this.load.image('ogre_run_2', 'assets/monsters/ogre/ogre_run_anim_f2.png');
    this.load.image('ogre_run_3', 'assets/monsters/ogre/ogre_run_anim_f3.png');

    this.load.image('skeleton_idle_0', 'assets/monsters/skeleton/skelet_idle_anim_f0.png');
    this.load.image('skeleton_idle_1', 'assets/monsters/skeleton/skelet_idle_anim_f1.png');
    this.load.image('skeleton_idle_2', 'assets/monsters/skeleton/skelet_idle_anim_f2.png');
    this.load.image('skeleton_idle_3', 'assets/monsters/skeleton/skelet_idle_anim_f3.png');
    this.load.image('skeleton_run_0', 'assets/monsters/skeleton/skelet_run_anim_f0.png');
    this.load.image('skeleton_run_1', 'assets/monsters/skeleton/skelet_run_anim_f1.png');
    this.load.image('skeleton_run_2', 'assets/monsters/skeleton/skelet_run_anim_f2.png');
    this.load.image('skeleton_run_3', 'assets/monsters/skeleton/skelet_run_anim_f3.png');

    this.load.image('swampy_idle_0', 'assets/monsters/swampy/swampy_idle_anim_f0.png');
    this.load.image('swampy_idle_1', 'assets/monsters/swampy/swampy_idle_anim_f1.png');
    this.load.image('swampy_idle_2', 'assets/monsters/swampy/swampy_idle_anim_f2.png');
    this.load.image('swampy_idle_3', 'assets/monsters/swampy/swampy_idle_anim_f3.png');
    this.load.image('swampy_run_0', 'assets/monsters/swampy/swampy_run_anim_f0.png');
    this.load.image('swampy_run_1', 'assets/monsters/swampy/swampy_run_anim_f1.png');
    this.load.image('swampy_run_2', 'assets/monsters/swampy/swampy_run_anim_f2.png');
    this.load.image('swampy_run_3', 'assets/monsters/swampy/swampy_run_anim_f3.png');

    this.load.image('zombie_idle_0', 'assets/monsters/zombie/big_zombie_idle_anim_f0.png');
    this.load.image('zombie_idle_1', 'assets/monsters/zombie/big_zombie_idle_anim_f1.png');
    this.load.image('zombie_idle_2', 'assets/monsters/zombie/big_zombie_idle_anim_f2.png');
    this.load.image('zombie_idle_3', 'assets/monsters/zombie/big_zombie_idle_anim_f3.png');
    this.load.image('zombie_run_0', 'assets/monsters/zombie/big_zombie_run_anim_f0.png');
    this.load.image('zombie_run_1', 'assets/monsters/zombie/big_zombie_run_anim_f1.png');
    this.load.image('zombie_run_2', 'assets/monsters/zombie/big_zombie_run_anim_f2.png');
    this.load.image('zombie_run_3', 'assets/monsters/zombie/big_zombie_run_anim_f3.png');

    this.load.spritesheet('explosion', 'assets/explosion/explosion-4.png', { frameWidth: 128, frameHeight: 128 });
}

function create ()
{
    this.add.tileSprite(400, 300, 800, 600, 'tile');

    player = this.add.container(400, 300);
    player.setSize(17, 17);
    player.character = this.physics.add.sprite(0, 0, 'character_idle_0');
    player.weapon = this.physics.add.sprite(0,10, 'weapon');
    player.weapon.setScale(0.8);
    player.weapon.setOrigin(0.5, 0.7);
    player.add(player.character);
    player.add(player.weapon);
    this.physics.world.enable(player);
    player.body.setCollideWorldBounds(true);

    this.anims.create({
        key: 'character_idle',
        frames: [
            {key: 'character_idle_0'},
            {key: 'character_idle_1'},
            {key: 'character_idle_2'},
            {key: 'character_idle_3'},
        ],
        frameRate: 5,
        repeat: -1
    });

    player.character.anims.play('character_idle');

    createMonster(this, 'imp', 80, 150);
    createMonster(this, 'demon', 70, 150);
    createMonster(this, 'ogre', 40, 300);
    createMonster(this, 'skeleton', 90, 200);
    createMonster(this, 'swampy', 75, 220);
    createMonster(this, 'zombie', 60, 250);

    explosion = this.physics.add.sprite(0, 0);
    explosion.setScale(0.5);

    this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 12 }),
        frameRate: 15,
        repeat: 0
    });

    this.cameras.main.setBounds(0, 0, 800, 600);
    this.cameras.main.zoom = 1.8;
    this.cameras.main.startFollow(player, true);

    cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.on('keydown_SPACE', function (event) {
        if(Date.now() - attackTime > 1000 && !gameOver){
            attack(this);
            attackTime = Date.now();
        }
    }.bind(this));

    monsters.forEach((monster) => {
        this.physics.add.collider(player, monster, hitMonster, null, this);
    })

    scoreText = this.add.text(200, 150, 'SCORE: 0', { fontFamily: 'Consolas', fontSize: '120px', fill: '#fff' });
    scoreText.setScale(0.1);
    scoreText.setScrollFactor(0);

    var text = 'MOVE   : ←, ↑, ↓, →\n';
    text += 'ATTACK : [SPACE]'
    var instructions = this.add.text(495, 150, text, { fontFamily: 'Consolas', fontSize: '100px', fill: '#fff' });
    instructions.setScale(0.1);
    instructions.setScrollFactor(0);

    gameOverText = this.add.text(275, 175, 'GAME\nOVER', { fontFamily: 'Consolas', fontSize: '120px', fill: '#fff' });
    gameOverText.setScale(1);
    gameOverText.setScrollFactor(0);
    gameOverText.setAlpha(0);
    gameOverText.animation = this.tweens.add({
        targets: gameOverText,
        props: {
            alpha: { value: 1 }
        },
        ease: 'Power1',
        duration: 3000,
        yoyo: false,
        paused: true
    });
}

function update ()
{
    if(!gameOver){
        playerUpdate();
        monsters.forEach((monster) => {
            monsterUpdate(monster);
        })
    }
}

function createMonster(scene, name, velocity, proximity){
    var monster = scene.physics.add.sprite(
        Math.random() * config.width,
        Math.random() * config.height, 
        name + '_idle_0'
    );
    monster.name = name;
    monster.alive = true;
    monster.velocity = velocity;
    monster.proximity = proximity;

    scene.anims.create({
        key: name+'_idle',
        frames: [
            {key: name+'_idle_0'},
            {key: name+'_idle_1'},
            {key: name+'_idle_2'},
            {key: name+'_idle_3'},
        ],
        frameRate: 5,
        repeat: -1
    });

    scene.anims.create({
        key: name+'_run',
        frames: [
            {key: name+'_run_0'},
            {key: name+'_run_1'},
            {key: name+'_run_2'},
            {key: name+'_run_3'},
        ],
        frameRate: 5,
        repeat: -1
    });

    monster.anims.play(name+'_idle');

    monsters.push(monster);
}

function attack(scene){
    scene.tweens.add({
        targets: player.weapon,
        props: {
            angle: { value: 60 * player.character.scaleX }
        },
        ease: 'Power1',
        duration: 200,
        yoyo: true,
        paused: true
    }).play();
    if(playerTarget){
        explosion.setX(playerTarget.x);
        explosion.setY(playerTarget.y-25);
        explosion.play('explode');
        monstersKilled.push(playerTarget);
        score += 100;
        scoreText.setText('SCORE: ' + score);
        checkSecret();
        playerTarget.setAlpha(0);
        playerTarget.alive = false;
        playerTarget.setX(-100);
        playerTarget.setY(-100);
        var respawnedMonster = playerTarget;
        setTimeout(() => {
            if(!gameOver){
                respawnedMonster.setX(Math.random() * config.width);
                respawnedMonster.setY(Math.random() * config.height);
                respawnedMonster.setAlpha(1);
                respawnedMonster.alive = true;
            }
        }, 3000);
    }
}

function hitMonster (player, monster)
{
    monsters.forEach((monster) => {
        monster.setAlpha(0);
    })
    this.physics.pause();
    player.weapon.setAlpha(0);
    player.character.setAlpha(0);
    explosion.setX(player.body.x);
    explosion.setY(player.body.y-10);
    explosion.setScale(1);
    explosion.play('explode');
    gameOverText.animation.play();
    gameOver = true;
}

function playerUpdate()
{
    if (cursors.left.isDown)
    {
        player.character.scaleX =-1;
        player.body.setVelocityX(-100);
    }
    else if (cursors.right.isDown)
    {
        player.character.scaleX =1;
        player.body.setVelocityX(100);
    }
    else {
        player.body.setVelocityX(0);
    }

    if (cursors.up.isDown)
    {
        player.body.setVelocityY(-100);

    }
    else if (cursors.down.isDown)
    {
        player.body.setVelocityY(100);

    }
    else {
        player.body.setVelocityY(0);
    }

    var minDist = Infinity;
    var found = false;
    monsters.forEach((monster) => {
        monster.clearTint();
        if(monster.alive){
            var dist2Player = Math.sqrt( Math.pow((monster.x-player.body.x), 2) + Math.pow((monster.y-player.body.y), 2) );
            if(dist2Player < 100 && dist2Player < minDist){
                playerTarget = monster;
                found = true;
                minDist = Math.min(minDist, dist2Player);
            }
        }
    });
    if(!found){
        playerTarget = null;
    }
    else{
        playerTarget.setTint(0xff0000);
    }
}

function monsterUpdate(monster){
    if(monster.alive){
        var vecX = player.body.x - monster.x;
        var vecY =  player.body.y - monster.y;
        var dist2Player = Math.sqrt( Math.pow((monster.x-player.body.x), 2) + Math.pow((monster.y-player.body.y), 2) );
        if(dist2Player < monster.proximity){
            if(vecX < 0){
                monster.scaleX =-1;
            }
            else{
                monster.scaleX =1;
            }
            monster.setVelocityX(monster.velocity * vecX/dist2Player);
            monster.setVelocityY(monster.velocity * vecY/dist2Player);
            monster.anims.play(monster.name + '_run', true);
        }
        else{
            monster.setVelocityX(0);
            monster.setVelocityY(0);
            monster.anims.play(monster.name + '_idle', true);
        }
    }
}

function checkSecret(){

    if(score != 600) return;

    const 괴물 = monstersKilled;
    const 열쇠 = "아르카뷔디아";
    
    if(String.fromCharCode((괴물[0].proximity * (괴물[0].velocity + 괴물[0].name.charCodeAt(0) + 20)), ((괴물[1].name.charCodeAt(0) - 64).toString().repeat(2) + 괴물[1].proximity/50), (Number(괴물[2].proximity + "" + 괴물[2].velocity) * 2 + 괴물[2].name.charCodeAt(0) * 75 + 77), (괴물[3].name.charCodeAt(0) * 괴물[3].name.charCodeAt(1) * 4 + (괴물[3].proximity + 괴물[3].velocity) * 16 - 864), (괴물[4].name.split("").sort().join("").charCodeAt(1) * 256 + (괴물[4].proximity + 괴물[4].velocity + 30) * 82), ((괴물[5].name.charCodeAt(4) + 괴물[5].proximity*8/5) * 100)) == 열쇠){
        win();
    }
    
}

function win(){
    var 플래그 = [];
    var 괴물 = monstersKilled;
    var 열쇠 = [149, 144, 62, 117, 233, 184, 141, 241, 230, 126, 250, 172, 56, 180, 137, 88, 159, 86, 132, 52, 208, 136, 76, 98, 186, 142, 151, 250, 153, 73, 48, 83, 184, 71, 245, 99, 135, 211, 3, 199, 70, 175, 204, 208, 105, 128, 167, 83, 114, 55, 102, 221, 80, 230, 82, 59, 137, 209, 196, 86, 13, 93, 170, 168, 48, 48, 99, 54, 90, 79, 236, 188, 136, 116, 216, 21, 1, 129, 55, 151, 201, 41, 19, 125, 119, 19, 248, 149, 210, 251, 166, 53, 118, 149, 168, 162, 168, 81, 136, 6, 79, 126, 97, 143, 44, 39, 20, 71, 105, 190, 47, 27, 158, 194, 169, 193, 37, 60, 146, 45, 184, 245, 125, 248, 212, 22, 75, 255, 212, 228, 23, 131, 75, 75, 140, 20, 148, 173, 189, 22, 226, 4, 26, 82, 0, 22, 115, 15, 254, 34, 203, 14, 178, 10, 122, 212, 77, 93, 32, 252, 109, 213, 117, 152, 70, 42, 182, 194, 82, 168, 164, 164, 16, 56, 29, 127, 142, 77, 172, 94, 142, 43, 138, 144, 136, 46, 161, 36, 241, 238, 163, 204, 225, 183, 28, 160, 255, 181, 113, 223, 198, 211, 89, 30, 63, 3, 91, 201, 6, 57, 135, 2, 183, 71, 113, 224, 205, 245, 175, 32, 221, 131, 216, 167, 89, 110, 96, 164, 196, 11, 194, 238, 88, 223, 163, 174, 205, 231, 121, 206, 163, 168, 100, 147, 181, 169, 67, 184, 245, 212, 86, 244, 79, 5, 220, 27, 40, 113, 193, 215, 94, 181, 239, 148, 166, 59, 172, 47, 211, 2, 94, 227, 255, 160, 167, 188, 212, 201, 135, 15, 239, 108, 24, 1, 213, 250, 163, 39, 84, 243, 237, 109, 126, 89, 240, 21, 72, 100, 127, 74, 117, 46, 151, 120, 245, 43, 124, 37, 178, 59, 28, 186, 46, 107, 165, 199, 195, 129, 240, 2, 250, 150, 148, 30, 18, 94, 195, 105, 158, 221, 134, 26, 196, 80, 23, 65, 172, 192, 253, 5, 126, 211, 64, 186, 103, 110, 1, 71, 234, 8, 44, 232, 57, 113, 65, 229, 108, 51, 159, 185, 36, 110, 80, 100, 52, 45, 79, 5, 65, 165, 195, 154, 158, 10, 19, 229, 30, 124, 75, 256, 222, 35, 47, 12, 226, 51, 224, 17, 162, 13, 225, 201, 173, 157, 12, 239, 250, 193, 0, 29, 224, 13, 220, 158, 100, 207, 61, 223, 3, 6, 164, 10, 159, 142, 11, 247, 164, 37, 107, 151, 188, 113, 203, 150, 154, 252, 28, 57, 150, 196, 113, 75, 19, 121, 9, 210, 135, 122, 198, 239, 71, 40, 170, 189, 198, 220, 28, 81, 141, 147, 3, 243, 122, 2, 167, 140, 128, 39, 88, 198, 27, 144, 25, 210, 256, 153, 56, 224, 77, 126, 122, 34, 172, 191, 60, 151, 100, 88, 249, 223, 254, 89, 202, 108, 189, 73, 255, 190, 105, 49, 247, 123, 27, 198, 33, 149, 167, 9, 162, 67, 107, 86, 3, 131, 252, 240, 91, 71, 128, 9, 106, 39, 237, 59, 187, 22, 115, 90, 255, 58, 200, 68, 134, 104, 138, 239, 23, 173, 54, 199, 49, 185, 244, 101, 169, 73, 218, 103, 79, 48, 124, 193, 107, 240, 133, 112, 233, 122, 45, 86, 31, 13, 133, 238, 81, 38, 188, 156, 55, 83, 197, 11, 192, 190, 39, 75, 71, 176, 8, 209, 7, 232, 137, 208, 250, 98];
    
    for(var i=0; i<괴물.length; i++){
        var 여= CryptoJS.MD5(괴물[i].name).toString()
        var 자 = CryptoJS.MD5(괴물[i].velocity.toString()).toString();
        var 친 = CryptoJS.MD5(괴물[i].proximity.toString()).toString();
        var 구 = i*96;

        for(var j=0; j<32; j++){
            열쇠[구+j] &= 여.charCodeAt(j);
            열쇠[구+j] += 여.charCodeAt(j);
        }

        구 += 32

        for(var j=0; j<32; j++){
            열쇠[구+j] &= 자.charCodeAt(j);
            열쇠[구+j] += 자.charCodeAt(j);
        }

        구 += 32

        for(var j=0; j<32; j++){
            열쇠[구+j] &= 친.charCodeAt(j);
            열쇠[구+j] += 친.charCodeAt(j);
        }
    }

    for(var i=0; i<32; i++){
        var z = 0;
        for(var j=0; j<괴물.length*3; j++){
            z ^= 열쇠[i*괴물.length*3 + j];
        }
        플래그.push(z);
    }

    열쇠 = [-88, -2, 2, 7, -26, -29, -11, -19, -152, -153, 48, 23, -172, -31, 49, 30, 32, 23, 11, -41, 34, 14, -73, -139, -174, 100, 61, -43, 78, 12, -136, -61]
    for(var i=0; i<열쇠.length; i++){
        플래그[i] += 열쇠[i];
    }

    scoreText.setText(`Arkav7{${String.fromCharCode(...플래그)}}`)
}