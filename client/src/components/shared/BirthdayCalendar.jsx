import React, { Component } from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import Modal from 'react-modal';
import Moment from 'react-moment';
import Container from 'react-bootstrap/Container';
import { FaBirthdayCake } from 'react-icons/fa';
import { 
    WrapperCol,
    Label,
    BirthdayStyle,
    BirthdayButton
 } from '../../style/dog-styles';

Modal.setAppElement('#root');

class BirthdayCalendar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            birthday: this.props.birthday
        };
    };

    handleBirthdayChange = date => {
        const birthday = date;
        this.setState({ birthday });
        this.props.handleBirthday(birthday);
    };

    handleOpenModal = () => {
        this.setState({ modalIsOpen: true });
    };

    handleAfterOpenModal = () => {
        this.subtitle.style.color = '#f00';
    };

    handleCloseModal = () => {
        this.setState({ modalIsOpen: false });
    };    

    render() {
        const { birthday } = this.state;
        const bday = birthday === '' || birthday === undefined
            ? 'No Birthday Entered'
            : <Moment format='MM/DD/YYYY'>{birthday}</Moment>;

        return (
            <Container>
                <WrapperCol>
                    
                    <Label>Birthday: {bday}</Label>
                    <br />                    
                        <BirthdayButton onClick={this.handleOpenModal}>
                            <FaBirthdayCake /> Show Birthday Calendar
                        </BirthdayButton>
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.handleAfterOpenModal}
                            onRequestClose={this.handleCloseModal}
                            style={BirthdayStyle}
                            contentLabel='Birthday Modal'
                        >
                            <h2 ref={subtitle => this.subtitle = subtitle}> </h2>
                            <BirthdayButton onClick={this.handleCloseModal}>Save and Close</BirthdayButton>
                            <InfiniteCalendar
                                width={400}
                                height={300}
                                display={'years'}
                                value={birthday}
                                selected={this.state.birthday || new Date()}
                                onSelect={date => {
                                    this.handleBirthdayChange(date)
                                    }
                                } />
                        </Modal>                    
                </WrapperCol>
            </Container>
        );
    };
};

export default BirthdayCalendar;