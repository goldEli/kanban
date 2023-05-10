import React, { useState } from "react";
import styled from "@emotion/styled";
import { columnsFromBackend, issueColumns } from "./data";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import IssueCard from "./IssueCard";
import { handleId } from "./utils";

const Container = styled.div`
  display: flex;
  flex-direction: column;
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

const Title = styled.span`
  color: #10957d;
  background: rgba(16, 149, 125, 0.15);
  width: 341px;
  box-sizing: border-box;
  padding: 2px 10px;
  border-radius: 5px;
  align-self: flex-start;
`;

const ColumnTitleArea = styled.div`
  display: flex;
  gap: 8px;
`;

const Kanban = () => {
  const [columns, setColumns] = useState(columnsFromBackend.data);

  return (
    <DragDropContext
      onDragEnd={(result) => {
        if (!result.destination) return;
        const { source, destination } = result;
        // 跨容器拖动
        if (source.droppableId !== destination.droppableId) {
          // 获取拖动源数据
          const sourceData = columns.find(
            (item) => handleId(item.id) === source.droppableId
          );
          // 获取目标数据
          const destinationData = columns.find(
            (item) => handleId(item.id) === destination.droppableId
          );
          // 获取源中可拖动卡片列表
          const sourceItems = [...(sourceData?.list ?? [])];
          // 获取目标中可拖动卡片列表
          const destinationItems = [...(destinationData?.list ?? [])];
          // 源移除的卡片数据
          const [removed] = sourceItems.splice(source.index, 1);
          // 移除的卡片数据插入目标中
          destinationItems.splice(destination.index, 0, removed);

          // 更新数据
          setColumns((prev) => {
            return prev.map((item) => {
              if (handleId(item.id) === source.droppableId && sourceData) {
                return {
                  ...sourceData,
                  list: sourceItems,
                };
              }
              if (
                handleId(item.id) === destination.droppableId &&
                destinationData
              ) {
                return {
                  ...destinationData,
                  list: destinationItems,
                };
              }
              return item;
            });
          });
          return;
        }
        // else {
        // 获取拖动源数据
        const sourceData = columns.find(
          (item) => handleId(item.id) === source.droppableId
        );

        // 获取源中可拖动卡片列表
        const copiedItems = [...(sourceData?.list ?? [])];

        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns((prev) => {
          return prev.map((item) => {
            if (handleId(item.id) === source.droppableId && sourceData) {
              return {
                ...sourceData,
                list: copiedItems,
              };
            }
            return item;
          });
        });
      }}
    >
      <Container>
        <ColumnTitleArea>
          {issueColumns.map((item) => {
            return <Title>{item.title}</Title>;
          })}
        </ColumnTitleArea>
        <DropAreaList>
          {columns.map((column, index) => {
            return (
              <Droppable key={column.id} droppableId={handleId(column.id)}>
                {(provided, snapshot) => (
                  <DropArea
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {column.list?.map((item, index) => (
                      <IssueCard key={item.id} item={item} index={index} />
                    ))}
                    {provided.placeholder}
                  </DropArea>
                )}
              </Droppable>
            );
          })}
        </DropAreaList>
      </Container>
    </DragDropContext>
  );
};

export default Kanban;
