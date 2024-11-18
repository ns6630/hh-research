import { FC, Fragment, useEffect, useMemo, useState } from "react";
import { Divider, Stack, TextField } from "@mui/material";
import markdownit from "markdown-it";

declare global {
  interface Window {
    MathJax: any;
  }
}

const MathJax: FC = () => {
  const [text, setText] = useState("");

  const markdown = useMemo(() => {
    const md = markdownit();
    return { __html: md.render(text) };
  }, [text]);

  useEffect(() => {
    if (typeof window?.MathJax !== "undefined") {
      console.log(window.MathJax);
      window.MathJax.typeset?.();
    }
  }, [markdown]);

  return (
    <Fragment>
      <Stack direction="column" spacing={2}>
        <TextField
          fullWidth
          label="MathJax"
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