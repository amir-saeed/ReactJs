import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";

const App = () => {
  return (
    <>
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="flex flex-col">
          <Hero />
          <div className="flex w-full flex-col">
            <div className="divider"></div>
          </div>
          <Experience />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
