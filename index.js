/*
 * nearest-point-inside-triangle
 * https://github.com/jsfi/nearest-point-inside-triangle
 *
 * Copyright (c) 2015 Martin Sachse
 * Licensed under the MIT license.
 */

'use strict';

const getSI = require('points-to-slope-intercept');
const getDistance = require('points-distance');

module.exports = function(triangle, point) {
    if (require('point-inside-triangle')(triangle, point)) {
        return point;
    }

    let A = triangle[0];
    let B = triangle[1];
    let C = triangle[2];

    //calculate lines from triangle (mx + n = y)
    let fAB = getSI(A, B);
    let fAC = getSI(A, C);
    let fBC = getSI(B, C);

    function nearest(point) {
        let xP = point[0];
        let yP = point[1];

        //calculate perpendicular lines from point
        let fpAB = getPerpendicularSI(xP, yP, fAB);
        let fpAC = getPerpendicularSI(xP, yP, fAC);
        let fpBC = getPerpendicularSI(xP, yP, fBC);

        //calculate intersection
        let pIntAB = getIntersection(fAB, fpAB);
        let pIntAC = getIntersection(fAC, fpAC);
        let pIntBC = getIntersection(fBC, fpBC);

        //move pInt between start- and endpoint
        pIntAB = moveBetween(pIntAB, A, B);
        pIntAC = moveBetween(pIntAC, A, C);
        pIntBC = moveBetween(pIntBC, B, C);

        //choose neareast pInt
        return nearestPoint(point, pIntAB, pIntAC, pIntBC);
    }

    if (!point) {
        return nearest;
    } else {
        return nearest(point);
    }
}

//mp = -1 / m
function getPerpendicularSI(x, y, f) {
    if ('y' in f) {
        return {
            m: 0,
            n: y
        };
    }

    if (f.m === 0) {
        return {
            y: y
        };
    }

    let m = -1 / f.m;

    return {
        m: m,
        n: y - (m * x)
    };
}

// x = (n2 - n1) / (m1 - m2)
function getIntersection(f, fp) {
    if (f.y) {
        return [ f.y, fp.n ];
    }

    let x = (fp.n - f.n) / (f.m - fp.m);

    return [ x, fp.m * x + fp.n ];
}

function moveBetween(p, start, end) {
    let distanceSE = getDistance(start, end);
    let distanceSP = getDistance(start, p);
    let distancePE = getDistance(p, end);

    if (Math.abs(distanceSE - distanceSP - distancePE) < Number.EPSILON) {
        return p;
    } else if (distanceSP <= distanceSE) {
        return start;
    } else {
        return end;
    }
}

/* with rest parameters:
function nearestPoint(p, ...points) {
*/
function nearestPoint() {
    let points = Array.prototype.slice.call(arguments);
    let p = points.shift();

    return points.map(point => [point, getDistance(p, point)]).reduce((p1, p2) => {
        return (p1[1] <= p2[1]) ? p1 : p2;
    })[0];
}
