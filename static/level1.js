let canvas;
let context;
let fpsInterval = 1000 / 20;
let now;
let then = Date.now();

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
    color: "red"
}

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

let fireboyImage = new Image();
let watergirlImage = new Image();
let objectsImage = new Image();

let floor;

let fb_moveLeft = false;
let fb_moveUp = false;
let fb_moveRight = false;
let wg_moveLeft = false;
let wg_moveUp = false;
let wg_moveRight = false;

document.addEventListener("DOMContentLoaded", init, false);

function init() {
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");

    floor = canvas.height - 32;
    fireboy.x = (canvas.width / 2) - fireboy.width;
    fireboy.y = floor - fireboy.height;
    watergirl.x = (canvas.height / 2) - watergirl.width;
    watergirl.y = floor - watergirl.height;

    for (let i = 0; i < background.length; i++) {
        for (let j = 0; j < 70; j++) {
            if (background[i][j] >= 0) {
                let tile = {
                    x: i * 16,
                    y: j * 16,
                    size: 16
                }
                tiles.push(tile);
            }
        }
    }
    console.log(tiles);

    window.addEventListener("keydown", activate, false);
    window.addEventListener("keyup", deactivate, false);

    load_assets([
        {"var": backgroundImage, "url": "../static/tilesheet_final.png"},
        {"var": fireboyImage, "url": "../static/fireboy_spritesheet.png"},
        {"var": watergirlImage, "url": "../static/watergirl_spritesheet.png"},
        {"var": objectsImage, "url": "../static/Objects.png"}        
    ], draw);
}

function draw() {
    window.requestAnimationFrame(draw);
    let now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInterval) {
        return;
    }
    then = now - (elapsed % fpsInterval);

    // Drawing the background on canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#584c25";  // background color
    context.fillRect(0, 0, canvas.width, canvas.height);
    // drawing out background using tileset
    for (let r = 0; r < 40; r += 1) {
        for (let c = 0; c < 70; c += 1) {
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

    // drawing fireboy
    context.drawImage(fireboyImage,
        fireboy.frameX * fireboy.width, fireboy.frameY * fireboy.height, fireboy.width, fireboy.height,
        fireboy.x, fireboy.y, fireboy.width, fireboy.height);
    if (fb_moveUp || fireboy.in_air) {      // handling the number of frames
        fireboy.frameX = (fireboy.frameX + 1) % 6;
    } else if (!(fb_moveLeft && fb_moveRight) || fb_moveLeft || fb_moveRight) {
        fireboy.frameX = (fireboy.frameX + 1) % 4;
    }

    // drawing watergirl
    context.drawImage(watergirlImage,
        watergirl.frameX * watergirl.width, watergirl.frameY * watergirl.height, watergirl.width, watergirl.height,
        watergirl.x, watergirl.y, watergirl.width, watergirl.height);
    if (wg_moveUp || watergirl.in_air) {      // handling the number of frames
        watergirl.frameX = (watergirl.frameX + 1) % 6;
    } else if (!(wg_moveLeft && wg_moveRight) || wg_moveLeft || wg_moveRight) {
        watergirl.frameX = (watergirl.frameX + 1) % 4;
    }

    // drawing objects

    
    // collisions
    // Reached solid ground

    // fireboy

    for (let tile in tiles) {
        if (vertical_collision(fireboy, tile)) {
            // fireboy.y = tile.y;
            fireboy.yChange = 0;
            console.log("hi");
            break;
        }
        if (horizontal_collision(fireboy, tile)) {
            // fireboy.x = tile.x;
            fireboy.xChange = 0;
            console.log("sup");
            break;
        }
    }


    // for (let tile in tiles) {
    //     if (collides(fireboy, tile)) {
    //         // while (collides(fireboy, tile)) {
    //         //     tile.x -= Math.sign(fireboy.xChange)
    //         // }
    //         // fireboy.x = tile.x;
    //         // fireboy.xChange = 0;
    //         // break;
    //         console.log("sup");
    //     }
    // }

    // for (let tile in tiles) {
    //     if (collides(fireboy, tile)) {
    //         // while (collides(fireboy, tile)) {
    //         //     tile.y -= Math.sign(fireboy.yChange)
    //         // }
    //         // fireboy.y = tile.y;
    //         // fireboy.yChange = 0;
    //         // fireboy.in_air = false;
    //         // break;
    //         console.log("hi");
    //     }
    // }

    // if (fireboy.y + fireboy.height > floor) {
    //     fireboy.in_air = false;
    //     fireboy.y = floor - fireboy.height;
    //     fireboy.yChange = 0;
    // } else if ((fireboy.y + fireboy.height > canvas.height - (16 * 5) + 4) && (fireboy.x + fireboy.width > canvas.width - (16 * 8) + 4)) {
    //     fireboy.in_air = false;
    //     fireboy.y = canvas.height - (16 * 5) + 4 - fireboy.height;
    //     fireboy.yChange = 0;
    // }

    // watergirl
    if (watergirl.y + watergirl.height > floor) {
        watergirl.in_air = false;
        watergirl.y = floor - watergirl.height;
        watergirl.yChange = 0;
    }

    // handling key presses
    // fireboy
    if (fb_moveUp || fireboy.in_air) {
        if (!fireboy.in_air) {      // checking if he's in the air already
            fireboy.yChange = fireboy.yChange - 16;
            fireboy.in_air = true;
        }
        if (!(fb_moveLeft || fb_moveRight)) {       // checking if he's jumping up
            fireboy.frameY = 5;
        } else if (fb_moveLeft) {       // checking if he's jumping to the left
            fireboy.frameY = 4;
            fireboy.xChange = fireboy.xChange - 0.5;
        } else if (fb_moveRight) {      // checking if he's jumping to the right
            fireboy.frameY = 3;
            fireboy.xChange = fireboy.xChange + 0.5;
        }
    } else if (!(fb_moveLeft || fb_moveRight || fb_moveUp || fireboy.in_air)) {     // checking to see if he's standing still
        fireboy.frameY = 0;
    } else if (fb_moveLeft) {
        fireboy.frameY = 2;
        fireboy.xChange = fireboy.xChange - 0.5;
    } else if (fb_moveRight) {
        fireboy.frameY = 1;
        fireboy.xChange = fireboy.xChange + 0.5;
    }

    // watergirl
    if (wg_moveUp || watergirl.in_air) {
        if (!watergirl.in_air) {      // checking if she's in the air already
            watergirl.yChange = watergirl.yChange - 16;
            watergirl.in_air = true;
        }
        if (!(wg_moveLeft || wg_moveRight)) {       // checking if she's jumping up
            watergirl.frameY = 5;
        } else if (wg_moveLeft) {       // checking if she's jumping to the left
            watergirl.frameY = 4;
            watergirl.xChange = watergirl.xChange - 0.5;
        } else if (wg_moveRight) {      // checking if she's jumping to the right
            watergirl.frameY = 3;
            watergirl.xChange = watergirl.xChange + 0.5;
        }
    } else if (!(wg_moveLeft || wg_moveRight || wg_moveUp || watergirl.in_air)) {     // checking to see if she's standing still
        watergirl.frameY = 0;
    } else if (wg_moveLeft) {       // checking to see if she's moving to the left
        watergirl.frameY = 2;
        watergirl.xChange = watergirl.xChange - 0.5;
    } else if (wg_moveRight) {      // checking to see if she's moving to the right
        watergirl.frameY = 1;
        watergirl.xChange = watergirl.xChange + 0.5;
    }


    // Stopping going off left or right
    if (fireboy.x < 12) {
        fireboy.x = 12;
    } else if ((fireboy.x + fireboy.width > canvas.width )) {
        fireboy.x = canvas.width - fireboy.width;
    }
    if ((fireboy.x + fireboy.width > canvas.width - (16 * 8) + 4) && (fireboy.y + fireboy.height > canvas.height - (16 * 5) + 4)) {
        fireboy.x = canvas.width - fireboy.width - (16 * 8) + 4;
    }
    
    if (watergirl.x < 0) {
        watergirl.x = 0;
    } else if (watergirl.x + watergirl.width > canvas.width) {
        watergirl.x = canvas.width - watergirl.width;
    }

    // Updating the players
    if (fb_moveLeft || fb_moveRight || fb_moveUp || fireboy.in_air) {
        fireboy.x = fireboy.x + fireboy.xChange;
        fireboy.y = fireboy.y + fireboy.yChange;
    } else {
            fireboy.xChange = 0;
            fireboy.yChange = 0;
    }
    if (wg_moveLeft || wg_moveRight || wg_moveUp || watergirl.in_air) {
        watergirl.x = watergirl.x + watergirl.xChange;
        watergirl.y = watergirl.y + watergirl.yChange;
    } else {
            watergirl.xChange = 0;
            watergirl.yChange = 0;
    }
    
    // Physics
    
    fireboy.yChange = fireboy.yChange + 1.5;  // gravity
    fireboy.xChange = fireboy.xChange * 0.9;  // friction
    fireboy.yChange = fireboy.yChange * 0.9;  // friction
    watergirl.yChange = watergirl.yChange + 1.5;  // gravity
    watergirl.xChange = watergirl.xChange * 0.9;  // friction
    watergirl.yChange = watergirl.yChange * 0.9;  // friction
}

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

    // let tiles = [];
    // for (let i = 0; i < background.length; i++) {
    //     for (let j = 0; j < i.length; j++) {
    //         if (background[i][j] >= 0) {
    //             let tile = {
    //                 x: i * 16,
    //                 y: j * 16,
    //                 size: 16
    //             }
    //             tiles.push(tile);
    //         }
    //     }
    // }
    // console.log(tiles);
}

function collides(obj1, obj2) {
    if (obj1.x + obj1.width < obj2.x ||
        obj2.x + obj2.size < obj1.x ||
        obj1.y > obj2.y + obj2.size ||
        obj2.y > obj1.y + obj1.height) {
        return false;
    } else {
        return true;
    }
}


// function horizontal_collision(player, obj) {
//     if (player.x + player.width == obj.x ||
//         player.x == obj.x + obj.size) {
//         return true;
//     } else {
//         return false;
//     }
// }

// function vertical_collision(player, obj) {
//     if (player.y == obj.y + obj.size ||
//         player.y + player.height == obj.y) {
//         return true;
//     } else {
//         return false;
//     }
// }



function horizontal_collision(player, obj) {
    if (player.x + player.width <= obj.x &&
        player.x >= obj.x + obj.size) {
        return false;
    } else {
        return true;
    }
}

function vertical_collision(player, obj) {
    if (player.y >= obj.y + obj.size &&
        player.y + player.height <= obj.y) {
        return false;
    } else {
        return true;
    }
}

function stop(outcome_txt) {
    window.removeEventListener("keydown", activate, false);
    window.removeEventListener("keyup", deactivate, false);
    window.cancelAnimationFrame(request_id);
    let outcome_element = document.querySelector("#outcome");
    outcome_element.innerHTML = outcome_txt;
}