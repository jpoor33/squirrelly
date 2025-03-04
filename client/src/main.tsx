import ReactDOM from 'react-dom/client';
import App from './App';
import Home from './pages/Home';
import Error from './pages/Error';
import Profile from './pages/SquirrelProfile';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignIn from './pages/SignIn';

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
        path: '/squirrelprofile/:squirrelUUID',
        element: <Profile />
      },
      {
        path: '/signin',
        element: <SignIn />
      }

    ]
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
