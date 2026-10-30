import { Component, computed, signal } from '@angular/core';
import { Course } from '../../types/course';
import { COURSES } from '../../data/courses';

const MIN_STAT = 0;
const MAX_STAT = 10;

@Component({
  imports: [],
  selector: 'ind-course-details',
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      margin: 1rem;
      padding: 1rem;
      border: 1px solid var(--color-primary);
      border-radius: 4px;
    }
    img {
      width: 300px;
    }
    .details {
      text-align: center;
    }

    .course-title {
      font-weight: bolder;
      font-size: 1.4rem;
      margin-block: 0.5rem;
      text-align: center;
    }

    .course-stats {
      display: flex;
      gap: 1rem;
      justify-content: space-between;
      align-items: center;

      .course-courseStats-buttons {
        display: flex;
        gap: 0.5rem;
      }
    }

    .average {
      margin-block-start: 0.5rem;
      padding-block-start: 0.5rem;
      border-top: 1px solid var(--color-primary);
    }

    /* clase de aplicación opcional */
    .course-advanced {
      background-color: var(--color-primary);
      color: var(--color-background);
    }
  `,
  template: `
    <header>
      <img [src]="course().image" [alt]="course().title" />
      <h3 class="course-title" [title]="'ID: ' + course().id">{{ course().title }}</h3>
    </header>

    <section class="details">
      <p>{{ course().description }}</p>
      <p>{{ course().duration }}</p>
      <p>{{ course().level }}</p>
      <p>{{ course().isOfficial ? 'Official' : 'Unofficial' }}</p>
    </section>

    <section class="stats">
      <div class="course-stats" aria-label="Utilidad">
        <span
          >Utilidad: <output>{{ course().courseStats.utility }}</output></span
        >
        <div class="course-courseStats-buttons">
          <button
            (click)="changeStat('utility', -1)"
            [disabled]="course().courseStats.utility <= minStat"
          >
            ➖
          </button>
          <button
            (click)="changeStat('utility', 1)"
            [disabled]="course().courseStats.utility >= maxStat"
          >
            ➕
          </button>
          <button
            [title]="'Reset utilidad a 0'"
            (click)="changeStat('utility', 0)"
            [disabled]="course().courseStats.utility === minStat"
          >
            🔄️
          </button>
        </div>
      </div>

      <div class="course-stats" aria-label="Dificultad">
        <span
          >Dificultad: <output>{{ course().courseStats.difficulty }}</output></span
        >
        <div class="course-courseStats-buttons">
          <button
            (click)="changeStat('difficulty', -1)"
            [disabled]="course().courseStats.difficulty <= minStat"
          >
            ➖
          </button>
          <button
            (click)="changeStat('difficulty', 1)"
            [disabled]="course().courseStats.difficulty >= maxStat"
          >
            ➕
          </button>
          <button
            [title]="'Reset dificultad a 0'"
            (click)="changeStat('difficulty', 0)"
            [disabled]="course().courseStats.difficulty === minStat"
          >
            🔄️
          </button>
        </div>
      </div>

      <div class="course-stats" aria-label="Actualización">
        <span
          >Actualización: <output>{{ course().courseStats.actualization }}</output></span
        >
        <div class="course-courseStats-buttons">
          <button
            (click)="changeStat('actualization', -1)"
            [disabled]="course().courseStats.actualization <= minStat"
          >
            ➖
          </button>
          <button
            (click)="changeStat('actualization', 1)"
            [disabled]="course().courseStats.actualization >= maxStat"
          >
            ➕
          </button>
          <button
            [title]="'Reset actualización a 0'"
            (click)="changeStat('actualization', 0)"
            [disabled]="course().courseStats.actualization === minStat"
          >
            🔄️
          </button>
        </div>
      </div>

  <div class="course-stats average" aria-label="Rating">
  <span>
    Rating (Average):
    <output>
      {{average().toFixed(2)}}
    </output>
  </span>
  <div class="course-courseStats-buttons">

    <button
      [disabled]="average() === 0"
      (click)="resetStatsAll()"
      [title]="'Reset todo a 0'"
    >
      🔄
    </button>
  </div>
</div>
    </section>
  `,
})
export class CourseDetails {
  protected readonly minStat = MIN_STAT;
  protected readonly maxStat = MAX_STAT;

  protected readonly course = signal(COURSES[0]);
  protected readonly average = computed(() => {
    const course = this.course();
    return (
      (course.courseStats.utility +
        course.courseStats.difficulty +
        course.courseStats.actualization) /
      3
    );
  });

  protected changeStat(stat: keyof Course['courseStats'], delta = 0): void {
    console.log('Change stat clicked', delta);
    // forma incorrecta de hacerlo,
    // ya que no se puede mutar directamente el objeto de la señal
    //this.course().courseStats.utility += delta;

    this.course.update((course) => {
      const newUValue = delta === 0 ? this.minStat : course.courseStats[stat] + delta;
      return {
        ...course,
        courseStats: {
          ...course.courseStats,
          [stat]: newUValue,
        },
      };
    });
  }

  protected resetStatsAll(): void {
    this.course.update((course) => {
      return {
        ...course,
        courseStats: {
          utility: this.minStat,
          difficulty: this.minStat,
          actualization: this.minStat,
        },
      };
    });
  }
}
