import { motion } from "framer-motion";

const stats = [
  { value: "500+", label: "Biens vendus" },
  { value: "1200+", label: "Clients satisfaits" },
  { value: "12", label: "Années d'expérience" },
  { value: "50+", label: "Projets construction" },
];

const StatsSection = () => (
  <section className="py-16 bg-hero-gradient">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-1">
              {s.value}
            </div>
            <div className="text-sm text-primary-foreground/70">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
