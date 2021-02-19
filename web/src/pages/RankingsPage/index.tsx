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
import { actions as teamActions, Team, TeamRanking, TeamsService } from 'src/services/teams';
import { RootState } from 'src/store/modules';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { render } from 'react-dom';
import * as Scroll from 'react-scroll';
import { animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import { TournamentsService, UpcomingMatch } from 'src/services/tournaments';

interface OwnProps {

}

interface StoreProps {
}

interface DispatchProps {
}

type Props = OwnProps & StoreProps & DispatchProps;

interface State {
    rankings: TeamRanking[];
    upcomingMatches: UpcomingMatch[];
}

class RankingsPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            rankings: [],
            upcomingMatches: [],
        };
    }
    scrollTo = () => {
        scroller.scrollTo('scroll-to-element', {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart'
        });
    }
    componentDidMount() {
        let tournamentId = TournamentsService.getSelectedTournament();
        if(tournamentId) {
            TeamsService.fetchTeamRankings(tournamentId)
                .then(rankings => this.setState({rankings}));
            TournamentsService.fetchUpcomingTournaments(tournamentId)
                .then(matches => this.setState({ upcomingMatches: matches }));
        }
    }
    public render() {
        let { rankings, upcomingMatches } = this.state;
        console.log(rankings);
        return (
            <Container className={styles.tableStyle}>
                <Row className={styles.welcomeMsg}><h1>Competition Overview</h1></Row>
                <Row>
                    <Col><h3 style={{textAlign: 'center'}}>Current Team Rankings</h3></Col>
                    <Col><h3 style={{textAlign: 'center'}}>Upcoming Matches</h3></Col>
                </Row>
                <Row>
                    <Col className={styles.tbodyScroll}>
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
                            <tbody className={styles.tbody}>
                                { rankings.map(ranking => (
                                    <tr key={ranking.participant_id}>
                                        <td>{ranking.rank_num}</td>
                                        <td>{ranking.team_num}</td>
                                        <td>{ranking.qp}</td>
                                        <td>{ranking.rp}</td>
                                        <td>{ranking.match_count}</td>
                                    </tr>
                                ))}
                            </tbody>
                           
                        </Table>
                    </Col>
                    <Col className={styles.tbodyScroll}>
                        <Table striped bordered hover >
                            <thead>
                                <tr>
                                    <th>Time</th>
                                    <th style={{backgroundColor: 'blue', color: 'white'}}>Blue Teams</th>
                                    <th style={{backgroundColor: 'red', color: 'white'}}>Red Teams</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {upcomingMatches && upcomingMatches.map(m => (
                                    <tr key={m.upcoming_match_id}>
                                        <td>{m.match_time}</td>
                                        <td>
                                            {m.blue_team_1}<br/>
                                            {m.blue_team_2}
                                        </td>
                                        <td>
                                            {m.red_team_1}<br/>
                                            {m.red_team_2}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                    </Row>
            </Container>
        )
    };
}

const mapStateToProps = (state: RootState): StoreProps => ({
    rankings: state.teams.rankings,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => ({
    fetchTeamRankings: (tournamentId: string) => {
        dispatch(teamActions.fetchTeamRankings(tournamentId));
    },
    fetchUpcomingMatches: (tournament: string) => {
        // not yet implemented
    },
});

export default RankingsPage;