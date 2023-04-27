declare namespace API.Kanban {
  namespace GetKanbanList {
    type Data = {
      title: string;
      items: Model.Kanban.Info[];
    };
    type Keys = "todo" | "inProgress" | "done";
    type Result = Record<Keys, Data>;
  }
}
