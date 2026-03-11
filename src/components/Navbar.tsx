import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Building2, MapPin, Hammer, Package, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo-iskovial.png";

const navLinks = [
  { to: "/", label: "Accueil", icon: Home },
  { to: "/proprietes", label: "Propriétés", icon: Building2 },
  { to: "/terrains", label: "Terrains", icon: MapPin },
  { to: "/construction", label: "Construction", icon: Hammer },
  { to: "/materiaux", label: "Matériaux", icon: Package },
  { to: "/contact", label: "Contact", icon: Phone },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="ISKOVIAL GROUP" className="h-10 w-auto rounded-lg" />
          <span className="font-heading font-bold text-xl text-foreground">
            ISKOVIAL <span className="text-gradient-gold">GROUP</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === l.to
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/contact">Estimation gratuite</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/contact">Nous contacter</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-card"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    pathname === l.to
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <l.icon className="w-4 h-4" />
                  {l.label}
                </Link>
              ))}
              <div className="pt-2 flex flex-col gap-2">
                <Button size="sm" asChild className="w-full">
                  <Link to="/contact" onClick={() => setOpen(false)}>Nous contacter</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
