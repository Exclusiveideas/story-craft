// components/customNodes/researchCustomNode.js
import { Handle, Position } from "@xyflow/react";
import { KeyTalkingPoints, NodeRow } from "./customNodes";
import { limitTo50Words } from "@/lib/utils";

export const researchCustomNode = ({ data }) => {

  return (
    <div className="custom-node research-node">
      <Handle
        type="target"
        position={data?.isLeftPosition ? Position.Right : Position.Left}
      />
      <div className="node-content">
        <NodeRow type="research" title={`Research Provider`} info={data?.provider} />
        <NodeRow type="research" title={`Section`} info={data?.title} />
        <p className="collapse_expand">
          <span className="toggleTxt">
            Click to
          </span>{" "}
          collapse or expand subnodes
        </p>
      </div>
      <Handle
        type="source"
        position={data?.isLeftPosition ? Position.Left : Position.Right}
      />
    </div>
  );
};

export const ResearchInfoNode = ({ data }) => {
  return (
    <div>
      <Handle
        type="target"
        position={data?.isLeftPosition ? Position.Right : Position.Left}
        id="info-top"
      />
      {data?.provider == "googleScholar" && <ScholarInfoNode data={data} />}
      {data?.provider == "arxiv" && <ArxivInfoNode data={data} />}
      {data?.provider == "core" && <CoreInfoNode data={data} />}
      {data?.provider == "googleNews" && <NewsInfoNode data={data} />}
      {data?.provider == "googleSearch" && <SearchInfoNode data={data} />}
      <Handle
        type="source"
        position={data?.isLeftPosition ? Position.Left : Position.Right}
        id="subInfo-source"
      />
    </div>
  );
};

const ScholarInfoNode = ({ data }) => (
  <div className="custom-node research-info-node">
    <a
      className="nodeLink"
      href={
        data?.pdf_link && data?.pdf_link !== "No PDF Available"
          ? data?.pdf_link
          : data?.link
      }
      target="_blank"
      rel="noopener noreferrer"
    >
      <NodeRow type="researchInfo"
        title={`Link`}
        info={
          data?.pdf_link && data?.pdf_link !== "No PDF Available"
            ? data?.pdf_link
            : data?.link
        }
      />
    </a>
    <NodeRow type="researchInfo" title={`Snippet`} info={limitTo50Words(data?.snippet)} />
    {data?.authors?.length > 0 && (
      <NodeRow type="researchInfo" title={`Authors`} info={data?.authors?.join(", ")} />
    )}
  </div>
);

const ArxivInfoNode = ({ data }) => (
  <div className="custom-node research-info-node">
    <a
      className="nodeLink"
      href={data?.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <NodeRow type="researchInfo" title={`Link`} info={data?.link} />
    </a>
    <NodeRow type="researchInfo" title={`Summary`} info={limitTo50Words(data?.summary)} />
    <NodeRow type="researchInfo" title={`Authors`} info={data?.authors} />
  </div>
);

const CoreInfoNode = ({ data }) => (
  <div className="custom-node research-info-node">
    <a
      className="nodeLink"
      href={data?.downloadUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <NodeRow type="researchInfo" title={`Link`} info={data?.downloadUrl} />
    </a>
    <NodeRow type="researchInfo" title={`Abstract`} info={limitTo50Words(data?.abstract)} />
  </div>
);

const NewsInfoNode = ({ data }) => (
  <div className="custom-node research-info-node">
    <a
      className="nodeLink"
      href={data?.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <NodeRow type="researchInfo" title={`Link`} info={data?.link} />
    </a>
    <NodeRow type="researchInfo" title={`Source`} info={data?.source?.name} />
    {data?.source?.authors?.length > 0 && (
      <NodeRow type="researchInfo" title={`Authors`} info={data?.source?.authors?.join(", ")} />
    )}
  </div>
);


const SearchInfoNode = ({ data }) => {
  const titleMap = {
    "inline videos": "Videos",
    "related questions": "Questions",
  };

  const title = titleMap[data.title] || "Results";


  return (
    <>
      <div className="custom-node research-info-node">
        <NodeRow type="researchInfo" title={`Title`} info={title} />
        <p className="collapse_expand">
          <span className="toggleTxt">
            Click to
          </span>{" "}
          collapse or expand subnodes
        </p>
      </div>
    </>
  );
};

export const SubResearchInfoNode = ({ data }) => {
  const content = data?.content;
  const compName = content?.question ? 'question' : ( content?.duration ? 'video' : 'result');
  console.log(content)

  return (
    <>
      <Handle
        type="target"
        position={data?.isLeftPosition ? Position.Right : Position.Left}
        id="subInfo-target"
      />
      {compName === 'question' && <QuestionInfo content={content} />}
      {compName === 'video' && <VideoInfo content={content} />}
      {compName === 'result' && <ResultInfo content={content} />}
    </>
  );
};

const QuestionInfo = ({ content }) => (
  <div className="custom-node">
    <NodeRow title={`Question`} info={content?.question} />
    {content?.snippet ? (
      <NodeRow
      title={`Answer`}
      info={content?.snippet}
    />
    ) : (
    <KeyTalkingPoints
      title="Answer"
      points={content?.list}
    />
    )}
    <a
      className="nodeLink"
      href={content?.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <NodeRow title={`Link`} info={content?.link} />
    </a>
  </div>
);

const VideoInfo = ({ content }) => (
  <div className="custom-node">
    <NodeRow title={`Title`} info={content?.title} />
    <NodeRow title={`Duration`} info={content?.duration} />
    <NodeRow title={`Platform`} info={content?.platform} />
    <a
      className="nodeLink"
      href={content?.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <NodeRow title={`Link`} info={content?.link} />
    </a>
  </div>
);

const ResultInfo = ({ content }) => (
  <div className="custom-node">
    <NodeRow title={`Title`} info={content?.title} />
    <NodeRow title={`Snippet`} info={content?.snippet} />
    <a
      className="nodeLink"
      href={content?.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <NodeRow title={`Link`} info={content?.link} />
    </a>
  </div>
);