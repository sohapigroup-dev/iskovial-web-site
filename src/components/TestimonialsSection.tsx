import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Ahmed B.", role: "Acheteur", text: "Service exceptionnel ! J'ai trouvé ma villa de rêve en moins de 2 semaines. L'équipe a été très professionnelle du début à la fin." },
  { name: "Fatima Z.", role: "Vendeuse", text: "Ils ont vendu mon appartement au meilleur prix du marché. Je recommande ImmoElite à tous ceux qui cherchent un service immobilier de qualité." },
  { name: "Karim M.", role: "Constructeur", text: "Le service construction clé en main est remarquable. Mon projet a été livré dans les délais avec une qualité irréprochable." },
];

const TestimonialsSection = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="text-sm font-medium text-accent uppercase tracking-wider">Témoignages</span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
          Ce que disent nos clients
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card p-6 rounded-xl shadow-card"
          >
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.text}"</p>
            <div>
              <div className="font-heading font-semibold text-card-foreground">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.role}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
