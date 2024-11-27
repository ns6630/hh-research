import { FC, Fragment, useEffect, useState } from "react";
import { Divider, Stack, TextField } from "@mui/material";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import markedKatex from "marked-katex-extension";
import DOMPurify from "dompurify";
import hljs from "highlight.js/lib/core";
import c from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";
import csharp from "highlight.js/lib/languages/csharp";
import xml from "highlight.js/lib/languages/xml";
import java from "highlight.js/lib/languages/java";
import javascript from "highlight.js/lib/languages/javascript";
import php from "highlight.js/lib/languages/php";
import python from "highlight.js/lib/languages/python";
import typescript from "highlight.js/lib/languages/typescript";
import sql from "highlight.js/lib/languages/sql";
import plaintext from "highlight.js/lib/languages/plaintext";

import "katex/dist/katex.css";
import "highlight.js/styles/github.css";

hljs.registerLanguage("c", c);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("csharp", csharp);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("java", java);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("php", php);
hljs.registerLanguage("python", python);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("plaintext", plaintext);

const marked = new Marked(
  markedHighlight({
    emptyLangClass: "hljs",
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
);

const options = {
  throwOnError: false,
};
marked.use(markedKatex(options));

const getSanitizedHtmlObj = (value: string) => {
  const sanitizedValue = DOMPurify.sanitize(value);
  console.log(JSON.stringify(value));
  return { __html: sanitizedValue };
};

const Katex: FC = () => {
  const [value, setValue] = useState("");
  const [html, setHtml] = useState({ __html: "" });

  useEffect(() => {
    let markdown = marked.parse(value);
    if (markdown instanceof Promise) {
      markdown.then((value) => {
        setHtml(getSanitizedHtmlObj(value));
      });
    } else {
      setHtml(getSanitizedHtmlObj(markdown));
    }
  }, [value]);

  return (
    <Fragment>
      <Stack direction="column" spacing={2}>
        <TextField
          fullWidth
          label="Markdown with TeX"
          multiline
          rows={10}
          defaultValue=""
          onBlur={(e) => setValue(e.target.value)}
        />
        <Divider flexItem />
        <div id="katex-block" dangerouslySetInnerHTML={html} />
      </Stack>
    </Fragment>
  );
};

export default Katex;
