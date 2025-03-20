import { Handle } from "@xyflow/react";
import { CircleHelp } from "lucide-react";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

export const sectionCustomNode = ({ data }) => {
  return (
    <div className="custom-node">
      <Handle type="target" position="top" />
      <div className="node-content">
        <NodeRow title={`Section ${data?.index + 1}`} info={data?.title} />
        <NodeRow title="Overview" info={data?.overview} />
        <NodeRow title="Contribution" info={data?.contribution} />
        <KeyTalkingPoints points={data?.key_talking_points} />
      </div>
      <Handle type="source" position="bottom" />
    </div>
  );
};

const NodeRow = ({ title, info }) => {
  return (
    <div className="node-row">
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

const KeyTalkingPoints = ({ points }) => {
  return (
    <div className="node-row">
      <p className="rowTitle">Key Talking Points</p>
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
