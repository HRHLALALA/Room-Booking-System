import React from 'react';
import Calendar from 'react-calendar';
import MyReservation from './../Component/myReservation';
import MeetingRooms from './../Component/MeetingRooms';
import './BookingPage.css';
import ReservationForm from './../Component/ReservationForm';
import { Modal } from 'react-bootstrap';
import roomlist from './../json/room.json';
import content_en from './../json/reservation_page_loading_en.json';
import content_cn from './../json/reservation_page_loading_cn.json';


class BookingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            update: false,
            date: new Date(),
            modalIsOpen: false,
            roomlist: roomlist,
            language_code: 0,
        }
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidUpdate() {
        if (this.state.update) {
            //todo update fetch

            this.setState({
                update: false,
            })
        }
    }

    componentDidMount() {
        // options = {
        //     method: 'GET',
        // }
        // fetch(url + path, options)
        //     .then(res => res.json())
        //     .then((data) => {

        //     })

    }

    onChange = date => this.setState({ date })
    render() {
        const content = this.state.language_code === 0 ? content_en : content_cn;
        const form_content = content.reservation_form;
        const meeting_room_content = content.meeting_room_content;
        const my_reservation_content = content.my_reservations_content;
        return (
            <div id="BookingPage">
                <div className="left">
                    <Calendar onChange={this.onChange}
                        className="calendar-inner"
                        maxDate={this.addDate(new Date(), 10)}
                        minDate={new Date()}
                        showFixedNumberOfWeeks
                        onClickDay={(value) => { this.handleCalendarClick(value) }}
                        navigationLabel={({ date, view, label }) => {
                            var dateInfolist = date.toDateString().split(' ');
                            var month = dateInfolist[1];
                            var year = dateInfolist[3];
                            return month + ' ' + year;
                        }}
                        tileClassName="calendar-inner-tile" />
                    <MyReservation content={my_reservation_content} id="MyReservation" roomlist={this.state.roomlist} />
                    <div>

                    </div>
                </div>

                <MeetingRooms content={meeting_room_content} onClick={this.handleMeetingRoomCardClick.bind(this)}
                    className="MeetingRooms" selectDate={this.formatDate(this.state.date)}
                    roomlist={this.state.roomlist} />
                <div id="reservationform">
                    <Modal
                        show={this.state.modalIsOpen}
                        centered animation
                        onRequestClose={this.closeModal}
                        onHide={this.closeModal}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                {form_content.title.show}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ReservationForm content={form_content} className="form" />
                        </Modal.Body>
                    </Modal>
                </div>
            </div >
        );
    }

    formatDate(date) {
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var year = date.getFullYear();
        var result = year.toString() + "/" + month.toString() + "/" + day.toString();
        return result;
    }
    addDate(date, day) {
        date.setDate(date.getDate() + day);
        return date;
    }
    handleCalendarClick(date) {
        // Todo Fetch code for calendar click
        // update meeting room
        console.log(date);
    }

    handleMeetingRoomCardClick(index) {
        console.log(index);
        this.setState({
            modalIsOpen: true,

        });
    }
    closeModal() {
        this.setState({
            modalIsOpen: false,
        });
    }
}

export default BookingPage;
