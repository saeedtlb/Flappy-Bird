import { getElementPosition } from './misc.js';

// wait till DOM element rendered on page
document.addEventListener('DOMContentLoaded', () => {
    // get DOM elements
    const bird = document.querySelector('.bird');
    const game = document.querySelector('.game_container');
    const ground = document.querySelector('.ground_moving');
    const scoreTag = document.querySelectorAll('.score span');
    const bestscore = document.querySelector('.best_score span');
    const startbtn = document.querySelector('.menu .start_btn');
    const menu = document.querySelector('.menu_container');

    // Get user best score from local storage and show it in menu
    const best = window.localStorage.getItem('best_score');
    if (best) {
        bestscore.innerHTML = best;
    }

    // logical varriables
    const speed = 40;
    const gravity = 3;
    let isGameOver = true;
    let score = 0;
    let { bottom: birdBottom } = getElementPosition(bird);

    // Gravity of the game
    const startGame = () => {
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px';
    };

    let gameTimer = null;
    let time = null;

    startbtn.addEventListener('click', () => {
        console.log('restart');
        // reset varriables
        score = 0;
        birdBottom = 240;
        isGameOver = false;

        scoreTag[0].innerHTML = score;

        // remove obstacles
        const obstacles = document.querySelectorAll('.obstacle');
        obstacles.forEach(obstacle => game.removeChild(obstacle));

        document.addEventListener('keyup', jump);

        // start Game timers
        gameTimer = setInterval(startGame, speed);
        generateObstacle();
        time = setInterval(generateObstacle, 4000);

        menu.classList.add('hide');
    });

    const jump = e => {
        // If the key is space and the height of bird is less than 485 then increase height
        if (e.code === 'Space' && birdBottom < 485) birdBottom += 50;
        bird.style.bottom = birdBottom + 'px';
    };

    const generateObstacle = () => {
        let obstacleLeft = 500; // First position of the obstacles
        let obstacleBottom = Math.random() * 60; // Random num for height of obstacles

        if (isGameOver) return;

        const obstacle = document.createElement('div');
        const obstacleTop = document.createElement('div');

        obstacle.classList.add('obstacle');
        obstacleTop.classList.add('obstacle', 'obstacle_top');

        obstacle.style.left = obstacleLeft + 'px';
        obstacleTop.style.left = obstacleLeft + 'px';

        obstacle.style.bottom = obstacleBottom + 'px';
        obstacleTop.style.top = -obstacleBottom + 'px';

        game.appendChild(obstacle);
        game.appendChild(obstacleTop);

        // A function which will be call every 40ms(speed number) to decrease obstacleLeft = move obstacle to left
        const moveObstacles = () => {
            if (isGameOver) {
                clearInterval(timer);
                return;
            }

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
                scoreTag[0].innerHTML = score;
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
        let timer = setInterval(moveObstacles, speed);
    };

    const gameOver = () => {
        // stop timers
        clearInterval(gameTimer);
        clearInterval(time);

        isGameOver = true;
        ground.classList.remove('ground_moving');
        document.removeEventListener('keyup', jump);
        scoreTag[1].innerHTML = score;
        menu.classList.remove('hide');

        if (score > best) {
            window.localStorage.setItem('best_score', score);
            bestscore.innerHTML = score;
        }
    };
});
