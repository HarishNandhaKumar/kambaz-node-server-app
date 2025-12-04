import QuizzesDao from "../Quizzes/dao.js";

export default function QuizRoutes(app) {
    const dao = QuizzesDao();

    // Get all quizzes for a course
    const findQuizzesForCourse = async (req, res) => {
        try {
            const { courseId } = req.params;
            console.log('GET /api/courses/:courseId/quizzes - Course:', courseId);
            const quizzes = await dao.findQuizzesForCourse(courseId);
            res.json(quizzes);
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({ message: error.message });
        }
    };

    // Get a single quiz by ID
    const findQuizById = async (req, res) => {
        try {
            const { quizId } = req.params;
            console.log('GET /api/quizzes/:quizId - Quiz:', quizId);
            const quiz = await dao.findQuizById(quizId);
            res.json(quiz);
        } catch (error) {
            console.error('Error:', error.message);
            res.status(404).json({ message: error.message });
        }
    };

    // Delete a quiz
    const deleteQuiz = async (req, res) => {
        try {
            const { quizId } = req.params;
            console.log('DELETE /api/quizzes/:quizId - Quiz:', quizId);
            const result = await dao.deleteQuiz(quizId);
            res.json(result);
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({ message: error.message });
        }
    };

    // Update a quiz
    const updateQuiz = async (req, res) => {
        try {
            const { quizId } = req.params;
            console.log('PUT /api/quizzes/:quizId - Quiz:', quizId);
            const updatedQuiz = await dao.updateQuiz(quizId, req.body);
            res.json(updatedQuiz);
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({ message: error.message });
        }
    };

    const createQuiz = async (req, res) => {
        try {
            const { courseId } = req.params;
            console.log('POST /api/courses/:courseId/quizzes');
            const quizData = {
                ...req.body,
                course: courseId
            };
            const newQuiz = await dao.createQuiz(quizData);
            res.status(201).json(newQuiz);
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({ message: error.message });
        }
    };

    // Register routes
    app.get("/api/courses/:courseId/quizzes", findQuizzesForCourse);
    app.get("/api/quizzes/:quizId", findQuizById);
    app.delete("/api/quizzes/:quizId", deleteQuiz);
    app.put("/api/quizzes/:quizId", updateQuiz);
    app.post("/api/courses/:courseId/quizzes", createQuiz);
}