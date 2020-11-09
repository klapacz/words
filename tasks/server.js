import http from 'http';
import handler from 'serve-handler';

const options = {
    public: 'dist',

    rewrites: [{ source: '/**', destination: '/index.html' }],
};

export default function () {
    http.createServer((req, res) => {
        return handler(req, res, options);
    }).listen('8000');
}
