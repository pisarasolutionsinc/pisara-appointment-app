import { lazy, Suspense } from "react";
import { WEBAPP } from "./app/config/config";
import SplashScreen from "./app/components/others/SplashScreen";
import { ColorProvider } from "./app/contexts/ColorContext";
import { setTitle } from "./app/utils/common";

const Router = lazy(() => import("./app/routes/Router"));

function App() {
  setTitle(WEBAPP.NAME);

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
