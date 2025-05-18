import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://emeet.gahonghac.net/api/v1";

type GoogleLoginResponse = {
  role: string;
  [key: string]: unknown;
};

const loginWithGoogleApi = async (
  idToken: string
): Promise<GoogleLoginResponse> => {
  const res = await fetch(`${API_URL}/auth/LoginGoogle`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });
  if (!res.ok) throw new Error("Google login failed");
  return res.json();
};

const GoogleLoginButton = () => {
  const router = useRouter();

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      toast.error("Google login failed. No credential received.");
      return;
    }
    try {
      const response = await loginWithGoogleApi(credentialResponse.credential);
      localStorage.setItem("user", JSON.stringify(response));
      toast.success("Đăng nhập Google thành công!");
      const role = (response.role || "").toLowerCase();
      if (role === "admin") {
        router.push("/dashboard/admin");
      } else if (role === "expert") {
        router.push("/dashboard/expert");
      } else {
        router.push("/dashboard/user");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Đăng nhập Google thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => {
          console.error("Google login error");
          toast.error("Google login failed. Please try again.");
        }}
        width="100%"
        text="signin_with"
        shape="rectangular"
        theme="outline"
        size="large"
        logo_alignment="left"
      />
    </div>
  );
};

export default GoogleLoginButton;
