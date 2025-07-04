import { useState } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import useAttendance from "../../../hooks/useAttendance";

const AttendanceCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const { attendance } = useAttendance();
  const attendanceData =
    attendance?.data?.result.map((item) => ({
      ...item,
      date: new Date(item?.date),
      start: new Date(item?.start),
      end: new Date(item?.end),
    })) || [];

  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);

      console.log("newDate", newDate);
      return newDate;
    });
  };

  const getAttendanceForDate = (day) => {
    // Check for single day attendance
    const singleDay = attendanceData.find((item) => {
      if (
        item.type === "single" &&
        item.date.getMonth() === currentDate.getMonth() &&
        item.date.getFullYear() === currentDate.getFullYear()
      ) {
        const date = item.date.getDate();
        return date === day;
      }
      return false;
    });
    if (singleDay) return singleDay;

    // Check for range attendance
    const range = attendanceData.find((item) => {
      if (
        item.type === "range" &&
        item.start.getFullYear() === currentDate.getFullYear()
      ) {
        const start = item.start.getDate();
        const end = item.end.getDate();
        const startMonth = item.start.getMonth();
        const endMonth = item.end.getMonth();
        const currentMonth = currentDate.getMonth();

        if (currentMonth === startMonth && currentMonth === endMonth) {
          return day >= start && day <= end;
        }

        if (startMonth < endMonth) {
          if (currentMonth === startMonth) {
            return day >= start;
          }
          if (currentMonth === endMonth) {
            return day <= end;
          }
        }
      }
      return false;
    });
    return range;
  };

  const isRangeStart = (day) => {
    return attendanceData.some((item) => {
      if (
        item.type === "range" &&
        item.start.getMonth() === currentDate.getMonth() &&
        item.start.getFullYear() === currentDate.getFullYear()
      ) {
        const start = item.start.getDate();
        return start === day;
      }
      return false;
    });
  };

  const isRangeEnd = (day) => {
    return attendanceData.some((item) => {
      if (
        item.type === "range" &&
        item.end.getMonth() === currentDate.getMonth() &&
        item.end.getFullYear() === currentDate.getFullYear()
      ) {
        const end = item.end.getDate();
        return end === day;
      }
      return false;
    });
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Previous month's trailing days
    const prevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );
    const prevMonthDays = prevMonth.getDate();

    for (let i = firstDay - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      days.push(
        <button
          key={`prev-${day}`}
          className="w-12 h-12 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
          disabled
        >
          {day}
        </button>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const attendance = getAttendanceForDate(day);
      const isStart = isRangeStart(day);
      const isEnd = isRangeEnd(day);

      let dayClass = `w-12 h-12 flex items-center justify-center relative transition-all text-gray-800 hover:bg-gray-100 ${
        currentDate.getDate() === day
          ? "border-2 border-[#0E6A7E] rounded-lg"
          : ""
      }`;

      if (attendance) {
        dayClass = `w-12 h-12 flex items-center justify-center relative transition-all ${
          isStart || isEnd || attendance.type === "single"
            ? "text-white font-semibold"
            : "bg-cyan-100 text-cyan-700"
        }`;
      }

      days.push(
        <button
          key={day}
          className={dayClass}
          style={{
            borderRadius: isStart
              ? "7.521px 0px 0px 7.521px"
              : isEnd
              ? "0px 7.521px 7.521px 0px"
              : attendance?.type === "single"
              ? "7.521px"
              : "",
            background:
              isStart || isEnd || attendance?.type === "single"
                ? "radial-gradient(89.67% 89.67% at 28.57% 17.14%, #74E7FF 0%, #00A3C6 100%)"
                : "",
            boxShadow:
              isStart || isEnd || attendance?.type === "single"
                ? "0.94px 7.521px 10.341px -0.94px rgba(223, 81, 21, 0.47)"
                : "",
          }}
        >
          {day}
          {attendance && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-current rounded-full opacity-60"></div>
          )}
        </button>
      );
    }

    const remainingCells = 42 - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <button
          key={`next-${day}`}
          className="w-12 h-12 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
          disabled
        >
          {day < 10 ? `0${day}` : day}
        </button>
      );
    }

    return days;
  };

  return (
    <div
      className="max-w-md mx-auto p-6"
      style={{
        borderRadius: "18.802px",
        border: "1.41px solid rgba(255, 255, 255, 0.28)",
        background:
          "linear-gradient(142deg, rgba(254, 248, 255, 0.56) 1.79%, rgba(254, 248, 255, 0.40) 100.42%)",
        boxShadow:
          "-4.7px -4.7px 14.101px 0px #9EE5F5 inset, 4.7px 4.7px 11.281px 0px #FFF inset",
        backdropFilter: "blur(35.2px)",
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 hover:bg-white/50 rounded-lg transition-colors"
        >
          <FaAngleLeft />
        </button>

        <div className="flex items-center space-x-2">
          <FaCalendarAlt />
          <h2 className="text-lg font-medium text-gray-800">
            {currentDate.getFullYear()}/
            {String(currentDate.getMonth() + 1).padStart(2, "0")}
          </h2>
        </div>

        <button
          onClick={() => navigateMonth(1)}
          className="p-2 hover:bg-white/50 rounded-lg transition-colors"
        >
          <FaAngleRight />
        </button>

        <div className="text-gray-600 font-medium">hôm nay</div>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {dayNames.map((day, index) => (
          <div
            key={day}
            className={`h-8 flex items-center justify-center text-sm font-medium ${
              index === 0 || index === 6 ? "text-cyan-500" : "text-gray-600"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 mb-4">{renderCalendarDays()}</div>
    </div>
  );
};

export default AttendanceCalendar;
