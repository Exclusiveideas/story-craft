"use client";

import { useCallback, useMemo, useState, useLayoutEffect } from "react";
import {
    ReactFlow, Controls, Background,
    useNodesState, useEdgesState, addEdge
} from "@xyflow/react";
import "./projectView.css";
import "@xyflow/react/dist/style.css";
import { sectionCustomNode } from "./customNodes";

const ProjectView = ({ scriptStructure }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle case where scriptStructure is empty or undefined
  const sections = scriptStructure && scriptStructure.length > 0 ? scriptStructure : [];

  // Update window width dynamically
  useLayoutEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth(); // Set initial width
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Create nodes from scriptStructure
  const initialNodes = useMemo(() => {
    return sections.map((section, index) => ({
      id: `${index + 1}`,
      position: { x: windowWidth ? windowWidth / 2 : 20, y: (index + .5) * 500 }, // Centered horizontally
      data: { index: index, title: section.title, overview: section.overview, contribution: section.contribution, key_talking_points: section.key_talking_points },
      type: "custom", // Use custom node type
      draggable: false,
    }));
  }, [sections, windowWidth]);

  // Create edges to connect all nodes sequentially
  const initialEdges = useMemo(() => {
    return sections.map((_, index) => {
      if (index < sections.length - 1) {
        return {
          id: `edge-${index + 1}-${index + 2}`,
          source: `${index + 1}`,
          target: `${index + 2}`,
          animated: true, // Makes the connection animated
          type: "smoothstep", // Smooth curve for better visuals
        };
      }
      return null;
    }).filter(Boolean);
  }, [sections]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="projectView_wrapper">
      {sections.length === 0 ? (
        <div className="empty-message">No script sections available</div>
      ) : (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={{ custom: sectionCustomNode }} // 📌Use custom node type
        >
          <Controls />
          <Background />
        </ReactFlow>
      )}
    </div>
  );
};

export default ProjectView;
