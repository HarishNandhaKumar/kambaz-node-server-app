import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
    let { enrollments } = db;

    const enrollUserInCourse = (userId, courseId) => {
        const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
        enrollments.push(newEnrollment);
        return newEnrollment;
    };

    const unenrollUserFromCourse = (userId, courseId) => {
        const index = enrollments.findIndex(
            (enrollment) => enrollment.user === userId && enrollment.course === courseId
        );
        if (index !== -1) {
            enrollments.splice(index, 1);
        }
    };

    const findEnrollmentsForUser = (userId) => {
        return enrollments.filter((enrollment) => enrollment.user === userId);
    };

    const findEnrollmentsForCourse = (courseId) => {
        return enrollments.filter((enrollment) => enrollment.course === courseId);
    };

    const findAllEnrollments = () => {
        return enrollments;
    };

    const deleteEnrollmentsForCourse = (courseId) => {
        for (let i = enrollments.length - 1; i >= 0; i--) {
            if (enrollments[i].course === courseId) {
                enrollments.splice(i, 1);
            }
        }
    };

    return { 
        enrollUserInCourse, 
        unenrollUserFromCourse, 
        findEnrollmentsForUser,
        findEnrollmentsForCourse,
        findAllEnrollments,
        deleteEnrollmentsForCourse
    };
}