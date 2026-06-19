import { useState } from "react";
import CopyIcon from "../../assets/images/copy_link_button.svg?react";
import CopiedIcon from "../../assets/images/coped-link-btn.svg?react";
import "./CopyEmailButton.css";

export function CopyEmailButton({ email }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button className="copy-btn" onClick={handleCopy} aria-label="Скопировать email" type="button">
      {copied ? <CopiedIcon /> : <CopyIcon />}
    </button>
  );
}
