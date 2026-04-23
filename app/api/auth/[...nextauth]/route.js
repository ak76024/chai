import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import User from "@/models/User";
import connectDB from "@/db/connect";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account.provider === "github") {
          if (!user.email) return false;

          await connectDB();
          const existingUser = await User.findOne({email: user.email});

          if (!existingUser) {
            await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
              username: user.email.split("@")[0],
            });
          }
        }
        return true;
      } catch (error) {
        console.log(error);
        return false; 
      }
    },
    async session({ session }) {
      const dbUser = await User.findOne({ email: session.user.email });
      session.user.username = dbUser.username;
      return session
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };