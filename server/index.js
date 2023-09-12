const express = require("express");
const path = require("path");

require("dotenv/config");

const stripe = require("stripe")(process.env.SECRET_API);
// const stripe = require("stripe")(
//   "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"
// );

const fs = "fs";

const port = 5000;
const app = express();

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use("/public", express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "/views"));

app.get("/redireciona", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "brl",
          product_data: {
            name: "T-shirt",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:5000/success?token={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:5000?cancel",
  });

  res.redirect(303, session.url);
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/success", async (req, res) => {
  if (req.query.token != null) {
    try {
      const session = await stripe.checkout.sessions.retrieve(req.query.token);
      // res.json(session);

      if (session.payment_status == "paid") {
        // CADASTRO
        // LIBERA O PRODUTO
        // ENVIA EMAIL DE CONFIRMAÇÃO
        res.send("Show, você pagou");
      } else {
        res.send("Não foi pago malandro");
      }
    } catch (error) {
      res.send("Falhou mulecote");
    }
  } else {
    res.send("O token é necessário");
  }
});

app.listen(port, () => {
  console.log("Uhul! server rodando ;)");
});
