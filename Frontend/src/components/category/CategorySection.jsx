import React from 'react';
import './CategorySection.css';

const CategorySection = () => {
  return (
    <section className="category-section">
      <div className="row align-items-center">
        <div className="col-lg-6 text-center mb-40">
         
        </div>
        <div className="col-lg-6 mb-40">
          <div className="box-padding-left-50">
            <div className="strate-icon">
              <span></span> Agriculture for a Sustainable Future
            </div>
            <h2 className="heading-2 mb-20">
              Discover the Benefits of Organic and Inorganic Farming
            </h2>
            <p className="text-lg neutral-700">
              Our farm employs both organic and inorganic farming methods to optimize yield and quality. Learn how each method contributes to sustainable agriculture.
            </p>
            <div className="row mt-50">
              <FeatureCard
                image="https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&w=600"
                title="Organic Produce"
                description="Cultivated naturally without synthetic chemicals to maintain soil health and biodiversity."
              />
              <FeatureCard
                image="https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&w=600"
                title="Inorganic Methods"
                description="Enhanced crop yield with controlled use of fertilizers and pesticides for greater output."
              />
              <FeatureCard
                image="https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&w=600"
                title="Sustainable Practices"
                description="Our farm promotes eco-friendly practices for long-term soil health and resource conservation."
              />
              <FeatureCard
                image="https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?auto=compress&cs=tinysrgb&w=600"
                title="Weekly Updates"
                description="Stay informed with our regular insights on farm activities and produce availability."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ image, title, description }) => (
  <div className="col-lg-6 col-sm-6 mb-20">
    <div className="card-feature-2">
      <div className="card-image">
        <img src={image} alt={title} />
      </div>
      <div className="card-info">
        <a href="#">
          <h3 className="text-22-bold">{title}</h3>
        </a>
        <p className="text-md neutral-700">{description}</p>
      </div>
    </div>
  </div>
);

export default CategorySection;
