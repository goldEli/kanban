import React from "react";
import styled from "@emotion/styled";
import { Droppable } from "react-beautiful-dnd";
import { handleId } from "../utils";
import IssueCard from "../IssueCard";

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

const IssuesGroup: React.FC<IssuesGroupProps> = (props) => {
  const { issuesGroup } = props;
  return (
    <IssuesGroupBox>
      <div>{issuesGroup.title}</div>
      <DropAreaList>
        {issuesGroup.data.map((column) => {
          return (
            <Droppable
              key={column.id}
              droppableId={handleId(issuesGroup.groupId, column.id)}
            >
              {(provided, snapshot) => (
                <DropArea ref={provided.innerRef} {...provided.droppableProps}>
                  {column.list?.map((item, index) => (
                    <IssueCard
                      groupId={issuesGroup.groupId}
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
        })}
      </DropAreaList>
    </IssuesGroupBox>
  );
};

export default IssuesGroup;
