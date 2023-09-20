import React, { useEffect, useState } from "react";
import "./Planner.css";
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  EventAddArg,
  EventInput,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import uuid from "react-uuid";
import { addPlanner, removePlanner } from "./functions/firebaseCRUD";
import PlannerModal from "./PlannerModal";

const Planner = ({ initialEvents }: { initialEvents: EventInput[] }) => {
  const [data, setData] = useState<EventApi[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<DateSelectArg | EventClickArg>();
  // let edit = false;
  const [edit, setEdit] = useState(false);

  useEffect(() => {}, []);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    // edit = true;
    setEdit(true);
    setSelected(selectInfo);
    selectInfo.view.calendar.unselect();
    openModal();
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    // edit = false;
    setEdit(false);
    setSelected(clickInfo);
    openModal();
    // if (
    //   // eslint-disable-next-line no-restricted-globals
    //   confirm(
    //     `Are you sure you want to delete the event '${clickInfo.event.title}'`
    //   )
    // ) {
    //   console.log(clickInfo.event.id);
    //   removePlanner("projects/12345/planner/" + clickInfo.event.id);
    //   clickInfo.event.remove();
    // }
  };

  const handleEvents = (events: EventApi[]) => {
    setData(events);
  };

  const renderEventContent = (eventContent: EventContentArg) => {
    return (
      <>
        <b>{eventContent.timeText}</b>
        <i>{eventContent.event.title}</i>
      </>
    );
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <PlannerModal
        open={modalOpen}
        close={closeModal}
        selected={selected}
        edit={edit}
        setEdit={setEdit}
        header="제목 : "
      ></PlannerModal>

      <div className="demo-app">
        <div className="demo-app-main">
          <FullCalendar
            locale={"ko"}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              listPlugin,
              interactionPlugin,
            ]}
            buttonText={{ today: "Today" }}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            dragScroll={true}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            initialEvents={initialEvents} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          />
        </div>
      </div>
    </div>
  );
};

export default Planner;
