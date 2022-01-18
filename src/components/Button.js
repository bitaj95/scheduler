import React from "react";

import "components/Button.scss";

export default function Button(props) {
   const { children } = props;

   return <>
      <button>
         {children}
      </button>
   </>;
}
