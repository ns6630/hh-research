import { FC, Fragment, useMemo, useState } from "react";
import { Divider, Stack, TextField } from "@mui/material";
import markdownit from "markdown-it";
import mj from "markdown-it-mathjax3";
import mh from "markdown-it-highlightjs";
import hljs from "highlight.js";
import sanitize from "sanitize-html";

import "highlight.js/styles/github.css";

hljs.highlightAll();

declare global {
  interface Window {
    MathJax: any;
  }
}

const MathJax: FC = () => {
  const [text, setText] = useState("");

  const markdown = useMemo(() => {
    const md = markdownit({ html: true });
    md.use(mh, { hljs });
    md.use(mj, {
      loader: { load: ["input/tex", "output/chtml"] },
      tex: {
        inlineMath: [
          ["$", "$"],
          ["\\(", "\\)"],
        ],
        macros: {
          amp: "&",
        },
      },
    });
    const result = md.render(sanitize(text));
    console.log(JSON.stringify(result));
    return { __html: result };
  }, [text]);

  return (
    <Fragment>
      <Stack direction="column" spacing={2}>
        <TextField
          fullWidth
          label="Markdown with TeX"
          multiline
          rows={10}
          defaultValue=""
          onBlur={(e) => {
            setText(e.target.value);
          }}
        />
        <Divider flexItem />
        <div dangerouslySetInnerHTML={markdown} />
      </Stack>
    </Fragment>
  );
};

export default MathJax;
