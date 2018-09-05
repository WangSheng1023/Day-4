var gulp = require('gulp');
var webserver = require('gulp-webserver');
var fs = require('fs');
var path = require('path');
var url = require('url');

gulp.task('webserver', function() {
    gulp.src('src')
        .pipe(webserver({
            port: 8516,
            middleware: function(req, res, next) {
                if (req.url === '/favicon.ico') {
                    return;
                }
                var pathanme = url.parse(req.url).pathname;
                if (pathanme === '/') {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', 'index.html')));
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathanme)));
                }
            }
        }))
});