export interface IPageProps {
  id: number;
  title: string;
  parent_id: number | null;
}

export interface ITreeProps {
  tree: IPageProps[];
  onNodeDrag: (nodeId: number, parentId: number | null) => void;
}
