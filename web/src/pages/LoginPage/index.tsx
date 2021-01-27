import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';

import { actions as authActions } from 'app/services/auth';
import { RootState } from 'app/store/modules';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';

interface LoginPageProps {
    onLogin: (email: string, password: string) => boolean;
}

interface LoginPageState {
    email: string,
    password: string,
}

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {

    constructor(props: LoginPageProps) {
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
        console.log(`Login ${this.state.email} ${this.state.password}`);
        this.props.onLogin(this.state.email, this.state.password);
    }
}

const mapStateToProps = (state: RootState) => ({

});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    onLogin: (email: string, password: string): boolean => {
        if(!email || !password) {
            return false;
        }
        dispatch(authActions.login({ email, password }));
        return true;
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);