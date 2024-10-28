// File: app/routes/quiz.admin.tsx
import type { LoaderFunction, ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet';
import { Button } from '~/components/ui/button';
import { ComponentDrawer } from '~/components/quiz/component-drawer';
import { GridCanvas } from '~/components/quiz/grid-canvas';
import { getQuiz, updateQuizComponents } from '~/models/quiz.server';
import { calculateGridPosition, getDefaultComponentSize } from '~/utils/grid';
import type { QuizComponent, DragItem } from '~/utils/types';

export const loader: LoaderFunction = async ({ params }) => {
  const quiz = await getQuiz(params.id || 'default');
  if (!quiz) {
    throw new Response('Quiz not found', { status: 404 });
  }
  return json(quiz);
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const components = JSON.parse(formData.get('components') as string);

  const updatedQuiz = await updateQuizComponents(
    params.id || 'default',
    components
  );
  if (!updatedQuiz) {
    throw new Response('Failed to update quiz', { status: 500 });
  }

  return json(updatedQuiz);
};

export default function QuizAdmin() {
  const quiz = useLoaderData<typeof loader>();
  const [components, setComponents] = useState<QuizComponent[]>(
    quiz.components
  );

  const draggableItems: DragItem[] = [
    { id: 'progress', type: 'progress', label: 'Progress Bar' },
    { id: 'timer', type: 'timer', label: 'Timer' },
    { id: 'question', type: 'question', label: 'Question Text' },
    { id: 'image', type: 'image', label: 'Image' },
    { id: 'options', type: 'options', label: 'Options' },
  ];

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const gridElement = e.currentTarget.getBoundingClientRect();
    const position = calculateGridPosition(e.clientX, e.clientY, gridElement);
    const dragData = JSON.parse(e.dataTransfer.getData('application/json'));

    const newComponent: QuizComponent = {
      id: `${dragData.type}-${Date.now()}`,
      type: dragData.type,
      position,
      settings: {
        size: getDefaultComponentSize(dragData.type),
      },
    };

    setComponents([...components, newComponent]);
  };

  const handleDeleteComponent = (id: string) => {
    setComponents(components.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)]">
          <ComponentDrawer
            items={draggableItems}
            onDragStart={item => {
              event?.dataTransfer?.setData(
                'application/json',
                JSON.stringify(item)
              );
            }}
          />
        </div>

        {/* Mobile Drawer */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="lg:hidden fixed bottom-4 right-4 z-50"
            >
              Add Component
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Components</SheetTitle>
            </SheetHeader>
            <ComponentDrawer
              items={draggableItems}
              onDragStart={item => {
                event?.dataTransfer?.setData(
                  'application/json',
                  JSON.stringify(item)
                );
              }}
            />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="flex-1 p-4">
          <GridCanvas
            components={components}
            isAdminMode={true}
            onDrop={handleDrop}
            onDeleteComponent={handleDeleteComponent}
          />
        </div>
      </div>
    </div>
  );
}
