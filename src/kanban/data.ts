import { v4 as uuidv4 } from "uuid";
export const data: Model.Kanban.Issue[] = [
  {
    id: 1111,
    name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent.",
    // content_txt: "to-do",
    father_id: 1,
  },
  {
    id: 2222,
    name: "Fix Styling",
    // content_txt: "to-do",
    father_id: 1,
  },
  {
    id: 3333,
    name: "Handle Door Specs",
    // content_txt: "to-do",
    father_id: 1,
  },
];

export const columnsFromBackend: API.Kanban.GetKanbanList.Result = {
  data: [
    { id: 1, title: "To-do", count: 9, list: data },
    { id: 2, title: "In Progress", count: 9, list: [] },
    { id: 3, title: "Done", count: 9, list: [] },
  ],
};

export const issueColumns: Model.Kanban.IssueColumn[] =
  columnsFromBackend.data.map((item) => {
    return {
      id: item.id,
      title: item.title,
    };
  });
