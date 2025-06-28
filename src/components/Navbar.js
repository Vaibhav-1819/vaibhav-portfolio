import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";

function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", id: "hero" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Certificates", id: "certificates" },
    { name: "Contact", id: "contact" },
  ];

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const accentColor = darkMode ? "text-mkbhdRed" : "text-lightAccent";
  const hoverAccent = darkMode ? "hover:text-mkbhdRed" : "hover:text-lightAccent";

  return (
    <nav className={`fixed w-full z-50 px-6 py-4 shadow-md ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className={`text-xl font-bold ${accentColor}`}>Vaibhav Bharathula</h1>

        {/* 🌐 Desktop Menu */}
        <div className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`transition ${hoverAccent}`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* 🌙 Theme + Menu Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className={`${hoverAccent} transition`}
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* 📱 Mobile Dropdown */}
      {menuOpen && (
        <div className={`md:hidden mt-2 rounded-lg p-4 ${darkMode ? "bg-zinc-800" : "bg-slate-200"}`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left py-2 px-4 rounded ${darkMode ? "hover:bg-zinc-700" : "hover:bg-slate-300"}`}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
