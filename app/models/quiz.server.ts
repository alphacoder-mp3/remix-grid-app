// File: app/models/quiz.server.ts
import type { Quiz, QuizComponent } from '~/utils/types';

// Initialize with some sample data
let QUIZZES: Quiz[] = [
  {
    id: '1',
    title: 'Sample Quiz 1',
    components: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Sample Quiz 2',
    components: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function getQuiz(id: string): Promise<Quiz | null> {
  return QUIZZES.find(quiz => quiz.id === id) || null;
}

export async function createQuiz(title: string): Promise<Quiz> {
  const quiz: Quiz = {
    id: Math.random().toString(36).substr(2, 9),
    title,
    components: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  QUIZZES.push(quiz);
  return quiz;
}

export async function updateQuizComponents(
  id: string,
  components: QuizComponent[]
): Promise<Quiz | null> {
  const quizIndex = QUIZZES.findIndex(quiz => quiz.id === id);
  if (quizIndex === -1) {
    // Create new quiz if it doesn't exist
    const newQuiz: Quiz = {
      id,
      title: 'New Quiz',
      components,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    QUIZZES.push(newQuiz);
    return newQuiz;
  }

  QUIZZES[quizIndex] = {
    ...QUIZZES[quizIndex],
    components,
    updatedAt: new Date(),
  };

  return QUIZZES[quizIndex];
}

export async function deleteQuiz(id: string): Promise<boolean> {
  const initialLength = QUIZZES.length;
  QUIZZES = QUIZZES.filter(quiz => quiz.id !== id);
  return QUIZZES.length !== initialLength;
}
