import { ReactNode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID =
  "246730582795-bldqe5o18il9nt127q03d8penomg7b9t.apps.googleusercontent.com";

type GoogleOAuthProviderWrapperProps = {
  children: ReactNode;
};

const GoogleOAuthProviderWrapper = ({
  children,
}: GoogleOAuthProviderWrapperProps) => (
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    {children}
  </GoogleOAuthProvider>
);

export default GoogleOAuthProviderWrapper;
