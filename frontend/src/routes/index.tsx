import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
  } from "react-router-dom";
import FindProvider from "../screens/FindProvider/FindProvider";
import CreateProvider from "../screens/CreateProvider/CreateProvider";

const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<FindProvider />} />
        <Route path="/create-provider" element={<CreateProvider />} />
      </>
    )
);

export default router;