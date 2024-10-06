import { lazy, Suspense } from "react";
import { WEBAPP } from "./app/config/config";
import SplashScreen from "./app/components/others/SplashScreen";
import { ColorProvider } from "./app/contexts/ColorContext";
import { setTitle } from "./app/utils/common";
import useProject from "./app/hooks/useProject";

const Router = lazy(() => import("./app/routes/Router"));

function App() {
  const { currentProject } = useProject();
  setTitle(currentProject?.name || WEBAPP.NAME);

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
