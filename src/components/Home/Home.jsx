import React, { useState } from 'react';
import Poster from '../Poster/Poster';
import Products from '../Products/Products';
import { useSelector } from 'react-redux';

function Home(props) {
  const { list } = useSelector(({ products }) => products);

  return (
    <>
      <Poster />
      <Products products={list} amount={5} title={'Trending'} />
    </>
  );
}

export default Home;
