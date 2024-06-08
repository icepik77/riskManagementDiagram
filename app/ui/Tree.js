'use client'

import React, { useEffect, useState } from 'react';
import SortableTree, { changeNodeAtPath, removeNodeAtPath, addNodeUnderParent } from 'react-sortable-tree';
import 'react-sortable-tree/style.css';

const Tree = ({eventTreeElements}) => {
  const [treeData, setTreeData] = useState(eventTreeElements? eventTreeElements : [
    { title: 'Chicken', children: [{ title: 'Egg' }] },
    { title: 'Fish', children: [{ title: 'Fingerline' }] },
  ]);
  const [newNodeName, setNewNodeName] = useState('');

  useEffect(() =>{
    setTreeData(eventTreeElements);
  }, [eventTreeElements]);
  
  const handleNodeTitleChange = (path, title) => {
    setTreeData(changeNodeAtPath({
      treeData,
      path,
      getNodeKey: ({ treeIndex }) => treeIndex,
      newNode: { ...treeData[path[0]], title },
    }));
  };

  const handleAddNode = () => {
    if (newNodeName.trim() !== '') {
      setTreeData([...treeData, {
        title: newNodeName.trim(),
      }]);
      setNewNodeName('');
    }
  };

  const handleDeleteNode = (path) => {
    setTreeData(removeNodeAtPath({
      treeData,
      path,
      getNodeKey: ({ treeIndex }) => treeIndex,
    }));
  };

  return (
    <div  className='' style={{ height: 800, width:1000 }}>
      <div>
        <input 
          type="text"
          value={newNodeName}
          onChange={(e) => setNewNodeName(e.target.value)}
          placeholder="Enter node name"
        />
        <button onClick={handleAddNode}>Add Node</button>
      </div>
      <SortableTree
        treeData={treeData}
        onChange={setTreeData}
        generateNodeProps={({ node, path }) => ({
          title: (
            <div>
              <input
                type="text"
                value={node.title}
                onChange={(e) => handleNodeTitleChange(path, e.target.value)}
              />
              <button onClick={() => handleDeleteNode(path)}>Delete</button>
            </div>
          ),
        })}
      />
    </div>
  );
};

export default Tree;

