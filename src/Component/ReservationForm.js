import React from 'react';

import { Form, Row, Col, Button, Dropdown, FormCheck, DropdownButton, InputGroup } from 'react-bootstrap';
import Multiselect from 'react-select';
import form_loading from './../json/form_loading.json';

class ReservationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form_info: form_loading,
            select60min: true,
            checkValidity: false,
            content: this.props.content,
        }

    }
    render() {
        const content = this.state.content;
        const form_info = this.state.form_info;
        return (
            <div>
                <Form noValidate validated={this.state.checkValidity} onSubmit={(event) => {
                    const form = event.currentTarget;
                    if (!form.checkValidity()) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    this.setState({ checkValidity: true })
                }}>
                    <Form.Row>
                        {/* need to change the input */}
                        <Form.Group as={Col} controlId="formGridRoomNo">
                            <Form.Label>{content.room.show}:{form_info.room}</Form.Label>
                            <Form.Control value={form_info.room} hidden />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridDate">
                            <Form.Label> {content.date.show}: {form_info.date}</Form.Label>
                            <Form.Control value={form_info.date} hidden />
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="formGridDuration">
                        <Form.Label>{content.duration.show}: </Form.Label>
                        <Form.Check
                            style={{ float: "right" }}
                            checked={!this.state.select60min}
                            inline label="30min" type="radio"
                            onChange={() => { this.setState({ select60min: false }) }}
                            id={`inline-radio-1`} name="duration" />
                        <Form.Check style={{ float: "right" }}
                            checked={this.state.select60min}
                            inline label="60min" type="radio"
                            onChange={() => { this.setState({ select60min: true }) }}
                            id={`inline-radio-2`} name="duration" />
                        <Multiselect options={form_info.time_slots}
                            isMulti
                            name="time_slots"
                            searchable />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridNoGroup">
                            <Form.Label>{content.ngroup.show}</Form.Label>
                            <Form.Control as="select">
                                {this.getNumberOptions(form_info.capacity)}
                            </Form.Control>
                        </Form.Group>
                        
                        <Form.Group as={Col} controlId="formGridRepeatTimes" >
                            <Form.Label>{content.meeting_type.show}</Form.Label>
                            <Form.Control as="select">
                                {form_info.meeting_type.map((item) => <option value={item.value} >{item.label}</option>)}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="formGridMeetingType">

                    </Form.Group>
                    <Form.Group controlId="formGridComment">
                        <Form.Label>{content.comment.show}</Form.Label>
                        <Form.Control as="textarea" maxLength="500"
                            placeholder={content.comment.placeholder}
                            onChange="this.value = this.value.substring(0,500)" />
                        <Form.Text className="text-muted">
                            {content.comment.text}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Check
                            required
                            label={
                                <div>
                                    <span>{content.agreement.message}</span>
                                    <a href="#">{content.agreement.link}</a>
                                </div>}
                            feedback={content.agreement.feedback}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {content.submit.show}
                    </Button>

                </Form>

            </div >
        );
    }
    getNumberOptions(maxValue) {
        const options = [];
        for (var i = 1; i <= maxValue; i++) {
            options.push(<option value={i}>{i}</option>);
        }
        return options;
    }
}

export default ReservationForm;
