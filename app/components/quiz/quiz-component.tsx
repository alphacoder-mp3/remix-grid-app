// File: app/components/quiz/QuizComponent.tsx
import { Timer, Image as ImageIcon } from 'lucide-react';
import { Button } from '~/components/ui/button';
import type { QuizComponent as QuizComponentType } from '~/utils/types';

interface Props {
  component: QuizComponentType;
  index: number;
  isAdminMode: boolean;
  onDelete?: (id: string) => void;
}

export const QuizComponent = ({
  component,
  index,
  isAdminMode,
  onDelete,
}: Props) => {
  const renderComponent = () => {
    switch (component.type) {
      case 'progress':
        return (
          <div className="h-2 bg-blue-200 rounded-full mt-6">
            <div className="h-full w-1/2 bg-blue-600 rounded-full"></div>
          </div>
        );
      case 'timer':
        return (
          <div className="flex items-center gap-2 mt-6">
            <Timer className="w-4 h-4" /> 30:00
          </div>
        );
      case 'question':
        return (
          <p className="text-lg">
            {component.content || 'What is the capital of France?'}
          </p>
        );
      case 'image':
        return (
          <div className="aspect-video bg-gray-600 flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-gray-400" />
          </div>
        );
      case 'options':
        return (
          <div className="grid grid-cols-2 gap-2">
            {['Paris', 'London', 'Berlin', 'Madrid'].map((option, i) => (
              <Button key={i} variant="outline" className="w-full bg-black">
                {option}
              </Button>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`
        col-span-${component.settings?.size?.width || 2}
        row-span-${component.settings?.size?.height || 2}
        p-2 bg-neutral-800 rounded-lg shadow-sm text-white
        relative
      `}
    >
      {isAdminMode && (
        <Button
          variant="outline"
          size="sm"
          className="absolute -top-2 -right-2 z-10 bg-transparent"
          onClick={() => onDelete?.(component.id)}
        >
          ×
        </Button>
      )}
      {renderComponent()}
    </div>
  );
};
