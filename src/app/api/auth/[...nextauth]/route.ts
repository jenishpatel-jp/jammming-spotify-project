import NextAuth, { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { JWT } from "next-auth/jwt";
import { Account, User, Profile as NextAuthProfile, Session as DefaultSession } from "next-auth";

interface SpotifyProfile extends NextAuthProfile {
  id?: string;
  display_name: string;
  images: { url: string }[];
}

interface CustomToken extends JWT {
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpires?: number;
}

interface CustomSession extends DefaultSession {
  user: {
    id?: string;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID ?? "",
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          scope: "user-read-email user-read-private playlist-modify-public playlist-modify-private",
        },
      },
      profile(profile: SpotifyProfile): User {
        return {
          id: profile.id || "",
          name: profile.display_name,
          email: profile.email ?? undefined,
          image: profile.images?.[0]?.url ?? null,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }: { token: CustomToken; account?: Account | null }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = (account.expires_at ? account.expires_at : Date.now() / 1000) * 1000;
      }
      return token;
    },
    async session({ session, token }: { session: DefaultSession; token: CustomToken }) {
      const customSession = session as CustomSession;
      customSession.user.accessToken = token.accessToken;
      customSession.user.refreshToken = token.refreshToken;
      customSession.user.accessTokenExpires = token.accessTokenExpires;
      return customSession;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
