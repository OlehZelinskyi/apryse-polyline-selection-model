import WebViewer from "@pdftron/webviewer";
import { useEffect, useRef } from "react";
import useCreateCustomPolyline from "./hooks/useCreateCustomPolyline";
import useCreateCustomPolylineSelectionModel from "./hooks/useCreateCustomPolylineSelectionModel";
import useCreatePolylineTool from "./hooks/useCreatePolylineTool.js";
import useAddPolylineToolToPanel from "./hooks/useAddPolylineTool";

function App() {
  const viewer = useRef(null);
  const createCustomPolyline = useCreateCustomPolyline();
  const createCustomPolylineSelectionModel =
    useCreateCustomPolylineSelectionModel();
  const createPolylineTool = useCreatePolylineTool();
  const addPolylineTool = useAddPolylineToolToPanel();

  useEffect(() => {
    WebViewer(
      {
        path: "/",
        licenseKey:
          "demo:1686660258426:7d843e1f03000000001fcecc0718b7fb38aefc8eb4d133a32b1491d631",
        initialDoc:
          "https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf",
      },
      viewer.current
    ).then((instance) => {
      const { annotationManager } = instance.Core;

      const CustomPolylineAnnotation = createCustomPolyline(instance);
      const CustomPolylineSelectionModel =
        createCustomPolylineSelectionModel(instance);

      CustomPolylineAnnotation.prototype.selectionModel =
        CustomPolylineSelectionModel;

      instance.Core.Annotations.PolylineAnnotation.prototype.selectionModel =
        CustomPolylineSelectionModel;

      annotationManager.registerAnnotationType(
        CustomPolylineAnnotation.prototype.elementName,
        CustomPolylineAnnotation
      );

      const CustomPolylineToolConstructor = createPolylineTool(instance);

      const tool = new CustomPolylineToolConstructor(
        instance.Core.documentViewer
      );

      addPolylineTool(instance, tool);

      // you can now call WebViewer APIs here...
    });
  }, [
    createCustomPolyline,
    createCustomPolylineSelectionModel,
    createPolylineTool,
    addPolylineTool,
  ]);

  return (
    <div className="MyComponent">
      <div className="header">React sample</div>
      <div className="webviewer" ref={viewer} style={{ height: "100vh" }}></div>
    </div>
  );
}

export default App;
