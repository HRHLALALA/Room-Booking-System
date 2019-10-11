import React from 'react';
import { Table } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
let rooms = [
    { name: "202", id: "202" },
    { name: "203", id: "203" },
    { name: "204", id: "204" },
    { name: "205", id: "205" },
    { name: "206", id: "206" },
    { name: "207", id: "207" }];

let reservations = [{
    id: 1,
    roomid: "202",
    start: '14:30',
    end: '16:00'
}, {
    id: 2,
    roomid: "203",
    start: '16:30',
    end: '17:30',
},
{
    id: 3,
    roomid: "202",
    start: '11:30',
    end: '14:00'
},
    ,
{
    id: 4,
    roomid: "204",
    start: '11:30',
    end: '14:00'
}]



class scheduleTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
            rooms: rooms,
            reservations: reservations,
            slot_height: "2rem"
        }
    }
    render() {
        return (<div id="ScheduleTable">
            <DatePicker className="schedule-time-picker" calendarClassName="schedule-calendar"
                value={this.state.currentDate}
                onChange={date => this.setState({ currentDate: date })}
            />
            <div>
                <div id="ScheduleTable-middle">
                    <Table bordered id="eventTable" className="outer-table first">
                        <thead>
                            <tr>
                                <th className="col-axis first-row">

                                </th>
                                {this.state.rooms.map((item) => <th>{item.name}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            <Table bordered width="100%" className="outer-table second">
                                <tbody>
                                    {this.renderCalendar()}
                                </tbody>
                            </Table>

                            <Table borderless width="100%" id="event-slot-table">

                                <tbody>
                                    {this.renderEventSlots()}
                                </tbody>
                            </Table>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div >);
    }
    renderCalendar() {
        let rowlist = [];
        for (let i = 7; i <= 17; i++) {
            rowlist.push(
                <tr >
                    <td rowspan={2} className="col-axis" >
                        {i + ":00"} - {i + 1 + ":00"}
                    </td>
                    {this.state.rooms.map((item) =>
                        <td style={{ height: this.state.slot_height }}></td>
                    )}

                </tr >

            );
            rowlist.push(
                <tr>

                    {this.state.rooms.map((item) =>
                        <td style={{ height: this.state.slot_height }}>

                        </td>
                    )}

                </tr >

            );
        }
        //console.log(time_list);
        //rowlist.push(this.renderCalendarRow(time_frame));
        //let a = document.getElementById();
        //console.log(time_list);
        //a.insertCell(0); 
        return rowlist;

    }

    renderEventSlots() {
        let res_dict = {}
        this.state.rooms.map((room) => {
            res_dict[room.id] = [];
        })

        this.state.reservations.map((res) => {
            res_dict[res.roomid].push(res);
        });
        console.log(res_dict);
        let rowlist = [];
        rowlist.push(
            <tr>
                <td className="col-axis">

                </td>

                {this.state.rooms.map((room) => {
                    return <td >
                        {res_dict[room.id].map((item) =>
                            <div className="event-slot-wrap">
                                <a className="event-slot"
                                    style={{
                                        top: this.getSlotCardPosition(item.start, item.end)[0] + "rem",
                                        bottom: "-" + this.getSlotCardPosition(item.start, item.end)[1] + "rem"
                                    }}
                                >
                                    <div>
                                        <div class="fc-time" data-start={item.start} data-full="6:00 PM - 9:00 PM">
                                            {item.roomid}

                                        </div>
                                        <div>
                                            {item.start} - {item.end}
                                        </div>


                                    </div>
                                </a>
                            </div>
                        )}
                    </td>
                })}

                {/* <td>
                    <div className="event-slot-wrap">
                        <a className="event-slot">
                            <div>
                                <div class="fc-time" data-start="6:00" data-full="6:00 PM - 9:00 PM">
                                    <span>6:00 - 9:00</span>
                                    <span style={{ "position": "absolute", "right": "2px" }}>Wks 1-3, 5-11</span>
                                </div>
                                <div class="fc-title">COMP9444 - LEC</div>
                                <div class="fc-title">CLB 7</div>
                            </div>
                        </a>
                    </div>
                </td> */}

            </tr>
        );

        return rowlist;
    }

    getSlotCardPosition(start, end) {
        let [shour, smin] = start.split(':');
        console.log(smin);
        let [ehour, emin] = end.split(':');
        let start_height = ((Number(shour) - 7) * 2 + Number(smin) / 30) * Number(this.state.slot_height[0]);
        let end_height = ((Number(ehour) - 7) * 2 + Number(emin) / 30) * Number(this.state.slot_height[0]);

        return [start_height, end_height];
    }
}
export default scheduleTable;