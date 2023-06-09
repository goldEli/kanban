import React from "react";
import styled from "@emotion/styled";
import Issues from "../Issues";

interface IssuesGroupProps {
  issuesGroup: Model.Kanban.IssuesGroup;
}

const IssuesGroupBox = styled.div`
  width: 100%;
`;

const DropAreaList = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
  /* min-height: 80vh; */
`;

const IssuesGroup: React.FC<IssuesGroupProps> = (props) => {
  const { issuesGroup } = props;
  return (
    <IssuesGroupBox>
      <div>{issuesGroup.title}</div>
      <DropAreaList>
        {issuesGroup.data.map((issues) => {
          return <Issues issues={issues} groupId={issuesGroup.groupId} />;
        })}
      </DropAreaList>
    </IssuesGroupBox>
  );
};

export default IssuesGroup;
