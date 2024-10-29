// File: app/routes/quiz.$id.tsx
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { GridCanvas } from '~/components/quiz/grid-canvas';
import { getQuiz } from '~/models/quiz.server';

export const loader: LoaderFunction = async ({ params }) => {
  const quiz = await getQuiz(params.id!);
  if (!quiz) {
    throw new Response('Quiz not found', { status: 404 });
  }
  return json(quiz);
};

export default function QuizView() {
  const quiz = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gray-800 p-4 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">{quiz.title}</h1>
        <GridCanvas
          components={quiz.components}
          isAdminMode={false}
          onDrop={() => {}}
          onDeleteComponent={() => {}}
        />
      </div>
    </div>
  );
}
