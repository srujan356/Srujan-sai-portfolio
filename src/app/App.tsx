import { useEffect, useState } from "react";
import { Nav, type Page } from "./components/nav";
import { Home } from "./components/home";
import { CaseStudy } from "./components/case-study";
import { About } from "./components/about";
import { Contact } from "./components/contact";
import { PageTransition, ScrollProgressBar } from "./components/motion-bits";
import { SideSocialRail } from "./components/social-rail";
import { CustomCursorTest } from "./components/custom-cursor-test";

export default function App() {
  const [page, setPage] = useState<Page>("home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [page]);

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: "#F7F7FB",
        color: "#0D0D14",
      }}
    >
      <CustomCursorTest />

      <ScrollProgressBar />

      <Nav page={page} setPage={setPage} />

      <SideSocialRail />

      <PageTransition pageKey={page}>
        {page === "home" && <Home setPage={setPage} />}
        {page === "case" && <CaseStudy setPage={setPage} />}
        {page === "about" && <About setPage={setPage} />}
        {page === "contact" && <Contact />}
      </PageTransition>
    </div>
  );
}