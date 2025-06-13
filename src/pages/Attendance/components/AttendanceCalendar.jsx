import ButtonBG from "../../../assets/images/button-bg.png";
import useSubmitAttendance from "../../../hooks/useSubmitAttendance";
import AttendanceCalendar from "./CustomDatePicker";
import RecieveReward from "./RecieveReward";

function CustomButton({ onClick, text, disabled, ...rest }) {
  return (
    <div
      className={`relative w-[105px] h-[36px] scale-100 hover:scale-125 transition-all  ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={disabled ? () => {} : onClick}
      {...rest}
    >
      <img
        className="absolute top-0 left-0"
        src={ButtonBG}
        alt="Button Background"
      />
      <p className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-white font-bold text-xs whitespace-nowrap">
        {text}
      </p>
    </div>
  );
}

function AttendanceButton() {
  const { mutate: submitAttendance, isPending } = useSubmitAttendance();

  function handleAttendance() {
    submitAttendance();
  }

  return (
    <CustomButton
      onClick={handleAttendance}
      text="ĐIỂM DANH"
      disabled={isPending}
    />
  );
}

function RuleButton({ onClick }) {
  return <CustomButton onClick={onClick} text="QUY TẮC" />;
}

export default function AttendanceCalendarScreen({ ruleBtnOnClick }) {
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
        ĐIỂM DANH NHẬN THƯỞNG
      </h2>
      <div className="flex my-3 gap-8 justify-center">
        <AttendanceButton />
        <RuleButton onClick={ruleBtnOnClick} />
      </div>
      <AttendanceCalendar />
      <RecieveReward />
    </div>
  );
}
