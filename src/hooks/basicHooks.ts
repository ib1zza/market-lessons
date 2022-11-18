import React, { useState } from "react";

export const useInput = (initialValue: any) => {
  const [val, setVal] = useState(initialValue);

  return [
    {
      value: val,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setVal(e.target.value),
    },
    () => setVal(initialValue),
  ];
};
