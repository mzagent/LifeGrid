import worker from './_lib/index.js';

function asWorkerRequest(request) {
    const url = new URL(request.url);
    url.pathname = '/generate';
    return new Request(url, request);
}

export function GET(request) {
    return worker.fetch(asWorkerRequest(request), {}, {});
}

export function OPTIONS(request) {
    return worker.fetch(asWorkerRequest(request), {}, {});
}
