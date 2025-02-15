// @ts-types="npm:@types/express@4.17.15"
import express, { Request, Response } from "npm:express@4.18.2";
import vento from "jsr:@vento/vento";
import { marked } from "npm:marked";

const env = vento();
const app = express();

const template = await env.load("./templates/slides.vto");

export const processMarkdown = async (markdownFile: string) => {
  const slidesMarkdown = await Deno.readTextFile(markdownFile);
  return marked.parse(slidesMarkdown);
};

app.get("/", async (_: Request, res: Response) => {
  const slidesMarkdown = await Deno.readTextFile("./slides/main.md");
  const slidesHTML = await template({ markdown: marked.parse(slidesMarkdown) });
  console.log(slidesHTML.content);
  res.send(slidesHTML.content);
});

console.log("slides listening on http://localhost:8000");
app.listen(8000);
