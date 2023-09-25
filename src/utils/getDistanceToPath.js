import { getDistance } from "./getDistance";

// https://stackoverflow.com/questions/6865832/detecting-if-a-point-is-of-a-line-segment
export function getDistanceToPath(path, cursorPoint) {
  // C - is actual path
  // A - is distance from x0,y0 to cursor point
  // B - is distance from xEnd, yEnd to cursor point
  const C = getDistance(path[0][0], path[0][1], path[1][0], path[1][1]);
  const A = getDistance(path[0][0], path[0][1], cursorPoint[0], cursorPoint[1]);
  const B = getDistance(path[1][0], path[1][1], cursorPoint[0], cursorPoint[1]);

  //   S - semiperiment

  let distanceToPath;

  if (B ** 2 > A ** 2 + C ** 2) distanceToPath = A;
  else if (A ** 2 > B ** 2 + C ** 2) distanceToPath = B;
  else {
    const S = (A + B + C) / 2;
    // The area of the triangle is C*H/2
    // The area of the triangle is also sqrt(s*(s-A)*(s-B)*(s-C))

    // H is triangle height
    const H = (2 / C) * Math.sqrt(S * (S - A) * (S - B) * (S - C));
    distanceToPath = H;
  }

  return distanceToPath;
}
