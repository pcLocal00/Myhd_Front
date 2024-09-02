/* eslint-disable react/no-unescaped-entities */

import axios from "axios";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import RightSideBar from "../common/RightSideBar";
import styles from "../../styles/CatalogueForm.module.css";
import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import { BsFiletypePdf } from "react-icons/bs";
import { TbFileSearch } from "react-icons/tb";
import Link from "next/link";


const CatalogueForm = () => {
    const [openDropdown, setOpenDropdown] = useState(null);


    const toggleDropdown = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.mainContainer}>
                <Header />
                <div className={styles.middleContainer}>
                    <h2>Mon Catalogue de mon entreprise</h2>
                    <div className={`${styles.menuItemTrigger} ${openDropdown === 1 ? 'open' : ''}`} onClick={() => toggleDropdown(1)}>
                        <div className={styles.menuItemsShowen}>
                            <div className={styles.menuItemHeader}>
                            <h3>Hd communication</h3>
                            <h4>Nos Articles en Vedette</h4>
                            </div>
                            <IoIosArrowDown />
                        </div>
                        <div className={styles.menuItemsHidden}>
                            {openDropdown === 1 && (
                                <div className={styles.menuItemsWrapper}>
                                    <Link href={`/print`} passHref style={{ textDecoration: "none",color : "inherit"  }}>
                                        <div className={styles.menuItemWrapper} >
                                            <Image
                                                src="/images/Visit-card-2.png"
                                                alt="Logo"
                                                className={styles.logoImage}
                                                width={147}
                                                height={136}
                                            /> 
                                            <div className={styles.itemDetails}>
                                                
                                            <lable>Libellé</lable>  
                                                <span>Carte de visite</span>
                                            </div>
                                            <div className={styles.itemDetails}>
                                                
                                            <lable>Type</lable> 
                                                <span>Print</span>
                                            </div>
                                            <div className={styles.itemDetails}>
                                                
                                            <lable>Quantité</lable> 
                                                <span>1500</span>
                                            </div>
                                            <div className={styles.itemDetails}>
                                                
                                            <lable>Date Cmd</lable> 
                                                <span>18/05/2022</span>
                                            </div>
                                            <div className={styles.itemDetails}>
                                                
                                            <lable>Prix</lable> 
                                                <span>100 €</span>
                                            </div>
                                            <div className={styles.itemDetails}>
                                                
                                                <lable>Prévisu</lable> 
                                                <div className={styles.iconWrapper}>
                                                    <BsFiletypePdf className={styles.pdfIcon} />
                                                    <TbFileSearch className={styles.fileIcon} />
                                                </div>
                                            </div>
                                        </div> 
                                    </Link>
                                    <Link href={`/print`} passHref style={{ textDecoration: "none",color : "inherit"  }}>
                                        <div className={styles.menuItemWrapperDark} >
                                            <Image
                                                src="/images/Visit-card-2.png"
                                                alt="Logo"
                                                className={styles.logoImage}
                                                width={147}
                                                height={136}
                                            /> 
                                            <div className={styles.itemDetails}>
                                                
                                            <lable>Libellé</lable>  
                                                <span>Carte de visite</span>
                                            </div>
                                            <div className={styles.itemDetails}>
                                                
                                            <lable>Type</lable> 
                                                <span>Print</span>
                                            </div>
                                            <div className={styles.itemDetails}>
                                                
                                            <lable>Quantité</lable> 
                                                <span>1500</span>
                                            </div>
                                            <div className={styles.itemDetails}>
                                                
                                            <lable>Date Cmd</lable> 
                                                <span>18/05/2022</span>
                                            </div>
                                            <div className={styles.itemDetails}>
                                                
                                            <lable>Prix</lable> 
                                                <span>100 €</span>
                                            </div>
                                            <div className={styles.itemDetails}>
                                                
                                                <lable>Prévisu</lable> 
                                                <div className={styles.iconWrapper}>
                                                    <BsFiletypePdf className={styles.pdfIcon} />
                                                    <TbFileSearch className={styles.fileIcon} />
                                                </div>
                                            </div>
                                        </div> 
                                    </Link>
                                    <Link href={`/print`} passHref style={{ textDecoration: "none",color : "inherit"  }}>
                                        <div className={styles.menuItemWrapper} >
                                            <Image
                                                src="/images/Visit-card-2.png"
                                                alt="Logo"
                                                className={styles.logoImage}
                                                width={147}
                                                height={136}
                                            /> 
                                            <div className={styles.itemDetails}>
                                                
                                            <lable>Libellé</lable>  
                                                <span>Carte de visite</span>
                                            </div>
                                            <div className={styles.itemDetails}>
                                                
                                            <lable>Type</lable> 
                                                <span>Print</span>
                                            </div>
                                            <div className={styles.itemDetails}>
                                                
                                            <lable>Quantité</lable> 
                                                <span>1500</span>
                                            </div>
                                            <div className={styles.itemDetails}>
                                                
                                            <lable>Date Cmd</lable> 
                                                <span>18/05/2022</span>
                                            </div>
                                            <div className={styles.itemDetails}>
                                                
                                            <lable>Prix</lable> 
                                                <span>100 €</span>
                                            </div>
                                            <div className={styles.itemDetails}>
                                                
                                                <lable>Prévisu</lable> 
                                                <div className={styles.iconWrapper}>
                                                    <BsFiletypePdf className={styles.pdfIcon} />
                                                    <TbFileSearch className={styles.fileIcon} />
                                                </div>
                                            </div>
                                        </div> 
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={`${styles.menuItemTrigger} ${openDropdown === 2 ? 'open' : ''}`} onClick={() => toggleDropdown(2)}>
                        <div className={styles.menuItemsShowen}>
                            <div className={styles.menuItemHeader}>
                                <h3>Hd Dev informatique</h3>
                                <h4>Nos Articles en Vedette</h4>
                            </div>
                            <IoIosArrowDown />
                        </div>
                        <div className={styles.menuItemsHidden}>
                            {openDropdown === 2 && (
                                <div className={styles.menuItemsWrapper}>
                                    <Link href={`/infos`} passHref style={{ textDecoration: "none",color : "inherit"  }}>
                                        <div className={styles.menuItemWrapper}>
                                            <Image
                                                src="/images/Visit-card-2.png"
                                                alt="Logo"
                                                className={styles.logoImage}
                                                width={147}
                                                height={136}
                                            /> 
                                            <div className={styles.itemDetails}>
                                                
                                            <lable>Libellé</lable>  
                                                <span>Carte de visite</span>
                                            </div>
                                            <div className={styles.itemDetails}>
                                                
                                            <lable>Type</lable> 
                                                <span>Print</span>
                                            </div>
                                            <div className={styles.itemDetails}>
                                                
                                            <lable>Quantité</lable> 
                                                <span>1500</span>
                                            </div>
                                            <div className={styles.itemDetails}>
                                                
                                            <lable>Date Cmd</lable> 
                                                <span>18/05/2022</span>
                                            </div>
                                            <div className={styles.itemDetails}>
                                                
                                            <lable>Prix</lable> 
                                                <span>100 €</span>
                                            </div>
                                            <div className={styles.itemDetails}>
                                                
                                                <lable>Prévisu</lable> 
                                                <div className={styles.iconWrapper}>
                                                    <BsFiletypePdf className={styles.pdfIcon} />
                                                    <TbFileSearch className={styles.fileIcon} />
                                                </div>
                                            </div>
                                        </div> 
                                    </Link>
                                    <div className={styles.menuItemWrapperDark}>
                                        <Image
                                            src="/images/Visit-card-2.png"
                                            alt="Logo"
                                            className={styles.logoImage}
                                            width={147}
                                            height={136}
                                        /> 
                                        <div className={styles.itemDetails}>
                                            
                                           <lable>Libellé</lable>  
                                            <span>Carte de visite</span>
                                        </div>
                                        <div className={styles.itemDetails}>
                                            
                                           <lable>Type</lable> 
                                            <span>Print</span>
                                        </div>
                                        <div className={styles.itemDetails}>
                                            
                                           <lable>Quantité</lable> 
                                            <span>1500</span>
                                        </div>
                                        <div className={styles.itemDetails}>
                                            
                                           <lable>Date Cmd</lable> 
                                            <span>18/05/2022</span>
                                        </div>
                                        <div className={styles.itemDetails}>
                                            
                                           <lable>Prix</lable> 
                                            <span>100 €</span>
                                        </div>
                                        <div className={styles.itemDetails}>
                                            
                                            <lable>Prévisu</lable> 
                                            <div className={styles.iconWrapper}>
                                                <BsFiletypePdf className={styles.pdfIcon} />
                                                <TbFileSearch className={styles.fileIcon} />
                                            </div>
                                        </div>
                                    </div> 
                                    <div className={styles.menuItemWrapper}>
                                        <Image
                                            src="/images/Visit-card-2.png"
                                            alt="Logo"
                                            className={styles.logoImage}
                                            width={147}
                                            height={136}
                                        /> 
                                        <div className={styles.itemDetails}>
                                            
                                           <lable>Libellé</lable>  
                                            <span>Carte de visite</span>
                                        </div>
                                        <div className={styles.itemDetails}>
                                            
                                           <lable>Type</lable> 
                                            <span>Print</span>
                                        </div>
                                        <div className={styles.itemDetails}>
                                            
                                           <lable>Quantité</lable> 
                                            <span>1500</span>
                                        </div>
                                        <div className={styles.itemDetails}>
                                            
                                           <lable>Date Cmd</lable> 
                                            <span>18/05/2022</span>
                                        </div>
                                        <div className={styles.itemDetails}>
                                            
                                           <lable>Prix</lable> 
                                            <span>100 €</span>
                                        </div>
                                        <div className={styles.itemDetails}>
                                            
                                            <lable>Prévisu</lable> 
                                            <div className={styles.iconWrapper}>
                                                <BsFiletypePdf className={styles.pdfIcon} />
                                                <TbFileSearch className={styles.fileIcon} />
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={`${styles.menuItemTrigger} ${openDropdown === 3 ? 'open' : ''}`} onClick={() => toggleDropdown(3)}>
                        <div className={styles.menuItemsShowen}>
                            <div className={styles.menuItemHeader}>
                            <h3>Hd Solution </h3>
                            <h4>Nos Articles en Vedette</h4>
                            </div>
                            <IoIosArrowDown />
                        </div>
                        <div className={styles.menuItemsHidden}>
                            {openDropdown === 3 && (
                                <div className={styles.menuItemsWrapper}>
                                    <div className={styles.menuItemWrapper}>
                                        <Image
                                            src="/images/Visit-card-2.png"
                                            alt="Logo"
                                            className={styles.logoImage}
                                            width={147}
                                            height={136}
                                        /> 
                                        <div className={styles.itemDetails}>
                                            
                                           <lable>Libellé</lable>  
                                            <span>Carte de visite</span>
                                        </div>
                                        <div className={styles.itemDetails}>
                                            
                                           <lable>Type</lable> 
                                            <span>Print</span>
                                        </div>
                                        <div className={styles.itemDetails}>
                                            
                                           <lable>Quantité</lable> 
                                            <span>1500</span>
                                        </div>
                                        <div className={styles.itemDetails}>
                                            
                                           <lable>Date Cmd</lable> 
                                            <span>18/05/2022</span>
                                        </div>
                                        <div className={styles.itemDetails}>
                                            
                                           <lable>Prix</lable> 
                                            <span>100 €</span>
                                        </div>
                                        <div className={styles.itemDetails}>
                                            
                                            <lable>Prévisu</lable> 
                                            <div className={styles.iconWrapper}>
                                                <BsFiletypePdf className={styles.pdfIcon} />
                                                <TbFileSearch className={styles.fileIcon} />
                                            </div>
                                        </div>
                                    </div> 
                                    <div className={styles.menuItemWrapperDark}>
                                        <Image
                                            src="/images/Visit-card-2.png"
                                            alt="Logo"
                                            className={styles.logoImage}
                                            width={147}
                                            height={136}
                                        /> 
                                        <div className={styles.itemDetails}>
                                            
                                           <lable>Libellé</lable>  
                                            <span>Carte de visite</span>
                                        </div>
                                        <div className={styles.itemDetails}>
                                            
                                           <lable>Type</lable> 
                                            <span>Print</span>
                                        </div>
                                        <div className={styles.itemDetails}>
                                            
                                           <lable>Quantité</lable> 
                                            <span>1500</span>
                                        </div>
                                        <div className={styles.itemDetails}>
                                            
                                           <lable>Date Cmd</lable> 
                                            <span>18/05/2022</span>
                                        </div>
                                        <div className={styles.itemDetails}>
                                            
                                           <lable>Prix</lable> 
                                            <span>100 €</span>
                                        </div>
                                        <div className={styles.itemDetails}>
                                            
                                            <lable>Prévisu</lable> 
                                            <div className={styles.iconWrapper}>
                                                <BsFiletypePdf className={styles.pdfIcon} />
                                                <TbFileSearch className={styles.fileIcon} />
                                            </div>
                                        </div>
                                    </div> 
                                    <div className={styles.menuItemWrapper}>
                                        <Image
                                            src="/images/Visit-card-2.png"
                                            alt="Logo"
                                            className={styles.logoImage}
                                            width={147}
                                            height={136}
                                        /> 
                                        <div className={styles.itemDetails}>
                                            
                                           <lable>Libellé</lable>  
                                            <span>Carte de visite</span>
                                        </div>
                                        <div className={styles.itemDetails}>
                                            
                                           <lable>Type</lable> 
                                            <span>Print</span>
                                        </div>
                                        <div className={styles.itemDetails}>
                                            
                                           <lable>Quantité</lable> 
                                            <span>1500</span>
                                        </div>
                                        <div className={styles.itemDetails}>
                                            
                                           <lable>Date Cmd</lable> 
                                            <span>18/05/2022</span>
                                        </div>
                                        <div className={styles.itemDetails}>
                                            
                                           <lable>Prix</lable> 
                                            <span>100 €</span>
                                        </div>
                                        <div className={styles.itemDetails}>
                                            
                                            <lable>Prévisu</lable> 
                                            <div className={styles.iconWrapper}>
                                                <BsFiletypePdf className={styles.pdfIcon} />
                                                <TbFileSearch className={styles.fileIcon} />
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <RightSideBar />
        </div>
    );
};
export default CatalogueForm;
