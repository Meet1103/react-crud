import React from "react";

// React Icon Imports
import { FaPhone, FaRegHeart, FaHeart } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineGlobal, AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import personAvatar from "../../images/personAvatar.svg";

// CSS Imports
import "./PersonInfoCard.css";

const PersonInfoCard = ({
  personInfo,
  changingPersonInfoFavouriteStatus,
  selectedPersonInfoId,
  deletePersonInfo,
}) => {
  return (
    <div className="card-container">
      <div className="card-image">
        <img src={personAvatar} alt="person avatar" />
      </div>
      <div className="card-info">
        <div className="person-name">{personInfo?.name}</div>
        <div className="card-subinfo">
          <div className="person-email-group">
            <span className="person-email-icon">
              <MdOutlineEmail />
            </span>
            <span className="person-email">{personInfo?.email}</span>
          </div>
          <div className="person-phone-group">
            <span className="person-phone-icon">
              <FaPhone />
            </span>
            <span className="person-phone">{personInfo?.phone}</span>
          </div>
          <div className="person-website-group">
            <span className="person-website-icon">
              <AiOutlineGlobal />
            </span>
            <span className="person-website">{personInfo?.website}</span>
          </div>
        </div>
      </div>
      <div className="card-action">
        <span
          onClick={() => changingPersonInfoFavouriteStatus(personInfo?.id)}
          className="favourite-card-icon"
        >
          {personInfo?.favourite ? <FaHeart /> : <FaRegHeart />}
        </span>
        <span
          onClick={() => selectedPersonInfoId(personInfo?.id)}
          className="edit-card-icon"
        >
          <AiTwotoneEdit />
        </span>
        <span
          onClick={() => deletePersonInfo(personInfo?.id)}
          className="delete-card-icon"
        >
          <AiFillDelete />
        </span>
      </div>
    </div>
  );
};

export default PersonInfoCard;
