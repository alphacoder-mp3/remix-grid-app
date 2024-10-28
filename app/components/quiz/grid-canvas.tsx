import type { QuizComponent } from '~/utils/types';
import { QuizComponent as QuizComponentView } from './quiz-component';

interface Props {
  components: QuizComponent[];
  isAdminMode: boolean;
  onDrop: (e: React.DragEvent) => void;
  onDeleteComponent: (id: string) => void;
}

export const GridCanvas = ({
  components,
  isAdminMode,
  onDrop,
  onDeleteComponent,
}: Props) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className="bg-gray-700 rounded-lg border border-gray-200 min-h-[600px] grid grid-cols-12 gap-1 p-4 text-white"
      onDragOver={handleDragOver}
      onDrop={onDrop}
    >
      {components.map((component, index) => (
        <QuizComponentView
          key={component.id}
          component={component}
          index={index}
          isAdminMode={isAdminMode}
          onDelete={onDeleteComponent}
        />
      ))}
    </div>
  );
};
