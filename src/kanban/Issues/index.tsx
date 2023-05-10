import React from "react";
import styled from "@emotion/styled";
import { Droppable } from "react-beautiful-dnd";
import IssueCard from "../IssueCard";
import { handleId } from "../utils";

interface IssuesProps {
  issues: Model.Kanban.Issues;
  groupId: Model.Kanban.IssuesGroup["groupId"];
}

const DropArea = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  width: 341px;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 15px 15px;
`;

const DropStatusArea = styled.div`
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  border: 1px solid purple;
  &:hover {
    border: 1px solid green;
  }
`;
const Issues: React.FC<IssuesProps> = (props) => {
  const { issues, groupId } = props;
  return (
    <Droppable key={issues.id} droppableId={handleId(groupId, issues.id)}>
      {(provided, snapshot) => (
        <DropArea ref={provided.innerRef} {...provided.droppableProps}>
          <DropStatusArea>123</DropStatusArea>
          {issues.list?.map((item, index) => (
            <IssueCard
              groupId={groupId}
              key={item.id}
              item={item}
              index={index}
            />
          ))}
          {provided.placeholder}
        </DropArea>
      )}
    </Droppable>
  );
};

export default Issues;
