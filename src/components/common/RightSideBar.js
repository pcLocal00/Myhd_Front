import styles from "../../styles/components/RightSideBar.module.css";
import Image from "next/image";
import { IoStar } from "react-icons/io5";

const RightSideBar = () => {
  return (
    <div className={styles.rightSideBar}>
      <div className={styles.headerWrapper}>
        <h2>Tu Peut Aimer</h2>  
      </div>
      <div className={styles.newsItems} id="menu_items">
        <div className={styles.newsItem}>
          <div className={styles.wrapperlogoImage}>
            <Image
              src="/images/Visit-card-2.png"
              alt="Logo"
              className={styles.logoImage}
              width={147}
              height={136}
            />
          </div>
          <div className={styles.detailsNewsItem}>
            <h4>Lorem ipsum dolor</h4>
            <label>Lorem ipsum dolor sit amet, consectetur</label>
            <span>des 39,00€ par 1000 ex</span>
          </div>
        </div>
        <div className={styles.newsItem}>
          <div className={styles.wrapperlogoImage}>
            <Image
              src="/images/Visit-card-2.png"
              alt="Logo"
              className={styles.logoImage}
              width={147}
              height={136}
            />
          </div>
          <div className={styles.detailsNewsItem}>
            <h4>Lorem ipsum dolor</h4>
            <label>Lorem ipsum dolor sit amet, consectetur</label>
            <span>des 39,00€ par 1000 ex</span>
          </div>
        </div>
        <div className={styles.newsItem}>
          <div className={styles.wrapperlogoImage}>
            <Image
              src="/images/Visit-card-2.png"
              alt="Logo"
              className={styles.logoImage}
              width={147}
              height={136}
            />
          </div>
          <div className={styles.detailsNewsItem}>
            <h4>Lorem ipsum dolor</h4>
            <label>Lorem ipsum dolor sit amet, consectetur</label>
            <span>des 39,00€ par 1000 ex</span>
          </div>
        </div>
      </div>
      <div className={styles.footerNewsItem} >
        <div className={styles.StarWrapper} id="menu_items">
          <IoStar />
          <IoStar />
          <IoStar />
          <IoStar />
          <IoStar />
        </div>
        <div className={styles.ratingWrapper}>
          <span className={styles.rating}>4.56/5 </span>
          <span className={styles.vote}>345 votes</span>
        </div>
        <div className={styles.LocationWrapper}>
          <div className={styles.franceWrapper}>
            <Image
              src="/images/france.png"
              alt="Logo"
              className={styles.france}
              width={44}
              height={44}
            />
            <label>Fabriquer en France</label>
          </div>
          <div className={styles.truckWrapper}>
            <Image
              src="/images/truck.png"
              alt="Logo"
              className={styles.truck}
              width={51}
              height={51}
            />
            <label>Livraison gratuite et en marque blanche</label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RightSideBar;
