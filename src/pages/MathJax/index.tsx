import { FC, Fragment, useEffect, useMemo, useState } from "react";
import { Divider, Stack, TextField } from "@mui/material";
import markdownit from "markdown-it";
// import mk from "@iktakahiro/markdown-it-katex";
import mj from "markdown-it-mathjax3";

declare global {
  interface Window {
    MathJax: any;
  }
}

const MathJax: FC = () => {
  const [text, setText] = useState("");

  const markdown = useMemo(() => {
    const md = markdownit();
    // md.use(mk, { output: "mathml" });
    md.use(mj, {
      loader: { load: ["input/tex", "output/chtml"] },
      tex: {
        inlineMath: [
          ["$", "$"],
          ["\\(", "\\)"],
        ],
      },
    });
    return { __html: md.render(text) };
  }, [text]);

  // useEffect(() => {
  //   if (typeof window?.MathJax !== "undefined") {
  //     console.log(window.MathJax);
  //     window.MathJax.typeset?.();
  //   }
  // }, [markdown]);

  return (
    <Fragment>
      <Stack direction="column" spacing={2}>
        <TextField
          fullWidth
          label="Markdown"
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
