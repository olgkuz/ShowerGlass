export interface IArticle {
  id: string;
  title: string;
  content: string;
  previewText: string;
  createdAt: string;
  readingTime: number;
  tags?: string[];
}
