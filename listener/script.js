function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startRecording() {
    document.getElementById('status').innerHTML = 'Actively Listening';
    active = true;
    // record and cache ten seconds of audio every x seconds
    while (active) {
        // Check if browser supports MediaRecorder
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert("Your browser does not support audio recording.");
            return;
        }

        try {
            // Request permission to access the microphone
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            let chunks = [];

            // Event handler for when data is available
            mediaRecorder.ondataavailable = event => {
                if (event.data.size > 0) {
                    chunks.push(event.data);
                }
            };

            // Event handler for when recording stops
            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(chunks, { type: 'audio/webm' });
                const audioUrl = URL.createObjectURL(audioBlob);
                const audioElement = document.getElementById('audioPlayback');
                audioElement.src = audioUrl;
                audioElement.play();
                chunks = []; // Clear the chunks array for the next recording
            };

            // Start recording
            mediaRecorder.start();
            await sleep(10000);
            mediaRecorder.stop();

        } catch (err) {
            console.error("Error accessing microphone: ", err);
        }
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
