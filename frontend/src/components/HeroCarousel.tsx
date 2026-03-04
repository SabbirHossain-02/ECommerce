"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SLIDES = [
    {
        id: 1,
        title: "Engineered For Motion.",
        subtitle: "High-performance urban apparel that anticipates your next move.",
        // Using a very high-quality cinematic fashion image
        media: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2000&auto=format&fit=crop",
        cta: "Shop The Drop",
    },
    {
        id: 2,
        title: "Defy The Elements.",
        subtitle: "Adaptive textiles designed for extreme weather resistance.",
        media: "https://images.unsplash.com/photo-1542272201-b1ca555f8505?q=80&w=2000&auto=format&fit=crop",
        cta: "Explore Outerwear",
    },
    {
        id: 3,
        title: "Silent Aesthetics.",
        subtitle: "Minimalist silhouettes with maximum functionality.",
        media: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop",
        cta: "View Lookbook",
    }
];

export default function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-play the carousel
    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        }, 6000); // 6 seconds per slide
        return () => clearInterval(interval);
    }, [isHovered]);

    return (
        <section
            className="relative h-[85vh] md:h-[95vh] w-full overflow-hidden bg-black"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AnimatePresence mode="popLayout">
                {SLIDES.map((slide, index) => {
                    if (index !== currentSlide) return null;

                    return (
                        <motion.div
                            key={slide.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                            className="absolute inset-0 w-full h-full"
                        >
                            {/* Media Background with subtle infinite slow-zoom (Ken Burns effect) to mimic video */}
                            <motion.div
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 8, ease: "easeOut" }}
                                className="absolute inset-0 w-full h-full"
                            >
                                {/* Overlay for text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 z-10" />
                                <img
                                    src={slide.media}
                                    alt={slide.title}
                                    className="w-full h-full object-cover object-center"
                                />
                            </motion.div>

                            {/* Text Content */}
                            <div className="relative z-20 h-full flex flex-col justify-center px-6 lg:px-24 max-w-7xl mx-auto pt-20">
                                <div className="max-w-3xl space-y-6">

                                    {/* Staggered Subtitle */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm font-medium tracking-wide uppercase"
                                    >
                                        <span className="flex w-2 h-2 rounded-full bg-white relative">
                                            <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-75"></span>
                                        </span>
                                        Season 04 Exclusive
                                    </motion.div>

                                    {/* Split Title Reveal */}
                                    <div className="overflow-hidden">
                                        <motion.h1
                                            initial={{ y: "100%" }}
                                            animate={{ y: 0 }}
                                            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[1.05]"
                                        >
                                            {slide.title}
                                        </motion.h1>
                                    </div>

                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                                        className="text-lg md:text-xl text-white/80 max-w-xl font-medium"
                                    >
                                        {slide.subtitle}
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
                                        className="pt-4"
                                    >
                                        <button className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-[1.02] active:scale-[0.98] hover:bg-neutral-200 transition-all flex items-center gap-2 group">
                                            {slide.cta}
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>

            {/* Progress / Pagination Indicator */}
            <div className="absolute bottom-8 lg:bottom-12 left-6 lg:left-24 right-6 lg:right-24 z-30 flex items-center justify-between">
                <div className="flex gap-3 items-center">
                    {SLIDES.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className="relative h-1.5 rounded-full overflow-hidden bg-white/20 transition-all hover:bg-white/40"
                            style={{ width: currentSlide === idx ? "48px" : "24px" }}
                        >
                            {currentSlide === idx && (
                                <motion.div
                                    layoutId="active-progress"
                                    className="absolute inset-0 bg-white"
                                    initial={{ x: "-100%" }}
                                    animate={{ x: 0 }}
                                    transition={{ duration: 6, ease: "linear" }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                <div className="text-white/60 font-mono text-sm tracking-widest hidden md:block">
                    0{currentSlide + 1} / 0{SLIDES.length}
                </div>
            </div>
        </section>
    );
}
