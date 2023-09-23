
import {BrowserRouter, Routes , Route } from 'react-router-dom';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage'
import {AuthProvider} from './context/AuthContext'
import TasksPage from './pages/Tasks.Page';
import TaskFormPage from './pages/TaskFormPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';

import ProtectedRoute from './ProtectedRoute'
function App(){
  return(
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path= '/' element= {<HomePage/>} />
        <Route path= '/login' element= {<LoginPage/>} />
        <Route path= '/register' element= {<RegisterPage/>} />


       
        <Route element={<ProtectedRoute/>} >
          <Route path= '/tasks' element= {<TasksPage/>} />
          <Route path= '/add-task' element= {<TaskFormPage/>} />
          <Route path= '/tasks/:id' element= {<h1>Update Task</h1>} />
          <Route path= '/profile' element= {<ProfilePage/>} />
        </Route>

          
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    
  )
}



export default App;