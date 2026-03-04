"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag, Search, Menu, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block",
                scrolled
                    ? "bg-background/80 backdrop-blur-md border-b border-white/10 shadow-sm py-3"
                    : "bg-transparent py-5"
            )}
        >
            <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-foreground rounded-full flex justify-center items-center">
                        <span className="text-background font-bold text-sm">V</span>
                    </div>
                    <span className="font-bold text-xl tracking-tight">Vanguard</span>
                </div>

                {/* Desktop Navigation - Mega Menu Placeholder */}
                <nav className="hidden md:flex items-center gap-8">
                    <button className="text-sm font-medium text-foreground hover:text-accent-foreground transition-colors">
                        New Arrivals
                    </button>
                    <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Men
                    </button>
                    <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Women
                    </button>
                    <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Accessories
                    </button>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-5">
                    <button className="p-2 text-foreground/80 hover:text-foreground transition-all">
                        <Search className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-foreground/80 hover:text-foreground transition-all">
                        <User className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-foreground/80 hover:text-foreground transition-all relative">
                        <ShoppingBag className="w-5 h-5" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
                    </button>
                </div>
            </div>
        </header>
    );
}
