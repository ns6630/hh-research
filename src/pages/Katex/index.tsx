import { FC, Fragment, useCallback, useState } from "react";
import katex from "katex";
import { Divider, Stack, TextField } from "@mui/material";

const initialValue = `x = a_0 + \\cfrac{1}{a_1 
             + \\cfrac{1}{a_2 
             + \\cfrac{1}{a_3
             + \\cfrac{1}{a_4} } } }`;

// const initialValue = `\\left( \\sum_{k=1}^n a_k b_k \\right)^2 \\leq \\left( \\sum_{k=1}^n a_k^2 \\right) \\left( \\sum_{k=1}^n b_k^2 \\right)`;
const Katex: FC = () => {
  const [value, setValue] = useState(initialValue);
  const refCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        katex.render(value, node, {
          throwOnError: false,
          macros: {},
          output: "mathml",
        });
      }
    },
    [value],
  );

  return (
    <Fragment>
      <Stack direction="column" spacing={2}>
        <TextField
          fullWidth
          label="Katex"
          multiline
          rows={10}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Divider flexItem />
        <div id="katex-block" ref={refCallback} />
      </Stack>
    </Fragment>
  );
};

export default Katex;
