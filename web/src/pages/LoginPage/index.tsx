import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';

import { actions as authActions, AuthService } from '../../services/auth';
import { RootState } from '../../store/modules';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';

interface DispatchProps {
}

interface StoreProps {
}

interface OwnProps {

}

type Props = OwnProps & DispatchProps & StoreProps;

interface State {
    email: string,
    password: string,
    errorMsg?: string,
}

export default class LoginPage extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                        <Jumbotron fluid>
                            <Container>
                                <Row>
                                    <h1>Log in to the site</h1>
                                </Row>
                                <Row>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control type="email" placeholder="Email" value={this.state.email} onChange={this.onEmailChange} />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.onPasswordChange} />
                                        </Form.Group>
                                        <Button onClick={this.onLoginButtonPressed}>Log in</Button>
                                    </Form>
                                </Row>
                                {this.state.errorMsg &&
                                    <Row>
                                        {this.state.errorMsg}
                                    </Row>
                                }
                            </Container>
                        </Jumbotron>
                    </Col>
                    <Col></Col>
                </Row>
            </Container> 
        );
    }

    onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            email: event.target.value,
        });
    }

    onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            password: event.target.value,
        });
    }

    onLoginButtonPressed = (event: React.MouseEvent<HTMLButtonElement>) => {
        // Launch the login saga!
        AuthService.login(this.state)
            .then(res => {
                if(res === null) {
                    // Error handling here
                    this.setState({ errorMsg: 'Invalid login' });
                }
                else {
                    localStorage.setItem('loggedInEmail', res);
                    setTimeout(() => {
                        window.location.assign('/selectTournament');
                    }, 500);
                }
            })
            .catch(err => {
                this.setState({ errorMsg: 'Error occurred'});
            });
    }
}
