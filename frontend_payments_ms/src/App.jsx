import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import AppRoutes from './routes';
import './styles/index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
