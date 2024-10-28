// File: app/utils/types.ts
export type ComponentType =
  | 'progress'
  | 'timer'
  | 'question'
  | 'image'
  | 'options';

export interface Position {
  x: number;
  y: number;
}

export interface QuizComponent {
  id: string;
  type: ComponentType;
  position: Position;
  content?: string;
  settings?: {
    size?: { width: number; height: number };
    style?: Record<string, string>;
  };
}

export interface Quiz {
  id: string;
  title: string;
  components: QuizComponent[];
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizState {
  components: QuizComponent[];
  currentQuestion: number;
  totalQuestions: number;
}

export interface DragItem {
  id: string;
  type: ComponentType;
  label: string;
}
