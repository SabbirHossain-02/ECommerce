import React from "react";
import { ArrowRight, Instagram, Twitter, Facebook, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground pt-20 pb-24 md:pb-10 rounded-t-[40px] mt-20 px-6 sm:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 border-b border-primary-foreground/10 pb-16">

                    {/* Brand & Newsletter */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight">Vanguard</h2>
                        <p className="text-primary-foreground/70 max-w-sm text-sm">
                            Premium apparel engineered for the modern pioneer. Subscribe for early access to our limited collections.
                        </p>
                        <form className="flex rounded-full overflow-hidden bg-white/5 border border-white/10 p-1 w-full max-w-sm focus-within:ring-2 ring-primary-foreground transition-all">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-transparent text-primary-foreground px-4 py-3 w-full outline-none placeholder:text-primary-foreground/40 text-sm"
                                required
                            />
                            <button type="submit" className="bg-primary-foreground text-primary rounded-full px-6 py-3 font-medium flex items-center gap-2 hover:bg-neutral-200 transition-colors">
                                Join <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-6">Explore</h3>
                        <ul className="space-y-4 text-sm text-primary-foreground/70">
                            <li><a href="#" className="hover:text-primary-foreground transition-colors">New Arrivals</a></li>
                            <li><a href="#" className="hover:text-primary-foreground transition-colors">Bestsellers</a></li>
                            <li><a href="#" className="hover:text-primary-foreground transition-colors">The Vault</a></li>
                            <li><a href="#" className="hover:text-primary-foreground transition-colors">Gift Cards</a></li>
                        </ul>
                    </div>

                    {/* Help Line */}
                    <div>
                        <h3 className="font-semibold mb-6">Support</h3>
                        <ul className="space-y-4 text-sm text-primary-foreground/70">
                            <li><a href="#" className="hover:text-primary-foreground transition-colors">FAQ</a></li>
                            <li><a href="#" className="hover:text-primary-foreground transition-colors">Shipping & Returns</a></li>
                            <li><a href="#" className="hover:text-primary-foreground transition-colors">Track Order</a></li>
                            <li><a href="#" className="hover:text-primary-foreground transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-8 items-center justify-center border-b border-primary-foreground/10 mb-8">
                    <div className="flex flex-col items-center text-center space-y-2">
                        <ShieldCheck className="w-8 h-8 text-primary-foreground/50" />
                        <p className="text-sm font-medium">Secure Checkout</p>
                        <p className="text-xs text-primary-foreground/60">PCI Compliant Payments</p>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-2">
                        <Truck className="w-8 h-8 text-primary-foreground/50" />
                        <p className="text-sm font-medium">Global Express</p>
                        <p className="text-xs text-primary-foreground/60">2-4 days worldwide</p>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-2">
                        <RefreshCw className="w-8 h-8 text-primary-foreground/50" />
                        <p className="text-sm font-medium">Free Returns</p>
                        <p className="text-xs text-primary-foreground/60">Within 30 days of purchase</p>
                    </div>
                </div>

                {/* Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-primary-foreground/50">
                    <p>© {new Date().getFullYear()} Vanguard Ltd. All rights reserved.</p>

                    <div className="flex gap-4">
                        <a href="#" className="hover:text-primary-foreground transition-colors"><Instagram className="w-4 h-4" /></a>
                        <a href="#" className="hover:text-primary-foreground transition-colors"><Twitter className="w-4 h-4" /></a>
                        <a href="#" className="hover:text-primary-foreground transition-colors"><Facebook className="w-4 h-4" /></a>
                    </div>

                    <div className="flex gap-4">
                        <a href="#" className="hover:text-primary-foreground transition-colors">Privacy</a>
                        <a href="#" className="hover:text-primary-foreground transition-colors">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
