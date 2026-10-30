import { delay, firstValueFrom, Observable, of, throwError } from 'rxjs';
import { Course } from '../types/course';

export const COURSES: Course[] = [
  {
    id: '1',
    title: 'Angular Basics',
    description: 'Learn the basics of Angular',
    duration: '30 hours',
    level: 'beginner',
    isOfficial: true,
    image: '/assets/angular-fundamentals.webp',
    courseStats: {
      difficulty: 8,
      actualization: 7,
      utility: 8,
    },
  },
  {
    id: '2',
    title: 'Advanced Angular',
    description: 'Dive deep into Angular',
    duration: '6 hours',
    level: 'advanced',
    image: 'assets/angular-advanced.webp',
    isOfficial: false,
    courseStats: {
      difficulty: 5,
      actualization: 5,
      utility: 5,
    },
  },
  {
    id: '3',
    title: 'Angular Performance',
    description: 'Optimize your Angular applications',
    duration: '5 hours',
    level: 'intermediate',
    image: 'assets/angular-performance.webp',
    isOfficial: true,
    courseStats: {
      difficulty: 4,
      actualization: 5,
      utility: 5,
    },
  },
];

export const getCourses = (isOk = true): Observable<Course[]> => {
  if (isOk) {
    return of([]).pipe(delay(2000));
  } else {
    return throwError(() => new Error('Failed to fetch courses')).pipe(delay(2000));
  }
};

export const getCoursesPromise = (isOk = true): Promise<Course[]> => firstValueFrom(
  getCourses(isOk)
);


