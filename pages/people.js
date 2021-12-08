import React, { useEffect, useState, useContext } from "react";
import styles from "../styles/People.module.css";
import PersonChip from "../components/PersonChip/PersonChip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { PeopleContext } from "../context/PeopleProvider";

export default function People() {
  const { people, setPeople } = useContext(PeopleContext);
  const [name, setName] = useState("");

  useEffect(() => {
    sessionStorage.setItem("people", people);
  }, [people]);

  function deletePerson(personName) {
    setPeople(people.filter((p) => p !== personName));
  }

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleClick() {
    if (name) {
      setPeople([...people, name]);
      setName("");
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Chi partecipa?</h1>
      <ul className={styles.chips}>
        {people.map((p, i) => (
          <PersonChip name={p} delete={deletePerson} key={i} />
        ))}
      </ul>
      <div className={styles.row}>
        <input
          className={styles.nameField}
          type="text"
          value={name}
          onChange={handleChange}
        />
        <FontAwesomeIcon
          className={styles.button}
          onClick={handleClick}
          icon={faPlus}
        />
      </div>
      <Link href="/random">
        <a className={styles.button}>Si parte!</a>
      </Link>
    </div>
  );
}
