
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Content from './layout/content';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Content />
      </BrowserRouter>
    </div>
  );
}

export default App;
