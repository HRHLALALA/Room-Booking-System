import React from 'react';
import { Table } from 'react-bootstrap';

let rooms = [
    { name: "202", id: "202" },
    { name: "203", id: "203" },
    { name: "204", id: "204" }];

let reservations = [{
    id: 1,
    room: "202",
    start: '14:30',
    end: '16:00'
}, {
    id: 2,
    room: "202",
    start: '16:30',
    end: '17:30',
}]



class scheduleTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
            rooms: rooms,
            reservations: reservations,
        }
    }
    render() {
        return (<div id="ScheduleTable">
            <Table bordered width="100%" >
                <thead>
                    <tr>
                        <th></th>
                        {this.state.rooms.map((item) => <th>{item.name}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {this.renderCalendar()}
                </tbody>
            </Table>

        </div >);
    }
    renderCalendar() {
        let time_list = {};
        for (let i = 7; i <= 17; i++) {
            let start_time = i.toString()
                + ":00";
            time_list[start_time] = [];
            start_time = i.toString() + ":30";
            time_list[start_time] = [];
        }
        console.log(time_list);
        reservations.map((item) => {
            let [start_hour, start_minute] = item.start.split(":");
            let [end_hour, end_minute] = item.end.split(":");
            let hour = Number(end_hour) - Number(start_hour);
            let half_hour = Number(end_minute) - Number(start_minute);
            //for 

            let n = hour * 2 + half_hour / 30;
            for (let i = 0; i < n; i++) {
                time_list[start_hour + ":" + start_minute].push(item.room);
                if (start_minute == "30") {
                    start_hour = (Number(start_hour) + 1).toString();
                    start_minute = "00";
                }
                else {
                    start_minute = "30";
                }
            }
        });
        let rowlist = [];
        for (let i = 7; i <= 17; i++) {
            rowlist.push(this.renderCalendarRow(time_list, i.toString()));
        }
        console.log(time_list);
        //rowlist.push(this.renderCalendarRow(time_frame));
        //let a = document.getElementById();
        //console.log(time_list);
        //a.insertCell(0);
        return rowlist;

    }
    renderCalendarRow(time_list, hour) {
        let rowlist = [];
        let time = hour + ":00";
        rowlist.push(<tr id={time}><td rowspan={2} width="10%">
            {time}</td>{this.state.rooms.map((item) => {
                if (time_list[time].indexOf(item.name) != -1) {
                    return <td
                        style={{
                            "background-color": "orange",
                            "opacity": 0.5,
                            "border-bottom": "0px solid transparent",
                            "border-top": "0px solid transparent"
                        }}></td>
                }
                else {
                    return <td style={{ "border-bottom": "1px solid transparent" }}></td>
                }
            })}</tr>)
        time = hour + ":30";
        rowlist.push(<tr id={time}>{this.state.rooms.map((item) => {
            if (time_list[time].indexOf(item.name) != -1) {
                return <td style={{
                    "background-color": "orange",
                    "border-bottom": "0px solid transparent",
                    "opacity": 0.5,
                    "border-top": "0px solid transparent"
                }}></td>
            }
            else {
                return <td></td>
            }
        })}</tr>)
        return rowlist;
    }

}
export default scheduleTable;