import { Handle } from "@xyflow/react";
import { CircleHelp } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export const sectionCustomNode = ({ data }) => {
  
  return (
    <div className="custom-node section-node">
      <Handle type="target" position="top" />
      <div className="node-content">
        <NodeRow type="section" title={`Section ${data?.index + 1}`} info={data?.title} />
        <NodeRow type="section" title="Overview" info={data?.overview} />
        <NodeRow type="section" title="Contribution" info={data?.contribution} />
        <KeyTalkingPoints type="section"
          title="Key Talking Points" 
          points={data?.key_talking_points}
        />
        <p className="collapse_expand">
          <span className="toggleTxt">
            Click to
          </span>{" "}
          collapse or expand subnodes
        </p>
      </div>
      <Handle type="source" position="bottom" />
    </div>
  );
};

export const NodeRow = ({ title, info, type }) => {
  return (
    <div className={`node-row ${type}`}>
      <div className="rowTitle">
        <p>{title}</p>
        {title === "Contribution" && (
          <HoverCard>
            <HoverCardTrigger asChild>
              <CircleHelp className="help-icon" />
            </HoverCardTrigger>
            <HoverCardContent className="hoverCardContent">
                <HoverContent />
            </HoverCardContent>
          </HoverCard>
        )}
      </div>
      <p className="rowInfo">{info}</p>
    </div>
  );
};

export const KeyTalkingPoints = ({ title, points, type }) => {
  return (
    <div className={`node-row ${type}`}>
      <p className="rowTitle">{title}</p>
      <ul className="rowInfo list">
        {points?.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    </div>
  );
};


const HoverContent = () => {
  return (
    <div className="hoverCardContent">
        <p>How this section contributes to the entire script.</p>
    </div>
  );
};
