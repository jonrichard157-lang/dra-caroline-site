import { Header } from "./sections/Header/Header";
import { Hero } from "./sections/Hero/Hero";
import { TrustHighlights } from "./sections/TrustHighlights/TrustHighlights";
import { About } from "./sections/About/About";
import { Treatments } from "./sections/Treatments/Treatments";
import { Differentials } from "./sections/Differentials/Differentials";
import { HowItWorks } from "./sections/HowItWorks/HowItWorks";
import { Testimonials } from "./sections/Testimonials/Testimonials";
import { FAQ } from "./sections/FAQ/FAQ";
import { Location } from "./sections/Location/Location";
import { Contact } from "./sections/Contact/Contact";
import { Footer } from "./sections/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <TrustHighlights />
        <About />
        <Treatments />
        <Differentials />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <Location />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
