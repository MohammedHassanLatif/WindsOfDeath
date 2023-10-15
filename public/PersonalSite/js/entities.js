class Entity extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, type) {
        super(scene, x, y, key);

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
        this.setData("type", type);
        this.setData("isDead", false);
    }

    bloodSplosion()
    {
        this.setData("isDead", true);
        console.log("This thing is dead");
        this.scene.sfx.splat.play(); // play the blood splat sound effect
        this.setTexture("bloodSplatter");
        this.play("bloodSplatter");
        this.body.setVelocity(0, 0);
        this.on('animationcomplete', function() {
            this.destroy();
        }, this);
    }
}

class Player1 extends Entity {
    constructor(scene, x, y, key) {
        super(scene, x, y, key, "Player1");

        this.setData("speed1", 200);
        this.setData("angle1", 0);
        this.setData("isShooting1", false);
        this.setData("timerShootDelay1", 10);
        this.setData("timerShootTick1", this.getData("timerShootDelay1") - 1);
        this.setData("health1", 5);
        this.setData("canHurt1", true);
        var HP1 = 5;
    }

    moveUp() {
        this.body.velocity.y = -this.getData("speed1");
        this.angle = 270;
        this.setData("angle1", this.angle);
    }
    moveDown() {
        this.body.velocity.y = this.getData("speed1");
        this.angle = 90;
        this.setData("angle1", this.angle);
    }
    moveLeft() {
        this.body.velocity.x = -this.getData("speed1");
        this.angle = 180;
        this.setData("angle1", this.angle);
    }
    moveRight() {
        this.body.velocity.x = this.getData("speed1");
        this.angle = 0;
        this.setData("angle1", this.angle);
    }

    hurtMe1() {
        if(this.getData("health1") > 1)
        {
            console.log("Still alive with " + this.getData("health1") + " health");
            console.log("Player 1 hurt! Now unable to be hurt.");
            this.scene.sfx.chomp.play(); // play the chomp sound effect
            if(this.getData("canHurt1") == true)
            {
                this.setData("canHurt1", false);
                console.log("Player 1 cannot be hurt!");
                this.setData("health1", this.getData("health1") - 1);
                console.log("P1 health is now " + this.getData("health1"));
            }
            this.scene.setBarValue(p1HealthBar, this.getData("health1") * 20);
            this.scene.time.delayedCall(1000, this.canHurtMe1, [], this);
        }
        else if(this.getData("health1") <= 1)
        {
            this.scene.sfx.death.play(); // play the gun sound effect
            this.setData("health1", this.getData("health1") - 1);
            this.scene.setBarValue(p1HealthBar, this.getData("health1") * 20);
            console.log("Player 1 should die now.");
            this.scene.p1Alive = false;
            console.log("P1 is no longer alive");
            this.scene.passTheBuck();
            this.scene.setZombieTarget("player2");
            this.bloodSplosion();
        }
        else
        {
            console.log("Player 1 can't be hurt right now (or is dead). Health is " + this.getData("health1"));
        }
    }

    canHurtMe1()
    {
        this.setData("canHurt1", true);
        console.log("P1 can be hurt again");
    }

    update() {
        if (!this.getData("isDead")) {
            this.body.setVelocity(0, 0);

            if (this.getData("isShooting1")) {
                if (this.getData("timerShootTick1") < this.getData("timerShootDelay1")) {
                    this.setData("timerShootTick1", this.getData("timerShootTick1") + 1); // every game update, increase timerShootTick by one until we reach the value of timerShootDelay
                } else { // when the "manual timer" is triggered:
                    var p1bullet = new Player1Bullet(this.scene, this.x, this.y, this.angle);

                    this.scene.player1bullets.add(p1bullet);

                    this.scene.sfx.shoot.play(); // play the gun sound effect
                    this.setData("timerShootTick1", 0);
                }
            }
        }
    }
}

class Player2 extends Entity {
    constructor(scene, x, y, key) {
        super(scene, x, y, key, "Player2");
        this.isPlayer = true;
        this.setData("speed2", 200);
        this.setData("angle2", 0);
        this.setData("isShooting2", false);
        this.setData("timerShootDelay2", 10);
        this.setData("timerShootTick2", this.getData("timerShootDelay2") - 1);
        this.setData("health2", 5);
        this.setData("canHurt2", true);
    }

    moveUp() {
        this.body.velocity.y = -this.getData("speed2");
        this.angle = 270;
        this.setData("angle2", this.angle);
    }
    moveDown() {
        this.body.velocity.y = this.getData("speed2");
        this.angle = 90;
        this.setData("angle2", this.angle);
    }
    moveLeft() {
        this.body.velocity.x = -this.getData("speed2");
        this.angle = 180;
        this.setData("angle2", this.angle);
    }
    moveRight() {
        this.body.velocity.x = this.getData("speed2");
        this.angle = 0;
        this.setData("angle2", this.angle);
    }

    hurtMe2() {
        if(this.getData("health2") > 1)
        {
            console.log("Still alive with " + this.getData("health2") + " health");
            console.log("Player 2 hurt! Now unable to be hurt.");
            this.scene.sfx.chomp.play(); // play the chomp sound effect
            if(this.getData("canHurt2") == true)
            {
                this.setData("canHurt2", false);
                console.log("Player 2 cannot be hurt!");
                this.setData("health2", this.getData("health2") - 1);
                console.log("P2 health is now " + this.getData("health2"));
            }
            this.scene.setBarValue(p2HealthBar, this.getData("health2") * 20);
            this.scene.time.delayedCall(1000, this.canHurtMe2, [], this);
        }
        else if(this.getData("health2") <= 1)
        {
            this.scene.sfx.death.play(); // play the gun sound effect
            this.setData("health2", this.getData("health2") - 1);
            this.scene.setBarValue(p2HealthBar, this.getData("health2") * 20);
            console.log("Player 2 should die now.");
            this.scene.p2Alive = false;
            console.log("P2 is no longer alive");
            this.scene.setZombieTarget("player1");
            this.bloodSplosion();
        }
        else
        {
            console.log("Player 2 can't be hurt right now (or is dead). Health is " + this.getData("health2"));
        }
    }

    canHurtMe2()
    {
        this.setData("canHurt2", true);
        console.log("P2 can be hurt again");
    }

    update() {
        if (!this.getData("isDead")) {
            this.body.setVelocity(0, 0);

            if (this.getData("isShooting2")) {
                if (this.getData("timerShootTick2") < this.getData("timerShootDelay2")) {
                    this.setData("timerShootTick2", this.getData("timerShootTick2") + 1); // every game update, increase timerShootTick by one until we reach the value of timerShootDelay
                } else { // when the "manual timer" is triggered:
                    var p2bullet = new Player2Bullet(this.scene, this.x, this.y, this.angle);

                    this.scene.player2bullets.add(p2bullet);

                    this.scene.sfx.shoot.play(); // play the gun sound effect
                    this.setData("timerShootTick2", 0);
                }
            }
        }
    }
}

class Player1Bullet extends Entity {
    constructor(scene, x, y, angle) {
        super(scene, x, y, "p1bullet");

        console.log("Angle is " + angle);
        angle = this.scene.player1.getData("angle1");
        console.log("Player1 angle is " + angle);
        this.setAngle(angle);
        angle = angle * (Math.PI / 180);
        console.log("Angle after Pi is " + angle);


        this.laser_speed = 450;

        console.log(this.angle);

        this.vx = this.laser_speed * Math.cos(angle);
        this.vy = this.laser_speed * Math.sin(angle);

        this.body.velocity.x = this.vx;
        this.body.velocity.y = this.vy;

        this.scene.time.delayedCall(1000, this.destroyBullet, [], this);
    }
    destroyBullet(){
        console.log("P1 bullet destroyed");
        this.destroy();
    }
}

class Player2Bullet extends Entity {
    constructor(scene, x, y, angle) {
        super(scene, x, y, "p2bullet");

        console.log("Angle is " + angle);
        angle = this.scene.player2.getData("angle2");
        console.log("Player2 angle is " + angle);
        this.setAngle(angle);
        angle = angle * (Math.PI / 180);
        console.log("Angle after Pi is " + angle);

        this.laser_speed = 450;

        console.log(this.angle);

        this.vx = this.laser_speed * Math.cos(angle);
        this.vy = this.laser_speed * Math.sin(angle);

        this.body.velocity.x = this.vx;
        this.body.velocity.y = this.vy;

        this.scene.time.delayedCall(1000, this.destroyBullet, [], this);


    }
    destroyBullet(){
        console.log("P2 bullet destroyed");
        this.destroy();
    }
}

class Zombie extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "zombie1");

        this.setData("zombieHealth", 3);
        this.setData("canHurtZombie", true);
        this.setData("target", "player1");

        this.states = {
            IDLE: "IDLE",
            CHASE: "CHASE"
        };
        this.state = this.states.IDLE;
        this.setDepth(5);

        if(Phaser.Math.Between(0, 9) > 5)
        {
            this.setData("target", "player2");
        }
        else
        {
            this.setData("target", "player1");
        }

        console.log("Target is " + this.getData("target"));
    }

    update() {
        if(this.getData("target") == "player1")
        {
            if (!this.getData("isDead") && this.scene.player1) {
                if (Phaser.Math.Distance.Between(
                    this.x,
                    this.y,
                    this.scene.player1.x,
                    this.scene.player1.y
                ) < 550) {

                    this.state = this.states.CHASE;
                }



                if (this.state == this.states.CHASE) {
                    var dx = this.scene.player1.x - this.x;
                    var dy = this.scene.player1.y - this.y;

                    var angle = Math.atan2(dy, dx);

                    var speed = 50;
                    this.body.setVelocity(
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed
                    );

                    //spin code..??
                    /*if (this.x < this.scene.player1.x) {
                        this.angle -= 5;
                    }
                    else {
                        this.angle += 5;
                    }*/

                    const tx = this.scene.player1.x;
                    const ty = this.scene.player1.y;

                    const x = this.x;
                    const y = this.y;

                    const rotation = Phaser.Math.Angle.Between(x, y, tx, ty);
                    this.setRotation(rotation);
                }
            }
            else
            {
                this.body.setVelocity(0,0);
            }
        }
        else if (this.getData("target") == "player2")
        {
            if (!this.getData("isDead") && this.scene.player2) {
                if (Phaser.Math.Distance.Between(
                    this.x,
                    this.y,
                    this.scene.player2.x,
                    this.scene.player2.y
                ) < 550) {

                    this.state = this.states.CHASE;
                }



                if (this.state == this.states.CHASE) {
                    var dx = this.scene.player2.x - this.x;
                    var dy = this.scene.player2.y - this.y;

                    var angle = Math.atan2(dy, dx);

                    var speed = 50;
                    this.body.setVelocity(
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed
                    );

                    //spin code..??
                    /*if (this.x < this.scene.player2.x) {
                        this.angle -= 5;
                    }
                    else {
                        this.angle += 5;
                    }*/

                    const tx = this.scene.player2.x;
                    const ty = this.scene.player2.y;

                    const x = this.x;
                    const y = this.y;

                    const rotation = Phaser.Math.Angle.Between(x, y, tx, ty);
                    this.setRotation(rotation);
                }
            }
            else
            {
                this.body.setVelocity(0,0);
            }
        }
    }

    hurtZombie()
    {
        if(this.getData("zombieHealth") > 1)
        {
            console.log("Still alive with " + this.getData("zombieHealth") + " health");
            console.log("Zombie hurt! Now unable to be hurt.");
            if(this.getData("canHurtZombie") == true)
            {
                this.setData("canHurtZombie", false);
                console.log("Zombie cannot be hurt!");
                this.setData("zombieHealth", this.getData("zombieHealth") - 1);
                console.log("Zombie health is now " + this.getData("zombieHealth"));
            }
            this.scene.time.delayedCall(250, this.canHurtThisZombie, [], this);
        }
        else if(this.getData("zombieHealth") <= 1)
        {
            console.log("Zombie should die now.");
            this.bloodSplosion();
        }
        else
        {
            console.log("Zombie can't be hurt right now (or is dead). Health is " + this.getData("zombieHealth"));
        }
    }

    canHurtThisZombie()
    {
        this.setData("canHurtZombie", true);
        console.log("Zombie can be hurt again");
    }
}

class bloodSplatter extends Entity{
    constructor(scene, x, y) {
        super(scene, x, y, "bloodSplatter");
        this.play("bloodSplatter");
    }
}

class Goal extends Entity{
    constructor(scene, x, y) {
        super(scene, x, y, "goal");
        this.setData("sceneToLoad", null);
    }

    assignScene(sceneToLoad)
    {
        this.setData("sceneToLoad", sceneToLoad);
    }

    loadScene()
    {
        console.log("Player 1 collided at X:" + this.scene.player1.x + ", Y:" + this.scene.player1.y);
        this.scene.stopAudio();
        this.scene.scene.start(this.getData("sceneToLoad"));
    }
}