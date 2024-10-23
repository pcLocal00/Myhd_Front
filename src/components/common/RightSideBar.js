import axios from "axios";
import styles from "../../styles/components/RightSideBar.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";

const RightSideBar = () => {

  const [news, setNews] = useState([]);
  const Url = process.env.NEXT_PUBLIC_API_URL;
  const Url_IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL_STORAGE;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${Url}/news`);
        console.log(response.data); // Check what the API returns
        setNews(response.data.data || []); // Adjust if `response.data` has a `data` property containing the array
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchJobs();
  }, [Url]);
  

  return (
    <div className={styles.rightSideBar}>
      <div className={styles.headerWrapper}>
        <h2>Tu Peut Aimer</h2>  
      </div>
      <div className={styles.newsItems} id="menu_items">
        {news.map((item) => (
          <div key={item.id} className={styles.newsItem}>
            <div className={styles.wrapperlogoImage}>
              {item.image && (
                <Image
                src={item.image ? `${Url_IMAGE}/${item.image}` : "/images/default.jpg"}
                  alt="Logo"
                  className={styles.logoImage}
                  width={147}
                  height={136}
                />
              )}
            </div>
            <div className={styles.detailsNewsItem}>
              <h4>{item.header}</h4>
              <label>{item.subheader}</label>
              <span>{item.description}</span>
            </div>
          </div>
        ))}
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
