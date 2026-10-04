import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

function BackToTop() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!showTopBtn) return null;

  return (
    <button className="back-to-top" onClick={scrollToTop}>
      <ArrowUp size={24} />
    </button>
  );
}

export default BackToTop;
