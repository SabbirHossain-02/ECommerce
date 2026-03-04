"use client";

import React, { useState, useEffect } from "react";
import { User, Package, Settings, LogOut, Camera, ShieldCheck, CreditCard, Save } from "lucide-react";
import { motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const TABS = [
    { id: "profile", label: "My Profile", icon: User },
    { id: "orders", label: "Order History", icon: Package },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
    { id: "settings", label: "Account Settings", icon: Settings },
];

export default function UserDashboard() {
    const { data: session, status, update } = useSession();
    const router = useRouter();

    const [activeTab, setActiveTab] = useState("profile");
    const [isSaving, setIsSaving] = useState(false);
    const [uploadPreview, setUploadPreview] = useState<string | null>(null);

    // Profile Form State
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        address: "",
    });

    // Redirect to Auth if totally unauthenticated
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth");
        }
    }, [status, router]);

    // Load Session Data when available
    useEffect(() => {
        if (session?.user) {
            setProfile({
                name: session.user.name || "",
                email: session.user.email || "",
                address: (session.user as any).shippingAddress || "", // Handle custom property
            });
            setUploadPreview(session.user.image || null);
        }
    }, [session]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const payload = {
                name: profile.name,
                address: profile.address,
                avatarBase64: uploadPreview, // Push base64 string to DB server route
            };

            const res = await fetch("/api/user/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                // Trigger NextAuth update so the Navbar automatically resyncs!
                await update({ name: profile.name, image: uploadPreview });
                alert("Profile successfully updated and synced across Vanguard!");
            } else {
                alert("Failed to update profile.");
            }
        } catch (error) {
            console.error(error);
            alert("Error saving profile");
        } finally {
            setIsSaving(false);
        }
    };

    if (status === "loading") {
        return <div className="min-h-screen flex items-center justify-center font-bold text-2xl tracking-widest uppercase">Authorizing...</div>;
    }

    return (
        <div className="container mx-auto px-6 max-w-6xl pt-32 pb-24 min-h-screen">

            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 pb-8 border-b border-border">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">User Dashboard</h1>
                    <p className="text-muted-foreground font-medium flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-green-500" /> Secure Identity Platform
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-12">

                {/* Left Sidebar - Navigation */}
                <aside className="w-full md:w-64 shrink-0 space-y-2">
                    {TABS.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-semibold transition-all text-left",
                                    isActive
                                        ? "bg-foreground text-background shadow-lg scale-100"
                                        : "hover:bg-secondary text-muted-foreground hover:text-foreground scale-95"
                                )}
                            >
                                <Icon className={cn("w-5 h-5", isActive ? "text-background" : "text-muted-foreground")} />
                                {tab.label}
                            </button>
                        )
                    })}

                    <div className="pt-8 border-t border-border mt-8">
                        <button
                            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-semibold text-destructive hover:bg-destructive/10 transition-colors text-left"
                            onClick={() => signOut({ callbackUrl: "/" })}
                        >
                            <LogOut className="w-5 h-5" /> Sign Out
                        </button>
                    </div>
                </aside>

                {/* Right Content Area */}
                <main className="flex-1 min-w-0">

                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === "profile" && (
                            <div className="bg-background/80 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-xl">

                                <h2 className="text-2xl font-bold tracking-tight mb-8">Personal Information</h2>

                                <form onSubmit={handleSave} className="max-w-xl space-y-8">

                                    {/* Dynamic Avatar Upload */}
                                    <div className="flex items-center gap-6 pb-8 border-b border-border">
                                        <label className="relative group w-24 h-24 rounded-full overflow-hidden bg-secondary border-2 border-dashed border-border flex items-center justify-center cursor-pointer shrink-0 shadow-inner">
                                            {uploadPreview ? (
                                                <img src={uploadPreview} alt="Profile" className="w-full h-full object-cover group-hover:blur-sm transition-all shadow-lg" />
                                            ) : (
                                                <User className="w-10 h-10 text-muted-foreground" />
                                            )}

                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Camera className="w-8 h-8 text-white" />
                                            </div>

                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageUpload}
                                            />
                                        </label>

                                        <div>
                                            <h3 className="font-semibold text-lg text-foreground">Profile Picture</h3>
                                            <p className="text-sm text-muted-foreground mb-3">Syncs instantly across Vanguard.</p>
                                            <button type="button" onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()} className="text-xs font-bold uppercase tracking-widest text-primary border border-border px-4 py-2 rounded-full hover:bg-secondary transition-colors">
                                                Change Image
                                            </button>
                                        </div>
                                    </div>

                                    {/* Text Inputs */}
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                value={profile.name}
                                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                                className="w-full bg-secondary/30 border border-border focus:border-foreground rounded-2xl px-5 py-4 outline-none font-medium transition-colors"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                value={profile.email}
                                                readOnly // Authentication dictates email
                                                className="w-full bg-secondary/30 border border-border focus:border-foreground rounded-2xl px-5 py-4 outline-none font-medium transition-colors cursor-not-allowed opacity-70"
                                            />
                                            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                                                <ShieldCheck className="w-3 h-3 text-green-500" /> Immutable OAuth Entity
                                            </p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                                Shipping Address
                                            </label>
                                            <textarea
                                                rows={3}
                                                value={profile.address}
                                                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                                className="w-full bg-secondary/30 border border-border focus:border-foreground rounded-2xl px-5 py-4 outline-none font-medium transition-colors resize-none"
                                                placeholder="Enter your full street address, city, and zip code."
                                            />
                                        </div>
                                    </div>

                                    {/* Save Button */}
                                    <div className="flex justify-end pt-6 border-t border-border">
                                        <button
                                            type="submit"
                                            disabled={isSaving}
                                            className="px-8 py-4 bg-foreground text-background font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 disabled:scale-100"
                                        >
                                            {isSaving ? "Updating Database..." : "Commit Update"}
                                            {!isSaving && <Save className="w-4 h-4" />}
                                        </button>
                                    </div>

                                </form>
                            </div>
                        )}

                        {activeTab === "orders" && (
                            <div className="bg-background/80 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-xl flex flex-col items-center justify-center h-[500px] text-center">
                                <Package className="w-16 h-16 text-muted-foreground/30 mb-6" />
                                <h2 className="text-2xl font-bold tracking-tight mb-2">No Active Orders</h2>
                                <p className="text-muted-foreground max-w-md">You haven't placed any orders yet. Discover our latest technical weaves to get started.</p>
                                <button className="mt-8 text-sm font-bold tracking-widest uppercase border-b-2 border-primary pb-1">Shop Collection</button>
                            </div>
                        )}

                        {(activeTab === "payment" || activeTab === "settings") && (
                            <div className="bg-background/80 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-xl flex flex-col items-center justify-center h-[500px] text-center">
                                <Settings className="w-16 h-16 text-muted-foreground/30 mb-6" />
                                <h2 className="text-2xl font-bold tracking-tight mb-2">Development Mode</h2>
                                <p className="text-muted-foreground max-w-md">This section is being wired up to the NestJS + PostgreSQL Backend mapping.</p>
                            </div>
                        )}
                    </motion.div>

                </main>
            </div>
        </div>
    );
}
