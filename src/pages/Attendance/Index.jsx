import AttendanceCalendarScreen from "./components/AttendanceCalendar";
import EventDetail from "./components/EventDetail";
import { useState } from "react";

export default function Attendance() {
  const [isShowDetail, setIsShowDetail] = useState(false);

  function hideDetail() {
    setIsShowDetail(false);
  }

  function showDetail() {
    setIsShowDetail(true);
  }

  return (
    <div>
      {!isShowDetail && (
        <AttendanceCalendarScreen ruleBtnOnClick={showDetail} />
      )}
      <EventDetail isOpen={isShowDetail} onClose={hideDetail} />
    </div>
  );
}
