import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import Detail from './pages/Detail';
import NotFound404 from './pages/NotFound404';
import Saved from './pages/Saved';

const App = () => {
  return (
  
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<Detail />} />
          <Route path="*" element={<NotFound404 />} />
          <Route path="/saved" element={<Saved />} />
        </Route>
      </Routes>
  
  );
};

export default App;