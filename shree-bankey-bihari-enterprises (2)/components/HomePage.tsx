import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Categories from "./Categories";
import ContactForm from "./ContactForm";
import Hero from "./Hero";
import USPs from "./USPs";

interface HomePageProps {
  onCategoryClick: (categoryId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onCategoryClick }) => {
  const location = useLocation();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const scrollTarget = location.state?.scrollTo || location.state?.scrollBack;

    if (scrollTarget) {
      setTimeout(() => {
        document
          .getElementById(scrollTarget)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);

      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <>
      <Hero onScrollTo={scrollToSection} />
      <USPs />

      <div id="categories">
        <Categories onCategorySelect={onCategoryClick} />
      </div>

      <section id="contact">
        <ContactForm />
      </section>
    </>
  );
};

export default HomePage;
