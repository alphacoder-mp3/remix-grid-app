import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { Button } from '~/components/ui/button';

export const loader = async () => {
  // In a real app, fetch list of quizzes from database
  return json({
    quizzes: [
      { id: '1', title: 'Sample Quiz 1' },
      { id: '2', title: 'Sample Quiz 2' },
    ],
  });
};

export default function Index() {
  const { quizzes } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gray-800 p-4 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quiz Builder</h1>
          <Button asChild>
            <Link to="/quiz/admin">Create New Quiz</Link>
          </Button>
        </div>

        <div className="grid gap-4">
          {quizzes.map(quiz => (
            <div key={quiz.id} className="bg-gray-700 p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <h2 className="text-xl">{quiz.title}</h2>
                <div className="space-x-2">
                  <Button variant="outline" asChild className="bg-transparent">
                    <Link to={`/quiz/${quiz.id}`}>View</Link>
                  </Button>
                  <Button variant="outline" asChild className="bg-transparent">
                    <Link to={`/quiz/admin/${quiz.id}`}>Edit</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
