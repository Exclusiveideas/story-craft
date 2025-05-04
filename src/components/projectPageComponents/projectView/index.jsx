"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
} from "@xyflow/react";
import "./projectView.css";
import "@xyflow/react/dist/style.css";
import { sectionCustomNode } from "./customNodes";
import useProjectPageStore from "@/store/useProjectPageStore";
import { researchCustomNode, ResearchInfoNode, SubResearchInfoNode } from "./researchNode";

// Import constants
import {
  SECTION_NODE_DISTANCE_Y,
  SECTION_NODE_X,
  RESEARCH_NODE_OFFSET_X,
  RESEARCH_NODE_OFFSET_Y,
  INFO_NODE_OFFSET_X,
  INFO_NODE_START_Y,
  INFO_NODE_GAP_Y,
} from "./nodeLayoutConstants";

const ProjectView = ({ scriptStructure }) => {
  const [unHideFirstResearchInfo, setUnHideFirstResearchInfo] = useState(false);

  // Handle case where scriptStructure is empty or undefined
  const [sections, setSections] = useState(
    scriptStructure && scriptStructure.length > 0 ? scriptStructure : []
  );
  const { activeProjectResearches: researchData } = useProjectPageStore();

  
  const toggleNodeVisibility = (node) => {
    const nodeType = node.type;
  
    setNodes((currentNodes) => {
      const newNodes = [...currentNodes];
  
      const findNode = (id) => newNodes.find((n) => n.id === id);
  
      const getDirectChildren = (parentId, type) =>
        edges
          .filter((e) => e.source === parentId)
          .map((e) => e.target)
          .filter((id) => {
            const n = findNode(id);
            return n && n.type === type;
          });
  
      const collectAllDescendants = (parentIds, typeMap) => {
        let allDescendants = new Set();
        let queue = [...parentIds];
  
        while (queue.length > 0) {
          const currentId = queue.shift();
          const currentType = findNode(currentId)?.type;
          const nextType = typeMap[currentType];
  
          if (nextType) {
            const children = getDirectChildren(currentId, nextType);
            children.forEach((id) => {
              if (!allDescendants.has(id)) {
                allDescendants.add(id);
                queue.push(id);
              }
            });
          }
        }
  
        return Array.from(allDescendants);
      };
  
      const toggleOrHide = (nodeIds, forceHide = false) => {
        nodeIds.forEach((id) => {
          const idx = newNodes.findIndex((n) => n.id === id);
          if (idx !== -1) {
            const currentHidden = newNodes[idx].hidden ?? false;
            newNodes[idx] = {
              ...newNodes[idx],
              hidden: forceHide ? true : !currentHidden,
            };
          }
        });
      };
  
      const typeHierarchy = {
        section: "research",
        research: "researchInfo",
        researchInfo: "subResearchInfo",
      };
  
      const immediateChildren = getDirectChildren(node.id, typeHierarchy[nodeType]);
      const areChildrenVisible = immediateChildren.some((id) => !findNode(id)?.hidden);
  
      const allDescendants = collectAllDescendants(immediateChildren, typeHierarchy);
  
      if (areChildrenVisible) {
        toggleOrHide([...immediateChildren, ...allDescendants], true); // hide all
      } else {
        toggleOrHide([...immediateChildren, ...allDescendants], false); // toggle visibility
      }
  
      return newNodes;
    });
  };
  
  

  useEffect(() => {
    setSections(
      scriptStructure && scriptStructure.length > 0 ? scriptStructure : []
    );
  }, [scriptStructure]);

  // Create nodes from scriptStructure
  const initialNodes = useMemo(() => {
    return sections.map((section, index) => ({
      id: `${index + 1}`,
      position: {
        x: SECTION_NODE_X, // Use the constant instead of windowWidth / 2
        y:
          index === 0
            ? 500 // Set the y position of the first section to 500
            : index * SECTION_NODE_DISTANCE_Y + 500, // For subsequent sections, add the gap
      },
      data: {
        index: index,
        title: section.title,
        overview: section.overview,
        contribution: section.contribution,
        key_talking_points: section.key_talking_points,
      },
      type: "section", // Use custom node type
      draggable: false,
    }));
  }, [sections]);

  // Create edges to connect all nodes sequentially
  const initialEdges = useMemo(() => {
    return sections
      .map((_, index) => {
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
      })
      .filter(Boolean);
  }, [sections]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  
  useEffect(() => {
    if (!researchData || researchData.length === 0) return;
  
    const sectionIndexMap = {};
    sections.forEach((section, index) => {
      sectionIndexMap[section.title] = index;
    });
  
    setNodes((prevNodes) => {
      const newResearchNodes = [];
      const newEdges = [];
      const infoNodes = [];
      const sectionResearchMap = {};
  
      researchData.forEach((research) => {
        const matchedSection = sections.find(
          (section) => section.title === research.section_title
        );
        if (!matchedSection) return;
  
        const sectionNode = prevNodes.find(
          (node) => node.data.title === research.section_title
        );
        if (!sectionNode) return;
  
        if (!sectionResearchMap[sectionNode.id]) {
          sectionResearchMap[sectionNode.id] = 0;
        }
  
        const localIndex = sectionResearchMap[sectionNode.id];
        const safeTitle = research.section_title
          ? `${research.section_title.replace(/\s+/g, "_")}-${Math.random()
              .toString(36)
              .slice(2, 8)}`
          : `untitled-${Math.random().toString(36).slice(2, 8)}`;
  
        const researchNodeId = `research-${sectionNode.id}-${safeTitle}`;
        const isLeftPosition =
          sectionIndexMap[research.section_title] % 2 !== 0;
  
        const researchNode = {
          id: researchNodeId,
          position: {
            x:
              sectionNode.position.x +
              (isLeftPosition
                ? -RESEARCH_NODE_OFFSET_X
                : RESEARCH_NODE_OFFSET_X),
            y: sectionNode.position.y + RESEARCH_NODE_OFFSET_Y * localIndex,
          },
          data: {
            title: research.section_title || "Untitled Research",
            provider: research.research_provider,
            content: research.research_info,
            type: "research",
            isLeftPosition
          },
          type: "research",
          draggable: true,
        };
  
        const sectionToResearchEdge = {
          id: `edge-${sectionNode.id}-${researchNodeId}`,
          source: sectionNode.id,
          target: researchNodeId,
          animated: true,
          type: "smoothstep",
        };
  
        newResearchNodes.push(researchNode);
        newEdges.push(sectionToResearchEdge);
        sectionResearchMap[sectionNode.id]++;
  
        const provider = research.research_provider.toLowerCase();
  
        if (
          provider === "googlesearch" &&
          research.research_info &&
          typeof research.research_info === "object"
        ) {
          const keys = ["inline_videos", "related_questions", "organic_results"];
          keys.forEach((key, keyIndex) => {
            const subInfos = Array.isArray(research.research_info[key])
              ? research.research_info[key]
              : [];
        
            const infoNodeId = `${researchNodeId}-category-${key}`;
        
            const infoNode = {
              id: infoNodeId,
              position: {
                x:
                  researchNode.position.x +
                  (isLeftPosition
                    ? -INFO_NODE_OFFSET_X
                    : INFO_NODE_OFFSET_X),
                y:
                  researchNode.position.y +
                  INFO_NODE_START_Y +
                  keyIndex * INFO_NODE_GAP_Y,
              },
              draggable: true,
              type: "researchInfo",
              hidden: true,
              data: {
                title: key.replace(/_/g, " "),
                provider: "googleSearch",
                category: key,
                isLeftPosition
              },
            };
        
            infoNodes.push(infoNode);
            newEdges.push({
              id: `edge-${researchNodeId}-${infoNodeId}`,
              source: researchNodeId,
              target: infoNodeId,
              animated: true,
              type: "smoothstep",
              targetHandle: "info-top",
            });


            subInfos.forEach((subInfo, subIndex) => {
              const subNodeId = `${infoNodeId}-sub-${subIndex}`;
              
              const subNode = {
                id: subNodeId,
                position: {
                  x: infoNode.position.x +
                    (isLeftPosition
                      ? -800
                      : 500),
                  y: infoNode.position.y + subIndex * 120,
                },
                type: "subResearchInfo",
                draggable: true,
                hidden: true,
                data: {
                  parentId: infoNodeId,
                  provider: "googleSearch",
                  category: key,
                  content: subInfo,
                  isLeftPosition
                },
              };
            
              infoNodes.push(subNode);
            
              newEdges.push({
                id: `edge-${infoNodeId}-${subNodeId}`,
                source: infoNodeId,
                sourceHandle: "subInfo-source", // 👈 add this
                target: subNodeId,
                animated: true,
                type: "smoothstep",
                targetHandle: "subInfo-target",
              });
            });

          });          
        } else if (Array.isArray(research.research_info)) {
          let filteredInfoArray = research.research_info;
  
          if (provider === "googlenews") {
            filteredInfoArray = research.research_info.slice(0, 10);
          }
  
          filteredInfoArray.forEach((info, index) => {
            const infoNodeId = `${researchNodeId}-info-${index}`;
            const yOffset = INFO_NODE_START_Y + index * INFO_NODE_GAP_Y;
            const sectionIndex = sectionIndexMap[research.section_title] || 0;
  
            const commonProps = {
              id: infoNodeId,
              position: {
                x:
                  researchNode.position.x +
                  (isLeftPosition
                    ? -INFO_NODE_OFFSET_X
                    : INFO_NODE_OFFSET_X) *
                    (sectionIndex + 1),
                y: researchNode.position.y + yOffset,
              },
              draggable: true,
              type: "researchInfo",
              hidden: true,
            };
  
            let infoNode = null;
  
            switch (provider) {
              case "arxiv":
                infoNode = {
                  ...commonProps,
                  data: {
                    title: info.title,
                    summary: info.summary,
                    authors: info.authors,
                    link: info.id,
                    provider: "arxiv",
                  },
                };
                break;
              case "googlenews":
                infoNode = {
                  ...commonProps,
                  data: {
                    thumbnail_small: info?.thumbnail_small,
                    link: info?.link,
                    source: info?.source,
                    provider: "googleNews",
                  },
                };
                break;
              case "core":
                infoNode = {
                  ...commonProps,
                  data: {
                    title: info.title,
                    abstract: info.abstract,
                    publishedDate: info.publishedDate,
                    downloadUrl: info.downloadUrl,
                    provider: "core",
                  },
                };
                break;
              case "googlescholar":
                infoNode = {
                  ...commonProps,
                  data: {
                    title: info.title,
                    link: info.link,
                    snippet: info.snippet,
                    cited_by: info.cited_by,
                    pdf_link: info.pdf_link,
                    provider: "googleScholar",
                  },
                };
                break;
              default:
                break;
            }
  
            if (infoNode) {
              infoNodes.push(infoNode);
              newEdges.push({
                id: `edge-${researchNodeId}-${infoNodeId}`,
                source: researchNodeId,
                target: infoNodeId,
                animated: false,
                type: "smoothstep",
                targetHandle: "info-top",
              });
            }
          });
        }
      });
  
      setEdges((prevEdges) => [...prevEdges, ...newEdges]);
      setUnHideFirstResearchInfo(true);
      return [...prevNodes, ...newResearchNodes, ...infoNodes];
    });
  }, [researchData, sections, setNodes, setEdges]);
  

  // Make all researchInfo nodes connected to the first section visible
  useEffect(() => {
    if (!unHideFirstResearchInfo) return;

    setNodes((prevNodes) => {
      if (prevNodes.length === 0) return prevNodes;

      const firstSectionId = prevNodes[0]?.id;

      // Find all research nodes connected to the first section
      const connectedResearchNodeIds = edges
        .filter((edge) => edge.source === firstSectionId)
        .map((edge) => edge.target);

      // Find all researchInfo nodes connected to the research nodes
      const connectedResearchInfoNodeIds = edges
        .filter((edge) => connectedResearchNodeIds.includes(edge.source))
        .map((edge) => edge.target);

      // Only update if at least one node will change
      let shouldUpdate = false;

      const updatedNodes = prevNodes.map((node) => {
        if (
          connectedResearchInfoNodeIds.includes(node.id) &&
          node.type === "researchInfo" &&
          node.hidden === true
        ) {
          shouldUpdate = true;
          return { ...node, hidden: false };
        }
        return node;
      });

      return shouldUpdate ? updatedNodes : prevNodes;
    });
  }, [edges, unHideFirstResearchInfo]);

  return (
    <div className="projectView_wrapper">
      {sections.length === 0 ? (
        <></>
      ) : (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={{
            section: sectionCustomNode,
            research: researchCustomNode,
            researchInfo: ResearchInfoNode,
            subResearchInfo: SubResearchInfoNode,
          }}
          onNodeClick={(event, node) => toggleNodeVisibility(node)} // Handle node click
        >
          <MiniMap
            style={{ backgroundColor: "black", borderRadius: "12px" }} // Set the background to black
            nodeColor={(node) => {
              // Ensure __rf and position exist before checking for visibility
              const nodeInView = node.__rf?.position ? true : false;

              if (nodeInView) {
                // Active node in view: almost white
                return "#ffffff";
              } else {
                // Node not in view: gray
                return "#808080";
              }
            }}
            nodeStrokeWidth={3}
          />

          <Controls />
          <Background />
        </ReactFlow>
      )}
    </div>
  );
};

export default ProjectView;
