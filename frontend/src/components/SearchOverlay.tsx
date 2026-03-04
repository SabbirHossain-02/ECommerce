"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight, Loader2 } from "lucide-react";

// Mock products for instant search demonstration (Backend API integration will replace this)
const MOCK_PRODUCTS = [
    { id: 1, name: "Neural Weave Jacket", category: "Outerwear", price: "$299", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&q=80" },
    { id: 2, name: "Kinetic Cargo Pants", category: "Bottoms", price: "$180", image: "https://images.unsplash.com/photo-1542272201-b1ca555f8505?w=200&q=80" },
    { id: 3, name: "Aero Mesh Sneakers", category: "Footwear", price: "$220", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80" },
    { id: 4, name: "Void Beanie", category: "Accessories", price: "$45", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&q=80" },
    { id: 5, name: "Shadow Windbreaker", category: "Outerwear", price: "$150", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=80" },
];

export default function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(MOCK_PRODUCTS.slice(0, 3)); // Show trending initially

    // Handle escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.body.style.overflow = "hidden"; // Prevent background scrolling
            window.addEventListener("keydown", handleKeyDown);
        } else {
            document.body.style.overflow = "auto";
        }
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    // Handle fake search delay
    useEffect(() => {
        if (!query) {
            setResults(MOCK_PRODUCTS.slice(0, 3));
            return;
        }
        setLoading(true);
        const timeout = setTimeout(() => {
            const filtered = MOCK_PRODUCTS.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()));
            setResults(filtered);
            setLoading(false);
        }, 400); // 400ms debounce simulation
        return () => clearTimeout(timeout);
    }, [query]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl overflow-y-auto"
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-foreground/70 hover:text-foreground transition-colors"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <div className="container mx-auto px-6 max-w-4xl pt-32 pb-16">

                        {/* Massive Search Input */}
                        <div className="relative border-b-2 border-border focus-within:border-foreground transition-colors pb-4">
                            <div className="flex items-center gap-4">
                                <Search className="w-10 h-10 text-muted-foreground" />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="What are you looking for?"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="w-full bg-transparent text-4xl md:text-6xl font-black tracking-tight outline-none placeholder:text-muted-foreground/30 text-foreground"
                                />
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="mt-16">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-sm font-bold tracking-widest uppercase text-muted-foreground">
                                    {query ? 'Search Results' : 'Trending Now'}
                                </h3>
                                {loading && <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />}
                            </div>

                            {/* Results Grid */}
                            {results.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {results.map((product, idx) => (
                                        <motion.div
                                            key={product.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="group cursor-pointer flex gap-4 items-center bg-secondary/30 hover:bg-secondary rounded-2xl p-3 transition-colors"
                                        >
                                            <div className="w-24 h-24 rounded-xl overflow-hidden bg-white/5 shrink-0">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{product.category}</p>
                                                <h4 className="font-bold text-foreground group-hover:underline underline-offset-4 decoration-2">{product.name}</h4>
                                                <p className="text-sm font-medium mt-1">{product.price}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20">
                                    <p className="text-2xl text-muted-foreground font-medium mb-4">No results found for "{query}"</p>
                                    <p className="text-sm text-muted-foreground/50">Try checking your spelling or searching for a broader category.</p>
                                </div>
                            )}
                        </div>

                        {/* Quick Links */}
                        {!query && (
                            <div className="mt-20">
                                <h3 className="text-sm font-bold tracking-widest uppercase text-muted-foreground mb-6">Popular Categories</h3>
                                <div className="flex flex-wrap gap-3">
                                    {["Outerwear", "Technical Pants", "Sneakers", "Bags", "Headwear"].map(tag => (
                                        <button key={tag} onClick={() => setQuery(tag)} className="px-4 py-2 rounded-full border border-border hover:border-foreground text-sm font-medium transition-colors">
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
