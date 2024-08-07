document.addEventListener('DOMContentLoaded', function () {
    const sliders = document.querySelectorAll('.slider');
    const displayText = document.getElementById('displayText');
    const riddleText = document.getElementById('riddleText');
    const skillsSection = document.getElementById('skillsSection');
    const totem = document.querySelector('.totem');
    const slideInBox = document.querySelector('.slide-in-box');
    const clickSound = document.getElementById('clickSound');
    const rockMoveSound = document.getElementById('rockMoveSound');
    const leverSound = document.getElementById('leverSound');
    const leafSound = document.getElementById('leafSound');
    const victorySound = document.getElementById("victorySound");

    let isTotemMovedRight = false; 

    sliders.forEach((slider) => {
        slider.addEventListener('click', function (event) {
            clickSound.currentTime = 0; 
            clickSound.play();
            const bar = slider.parentElement;
            const barWidth = bar.clientWidth;
            const sliderWidth = slider.clientWidth;

            if (slider.classList.contains('moved-right')) {
                slider.style.left = bar.classList.contains('right-start') ? 'calc(100% - 30px)' : '0px';
                slider.classList.remove('moved-right');
            } else {
                slider.style.left = bar.classList.contains('right-start') ? '0px' : (barWidth - sliderWidth) + 'px';
                slider.classList.add('moved-right');
            }

            checkPattern();
        });
    });

    totem.addEventListener('click', function () {
        leverSound.currentTime = 0;
        leverSound.play();

        if (!isTotemMovedRight) {
            totem.style.transition = "transform 2s, left 2s";
            totem.style.left = "calc(100% - 420px)";

            setTimeout(function () {
                slideInBox.style.transition = "left 2s";
                slideInBox.style.left = "0%"; 
                rockMoveSound.currentTime = 0;
                rockMoveSound.play();
            }, 1000); 
        } else {
            
            totem.style.transition = "transform 2s, left 2s";
            
            totem.style.left = "0";

            slideInBox.style.transition = "left 2s";
            slideInBox.style.left = "-100%"; 
            rockMoveSound.currentTime = 0;
            rockMoveSound.play();
            setTimeout(function () {
                
            }, 2000);
        }

        isTotemMovedRight = !isTotemMovedRight; 
    });

    function checkPattern() {
        const firstPuzzleBars = document.querySelectorAll('.puzzle-box:first-of-type .bar .slider');
        const secondPuzzleBars = document.querySelectorAll('.puzzle-box:last-of-type .bar .slider');

        const firstPuzzleCorrect = firstPuzzleBars[0].classList.contains('moved-right') &&
            !firstPuzzleBars[1].classList.contains('moved-right') &&
            firstPuzzleBars[2].classList.contains('moved-right');

        const secondPuzzleCorrect = !secondPuzzleBars[0].classList.contains('moved-right') &&
            secondPuzzleBars[1].classList.contains('moved-right') &&
            !secondPuzzleBars[2].classList.contains('moved-right');

        if (firstPuzzleCorrect && secondPuzzleCorrect) {
            displayText.style.display = 'block';
            riddleText.style.display = 'none';
            skillsSection.classList.remove('hidden');
            victorySound.currentTime = 0; 
            victorySound.play();
        } else {
            displayText.style.display = 'none';
            riddleText.style.display = 'block';
        }
    }
});
