import React from 'react';
import Tooltip from 'react-tooltip';
import { Overlay, Tabs, Pagination, Tab, Card, CardDeck, FormControl, InputGroup, Dropdown, DropdownButton, Button } from 'react-bootstrap';
import img from './../conference_room.jpeg';
import Form from 'react-bootstrap/FormGroup';

class MeetingRooms extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.content)
        this.state = {
            content: this.props.content,
            search_type: this.props.content.search.content[0],
            selectRoom: null,
            currentlocation: 0,
            roomlist: this.props.roomlist,
            currentPage: 1,
            maxRoom: 8,
        }
    }
    componentDidMount() {

    }
    render() {
        const search = this.state.content.search;
        return (
            <div className={this.props.className}>
                <div>
                    <Form>
                        <InputGroup className="mb-3">
                            <FormControl id="input-group-text" name="search_enter" placeholder={this.state.search_type.example} />
                            <InputGroup.Append>
                                <DropdownButton
                                    as={InputGroup.Prepend}
                                    variant="outline-secondary"
                                    title={this.state.search_type.show}
                                    defaultActiveKey={0}
                                    id="input-group-dropdown-1"
                                    onSelect={(eventKey, event) => {
                                        this.setState({
                                            search_type: search.content[eventKey]
                                        })
                                    }}
                                >
                                    {search.content.map((item, index) =>
                                        <Dropdown.Item eventKey={index}>{item.show}</Dropdown.Item>
                                    )}
                                </DropdownButton>
                                <Button style={{ right: 0 }} type="submit" variant="outline-secondary">Search</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                </div>
                <div id="room-bar">
                    <Tabs className="justify-content-center" defaultActiveKey="0"
                        justify onSelect={(eventKey, event) => {
                            console.log(eventKey);
                            this.setState({
                                currentlocation: eventKey,
                                currentPage: 1,
                            })
                        }} variant="tabs">

                        {this.state.roomlist.map((item, locationIndex) =>
                            <Tab eventKey={locationIndex} title={item.location}
                            >
                                <CardDeck id="CardDeck">
                                    {this.getRoomCards(item, locationIndex)}

                                </CardDeck>
                            </Tab>
                        )}
                    </Tabs>
                </div>

                <div id="Pagination-block" >

                    <Pagination size="sm" id="Pagination">
                        {this.getPagination()}
                    </Pagination>
                </div>

            </div >
        );
    }
    getRoomInfoFromDataTip(dataTip) {
        const tooltip = this.state.content.card.tooltip_titles;
        if (dataTip == null) return;
        const [locationIndex, roomIndex] = dataTip.split('|');
        const item = this.state.roomlist[locationIndex];
        const room = item.rooms[roomIndex];
        return (<div>
            <h5>{tooltip.h.show} :{room[tooltip.h.name]}</h5>

            <table >
                <tbody>
                    {tooltip["li-1"].map((item) => <tr><td className="left-td">{item.show}:</td><td> {room[item.name]}</td></tr>)}
                    {tooltip["li-2"].map((item) =>
                        <tr><td className="left-td" valign="top">{item.show}:</td> <td valign="top">
                            {room[item.name].length != 0 ?
                                <p>{room[item.name].map((time) => <strong>{time}<br /></strong>)}</p> : <div>Not available</div>}
                        </td></tr>)}
                </tbody>
            </table>

        </div>)
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
        let max = 100;//parseInt(this.state.roomlist[Number(this.state.currentlocation)].rooms.length / this.state.maxRoom + 1);
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
    getRoomCards(item, locationIndex) {
        var card_content = this.state.content.card;
        var left = this.state.maxRoom * (this.state.currentPage - 1);
        var right = this.state.maxRoom * (this.state.currentPage);
        var size = this.state.roomlist[locationIndex].rooms.length;
        right = right > size ? size : right;
        //console.log(item.rooms);
        let items = [];
        for (var roomIndex = left; roomIndex < right; roomIndex++) {
            var room = item.rooms[roomIndex];
            items.push(<div className="room-grid">
                <Card border="primary" style={{ cursor: "pointer" }}
                    id={room.roomid}
                    data-tip={`${locationIndex}|${roomIndex}`}
                    onDoubleClick={() => this.props.onClick(roomIndex)}
                    data-for="room">
                    <Card.Img variant="top" src={img} />
                    <Card.Body>
                        <Card.Title>
                            {card_content.card_titles.room.show}: {room.room}
                        </Card.Title>
                        <Card.Text>
                            {card_content.card_titles.location.show} : {room.location}<br></br>
                        </Card.Text>
                        <Button variant="link">Save</Button>
                    </Card.Body>

                </Card>
                <Tooltip className="ToolTip" id="room"

                    effect="float"
                    getContent={(dataTip) =>
                        this.getRoomInfoFromDataTip(dataTip)}
                />

            </div>)
        }
        return items;

    }
}

export default MeetingRooms;