import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useState, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import Flashcard from '../FlashCard/FlashCard';

const FlashCarousel = ({ cards, categories }) => {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    setFlashcards(cards);
  }, [flashcards, cards]);

  const styleOptions = {
    backgroundColor: 'white',
    padding: '0rem',
    display: 'block', 
    width: '500px', 
    margin: '10rem 0rem 10rem 0rem',
    boxShadow: '0 0 1rem rgba(0, 0, 0, 0.1)',
    borderRadius: '0.5rem',
  }

  return (
    <Swiper
        spaceBetween={30}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        direction="horizontal"
        loop
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
        style={styleOptions}
      >
        {flashcards?.map((card, i) => (
          <SwiperSlide className="card-wrapper" key={i}>
            <Flashcard index={i} card={card} categories={categories} />
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
  );
}

export default FlashCarousel;