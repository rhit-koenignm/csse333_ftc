import * as React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import styles from './HomePage.module.scss'

interface HomePageProps {

}

interface HomePageState {

}

class HomePage extends React.Component<HomePageProps, HomePageState> {

    public constructor(props: HomePageProps) {
        super(props);
    }

    public render() {

        return (
            <Container>
            <Row className={styles.welcomeMsg}><h1>Welcome, User! </h1></Row>
            <Row style={{justifyContent: 'center'}}>
            
            {/* View Matches Card */}

            <Col >
            <Card style={{ width: '18rem' ,height: '20rem' ,justifyContent: 'center'}}>
                <Card.Body>
                    <Card.Title className = {styles.cardStyle}>View Matches</Card.Title>
                    <Card.Text className={styles.msg}>
                        View current schedule of matches
                    </Card.Text>
                    <div className={styles.buttonText}>
                    <Button variant="primary">VIEW MATCH LIST</Button>
                    </div>
                </Card.Body>
            </Card>
            </Col>

             {/* View Rankings Card */}

            <Col>
            <Card style={{ width: '18rem' ,height: '20rem' ,justifyContent: 'center'}}>
                <Card.Body>
                    <Card.Title className = {styles.cardStyle}>View Rankings</Card.Title>
                    <Card.Text className={styles.msg}>
                        View current rankings
                        of competition teams
                    </Card.Text>
                    <div className={styles.buttonText}>
                    <Button variant="primary">VIEW RANKINGS</Button>
                    </div>
                </Card.Body>
            </Card>
            </Col>

            {/* View Teams Card */}

            <Col>
            <Card style={{ width: '18rem' ,height: '20rem' ,justifyContent: 'center'}}>
                <Card.Body>
                    <Card.Title className = {styles.cardStyle}>View Teams</Card.Title>
                    <Card.Text className={styles.msg}>
                        View teams competing in competition
                    </Card.Text>
                    <div className={styles.buttonText}>
                    <Button variant="primary">VIEW TEAMS</Button>
                    </div>
                </Card.Body>
            </Card>
            </Col>
            
            </Row>
            </Container>
        );
    }
}

export default HomePage;