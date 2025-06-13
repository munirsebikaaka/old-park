import { NavLink } from "react-router-dom";
import "../uniqueStyles/home.css";

const ParkingHomepage = () => {
  return (
    <div className="parking-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Find and Reserve Parking</h1>
          <p className="hero-text">
            Skip the stress of circling the block. Our smart parking app helps
            you instantly locate available spots near your destination—whether
            you're heading to work, a concert, or just out for errands.
          </p>

          <p className="hero-text">
            With real-time updates, secure payments, and easy reservations,
            parking has never been simpler. Start saving time and fuel—find your
            next parking space with just a few taps.
          </p>

          <NavLink to={"/entry"} className="hero-link">
            find parking
          </NavLink>
        </div>
        <img
          className="about-image hero-image"
          src="img/park-lot.jpg"
          alt="Parking facility"
        />
      </section>

      <section className="section">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">🅿️</div>
            <h3 className="service-title">Daily Parking</h3>
            <p className="service-description">
              Secure parking spots for your daily commute at affordable rates.
            </p>
          </div>
          <div className="service-card">
            <div className="service-icon">🏢</div>
            <h3 className="service-title">Monthly Parking</h3>
            <p className="service-description">
              Reserved monthly parking spaces near your workplace or home.
            </p>
          </div>
          <div className="service-card">
            <div className="service-icon">✈️</div>
            <h3 className="service-title">Airport Parking</h3>
            <p className="service-description">
              Long-term parking solutions for travelers at major airports.
            </p>
          </div>
          <div className="service-card">
            <div className="service-icon">🚗</div>
            <h3 className="service-title">Valet Service</h3>
            <p className="service-description">
              Premium valet parking service for hassle-free parking experience.
            </p>
          </div>
        </div>
      </section>

      <section className="feature-section">
        <img
          className="feature-image"
          src="img/ev-charge.jpg"
          alt="Parking app"
        />
        <div className="feature-content">
          <h2 className="section-title">Why Choose Us</h2>
          <ul className="feature-list">
            <li className="feature-item">
              <span className="feature-icon">⚡</span>
              <p className="feature-text">Real-time parking availability</p>
            </li>
            <li className="feature-item">
              <span className="feature-icon">💰</span>
              <p className="feature-text">
                Competitive pricing with no hidden fees
              </p>
            </li>
            <li className="feature-item">
              <span className="feature-icon">🔒</span>
              <p className="feature-text">24/7 security monitoring</p>
            </li>
            <li className="feature-item">
              <span className="feature-icon">📱</span>
              <p className="feature-text">
                Easy booking through our mobile app
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className="stats-section">
        <div className="stat-item">
          <div className="stat-number">10,000+</div>
          <div className="stat-label">Parking Spaces</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">500+</div>
          <div className="stat-label">Locations</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">1M+</div>
          <div className="stat-label">Happy Customers</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">24/7</div>
          <div className="stat-label">Support</div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">What Our Customers Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p className="testimonial-text">
              "Finding parking downtown used to be a nightmare. Now I can
              reserve a spot before I even leave home!"
            </p>
            <p className="testimonial-author">- Adam B.</p>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">
              "The monthly parking pass has saved me so much time and money.
              Highly recommended!"
            </p>
            <p className="testimonial-author">- Aliah K.</p>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">
              "Airport parking was never this easy. The valet service is worth
              every penny."
            </p>
            <p className="testimonial-author">- Codesmann S.</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-content">
          <h2 className="section-title">About Our Parking</h2>
          <p className="about-text">
            We're revolutionizing the parking industry with smart technology and
            customer-focused solutions. Founded in 2015, we've grown from a
            single parking lot to a nationwide network of premium parking
            spaces.
          </p>
          <p className="about-text">
            Our mission is to make parking stress-free, affordable, and
            convenient for everyone. Whether you need short-term or long-term
            parking, we've got you covered.
          </p>
          <button className="cta-button secondary">Learn More</button>
        </div>
        <img
          className="about-image"
          src="img/parkfacility.jpg"
          alt="Parking facility"
        />
      </section>

      <footer className="footer">
        <div className="footer-logo">ParkEasy</div>
        <p className="footer-text">
          © {new Date().getFullYear()} ParkEasy. All rights reserved.
        </p>
        <div className="footer-links">
          <a href="#" className="footer-link">
            Privacy Policy
          </a>
          <a href="#" className="footer-link">
            Terms of Service
          </a>
          <a href="#" className="footer-link">
            Contact Us
          </a>
        </div>
      </footer>
    </div>
  );
};

export default ParkingHomepage;
