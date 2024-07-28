import React from 'react'
import '../../public/css/components/footer.scss'
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer">
          <div className="footer-content">
            <div className="social-media">
              <a href="https://facebook.com"><FaFacebook /></a>
              <a href="https://twitter.com" ><FaTwitter/></a>
              <a href="https://instagram.com"><FaInstagram/></a>
            </div>
            <div className="contact-info">
              <p>&copy; 2024 Your Company. All rights reserved.</p>
              <p>Email: contact@yourcompany.com</p>
            </div>
          </div>
        </footer>
      );
}

export default Footer
