// /components/NewsSection.js
import React from "react";
import styles from "../../styles/NewsSection.module.css";
import { TbCoinEuro } from "react-icons/tb";
import { SlWallet } from "react-icons/sl";
import { FaFileInvoiceDollar } from "react-icons/fa";
import Image from "next/image";

const NewsSection = () => {
  return (
    <div className={styles.newsSection}>
      <h2>News</h2>
      <div className={styles.newsItems} id="menu_items">
        <div className={styles.newsItem}>
          <h4>Lorem ipsum dolor</h4>
          <h1>Nos Articles en Vedette</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco Lorem ipsum dolor
            sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </p>
          <div className={styles.newsFooter}>
            <p>Lorem ipsum </p>
            <p>Lorem ipsum</p>
          </div>
        </div>
        <div className={styles.newsItem}>
          <h4>Lorem ipsum dolor</h4>
          <h1>Nos Articles en Vedette</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco Lorem ipsum dolor
            sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </p>
          <div className={styles.newsFooter}>
            <p>Lorem ipsum </p>
            <p>Lorem ipsum</p>
          </div>
        </div>
        <div className={styles.newsItem}>
          <h4>Lorem ipsum dolor</h4>
          <h1>Nos Articles en Vedette</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco Lorem ipsum dolor
            sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </p>
          <div className={styles.newsFooter}>
            <p>Lorem ipsum </p>
            <p>Lorem ipsum</p>
          </div>
        </div>
        <div className={styles.newsItem}>
          <h4>Lorem ipsum dolor</h4>
          <h1>Nos Articles en Vedette</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco Lorem ipsum dolor
            sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </p>
          <div className={styles.newsFooter}>
            <p>Lorem ipsum </p>
            <p>Lorem ipsum</p>
          </div>
        </div>
        <div className={styles.newsItem}>
          <h4>Lorem ipsum dolor</h4>
          <h1>Nos Articles en Vedette</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco Lorem ipsum dolor
            sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </p>
          <div className={styles.newsFooter}>
            <p>Lorem ipsum </p>
            <p>Lorem ipsum</p>
          </div>
        </div>
        <div className={styles.newsItem}>
          <h4>Lorem ipsum dolor</h4>
          <h1>Nos Articles en Vedette</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco Lorem ipsum dolor
            sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </p>
          <div className={styles.newsFooter}>
            <p>Lorem ipsum </p>
            <p>Lorem ipsum</p>
          </div>
        </div>
      </div>
      <h3>Qualités</h3>
      <div className={styles.qualitieItems}>
        <div className={styles.qualitieItemDark}>
          <TbCoinEuro className={styles.coinEuro} />
          <div className={styles.qualitieItemDetails}>
            <span className={styles.qualitieItemTitle}>
              Chiffre d’affaires{" "}
            </span>
            <span>€193.4k </span>
          </div>
          <span className={styles.qualitieItemPer}>15,8% Ce mois</span>
        </div>

        <div className={styles.qualitieItemLight}>
          <SlWallet className={styles.wallet} />
          <div className={styles.qualitieItemDetails}>
            <span className={styles.qualitieItemTitle}>Commandes </span>
            <span>178</span>
          </div>
          <span className={styles.qualitieItemPer}>2% Ce mois</span>
        </div>
        <div className={styles.qualitieItemDark}>
          <FaFileInvoiceDollar className={styles.invoice} />
          <div className={styles.qualitieItemDetails}>
            <span className={styles.qualitieItemTitle}>Devis </span>
            <span>229</span>
          </div>
          <span className={styles.qualitieItemPer}>11% Ce mois</span>
        </div>
      </div>

      <div className={styles.CardSection}>
        <div>
          <h3>Nouv</h3>
          <h3>Produit</h3>
          <button className={styles.submitButton} id="signIn" type="submit">
            Voire plus
          </button>
        </div>
        <Image
          src="/images/Visit-card.png"
          alt="Logo"
          className={styles.logoImage}
          width={120}
          height={100}
        />
      </div>
    </div>
  );
};

export default NewsSection;
