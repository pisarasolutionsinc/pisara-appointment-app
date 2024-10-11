import { lazy, Suspense, useEffect } from "react";
import { WEBAPP } from "./app/config/config";
import SplashScreen from "./app/components/others/SplashScreen";
import { ColorProvider } from "./app/contexts/ColorContext";
import { setTitle } from "./app/utils/common";
import useProject from "./app/hooks/useProject";

const Router = lazy(() => import("./app/routes/Router"));

function App() {
  const { currentProject } = useProject();

  useEffect(() => {
    setTitle(currentProject?.name || WEBAPP.NAME);
  }, [currentProject]);

  return (
    <>
      <Suspense fallback={<SplashScreen />}>
        <ColorProvider>
          <Router />
        </ColorProvider>
      </Suspense>
    </>
  );
}

export default App;
