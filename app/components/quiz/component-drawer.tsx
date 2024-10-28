import { Timer, Image as ImageIcon, Type, BarChart3 } from 'lucide-react';
import type { DragItem } from '~/utils/types';

interface Props {
  items: DragItem[];
  onDragStart: (item: DragItem) => void;
}

export const ComponentDrawer = ({ items, onDragStart }: Props) => (
  <div className="p-4">
    <div className="space-y-4">
      {items.map(item => (
        <div
          key={item.id}
          draggable
          onDragStart={() => onDragStart(item)}
          className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 cursor-move"
        >
          {item.type === 'timer' && <Timer className="w-6 h-6" />}
          {item.type === 'image' && <ImageIcon className="w-6 h-6" />}
          {item.type === 'question' && <Type className="w-6 h-6" />}
          {item.type === 'progress' && <BarChart3 className="w-6 h-6" />}
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  </div>
);
