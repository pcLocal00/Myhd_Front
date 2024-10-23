// /components/NewsSection.js
import React, { useEffect, useState } from "react";
import styles from "../../styles/NewsSection.module.css";
import { TbCoinEuro } from "react-icons/tb";
import { SlWallet } from "react-icons/sl";
import { FaFileInvoiceDollar } from "react-icons/fa";
import Image from "next/image";
import axios from "axios";

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const Url = process.env.NEXT_PUBLIC_API_URL;
  const Url_IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL_STORAGE;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${Url}/news`);
        console.log(response.data); 
        setNews(response.data.data || []); 
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchJobs();
  }, [Url]);

  return (
    <div className={styles.newsSection}>
      <h2>News</h2>
      <div className={styles.newsItems} id="menu_items">
        {news.map((item) => (
          <div key={item.id} className={styles.newsItem}>
            {/* <div className={styles.wrapperlogoImage}>
              {item.image && (
                <Image
                src={item.image ? `${Url_IMAGE}/${item.image}` : "/images/default.jpg"}
                  alt="Logo"
                  className={styles.logoImage}
                  width={147}
                  height={136}
                />
              )}
            </div> */}
            <div className={styles.detailsNewsItem}>
              <h4>{item.header}</h4>
              <label>{item.subheader}</label>
              <span>{item.description}</span>
            </div>
          </div>
        ))}
      </div>
      <h3>Qualités</h3>
      <div className={styles.qualitieItems}>
        <div className={styles.qualitieItemDark}>
          <div style={{flex:"1 1 19%"}}>
            <TbCoinEuro className={styles.coinEuro} />
          </div>
          <div className={styles.qualitieItemDetails}>
            <span className={styles.qualitieItemTitle}>
              Chiffre d’affaires{" "}
            </span>
            <span>€193.4k </span>
          </div>
          <span className={styles.qualitieItemPer}>15,8% Ce mois</span>
        </div>

        <div className={styles.qualitieItemLight}>
          <div style={{flex:"1 1 15%"}}>
            <SlWallet className={styles.wallet} />
          </div>
          <div className={styles.qualitieItemDetails}>
            <span className={styles.qualitieItemTitle}>Commandes </span>
            <span>178</span>
          </div>
          <span className={styles.qualitieItemPer}>2% Ce mois</span>
        </div>
        <div className={styles.qualitieItemDark}>
          <div style={{flex:"1 1 15%"}}>
            <FaFileInvoiceDollar className={styles.invoice} />
          </div>
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
