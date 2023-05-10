import React, { useState } from "react";
import styled from "@emotion/styled";
import { columnsFromBackend, issueColumns } from "./data";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import IssueCard from "./IssueCard";
import { getId, handleId } from "./utils";

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
  const [data, setData] = useState(columnsFromBackend);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    console.log("data", data);
    const { source, destination } = result;
    // 跨容器拖动
    if (source.droppableId !== destination.droppableId) {
      // 获取拖动源数据
      const sourceData = data
        .find((item) => item.groupId === getId(source.droppableId).groupId)
        ?.data.find((item) => item.id === getId(source.droppableId).id);
      // 获取目标数据
      const destinationData = data
        .find((item) => item.groupId === getId(destination.droppableId).groupId)
        ?.data.find((item) => item.id === getId(destination.droppableId).id);
      // 获取源中可拖动卡片列表
      const sourceItems = [...(sourceData?.list ?? [])];
      // 获取目标中可拖动卡片列表
      const destinationItems = [...(destinationData?.list ?? [])];
      // 源移除的卡片数据
      const [removed] = sourceItems.splice(source.index, 1);
      removed.father_id = getId(destination.droppableId).groupId;
      // 移除的卡片数据插入目标中
      destinationItems.splice(destination.index, 0, removed);
      console.log({
        sourceItems,
        destinationItems,
      });

      // 更新数据
      const newDataBySource = data.map((issuesGroup) => {
        if (issuesGroup.groupId === getId(source.droppableId).groupId) {
          return {
            ...issuesGroup,
            data: issuesGroup.data.map((issues) => {
              if (issues.id === getId(source.droppableId).id && sourceItems) {
                return {
                  ...issues,
                  list: sourceItems,
                };
              }
              return issues;
            }),
          };
        }

        return issuesGroup;
      });
      const newDataByDestination = newDataBySource.map((issuesGroup) => {
        if (issuesGroup.groupId === getId(destination.droppableId).groupId) {
          return {
            ...issuesGroup,
            data: issuesGroup.data.map((issues) => {
              if (
                issues.id === getId(destination.droppableId).id &&
                destinationItems
              ) {
                return {
                  ...issues,
                  list: destinationItems,
                };
              }
              return issues;
            }),
          };
        }

        return issuesGroup;
      });
      console.log(newDataByDestination);
      setData(newDataByDestination);
      return;
    }
  };

  // const onDragEnd = (result: DropResult) => {
  //   if (!result.destination) return;
  //   const { source, destination } = result;
  //   console.log({ source, destination });
  // };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <ColumnTitleArea>
          {issueColumns.map((item) => {
            return <Title>{item.title}</Title>;
          })}
        </ColumnTitleArea>
        {data.map((issuesGroup) => {
          return (
            <div>
              <div>{issuesGroup.title}</div>
              <DropAreaList>
                {issuesGroup.data.map((column) => {
                  return (
                    <Droppable
                      key={column.id}
                      droppableId={handleId(issuesGroup.groupId, column.id)}
                    >
                      {(provided, snapshot) => (
                        <DropArea
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
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
            </div>
          );
        })}
        {/* <DropAreaList>
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
        </DropAreaList> */}
      </Container>
    </DragDropContext>
  );
};

export default Kanban;
