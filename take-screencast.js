var fs = require('fs');
var child_process = require('child_process');

var ffmpeg = require('child_process').spawn('ffmpeg -f gdigrab -framerate 30 -i desktop -c:v libx265 -r 30 -preset ultrafast -tune zerolatency -crf 28 -pix_fmt yuv420p -y screencast.mp4', { shell: true });

fs.writeFile('screencast.lock', '', () => {
        const check = () => fs.stat('screencast.lock', (err) => err ? ffmpeg.stdin.write('q\n') : setTimeout(check, 1000));

        check();
});
