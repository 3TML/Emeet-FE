import React, { useState, useRef, useEffect } from "react";

const steps = ["check-email", "otp", "success"] as const;
type Step = (typeof steps)[number];

type EmailOtpRegisterProps = {
  email: string;
  fullName: string;
  onSuccess?: () => void;
};

const BASE_URL = "https://emeet.gahonghac.net/api/v1";

const EmailOtpRegister: React.FC<EmailOtpRegisterProps> = ({
  email,
  fullName,
  onSuccess,
}) => {
  const [step, setStep] = useState<Step>("check-email");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const hasCheckedEmail = useRef(false);
  const sentOtpRef = useRef(false); // prevent double send in strict mode

  // Reset check state when email or fullName changes
  useEffect(() => {
    hasCheckedEmail.current = false;
    sentOtpRef.current = false;
    setStep("check-email");
    setOtp("");
    setError("");
    setInfo("");
  }, [email, fullName]);

  // Check email existence and send OTP
  useEffect(() => {
    console.log("checkEmail effect run", email, fullName);
    if (hasCheckedEmail.current) return;
    if (sentOtpRef.current) return;
    if (!email || !fullName) return;
    setLoading(true);
    setError("");
    setInfo("");
    const checkEmail = async () => {
      try {
        const res = await fetch(`${BASE_URL}/otp/checkExistEmail`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const text = await res.text();
        if (text.toLowerCase().includes("đã được đăng ký")) {
          setError("Email đã được đăng ký. Vui lòng sử dụng email khác.");
          setLoading(false);
          return;
        }
        // Email hợp lệ, gửi OTP (chỉ gửi 1 lần)
        if (!sentOtpRef.current) {
          sentOtpRef.current = true;
          const otpRes = await fetch(`${BASE_URL}/otp/SendOTPToEmail`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, fullName }),
          });
          const otpText = await otpRes.text();
          if (otpText.toLowerCase().includes("success")) {
            setInfo("OTP đã được gửi tới email của bạn.");
            console.log("setStep(otp) called");
            setStep("otp");
            hasCheckedEmail.current = true;
          } else {
            setError(otpText || "Không gửi được OTP. Vui lòng thử lại.");
          }
        }
      } catch {
        setError("Có lỗi xảy ra. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };
    checkEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, fullName]);

  // Handle OTP check
  const handleCheckOtp = async () => {
    setError("");
    setInfo("");
    if (!otp) {
      setError("Vui lòng nhập mã OTP.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/otp/checkOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otpRequest: otp, email }),
      });
      const text = await res.text();
      if (text.toLowerCase().includes("valid")) {
        setStep("success");
        setInfo("Xác thực thành công! Đang tạo tài khoản...");
        if (onSuccess) onSuccess();
      } else {
        setError(text || "OTP không đúng hoặc đã hết hạn.");
      }
    } catch {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Allow Enter key to submit OTP
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && step === "otp") handleCheckOtp();
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md flex flex-col gap-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-2">
          {steps.map((s, idx) => (
            <div
              key={s}
              className={`w-2 h-2 rounded-full ${
                step === s ? "bg-blue-600" : "bg-gray-300"
              }`}
              aria-label={`Bước ${idx + 1}`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500">
          {step === "check-email"
            ? "Kiểm tra email"
            : step === "otp"
            ? "Nhập OTP"
            : "Thành công"}
        </span>
      </div>

      {step === "check-email" && (
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-600">Đang kiểm tra email...</span>
        </div>
      )}

      {step === "otp" && (
        <div className="flex flex-col gap-3">
          <div className="text-sm text-gray-600 mb-1">
            Vui lòng kiểm tra email <b>{email}</b> để lấy mã OTP. Nếu không
            thấy, hãy kiểm tra cả mục Spam/Quảng cáo.
          </div>
          <label htmlFor="otp" className="font-medium">
            Mã OTP
          </label>
          <input
            id="otp"
            type="text"
            className="input input-bordered w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            aria-label="Nhập mã OTP"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            disabled={loading}
            autoFocus
          />
          <button
            className="btn btn-primary w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleCheckOtp}
            disabled={loading}
            aria-label="Xác nhận OTP"
          >
            {loading ? "Đang xác nhận..." : "Xác nhận OTP"}
          </button>
        </div>
      )}

      {step === "success" && (
        <div className="flex flex-col items-center gap-3">
          <span className="text-green-600 text-lg font-semibold">
            Xác thực thành công!
          </span>
          <span className="text-gray-500 text-sm">Đang tạo tài khoản...</span>
        </div>
      )}

      {error && (
        <div className="text-red-600 text-sm mt-2" role="alert">
          {error}
        </div>
      )}
      {info && <div className="text-blue-600 text-sm mt-2">{info}</div>}
    </div>
  );
};

export default EmailOtpRegister;
