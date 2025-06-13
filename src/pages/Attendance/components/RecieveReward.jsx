import useAttendance from "../../../hooks/useAttendance";
import GameAwardBorder from "../../../assets/images/game-award-border.png";
import GameAwardBorderDisabled from "../../../assets/images/game-award-border-disabled.png";
import { enqueueSnackbar } from "notistack";

function RewardItem({
  disabled,
  streak = "...",
  point = "...",
  promoCode = null,
}) {
  return (
    <div
      className="w-[103px] h-[103px] flex flex-col justify-center items-center gap-2"
      style={{
        borderRadius: "10px",
        border: !disabled ? "4px solid #00A3C6" : "",
        background: !disabled
          ? "radial-gradient(76.96% 76.96% at 50.49% 23.04%, #D0FFFB 0%, #B8E4FF 100%)"
          : "linear-gradient(180deg, #FFF 0%, #C6CFD0 100%)",
        boxShadow: !disabled ? "2px 4px 3.2px 0px #00D6E5" : "",
      }}
    >
      <div className="relative flex flex-col justify-center items-center w-[53px] h-[53px]">
        <img
          src={disabled ? GameAwardBorderDisabled : GameAwardBorder}
          alt="Game Award Border"
          className="absolute top-0 left-0 w-[53px] h-[53px]"
        />
        <div
          className={`text-[9px] text-center font-bold flex flex-col ${
            !disabled ? "text-[#00374F]" : "text-[#838282]"
          }`}
        >
          <span>Thưởng</span>
          <span className="-translate-y-1">{streak}+ ngày</span>
        </div>

        <div
          style={{
            textAlign: "center",
            WebkitTextStrokeWidth: "0.5px",
            WebkitTextStrokeColor: !disabled ? "#015072" : "#535353",
            fontFamily: "UTM HelvetIns",
            fontSize: 7.518,
            fontStyle: "normal",
            fontWeight: 900,
            lineHeight: "115%",
            letterSpacing: "0.226px",
          }}
        >
          <p
            style={{
              background: !disabled
                ? "linear-gradient(180deg, #FFEA00 0%, #FFD900 100%)"
                : "",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            CODE{point}
          </p>
        </div>
      </div>

      <div
        onClick={(e) => {
          if (disabled) {
            enqueueSnackbar("Bạn chưa đạt mốc để nhận thưởng !!!", {
              variant: "error",
            });
            return;
          }

          navigator.clipboard.writeText(promoCode);
          e.target.classList.add("animate-pulse");
          setTimeout(() => {
            e.target.classList.remove("animate-pulse");
          }, 1000);
          enqueueSnackbar("Đã copy mã thành công !!!", {
            variant: "success",
          });
        }}
        className="w-[75px] h-[20px] flex items-center justify-center cursor-pointer hover:scale-110 transition-all"
        style={{
          borderRadius: "3px",
          border: "1px solid #FFF",
          background: disabled
            ? "linear-gradient(0deg, #9C9C9C 0%, #EAEAEA 100%)"
            : "linear-gradient(0deg, #00A3C6 0%, #67DEF8 100%)",
          boxShadow: !disabled ? "1px 1px 1.8px 1px #2FA9B7" : "",
        }}
      >
        <p className="text-[9px] font-medium text-white">
          {promoCode ? promoCode : "Chưa đạt mốc"}
        </p>
      </div>
    </div>
  );
}

export default function RecieveReward() {
  const { attendance } = useAttendance();
  const milestones = attendance?.data?.milestones;

  return (
    <div>
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
        TÍCH LŨY NHẬN THƯƠNG
      </h2>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="flex justify-end">
          <RewardItem {...milestones?.[0]} />
        </div>
        <div className="flex justify-start">
          <RewardItem {...milestones?.[1]} />
        </div>
        <div className="flex justify-end">
          <RewardItem {...milestones?.[2]} />
        </div>
        <div className="flex justify-start">
          <RewardItem {...milestones?.[3]} />
        </div>
        <div className="flex justify-center col-span-2">
          <RewardItem {...milestones?.[4]} />
        </div>
      </div>
    </div>
  );
}
