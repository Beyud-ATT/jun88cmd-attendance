import { FaFire } from "react-icons/fa";
import { Button, MedalIcon, MoneyPouch, StackMoney } from "../../../utils/svg";

export default function EventDetail({ isOpen, onClose }) {
  const benefits = [
    {
      icon: <StackMoney />,
      text: "Mỗi ngày nạp tối thiểu 300 điểm",
    },
    {
      icon: <MoneyPouch />,
      text: "Tổng cược hợp lệ thể thao trong ngày đạt ≥ 900 điểm",
    },
    {
      icon: <FaFire className="text-orange-500" />,
      text: "Mỗi ngày đăng nhập thành viên đạt đủ điều kiện trên sẽ nhận được code miễn phí vào các mốc thời lùy có định trong tháng.",
    },
  ];

  const rewards = [
    { days: "Thưởng 3 ngày+", icon: <MedalIcon /> },
    { days: "Thưởng 7 ngày+", icon: <MedalIcon /> },
    { days: "Thưởng 14 ngày+", icon: <MedalIcon /> },
    { days: "Thưởng 21 ngày+", icon: <MedalIcon /> },
    { days: "Thưởng 28 ngày+", icon: <MedalIcon /> },
  ];

  const codes = [
    { days: "3+", code: "CODE88" },
    { days: "7+", code: "CODE188" },
    { days: "14+", code: "CODE288" },
    { days: "21+", code: "CODE588" },
    { days: "28+", code: "CODE888" },
  ];

  return (
    isOpen && (
      <>
        <h2
          className="mt-6 mb-3"
          style={{
            color: "#25ABE0",
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "900",
            lineHeight: "normal",
            letterSpacing: "0.72px",
          }}
        >
          CHI TIẾT SỰ KIỆN
        </h2>
        <div
          className="max-w-md mx-auto p-6"
          style={{
            borderRadius: "18.802px",
            border: "1.41px solid rgba(255, 255, 255, 0.28)",
            background:
              "linear-gradient(142deg, rgba(254, 248, 255, 0.56) 1.79%, rgba(254, 248, 255, 0.40) 100.42%)",
            boxShadow: "4.7px 4.7px 11.281px 0px #FFF inset",
            backdropFilter: "blur(35.20000076293945px)",
          }}
        >
          {/* Header */}
          <div
            className="rounded-xl px-4 py-2 text-white mb-6"
            style={{
              borderRadius: "10px",
              background: "#26A8DF",
              boxShadow:
                "0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 0px 15px 0px #0072A2 inset",
            }}
          >
            <h2 className="text-lg font-bold">Thể lệ tham gia đơn giản:</h2>
          </div>

          {/* Benefits Section */}
          <div className="space-y-2 mb-2">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-1">{benefit.icon}</div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>

          {/* Rewards Section */}
          <div className="space-y-3 mb-6">
            {rewards.map((reward, index) => (
              <div key={index} className="flex items-center gap-3">
                {reward.icon}
                <span className="text-gray-700 text-sm">{reward.days}</span>
              </div>
            ))}
          </div>

          {/* Clock Icon and Text */}
          <div className="flex items-center gap-3 mb-3">
            <p className="text-gray-700 text-sm">
              ⏰ Tích lũy đều tay để nhận Code ngay nhé!
            </p>
          </div>

          {/* Code Table */}
          <div
            className="mb-6"
            style={{
              borderRadius: "4px",
              border: "1px solid #003451",
              background:
                "linear-gradient(357deg, #1675C3 2.65%, #1C8CCA 97.01%)",
            }}
          >
            <div className="grid grid-cols-6 text-white text-xs border-collapse">
              {/* Header Row */}
              <div className="text-center border-r border-blue-300 py-2">
                <div className="font-semibold">Số ngày</div>
                <div className="font-semibold">đăng nhập</div>
              </div>
              {codes.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-center py-2 ${
                    index < codes.length - 1 ? "border-r border-blue-300" : ""
                  }`}
                >
                  <div className="font-semibold">{item.days}</div>
                </div>
              ))}

              {/* Separator line */}
              <div className="col-span-6 border-t border-blue-300"></div>

              {/* Second Row */}
              <div className="text-center font-semibold border-r border-blue-300 py-2">
                Thưởng
              </div>
              {codes.map((item, index) => (
                <div
                  key={index}
                  className={`text-center font-semibold py-2 ${
                    index < codes.length - 1 ? "border-r border-blue-300" : ""
                  }`}
                >
                  {item.code}
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div
            className="flex justify-center cursor-pointer scale-100 hover:scale-105 transition-all"
            onClick={onClose}
          >
            <Button text="ĐÃ HIỂU" />
          </div>
        </div>
      </>
    )
  );
}
