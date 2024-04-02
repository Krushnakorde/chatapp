import { Register } from "./pages/register";
import { Login } from "./pages/login";
import Home from "./pages/Home";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import "./style.scss"

import { BrowserRouter, Routes, Route, Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"

function App() {

  const { currentUser } = useContext(AuthContext)
  console.log(currentUser)

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }

    return children;
  }

  const routes = createBrowserRouter([
    {path:"/", 
    
    children:[
      {
        index:true, 
        element:<ProtectedRoute> <Home/> </ProtectedRoute>
      },
      {
        path:'/login', 
        element:<Login/>,
      },
      {
        path:'/register',
        element:<Register/>
      }
    ]
    
  },
   
  ])

  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route path='/'>

            <Route index element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

          </Route>
        </Routes>
      </BrowserRouter> */}

    
        <RouterProvider router={routes}/>
      

    </>
  );
}

export default App;
