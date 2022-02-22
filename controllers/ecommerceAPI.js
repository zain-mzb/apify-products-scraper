let express = require("express");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const axios = require("axios");

const productsArray = []; //Array for storing all the returned products

const total = 0; //variable for total responses

const count = 0; //variable for total response count

//Function which will get called from the route

const getAllProducts = async (req, res) => {
  //if request contains query this piece of code gets executed

  if (req.query) {
    min_price: req.query.minPrice;
    max_price: req.query.maxPrice;

    //Fetching data with parameters using Axios
    axios
      .get(
        `https://api.ecommerce.com/products?min_price=${min_price}&max_price=${max_price}`
      )
      .then((res) => {
        //sending repsonse
        let { products, total, count } = res;
        res.status(StatusCodes.OK).json(total, count, products);
        productsArray.push(products); //We can store this array in a database
      })
      .catch((error) => {
        //Throwing error
        throw new NotFoundError(`No products found in this price range`);
      });
  } else {
    //this code is used when there is no query specified
    axios
      .get("https://api.ecommerce.com/products")
      .then((res) => {
        let { products, total, count } = res;
        res.status(StatusCodes.OK).json(total, count, products);
        productsArray.push(products); //We can store this array in a database
      })
      .catch((error) => {
        throw new NotFoundError(`No products found on this URL`);
      });
  }
};

module.exports = {
  getAllProducts,
};
