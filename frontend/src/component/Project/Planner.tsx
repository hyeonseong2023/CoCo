import React, { useContext, useEffect, useState } from 'react';
import './css/Planner.css';
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  EventInput,
} from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import PlannerModal from './PlannerModal';
import { ProjectContext } from './context/ProjectContext';
import { onValuePlanner, updatePlanner } from './functions/firebaseCRUD';

const Planner = ({ initialEvents }: { initialEvents: EventInput[] }) => {
  const projectId = useContext(ProjectContext);
  if (!projectId) {
    throw new Error('Context must be used within a ProjectProvider');
  }
  const [data, setData] = useState<EventInput[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<DateSelectArg | EventClickArg>();
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    onValuePlanner(`projects/${projectId}/planner`, setData);
  }, []);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setEdit(true);
    setSelected(selectInfo);
    selectInfo.view.calendar.unselect();
    openModal();
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    setEdit(false);
    setSelected(clickInfo);
    openModal();
  };

  const handleEvents = (events: EventApi[]) => {
    // if (events.length > 0) {
    //   const newEvents = events.map((item) => {
    //     return {
    //       id: item.id,
    //       title: item.title,
    //       start: item.startStr,
    //       end: item.endStr,
    //       allDay: item.allDay,
    //       extendedProps: item.extendedProps,
    //     };
    //   });
    //   updatePlanner(`projects/${projectId}/planner/${newEvents.id}`, newEvents);
    // }
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
            locale={'ko'}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              listPlugin,
              interactionPlugin,
            ]}
            buttonText={{ today: 'Today' }}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
            }}
            initialView="dayGridMonth"
            dragScroll={true}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            initialEvents={initialEvents}
            events={data}
            select={handleDateSelect}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
            eventsSet={handleEvents}
          />
        </div>
      </div>
    </div>
  );
};

export default Planner;
