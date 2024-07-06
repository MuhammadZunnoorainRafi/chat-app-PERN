import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Navbar />
      <div className="bg-base-200">
        <main className="max-w-4xl mx-auto ">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
