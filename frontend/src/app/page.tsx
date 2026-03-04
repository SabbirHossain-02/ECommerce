"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import HeroCarousel from "@/components/HeroCarousel";

const PRODUCTS = [
  { id: 1, name: "Neural Weave Jacket", price: "$299", category: "Outerwear", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80" },
  { id: 2, name: "Kinetic Cargo Pants", price: "$180", category: "Bottoms", img: "https://images.unsplash.com/photo-1542272201-b1ca555f8505?w=500&q=80" },
  { id: 3, name: "Aero Mesh Sneakers", price: "$220", category: "Footwear", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80" },
  { id: 4, name: "Void Beanie", price: "$45", category: "Accessories", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80" }
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroCarousel />

      {/* Product Highlight / Scrolling Section */}
      <section className="px-6 lg:px-24 py-16">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">New Arrivals</h2>
            <p className="text-muted-foreground">The latest advancements in technical weave.</p>
          </div>
          <button className="hidden md:flex text-sm font-semibold pb-1 border-b border-primary hover:text-muted-foreground hover:border-muted-foreground transition-all">
            View All Series
          </button>
        </div>

        {/* Mobile Horizontal Scroll Container */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto no-scrollbar pb-8 -mx-6 px-6 md:mx-0 md:px-0 scroll-smooth snap-x">
          {PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="min-w-[75vw] sm:min-w-[45vw] md:min-w-0 snap-center group cursor-pointer"
            >
              <div className="relative aspect-[4/5] bg-secondary rounded-2xl overflow-hidden mb-4">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Floating Add to Cart Button on Hover */}
                <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="w-full bg-background/90 backdrop-blur-md text-foreground py-3 rounded-full font-semibold shadow-lg active:scale-95 transition-all text-sm">
                    Quick Add +
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                </div>
                <span className="font-semibold">{product.price}</span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-yellow-500">
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <span className="text-xs text-muted-foreground ml-1">(42)</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Editorial Section */}
      <section className="py-20 px-6 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-square md:aspect-[3/4] rounded-[2rem] overflow-hidden bg-neutral-200 relative"
          >
            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80" className="object-cover w-full h-full" alt="Editorial" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-md space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Aesthetic. <br /> Functional. <br /> Defiant.
            </h2>
            <p className="text-muted-foreground text-lg">
              We reject the compromise between aesthetic form and true utility. Our garments serve as an extension of the body, adapting effortlessly to dynamic urban environments.
            </p>
            <ul className="space-y-4 pt-4 border-t border-border">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">✓</div>
                <span className="font-medium">Thermo-regulating smart fabrics</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">✓</div>
                <span className="font-medium">Asymmetrical articulating seams</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">✓</div>
                <span className="font-medium">Lifetime repair guarantee</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>
    </>
  );
}
