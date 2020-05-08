import { renderRoutes } from "react-router-config";
import { BrowserRouter } from "react-router-dom";
const routes = [
    {
      component: Root,
      routes: [
        {
          path: "/",
          exact: true,
          component: Home
        },
        {
          path: "/child/:id",
          component: Child,
          routes: [
            {
              path: "/child/:id/grand-child",
              component: GrandChild
            }
          ]
        }
      ]
    }
  ];


  const router = <BrowserRouter>
  {/* kick it all off with the root route */}
  {renderRoutes(routes)}
</BrowserRouter>