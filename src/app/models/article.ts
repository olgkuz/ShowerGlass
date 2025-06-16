export interface IArticle {
  id: string;          // Уникальный идентификатор
  title: string;       // Заголовок статьи
  content: string;     // Полный текст статьи
  previewText: string; // Краткое описание
  createdAt: Date;     // Дата создания
  readingTime: number; // Время чтения в минутах
  tags?: string[];     // Теги для дополнительного поиска
}