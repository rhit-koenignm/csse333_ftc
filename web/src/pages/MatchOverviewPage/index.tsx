import * as React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faSave } from '@fortawesome/free-solid-svg-icons';
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
    saveMatch: (
        matchId: string,
        redScore: number,
        blueScore: number,
        attendance: { team_id: string, attendance: boolean }[],
    ) => void;
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
    redScore?: number;
    blueScore?: number;

    match?: Match;
    redTeams: MatchTeam[];
    blueTeams: MatchTeam[];

    redAttendance: boolean[];
    blueAttendance: boolean[];

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
            redAttendance: [],
            blueAttendance: [],
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
            this.setState({
                match,
                redTeams,
                blueTeams,
                redScore: match.red_score,
                blueScore: match.blue_score,
                redAttendance: redTeams.map(team => team.attending),
                blueAttendance: blueTeams.map(team => team.attending),
            });
        }
    }

    public render() {
        let { blueTeams, redTeams, redAttendance, blueAttendance } = this.state;
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
                                    <Row>{blueTeams[0]?.team_name || 'Loading' }</Row>
                                    <Row>{blueTeams[0]?.team_number || 'Loading' }</Row>
                                    <Row><Form.Check type="checkbox" inline checked={blueAttendance[0] || false} 
                                            onChange={() => this.updateAttendance('blue', 0)}/>Present</Row>
                                </Container>
                            </td>
                            <td>
                                <Container>
                                    <Row>{blueTeams[1]?.team_name || 'Loading' }</Row>
                                    <Row>{blueTeams[1]?.team_number || 'Loading' }</Row>
                                    <Row><Form.Check type="checkbox" inline checked={blueAttendance[1] || false}
                                            onChange={() => this.updateAttendance('blue', 1)} />Present</Row>
                                </Container>
                            </td>
                            <td>
                                <Container>
                                    <Row>{redTeams[0]?.team_name || 'Loading' }</Row>
                                    <Row>{redTeams[0]?.team_number || 'Loading' }</Row>
                                    <Row><Form.Check type="checkbox" inline checked={redAttendance[0] || false}
                                            onChange={() => this.updateAttendance('red', 0)} />Present</Row>
                                </Container>
                            </td>
                            <td>
                                <Container>
                                    <Row>{redTeams[1]?.team_name || 'Loading' }</Row>
                                    <Row>{redTeams[1]?.team_number || 'Loading' }</Row>
                                    <Row><Form.Check type="checkbox" inline checked={redAttendance[1] || false}
                                            onChange={() => this.updateAttendance('red', 1)} />Present</Row>
                                </Container>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Form as={Row}>
                    <Form.Group as={Col}>
                        <Form.Label>Blue Score</Form.Label>
                        <Form.Control type="number" value={this.state.blueScore} onChange={(e) => this.setState({ blueScore: Number(e.target.value) })} />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Red Score</Form.Label>
                        <Form.Control type="number" value={this.state.redScore} onChange={(e) => this.setState({ redScore: Number(e.target.value) })} />
                    </Form.Group>
                </Form>
                <Row><Button onClick={() => this.saveMatchResults()}>Save <FontAwesomeIcon icon={faSave} /></Button></Row>
            </Container>
        )
    }

    updateAttendance(color: string, index: number) {
        if(color === 'red') {
            let redAttendance = this.state.redAttendance;
            redAttendance[index] = !redAttendance[index];
            this.setState({ redAttendance });
        }
        else if (color === 'blue') {
            let blueAttendance = this.state.blueAttendance;
            blueAttendance[index] = !blueAttendance[index];
            this.setState({ blueAttendance });
        }
    }

    saveMatchResults() {
        console.log('update match');
        if(!this.state.match) {
            return;
        }
        let { redAttendance, blueAttendance } = this.state;
        let attendance: { team_id: string, attendance: boolean }[] = [];
        attendance.push(...this.state.redTeams.map((team, index) => ({ team_id: team.team_id, attendance: redAttendance[index]})));
        attendance.push(...this.state.blueTeams.map((team, index) => ({ team_id: team.team_id, attendance: blueAttendance[index]})));

        this.props.saveMatch(
            this.state.match.id,
            Number(this.state.blueScore),
            Number(this.state.redScore),
            attendance,
        );
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
    },
    saveMatch: (matchId: string, redScore: number, blueScore: number, attendance: { team_id: string, attendance: boolean }[]) => {
        dispatch(matchesActions.saveMatch(matchId, redScore, blueScore, attendance));
    },
});

export default connect<StoreProps, DispatchProps, OwnProps, RootState>
    (mapStateToProps, mapDispatchToProps)(MatchOverviewPage);