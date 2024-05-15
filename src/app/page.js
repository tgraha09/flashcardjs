"use client";

import React, { useState, useEffect, useRef  } from 'react';

import axios, { all } from 'axios';
import styles from "./page.module.css";
import Flashcard from "./components/FlashCard/FlashCard.js";
import FlashcardForm from "./components/CardForm/CardForm";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FlashCarousel from './components/FlashCarousel/FlashCarousel';


export default function Home() {

  const [cards, setCards] = useState([]);
  const [allCards, setAllCards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loaded, setLoaded] = useState(false);//useRef(false);
  console.log("Home");
  
  //console.log("Home COMPONENT");
  useEffect(() => {
    // This code will run after every render
    console.log('Component updated');
    
    if((cards?.length == 0 && categories?.length == 0)||cards==undefined||categories==undefined ){
      setTimeout(() => {
        fetchData();
    }, 500);
    }
       
  }, [cards, categories, allCards]); // Only re-run the effect if isToggle changes

  const fetchData = async () => {
    try {
      
      const response = await axios.get('/api/data');
     
      setCards(response.data.cards);
      setAllCards(response.data.cards);
      
      setCategories(response.data.categories);
      
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const updateCards = (_data) => {
    setCards(_data.cards);
    setCategories(_data.categories);
  };
  const cardsByCategory = async (_data) => {
   // console.log("cardsByCategory");
   // console.log(_data);
    //setDisplayCards([]);
    cards.forEach(card => {
      if(card.category == _data.category){
        _data.cards.push(card);
      }
    });
    if(_data.cards.length == 0){
      updateCards({cards: allCards, categories: categories})
    }
    else{
      //console.log(_data.cards);
      updateCards(_data);
    }
    

  };
  if(!loaded){
    //fetchData();
    
  }


  return (
    <main className={styles.main}>
 
      {cards?.length > 0 ? (
        <FlashCarousel cards={cards} categories={categories} />
      ) : (
        <p>Loading...</p>
      )}

    <FlashcardForm updateCards={updateCards} cardsByCategory={cardsByCategory} _categories={categories} />
       
    </main>
  );
}
