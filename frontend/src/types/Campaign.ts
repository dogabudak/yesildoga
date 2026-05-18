export interface Milestone {
  id: number;
  title: string;
  target_date: string;
  is_completed: boolean;
  order: number;
}

export interface CampaignGoal {
  id: number;
  title: string;
  description: string;
  target_amount: number | null;
  raised_amount: number;
  status: 'PLANNING' | 'ACTIVE' | 'COMPLETED';
  order: number;
}

export interface CampaignSummary {
  slug: string;
  name: string;
  tagline: string;
  icon: string;
  accent_color: string;
  location: string;
  goal_amount: number;
  raised_amount: number;
  display_order: number;
  milestone_count: number;
  milestones_completed: number;
}

export interface CampaignDetail {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  accent_color: string;
  location: string;
  target_metric: string;
  budget: string;
  timeline: string;
  goal_amount: number;
  raised_amount: number;
  is_active: boolean;
  display_order: number;
  milestones: Milestone[];
  goals: CampaignGoal[];
}
