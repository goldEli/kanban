declare namespace API.Kanban {
  namespace GetKanbanList {
    type Result = {
      [key in string]: {
        title: string;
        items: Model.Kanban.Info[];
      };
    };
  }
}
