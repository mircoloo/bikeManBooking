const srv = require("./server.js")

test('app module should be defined', () => {
    expect(srv).toBeDefined();
});