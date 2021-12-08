import React, { useContext, useEffect, useState } from "react";
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

export default function Random() {
  const { people } = useContext(PeopleContext);
  const [pairs, setPairs] = useState([]);
  const [idx, setIdx] = useState(0);
  const [showName, setShowName] = useState(false);
  const [endGame, setEndGame] = useState(false);

  function makePairs() {
    const _pairs = [];
    const presentsList = [...people];

    shuffle(presentsList);

    for (let i = 0; i < people.length; i++) {
      _pairs.push({
        person: presentsList[i],
        present: presentsList[(i + 1) % presentsList.length],
      });
    }

    shuffle(_pairs);

    return _pairs;
  }

  useEffect(() => {
    console.log(`idx: ${idx}, length: ${pairs.length}, endGame: ${endGame}`);
  });

  useEffect(() => {
    const p = makePairs();
    console.log(p);
    setPairs(p);
  }, []);

  useEffect(() => {
    if (idx >= people.length) {
      setEndGame(true);
    } else {
      setShowName(false);
    }
  }, [idx]);

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
