export const clientWidth = (): number => document.body.clientWidth;

export const clientHeight = (): number => document.body.clientHeight;

/** Map position percentage from left top to canvas coordinate
 * @param leftPercentage 0-100
 * @param topPercentage 0-100
 * @return [xPixels, yPixels]
 */
export const coordinateLeftTop = (
  leftPercentage: number,
  topPercentage: number,
): [number, number] => [
  (clientWidth() * leftPercentage) / 100,
  (clientHeight() * topPercentage) / 100,
];

/** Map position percentage from center to canvas coordinate
 * @param xPercentage -100-100, from left to right
 * @param yPercentage -100-100, from bottom to top
 * @return [xPixels, yPixels]
 */
export const coordinateCenter = (
  xPercentage: number,
  yPercentage: number,
): [number, number] => [
  (clientWidth() * (100 + xPercentage)) / 200,
  (clientHeight() * (100 - yPercentage)) / 200,
];

/** Map position percentage from center to canvas coordinate in a square area
 * @param xPercentage -100-100, from left to right
 * @param yPercentage -100-100, from bottom to top
 * @return [xPixels, yPixels]
 */
export const coordinateCenterNormal = (
  xPercentage: number,
  yPercentage: number,
): [number, number] => {
  if (clientHeight() > clientWidth()) {
    return [
      (clientWidth() * (100 + xPercentage)) / 200,
      (clientWidth() * (100 - yPercentage)) / 200 +
        (clientHeight() - clientWidth()) / 2,
    ];
  }
  return [
    (clientHeight() * (100 + xPercentage)) / 200 +
      (clientWidth() - clientHeight()) / 2,
    (clientHeight() * (100 - yPercentage)) / 200,
  ];
};
