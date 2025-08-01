import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleNavigation = (href: string) => {
    switch (href) {
      case "about":
      case "quality":
      case "services":
      case "activities":
      case "safety":
      case "sustainability":
      case "corporate-governance":
      case "contact":
      case "faq":
        navigate(`/${href}`);
        setTimeout(() => window.scrollTo(0, 0), 100);
        break;
      default:
        navigate("/");
        setTimeout(() => {
          if (href && document.getElementById(href)) {
            document
              .getElementById(href)
              ?.scrollIntoView({ behavior: "smooth" });
          } else {
            window.scrollTo(0, 0);
          }
        }, 100);
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate("/");
    setTimeout(() => window.scrollTo(0, 0), 100);
  };

  const navItems = [
    { key: "nav.about", href: "about" },
    { key: "nav.quality", href: "quality" },
    { key: "nav.sustainability", href: "sustainability" },
    { key: "nav.corporateGovernance", href: "corporate-governance" },
    { key: "nav.contact", href: "contact" },
    { key: "nav.faq", href: "faq" },
  ];

  const aboutDropdownItems = [
    { key: "nav.activities", href: "activities" },
    { key: "nav.services", href: "services" },
    { key: "nav.safety", href: "safety" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isScrolled ? "bg-emdad-navy shadow-lg" : "bg-transparent"
      } ${showHeader ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo + EMDAD Text */}
          <div
            className="flex items-center cursor-pointer space-x-2"
            onClick={handleLogoClick}
          >
            <img
              src="/img/emdadlogo.png"
              alt="EMDAD Direct Logistics"
              className="h-12 w-auto object-contain"
            />
            <span
              className="text-2xl font-semibold text-emdad-gold italic tracking-wide hidden sm:inline"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Emdad
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* About Dropdown */}
            <div className="relative group">
              <button
                onClick={() => handleNavigation("about")}
                className="text-white hover:text-emdad-gold transition-colors duration-200 flex items-center"
              >
                {t("nav.about")}
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {aboutDropdownItems.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => handleNavigation(item.href)}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-emdad-gold transition-colors duration-200"
                    >
                      {t(item.key)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Other Navigation Items */}
            {navItems.slice(1).map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavigation(item.href)}
                className="text-white hover:text-emdad-gold transition-colors duration-200"
              >
                {t(item.key)}
              </button>
            ))}
          </nav>

          {/* Right side - Language toggle and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="text-white hover:text-emdad-gold transition-colors duration-200 font-medium"
            >
              {language === "en" ? "العربية" : "English"}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white hover:text-emdad-gold transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-gray-700">
            <div className="flex flex-col space-y-4 pt-4">
              {/* About with submenu for mobile */}
              <button
                onClick={() => handleNavigation("about")}
                className="text-white hover:text-emdad-gold transition-colors duration-200 text-left"
              >
                {t("nav.about")}
              </button>
              <div className="pl-4 space-y-2">
                {aboutDropdownItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => handleNavigation(item.href)}
                    className="text-white hover:text-emdad-gold transition-colors duration-200 text-left block"
                  >
                    {t(item.key)}
                  </button>
                ))}
              </div>

              {/* Other navigation items */}
              {navItems.slice(1).map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavigation(item.href)}
                  className="text-white hover:text-emdad-gold transition-colors duration-200 text-left"
                >
                  {t(item.key)}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
