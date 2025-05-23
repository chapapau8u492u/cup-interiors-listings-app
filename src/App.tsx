
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Index />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
