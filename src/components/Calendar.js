import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import resumeAllCalendar from '../js/ApiCalendarGoogle';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

export default class Calendar extends React.Component {

  calendarComponentRef = React.createRef()
  state = {
    calendarWeekends: true,
    calendarEvents: [ // initial event data
      { title: 'Event Now', start: new Date() }
    ]
  }
  componentDidMount() {
    const corDosEventos = ["#c01657", "#8880D9", "#6CB03D", "#E1614E", "#E7C32B", "#BB2E25", "#AB59D6", "#6F6456", "#85bf0b"];
    let eventosParaOcalendario = [];
    //const mobile = window.innerWidth < 769;
    resumeAllCalendar().then(data => {
      JSON.parse(data).forEach((element, i) => {
        element.items.forEach((item, j) => {
          if (item.hasOwnProperty("start")) {
            eventosParaOcalendario.push({
              title: item.sumary,//(mobile) ? "" : item.sumary,
              start: item.start.dateTime,
              end: item.end.dateTime,
              textColor: "#FFF",
              backgroundColor: corDosEventos[i],
              borderColor: corDosEventos[i],
              extendedProps: { texto: item.sumary, place: element.place }
            });
          }
          // let end = item.start.dateTime.substr(0, item.end.dateTime.length - 6) + "Z";
          // let start = item.start.dateTime.substr(0, item.start.dateTime.length - 6) + "Z";
          //console.log(item);
        });
      });
      console.log(eventosParaOcalendario)
      this.setState({ calendarEvents: eventosParaOcalendario })
    });
  }

  render() {
    return (
      <div className='demo-app calendar'>
        <div className='demo-app-calendar'>
          <FullCalendar
            defaultView="timeGridFourDay"
            header={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridFourDay,timeGridDay'
            }}
            buttonText={
              {
                today: 'Hoje',
                month: 'Mês',
                week: 'Semana',
                day: 'Dia',
              }
            }
            views={
              {
                timeGridFourDay: {
                  type: 'timeGrid',
                  duration: { days: 3 },
                  buttonText: '3 dias'
                }
              }
            }
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            locale={'pt-br'}
            allDaySlot={false}
            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            events={this.state.calendarEvents}
            dateClick={this.handleDateClick}
          />
        </div>
      </div>
    )
  }

  toggleWeekends = () => {
    this.setState({ // update a property
      calendarWeekends: !this.state.calendarWeekends
    })
  }

  gotoPast = () => {
    let calendarApi = this.calendarComponentRef.current.getApi()
    calendarApi.gotoDate('2000-01-01') // call a method on the Calendar object
  }

  handleDateClick = (arg) => {
    if (window.confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      this.setState({  // add new event data
        calendarEvents: this.state.calendarEvents.concat({ // creates a new array
          title: 'New Event',
          start: arg.date,
          allDay: arg.allDay
        })
      })
    }
  }

}
