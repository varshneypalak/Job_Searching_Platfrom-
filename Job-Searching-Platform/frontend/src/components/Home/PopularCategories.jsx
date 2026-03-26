import React from "react";
import { POPULAR_CATEGORIES } from "../../constants";
import { SectionTitle } from "../../ui";
import "./PopularCategories.css";

const PopularCategories = () => (
  <div className="categories">
    <div className="cat-inner">
      <SectionTitle sub="Explore top job categories">Popular Categories</SectionTitle>
      <div className="cat-grid">
        {POPULAR_CATEGORIES.map(({ id, title, subTitle, icon: Icon }) => (
          <div className="cat-card" key={id}>
            <div className="cat-icon"><Icon /></div>
            <div className="cat-text">
              <p>{title}</p>
              <p>{subTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default PopularCategories;
