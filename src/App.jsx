import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import NotFound404 from './pages/NotFound404';


const App = () => {
  return (
  
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound404 />} />
        </Route>
      </Routes>
  
  );
};

export default App;