// /components/Sidebar.js
import React, { useState } from "react";
import styles from "../../styles/SideBar.module.css";
import Image from "next/image";
import { ImBooks } from "react-icons/im";
import { FaHandHoldingMedical } from "react-icons/fa";
import { LuSettings2 } from "react-icons/lu";
import { IoBagCheck } from "react-icons/io5";
import { ImStatsDots } from "react-icons/im";
import { MdOutlineHelpOutline } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <div className={styles.sidebar}>
      <Image
        src="/images/Logo-sidebar.png"
        alt="Logo"
        className={styles.logoImage}
        width={160}
        height={50}
      />
      <div className={styles.menuItems}>
        <div className={styles.menuItem}>
          <div className={styles.menuItemTrigger}>
            <ImBooks />
            <h3 onClick={() => toggleDropdown(1)}>MON CATALOGUE</h3>
            <IoIosArrowDown />
          </div>
          {openDropdown === 1 && (
            <ul className={styles.dropdown}>
              <Link href={`/catalogue`} passHref>
                <li>MON CATALOGUE</li>
              </Link>
              <li>Subcategory 2</li>
              <li>Subcategory 3</li>
            </ul>
          )}
        </div>

        <div className={styles.menuItem}>
          <div className={styles.menuItemTrigger}>
            <FaHandHoldingMedical />
              <Link href={`/devis`} passHref style={{ textDecoration: "none" }}>
                <h3>MON DEVIS</h3>
              </Link>
            <IoIosArrowDown />
          </div>
        </div>

        <div className={styles.menuItem}>
          <div className={styles.menuItemTrigger}>
            <IoBagCheck />
              <Link href={`/order`} passHref style={{ textDecoration: "none" }}>
                <h3>MON COMMANDES</h3>
              </Link>
            <IoIosArrowDown />
          </div>
        </div>

        <div className={styles.menuItem}>
          <div className={styles.menuItemTrigger}>
            <LuSettings2 />
            <h3 onClick={() => toggleDropdown(4)}>MES PARAMÈTRES</h3>
            <IoIosArrowDown />
          </div>
          {openDropdown === 4 && (
            <ul className={styles.dropdown}>
              <li>Subcategory 1</li>
              <li>Subcategory 2</li>
              <li>Subcategory 3</li>
            </ul>
          )}
        </div>

        <div className={styles.menuItem}>
          <div className={styles.menuItemTrigger}>
            <ImStatsDots />
            <h3 onClick={() => toggleDropdown(5)}>MON TABLEAU DE BORD</h3>
            <IoIosArrowDown />
          </div>
          {openDropdown === 5 && (
            <ul className={styles.dropdown}>
              <li>Subcategory 1</li>
              <li>Subcategory 2</li>
              <li>Subcategory 3</li>
            </ul>
          )}
        </div>

        <div className={styles.menuItem}>
          <div className={styles.menuItemTrigger}>
            <MdOutlineHelpOutline />
            <h3 onClick={() => toggleDropdown(6)}>AIDE</h3>
            <IoIosArrowDown />
          </div>
          {openDropdown === 6 && (
            <ul className={styles.dropdown}>
              <li>Subcategory 1</li>
              <li>Subcategory 2</li>
              <li>Subcategory 3</li>
            </ul>
          )}
        </div>
      </div>

      <div className={styles.messagerie}>
        <div className={styles.messagerieHeader}>
          <Image
            src="/images/Profile-pic.png"
            alt="Profile"
            className={styles.profileImage}
            width={60}
            height={60}
          />
          <div className={styles.profileDetails}>
            <h4>John Doe</h4>
            <p>Manager</p>
            <input
              type="text"
              placeholder="Message direct"
              className={styles.messageInput}
            />
          </div>
        </div>
        <div className={styles.messagerieCard}>
          <h4>MyHD</h4>
          <div className={styles.labels}>
            <span className={styles.label}>service@havetdigital.fr</span>
            <span className={styles.label}>+33 3 21 63 19 19</span>
            <span className={styles.label}>Prendre rendez-vous</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
