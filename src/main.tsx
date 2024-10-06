import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root.tsx'
import Stats from './routes/stats.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "stats",
    element: <Stats />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
