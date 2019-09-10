import React from 'react';
import reservations from './../json/reservations.json';
import { Toast, Modal, Button } from 'react-bootstrap';
class MyReservation extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.content)
        this.state = {
            content: this.props.content,
            selectRoom: 1,
            isDialogOpen: false,
            dialogType: 1, //1 == cancel reservation, 2 == cancel save
            error: null,
            isLoaded: false,
            reservations: reservations.my_reservations,
            savedRooms: reservations.my_saved_rooms,
        };
    }
    // componentDidMount() {
    //     fetch("http://localhost:3001/")
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 this.setState({
    //                     isLoaded: true,
    //                     items: result.reservations
    //                 });
    //             },
    //             // Note: it's important to handle errors here
    //             // instead of a catch() block so that we don't swallow
    //             // exceptions from actual bugs in components.
    //             (error) => {
    //                 this.setState({
    //                     isLoaded: false,
    //                     error
    //                 });
    //             }
    //         )
    // }

    render() {
        const reservations = this.state.reservations;
        const savedRooms = this.state.savedRooms;
        const reservation_content = this.state.content.my_reservation;
        const saved_content = this.state.content.my_saved_rooms;
        const modal_content = this.state.content.modal;
        // if (error) {
        //     return <div>Error: {error.message}</div>;
        // } else if (!isLoaded) {
        //     return <div>Loading...</div>;
        // }
        return (
            <div className={this.props.id}>

                <h4 style={{ textAlign: "center" }}>
                    {reservation_content.title.show}
                </h4>
                <div className={this.props.id + "-reservations"}>
                    <div id="reservations">
                        {reservations.map((item) =>
                            <Toast id="reseration-record" width="100%" onClose={() => this.openDialog(1)} >
                                <Toast.Header>
                                    {item.where}
                                </Toast.Header>
                                <Toast.Body>
                                    <table>
                                        <tbody>
                                            <tr><td valign="top">{reservation_content.toast.date.show}:</td><td> {item.when}</td></tr>
                                            <tr><td valign="top">{reservation_content.toast.duration.show}:</td><td> {item.duration}</td></tr>
                                            <tr><td valign="top">{reservation_content.toast.state.show}:</td><td> {this.setReservationState(item.state)}</td></tr>
                                        </tbody>
                                    </table>
                                </Toast.Body>
                            </Toast>
                        )}
                    </div>
                </div>

                <h4 style={{ textAlign: "center" }}>
                    {saved_content.title.show}
                </h4>
                <div className={this.props.id + "-reservations"}>
                    <div id="reservations">
                        {savedRooms.map((item) =>
                            <Toast id="reseration-record" onClose={() => this.openDialog(2)} >
                                <Toast.Header>
                                    {item.room}
                                </Toast.Header>
                                <Toast.Body>
                                    <table>
                                        <tbody>
                                            <tr><td valign="top">{saved_content.toast.capacity.show}:</td> <td>{item.capacity}</td></tr>
                                            <tr><td valign="top">{saved_content.toast.facilities.show}:</td><td>{item.facilities}</td></tr>
                                            <tr><td valign="top">{saved_content.toast.last_reservation.show}:</td><td>{item.last_reservation}</td></tr>
                                        </tbody>
                                    </table>
                                </Toast.Body>
                                {/* <button onClick={this.props.onClick(0)}>
                                Change
                            </button> */}
                            </Toast>
                        )}
                    </div>
                </div>
                <Modal show={this.state.isDialogOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        {this.state.dialogType == 1 ?
                            <Modal.Title>{modal_content.reservation.head}</Modal.Title> :
                            <Modal.Title>{modal_content.saved.title}</Modal.Title>
                        }
                    </Modal.Header>

                    <Modal.Body>
                        {this.state.dialogType == 1 ?
                            <p>{modal_content.reservation.body}</p> : <p>{modal_content.saved.body}</p>}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                        <Button variant="primary">Yes</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
    setReservationState(state) {
        if (state === -1) {
            return "Rejected";
        }
        else if (state === 0) {
            return "Pending";
        }
        else {
            return "Approved";
        }
    }
    openDialog(dialogCommand) {
        this.setState({
            isDialogOpen: true,
            dialogType: dialogCommand
        });
    }
    handleClose = () => this.setState({ isDialogOpen: false })
}

export default MyReservation;