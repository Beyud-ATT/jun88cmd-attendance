import { useState } from "react";
import { checkUser } from "../services/api_service";
import LoginBG from "../assets/images/login-bg.png";
import { enqueueSnackbar } from "notistack";
import { CloseModalButton, Button } from "../utils/svg";

const CheckUserModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    username: "",
    bankLastDigits: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.username || !formData.bankLastDigits) {
      enqueueSnackbar("Vui lòng điền đầy đủ thông tin!", {
        variant: "error",
      });
      return;
    }

    setLoading(true);

    try {
      // First verify user credentials
      const userVerified = await checkUser(
        formData.username,
        formData.bankLastDigits
      );

      console.log(userVerified);

      if (!userVerified.valid) {
        enqueueSnackbar(
          userVerified.text_mess ?? "Thông tin tài khoản không chính xác!",
          {
            variant: "error",
          }
        );
        return;
      }

      localStorage.setItem("token", userVerified.result?.token);
      localStorage.setItem("resetToken", userVerified.result?.resetToken);
      localStorage.setItem("name", userVerified.result?.name);
      localStorage.setItem("username", userVerified.result?.account);

      onSuccess(formData);
    } catch (err) {
      enqueueSnackbar(err.message || "Có lỗi xảy ra. Vui lòng thử lại.", {
        variant: "error",
      });
      // setError(err.message || "Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Reset form when modal closes
  const handleClose = () => {
    setFormData({ username: "", bankLastDigits: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div
        className="relative w-full max-w-[387px] min-h-[387px] p-6 flex flex-col items-center justify-end"
        style={{
          backgroundImage: `url(${LoginBG})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <CloseModalButton
          onClick={loading ? () => {} : handleClose}
          className={`absolute top-6 right-6 cursor-pointer ${
            loading ? "opacity-50 animate-pulse cursor-not-allowed" : ""
          }`}
        />
        <div className="-translate-y-10 flex flex-col justify-center items-center gap-4">
          <h2 className=" text-center text-lg font-bold text-white w-[60%] uppercase">
            đăng nhập để tham gia điểm danh
          </h2>
          <div className="flex w-full flex-col justify-center items-center gap-3 mt-1">
            <div
              className="flex items-center gap-2 px-3 py-2 w-[90%] mx-auto"
              style={{
                borderRadius: "8px",
                border: "0.8px solid #F48631",
                background: "#FFF",
                boxShadow: "0px 4px 4px 0px #F4B331",
              }}
            >
              <input
                type="text"
                placeholder="Vui lòng nhập tên tài khoản"
                className="flex-1 bg-transparent outline-none text-[#383838]"
                value={formData.username}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, username: e.target.value }))
                }
              />
            </div>

            <div
              className="flex items-center gap-2 px-3 py-2 w-[90%] mx-auto"
              style={{
                borderRadius: "8px",
                border: "0.8px solid #F48631",
                background: "#FFF",
                boxShadow: "0px 4px 4px 0px #F4B331",
              }}
            >
              <input
                type="text"
                placeholder="Nhập 4 số cuối STK ngân hàng"
                className="flex-1 bg-transparent outline-none text-[#383838]"
                maxLength="4"
                value={formData.bankLastDigits}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    bankLastDigits: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>

        <div
          className={`mt-4 flex justify-center absolute -bottom-6 cursor-pointer ${
            loading ? "opacity-50 animate-pulse cursor-not-allowed" : ""
          }`}
        >
          <Button
            onClick={loading ? () => {} : handleSubmit}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckUserModal;
