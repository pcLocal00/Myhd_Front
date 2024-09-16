// /components/Sidebar.js
import React, { useState } from "react";
import styles from "../../styles/SideBar.module.css";
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
          <div className={styles.menuItemTrigger}>
            <LuSettings2 />
              <Link href={`/admin/catalogue`} passHref style={{ textDecoration: "none",color : "inherit" }}>
                <h3>Catalogue</h3>
              </Link>
            <IoIosArrowDown />
          </div>
          <div className={styles.menuItemTrigger}>
            <LuSettings2 />
              <Link href={`/admin/sub_category`} passHref style={{ textDecoration: "none",color : "inherit" }}>
                <h3>Famille</h3>
              </Link>
            <IoIosArrowDown />
          </div>
          <div className={styles.menuItemTrigger}>
            <LuSettings2 />
              <Link href={`/admin/product`} passHref style={{ textDecoration: "none",color : "inherit" }}>
                <h3>Produit</h3>
              </Link>
            <IoIosArrowDown />
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
