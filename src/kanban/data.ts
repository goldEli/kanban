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

export const columnsFromBackend: Model.Kanban.IssuesGroup[] = [
  {
    groupId: 1,
    title: "美术组",
    data: [
      {
        id: 1,
        title: "规划中",
        count: 9,
        list: [
          {
            id: 1111,
            name: "吃饭",
            father_id: 1,
          },
          {
            id: 2222,
            name: "睡觉",
            father_id: 1,
          },
          {
            id: 3333,
            name: "看书",
            father_id: 1,
          },
        ],
      },
      { id: 2, title: "实现中", count: 9, list: [] },
      { id: 3, title: "已完成", count: 9, list: [] },
    ],
  },
  {
    groupId: 2,
    title: "程序组",
    data: [
      { id: 1, title: "规划中", count: 9, list: [] },
      {
        id: 2,
        title: "实现中",
        count: 9,
        list: [
          {
            id: 4444,
            name: "去上幼儿园",
            father_id: 2,
          },
          {
            id: 5555,
            name: "去商场买衣服",
            father_id: 2,
          },
          {
            id: 6666,
            name: "回家洗衣服",
            father_id: 2,
          },
        ],
      },
      { id: 3, title: "已完成", count: 9, list: [] },
    ],
  },
];

export const issueColumns: Model.Kanban.IssueColumn[] = [
  { id: 1, title: "规划中" },
  { id: 2, title: "实现中" },
  { id: 3, title: "已完成" },
];
