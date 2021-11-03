import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const LOCALSTORAGE_KEY = "videoplayer-current-time";
const throttledTime = throttle(getCurrentTimePlayer, 1000);

player.on('timeupdate', throttledTime);

function getCurrentTimePlayer() {
    player.getCurrentTime()
        .then(function (seconds) {
            localStorage.setItem(LOCALSTORAGE_KEY, seconds);
        });
}

const currentTime = localStorage.getItem(LOCALSTORAGE_KEY);

if(currentTime != null) {
    player.setCurrentTime(currentTime);
}
