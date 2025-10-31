const fs = require('fs');
const cors = require('cors');
const express = require('express');

const app = express();
const port = 3000;

const userJson = './server-data/users.json';
const cardsJson = './server-data/cards.json';
const articlesJson = './server-data/articles.json';

app.use(cors());
app.use(express.json());

const readJson = (path) => JSON.parse(fs.readFileSync(path, 'utf-8'));
const writeJson = (path, data) =>
  fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.post('/reg', (req, res) => {
  const { login } = req.body ?? {};
  if (!login) {
    return res.status(400).json({ error: 'Не указан логин пользователя.' });
  }

  const data = readJson(userJson);
  const users = Array.isArray(data.users) ? data.users : [];

  const alreadyExists = users.some((user) => user.login === login);
  if (alreadyExists) {
    return res
      .status(409)
      .json({ error: 'Пользователь с таким логином уже зарегистрирован.' });
  }

  users.push(req.body);
  writeJson(userJson, { ...data, users });

  return res.json({ status: 'ok' });
});

app.post('/desauth', (req, res) => {
  const { login, password } = req.body ?? {};

  if (!login || !password) {
    return res
      .status(400)
      .json({ error: 'Необходимо передать логин и пароль.' });
  }

  const data = readJson(userJson);
  const users = Array.isArray(data.users) ? data.users : [];
  const user = users.find(
    (item) => item.login === login && item.password === password
  );

  if (!user) {
    return res.status(401).json({ error: 'Неверный логин или пароль.' });
  }

  return res.json(user);
});

app.get('/cards', (_req, res) => {
  const data = readJson(cardsJson);
  res.json(data.cards ?? []);
});

app.get('/card/:id', (req, res) => {
  const data = readJson(cardsJson);
  const card = (data.cards ?? []).find((item) => item.id === req.params.id);

  if (!card) {
    return res
      .status(404)
      .json({ error: `Карточка с id ${req.params.id} не найдена.` });
  }

  return res.json(card);
});

app.get('/articles', (_req, res) => {
  const data = readJson(articlesJson);
  res.json(data);
});

app.get('/articles/:id', (req, res) => {
  const data = readJson(articlesJson);
  const article = (data.articles ?? []).find(
    (item) => item.id === req.params.id
  );

  if (!article) {
    return res
      .status(404)
      .json({ error: `Статья с id ${req.params.id} не найдена.` });
  }

  return res.json(article);
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
