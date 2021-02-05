import * as React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faSave } from '@fortawesome/free-solid-svg-icons';
import styles from './MatchOverview.module.scss';
import { RootState } from 'src/store/modules';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { actions as matchesActions, Match, MatchTeam } from '../../services/matches';

interface OwnProps {
    match: {
        params: {
            matchId: string,
        }
    }
}

interface StoreProps {
    matches: Match[];
}

interface DispatchProps {
    fetchMatch: (matchId: string) => void;
}

type Props = OwnProps & StoreProps & DispatchProps;

interface State {
    showRed: boolean;
    showBlue: boolean;
    show: boolean;
    matchNumber?: string
    teamNumber?: string;
    results?: string;
    time?: string;
    redScore?: string;
    blueScore?: string;

    match?: Match;
    redTeams: MatchTeam[];
    blueTeams: MatchTeam[];

    // teamId?: string;
    // teamName?: string;
}


class MatchOverviewPage extends React.Component<Props, State> {

    public constructor(props: Props) {
        super(props);
        this.state = {
            showRed: false,
            showBlue: false,
            show: false,
            redTeams: [],
            blueTeams: [],
        };
    }

    componentDidMount() {
        let matchId = this.props.match.params.matchId;
        this.props.fetchMatch(matchId);
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        let matchId = this.props.match.params.matchId;
        let match = this.props.matches?.find(match => match.id === matchId);
        // todo: handle the case where this is a string
        let teams: MatchTeam[] = (match?.teams || []) as MatchTeam[];
        let redTeams: MatchTeam[] = teams.filter(team => team.alliance_color === 'Red');
        let blueTeams: MatchTeam[] = teams.filter(team => team.alliance_color === 'Blue');

        if(!match) {
            this.props.fetchMatch(matchId);
            return;
        }

        if(this.state.match?.id !== matchId) {
            this.setState({ match, redTeams, blueTeams });
        }
    }

    public render() {
        return (
            <Container className={styles.tableStyle}>
                <Row className={styles.welcomeMsg}><h1>Match Details</h1></Row>
                <hr></hr>
                <Row className={styles.matchNumber}><h4>Match Number: {this.state.match?.number || 'Loading' }</h4></Row>
                <Row className={styles.subtitleMsg}><h4>Time: {this.state.match?.scheduled_time || 'Loading' }</h4></Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th colSpan={2} className={styles.blueAllianceTitle}>Blue Alliance</th> 
                            <th colSpan={2} className={styles.redAllianceTitle}>Red Alliance</th> 
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Container>
                                    <Row>{this.state.blueTeams[0]?.team_name || 'Loading' }</Row>
                                    <Row>{this.state.blueTeams[0]?.team_number || 'Loading' }</Row>
                                    <Row><Form.Check type="checkbox" inline />Present</Row>
                                </Container>
                            </td>
                            <td>
                                <Container>
                                    <Row>{this.state.blueTeams[1]?.team_name || 'Loading' }</Row>
                                    <Row>{this.state.blueTeams[1]?.team_number || 'Loading' }</Row>
                                    <Row><Form.Check type="checkbox" inline />Present</Row>
                                </Container>
                            </td>
                            <td>
                                <Container>
                                    <Row>{this.state.redTeams[0]?.team_name || 'Loading' }</Row>
                                    <Row>{this.state.redTeams[0]?.team_number || 'Loading' }</Row>
                                    <Row><Form.Check type="checkbox" inline />Present</Row>
                                </Container>
                            </td>
                            <td>
                                <Container>
                                    <Row>{this.state.redTeams[1]?.team_name || 'Loading' }</Row>
                                    <Row>{this.state.redTeams[1]?.team_number || 'Loading' }</Row>
                                    <Row><Form.Check type="checkbox" inline />Present</Row>
                                </Container>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Form as={Row}>
                    <Form.Group as={Col}>
                        <Form.Label>Blue Score</Form.Label>
                        <Form.Control type="number" />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Red Score</Form.Label>
                        <Form.Control type="number" />
                    </Form.Group>
                </Form>
                <Row><Button onClick={this.updateMatch}>Save <FontAwesomeIcon icon={faSave} /></Button></Row>
            </Container>
        )
    }

    updateMatch() {
        console.log('update match');
    }
}

const mapStateToProps = (state: RootState): StoreProps => ({
    matches: state.matches.matches,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => ({
    // fetchAllTeams: () => {
    //     dispatch(teamActions.fetchAllTeams());
    // },
    fetchMatch: (matchId: string) => {
        dispatch(matchesActions.fetchOneMatch(matchId));
    }
});

// export default connect<StoreProps, DispatchProps, OwnProps, RootState>
//     (mapStateToProps, mapDispatchToProps)(MatchesPage);

export default connect<StoreProps, DispatchProps, OwnProps, RootState>
    (mapStateToProps, mapDispatchToProps)(MatchOverviewPage);