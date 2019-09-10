import React from 'react';
import { Modal, Table, Pagination, InputGroup, Tab, CardDeck, Card, Row, Col, Nav, Navbar, Form, FormControl, Button, Overlay } from 'react-bootstrap';
import reservations from './../json/reservation_details.json';
import './ManagementPage.css';
import Tooltip from 'react-tooltip';
import content_en from './../json/management_page_en.json';
import content_cn from './../json/management_page_cn.json';
class ManagementPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDialogOpen: false,
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
            <Navbar bg="light" expand="lg" id="NavBar">
                <Navbar.Brand href="#home">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav fill variant="tabs" defaultActiveKey={content.nav[0].name}>
                        {content.nav.map((item) => <Nav.Item>
                            <Nav.Link eventKey={item.name}>{item.show}</Nav.Link>
                        </Nav.Item>
                        )}

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
            <Tab.Container id="CardContainer" defaultActiveKey="0" >
                <Row>
                    {this.state.showMenu && <Col sm={2} className="left"   >
                        <Nav variant="pills" className="flex-column" >
                            {this.getReservationTabCard()[0]}

                        </Nav>

                    </Col>}
                    <Col sm={9} className="right" >
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
                </Row>
            </Tab.Container>
            <Modal show={this.state.isDialogOpen} onHide={this.closeDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.action.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body> {this.state.action.body}</Modal.Body>
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
                    <Nav.Link onClick={() => {
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
                                        <td width="55%">{content.card.date.show}</td>
                                        <td>{room.date}</td>
                                    </tr>
                                    <tr>
                                        <td width="50%">{content.card.location.show}</td>
                                        <td>{room.location}</td>
                                    </tr>
                                    <tr data-tip={room.duration} data-for="Duration">
                                        <td width="50%">{content.card.duration.show}</td>
                                        <td>See more </td>
                                    </tr>

                                </Table>
                                <Table borderless size="sm" responsive="sm">
                                    <tr>
                                        <td id="ngroups" width="auto">{content.card.ngroup.show}</td>
                                        <td>{room.ngroups}</td>
                                    </tr>
                                </Table>
                                <Table borderless size="sm" responsive="sm">
                                    <tr>
                                        <td width="55%">{content.card.repeat.show}</td>
                                        <td>{room.repeat}</td>
                                    </tr>
                                    <tr>
                                        <td >{content.card.type.show}</td>
                                        <td>{room.type}</td>
                                    </tr>
                                    <tr data-tip={room.comments} data-for="Curation">
                                        <td >{content.card.comment.show}</td>
                                        <td>see more</td>
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
                console.log(currentPage);
                console.log(max);
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