"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag, Search, User, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Mega Menu Data Structure
const MENU_ITEMS = [
    {
        id: "new",
        label: "New Arrivals",
        content: null // No mega menu for this simple link
    },
    {
        id: "men",
        label: "Men",
        content: {
            categories: [
                { title: "Clothing", links: ["Outerwear", "Tops & T-Shirts", "Hoodies & Pullovers", "Bottoms", "Shorts"] },
                { title: "Footwear", links: ["Lifestyle", "Running", "Training", "Slides"] },
                { title: "Accessories", links: ["Bags & Backpacks", "Hats & Beanies", "Socks"] }
            ],
            promo: {
                title: "The Kinetic Series",
                subtitle: "Engineered for movement.",
                image: "https://images.unsplash.com/photo-1542272201-b1ca555f8505?w=600&q=80"
            }
        }
    },
    {
        id: "women",
        label: "Women",
        content: {
            categories: [
                { title: "Clothing", links: ["Outerwear", "Tops & T-Shirts", "Sports Bras", "Leggings", "Shorts"] },
                { title: "Footwear", links: ["Lifestyle", "Running", "Training"] },
                { title: "Accessories", links: ["Bags", "Headwear", "Yoga Mats"] }
            ],
            promo: {
                title: "Aero Mesh Collection",
                subtitle: "Breathable, lightweight, unstoppable.",
                image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80"
            }
        }
    },
    {
        id: "accessories",
        label: "Accessories",
        content: null
    }
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    // Track scroll for glassmorphism and color flipping
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Determine the active content to show in the mega menu
    const activeMenuContent = MENU_ITEMS.find(item => item.id === hoveredItem)?.content;
    const isMegaMenuOpen = !!activeMenuContent;

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block"
            onMouseLeave={() => setHoveredItem(null)}
        >
            {/* 
        The top navigation bar.
        If scrolled OR mega menu is open, we apply the solid/glass theme (light or dark depending on system preference).
        Otherwise, it is completely transparent and white (for the dark hero background).
      */}
            <div
                className={cn(
                    "w-full transition-all duration-300 relative z-20",
                    (scrolled || hoveredItem)
                        ? "bg-background/90 backdrop-blur-xl border-b border-border text-foreground py-4 shadow-sm"
                        : "bg-transparent text-white py-6"
                )}
            >
                <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">

                    {/* Logo Area */}
                    <div className="flex items-center gap-2 cursor-pointer group">
                        <div className={cn(
                            "w-8 h-8 rounded-full flex justify-center items-center transition-colors",
                            (scrolled || hoveredItem) ? "bg-foreground text-background" : "bg-white text-black"
                        )}>
                            <span className="font-bold text-sm">V</span>
                        </div>
                        <span className="font-bold text-xl tracking-tight uppercase">Vanguard</span>
                    </div>

                    {/* Center Links */}
                    <nav className="hidden md:flex items-center space-x-1">
                        {MENU_ITEMS.map((item) => (
                            <button
                                key={item.id}
                                onMouseEnter={() => setHoveredItem(item.id)}
                                className={cn(
                                    "px-5 py-2 text-sm font-semibold rounded-full transition-all",
                                    hoveredItem === item.id
                                        ? "bg-secondary text-secondary-foreground"
                                        : "hover:text-primary/70"
                                )}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                        <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                            <User className="w-5 h-5" />
                        </button>
                        <button className="p-2 rounded-full hover:bg-white/10 transition-colors relative">
                            <ShoppingBag className="w-5 h-5" />
                            <span className={cn(
                                "absolute top-1 right-1 w-2 h-2 rounded-full",
                                (scrolled || hoveredItem) ? "bg-destructive" : "bg-white"
                            )}></span>
                        </button>
                    </div>

                </div>
            </div>

            {/* 
        Mega Menu Dropdown Container
        We use Framer Motion AnimatePresence to slide it down elegantly.
      */}
            <AnimatePresence>
                {isMegaMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-2xl border-b border-border shadow-2xl z-10 overflow-hidden"
                        onMouseEnter={() => setHoveredItem(hoveredItem)} // Sustain hover
                    >
                        <div className="container mx-auto px-6 max-w-7xl py-12">
                            <div className="grid grid-cols-12 gap-8">

                                {/* Links Section (Takes up 8 columns) */}
                                <div className="col-span-8 grid grid-cols-3 gap-8">
                                    {activeMenuContent.categories.map((category, idx) => (
                                        <motion.div
                                            key={category.title}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 + 0.1, duration: 0.4 }}
                                        >
                                            <h3 className="text-sm font-bold text-foreground mb-4 tracking-wider uppercase">{category.title}</h3>
                                            <ul className="space-y-3 text-sm text-muted-foreground font-medium">
                                                {category.links.map(link => (
                                                    <li key={link}>
                                                        <a href="#" className="hover:text-foreground transition-colors inline-block hover:translate-x-1 transform duration-200">
                                                            {link}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Promo Feature Section (Takes up 4 columns) */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className="col-span-4"
                                >
                                    <div className="group cursor-pointer relative rounded-2xl overflow-hidden aspect-[4/3] bg-secondary">
                                        <img
                                            src={activeMenuContent.promo.image}
                                            alt={activeMenuContent.promo.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                                            <p className="text-white/80 text-xs font-semibold tracking-widest uppercase mb-1">Featured</p>
                                            <h4 className="text-white text-xl font-bold mb-1">{activeMenuContent.promo.title}</h4>
                                            <p className="text-white/90 text-sm mb-4">{activeMenuContent.promo.subtitle}</p>
                                            <span className="text-white text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                                Shop Now <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>

                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Full screen overlay to dim the rest of the site when mega menu is open */}
            <AnimatePresence>
                {isMegaMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 top-[80px] bg-black/20 backdrop-blur-sm -z-10"
                    />
                )}
            </AnimatePresence>
        </header>
    );
}
