import React, { useState, useEffect } from "react";
import {
    HashRouter as Router,
    Routes,
    Route,
    NavLink,
    useLocation,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, RotateCcw } from "lucide-react";
import "./App.css";

// git init
// git add .
// git commit -m "qwer"
// git push origin main
// npm run deploy
// https://github.com/Zhomart123/counter-app/settings/pages

const CounterPage = ({ title, storageKey }) => {
    const GOAL = 200;

    const [count, setCount] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? parseInt(saved, 10) : 0;
    });

    useEffect(() => {
        localStorage.setItem(storageKey, count);
    }, [count, storageKey]);

    const isGoalReached = count >= GOAL;

    const springConfig = {
        type: "spring",
        stiffness: 1000,
        damping: 30,
        mass: 0.2,
    };

    return (
        <motion.div
            className="page-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="counter-card">
                <h1>{title}</h1>

                <div
                    className="progress-text"
                    style={{ color: isGoalReached ? "#4ade80" : "#fb7185" }}
                >
                    {isGoalReached
                        ? "Great work! 🎉"
                        : `more is needed: ${GOAL - count}`}
                </div>

                <div className="count-wrapper">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={count}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                color: isGoalReached ? "#4ade80" : "#ffffff",
                            }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={springConfig}
                            className="count-display"
                        >
                            {count}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="btn-group">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="btn-reset"
                        onClick={() => setCount(0)}
                        style={{
                            opacity: 1,
                            cursor: "pointer",
                        }}
                    >
                        <RotateCcw size={20} />
                    </motion.button>

                    <motion.button
                        whileTap={{ scale: 0.8 }}
                        transition={springConfig}
                        className="btn-main"
                        onClick={() => setCount((prev) => prev + 1)}
                        style={{
                            boxShadow: isGoalReached
                                ? "0 0 30px rgba(74, 222, 128, 0.5)"
                                : "",
                        }}
                    >
                        <Plus size={40} strokeWidth={3} />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};
const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/"
                    element={
                        <CounterPage
                            title="Субханаллаһи уә бихамдихи, субханаллаһи 'азим"
                            storageKey="counter_1"
                        />
                    }
                />
                <Route
                    path="/page2"
                    element={
                        <CounterPage
                            title="«Аллаһумма салли‘аләә сайидинәә Мұхаммадин уа ‘аләә аали сайидинәә Мухаммәд»"
                            storageKey="counter_2"
                        />
                    }
                />
                <Route
                    path="/page3"
                    element={
                        <CounterPage
                            title="Астағфируллаһ әл-‘азыийим, әл-ләзии ләә иләәһә иләә һуәл-хайюль-қоййум, уә әтуубу иләййһ"
                            storageKey="counter_3"
                        />
                    }
                />
            </Routes>
        </AnimatePresence>
    );
};

function App() {
    return (
        <Router>
            <div className="app-container">
                <nav>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Зікір
                    </NavLink>
                    <NavLink
                        to="/page2"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Салауат
                    </NavLink>
                    <NavLink
                        to="/page3"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Истиғфар
                    </NavLink>
                </nav>
                <AnimatedRoutes />
            </div>
        </Router>
    );
}

export default App;
