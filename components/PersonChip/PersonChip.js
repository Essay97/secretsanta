import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./PersonChip.module.css";

export default function PersonChip({ name, delete: deleteChip }) {
  return (
    <div className={styles.chip}>
      <span>{name}</span>
      <FontAwesomeIcon icon={faTimes} onClick={() => deleteChip(name)} />
    </div>
  );
}
