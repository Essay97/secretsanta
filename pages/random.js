import React, { useCallback, useContext, useEffect, useState } from "react";
import styles from "../styles/Random.module.css";
import { PeopleContext } from "../context/PeopleProvider";
import Image from "next/image";
import presentImg from "../public/present.png";
import Link from "next/link";

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function makePairs(people) {
  const pairs = [];
  const presents = [...people];

  shuffle(presents);

  for (let i = 0; i < people.length; i++) {
    pairs.push({
      person: presents[i],
      present: presents[(i + 1) % presents.length],
    });
  }

  shuffle(pairs);

  return pairs;
}

export default function Random() {
  const { people } = useContext(PeopleContext);
  const [pairs, setPairs] = useState([]);
  const [idx, setIdx] = useState(0);
  const [showName, setShowName] = useState(false);
  const [endGame, setEndGame] = useState(false);

  useEffect(() => {
    setPairs(makePairs(people));
  }, [people]);

  useEffect(() => {
    if (idx >= people.length) {
      setEndGame(true);
    } else {
      setShowName(false);
    }
  }, [idx, people.length]);

  function handleNext() {
    setIdx((prev) => prev + 1);
  }

  const component = (
    <>
      <h1 className={styles.title}>
        {pairs[idx] && pairs[idx].person} riceverà il regalo di...
      </h1>

      {showName && pairs.length !== 0 ? (
        <div className={styles.column}>
          {pairs[idx] && <h2 className={styles.name}>{pairs[idx].present}</h2>}
          <button className={styles.button} onClick={handleNext}>
            Prossimo
          </button>
        </div>
      ) : (
        <Image
          src={presentImg}
          width={300}
          height={350}
          onClick={() => setShowName(true)}
          alt="regalo"
        />
      )}
    </>
  );

  const done = (
    <>
      <h1 className={styles.title}>
        Bene, è tempo di scambiare i regali... Buon Natale!
      </h1>
      <Link href="/">
        <a className={styles.button}>Torna alla Home</a>
      </Link>
    </>
  );

  return <div className={styles.container}>{endGame ? done : component}</div>;
}
