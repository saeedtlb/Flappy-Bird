import { getElementPosition } from './misc.js';

// wait till DOM element rendered on page
document.addEventListener('DOMContentLoaded', () => {
    // get DOM elements
    const bird = document.querySelector('.bird');
    const game = document.querySelector('.game_container');
    const ground = document.querySelector('.ground_moving');
    const scoreTag = document.querySelector('.score h2 span');
    const bestscore = document.querySelector('.score h1 span');

    const best = window.localStorage.getItem('best_score');
    if (best) {
        bestscore.innerHTML = best;
    }

    // logical varriables
    const speed = 40;
    const gravity = 3;
    let isGameOver = false;
    let score = 0;
    let { left: birdLeft, bottom: birdBottom } = getElementPosition(bird);

    const startGame = () => {
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px';
    };
    const gameTimer = setInterval(startGame, speed);

    const jump = e => {
        if (e.code === 'Space' && birdBottom < 485) birdBottom += 50;
        bird.style.bottom = birdBottom + 'px';
    };

    document.addEventListener('keyup', jump);

    const generateObstacle = () => {
        let obstacleLeft = 500;
        let obstacleBottom = Math.random() * 60;

        const obstacle = document.createElement('div');
        const obstacleTop = document.createElement('div');

        if (isGameOver) return;

        obstacle.classList.add('obstacle');
        obstacleTop.classList.add('obstacle', 'obstacle_top');

        obstacle.style.left = obstacleLeft + 'px';
        obstacleTop.style.left = obstacleLeft + 'px';

        obstacle.style.bottom = obstacleBottom + 'px';
        obstacleTop.style.top = -obstacleBottom + 'px';

        game.appendChild(obstacle);
        game.appendChild(obstacleTop);

        const moveObstacles = () => {
            if (isGameOver) return;

            obstacleLeft -= 2;
            obstacle.style.left = obstacleLeft + 'px';
            obstacleTop.style.left = obstacleLeft + 'px';

            if (obstacleLeft === -60) {
                clearInterval(timer);
                game.removeChild(obstacle);
                game.removeChild(obstacleTop);
            }
            if (obstacleLeft === 170) {
                score++;
                scoreTag.innerHTML = score;
            }
            if (
                birdBottom === 0 ||
                (obstacleLeft > 170 &&
                    obstacleLeft < 281 &&
                    (birdBottom < obstacleBottom + 116 ||
                        birdBottom > obstacleBottom + 203))
            ) {
                gameOver();
                clearInterval(timer);
            }
        };
        let timer = setInterval(() => moveObstacles(), speed);
        if (!isGameOver) setTimeout(generateObstacle, 4000);
    };
    generateObstacle();

    const gameOver = () => {
        clearInterval(gameTimer);
        isGameOver = true;
        ground.classList.remove('ground_moving');
        document.removeEventListener('keyup', jump);

        if (score > best) {
            window.localStorage.setItem('best_score', score);
            bestscore.innerHTML = best;
        }
    };
});
