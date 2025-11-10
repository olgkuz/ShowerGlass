export interface IGalleryCard {
  id: string;
  name: string;
  description: string;
  img?: string;       // имя файла, сохранённое на сервере (например, card-12345.jpg)
  imgUrl?: string;    // абсолютная ссылка на изображение (например, https://dushcabs.onrender.com/public/card-12345.jpg)
}
