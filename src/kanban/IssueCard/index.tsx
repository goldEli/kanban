import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "@emotion/styled";
import { handleId } from "../utils";

const TaskInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 15px;
  min-height: 106px;
  border-radius: 5px;
  max-width: 311px;
  background: white;
  margin-top: 15px;

  .secondary-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 12px;
    font-weight: 400px;
    color: #7d7d7d;
  }
`;

interface IssueCardProps {
  item: Model.Kanban.Issue;
  index: number;
}

const IssueCard = (props: IssueCardProps) => {
  const { item, index } = props;
  return (
    <Draggable
      key={item.id}
      draggableId={handleId(item.id)}
      index={index}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TaskInformation>
            <p>{item.name}</p>
            <div className="secondary-details">
              {/* <p>
                <span>
                  {new Date(item.Due_Date).toLocaleDateString("en-us", {
                    month: "short",
                    day: "2-digit",
                  })}
                </span>
              </p> */}
            </div>
          </TaskInformation>
        </div>
      )}
    </Draggable>
  );
};

export default IssueCard;