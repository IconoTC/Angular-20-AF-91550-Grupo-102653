import { Course } from "../types/course";

export const COURSES: Course[] = [{
  id: 1,
  title: "Angular Basics",
  description: "Learn the basics of Angular",
  duration: "30 hours",
  level:  "beginner",
  isOfficial: true,
  image: "/assets/angular-fundamentals.webp",
  courseStats: {
    difficulty: 8,
    actualization: 7,
    utility: 8
  }
}];

export const getCourses = (): Course[] => COURSES;