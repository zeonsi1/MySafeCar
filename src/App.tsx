import Home from './pages/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './component/register';
const router = createBrowserRouter([
  {path: '/', element: <Home/>},
  {path: '/register', element: <Register/>},
  {path: '*', element: <h1>404</h1>},
]);

function App() {

  return (
    <>
      <RouterProvider  router={router}/>
    </>
  )
}

export default App
