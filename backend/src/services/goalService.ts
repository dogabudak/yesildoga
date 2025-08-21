import { GoalProgress } from '../types/index.js';

export class GoalService {
  private goals: Map<string, GoalProgress> = new Map();

  constructor() {
    this.initializeGoals();
  }

  private initializeGoals() {
    const defaultGoals: GoalProgress[] = [
      {
        id: 'forest',
        type: 'forest',
        current: 1247,
        target: 2000,
        description: 'Trees planted to restore forests',
      },
      {
        id: 'agriculture',
        type: 'agriculture', 
        current: 856,
        target: 1500,
        description: 'Sustainable farming projects supported',
      },
      {
        id: 'charity',
        type: 'charity',
        current: 423,
        target: 1000,
        description: 'Charitable causes funded',
      },
      {
        id: 'education',
        type: 'education',
        current: 312,
        target: 800,
        description: 'Educational programs supported',
      },
      {
        id: 'seas',
        type: 'seas',
        current: 678,
        target: 1200,
        description: 'Ocean cleanup initiatives funded',
      },
    ];

    defaultGoals.forEach(goal => {
      this.goals.set(goal.id, goal);
    });
  }

  getAllGoals(): GoalProgress[] {
    return Array.from(this.goals.values());
  }

  getGoal(goalId: string): GoalProgress | undefined {
    return this.goals.get(goalId);
  }

  incrementGoal(goalId: string, amount: number = 1): GoalProgress | null {
    const goal = this.goals.get(goalId);
    if (!goal) {
      return null;
    }

    goal.current = Math.min(goal.current + amount, goal.target);
    this.goals.set(goalId, goal);
    return goal;
  }

  updateGoal(goalId: string, progress: number): GoalProgress | null {
    const goal = this.goals.get(goalId);
    if (!goal) {
      return null;
    }

    goal.current = Math.max(0, Math.min(progress, goal.target));
    this.goals.set(goalId, goal);
    return goal;
  }

  getProgressPercentage(goalId: string): number {
    const goal = this.goals.get(goalId);
    if (!goal) {
      return 0;
    }
    return (goal.current / goal.target) * 100;
  }
}