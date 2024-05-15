"use client";

import React, { useState, useEffect } from 'react';
import styles from './flashcard.css';

const Flashcard = ({key, index, card, question, answer, category, categories }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showCategories, setShowCategories] = useState([]);

  useEffect(() => {
    setShowCategories(categories);
  }, [categories]);

  return (
    <div className='card' style={styles.card}>
      <h3>{card.question}</h3>
      {showAnswer && <p>{card.answer}</p>}
      {showCategory && <p>{card.category}</p>}

      <div className='cardwrap'>
      <label>
        Category:
        <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            list="categories"
        />
        <datalist id="categories">
        {categories?.map((category, i) => (
          <option key={i} value={category.name}/>
        ))}
            
        </datalist>
      </label>

      <button className="addcategory" type="submit" style={styles.addcategory}>Add Category</button>
      <button className="answerbttn" style={styles.answerbttn} onClick={() => {
        setShowAnswer(!showAnswer);
        setShowCategory(!showCategory);
      }}>
        {showAnswer ? 'Hide Answer' : 'Show Answer'}
        {showCategory}
      </button>
      </div>

      
    </div>
  );
};

export default Flashcard;