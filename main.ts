// @ts-types="npm:@types/express@4.17.15"
import express, { Request, Response } from "npm:express@4.18.2";
import vento from "jsr:@vento/vento";
import { remark } from "npm:remark";
import html from "npm:remark-html";
import sectionize from "npm:remark-sectionize";

const env = vento();
const app = express();

const template = await env.load("./templates/slides.vto");

const markdownFile = "./slides/main.md"

export const processMarkdown = async (markdownFile: string): Promise<string> => {
  const slidesMarkdown = await Deno.readTextFile(markdownFile);
  const file = await remark()
    .use(sectionize)
    .use(html, { sanitize: false })
    .process(slidesMarkdown);

  return String(file);
};

app.get("/", async (_: Request, res: Response) => {
  const slidesMarkdown = await processMarkdown(markdownFile); 
  const slidesHTML = await template({ markdown: slidesMarkdown });
  console.log(slidesHTML.content);
  res.send(slidesHTML.content);
});

console.log("slides listening on http://localhost:8000");
app.listen(8000);
