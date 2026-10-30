export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: CourseLevel;
  isOfficial: boolean;
  image: string;
  courseStats: CourseStats;
}

export type CourseLevel = "beginner" | "intermediate" | "advanced";

export interface CourseStats {
  difficulty: number;
  actualization: number;
  utility: number;
}
