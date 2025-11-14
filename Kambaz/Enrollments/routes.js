import EnrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app, db) {
    const enrollmentsDao = EnrollmentsDao(db);

    const enrollUserInCourse = (req, res) => {
        let { userId, courseId } = req.params;
        
        if (userId === "current") {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                res.status(401).json({ message: "Must be logged in to enroll" });
                return;
            }
            userId = currentUser._id;
        }

        const newEnrollment = enrollmentsDao.enrollUserInCourse(userId, courseId);
        res.json(newEnrollment);
    };

    const unenrollUserFromCourse = (req, res) => {
        let { userId, courseId } = req.params;
        
        if (userId === "current") {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                res.status(401).json({ message: "Must be logged in to unenroll" });
                return;
            }
            userId = currentUser._id;
        }

        enrollmentsDao.unenrollUserFromCourse(userId, courseId);
        res.sendStatus(204);
    };

    const findAllEnrollments = (req, res) => {
        const enrollments = enrollmentsDao.findAllEnrollments();
        res.json(enrollments);
    };

    const findEnrollmentsForUser = (req, res) => {
        let { userId } = req.params;
        
        if (userId === "current") {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                res.status(401).json({ message: "Must be logged in" });
                return;
            }
            userId = currentUser._id;
        }

        const enrollments = enrollmentsDao.findEnrollmentsForUser(userId);
        res.json(enrollments);
    };
    

    app.post("/api/users/:userId/courses/:courseId", enrollUserInCourse);
    app.delete("/api/users/:userId/courses/:courseId", unenrollUserFromCourse);
    app.get("/api/enrollments", findAllEnrollments);
    app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
}