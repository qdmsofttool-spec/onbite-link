export type Folder = {
  id: number;
  name: string;
  count: number;
};

export type LinkItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  folderId: number;
  createdAt: string;
};
