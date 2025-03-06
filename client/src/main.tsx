import ReactDOM from 'react-dom/client';
import App from './App';
import Home from './pages/Home';
import Error from './pages/Error';
import Profile from './pages/SquirrelProfile';
import User from './pages/UserPage';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import About from './pages/AboutUs';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/squirrelprofile/:id',
        element: <Profile />
      },
      {
        path: '/login',
        element: <LogIn />
      },
      { 
        path: '/signup', 
        element: <SignUp />
       },
       { 
        path: '/about', 
        element: <About />
       },
      {
        path: '/user',
        element:  <User />
      }
    ]
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}