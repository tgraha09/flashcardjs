"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Cardform.css';

const FlashcardForm = ({ onSubmit, _categories, updateCards, cardsByCategory }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('');
  const [SelCategory, setSelCategory] = useState('');
  const [categories, setCategories] = useState([]);
  
  const [loaded, setLoaded] = useState(false);
  const postRequest = async(_url, _data, callback) => {
    try {
      const response = await axios.post(_url, _data).then(res => {
        
       // console.log(res.data);
        callback(res.data);
        //updateCards(res.data);
      }).finally(() => {
       setQuestion('');
       setAnswer('');
       setCategory('');
       setSelCategory('');
      });
      
    } catch (error) {
      //console.error('Error:', error);
    }
  }
  const handleSubmit = async (e) => {
    
    e.preventDefault();

    if (!question || !answer || !category) {
      let message = 'Please enter a value for';
      if (!question) message += ' Question';
      if (!answer) message += ' Answer';
      if (!category) message += ' Category';
      if (!question && !answer && !category) message = 'Please enter a value for Question, Answer, and Category'
      alert(message);
      return;
    }

    
    
    //onSubmit({ question, answer, category });
    setQuestion(question);
    setAnswer(answer);
    setCategory(category);
    

    postRequest('/api/addcard', { question, answer, category }, updateCards);
    
   
  };

  const deleteCategory = async (e)=>{
    e.preventDefault();
    console.log('deleteCategory: ' + SelCategory);

    postRequest('/api/delete/category', { category:SelCategory }, updateCards);
    //console.log(_categories);
    //setCategories(_categories);
  }

  useEffect(() => {
    
    //console.log('Component updated');
    setCategories(_categories);
   // fetchCategories();
  }, [ _categories]);
  
  const displaySelection = async (e)=>{
    console.log(e.target.value);
    setSelCategory(e.target.value)
    console.log('Selection: ' + e.target.value);
    cardsByCategory({category: e.target.value, cards: [], categories});
  }

  
  
  
  return (
    <>
    <form className='categoryform' onSubmit={deleteCategory}>
      <label>
        Category:
        <input
            type="text"
            value={SelCategory}
            onChange={displaySelection}
            list="categories"
        />
        <datalist id="categories">
        {categories?.map((category, i) => (
          <option key={i} value={category.name}/>
        ))}
            
        </datalist>
      </label>
      <button className="deletebutton" type="submit" style={styles.deletebutton}>Delete Category</button>
    </form>

    <form className='cardform' onSubmit={handleSubmit}>

      <label>
        Question:
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </label>

      <label>
        Answer:
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </label>

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

      <button className="addbutton" type="submit" style={styles.addbutton}>Add Card</button>

      </form>
    </>
  );
};

const displaySelection = async (e)=>{
  console.log(e.target.value);
  setSelCategory(e.target.value)
  console.log('Selection: ' + e.target.value);
  cardsByCategory({category: e.target.value, cards: [], categories});
}

export default FlashcardForm;