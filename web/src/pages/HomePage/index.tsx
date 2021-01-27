import * as React from 'react';

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
            <div>Home Page!</div>
        );
    }
}

export default HomePage;