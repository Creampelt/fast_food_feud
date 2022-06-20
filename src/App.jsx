import * as React from "react"
import Header from "./components/Header/Header";
import Instructions from "./components/Instructions/Instructions";
import Chip from "./components/Chip/Chip";
import NutritionalLabel from "./components/NutritionalLabel/NutritionalLabel";
import { createDataSet } from "./data/dataset"
import "./App.css"

// don't move this!
export const appInfo = {
  title: `Fast Food Feud 🍔!`,
  tagline: `Folks' Favorite Friendly Fuel Finder For Food Facts`,
  description: `Finding healthy food is hard. Sometimes we just settle for what's available. That doesn't mean we shouldn't know what's going into our bodies! Fast Food Feud is here to arm the public with all the nutritional facts needed to make informed decisions about fast food consumption.`,
  dataSource: `All data pulled from the MenuStat.org interactive online database.`,
  instructions: {
    start: `Start by clicking on a food category on the left and a fast food joint from the list above. Afterwards, you'll be able to choose from a list of menu items and see their nutritional content.`,
    onlyCategory: `Now select a fast food restaurant from the list above!`,
    onlyRestaurant: `Now select a category from the list on the left!`,
    noSelectedItem: `Almost there! Choose a menu item and you'll have the fast food facts right at your fingertips!`,
    allSelected: `Great choice! Amazing what a little knowledge can do!`,
  },
}
// or this!
const { data, categories, restaurants } = createDataSet()

const CategoriesColumn = ({ categories, state, setState }) => (
  <div className="CategoriesColumn col">
    <div className="categories options">
      <h2 className="title">Categories</h2>
      {categories.map((category) => (
        <Chip
          key={category}
          label={category}
          onClick={() => setState(category)}
          onClose={() => setState(null)}
          isActive={category === state}
        />
      ))}
    </div>
  </div>
)

const RestaurantsRow = ({ restaurants, state, setState }) => (
  <div className="RestaurantsRow">
    <h2 className="title">Restaurants</h2>
    <div className="restaurants options">
      {restaurants.map((restaurant) => (
        <Chip
          key={restaurant}
          label={restaurant}
          onClick={() => setState(restaurant)}
          onClose={() => setState(null)}
          isActive={restaurant === state}
        />
      ))}
    </div>
  </div>
);

const MenuDisplay = ({ menuItems, state, setState }) => (
  <div className="MenuDisplay display">
    <div className="MenuItemButtons menu-items">
      <h2 className="title">Menu Items</h2>
      {menuItems.map((item) => (
        <Chip
          key={item.item_name}
          label={item.item_name}
          onClick={() => setState(item)}
          onClose={() => setState(null)}
          isActive={state && item.item_name === state.item_name}
        />
      ))}
    </div>
    <div className="NutritionFacts nutrition-facts">
      {state && <NutritionalLabel item={state} />}
    </div>
  </div>
);

const DataSource = ({ dataSource }) => (
  <div className="data-sources">
    <p>{dataSource}</p>
  </div>
)

export function App() {
  const [selectedCategory, setSelectedCategory] = React.useState();
  const [selectedRestaurant, setSelectedRestaurant] = React.useState();
  const [selectedMenuItem, setSelectedMenuItem] = React.useState();

  React.useEffect(() => {
    setSelectedMenuItem(null);
  }, [selectedCategory, selectedRestaurant]);

  const currentMenuItems = data.filter(({ food_category, restaurant }) => (
    food_category === selectedCategory && restaurant === selectedRestaurant
  ));

  const instruction = (
    !selectedCategory && !selectedRestaurant && !selectedMenuItem ? appInfo.instructions.start
      : selectedCategory && !selectedRestaurant && !selectedMenuItem ? appInfo.instructions.onlyCategory
      : selectedRestaurant && !selectedCategory && !selectedMenuItem ? appInfo.instructions.onlyRestaurant
      : selectedCategory && selectedRestaurant && !selectedMenuItem ? appInfo.instructions.noSelectedItem
      : appInfo.instructions.allSelected
  );

  return (
    <main className="App">
      <CategoriesColumn categories={categories} state={selectedCategory} setState={setSelectedCategory} />
      <div className="container">
        <Header title={appInfo.title} tagline={appInfo.tagline} description={appInfo.description} />
        <RestaurantsRow restaurants={restaurants} state={selectedRestaurant} setState={setSelectedRestaurant} />
        <Instructions instructions={instruction} />
        <MenuDisplay menuItems={currentMenuItems} state={selectedMenuItem} setState={setSelectedMenuItem} />
        <DataSource dataSource={appInfo.dataSource} />
      </div>
    </main>
  )
}

export default App
