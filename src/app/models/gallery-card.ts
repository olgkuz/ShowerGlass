export interface IGalleryCard {
  id: string;
  name: string;
  description: string;
  img?: string;       // имя файла, сохранённое на сервере (например, card-12345.jpg)
  imgUrl?: string;    // абсолютная ссылка на изображение (например, http://localhost:3000/public/card-12345.jpg)
}
