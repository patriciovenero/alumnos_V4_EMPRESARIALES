import Index from './pages/Index';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import Parentesco from './pages/apoderados/Parentesco';
import Prueba from './pages/Prueba';

import Alumno from './pages/alumnos/Alumno.jsx';
import AlumnoHorario from './pages/alumnos/AlumnoHorario.jsx';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/parentesco" element={<Parentesco/>}/>
        <Route path='/prueba' element={<Prueba/>}/>

        <Route path="/alumno" element={<Alumno/>}/>
        <Route path="/horario" element={<AlumnoHorario/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;