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
    sliders.forEach((slider, index) => {
        slider.addEventListener('click', function (event) {
            clickSound.currentTime = 0; // Reset audio to start
            clickSound.play();
            const bar = slider.parentElement;
            const barWidth = bar.clientWidth;
            const sliderWidth = slider.clientWidth;

            if (slider.classList.contains('moved-right')) {
                slider.style.left = '0px';
                slider.classList.remove('moved-right');
            } else {
                slider.style.left = (barWidth - sliderWidth) + 'px';
                slider.classList.add('moved-right');
            }

            checkPattern();
        });
    });
    

    totem.addEventListener('click', function () {
        leverSound.currentTime = 0;
            leverSound.play();
        totem.classList.add('animate-rotate');
        totem.classList.add('animate-move');
       
        setTimeout(function () {

            slideInBox.style.opacity = '100';
            rockMoveSound.currentTime = 0;
            rockMoveSound.play();
            slideInBox.style.left = '0%'; // Adjust as needed to position the box correctly
        }, 1000); // Match this delay with the animation duration
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
            
        } else {
            displayText.style.display = 'none';
            riddleText.style.display = 'block';
        }
    }
});
