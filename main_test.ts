import { assertEquals } from "@std/assert";
import { processMarkdown } from "./main.ts";

Deno.test("processMarkdown loads the test markdown and outputs html", async () => {
  const testFile = "./test_files/test_markdown.md";
  const HTMLText = await processMarkdown(testFile);
  assertEquals(/<p>/.test(HTMLText), true);
  assertEquals(/Hello world/.test(HTMLText), true);

})
