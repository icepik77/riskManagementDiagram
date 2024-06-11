import React, { useEffect, useState } from 'react';
import SortableTree, { changeNodeAtPath, removeNodeAtPath, addNodeUnderParent } from 'react-sortable-tree';
import 'react-sortable-tree/style.css';

const Tree = ({ eventTreeElements, onUpdateTreeEvents }) => {
  const [treeData, setTreeData] = useState(eventTreeElements ? eventTreeElements : []);

  useEffect(() => {
    if (eventTreeElements) {
      setTreeData(eventTreeElements);
    }
  }, [eventTreeElements]);

  const handleNodeTitleChange = (path, title) => {
    const newTreeData = changeNodeAtPath({
      treeData,
      path,
      getNodeKey: ({ treeIndex }) => treeIndex,
      newNode: { ...getNodeAtPath(treeData, path), title },
    });
    setTreeData(newTreeData);
    onUpdateTreeEvents(newTreeData);
  };

  const handleAddNode = () => {
    const newTreeData = addNodeUnderParent({
      treeData,
      newNode: {
        title: 'New Node',
      },
      parentKey: null,
      getNodeKey: ({ treeIndex }) => treeIndex,
      expandParent: true,
    }).treeData;
    setTreeData(newTreeData);
    onUpdateTreeEvents(newTreeData);
  };

  const handleDeleteNode = (path) => {
    const newTreeData = removeNodeAtPath({
      treeData,
      path,
      getNodeKey: ({ treeIndex }) => treeIndex,
    });
    setTreeData(newTreeData);
    onUpdateTreeEvents(newTreeData);
  };

  const getNodeAtPath = (treeData, path) => {
    let currentNode = treeData;
    path.forEach(index => {
      currentNode = currentNode.children ? currentNode.children[index] : currentNode[index];
    });
    return currentNode;
  };

  return (
    <div className="p-6 md:p-12 lg:p-24 overflow-auto" style={{ height: '80vh', width: '100%' }}>
      <div className="mb-4">
        <button onClick={handleAddNode} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Node</button>
      </div>
      <div className="overflow-auto" style={{ height: 'calc(100% - 4rem)' }}>
        <SortableTree
          treeData={treeData}
          onChange={(newTreeData) => {
            setTreeData(newTreeData);
            onUpdateTreeEvents(newTreeData);
          }}
          generateNodeProps={({ node, path }) => ({
            title: (
              <div className="flex items-center">
                <input
                  type="text"
                  value={node.title}
                  onChange={(e) => handleNodeTitleChange(path, e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 mr-2 flex-grow"
                />
                <button onClick={() => handleDeleteNode(path)} className="text-red-500 hover:text-red-700">Delete</button>
              </div>
            ),
          })}
        />
      </div>
    </div>
  );
};

export default Tree;