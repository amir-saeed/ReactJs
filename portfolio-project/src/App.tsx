import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";

const App = () => {
  return (
    <>
      <div className="container">
        <Header />
        <div className="flex flex-col min-h-screen">
          <Hero />
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default App;
