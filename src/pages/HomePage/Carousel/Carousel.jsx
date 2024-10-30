import React, { useEffect } from "react";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import "../Carousel/Carousel.css";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import {
  prevSlide,
  nextSlide,
  fetchCarouselItems,
} from "../../../features/carouselSlice";

const Carousel = () => {
  const dispatch = useDispatch();
  const { items, currentIndex, isLoading } = useSelector(
    (state) => state.carousel
  );
  useEffect(() => {
    dispatch(fetchCarouselItems());
  }, []);

  if (isLoading)
    return (
      <div className='circular-progress'>
        <CircularProgress />
      </div>
    );
  return (
    <div className='carousel'>
      {items.length > 0 && (
        <>
          <button
            className='carousel-btn'
            onClick={() => dispatch(prevSlide())}>
            <GrPrevious />
          </button>
          <div className='carousel-item'>
            <img src={items[currentIndex].imageUrl} alt='image' />
          </div>
          <button
            className='carousel-btn'
            onClick={() => dispatch(nextSlide())}>
            <GrNext />
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
