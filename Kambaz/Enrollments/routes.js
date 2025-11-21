import EnrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app, db) {
    const enrollmentsDao = EnrollmentsDao(db);

    const enrollUserInCourse = async (req, res) => {
        let { userId, courseId } = req.params;
        
        if (userId === "current") {
            const currentUser = await req.session["currentUser"];
            if (!currentUser) {
                res.status(401).json({ message: "Must be logged in to enroll" });
                return;
            }
            userId = currentUser._id;
        }

        const newEnrollment = await enrollmentsDao.enrollUserInCourse(userId, courseId);
        res.json(newEnrollment);
    };

    const unenrollUserFromCourse = async (req, res) => {
        let { userId, courseId } = req.params;
        
        if (userId === "current") {
            const currentUser = await req.session["currentUser"];
            if (!currentUser) {
                res.status(401).json({ message: "Must be logged in to unenroll" });
                return;
            }
            userId = currentUser._id;
        }

        await enrollmentsDao.unenrollUserFromCourse(userId, courseId);
        res.sendStatus(204);
    };

    const findAllEnrollments = async (req, res) => {
        const enrollments = await enrollmentsDao.findAllEnrollments();
        res.json(enrollments);
    };

    const findEnrollmentsForUser = async (req, res) => {
        let { userId } = req.params;
        
        if (userId === "current") {
            const currentUser = await req.session["currentUser"];
            if (!currentUser) {
                res.status(401).json({ message: "Must be logged in" });
                return;
            }
            userId = currentUser._id;
        }

        const enrollments = await enrollmentsDao.findEnrollmentsForUser(userId);
        res.json(enrollments);
    };

    const findUsersForCourse = async (req, res) => {
        const { courseId } = req.params;
        const users = await enrollmentsDao.findUsersForCourse(courseId);
        res.json(users);
    };
    
    app.post("/api/users/:userId/courses/:courseId", enrollUserInCourse);
    app.delete("/api/users/:userId/courses/:courseId", unenrollUserFromCourse);
    app.get("/api/enrollments", findAllEnrollments);
    app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
    app.get("/api/courses/:courseId/users", findUsersForCourse);
}