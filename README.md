# nearest-point-inside-triangle

> Returns the point if it is inside a triangle or the nearest point if it is outside the triangle

## Install

This module requires node >=4.0.0

```
npm install --save nearest-point-inside-triangle
```

## Usage

```js
let nearestInside = require('nearest-point-inside-triangle')(triangle, point);
```

## Example

```js
let nearestInside = require('nearest-point-inside-triangle')(
    [
        [0, 0],// A
        [1, 0],// B
        [0, 1] // C
    ],
    [0.75, 0.75] //point
);

// nearestInside = [0.5, 0.5]
```

```js
//partial application
let nearestInside = require('nearest-point-inside-triangle')(
    [
        [0, 0],// A
        [1, 0],// B
        [0, 1] // C
    ]
);

let insideA = nearestInside([0.25, 0.25]);
// insideA = [0.25, 0.25]

let insideB = nearestInside([0.75, 0.75]);
// insideB = [0.5, 0.5]
```
