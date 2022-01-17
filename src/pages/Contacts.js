import React from "react";
import backGround from '../img/slider.jpg'

export const Contacts = () => {
   return(
            <div className="main-content-section" style={{'backgroundImage':`url(${backGround})`, 'backgroundSize':'cover', 'padding':'80px 40px 40px 40px'}}>
                {/* <!-- Contacts section --> */}
                <div className="my-contacts-section">
                    <h2 className="my-contacts-type">Phones:</h2>
                    <a className="my-contacts-content" href='tel:+401234567890'>+401234567890</a>
                        <p className="my-contacts-description">
                        Viber, WhatsApp, Telegram
                        </p>
                    <a className="my-contacts-content" href='tel:+401234567890' >+401234567890</a>
                    <h2 className="my-contacts-type">Email:</h2>
                    <a className="my-contacts-content" href='mailto:test@gmail.com'>test@gmail.com</a>
                    <h2 className="my-contacts-type">LinkedIn:</h2>
                    <a className="my-contacts-content" href='https://www.linkedin.com'>linkedin.com</a>
                </div>
            </div>
  )
}