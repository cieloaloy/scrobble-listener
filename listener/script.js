function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startRecording() {
    document.getElementById('status').innerHTML = 'Actively Listening';
    active = true;
    // record and cache ten seconds of audio every x seconds
    //while (active) {
    for (let i = 0; i<10; i++) {
        console.log("guh");
        await sleep(2000);
    // pass recording to shazamio
    // if success, cache title
    // if title = same as prev, discard
    // if different, scrobble to lastfm and overwrite prev
    }
}

function stopRecording() {
    document.getElementById('status').innerHTML = '';
    active = false;
}

// event loop
document.addEventListener('DOMContentLoaded', () => {
    var active = false;
    // slider to select time interval, x

    // play button (active recording)
    document.getElementById('recorder').addEventListener('click', () => {
        startRecording();
    });
    document.getElementById('stopper').addEventListener('click', () => {
        stopRecording();
    });
});
