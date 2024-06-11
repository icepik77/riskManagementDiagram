declare module 'react-sortable-tree' {
    import { ComponentType } from 'react';
  
    interface Node {
      title: string;
      children?: Node[];
    }
  
    interface SortableTreeProps {
      treeData: Node[];
      onChange: (treeData: Node[]) => void;
      // Другие свойства, если необходимо
    }
  
    const SortableTree: ComponentType<SortableTreeProps>;
  
    export default SortableTree;
  }