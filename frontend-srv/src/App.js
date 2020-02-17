import React, {Component} from 'react';
import {Form, Col, Container, Button} from 'react-bootstrap';




export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {firstName: '',
            lastName: '',
            patr_name: '',
            doc_series: '',
            doc_number: '',
            doc_issue_date: ''};

        this.firstName = React.createRef();
        this.lastName = React.createRef();
        this.patr_name = React.createRef();
        this.doc_series = React.createRef();
        this.doc_number = React.createRef();
        this.doc_issue_date = React.createRef();
        this.disable = true;

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            firstName: event.target.firstName,
            lastName: event.target.lastName,
            doc_issue_date: event.target.doc_issue_date,
            doc_series: event.target.doc_series,
            doc_number: event.target.doc_number,
            patr_name: event.target.patr_name
        });

       this.disable =   this.firstName.current.value.length > 1 && this.firstName.current.value.length <= 30 &&
                        this.lastName.current.value.length > 1 && this.lastName.current.value.length <= 30 &&
                        this.patr_name.current.value.length > 1 && this.patr_name.current.value.length <= 30 &&
                        this.doc_series.current.value.length > 3 && this.doc_series.current.value.length <= 4 &&
                        this.doc_number.current.value.length > 5 && this.doc_number.current.value.length <= 6 &&
                        this.doc_issue_date.current.value.length > 9 && this.doc_issue_date.current.value.length <= 10;
        this.disable = !this.disable
    }

     generateUUID() { // Public Domain/MIT
        let d = new Date().getTime();//Timestamp
        let d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16).toUpperCase();
        });
    }

    handleClick() {

        let xhr = new XMLHttpRequest()
        const guid = this.generateUUID()

        xhr.addEventListener('load', () => {

            console.log(this.generateUUID());

           const parser = new DOMParser();
           const xmlDoc = parser.parseFromString(xhr.responseText, "text/xml");
           const uri = 'data:application/octet-stream;base64,' + xmlDoc.getElementsByTagName("document")[0].innerHTML;
           //only with <5mb file size
            const link = document.createElement('a');

            link.setAttribute("download", "Hello.txt");
            link.setAttribute("href", uri);
            document.body.appendChild(link);
            link.click();
        });

        const body = "<soapenv:Envelope xmlns:soapenv=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:urn=\"urn:mFlow\">\n" +
            "  <soapenv:Header />\n" +
            " <soapenv:Body>\n" +
            "    <urn:request>\n" +
            "      <correlationId>"+ guid +"</correlationId>\n" +
            "      <payload>\n" +
            "        <first_name>"+ this.firstName.current.value +"</first_name>\n" +
            "        <last_name>"+ this.lastName.current.value +"</last_name>\n" +
            "        <patr_name>"+ this.patr_name.current.value +"</patr_name>\n" +
            "        <doc_number>"+ this.doc_number.current.value +"</doc_number>\n" +
            "        <doc_series>"+ this.doc_series.current.value +"</doc_series>\n" +
            "        <doc_issue_date>"+ this.doc_issue_date.current.value +"</doc_issue_date>\n" +
            "      </payload>\n" +
            "    </urn:request>\n" +
            "  </soapenv:Body>\n" +
            "</soapenv:Envelope>"
        console.log(body)
        xhr.open('POST', 'http://localhost:8081/getFile')
        xhr.setRequestHeader('Content-Type', 'text/xml;charset=utf-8');
        xhr.send(body);
        return false;
    }

    render() {
        return (
            <Container className="p-3">
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridFirstName">
                            <Form.Label>Фамилия</Form.Label>
                            <Form.Control placeholder="Введите фамилию" ref={this.lastName}
                                          value = {this.state.lastName } onChange = {this.handleChange}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Имя</Form.Label>
                            <Form.Control  placeholder="Введите имя" ref={this.firstName}
                                           value = {this.state.firstName } onChange = {this.handleChange}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Отчество</Form.Label>
                        <Form.Control placeholder="Введите отчество" ref={this.patr_name}
                                      value = {this.state.patr_name } onChange = {this.handleChange}/>
                    </Form.Group>


                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Серия</Form.Label>
                            <Form.Control type="number" placeholder="xxxxx" ref={this.doc_series}
                                          value = {this.state.doc_series } onChange = {this.handleChange}/>
                        </Form.Group>


                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Номер</Form.Label>
                            <Form.Control type="number" placeholder="xxxxxxx" ref={this.doc_number}
                                          vvalue = {this.state.doc_number } onChange = {this.handleChange}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Дата выдачи</Form.Label>
                            <Form.Control pattern = "(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}"
                                          placeholder="дд.мм.гггг" ref={this.doc_issue_date}
                                          value = {this.state.doc_issue_date } onChange = {this.handleChange}/>
                        </Form.Group>
                    </Form.Row>

                    <Button variant="primary" disabled={this.disable} onClick={this.handleClick}>
                        Отправить
                    </Button>
                </Form>
            </Container>
        );
    }
}