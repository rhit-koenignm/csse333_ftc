import * as React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './RankingsPage.module.scss';
import { actions as teamActions, Team } from 'src/services/teams';
import { RootState } from 'src/store/modules';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';



class RankingsPage extends React.Component{



    public render() {
        return (

            <Container className={styles.tableStyle}>
                <Row className={styles.welcomeMsg}><h1>Rankings</h1></Row>
                <Row className={styles.subtitleMsg}><p>You are viewing the current Team Rankings</p></Row>
                <Row>
                    <Col>
                        <Table  striped bordered hover >
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Team#</th>
                                    <th>QP</th>
                                    <th>RP</th>
                                    <th>Plays</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                    </td>
                                    <td>
                                    </td>
                                    <td>
                                    </td>
                                    <td>
                                    </td>
                                    <td>
                                    </td>
                                </tr>  
                            </tbody>
                        </Table>
                    </Col>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Match</th>
                                    <th>Results</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                    </td>
                                    <td>
                                    </td>
                                </tr>  
                            </tbody>
                        </Table>
                    </Col>
                    </Row>
            </Container>
        )
    };

   
}


export default RankingsPage;
