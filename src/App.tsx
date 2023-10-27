import { RouterProvider } from "react-router-dom";
import routes from "./router";

const App = () => {
  return (
      <RouterProvider router={routes}></RouterProvider>
  );
}

export default App;