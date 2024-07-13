export type ReactFlowNode = {
  id: string;
  type: string;
  data: {
    label?: string;
    color?: string;
  };
  position: {
    x: number;
    y: number;
  };
};
