import React, { useCallback, useEffect, useRef, useState } from "react";
//import { render } from "react-dom";
import Tsidebar from "../../comm/Sidebar/Tsidebar";
import { Button } from "react-bootstrap";

import { useSelector } from "react-redux";
import TUICalendar from "@toast-ui/react-calendar";
import * as authAPI from "../../lib/api/auth";
import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

import "./styles.css";

const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 30));

// const schedules = [
//   {
//     calendarId: "1",
//     category: "time",
//     isVisible: true,
//     title: "Study",
//     id: "1",
//     body: "Test",
//     start,
//     end,
//   },
//   {
//     calendarId: "2",
//     category: "time",
//     isVisible: true,
//     title: "Meeting",
//     id: "2",
//     body: "Description",
//     start: new Date(new Date().setHours(start.getHours() + 1)),
//     end: new Date(new Date().setHours(start.getHours() + 2)),
//   },
// ];

const calendars = [
  {
    id: "1",
    name: "일정",
    color: "#ffffff",
    bgColor: "#9e5fff",
    dragBgColor: "#9e5fff",
    borderColor: "#9e5fff",
  },
  {
    id: "2",
    name: "예약",
    color: "#ffffff",
    bgColor: "#00a9ff",
    dragBgColor: "#00a9ff",
    borderColor: "#00a9ff",
  },
];

function Scheduler() {
  const {} = useSelector();

  const storeid = "2";
  const schedules = authAPI.schedulelist(storeid);

  const cal = useRef(null);

  const onClickSchedule = useCallback((e) => {
    const { calendarId, id } = e.schedule;
    const el = cal.current.calendarInst.getElement(id, calendarId);

    console.log(e, el.getBoundingClientRect());
  }, []);

  const onBeforeCreateSchedule = useCallback(async (scheduleData) => {
    console.log(
      "프론트에서 schedule에서 onBeforeCreateSchedule로 넘어오는 데이터",
      scheduleData
    );

    const schedule = {
      storeid: "2",
      title: scheduleData.title,
      isAllDay: scheduleData.isAllDay,
      start: scheduleData.start.toDate(),
      end: scheduleData.end.toDate(),
      category: scheduleData.isAllDay ? "allday" : "time",
      dueDateClass: "",
      location: scheduleData.location,
      raw: {
        class: scheduleData.raw["class"],
      },
      state: scheduleData.state,
    };

    console.log("프론트에서 서버로 보내는 schedule 생성 데이터", schedule);

    const result = await authAPI.schedule(schedule);

    console.log(result);

    cal.current.calendarInst.createSchedules([schedule]);
  }, []);

  const onBeforeDeleteSchedule = useCallback((res) => {
    console.log(res);

    const { id, calendarId } = res.schedule;

    cal.current.calendarInst.deleteSchedule(id, calendarId);
  }, []);

  const onBeforeUpdateSchedule = useCallback((e) => {
    console.log(e);

    const { schedule, changes } = e;

    cal.current.calendarInst.updateSchedule(
      schedule.id,
      schedule.calendarId,
      changes
    );
  }, []);

  function _getFormattedTime(time) {
    const date = new Date(time);
    const h = date.getHours();
    const m = date.getMinutes();

    return `${h}:${m}`;
  }

  function _getTimeTemplate(schedule, isAllDay) {
    var html = [];

    if (!isAllDay) {
      html.push("<strong>" + _getFormattedTime(schedule.start) + "</strong> ");
    }
    if (schedule.isPrivate) {
      html.push('<span class="calendar-font-icon ic-lock-b"></span>');
      html.push(" Private");
    } else {
      if (schedule.isReadOnly) {
        html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
      } else if (schedule.recurrenceRule) {
        html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
      } else if (schedule.attendees.length) {
        html.push('<span class="calendar-font-icon ic-user-b"></span>');
      } else if (schedule.location) {
        html.push('<span class="calendar-font-icon ic-location-b"></span>');
      }
      html.push(" " + schedule.title);
    }

    return html.join("");
  }

  const templates = {
    time: function (schedule) {
      //console.log(schedule);
      return _getTimeTemplate(schedule, false);
    },
  };

  // // 상태 초기값
  // const initialState = {
  //   currentRange: {
  //     year: start.getFullYear(),
  //     month: start.getMonth() + 1, //월은 0부터 시작한다...
  //     isToday: true,
  //   },
  //   calendarDataFormPopup: {
  //     type: '',
  //     isOpen: false,
  //   },
  // };

  //뷰 클릭시 맞게 변경하기 위해 useState 주기

  // if (value !== 20) {
  //   setValue(cal.current.calendarInst.getDate().getMonth());
  // }

  const [month, setMonth] = useState(start.getMonth());
  const [year, setYear] = useState(start.getFullYear());

  const viewBtnClick = (e) => {
    const calendarInstance = cal.current.getInstance();
    console.log("month", cal.current.calendarInst.getDate());
    //.toDate()
    switch (e.target.name) {
      case "prev": {
        calendarInstance.prev();
        setMonth(cal.current.calendarInst.getDate().getMonth());
        setYear(cal.current.calendarInst.getDate().getFullYear());
        return;
      }

      case "next": {
        calendarInstance.next();
        setMonth(cal.current.calendarInst.getDate().getMonth());
        setYear(cal.current.calendarInst.getDate().getFullYear());
        return;
      }
    }
  };

  // useEffect(() => {
  //   setValue(cal.current.calendarInst.getDate().getMonth());
  //   console.log("cal!!!!", cal.current.calendarInst.getDate().getMonth());
  // }, [cal.current]);

  console.log("cal", cal.current);

  return (
    <>
      <div className="App">
        <div className="mb-3 mt-3">
          <h2>
            {year}년 {month + 1}월
          </h2>
          <Button className="ml-3" onClick={viewBtnClick} name="prev">
            이전
          </Button>
          <Button className="ml-3" onClick={viewBtnClick} name="next">
            다음
          </Button>
        </div>
        <TUICalendar
          ref={cal}
          height="1000px"
          view="month"
          useCreationPopup={true}
          useDetailPopup={true}
          template={templates}
          calendars={calendars}
          schedules={schedules}
          onClickSchedule={onClickSchedule}
          onBeforeCreateSchedule={onBeforeCreateSchedule}
          onBeforeDeleteSchedule={onBeforeDeleteSchedule}
          onBeforeUpdateSchedule={onBeforeUpdateSchedule}
        />
      </div>
    </>
  );
}

export default Scheduler;

// const rootElement = document.getElementById("root");
// render(<App />, rootElement);
