import { getElementPosition } from './misc.js';

// wait till DOM element rendered on page
document.addEventListener('DOMContentLoaded', () => {
    // get DOM elements
    const bird = document.querySelector('.bird');
    const game = document.querySelector('.game_container');
    const ground = document.querySelector('.ground_moving');

    // logical varriables
    const gravity = 3;
    let isGameOver = false;
    let { left: birdLeft, bottom: birdBottom } = getElementPosition(bird);

    const startGame = () => {
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px';
    };
    // const gameTimer = setInterval(startGame, 30);

    document.addEventListener('keyup', e => e.code === 'Space' && jump());

    const jump = () => {
        if (birdBottom < 485) birdBottom += 50;
        bird.style.bottom = birdBottom + 'px';
    };

    const generateObstacle = () => {
        let obstacleLeft = 500;
        let obstacleBottom = Math.random() * 60;

        const obstacle = document.createElement('div');
        const obstacleTop = document.createElement('div');

        if (!isGameOver) {
            obstacle.classList.add('obstacle');
            obstacleTop.classList.add('obstacle', 'obstacle_top');
        }

        obstacle.style.left = obstacleLeft + 'px';
        obstacleTop.style.left = obstacleLeft + 'px';

        obstacle.style.bottom = obstacleBottom + 'px';
        // obstacleTop.style.bottom = obstacleBottom + gap + 'px';
        obstacleTop.style.top = -obstacleBottom + 'px';

        game.appendChild(obstacle);
        game.appendChild(obstacleTop);

        const moveObstacles = () => {
            obstacleLeft -= 2;
            obstacle.style.left = obstacleLeft + 'px';
            obstacleTop.style.left = obstacleLeft + 'px';

            if (obstacleLeft === -60) {
                // here ##############################################
            }
        };
    };
    generateObstacle();
});
