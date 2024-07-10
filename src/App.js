import Landing from "./pages/Landing";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {useState} from "react";
import History from "./pages/History";
import Header from "./components/Header";
import Modal from "./pages/Modal";
import Deposit from "./pages/Deposit";
import Account from "./pages/Account";

function App() {

    const [openModal, setOpenModal] = useState(false);

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleOpen = () => {
        setOpenModal(true);
    };

    return (
        <Router>
            <div className={'w-full h-full'}>
                <Header handleOpen={handleOpen} handleClose={handleClose} />

                <Switch>
                    <Route exact path="/">
                        <Landing openModal={openModal} handleOpen={handleOpen} handleClose={handleClose}/>
                    </Route>
                    <Route path='/history'>
                        <History handleOpen={handleOpen} handleClose={handleClose}/>
                    </Route>
                    <Route path='/deposit'>
                        <Deposit handleOpen={handleOpen} handleClose={handleClose}/>
                    </Route>
                    <Route path='/account'>
                        <Account handleOpen={handleOpen} handleClose={handleClose}/>
                    </Route>
                </Switch>
                <Modal openModal={openModal} handleClose={handleClose}/>
            </div>
        </Router>
    );
}

export default App;
