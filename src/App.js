import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Landing from "./pages/Landing";
import History from "./pages/History";
import Modal from "./pages/Modal";
import Deposit from "./pages/Deposit";
import Account from "./pages/Account";
import GraphTest from "./pages/GraphTest";
import AnimatedPage from './components/AnimatedPage';
import PetalCenter from "./pages/PetalCenter";

function App() {
    const [openModal, setOpenModal] = useState(false);
    const location = useLocation();
    const history = useHistory();
    const [isNavigating, setIsNavigating] = useState(false);

    useEffect(() => {
        if (isNavigating) {
            const timer = setTimeout(() => {
                setIsNavigating(false);
                history.push(location.pathname);
            }, 1000); // Delay of 2 seconds

            return () => clearTimeout(timer);
        }
    }, [isNavigating, location, history]);


    const handleClose = () => setOpenModal(false);
    const handleOpen = () => setOpenModal(true);

    const pageTransition = {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
    };

    return (
        <div className="w-full h-full">
            <AnimatePresence mode={'wait'} onExitComplete={() => !isNavigating && history.push(location.pathname)}>
                <Switch location={location} key={location.pathname}>
                    <Route exact path="/">
                        <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
                            <AnimatedPage>
                                <Landing openModal={openModal} handleOpen={handleOpen} handleClose={handleClose} />
                            </AnimatedPage>
                        </motion.div>
                    </Route>
                    <Route path="/history">
                        <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
                            <AnimatedPage>
                                <History handleOpen={handleOpen} handleClose={handleClose} />
                            </AnimatedPage>
                        </motion.div>
                    </Route>
                    <Route path="/deposit">
                        <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
                            <AnimatedPage>
                                <Deposit handleOpen={handleOpen} handleClose={handleClose} />
                            </AnimatedPage>
                        </motion.div>
                    </Route>
                    <Route path="/account">
                        <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
                            <AnimatedPage>
                                <Account handleOpen={handleOpen} handleClose={handleClose} />
                            </AnimatedPage>
                        </motion.div>
                    </Route>
                    <Route path="/petal">
                        <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
                            <AnimatedPage>
                                <PetalCenter/>
                            </AnimatedPage>
                        </motion.div>
                    </Route>
                    <Route path="/graph">
                        <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
                            <AnimatedPage>
                                <GraphTest/>
                            </AnimatedPage>
                        </motion.div>
                    </Route>
                </Switch>
            </AnimatePresence>
            <Modal openModal={openModal} handleClose={handleClose} />
        </div>
    );
}

function AppWrapper() {
    return (
        <Router>
            <Route component={App} />
        </Router>
    );
}

export default AppWrapper;
