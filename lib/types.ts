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
  thumbnail?: string | null;
  folderId: number;
  createdAt: string;
};
