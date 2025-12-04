import QuizAttemptsDao from "../QuizAttempts/dao.js";

export default function QuizAttemptRoutes(app) {
    const dao = QuizAttemptsDao();

    // Get all attempts for a quiz by a student
    const findAttemptsForQuiz = async (req, res) => {
        try {
            const { quizId } = req.params;
            const currentUser = req.session.currentUser;
            
            if (!currentUser) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const attempts = await dao.findAttemptsForQuiz(quizId, currentUser._id);
            res.json(attempts);
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({ message: error.message });
        }
    };

    // Get attempt count for a quiz
    const getAttemptCount = async (req, res) => {
        try {
            const { quizId } = req.params;
            const currentUser = req.session.currentUser;
            
            if (!currentUser) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const count = await dao.getAttemptCount(quizId, currentUser._id);
            res.json({ count });
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({ message: error.message });
        }
    };

    // Get last attempt for a quiz
    const getLastAttempt = async (req, res) => {
        try {
            const { quizId } = req.params;
            const currentUser = req.session.currentUser;
            
            if (!currentUser) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const attempt = await dao.getLastAttempt(quizId, currentUser._id);
            res.json(attempt);
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({ message: error.message });
        }
    };

    // Submit a quiz attempt
    const submitAttempt = async (req, res) => {
        try {
            const { quizId } = req.params;
            const currentUser = req.session.currentUser;
            
            if (!currentUser) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const attemptData = {
                quiz: quizId,
                student: currentUser._id,
                answers: req.body.answers,
                score: req.body.score,
                maxScore: req.body.maxScore
            };

            const attempt = await dao.createAttempt(attemptData);
            res.status(201).json(attempt);
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({ message: error.message });
        }
    };

    // Register routes
    app.get("/api/quizzes/:quizId/attempts", findAttemptsForQuiz);
    app.get("/api/quizzes/:quizId/attempt-count", getAttemptCount);
    app.get("/api/quizzes/:quizId/last-attempt", getLastAttempt);
    app.post("/api/quizzes/:quizId/attempts", submitAttempt);
}