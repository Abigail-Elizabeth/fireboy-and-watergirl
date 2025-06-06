let canvas;
let context;
let fpsInterval = 1000 / 24;
let now;
let then = Date.now();
let request_id;

// Laying out the background using a tileset
let background = [
    [13, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 14],
    [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 24, 25, 25, 25, 25, 26, -1, -1, -1, -1, -1, -1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 22],
    [21,  1,  1,  1,  1,  2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 16, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 14],
    [ 9,  9,  9,  9,  9, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [ 9,  9,  9,  9,  9, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [ 9,  9,  9,  9,  9, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 24, 25, 26, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 40, 41, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [ 9,  9,  9,  9,  9, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9, 48, 49, 40, 41, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [ 9,  9,  9,  9,  9, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9, 48, 49, 40, 41, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [ 9,  9,  9,  9,  9, 21,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 22,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9, 48, 49,  1,  1,  1,  1,  1,  1,  2, -1, -1, -1, -1,  8],
    [13, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, -1, -1, -1, -1,  8],
    [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [10, -1, -1, -1, -1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 40, 41, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [10, -1, -1, -1, -1, 16, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 14, 49, 40, 41, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8,  9, 48, 49, 40, 41, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8,  9,  9,  9, 48, 49,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 22],
    [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 16, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 14],
    [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [21,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  2, 41, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [13, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 14,  9,  9, 48, 49, 40, 41, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8,  9,  9,  9,  9, 48, 49, 40, 41, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 16, 17, 17, 14,  9,  9,  9, 48, 49,  1,  1,  1,  1, 37, 38, 38, 38, 39,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 40, 41, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9, 48, 49, 40, 41, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 16, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 21,  1,  2, -1, -1, -1, -1, -1, -1,  8],
    [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 16, 17, 18, -1, -1, -1, -1, -1, -1,  8],
    [21,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [13, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 42, 43,  1,  1,  1,  1,  1, 22],
    [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8,  9,  9,  9,  9,  9,  9,  9],
    [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8,  9,  9,  9,  9,  9,  9,  9],
    [21,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 53, 54, 54, 54, 55,  1,  1,  1,  1, 45, 46, 46, 46, 47,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 22,  9,  9,  9,  9,  9,  9,  9],
    [ 9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9]
]

let tilesPerRow = 8;
let tileSize = 16;
let tiles = [];
let backgroundImage = new Image();

// Character fireboy
let fireboy = {
    x: 0,
    y: 0,
    width: 32,
    height: 32,
    frameX: 0,
    frameY: 0,
    xChange: 0,
    yChange: 0,
    in_air: false,
    door: false
}
let fireboyImage = new Image();
    // Movement booleans
    let fb_moveLeft = false;
    let fb_moveUp = false;
    let fb_moveRight = false;

// Character watergirl
let watergirl = {
    x: 0,
    y: 0,
    width: 32,
    height: 32,
    frameX: 0,
    frameY: 0,
    xChange: 0,
    yChange: 0,
    in_air: false,
    door: false
}
let watergirlImage = new Image();
    // Movement booleans
    let wg_moveLeft = false;
    let wg_moveUp = false;
    let wg_moveRight = false;

// Objects and other stuff
let objectsImage = new Image();
let diamonds = [
    {
        frameX: 0,
        frameY: 0,
        width: 16,
        height: 16,
        x: 40 * 16,
        y: 37 * 16
    },
    {
        frameX: 1,
        frameY: 0,
        width: 16,
        height: 16,
        x: 49 * 16,
        y: 37 * 16
    },
    {
        frameX: 0,
        frameY: 0,
        width: 16,
        height: 16,
        x: 10 * 16,
        y: 18 * 16
    },
    {
        frameX: 1,
        frameY: 0,
        width: 16,
        height: 16,
        x: 35 * 16,
        y: 18 * 16
    },
    {
        frameX: 1,
        frameY: 0,
        width: 16,
        height: 16,
        x: 2 * 16,
        y: 6 * 16
    },
    {
        frameX: 0,
        frameY: 0,
        width: 16,
        height: 16,
        x: 13 * 16,
        y: 5 * 16
    },
    {
        frameX: 1,
        frameY: 0,
        width: 16,
        height: 16,
        x: 43 * 16,
        y: 5 * 16
    }
]
let buttons = [
    {   // button
        frameX: 2,
        frameY: 0,
        width: 16,
        height: 16,
        x: 13 * 16,
        y: 25 * 16,
        button: false,
        color: "white"
    },
    {   // button
        frameX: 2,
        frameY: 0,
        width: 16,
        height: 16,
        x: 20 * 16,
        y: 18 * 16,
        button: false,
        color: "white"
    },
    {   // button
        frameX: 4,
        frameY: 0,
        width: 16,
        height: 16,
        x: 45 * 16,
        y: 18 * 16,
        button: false,
        color: "green"
    },
    {   // button
        frameX: 4,
        frameY: 0,
        width: 16,
        height: 16,
        x: 59 * 16,
        y: 12 * 16,
        button: false,
        color: "green"
    }
];
let lifts = [
    {   // lift
        frameX: 0,
        frameY: 1,
        width: 16,
        height: 16,
        x: 2 * 16,
        y: 19 * 16,
        down: 23 * 16,
        up: 19 * 16,
        color: "white",
        button: true
    },
    {   // lift
        frameX: 2,
        frameY: 1,
        width: 16,
        height: 16,
        x: 66 * 16,
        y: 13 * 16,
        down: 19 * 16,
        up: 13 * 16,
        color: "green",
        button: true
    },
];
let doors = [
    {
        image_x: 0,
        image_y: 4 * 16,
        image_width: 32,
        image_height: 32,
        canvas_x: 59 * 16,
        canvas_y: 2 * 16,
        canvas_width: 64,
        canvas_height: 64,
        open: false
    },
    {
        image_x: 2 * 16,
        image_y: 4 * 16,
        image_width: 32,
        image_height: 32,
        canvas_x: 63 * 16,
        canvas_y: 2 * 16,
        canvas_width: 64,
        canvas_height: 64,
        open: false
    }
];
let frames = [
    {
        image_x: 4 * 16,
        image_y: 4 * 16,
        image_width: 32,
        image_height: 32,
        canvas_x: 59 * 16,
        canvas_y: 2 * 16,
        canvas_width: 64,
        canvas_height: 64
    },
    {
        image_x: 4 * 16,
        image_y: 4 * 16,
        image_width: 32,
        image_height: 32,
        canvas_x: 63 * 16,
        canvas_y: 2 * 16,
        canvas_width: 64,
        canvas_height: 64
    }
];
let floor;

document.addEventListener("DOMContentLoaded", init, false);

function init() {
    // Canvas setup
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");
    
    // Characters' positioning or spawning points
    floor = canvas.height - 32;
    fireboy.x = (canvas.width / 2) - fireboy.width;
    fireboy.y = 1 * 16;     // 3 * 16 drop down when spawn in
    watergirl.x = 4 * 16;  
    watergirl.y = 28 * 16;  // 3 * 16 drop down when spawn in
    
    window.addEventListener("keydown", activate, false);
    window.addEventListener("keyup", deactivate, false);

    load_assets([
        {"var": backgroundImage, "url": "../static/tilesheet_final.png"},
        {"var": fireboyImage, "url": "../static/fireboy_spritesheet.png"},
        {"var": watergirlImage, "url": "../static/watergirl_spritesheet.png"},
        {"var": objectsImage, "url": "../static/Objects.png"}        
    ], draw);
}

// Animation loop
function draw() {
    request_id = window.requestAnimationFrame(draw);
    
    // Frame rate check
    let now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInterval) {
        return;
    }
    then = now - (elapsed % fpsInterval);

    // Painting the background brown
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#584c25";
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawBackgroundTiles();
    drawObjects();

    // Update the characters
    updateCharacter(fireboy, fb_moveLeft, fb_moveRight, fb_moveUp);
    updateCharacter(watergirl, wg_moveLeft, wg_moveRight, wg_moveUp);

    drawCharacter(fireboyImage, fireboy);
    drawCharacter(watergirlImage, watergirl);

    // Checking pool collisions
    checkPoolCollision(fireboy);
    checkPoolCollision(watergirl);

    // checking object collisions
    checkDiamondCollision(fireboy);
    checkDiamondCollision(watergirl);
    checkButtons(fireboy, buttons, lifts);
    checkButtons(watergirl, buttons, lifts);
    // moveFloatingLifts(lifts[0], lifts[0].down);
    // moveFloatingLifts(lifts[1], lifts[1].down);

    checkDoors();
}

// Draws the background onto the canvas
function drawBackgroundTiles() {
    for (let r = 0; r < background.length; r++) {
        for (let c = 0; c < background[r].length; c++) {
            let tile = background[r][c];
            if (tile >= 0) {
                let tileRow = Math.floor(tile / tilesPerRow);
                let tileCol = Math.floor(tile % tilesPerRow);
                context.drawImage(backgroundImage,
                    tileCol * tileSize, tileRow * tileSize, tileSize, tileSize,
                    c * tileSize, r * tileSize, tileSize, tileSize);
            }
        }
    }
}

// Draws the objects onto the canvas
function drawObjects() {
    for (let i = 0; i < diamonds.length; i++) {
        context.drawImage(objectsImage,
            diamonds[i].frameX * diamonds[i].width, diamonds[i].frameY * diamonds[i].height, diamonds[i].width, diamonds[i].height,                       
            diamonds[i].x, diamonds[i].y, diamonds[i].width, diamonds[i].height);
    }
    for (let i = 0; i < buttons.length; i++) {
        let obj = buttons[i];
        context.drawImage(objectsImage,
            obj.frameX * obj.width, obj.frameY * obj.height, obj.width, obj.height,                       
            obj.x, obj.y, obj.width, obj.height);
    }
    for (let i = 0; i < lifts.length; i++) {
        let obj = lifts[i];
        context.drawImage(objectsImage,
            obj.frameX * obj.width, obj.frameY * obj.height, obj.width, obj.height,                       
            obj.x, obj.y, obj.width * 2, obj.height * 2);
    }
    for (let i in doors) {
        context.drawImage(objectsImage,
            doors[i].image_x, doors[i].image_y, doors[i].image_width, doors[i].image_height,                       
            doors[i].canvas_x, doors[i].canvas_y, doors[i].canvas_width, doors[i].canvas_height);
    }
    for (let i in frames) {
        console.log("hi");
        context.drawImage(objectsImage,
            frames[i].image_x, frames[i].image_y, frames[i].image_width, frames[i].image_height,                       
            frames[i].canvas_x, frames[i].canvas_y, frames[i].canvas_width, frames[i].canvas_height);
    }
}

// Updating the characters position 
function updateCharacter(character, moveLeft, moveRight, moveUp) {
    // Applying physics
    updatePhysics(character);

    // Checking to see if he's staring to jump
    if (moveUp && !character.in_air) {
        character.yChange = -18; // Initial jump height
        character.in_air = true;
    }

    // Handle horizontal movement
    if (moveLeft) {
        character.xChange = -5;
        character.frameY = character.in_air ? 4 : 2;   
    } else if (moveRight) {
        character.xChange = 5;
        character.frameY = character.in_air ? 3 : 1;   
    } else if (!character.in_air) {
        character.xChange = 0;
        character.frameY = 0;   // Idle animation if not moving left or right, and not in air
    }

    // Update animations
    updateAnimation(character, moveLeft, moveRight, moveUp);

    // Update position
    character.x += character.xChange;
    character.y += character.yChange;

    // Handle collisions
    handleCollisions(character);
}

function updatePhysics(character) {
    character.yChange = character.yChange + 1.5;  // gravity
    character.xChange = character.xChange * 0.9;  // friction
    character.yChange = character.yChange * 0.9;  // air resistance
}

// Updates the characters' animations
function updateAnimation(character, moveLeft, moveRight, moveUp) {
    // Jump animations
    if (moveUp || character.in_air) {
        if (!(moveLeft || moveRight)) {
            character.frameY = 5;  // Jumping up
        } else if (moveLeft) {
            character.frameY = 4;  // Jumping left
        } else if (moveRight) {
            character.frameY = 3;  // Jumping right
        }
        character.frameX = (character.frameX + 1) % 6;  // 6 frames 
    }
    // Walking and idle animations
    else {
        character.frameX = (character.frameX + 1) % 4;  // 4 frames
    }
}

// Finding the tiles surrounding the character and checking if he has collided with any, and then resolving it
function handleCollisions(character) {
    const surroundingTilesAndObjects = getSurroundingTilesAndObjects(character);

    // Colliding side booleans
    let collidingBottom = false;
    let collidingLeft = false;
    let collidingRight = false;
    let collidingTop = false;

    for (const tile of surroundingTilesAndObjects) {
        if (isColliding(character, tile)) {
            const side = resolveCollision(character, tile);

            if (side === 'bottom') collidingBottom = true;
            else if (side === 'top') collidingTop = true;
            else if (side === 'left') collidingLeft = true;
            else if (side === 'right') collidingRight = true;
        }
    }

    character.in_air = !collidingBottom;

    if (collidingBottom || collidingTop) {
        character.yChange = 0;
    } else if (collidingLeft || collidingRight) {
        character.xChange = 0;
    }
}

// Getting the tiles surrounding a character
function getSurroundingTilesAndObjects(character) {
    // Converting character position to tile coordinates
    const startCol = Math.floor(character.x / tileSize);
    const endCol = Math.floor((character.x + character.width) / tileSize);
    const startRow = Math.floor(character.y / tileSize);
    const endRow = Math.floor((character.y + character.height) / tileSize);

    const surroundingTilesAndObjects = [];

    // Getting all tiles that the character might be colliding with
    for (let row = startRow - 1; row <= endRow + 1; row++) {
        for (let col = startCol - 1; col <= endCol + 1; col++) {
            if (row >= 0 && row < background.length && 
                col >= 0 && col < background[0].length &&
                background[row][col] >= 0) {
                    if (background[row][col] == 38 ||
                        background[row][col] == 54 ||
                        background[row][col] == 46) {
                            continue;
                    } else {
                        let tile = {
                            x: col * tileSize,
                            y: row * tileSize,
                            width: tileSize,
                            height: tileSize
                            }
                        surroundingTilesAndObjects.push(tile);
                    }
            }
        }
    }
    for (let i = 0; i < lifts.length; i++) {
        let lift = {
            x: lifts[i].x,
            y: lifts[i].y,
            width: lifts[i].width * 2,
            height: lifts[i].height * 2
        }
        surroundingTilesAndObjects.push(lift)
    }
    return surroundingTilesAndObjects;
}

function isColliding(character, obj) {
    if (character.x < obj.x + obj.width &&
        character.x + character.width > obj.x &&
        character.y < obj.y + obj.height &&
        character.y + character.height > obj.y) {
        return true;
    } else {
        return false;
    }
}

// resolving the collision but checking overlapping
function resolveCollision(character, tile) {
    const overlapX = Math.min(
        Math.abs(character.x + character.width - tile.x),
        Math.abs(character.x - (tile.x + tile.width))
    );

    const overlapY = Math.min(
        Math.abs(character.y + character.height - tile.y),
        Math.abs(character.y - (tile.y + tile.height))
    );

    if (overlapX < overlapY) {
        // Horizontal collision
        if (character.x < tile.x) {
            character.x = tile.x - character.width;
            return 'right';
        } else {
            character.x = tile.x + tile.width;
            return 'left';
        }
    } else {
        // Vertical collision
        if (character.y < tile.y) {
            character.y = tile.y - character.height;
            return 'bottom';  // standing on top of tile
        } else {
            character.y = tile.y + tile.height;
            return 'top';     // hitting head
        }
    }
}

// drawing the characters
function drawCharacter(image, character) {
    context.drawImage(image,
        character.frameX * character.width, character.frameY * character.height, character.width, character.height,                       
        character.x, character.y, character.width, character.height                        
    );
}

// Checking pool collisions
function checkPoolCollision(character) {
    const pools = getPoolTiles(character);
    // console.log(pools);

    // Checking the pools
    for (const tile of pools) {
        if(isColliding(character, tile)) {
            if (character == fireboy) {
                if (tile.tile_no != 54) {
                    // window.alert("Gave Over!");
                    stop("Game Over!");
                    return;
                }
            } else if (character == watergirl) {
                if (tile.tile_no != 46) {
                    stop("Game Over!");
                    return;
                }
            }
        }
    }
}

// Getting the pools surrounding a character
function getPoolTiles(character) {
    // Converting character position to tile coordinates
    const startCol = Math.floor(character.x / tileSize);
    const endCol = Math.floor((character.x + character.width) / tileSize);
    const startRow = Math.floor(character.y / tileSize);
    const endRow = Math.floor((character.y + character.height) / tileSize);

    const pools = [];
    
    // Getting the pools tiles thats the character might be colliding with
    for(let row = startRow - 1; row <= endRow + 1; row++) {
        for (let col = startCol - 1; col <= endCol + 1; col++) {
            if (row >= 0 && row < background.length && 
                col >= 0 && col < background[0].length &&
                (background[row][col] == 38 ||
                background[row][col] == 54 ||
                background[row][col] == 46)) {
                    let pool = {
                        x: col * tileSize,
                        y: row * tileSize,
                        width: tileSize,
                        height: tileSize,
                        tile_no: background[row][col]
                    }
                    pools.push(pool);
            }
        }
    }
    return pools;
}

// Checking to see if the character has collected their diamonds
function checkDiamondCollision(character) {
    for (let i = 0; i < diamonds.length; i++) {
        if (character == fireboy && 
            diamonds[i].frameX == 0 && diamonds[i].frameY == 0 &&
            isColliding(character, diamonds[i])) {
                diamonds.splice(i, 1);
        } else if (character == watergirl && 
            diamonds[i].frameX == 1 && diamonds[i].frameY == 0 &&
            isColliding(character, diamonds[i])) {
                diamonds.splice(i, 1);
            }
    }
}

// Checking all buttons
function checkButtons(character, buttons, lifts) {
    // check if either character has collided with a button
    for (let i = 0; i < buttons.length; i++) {
        if (isColliding(character, buttons[i])) {
            buttons[i].button = true;
        } else {
            buttons[i].button = false;
        }
    }

    // do the necessary action based on which button has been pushed
    for (let i = 0; i < buttons.length; i++) {
        for (let j = 0; j < lifts.length; j++) {
            if (buttons[i].color == lifts[j].color) {
                lifts[j].button = buttons[i].button;
                if (lifts[j].button) {
                    moveFloatingLifts(lifts, j, lifts[j].down)
                } else {
                    moveFloatingLifts(lifts, j, lifts[j].up)
                }
            }
        }
    }
}

// Move the floating objects a few units in a certain direction
function moveFloatingLifts(lifts, index, stop) {
    if (lifts[index].button) {      // checks if the lifts has to go down or up
        if (lifts[index].y < stop) {
            console.log(stop);
            lifts[index].y = lifts[index].y + 0.5;
            console.log(lifts[index].y);
        }
    } else {
        if (lifts[index].y > stop) {
            lifts[index].y = lifts[index].y - 0.5;
        }
    }
    return;
}

// checking to see if the characters are in front of the doors
function checkDoors() {
    if (doors[0].open && doors[1].open) {
        stop("You Win!");
        return;
    }
    if (isColliding(fireboy, {x: doors[0].canvas_x + 16, y: doors[0].canvas_y, width: doors[0].canvas_width - 32, height: doors[0].canvas_height})) {
        updateDoorAnimation(fireboy);
    }
    if (isColliding(watergirl, {x: doors[1].canvas_x + 16, y: doors[1].canvas_y, width: doors[1].canvas_width - 32, height: doors[1].canvas_height})) {
        updateDoorAnimation(watergirl);
    }
}

// Animates the doors
function updateDoorAnimation(character) {
    if (character == fireboy) {
        if (doors[0].canvas_height == 0) {
            doors[0].open = true;
            return;
        } else {
            doors[0].image_x += 1;
            doors[0].image_height -= 1;
            doors[0].canvas_height -= 2;
        }
        console.log("hi");
    } else if (character == watergirl) {
        if (doors[1].canvas_height == 0) {
            doors[1].open = true;
            return;
        } else {
            doors[1].image_x += 1;
            doors[1].image_height -= 1;
            doors[1].canvas_height -= 2;
        }
    }
}

// Turns on movement for characters based on the key presses 
function activate(event) {
    let key = event.key;
    if (key === "ArrowLeft" ||
        key === "ArrowRight" ||
        key === "ArrowUp" ||
        key === "A" ||
        key === "a" ||
        key === "W" ||
        key === "w" ||
        key === "D" ||
        key === "d") {
        event.preventDefault();
    }
    if (key === "ArrowLeft") {
        fb_moveLeft = true;
    } else if (key === "ArrowRight") {
        fb_moveRight = true;
    }
    if (key === "ArrowUp") {
        fb_moveUp = true;
    }
    if (key === "A" || key === "a") {
        wg_moveLeft = true;
    } else if (key === "D" || key === "d") {
        wg_moveRight = true;
    }
    if (key === "W" || key === "w") {
        wg_moveUp = true;
    }
}

// Turns off movement for characters based on the key presses
function deactivate(event) {
    let key = event.key;
    if (key === "ArrowLeft") {
        fb_moveLeft = false;
    } else if (key === "ArrowRight") {
        fb_moveRight = false;
    }
    if (key === "ArrowUp") {
        fb_moveUp = false;
    }
    if (key === "A" || key === "a") {
        wg_moveLeft = false;
    } else if (key === "D" || key === "d") {
        wg_moveRight = false;
    }
    if (key === "W" || key === "w") {
        wg_moveUp = false;
    }
}

// Confirms that images have been loaded before the animation loop is started
function load_assets(assets, callback) {
    let num_assets = assets.length;
    let loaded = function() {
        console.log("loaded");
        num_assets = num_assets - 1;
        if (num_assets === 0) {
            callback();
        }
    };
    for (let asset of assets) {
        let element = asset.var;
        if (element instanceof HTMLImageElement) {
            console.log("img");
            element.addEventListener("load", loaded, false);
        }
        else if (element instanceof HTMLAudioElement) {
            console.log("audio");
            element.addEventListener("canplaythrough", loaded, false);
        }
        element.src = asset.url;
    }
}

// Stops the game
function stop(outcome_txt) {
    window.removeEventListener("keydown", activate, false);
    window.removeEventListener("keyup", deactivate, false);
    window.cancelAnimationFrame(request_id);
    let outcome_element = document.querySelector("#outcome");
    outcome_element.innerHTML = outcome_txt;
}
