import React from "react";
import styled from "@emotion/styled";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

interface TestProps {
  children?: React.ReactDOM;
}

interface DataElement {
  id: string;
  content: string;
}

type List = DataElement[];

const TestBox = styled.div`
  width: 100%;
`;

const list: List = [
  { id: "111", content: "work" },
  { id: "222", content: "sleep" },
  { id: "333", content: "eat" },
];

const Test: React.FC<TestProps> = (props) => {
  return (
    <DragDropContext
      onDragEnd={(result, provided) => {
        console.log(123);
      }}
    >
      <Droppable droppableId="characters">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="characters"
          >
            {list.map((item, index) => {
              return (
                <Draggable index={index} draggableId={item.id} key={item.id}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      key={item.id}
                    >
                      {item.content}
                    </li>
                  )}
                </Draggable>
              );
            })}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Test;
