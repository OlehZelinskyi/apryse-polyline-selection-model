import { useCallback } from "react";
import { getDistanceToPath } from "../utils/getDistanceToPath";

const MINIMAL_DISTANCE_TO_POLYLINE = 3;

const checkIfCursorClickIsNearThePath = (pathPoints, cursorPoint) => {
  const paths = pathPoints.reduce(
    (lines, nextPathPoint, currentIndex, array) => {
      if (typeof array[currentIndex + 1] !== "undefined") {
        lines.push([nextPathPoint, array[currentIndex + 1]]);
      }

      return lines;
    },
    []
  );

  return paths.some((path) => {
    const distanceToPath = getDistanceToPath(path, cursorPoint);

    return distanceToPath < MINIMAL_DISTANCE_TO_POLYLINE;
  });
};

const useCreateCustomPolylineSelectionModel = () => {
  const handler = useCallback((instance) => {
    const Annotations = instance.Core.Annotations;
    const Math = instance.Core.Math;

    class PolylineSelectionModel extends Annotations.SelectionModel {
      constructor(annotation, canModify) {
        super(annotation, canModify);

        if (canModify) {
          const controlHandles = this.getControlHandles();

          const pathPoints = annotation
            .getPath()
            .map((el) => [el.getX(), el.getY()]);

          pathPoints.forEach((pathPoint, index) => {
            controlHandles.push(
              new Annotations.PathControlHandle(
                pathPoint[0],
                pathPoint[1],
                10,
                10,
                index
              )
            );
          });
        }
      }

      // test selection

      testSelection(annotation, x, y) {
        const cursor = new Math.Rect(x, y, x, y);

        const pathPoints = annotation
          .getPath()
          .map((el) => [el.getX(), el.getY()]);

        const res = checkIfCursorClickIsNearThePath(pathPoints, [
          cursor.x1,
          cursor.y1,
        ]);

        return res;
      }

      drawSelectionOutline(ctx, annotation, zoom) {
        ctx.lineWidth = 3;

        if (typeof zoom !== "undefined" && zoom > 1) {
          ctx.lineWidth =
            Annotations.SelectionModel.selectionOutlineThickness / (zoom / 4);
        } else {
          ctx.lineWidth = Annotations.SelectionModel.selectionOutlineThickness;
        }

        const pathPoints = annotation
          .getPath()
          .map((el) => [el.getX(), el.getY()]);

        ctx.beginPath();
        ctx.moveTo(pathPoints[0][0], pathPoints[0][1]);
        pathPoints.slice(1).forEach(([x, y]) => {
          ctx.lineTo(x, y);
        });

        ctx.stroke();
      }
    }

    return PolylineSelectionModel;
  }, []);

  return handler;
};

export default useCreateCustomPolylineSelectionModel;
