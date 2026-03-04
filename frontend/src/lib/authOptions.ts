import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
    // @ts-ignore
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "mock-client-id",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock-client-secret",
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    role: "CUSTOMER", // default from Prisma schema
                };
            },
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                name: { label: "Name", type: "text" }, // Add this to allow passing 'name' from frontend
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null;

                try {
                    let user = await prisma.user.findUnique({
                        where: { email: credentials.email }
                    });

                    // Auto-register mock flow for testing dynamic avatar
                    if (!user) {
                        user = await prisma.user.create({
                            data: {
                                email: credentials.email,
                                name: credentials.name || credentials.email.split('@')[0],
                                password: credentials.password,
                            }
                        });
                    }

                    // Normally, compare hashed password here with bcrypt. For demo, we do plain string check mock.
                    if (user && user.password === credentials.password) {
                        return user;
                    }
                } catch (dbError) {
                    console.warn("Database Connection Failed. Logging in with Mock Session:", dbError);
                    // Fallback to allow previewing NextAuth without local Postgres running
                    return {
                        id: `mock_id_${Date.now()}`,
                        email: credentials.email,
                        name: credentials.name || credentials.email.split('@')[0],
                        image: "https://images.unsplash.com/photo-1542272201-b1ca555f8505?q=80&w=100&auto=format&fit=crop"
                    } as any;
                }

                return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            // Initial sign in
            if (user) {
                token.sub = user.id;
                token.name = user.name;
                token.email = user.email;
                token.picture = user.image;
                token.shippingAddress = (user as any).shippingAddress;
            }

            // Sync with DB on token refresh so changes on other devices propagate
            if (token.email) {
                try {
                    const dbUser = await prisma.user.findUnique({
                        where: { email: token.email }
                    });
                    if (dbUser) {
                        token.name = dbUser.name;
                        token.picture = dbUser.image;
                        token.shippingAddress = dbUser.shippingAddress;
                    }
                } catch (e) {
                    // Ignore DB errors if in mock mode
                }
            }

            // Client-side update()
            if (trigger === "update" && session) {
                if (session.name) token.name = session.name;
                if (session.image) token.picture = session.image;
                if (session.address) token.shippingAddress = session.address;
            }

            return token;
        },
        async session({ session, token }) {
            if (session?.user && token) {
                // @ts-ignore
                session.user.id = token.sub;
                session.user.name = token.name as string;
                session.user.image = token.picture as string;
                // @ts-ignore
                session.user.shippingAddress = token.shippingAddress as string;
            }
            return session;
        }
    },
    session: {
        strategy: "jwt" // Useful for edge compat and easier local dev without full DB active if mocking
    },
    pages: {
        signIn: "/auth",
    },
    secret: process.env.NEXTAUTH_SECRET || "super-secret-key",
};
