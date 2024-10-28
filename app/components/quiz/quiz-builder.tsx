import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from '~/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '~/components/ui/sheet';
import {
  Timer,
  LayoutGrid,
  Image as ImageIcon,
  Type,
  BarChart3,
  Menu,
} from 'lucide-react';
import { ComponentType } from '~/types';
interface QuizComponent {
  id: string;
  type: ComponentType;
  position: { x: number; y: number };
  content?: string;
}
const GRID_SIZE = 12; // 12x12 grid for better responsiveness

const QuizBuilder = () => {
  const [components, setComponents] = useState<QuizComponent[]>([]);
  const [isAdminMode, setIsAdminMode] = useState(true);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const draggableItems = [
    {
      id: 'progress',
      icon: <BarChart3 className="w-6 h-6" />,
      label: 'Progress Bar',
    },
    { id: 'timer', icon: <Timer className="w-6 h-6" />, label: 'Timer' },
    {
      id: 'question',
      icon: <Type className="w-6 h-6" />,
      label: 'Question Text',
    },
    { id: 'image', icon: <ImageIcon className="w-6 h-6" />, label: 'Image' },
    {
      id: 'options',
      icon: <LayoutGrid className="w-6 h-6" />,
      label: 'Options',
    },
  ];

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newComponent: QuizComponent = {
      id: `${result.draggableId}-${Date.now()}`,
      type: result.draggableId as ComponentType,
      position: {
        x: Math.floor(result.destination.x / (100 / GRID_SIZE)),
        y: Math.floor(result.destination.y / (100 / GRID_SIZE)),
      },
    };

    setComponents([...components, newComponent]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-xl font-semibold">Quiz Builder</h1>
          <div className="flex items-center gap-4">
            <Button
              variant={isAdminMode ? 'default' : 'outline'}
              onClick={() => setIsAdminMode(true)}
            >
              Admin Mode
            </Button>
            <Button
              variant={!isAdminMode ? 'default' : 'outline'}
              onClick={() => setIsAdminMode(false)}
            >
              User Mode
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Mobile Drawer Trigger */}
        <Button
          variant="outline"
          className="lg:hidden fixed bottom-4 right-4 z-50"
          onClick={() => setIsMobileDrawerOpen(true)}
        >
          <Menu className="w-4 h-4" />
        </Button>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)]">
          <ComponentDrawer items={draggableItems} />
        </div>

        {/* Mobile Drawer */}
        <Sheet open={isMobileDrawerOpen} onOpenChange={setIsMobileDrawerOpen}>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Components</SheetTitle>
            </SheetHeader>
            <ComponentDrawer items={draggableItems} />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex-1 p-4">
            <Droppable droppableId="canvas">
              {provided => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white rounded-lg border border-gray-200 min-h-[600px] grid grid-cols-12 gap-1 p-4"
                >
                  {components.map((component, index) => (
                    <QuizComponent
                      key={component.id}
                      component={component}
                      index={index}
                      isAdminMode={isAdminMode}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

// Component Drawer
const ComponentDrawer = ({ items }: { items: any[] }) => (
  <div className="p-4">
    <div className="space-y-4">
      {items.map(item => (
        <Draggable key={item.id} draggableId={item.id} index={0}>
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 cursor-move"
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          )}
        </Draggable>
      ))}
    </div>
  </div>
);

// Quiz Component
const QuizComponent = ({
  component,
}: {
  component: QuizComponent;
  index: number;
  isAdminMode: boolean;
}) => {
  const renderComponent = () => {
    switch (component.type) {
      case 'progress':
        return (
          <div className="h-2 bg-blue-200 rounded-full">
            <div className="h-full w-1/2 bg-blue-600 rounded-full"></div>
          </div>
        );
      case 'timer':
        return (
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4" /> 30:00
          </div>
        );
      case 'question':
        return <p className="text-lg">What is the capital of France?</p>;
      case 'image':
        return (
          <div className="aspect-video bg-gray-100 flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-gray-400" />
          </div>
        );
      case 'options':
        return (
          <div className="grid grid-cols-2 gap-2">
            {['Paris', 'London', 'Berlin', 'Madrid'].map((option, i) => (
              <Button key={i} variant="outline" className="w-full">
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
      className={`col-span-${component.position.x} row-span-${component.position.y} p-2 bg-white rounded-lg shadow-sm`}
    >
      {renderComponent()}
    </div>
  );
};

export default QuizBuilder;
