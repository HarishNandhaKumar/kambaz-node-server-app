import AssignmentsDao from "../Assignments/dao.js";

export default function AssignmentRoutes(app, db) {

    const dao = AssignmentsDao(db)

    const findAssignmentsForCourse = (req, res) => {
        const { courseId } = req.params;
        const assignments= dao.findAssignmentsForCourse(courseId);
        res.json(assignments);
    }

    const createAssignment = (req, res) => {
        const { courseId } = req.params;
        const assignment = {
            ...req.body,
            course: courseId,
        };
        const newAssignment = dao.createAssignment(assignment);
        res.json(newAssignment);
    };

    const updateAssignment = (req, res) => {
        const { assignmentId } = req.params;
        const assignmentUpdates = req.body;
        const updatedAssignment = dao.updateAssignment(assignmentId, assignmentUpdates);
        if (updatedAssignment) {
            res.json(updatedAssignment);
        } else {
            res.status(404).json({ message: "Assignment not found" });
        }
    };

    const deleteAssignment = (req, res) => {
        const { assignmentId } = req.params;
        dao.deleteAssignment(assignmentId);
        res.sendStatus(204);
    };

    app.post("/api/courses/:courseId/assignments", createAssignment);
    app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
    app.put("/api/assignments/:assignmentId", updateAssignment);
    app.delete("/api/assignments/:assignmentId", deleteAssignment);

}
