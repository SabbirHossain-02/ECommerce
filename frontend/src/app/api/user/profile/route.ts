import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user || !session.user.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { name, address, avatarBase64 } = body;

        // Use Prisma to update the User in the DB
        const updatedUser = await prisma.user.update({
            where: { email: session.user.email },
            data: {
                ...(name && { name }),
                ...(address && { shippingAddress: address }),
                ...(avatarBase64 && { image: avatarBase64 }), // In NextAuth, default avatar is mapped to 'image'
            },
        });

        return NextResponse.json({
            success: true,
            user: {
                name: updatedUser.name,
                image: updatedUser.image,
                shippingAddress: updatedUser.shippingAddress
            }
        });
    } catch (error) {
        console.error("Profile update error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
