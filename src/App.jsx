import Portfolio from './components/Portfolio';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FrontEndInfo from "./pages/FrontEndInfo";
import FullStackInfo from "./pages/FullStackInfo";
import UiUXInfo from "./pages/UiUXInfo";
import WebDesignInfo from "./pages/WebDesignInfo";
import GraphicDesignInfo from "./pages/GraphicDesignInfo";
import Header from './components/Header';

function App() {
  return (
    <div className="dark:bg-[rgb(20,20,20)] bg-white flex items-center w-full min-h-screen">
      <Header/>
      <BrowserRouter basename="/portfolio-maryam">
        <Routes>
          <Route index path="/" element={<Portfolio />} />
          <Route path="/frontend" element={<FrontEndInfo />} />
          <Route path="/fullstack" element={<FullStackInfo />} />
          <Route path="/uiuxdesign" element={<UiUXInfo />} />
          <Route path="/webdesign" element={<WebDesignInfo />} />
          <Route path="/graphicdesign" element={<GraphicDesignInfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
