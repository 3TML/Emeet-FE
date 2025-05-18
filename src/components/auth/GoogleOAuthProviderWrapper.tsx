import { ReactNode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

type GoogleOAuthProviderWrapperProps = {
  children: ReactNode;
};

const GoogleOAuthProviderWrapper = ({
  children,
}: GoogleOAuthProviderWrapperProps) => (
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID as string}>
    {children}
  </GoogleOAuthProvider>
);

export default GoogleOAuthProviderWrapper;
