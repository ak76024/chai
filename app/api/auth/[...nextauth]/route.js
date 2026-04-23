import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import connectDB from "@/db/connect";

const checkUserEmail = async (name,email,image) => {
  const existingUser = await User.findOne({ email: email});
  if (!existingUser) {
    await User.create({
      name: name,
      email: email,
      image: image,
      username: email.split("@")[0],
    });
  }
};

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account.provider === "github") {
          if (!user.email) return false;

          await connectDB();
          await checkUserEmail(user.name, user.email, user.image);
        } else if (account.provider === "google") {
          console.log(user);
          if (!user.email) return false;

          await connectDB();
          await checkUserEmail(user.name, user.email, user.image);
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async session({ session }) {
      const dbUser = await User.findOne({ email: session.user.email });
      session.user.image = dbUser.image;
      session.user.username = dbUser.username;
      return session
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };