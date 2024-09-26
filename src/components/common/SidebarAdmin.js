// /components/Sidebar.js
import React, { useState } from "react";
import styles from "../../styles/SideBarAdmin.module.css";
import Image from "next/image";
import { LuSettings2 } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";

const SidebarAdmin = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <div className={styles.sidebar} style={{justifyContent:"flex-start"}}>

      <Link href={`/`} passHref style={{ textDecoration: "none",color : "inherit",margin:"0 auto" }} >
        <Image
          src="/images/Logo-sidebar.png"
          alt="Logo"
          className={styles.logoImage}
          width={160}
          height={50}
        />
      </Link>
      
      <div className={styles.menuItems}>

        <div className={styles.menuItem}>
          <div className={styles.menuItemTrigger} onClick={() => toggleDropdown(1)}>
            <LuSettings2 />
            <h3>Catalogue</h3>
            <IoIosArrowDown />
            {openDropdown === 1 && (
              <ul className={styles.dropdown}>
                <Link href={`/admin/catalogue/realisaprint`} passHref style={{ textDecoration: "none",color : "inherit" }}>
                  <li>Catalogue Realis a Print</li>
                </Link>
                <Link href={`/admin/catalogue/myhd`} passHref style={{ textDecoration: "none",color : "inherit" }}>
                  <li>Catalogue MyHd</li>
                </Link>
              </ul>
            )}
          </div>
          <div className={styles.menuItemTrigger} onClick={() => toggleDropdown(2)}>
            <LuSettings2 />
            <h3>Famille</h3>
            <IoIosArrowDown />
            {openDropdown === 2 && (
              <ul className={styles.dropdown}>
                <Link href={`/admin/famille/realisaprint`} passHref style={{ textDecoration: "none",color : "inherit" }}>
                  <li>Famille Realis a Print</li>
                </Link>
                <Link href={`/admin/famille/myhd`} passHref style={{ textDecoration: "none",color : "inherit" }}>
                  <li>Famille MyHd</li>
                </Link>
              </ul>
            )}
          </div>
          <div className={styles.menuItemTrigger} onClick={() => toggleDropdown(3)}>
            <LuSettings2 />
            <h3>Produit</h3>
            <IoIosArrowDown />
            {openDropdown === 3 && (
              <ul className={styles.dropdown}>
                <Link href={`/admin/product/realisaprint`} passHref style={{ textDecoration: "none",color : "inherit" }}>
                  <li>Produit Realis a Print</li>
                </Link>
                <Link href={`/admin/product/myhd`} passHref style={{ textDecoration: "none",color : "inherit" }}>
                  <li>Produit MyHd</li>
                </Link>
              </ul>
            )}
          </div>
          <div className={styles.menuItemTrigger}>
            <LuSettings2 />
              <Link href={`/admin/news`} passHref style={{ textDecoration: "none",color : "inherit" }}>
                <h3>News</h3>
              </Link>
            <IoIosArrowDown />
          </div>
        </div>

      </div>
    </div>
  );
};

export default SidebarAdmin;
