import { useCallback } from "react";

const useCreatePolylineTool = () => {
  const handler = useCallback((instance) => {
    class PolylineTool extends instance.Core.Tools.PolylineCreateTool {
      constructor() {
        super(instance.Core.documentViewer);
      }
    }

    return PolylineTool;
  }, []);

  return handler;
};

export default useCreatePolylineTool;
