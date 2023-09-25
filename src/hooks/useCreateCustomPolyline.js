import { useCallback } from "react";

const useCreateCustomPolyline = () => {
  const handler = useCallback((instance) => {
    const Annotations = instance.Core.Annotations;

    const MyPolyAnnot = Annotations.CustomAnnotation.createFromClass(
      "mypoly",
      Annotations.PolylineAnnotation
    );

    Annotations.setCustomDrawHandler(
      MyPolyAnnot,
      function (ctx, pageMatrix, rotation, options) {
        options.originalDraw(ctx, pageMatrix, rotation);
        ctx.save();
        ctx.strokeStyle = "#22ccaa";
        ctx.restore();
      }
    );

    class MyPolylineAnnotation extends MyPolyAnnot {
      // custom property
      get CustomID() {
        // attempt to get a customId value from the map
        return this.getCustomData("customId");
      }
      set CustomID(id) {
        // set a customId value from the map
        this.setCustomData("customId", id);
      }
    }

    return MyPolylineAnnotation;
  }, []);

  return handler;
};

export default useCreateCustomPolyline;
