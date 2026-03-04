"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Chrome, ArrowRight, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const IMAGES = [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542272201-b1ca555f8505?q=80&w=1400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1400&auto=format&fit=crop"
];

export default function AuthPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    // Form fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Carousel State
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % IMAGES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleCredentialsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
                name: isLogin ? undefined : name,
            });

            if (result?.error) {
                alert("Login Failed. Please check your credentials.");
            } else {
                router.push("/dashboard");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-background text-foreground selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">

            {/* Left Column: E-Commerce Lifestyle Imagery */}
            <div className="hidden lg:flex w-[55%] relative overflow-hidden bg-neutral-100">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentImageIndex}
                        src={IMAGES[currentImageIndex]}
                        alt="Fashion Campaign"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.8 } }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                </AnimatePresence>

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute bottom-12 left-12 right-12 text-white">
                    <h2 className="text-4xl font-extrabold tracking-tight mb-4 uppercase leading-none">
                        Define Your <br /> Aesthetic
                    </h2>
                    <p className="text-lg font-medium text-white/80 max-w-md">
                        Join Vanguard to gain exclusive access to premium drops, personalized styling, and seamless ultra-fast checkout.
                    </p>

                    {/* Carousel Indicators */}
                    <div className="flex gap-2 mt-8">
                        {IMAGES.map((_, idx) => (
                            <div
                                key={idx}
                                className={cn(
                                    "h-1 rounded-full transition-all duration-500",
                                    currentImageIndex === idx ? "w-8 bg-white" : "w-2 bg-white/40"
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: Authentication Form */}
            <div className="w-full lg:w-[45%] flex flex-col justify-center relative px-8 sm:px-16 xl:px-24 py-12 h-screen overflow-y-auto">

                {/* Floating Back Link */}
                <Link href="/" className="absolute top-10 left-8 sm:left-16 xl:left-24 flex items-center gap-2 text-sm font-bold tracking-widest text-muted-foreground hover:text-foreground transition-all uppercase group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Return
                </Link>

                <div className="max-w-md w-full mx-auto mt-20 lg:mt-0">

                    {/* Header */}
                    <div className="mb-10">
                        <h1 className="text-3xl font-black tracking-tight mb-3">
                            {isLogin ? "Welcome Back." : "Create Account."}
                        </h1>
                        <p className="text-muted-foreground font-medium text-sm">
                            {isLogin
                                ? "Enter your credentials to access your personal Vanguard dashboard."
                                : "Register with your details to curate your premium shopping experience."
                            }
                        </p>
                    </div>

                    {/* Form Component */}
                    <AnimatePresence mode="wait">
                        <motion.form
                            key={isLogin ? "login" : "register"}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="space-y-6"
                            onSubmit={handleCredentialsSubmit}
                        >

                            {!isLogin && (
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50 group-focus-within:text-foreground transition-colors" />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            className="w-full bg-transparent border-b-2 border-border focus:border-foreground py-3 pl-8 outline-none transition-all placeholder:text-muted-foreground/30 font-semibold"
                                            placeholder="Sabbir Hossain"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50 group-focus-within:text-foreground transition-colors" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full bg-transparent border-b-2 border-border focus:border-foreground py-3 pl-8 outline-none transition-all placeholder:text-muted-foreground/30 font-semibold"
                                        placeholder="admin@vanguard.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Password</label>
                                    {isLogin && (
                                        <Link href="#" className="text-[11px] uppercase font-bold text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline">
                                            Forgot Password?
                                        </Link>
                                    )}
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50 group-focus-within:text-foreground transition-colors" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full bg-transparent border-b-2 border-border focus:border-foreground py-3 pl-8 pr-10 outline-none transition-all placeholder:text-muted-foreground/30 font-semibold tracking-wide"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                disabled={isLoading}
                                type="submit"
                                className="w-full bg-foreground text-background font-bold tracking-widest uppercase text-sm py-4 relative overflow-hidden group/btn hover:shadow-xl transition-all disabled:opacity-50 mt-4"
                            >
                                <span className="absolute inset-0 bg-primary translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-in-out" />
                                <span className="relative flex items-center justify-center gap-3">
                                    {isLoading ? "Authenticating..." : (isLogin ? "Sign In" : "Register")}
                                    {!isLoading && <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />}
                                </span>
                            </button>

                        </motion.form>
                    </AnimatePresence>

                    {/* Divider */}
                    <div className="relative flex items-center justify-center py-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border" />
                        </div>
                        <span className="relative bg-background px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            Or Continue With
                        </span>
                    </div>

                    {/* Google OAuth Button */}
                    <button
                        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                        className="w-full bg-background border-2 border-border hover:border-foreground text-foreground font-bold tracking-widest uppercase text-sm py-4 flex items-center justify-center gap-3 transition-colors active:scale-[0.98]"
                    >
                        <Chrome className="w-5 h-5" />
                        Google
                    </button>

                    {/* Toggle Form Footer */}
                    <div className="mt-10 text-center">
                        <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">
                            {isLogin ? "New to Vanguard?" : "Already a member?"}
                        </p>
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setEmail("");
                                setPassword("");
                                setName("");
                            }}
                            className="mt-2 text-foreground font-black uppercase tracking-widest text-sm underline underline-offset-[6px] hover:text-primary transition-colors"
                        >
                            {isLogin ? "Create an Account" : "Sign In to Vanguard"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
