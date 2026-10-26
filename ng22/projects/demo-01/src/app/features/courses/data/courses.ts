import { Course } from "../types/course";

export const COURSES: Course[] = [{
  id: 1,
  title: "Angular Basics",
  description: "Learn the basics of Angular",
  duration: "2 hours",
  level:  "beginner",
  isOfficial: true,
  image: "/assets/angular-fundamentals.webp",
  courseStats: {
    difficulty: 1,
    actualization: 1,
    utility: 1
  }
}];

export const getCourses = (): Course[] => COURSES;