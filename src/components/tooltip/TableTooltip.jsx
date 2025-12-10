import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const TruncateWithTooltip = ({ text, idx, id, limit = 40, claseName }) => {
  if (!text) return <span>-</span>;

  const truncated = text?.length > limit;

  return (
    <>
      <span
        data-tooltip-id={truncated ? `${id}-${idx}` : undefined}
        data-tooltip-content={truncated ? text : undefined}
        className={claseName}
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "inline-block",
          maxWidth: "220px",
          verticalAlign: "middle",
        }}
      >
        {truncated ? text.slice(0, limit) + "..." : text}
      </span>

      {truncated && (
        <ReactTooltip
          id={`${id}-${idx}`}
          place="top"
          effect="solid"
          border="1px solid #ccc"
          style={{
            backgroundColor: "#013369",
            color: "#fdfdfd",
            borderRadius: "8px",
            padding: "8px 12px",
            fontSize: "14px",
            fontWeight: "600",
            maxWidth: "300px",
            whiteSpace: "normal",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            zIndex: 9999,
          }}
        />
      )}
    </>
  );
};

export default TruncateWithTooltip;
