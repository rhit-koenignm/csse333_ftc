import * as React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './SelectTournamentPage.module.scss';
import { actions as teamActions, Team } from 'src/services/teams';
import { RootState } from 'src/store/modules';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Tournament, actions } from 'src/services/tournaments';
import { setTimeout } from 'timers';

interface OwnProps {
    
}

interface StoreProps {
    tournaments: Tournament[];
}

interface DispatchProps {
    fetchAllTournaments: () => void;
    setCurrentTournament: (tournamentId: string) => void;
}

type Props = OwnProps & StoreProps & DispatchProps;

interface State {
    
}


class SelectTournamentPage extends React.Component<Props, State> {

    public constructor(props: Props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.props.fetchAllTournaments();
    }

    public render() {
        let tournaments = this.props.tournaments;
        return (
            <Container className={styles.tableStyle}>
                <Row className={styles.welcomeMsg}><h1>Tounaments</h1></Row>
                <Row className={styles.subtitleMsg}><p>Please select a tournament for this session</p></Row>
                
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {tournaments.map(tourn => (
                            <tr key={tourn.id}>
                                <td>{tourn.name}</td>
                                <td>{tourn.date}</td>
                                <td>
                                    <Button className={styles.editBtn} onClick={() => this.selectedTournament(tourn.id)}><FontAwesomeIcon icon={faEdit} size="sm"/>     Select</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                { /*
                <div className={styles.addBtn}>
                    <Button>Generate Match</Button> 
                </div>
                */ }
            </Container>
        )
    }

    selectedTournament(tournId: string) {
        // set the selected ID
        this.props.setCurrentTournament(tournId);
        setTimeout(() => {
            window.location.assign('/');
        }, 500);
    }
}

const mapStateToProps = (state: RootState): StoreProps => ({
    tournaments: state.tournaments.tournaments,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => ({
    fetchAllTournaments: () => {
        dispatch(actions.fetchAllTournaments());
    },
    setCurrentTournament: (tournamentId: string) => {
        dispatch(actions.setCurrentTournament(tournamentId));
    }
});

// export default connect<StoreProps, DispatchProps, OwnProps, RootState>
//     (mapStateToProps, mapDispatchToProps)(MatchesPage);

export default connect<StoreProps, DispatchProps, OwnProps, RootState>
    (mapStateToProps, mapDispatchToProps)(SelectTournamentPage);