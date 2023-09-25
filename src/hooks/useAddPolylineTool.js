import { useCallback } from "react";

const useAddPolylineToolToPanel = () => {
  const handler = useCallback((instance, tool) => {
    instance.UI.registerTool({
      toolName: "AnnotationCreateCustomPolyline",
      toolObject: tool,
      tooltip: "Custom Polyline",
      buttonName: "CustomPolyline",
      buttonImage: `<svg width="16" height="20" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="48" height="58" stroke="#A6A6A6" strokeWidth="2" fill="#f1f3f5"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M16.9 26H32.1C33.145 26 34 25.145 34 24.1V8.9C34 7.855 33.145 7 32.1 7H16.9C15.855 7 15 7.855 15 8.9V24.1C15 25.145 15.855 26 16.9 26ZM17.565 22.8333V10.1667C17.565 9.81834 17.85 9.53334 18.1983 9.53334H30.8333C31.1817 9.53334 31.4667 9.81834 31.4667 10.1667V22.8333C31.4667 23.1817 31.1817 23.4667 30.8333 23.4667H18.1983C17.85 23.4667 17.565 23.1817 17.565 22.8333Z" fill="#A6A6A6"/>
            <path d="M20.13 20.2683V12.7317C20.13 12.3833 20.415 12.0983 20.7633 12.0983H22.03C22.3783 12.0983 22.6633 12.3833 22.6633 12.7317V20.2683C22.6633 20.6167 22.3783 20.9017 22.03 20.9017H20.7633C20.415 20.9017 20.13 20.6167 20.13 20.2683Z" fill="#A6A6A6"/>
            <path d="M11.1009 49V34.4545H14.6165V40.2926H20.348V34.4545H23.8565V49H20.348V43.1548H14.6165V49H11.1009ZM26.0618 49V34.4545H32.0703C33.1593 34.4545 34.0992 34.651 34.8899 35.044C35.6854 35.4323 36.2985 35.991 36.7294 36.7202C37.1603 37.4446 37.3757 38.304 37.3757 39.2983C37.3757 40.3068 37.1555 41.1638 36.7152 41.8693C36.2749 42.5701 35.6499 43.1051 34.8402 43.4744C34.0305 43.839 33.0717 44.0213 31.9638 44.0213H28.1641V41.2514H31.3104C31.8407 41.2514 32.2834 41.1828 32.6385 41.0455C32.9983 40.9034 33.2706 40.6903 33.4553 40.4062C33.6399 40.1174 33.7322 39.7481 33.7322 39.2983C33.7322 38.8485 33.6399 38.4768 33.4553 38.1832C33.2706 37.8849 32.9983 37.6624 32.6385 37.5156C32.2786 37.3641 31.8359 37.2884 31.3104 37.2884H29.5774V49H26.0618ZM34.2507 42.3523L37.8729 49H34.0376L30.4865 42.3523H34.2507Z" fill="#A6A6A6"/>
            </svg>
    `,
    });

    instance.UI.setHeaderItems((header) => {
      header
        .getHeader("toolbarGroup-Shapes")
        .get("polygonToolGroupButton")
        .insertBefore({
          type: "toolButton",
          toolName: "AnnotationCreateCustomPolyline",
        });
    });
  }, []);

  return handler;
};

export default useAddPolylineToolToPanel;
