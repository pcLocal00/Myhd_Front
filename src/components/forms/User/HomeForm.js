import Image from "next/image";
import styles from "../../../styles/Home.module.css";
import { useState } from "react";
import Sidebar from "../../common/Sidebar";
import NewsSection from "../../common/NewsSection";
import { MdWavingHand } from "react-icons/md";
import { BiSolidBellRing } from "react-icons/bi";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { IoIosArrowDown, IoIosMail } from "react-icons/io";

const HomeForm = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };
  return (
    <div className={styles.container}>
      <Sidebar />

      <div className={styles.mainContainer}>
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
        <div className={styles.secondeSection}>
          <div className={styles.cardSection}>
            <div className={styles.detialsSection}>
              <div className={styles.detialsFirstSection}>
                <div className={styles.detialsHeader}>
                  <label>Buy Now</label>
                  <label>Pay Later</label>
                </div>
                <div className={styles.cercleWrapper}>
                  <div className={styles.row}>
                    <div className={styles.circle}></div>
                    <div className={styles.circle}></div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.circle}></div>
                    <div className={styles.circle}></div>
                  </div>
                </div>
              </div>
              <p>
                Sunt autem quidam e nostris, qui in liberos atque haec subtilius
                velint tradere Sunt autem quidam e nostris, qui in liberos atque
                haec subtilius velint tradere.Sunt autem quidam e nostris, qui
                in liberos atque haec subtilius velint tradere..
              </p>
              <button className={styles.submitButton} id="signIn" type="submit">
                Voire plus
              </button>
            </div>
            <Image
              src="/images/Hey-pic.png"
              alt="Logo"
              className={styles.logoImage}
              width={314}
              height={266}
            />
          </div>
          <div className={styles.videoSection}>
            <Image
              src="/images/video.png"
              alt="Logo"
              className={styles.videoImage}
              width={500} // Set a fixed width
              height={300} // Set a fixed height
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className={styles.thirdSection}>
          <div className={styles.firtColumn}>
            <h2>Hd communication</h2>
            <h6>Nos Articles en Vedette</h6>
            <div className={styles.menuItem}>
              <div className={styles.menuItemTrigger} onClick={() => toggleDropdown(1)}>
                <h3 >Edition & Print</h3>
                <IoIosArrowDown />
              </div>
              {openDropdown === 1 && (
                <ul className={styles.dropdown}>
                  <li>Subcategory 1</li>
                  <li>Subcategory 2</li>
                  <li>Subcategory 3</li>
                </ul>
              )}
            </div>
            <div className={styles.menuItem}>
              <div className={styles.menuItemTrigger} onClick={() => toggleDropdown(2)}>
                <h3 > Développement Sites Web </h3>
                <IoIosArrowDown />
              </div>
              {openDropdown === 2 && (
                <ul className={styles.dropdown}>
                  <li>Subcategory 1</li>
                  <li>Subcategory 2</li>
                  <li>Subcategory 3</li>
                </ul>
              )}
            </div>
            <div className={styles.menuItem}>
              <div className={styles.menuItemTrigger} onClick={() => toggleDropdown(3)}>
                <h3 > Communication Digitale </h3>
                <IoIosArrowDown />
              </div>
              {openDropdown === 3 && (
                <ul className={styles.dropdown}>
                  <li>Subcategory 1</li>
                  <li>Subcategory 2</li>
                  <li>Subcategory 3</li>
                </ul>
              )}
            </div>
            <div className={styles.menuItem}>
              <div className={styles.menuItemTrigger} onClick={() => toggleDropdown(4)}>
                <h3 >Expérience Client</h3>
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
          </div>
          <div className={styles.secondColumn}>
            <h2>Hd Dev informatique</h2>
            <h6>Nos Articles en Vedette</h6>
            <div className={styles.menuItem}>
              <div className={styles.menuItemTrigger} onClick={() => toggleDropdown(5)}>
                <h3> Développement d’applications mobile et web </h3>
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
              <div className={styles.menuItemTrigger} onClick={() => toggleDropdown(6)}>
                <h3 >Analyse des données</h3>
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
            <div className={styles.menuItem}>
              <div className={styles.menuItemTrigger} onClick={() => toggleDropdown(7)}>
                <h3 > Automatisation Business </h3>
                <IoIosArrowDown />
              </div>
              {openDropdown === 7 && (
                <ul className={styles.dropdown}>
                  <li>Subcategory 1</li>
                  <li>Subcategory 2</li>
                  <li>Subcategory 3</li>
                </ul>
              )}
            </div>
            <div className={styles.menuItem}>
              <div className={styles.menuItemTrigger} onClick={() => toggleDropdown(8)}>
                <h3>Business Intelligence</h3>
                <IoIosArrowDown />
              </div>
              {openDropdown === 8 && (
                <ul className={styles.dropdown}>
                  <li>Subcategory 1</li>
                  <li>Subcategory 2</li>
                  <li>Subcategory 3</li>
                </ul>
              )}
            </div>
            <div className={styles.menuItem}>
              <div className={styles.menuItemTrigger} onClick={() => toggleDropdown(9)}>
                <h3 >
                  Hébergement Maintenance
                </h3>
                <IoIosArrowDown />
              </div>
              {openDropdown === 9 && (
                <ul className={styles.dropdown}>
                  <li>Subcategory 1</li>
                  <li>Subcategory 2</li>
                  <li>Subcategory 3</li>
                </ul>
              )}
            </div>
            <div className={styles.menuItem}>
              <div className={styles.menuItemTrigger} onClick={() => toggleDropdown(10)}>
                <h3 >Cloud</h3>
                <IoIosArrowDown />
              </div>
              {openDropdown === 10 && (
                <ul className={styles.dropdown}>
                  <li>Subcategory 1</li>
                  <li>Subcategory 2</li>
                  <li>Subcategory 3</li>
                </ul>
              )}
            </div>
          </div>
          <div className={styles.thirdColumn}>
            <h2>Hd Solution</h2>
            <h6>Nos Articles en Vedette</h6>
            <div className={styles.rowWrapper}>
              <div className={styles.rowSolution}>
                <Image
                  src="/images/OnlySim.png"
                  alt="Logo"
                  className={styles.logoImage}
                  width={120}
                  height={100}
                />
                <div>
                  <h2>Lorem ipdum</h2>
                  <h6>lorem uygdb gfdfdu</h6>
                </div>
              </div>

              <div className={styles.rowSolution}>
                <Image
                  src="/images/ConnextGPT.png"
                  alt="Logo"
                  className={styles.logoImage}
                  width={120}
                  height={100}
                />
                <div>
                  <h2>Lorem ipdum</h2>
                  <h6>lorem uygdb gfdfdu</h6>
                </div>
              </div>

              <div className={styles.rowSolution}>
                <Image
                  src="/images/HDGoodies.png"
                  alt="Logo"
                  className={styles.logoImage}
                  width={120}
                  height={100}
                />
                <div>
                  <h2>Lorem ipdum</h2>
                  <h6>lorem uygdb gfdfdu</h6>
                </div>
              </div>

              <div className={styles.rowSolution}>
                <Image
                  src="/images/AiHunter.png"
                  alt="Logo"
                  className={styles.logoImage}
                  width={120}
                  height={100}
                />
                <div>
                  <h2>Lorem ipdum</h2>
                  <h6>lorem uygdb gfdfdu</h6>
                </div>
              </div>

              <div className={styles.rowSolution}>
                <Image
                  src="/images/Influnece.png"
                  alt="Logo"
                  className={styles.logoImage}
                  width={120}
                  height={100}
                />
                <div>
                  <h2>Lorem ipdum</h2>
                  <h6>lorem uygdb gfdfdu</h6>
                </div>
              </div>

              <div className={styles.rowSolution}>
                <Image
                  src="/images/DataPull.png"
                  alt="Logo"
                  className={styles.logoImage}
                  width={120}
                  height={100}
                />
                <div>
                  <h2>Lorem ipdum</h2>
                  <h6>lorem uygdb gfdfdu</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NewsSection />
    </div>
  );
};

export default HomeForm;
