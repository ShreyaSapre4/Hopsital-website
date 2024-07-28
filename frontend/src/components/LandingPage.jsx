import React from "react";
import "../../public/css/components/landingPage.scss";
import img27x7 from '../../public/images/24x7.png'
import imgEasyToUse from '../../public/images/easyToUse.png'
import imgInstantConfirmation from '../../public/images/instantConfirmation.png'

function LandingPage() {
  return (
    <>
      <div className="landing-page">
        <section id="hero" className="hero">
          <div className="hero-content">
            <h1>Welcome to Our Healthcare Center</h1>
            <p>
              We provide comprehensive healthcare services to keep you and your
              family healthy.
            </p>
            <a href="/about" className="cta-btn">
              Learn More
            </a>
          </div>
        </section>
        <section id="slogan" className="slogan">
          <div className="about-content">
            <h2>YOUR HEALTH, YOUR SCHEDULE!</h2>
            <h3>Book doctor appointments with ease</h3>
            <p>
              Healthcare is an essential aspect of maintaining well-being,
              encompassing a wide array of medical services aimed at promoting,
              preventing, diagnosing, and treating illnesses and injuries. In
              today's digital age, booking appointments for healthcare services
              has become increasingly convenient and efficient. Online platforms
              and mobile applications offer patients the ability to schedule
              appointments with healthcare providers, including doctors,
              specialists, and clinics, with just a few clicks or taps
            </p>
          </div>
          <div className="grid-container">
            <div className="grid-item">
            <img src={img27x7}></img>
              <h4>24/7 Availability</h4>
              <p>
                Book appointments anytime, day or night, at your convenience.
              </p>
            </div>
            <div className="grid-item">
            <img src={imgEasyToUse}></img>
              <h4>Easy-to-Use Interface</h4>
              <p>Intuitive interface for seamless appointment scheduling.</p>
            </div>
            <div className="grid-item">
            <img src={imgInstantConfirmation}></img>
              <h4>Instant Confirmation</h4>
              <p>
                Receive immediate confirmation for your booked appointments.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default LandingPage;
