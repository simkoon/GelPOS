import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
//import { render } from "react-dom";
import Tsidebar from "../../comm/Sidebar/Tsidebar";
import { Button } from "react-bootstrap";

import { useSelector } from "react-redux";
import TUICalendar from "@toast-ui/react-calendar";
import * as authAPI from "../../lib/api/scheduler";
import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

import "./styles.css";

const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 30));

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
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  const [schedules, setSchedules] = useState(1);

  //렌더링 될때 데이터에서 스케줄 리스트 뽑아오기
  const listAdd = async () => {
    // 리스트 뽑아오기
    const storeid = user.nowstore;
    console.log(storeid);
    const result = await authAPI.schedulelist(storeid);
    console.log("서버에서 넘어오는 scheduler데이터", result.data);
    setSchedules(result.data.Schedulelist);
    console.log("schedules 값", schedules);
  };

  // 첫 렌더링떄 실행
  useEffect(() => {
    listAdd();
  }, []);

  const cal = useRef(null);

  const onClickSchedule = useCallback((e) => {
    const { calendarId, id } = e.schedule;
    const el = cal.current.calendarInst.getElement(id, calendarId);

    console.log(e, el.getBoundingClientRect());
  }, []);

  // 데이터 생성
  const onBeforeCreateSchedule = useCallback(async (scheduleData) => {
    console.log(
      "프론트에서 schedule에서 onBeforeCreateSchedule로 넘어오는 생성 데이터",
      scheduleData
    );

    const schedule = {
      title: scheduleData.title,
      isAllDay: scheduleData.isAllDay,
      start: scheduleData.start.toDate(),
      end: scheduleData.end.toDate(),
      category: scheduleData.isAllDay ? "allday" : "time",
      calendarId: scheduleData.calendarId,
      dueDateClass: "",
      location: scheduleData.location,
      raw: {
        class: scheduleData.raw["class"],
      },
      state: scheduleData.state,
    };

    console.log("프론트에서 서버로 보내는 schedule 생성 데이터", schedule);

    const result = await authAPI.scheduleAdd(schedule);

    console.log("서버에서 리턴 받은 schedule 생성 데이터", result);

    //cal.current.calendarInst.createSchedules([schedule]);
    listAdd();
  }, []);

  // 데이터 삭제시
  const onBeforeDeleteSchedule = useCallback(async (res) => {
    console.log(
      "schedule에서 onBeforeDeleteSchedule 넘어오는 삭제 데이터",
      res
    );

    const { id, calendarId } = res.schedule;

    console.log(id, "-----", calendarId);

    // const delData = {
    //   id: id,
    //   calendarId: calendarId,
    // };

    const result = await authAPI.scheduleDel(id, calendarId);

    //cal.current.calendarInst.deleteSchedule(id, calendarId);

    listAdd();
  }, []);

  // 데이터 수정시
  const onBeforeUpdateSchedule = useCallback(async (e) => {
    console.log("schedule에서 onBeforeUpdateSchedule 넘어오는 수정 데이터 ", e);

    const { schedule, changes } = e;

    // title: scheduleData.title,
    //   isAllDay: scheduleData.isAllDay,
    //   start: scheduleData.start.toDate(),
    //   end: scheduleData.end.toDate(),
    //   category: scheduleData.isAllDay ? "allday" : "time",
    //   calendarId: scheduleData.calendarId,
    //   dueDateClass: "",
    //   location: scheduleData.location,
    //   raw: {
    //     class: scheduleData.raw["class"],
    //   },
    //   state: scheduleData.state,

    const updateSchedule = {
      id: schedule.id,
      title: changes.title ? changes.title : schedule.title,
      location: changes.location ? changes.location : schedule.location,
      calendarId: schedule.calendarId,
      dueDateClass: schedule.dueDateClass,
      raw: schedule.raw,
      category: changes.category ? changes.category : schedule.category,
      start: changes.start ? changes.start.toDate() : schedule.start.toDate(),
      end: changes.end ? changes.end.toDate() : schedule.end.toDate(),
      state: schedule.state,
      isAllDay: !(changes.isAllDay === null || changes.isAllDay === undefined)
        ? changes.isAllDay
        : schedule.isAllDay,
    };

    console.log("수정 후 값 : ", updateSchedule);

    await authAPI.scheduleUpdate(updateSchedule);

    // cal.current.calendarInst.updateSchedule(
    //   schedule.id,
    //   schedule.calendarId,
    //   changes
    // );
    listAdd();
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

  //console.log("cal", cal.current);

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
          height="70vh"
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
