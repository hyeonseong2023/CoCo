import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Toolbar from "./Calendar/Toolbar";

const MyCalendar = () => {
  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);

  return (
    <Calendar
      localizer={localizer}
      style={{ height: 500, width: 500 }}
      components={{
        toolbar: Toolbar,
      }}
    />
  );
};

export default MyCalendar;
