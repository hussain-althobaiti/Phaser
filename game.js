let highScore = Number(localStorage.getItem('highScore') || 0);
let maxUnlockedLevel = Number(localStorage.getItem('maxUnlockedLevel') || 1);
function setMaxUnlockedLevel(n) {
    try {
        maxUnlockedLevel = Math.max(maxUnlockedLevel, n);
        localStorage.setItem('maxUnlockedLevel', String(maxUnlockedLevel));
    } catch (e) {}
}

// Fixed levels data: 10 levels from easy to harder
const LEVELS = [
    // Level 1
    { platforms: [
        { x: 200, y: 500, scaleX: 1.2 },
        { x: 400, y: 420, scaleX: 1.0 },
        { x: 600, y: 340, scaleX: 1.2 }
    ]},
    // Level 2
    { platforms: [
        { x: 150, y: 520, scaleX: 1.1 },
        { x: 350, y: 440, scaleX: 1.0 },
        { x: 550, y: 360, scaleX: 0.9 },
        { x: 700, y: 300, scaleX: 1.0 }
    ]},
    // Level 3
    { platforms: [
        { x: 250, y: 520, scaleX: 0.9 },
        { x: 450, y: 460, scaleX: 0.9 },
        { x: 650, y: 400, scaleX: 0.9 },
        { x: 350, y: 320, scaleX: 1.0 }
    ]},
    // Level 4
    { platforms: [
        { x: 120, y: 520, scaleX: 0.9 },
        { x: 300, y: 460, scaleX: 0.8 },
        { x: 480, y: 400, scaleX: 0.8 },
        { x: 660, y: 340, scaleX: 0.9 },
        { x: 360, y: 280, scaleX: 0.9 }
    ]},
    // Level 5
    { platforms: [
        { x: 180, y: 520, scaleX: 0.8 },
        { x: 360, y: 470, scaleX: 0.8 },
        { x: 540, y: 420, scaleX: 0.8 },
        { x: 720, y: 370, scaleX: 0.8 },
        { x: 450, y: 300, scaleX: 0.8 }
    ]},
    // Level 6
    { platforms: [
        { x: 120, y: 520, scaleX: 0.75 },
        { x: 280, y: 470, scaleX: 0.75 },
        { x: 440, y: 420, scaleX: 0.75 },
        { x: 600, y: 370, scaleX: 0.75 },
        { x: 760, y: 320, scaleX: 0.75 }
    ]},
    // Level 7
    { platforms: [
        { x: 220, y: 520, scaleX: 0.7 },
        { x: 380, y: 470, scaleX: 0.7 },
        { x: 540, y: 420, scaleX: 0.7 },
        { x: 700, y: 370, scaleX: 0.7 },
        { x: 420, y: 310, scaleX: 0.7 }
    ]},
    // Level 8
    { platforms: [
        { x: 160, y: 520, scaleX: 0.65 },
        { x: 320, y: 470, scaleX: 0.65 },
        { x: 480, y: 420, scaleX: 0.65 },
        { x: 640, y: 370, scaleX: 0.65 },
        { x: 360, y: 310, scaleX: 0.65 },
        { x: 520, y: 270, scaleX: 0.65 }
    ]},
    // Level 9
    { platforms: [
        { x: 120, y: 520, scaleX: 0.6 },
        { x: 280, y: 470, scaleX: 0.6 },
        { x: 440, y: 420, scaleX: 0.6 },
        { x: 600, y: 370, scaleX: 0.6 },
        { x: 760, y: 320, scaleX: 0.6 },
        { x: 500, y: 260, scaleX: 0.6 }
    ]},
    // Level 10
    { platforms: [
        { x: 100, y: 520, scaleX: 0.55 },
        { x: 260, y: 470, scaleX: 0.55 },
        { x: 420, y: 420, scaleX: 0.55 },
        { x: 580, y: 370, scaleX: 0.55 },
        { x: 740, y: 320, scaleX: 0.55 },
        { x: 440, y: 260, scaleX: 0.55 }
    ]}
];

class StartScene extends Phaser.Scene {
    constructor() {
        super('StartScene');
    }

    preload() {
        // Preload assets
        this.load.image('player', 'assets/Player.png');
        this.load.image('platform', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('platform1', 'assets/platform1.png');
    }

    create() {
        // Background and Fade in
        this.cameras.main.setBackgroundColor('#0b1020');
        this.cameras.main.fadeIn(400, 0, 0, 0);

        // Star particles background (guarded)
        try {
            const particles = this.add.particles(0, 0, 'star');
            particles.createEmitter({
                x: { min: 0, max: 800 },
                y: 0,
                lifespan: 6000,
                speedY: { min: 20, max: 60 },
                scale: { start: 0.5, end: 0.2 },
                alpha: { start: 0.4, end: 0 },
                quantity: 2,
                blendMode: Phaser.BlendModes.ADD
            });
        } catch (e) {}

        // Decorative moving platforms
        const deco1 = this.add.image(140, 380, 'platform1').setScale(0.9).setAlpha(0.8);
        const deco2 = this.add.image(660, 440, 'platform').setScale(1.0).setAlpha(0.8);
        this.tweens.add({ targets: deco1, y: '+=18', duration: 1600, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
        this.tweens.add({ targets: deco2, y: '-=18', duration: 1800, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

        // Title
        const title = this.add.text(400, 170, 'Star Game', { fontSize: '56px', fill: '#FFD700' }).setOrigin(0.5);
        this.tweens.add({ targets: title, scale: { from: 1.0, to: 1.08 }, duration: 900, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
        this.tweens.add({ targets: title, angle: { from: -2, to: 2 }, duration: 2000, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

        // Subtitle / CTA
        const cta = this.add.text(400, 300, 'Click to Select Level', { fontSize: '30px', fill: '#FFFFFF' }).setOrigin(0.5);
        this.tweens.add({ targets: cta, alpha: { from: 0.3, to: 1 }, duration: 700, yoyo: true, repeat: -1 });

        // Floating star near center
        const heroStar = this.add.image(400, 230, 'star').setScale(1.1).setAlpha(0.9);
        this.tweens.add({ targets: heroStar, y: '+=14', duration: 1200, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
        this.tweens.add({ targets: heroStar, angle: 360, duration: 4000, repeat: -1, ease: 'Linear' });

        this.input.once('pointerdown', () => {
            this.cameras.main.fadeOut(250, 0, 0, 0);
            this.time.delayedCall(250, () => this.scene.start('LevelSelectScene'));
        });
    }
}

class LevelSelectScene extends Phaser.Scene {
    constructor() {
        super('LevelSelectScene');
    }

    create() {
        const cols = 5;
        const rows = 2;
        const cellW = 120;
        const cellH = 120;
        const startX = 400 - ((cols - 1) * cellW) / 2;
        const startY = 220 - ((rows - 1) * cellH) / 2;

        this.add.text(400, 80, 'Select Level', { fontSize: '36px', fill: '#FFF' }).setOrigin(0.5);

        for (let i = 1; i <= 10; i++) {
            const col = (i - 1) % cols;
            const row = Math.floor((i - 1) / cols);
            const x = startX + col * cellW;
            const y = startY + row * cellH;

            const unlocked = i <= maxUnlockedLevel;
            const color = unlocked ? 0x2ecc71 : 0x7f8c8d;
            const rect = this.add.rectangle(x, y, 90, 90, color, 0.9).setStrokeStyle(2, 0xffffff);
            if (unlocked) rect.setInteractive({ useHandCursor: true });

            const label = this.add.text(x, y, String(i), { fontSize: '28px', fill: '#fff' }).setOrigin(0.5);
            if (!unlocked) {
                this.add.text(x, y + 24, '🔒', { fontSize: '20px' }).setOrigin(0.5);
                rect.setAlpha(0.7);
            }

            if (unlocked) {
                rect.on('pointerdown', () => {
                    this.scene.start('GameScene', { level: i });
                });
            }
        }

        // Back to Start
        const back = this.add.text(400, 500, 'Back', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        back.on('pointerdown', () => this.scene.start('StartScene'));
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        // Level/state
        this.level = this.scene.settings.data?.level || 1;
        this.totalStarsInLevel = 0;
        this.collectedStars = 0;
        this.gameOver = false;
        this.winText = null;

        // Platforms
        this.platforms = this.physics.add.staticGroup();
        this.generatePlatformsFromLevel(this.level);

        // Player setup
        this.player = this.physics.add.sprite(100, 450, 'player');
        this.player.setScale(0.5);
        this.player.body.setSize(this.player.displayWidth, this.player.displayHeight);
        this.player.setCollideWorldBounds(true);

        // Stars setup
        this.stars = this.physics.add.staticGroup();
        this.placeStarsOnPlatforms(this.level);

        // If not enough stars were placed, restart the scene
        if (this.totalStarsInLevel < 3) {
            this.scene.restart();
            return;
        }

        // Collisions & overlaps
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        // Controls
        this.cursors = this.input.keyboard.createCursorKeys();

        // UI: score display and level label
        this.scoreText = this.add.text(16, 16, `Stars: ${this.collectedStars}/${this.totalStarsInLevel}`, {
            fontSize: '32px',
            fill: '#FFF'
        });
        this.scoreText.setScrollFactor(0);
        this.levelText = this.add.text(650, 16, `Level ${this.level}/10`, { fontSize: '24px', fill: '#FFF' });
        this.levelText.setScrollFactor(0);

        // Add Mobile Controls
        this.createMobileControls();
    }

    update() {
        if (this.gameOver) return;

        this.player.setVelocityX(0);

        // Keyboard + Touch controls
        if (this.cursors.left.isDown || this.moveLeft) {
            this.player.setVelocityX(-160);
        }
        if (this.cursors.right.isDown || this.moveRight) {
            this.player.setVelocityX(160);
        }
        if ((this.cursors.up.isDown || this.moveUp) && this.player.body.blocked.down) {
            this.player.setVelocityY(-330);
        }
    }

    createMobileControls() {
        this.moveLeft = false;
        this.moveRight = false;
        this.moveUp = false;

        let btnSize = 60; // Button size
        const uiDepth = 1000;

        // Left button
        let leftButton = this.add.rectangle(50, 540, btnSize, btnSize, 0x6666ff).setInteractive();
        leftButton.on('pointerdown', () => this.moveLeft = true);
        leftButton.on('pointerup', () => this.moveLeft = false);
        leftButton.on('pointerout', () => this.moveLeft = false);
        leftButton.setScrollFactor(0).setDepth(uiDepth);

        // Right button
        let rightButton = this.add.rectangle(130, 540, btnSize, btnSize, 0x6666ff).setInteractive();
        rightButton.on('pointerdown', () => this.moveRight = true);
        rightButton.on('pointerup', () => this.moveRight = false);
        rightButton.on('pointerout', () => this.moveRight = false);
        rightButton.setScrollFactor(0).setDepth(uiDepth);

        // Jump button
        let upButton = this.add.rectangle(700, 540, btnSize, btnSize, 0xff6666).setInteractive();
        upButton.on('pointerdown', () => this.moveUp = true);
        upButton.on('pointerup', () => this.moveUp = false);
        upButton.on('pointerout', () => this.moveUp = false);
        upButton.setScrollFactor(0).setDepth(uiDepth);

        // Add button labels
        this.add.text(40, 530, "←", { fontSize: '32px', fill: '#FFF' }).setScrollFactor(0).setDepth(uiDepth);
        this.add.text(120, 530, "→", { fontSize: '32px', fill: '#FFF' }).setScrollFactor(0).setDepth(uiDepth);
        this.add.text(690, 530, "↑", { fontSize: '32px', fill: '#FFF' }).setScrollFactor(0).setDepth(uiDepth);
    }

    generatePlatformsFromLevel(level) {
        const idx = Phaser.Math.Clamp(level - 1, 0, LEVELS.length - 1);
        const def = LEVELS[idx];
        def.platforms.forEach(p => {
            const platform = this.platforms.create(p.x, p.y, 'platform');
            platform.setScale(p.scaleX || 1, 1).refreshBody();
        });
    }

    placeStarsOnPlatforms(level) {
        const hardness = Phaser.Math.Clamp(level, 1, 10);
        this.platforms.children.iterate(platform => {
            const width = platform.displayWidth || platform.width || 100;
            const margin = Math.min(30, Math.max(16, width * 0.12));
            // base count by platform width then scaled by difficulty
            const baseByWidth = width / 160; // ~1 star per 160px
            const difficultyScale = hardness <= 3 ? 1.0 : hardness <= 6 ? 0.8 : 0.6;
            let numStars = Math.round(baseByWidth * difficultyScale);
            numStars = Phaser.Math.Clamp(numStars, 1, 4);

            this.totalStarsInLevel += numStars;

            const usableWidth = Math.max(10, width - margin * 2);
            const step = usableWidth / (numStars + 1);
            const left = platform.x - width / 2 + margin;
            for (let i = 1; i <= numStars; i++) {
                const jitter = Phaser.Math.Between(-6, 6);
                const x = left + step * i + jitter;
                const y = platform.y - 22;
                const star = this.stars.create(x, y, 'star');
                star.setScale(0.5);

                // Star floating animation
                this.tweens.add({
                    targets: star,
                    y: y - 10,
                    duration: 1400 + Phaser.Math.Between(-200, 200),
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'
                });

                // Star rotation
                this.tweens.add({
                    targets: star,
                    angle: 360,
                    duration: 2600 + Phaser.Math.Between(-400, 400),
                    repeat: -1
                });
            }
        });
    }

    collectStar(player, star) {
        if (!star.active) return;
        star.body.enable = false;

        this.tweens.add({
            targets: star,
            scale: 0,
            duration: 200,
            onComplete: () => star.destroy()
        });

        this.scoreText.setText(`Stars: ${++this.collectedStars}/${this.totalStarsInLevel}`);

        if (this.collectedStars === this.totalStarsInLevel) {
            this.gameOver = true;
            // proceed to next level or end scene
            const nextLevel = this.level + 1;
            if (nextLevel <= 10) {
                setMaxUnlockedLevel(nextLevel);
                this.time.delayedCall(500, () => {
                    this.scene.restart({ level: nextLevel });
                });
            } else {
                this.showWinScreen();
            }
        }
    }

    showWinScreen() {
        this.physics.pause();

        this.winText = this.add.text(
            400, 300,
            'All Levels Complete!\nClick to Continue',
            { fontSize: '40px', fill: '#0f0', align: 'center' }
        ).setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.start('EndScene', { score: this.collectedStars });
        });
    }
}

class EndScene extends Phaser.Scene {
    constructor() {
        super('EndScene');
    }

    init(data) {
        this.score = data.score;
    }

    create() {
        if (this.score > highScore) {
            highScore = this.score;
            try {
                localStorage.setItem('highScore', String(highScore));
            } catch (e) {}
        }

        this.add.text(400, 250, `Game Over\nScore: ${this.score}\nHigh Score: ${highScore}`, {
            fontSize: '32px',
            fill: '#FFF',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(400, 350, "Back to Level Select", {
            fontSize: '24px',
            fill: '#FFF',
            align: 'center'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.start('LevelSelectScene');
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: { default: 'arcade', arcade: { gravity: { y: 300 }, debug: false } },
    scene: [StartScene, LevelSelectScene, GameScene, EndScene]
};

const game = new Phaser.Game(config);
