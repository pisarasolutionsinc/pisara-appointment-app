export interface WorkflowModel {
  _id: string;
  name: string;
  description: string;
  statuses: {
    type: {
      name: string;
      category: "open" | "started" | "closed";
      order: number;
    }[];
    default: [
      {
        name: "Open";
        category: "open";
        order: 0;
      },
      {
        name: "Started";
        category: "open";
        order: 100;
      },
      {
        name: "Closed";
        category: "closed";
        order: 100;
      }
    ];
  };
}
