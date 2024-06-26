import NextAuth, { NextAuthOptions, Session, Account, Profile as NextAuthProfile, User } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { JWT } from "next-auth/jwt";

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

interface CustomSession extends Session {
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
      try {
        if (account) {
          console.log("Account:", account);
          token.accessToken = account.access_token;
          token.refreshToken = account.refresh_token;
          token.accessTokenExpires = (account.expires_at ? account.expires_at : Date.now() / 1000) * 1000;
        }
        return token;
      } catch (error) {
        console.error("JWT Callback Error:", error);
        throw error;
      }
    },


    async session({ session, token }: { session: Session; token: CustomToken }) {

      try {

        const customSession = session as CustomSession;

        if (!customSession.user) {
          customSession.user = {
            id: "",
            accessToken: undefined,
            refreshToken: undefined,
            accessTokenExpires: undefined,
            name: null,
            email: null,
            image: null,
          };
        }
  
        customSession.user.accessToken = token.accessToken;
        customSession.user.refreshToken = token.refreshToken;
        customSession.user.accessTokenExpires = token.accessTokenExpires;
  
        return customSession;

      } catch (error){
        console.error("Session Callback Error:", error);
        throw error;
      }
        
    },
  },
};

// The handler function for NextAuth
const handler = NextAuth(authOptions);

// Export named handlers for GET and POST methods
export { handler as GET, handler as POST };