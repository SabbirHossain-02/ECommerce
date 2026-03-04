"use client";

import React, { useState } from "react";
import { Home, Grid, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileNav() {
    const [activeTab, setActiveTab] = useState("home");

    const tabs = [
        { id: "home", icon: Home, label: "Home" },
        { id: "categories", icon: Grid, label: "Categories" },
        { id: "cart", icon: ShoppingBag, label: "Cart", badge: 2 },
        { id: "profile", icon: User, label: "Profile" },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 pb-safe">
            <div className="bg-background/80 backdrop-blur-xl border-t border-white/10 px-6 py-4 flex justify-between items-center relative">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const Icon = tab.icon;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="relative flex flex-col items-center justify-center w-12 h-12"
                        >
                            <div className="relative z-10 flex flex-col items-center">
                                <Icon
                                    className={cn(
                                        "w-6 h-6 transition-all duration-300",
                                        isActive ? "text-primary" : "text-muted-foreground"
                                    )}
                                />
                                <span
                                    className={cn(
                                        "text-[10px] mt-1 font-medium transition-all duration-300",
                                        isActive ? "text-primary opacity-100" : "text-muted-foreground opacity-70"
                                    )}
                                >
                                    {tab.label}
                                </span>

                                {tab.badge && (
                                    <span className="absolute -top-1 -right-2 bg-destructive text-destructive-foreground text-[8px] font-bold px-1.5 py-0.5 rounded-full border-2 border-background">
                                        {tab.badge}
                                    </span>
                                )}
                            </div>

                            {isActive && (
                                <motion.div
                                    layoutId="mobile-nav-indicator"
                                    className="absolute inset-0 bg-secondary rounded-xl -z-0"
                                    initial={false}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 30
                                    }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
