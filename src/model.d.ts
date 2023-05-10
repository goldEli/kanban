declare namespace Model.Kanban {
  interface Issue {
    id: number;
    name: string;
    // title: string;
    father_id: number;
    users?: {
      // https://oa-1308485183.cos.ap-chengdu.myqcloud.com/oa-file/4fcfb62aefdf1cef99e446f1205aa936a0eb465cboy.png
      avatar: string;
      userId: number;
    }[];
  }
  interface Issues {
    id: number;
    title: string;
    count: number;
    // status_id: number;
    list?: Issue[];
  }
  interface IssueColumn {
    id: number;
    title: string;
  }
}
