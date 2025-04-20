let canvas;
let context;
let fpsInterval = 1000 / 24;
let now;
let then = Date.now();

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
    [21,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 40, 41, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [13, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 14,  9,  9, 48, 49, 40, 41, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8,  9,  9,  9,  9, 48, 49, 40, 41, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 16, 17, 17, 14,  9,  9,  9, 48, 49,  1,  1,  1,  1,  1,  1,  1,  1, 37, 38, 38, 38, 38, 39,  1,  1,  1,  1,  1,  1, 40, 41, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9, 48, 49, 40, 41, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 16, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 21,  1,  2, -1, -1, -1, -1, -1, -1,  8],
    [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 16, 17, 18, -1, -1, -1, -1, -1, -1,  8],
    [21,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [13, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8],
    [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 42, 43,  1,  1,  1,  1,  1, 22],
    [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8,  9,  9,  9,  9,  9,  9,  9],
    [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  8,  9,  9,  9,  9,  9,  9,  9],
    [21,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 53, 54, 54, 54, 54, 55,  1,  1,  1,  1, 45, 46, 46, 46, 46, 47,  1,  1,  1,  1,  1,  1,  1,  1, 22,  9,  9,  9,  9,  9,  9,  9],
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
    in_air: false
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
    color: "blue"
}
let watergirlImage = new Image();
    // Movement booleans
    let wg_moveLeft = false;
    let wg_moveUp = false;
    let wg_moveRight = false;

// Objects and other stuff
let objectsImage = new Image();
let floor;

document.addEventListener("DOMContentLoaded", init, false);

function init() {
    // Canvas setup
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");
    tiles = [];
    // Characters' positioning or spawning points
    floor = canvas.height - 32;
    fireboy.x = (canvas.width / 2) - fireboy.width;
    fireboy.y = floor - fireboy.height;
    watergirl.x = (canvas.height / 2) - watergirl.width;  
    watergirl.y = floor - watergirl.height;
    
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
    window.requestAnimationFrame(draw);
    
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

    // Update the characters
    updateCharacter(fireboy, fb_moveLeft, fb_moveRight, fb_moveUp);
    updateCharacter(watergirl, wg_moveLeft, wg_moveRight, wg_moveUp);

    drawCharacter(fireboyImage, fireboy);
    drawCharacter(watergirlImage, watergirl);
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

// Updating the characters position 
function updateCharacter(character, moveLeft, moveRight, moveUp) {
    // Applying physics
    updatePhysics(character);

    // Checking to see if he's staring to jump
    if (moveUp && !character.in_air) {
        character.yChange = -16; // Initial jump height
        character.in_air = true;
    }

    // Handle horizontal movement
    if (moveLeft) {
        character.xChange = -5;
        character.frameY = 2;   
    } else if (moveRight) {
        character.xChange = 5;
        character.frameY = 3;   
    } else if (!character.in_air) {
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
    const surroundingTiles = getSurroundingTiles(character);

    // Colliding side booleans
    let collidingBottom = false;
    let collidingLeft = false;
    let collidingRight = false;
    let collidingTop = false;

    for (const tile of surroundingTiles) {
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
function getSurroundingTiles(character) {
    // Converting character position to tile coordinates
    const startCol = Math.floor(character.x / tileSize);
    const endCol = Math.floor((character.x + character.width) / tileSize);
    const startRow = Math.floor(character.y / tileSize);
    const endRow = Math.floor((character.y + character.height) / tileSize);

    const surroundingTiles = [];

    // Get all tiles that the character might be colliding with
    for (let row = startRow - 1; row <= endRow + 1; row++) {
        for (let col = startCol - 1; col <= endCol + 1; col++) {
            if (row >= 0 && row < background.length && 
                col >= 0 && col < background[0].length &&
                background[row][col]) {
                    let tile = {
                        x: col * tileSize,
                        y: row * tileSize,
                        width: tileSize,
                        height: tileSize
                    }
                surroundingTiles.push(tile);
            }
        }
    }
    return surroundingTiles;
}

function isColliding(character, obj) {
    return character.x < obj.x + obj.width &&
           character.x + character.width > obj.x &&
           character.y < obj.y + obj.height &&
           character.y + character.height > obj.y;
}

// 
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
        character.frameX * character.width,
        character.frameY * character.height,    
        character.width,                        
        character.height,                       
        character.x,                           
        character.y,                           
        character.width,                        
        character.height                        
    );
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
