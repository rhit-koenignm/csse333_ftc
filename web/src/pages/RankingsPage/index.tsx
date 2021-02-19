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
import { TournamentsService } from 'src/services/tournaments';

interface OwnProps {

}

interface StoreProps {
}

interface DispatchProps {
}

type Props = OwnProps & StoreProps & DispatchProps;

interface State {
    rankings: TeamRanking[];
}

class RankingsPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            rankings: [],
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
        }
    }
    public render() {
        let rankings = this.state.rankings;
        return (
            <Container className={styles.tableStyle}>
                <Row className={styles.welcomeMsg}><h1>Rankings</h1></Row>
                <Row className={styles.subtitleMsg}><p>You are viewing the current Team Rankings</p></Row>
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
                                    <th>Match</th>
                                    <th>Results</th>
                                    <th>Upcoming Matches</th>
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
                                </tr>
                                <tr>
                                    <td>
                                    </td>
                                    <td>
                                    </td>
                                    <td>
                                    </td>
                                </tr>  
                                <tr>
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