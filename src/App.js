import { Route, Routes } from 'react-router-dom';
import { Home, Login, Register } from './pages';
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (user?.name) {
      const timer = setTimeout(() => {
        setUser({});
      }, 480000);

      return () => clearTimeout(timer);
    }
  }, [user]);

  return (
    <Routes>
      <Route path='/login' element={<Login user={user} setUser={setUser} />} />
      <Route path='/register' element={<Register user={user} />} />
      <Route path='/' element={<Home user={user} setUser={setUser} />} />
    </Routes>
  );
}

export default App;

// Password should have all the needed criteria.
// Login time out.
