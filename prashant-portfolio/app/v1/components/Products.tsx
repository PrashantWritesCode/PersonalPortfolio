"use client";
import { motion } from "framer-motion";
import { products } from "../data";

type Product = {
  name: string;
  tagline: string;
  description: string;
  features: string[];
  stack: string[];
  status: string;
  users?: string;
  link?: string;
  privacy?: string;
};

function ProductCard({ product }: { product: Product }) {
  const statusConfig = {
    live: { label: "Live", color: "bg-green-500/10 text-green-400 border-green-500/30" },
    development: { label: "In Development", color: "bg-blue-500/10 text-blue-400 border-blue-500/30" },
    prototype: { label: "Prototype", color: "bg-amber-500/10 text-amber-400 border-amber-500/30" },
  };

  const status = statusConfig[product.status as keyof typeof statusConfig];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.005 }}
      className="group relative bg-deep-surface border border-deep-border rounded-2xl p-8 overflow-hidden transition-colors duration-300 hover:border-amber-dim"
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-muted/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-neutral-100 mb-2">
              {product.name}
            </h3>
            <p className="text-amber-muted text-sm italic">{product.tagline}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${status.color}`}>
            {status.label}
          </span>
        </div>

        {/* Description */}
        <p className="text-neutral-300 mb-6 leading-relaxed">
          {product.description}
        </p>

        {/* Features */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-neutral-200 mb-3">Key Features</h4>
          <ul className="space-y-2">
            {product.features.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="text-neutral-400 text-sm flex items-start"
              >
                <span className="text-amber-muted mr-2">•</span>
                {feature}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {product.stack.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              className="px-3 py-1 bg-deep-bg border border-amber-dim rounded-full text-sm text-amber-muted"
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Footer Info */}
        <div className="flex items-center gap-4 text-sm">
          {product.users && (
            <span className="text-neutral-400">{product.users}</span>
          )}
          {product.privacy && (
            <span className="text-green-400">{product.privacy}</span>
          )}
          {product.link && (
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-muted hover:text-amber-glow transition-colors font-medium ml-auto"
            >
              View Extension ↗
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Products() {
  return (
    <section id="products" className="min-h-screen py-24 md:py-32 bg-deep-bg text-neutral-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-4">
            Products — Systems I Built
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Self-initiated projects demonstrating end-to-end system design
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
