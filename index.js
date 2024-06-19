//Ten en cuenta la informacion que se encuentra en el archivo docs/README.md

//Primer paso: Importar las dependencias
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

//Este array almacenara los articles que se creen
let articles = [
  {
    id: 1,
    title: "Post 1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean placerat in odio a eleifend. Fusce sit amet tellus consequat, rutrum velit non, ornare purus. In hac habitasse platea dictumst. Aliquam erat volutpat. Vestibulum sed bibendum augue, sit amet venenatis dui. Nunc pharetra id diam non aliquam. Nulla varius magna sit amet sapien mattis, sit amet lacinia nulla feugiat. Nam mattis viverra felis non viverra. Ut molestie arcu in varius tincidunt.\nSed porttitor urna sem, in porttitor massa tempus eget. Cras nec risus non arcu pellentesque dignissim quis nec risus. Phasellus eget mattis lorem, ac lacinia ex. Duis id velit vel nisi dictum auctor. Vivamus laoreet ornare nibh, et tempus est volutpat at. Quisque a diam vel velit dapibus pharetra. Morbi id luctus ligula.\nOrci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce feugiat nulla velit, et pretium nulla sodales eu. Nam tempor dui eu nunc cursus facilisis. Suspendisse iaculis eget libero id sollicitudin. Integer tincidunt tortor enim, quis semper lectus sodales eget. Nullam dui dolor, iaculis non iaculis ac, aliquet ac eros. Nulla ac ipsum congue, eleifend urna a, dictum felis. Cras ac neque eleifend, dictum lacus sed, porttitor ligula. Duis commodo id eros nec pretium. Mauris ut tellus in tellus iaculis hendrerit. In et pretium tellus, in mattis erat. Donec vitae posuere purus. Mauris ipsum odio, feugiat tristique feugiat sit amet, eleifend eu libero.",
    date: "16-06-2024",
  },
  {
    id: 2,
    title: "Post 2",
    content: "This is the second post",
    date: "16-06-2024",
  },
  {
    id: 3,
    title: "Post 3",
    content: "This is the third post",
    date: "16-06-2024",
  },
  {
    id: 4,
    title: "Post 4",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean placerat in odio a eleifend. Fusce sit amet tellus consequat, rutrum velit non, ornare purus. In hac habitasse platea dictumst. Aliquam erat volutpat. Vestibulum sed bibendum augue, sit amet venenatis dui. Nunc pharetra id diam non aliquam. Nulla varius magna sit amet sapien mattis, sit amet lacinia nulla feugiat. Nam mattis viverra felis non viverra. Ut molestie arcu in varius tincidunt.\nSed porttitor urna sem, in porttitor massa tempus eget. Cras nec risus non arcu pellentesque dignissim quis nec risus. Phasellus eget mattis lorem, ac lacinia ex. Duis id velit vel nisi dictum auctor. Vivamus laoreet ornare nibh, et tempus est volutpat at. Quisque a diam vel velit dapibus pharetra. Morbi id luctus ligula.\nOrci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce feugiat nulla velit, et pretium nulla sodales eu. Nam tempor dui eu nunc cursus facilisis. Suspendisse iaculis eget libero id sollicitudin. Integer tincidunt tortor enim, quis semper lectus sodales eget. Nullam dui dolor, iaculis non iaculis ac, aliquet ac eros. Nulla ac ipsum congue, eleifend urna a, dictum felis. Cras ac neque eleifend, dictum lacus sed, porttitor ligula. Duis commodo id eros nec pretium. Mauris ut tellus in tellus iaculis hendrerit. In et pretium tellus, in mattis erat. Donec vitae posuere purus. Mauris ipsum odio, feugiat tristique feugiat sit amet, eleifend eu libero.",
    date: "16-06-2024",
  },
  {
    id: 5,
    title: "Post 5",
    content: "This is the fifth post",
    date: "16-06-2024",
  },
];

//Este middelware permite usar archivos estaticos
app.use(express.static("public"));

//Este middelware permite que una request pueda tener un body con formato JSON
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { articles: articles });
});

app.get("/home", (req, res) => {
  res.render("index.ejs", { articles: articles });
});

app.get("/create", (req, res) => {
  res.render("create.ejs", { articles: articles });
});

app.post("/create-new-article", (req, res) => {
  //Creamos un nuevo post con la informacion que viene en el body de la request
  let newArticle = {
    id: articles.length + 1,
    title: req.body.title,
    content: req.body.content,
    //Date en este formato "dd-mm-yyyy"
    date: new Date().toLocaleDateString("es-ES"),
  };
  //Agregamos el nuevo post al array de articles
  articles.push(newArticle);
  res.render("index.ejs", { articles: articles });
});

app.post("/article", (req, res) => {
  console.log(req.body.articleId);
  //Encontrar el articulo seleccionado que tiene el id que viene en el body de la request
  let article = articles.find((article) => article.id == req.body.articleId);
  console.log(article);
  res.render("article-detail.ejs", { selectedArticle: article });
});

app.post("/edit", (req, res) => {
  //Encontrar el articulo seleccionado que tiene el id que viene en el body de la request
  let article = articles.find((article) => article.id == req.body.articleId);
  res.render("article-edit.ejs", { selectedArticle: article });
});

app.post("/update-article", (req, res) => {
  // Mostrar el contenido del body de la request
  console.log(req.body);

  // Encontrar el índice del artículo con el id que viene en el body de la request
  const articleIndex = articles.findIndex(
    (article) => article.id === parseInt(req.body.articleId)
  );
  console.log(`Index: ${articleIndex}`);

  // Verificar si el artículo fue encontrado
  if (articleIndex !== -1) {
    // Actualizar el artículo encontrado
    let article = articles[articleIndex];
    article.title = req.body.title;
    article.content = req.body.content;
    article.date = new Date().toLocaleDateString("es-ES");
    console.log(article);

    // Renderizar la plantilla con el artículo actualizado
    res.render("article-detail.ejs", { selectedArticle: article });
  } else {
    // Manejar el caso en que el artículo no fue encontrado
    res.status(404).send("Artículo no encontrado");
  }
});

app.post("/delete", (req, res) => {
  // Encontrar el índice del artículo con el id que viene en el body de la request
  const articleIndex = articles.findIndex(
    (article) => article.id === parseInt(req.body.articleId)
  );

  console.log(`DELETE Index: ${articleIndex}`);

  // Verificar si el artículo fue encontrado
  if (articleIndex !== -1) {
    // Eliminar el artículo encontrado
    articles.splice(articleIndex, 1);
    res.render("index.ejs", { articles: articles });
  } else {
    // Manejar el caso en que el artículo no fue encontrado
    res.status(404).send("Artículo no encontrado");
  }
});

//app.listen permite que el servidor escuche en un puerto especifico
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
