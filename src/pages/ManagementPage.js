import React from 'react';
import { Modal, Table, Pagination, InputGroup, Tab, CardDeck, Card, Row, Col, Nav, Navbar, Form, FormControl, Button, Overlay } from 'react-bootstrap';
import reservations from './../json/reservation_details.json';
import './ManagementPage.css';
import Tooltip from 'react-tooltip';
import content_en from './../json/management_page_en.json';
import content_cn from './../json/management_page_cn.json';
import ScheduleTable from './../Component/scheduleTable';
import 'react-calendar-timeline/lib/Timeline.css';
import logo from './../logo.png';

class ManagementPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDialogOpen: false,
            isTimeTable: false,
            showMenu: true,
            action: content_cn.modal.approve,
            reservations: reservations,
            currentlocation: 0,
            currentPage: 1,
            maxRoom: 8,
            content: content_cn
        };
        this.closeDialog = this.closeDialog.bind(this);
    }

    render() {
        const content = this.state.content;
        return (<div id="ManagementPage">
            <Navbar expand="lg" id="NavBar">
                <Navbar.Brand href="#home"> <img src={logo}></img> </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav fill variant="tabs" defaultActiveKey={content.nav[0].name}>
                        {content.nav.map((item) => <Nav.Item>
                            <Nav.Link onClick={() => { this.setState({ isTimeTable: false }) }}
                                eventKey={item.name}>{item.show}</Nav.Link>
                        </Nav.Item>
                        )}
                        <Nav.Item>
                            <Nav.Link onClick={() => { this.setState({ isTimeTable: true }) }}
                                eventKey={content.schedule.name}>{content.schedule.show}</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Form className="ml-auto" inline>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Search"
                            />
                            <InputGroup.Append>
                                <Button variant="outline-secondary">{content.search.show}</Button>
                            </InputGroup.Append>
                        </InputGroup>

                    </Form>
                </Navbar.Collapse>
            </Navbar>
            {!this.state.isTimeTable ? <Tab.Container id="CardContainer" defaultActiveKey="0" >

                {this.state.showMenu && <Col sm={2} id="left-side"   >
                    <Nav variant="pills" className="flex-column" >
                        {this.getReservationTabCard()[0]}

                    </Nav>

                </Col>}
                <Col sm={9} id="right-side" >
                    <Button variant="outline-primary"
                        className="ToggleButton"
                        onClick={() => {
                            this.setState((prev, event) => {
                                return { showMenu: !prev.showMenu };
                            })
                        }}>
                        {content.toggle.show}
                    </Button>
                    <Tab.Content>
                        {this.getReservationTabCard()[1]}

                    </Tab.Content>
                    <div id="Pagination-block" >

                        <Pagination size="sm" id="Pagination">
                            {this.getPagination()}
                        </Pagination>
                    </div>
                </Col>

            </Tab.Container> : <div>
                    <ScheduleTable />
                </div>
            }
            <Modal show={this.state.isDialogOpen} onHide={this.closeDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.action.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group >
                            <Form.Label>Please enter the comment to confirm:</Form.Label>
                            <Form.Control
                                as="textarea" maxLength="500"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" >
                        {content.modal.buttons.confirm.show}
                    </Button>
                    <Button variant="outline-primary" onClick={this.closeDialog}>
                        {content.modal.buttons.cancel.show}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >);
    }
    getReservationTabCard() {
        let navItems = [];
        let panes = [];

        this.state.reservations.map((item, locationIndex) => {
            navItems.push(
                <Nav.Item>
                    <Nav.Link
                        className="left"
                        onClick={() => {
                            this.setState({
                                currentlocation: locationIndex,
                                currentPage: 1,
                            })
                        }} eventKey={locationIndex}>{item.location}</Nav.Link>
                </Nav.Item>
            );
            panes.push(
                <Tab.Pane eventKey={locationIndex}>
                    <CardDeck  >
                        {this.getRoomTabCard(item)}
                    </CardDeck>
                </Tab.Pane>);
        });
        return [navItems, panes];
    }

    getRoomTabCard(item) {
        const content = this.state.content;
        let items = [];
        let left = this.state.maxRoom * (this.state.currentPage - 1);
        let right = this.state.maxRoom * (this.state.currentPage);
        var size = item.rooms.length;
        right = right > size ? size : right;
        for (let i = left; i < right; i++) {
            let room = item.rooms[i];
            items.push(
                <div className="room-grid" >
                    <Card variant="top" >
                        <Card.Body >
                            <Card.Title>{room.room}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Student id</Card.Subtitle>
                            <Card.Text>
                                <Table borderless size="sm" responsive="sm">
                                    <tr>
                                        <td >{content.card.date.show}</td>
                                        <td>{room.date}</td>
                                    </tr>
                                    <tr>
                                        <td>{content.card.location.show}</td>
                                        <td>{room.location}</td>
                                    </tr>
                                    <tr data-tip={room.duration} data-for="Duration">
                                        <td >{content.card.duration.show}</td>
                                        <td className="tooltip-place">See more </td>
                                    </tr>


                                    <tr>
                                        <td id="ngroups">{content.card.ngroup.show}</td>
                                        <td>{room.ngroups}</td>
                                    </tr>

                                    <tr>
                                        <td >{content.card.repeat.show}</td>
                                        <td>{room.repeat}</td>
                                    </tr>
                                    <tr>
                                        <td >{content.card.type.show}</td>
                                        <td>{room.type}</td>
                                    </tr>
                                    <tr data-tip={room.comments} data-for="Curation">
                                        <td >{content.card.comment.show}</td>
                                        <td className="tooltip-place">see more</td>
                                    </tr>

                                </Table>


                            </Card.Text>
                            <Card.Link href="#" onClick={() => this.openDialog(0)} >{content.card.buttons.approve.show}</Card.Link>
                            <Card.Link href="#" onClick={() => this.openDialog(1)}>{content.card.buttons.reject.show}</Card.Link>
                            <Card.Link href="#">{content.card.buttons.save.show}</Card.Link>
                        </Card.Body>
                    </Card>

                    <Tooltip id="Curation" effect="float"
                        getContent={(dataTip) =>
                            <div>
                                <strong>Note:</strong>
                                <p align="left">{dataTip}</p>
                            </div>} />
                    <Tooltip id="Duration" effect="float"
                        getContent={(dataTip) =>
                            <div>
                                <strong>Note:</strong>
                                <p align="left">{dataTip}</p>
                            </div>} />

                </div >);
        }
        return items;
    }
    getPagination() {
        let currentPage = this.state.currentPage;
        let items = [];
        items.push(<Pagination.First onClick={() => {
            this.setState({ currentPage: 1 });
        }} />)
        items.push(<Pagination.Prev disabled={currentPage == 1 ? true : false} onClick={() => {
            this.setState((prevState, props) => ({ currentPage: prevState.currentPage - 1 }));
        }} />);
        let max = parseInt(this.state.reservations[Number(this.state.currentlocation)].rooms.length / this.state.maxRoom + 1);
        this.getPaginationFromPageNumbers(items, 1, 1);
        var start;
        if (currentPage > 5) {
            items.push(<Pagination.Ellipsis />);
            start = currentPage - 2;
        }
        else
            start = 2;

        if (currentPage + 3 >= max) {
            this.getPaginationFromPageNumbers(items, start, max);
        }
        else {
            this.getPaginationFromPageNumbers(items, start, currentPage + 3);
            items.push(<Pagination.Ellipsis />);
            start = currentPage + 4 >= max - 3 ? currentPage + 4 : max - 3;
            this.getPaginationFromPageNumbers(items, start, max);
        }

        items.push(<Pagination.Next
            disabled={currentPage === max ? true : false}

            onClick={() => {
                this.setState((prevState, props) => ({ currentPage: prevState.currentPage + 1 }));
            }} />)

        items.push(<Pagination.Last onClick={() => {
            this.setState({ currentPage: max });
        }} />);
        return items;
    }
    getPaginationFromPageNumbers(items, min, max) {
        let pageNumbers = [];
        for (let i = min; i <= max; i++) pageNumbers.push(i);
        pageNumbers.map((number) => {
            items.push(
                <Pagination.Item key={number} onClick={() => { this.setState({ currentPage: number }) }} active={number === this.state.currentPage}>
                    {number}
                </Pagination.Item>,
            );

        }
        );
    }
    openDialog(action) {
        this.setState({
            isDialogOpen: true,
            action: action === 0 ? this.state.content.modal.approve : this.state.content.modal.reject,
        });
    }
    closeDialog() {
        this.setState({
            isDialogOpen: false,
        });
    }
}


export default ManagementPage;