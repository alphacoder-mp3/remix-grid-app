export type ComponentType =
  | 'progress'
  | 'timer'
  | 'question'
  | 'image'
  | 'options';

export interface QuizComponent {
  id: string;
  type: ComponentType;
  position: { x: number; y: number };
  content?: string;
}
