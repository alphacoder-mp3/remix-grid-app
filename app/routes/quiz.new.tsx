import { redirect } from '@remix-run/node';
import type { ActionFunction } from '@remix-run/node';
import { createQuiz } from '~/models/quiz.server';

export const action: ActionFunction = async () => {
  const quiz = await createQuiz('New Quiz');
  return redirect(`/quiz/admin/${quiz.id}`);
};
