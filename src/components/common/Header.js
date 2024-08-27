// /components/Header.js
import React, { useState } from "react";
import styles from "../../styles/components/Header.module.css";

import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdWavingHand } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { BiSolidBellRing } from "react-icons/bi";
import { FiPhoneCall } from "react-icons/fi";

const Header = () => {
  return (
    <div className={styles.topSection}>
      <div>
        <div className={styles.salutSection}>
          <label>Bonjour Polia</label>
          <MdWavingHand className={styles.handIcon} />
        </div>
        <div className={styles.nameSection}>
          <label>BARRY CALLEBAUT FRANCE S.A (CB0039)</label>
          <BiSolidBellRing className={styles.bellRing} />
          <span className={styles.bellRingAfter}>1</span>
        </div>
      </div>
      <div className={styles.searchBar}>
        <div className={styles.iconWrapper}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className={styles.searchIcon}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M4.75 11a6.25 6.25 0 1112.5 0 6.25 6.25 0 01-12.5 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Rechercher"
        />
      </div>
      <div className={styles.iconWrapper}>
        <FaFacebookF className={styles.socailIcon} />
        <FaInstagram className={styles.socailIcon} />
        <FaWhatsapp className={styles.socailIcon} />
        <FiPhoneCall className={styles.socailIcon} />
        <IoIosMail className={styles.socailIcon} />
      </div>
    </div>
  );
};
export default Header;