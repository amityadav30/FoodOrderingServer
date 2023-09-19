import express from "express";
import fetch from "node-fetch";
import data from "./restaurants.js";
import cusines from "./restaurantCusines.js";

const app = express();
const port = process.env.PORT || 3000;

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Route to fetch all restaurants
app.get("/api/all-restaurants", async (req, res) => {
  try {
    // const apiUrl =
    //   "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5204303&lng=73.8567437&offset=15&sortBy=RELEVANCE&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING";
    // ("https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5204303&lng=73.8567437&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
    // const response = await fetch(apiUrl);
    // const data = await response.json();

    const restaurantList =
      data?.data?.cards?.find(
        (item) =>
          item?.card?.card?.gridElements?.infoWithStyle?.restaurants !==
          undefined
      )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

    res.json(restaurantList);
  } catch (error) {
    // const restaurantList =
    //   data?.data?.cards?.find(
    //     (item) =>
    //       item?.card?.card?.gridElements?.infoWithStyle?.restaurants !==
    //       undefined
    //   )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

    // res.json(restaurantList);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to fetch restaurant menu by ID
app.get("/api/restaurant-menu/:resId", async (req, res) => {
  const { resId } = req.params;

  try {
    // const apiUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=18.5204303&lng=73.8567437&restaurantId=${resId}&submitAction=ENTER`;

    // const response = await fetch(apiUrl);
    // const data = await response.json();

    res.json(cusines?.data);
  } catch (error) {
    //res.json(cusines?.data);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
