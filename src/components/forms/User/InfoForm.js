/* eslint-disable react/no-unescaped-entities */

import Header from "../../common/Header";
import Sidebar from "../../common/Sidebar";
import RightSideBar from "../../common/RightSideBar";
import styles from "../../../styles/InfoForm.module.css";
import React, { useState, useEffect } from "react";
import "primereact/resources/themes/lara-light-cyan/theme.css";

import { TabPanel, TabView } from "primereact/tabview";


const InfoForm = () => {
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
                    <h2>Hd Dev informatique</h2>
                    <TabView style={{fontSize :"10px"}}>
                        <TabPanel header="Développement d’applications mobile et web">
                            <div className={styles.infoContainer}>
                                <div className={styles.leftSide}>
                                    <p>
                                        Notre agence de développement d’application se spécialise dans la création de solutions personnalisées pour 
                                        répondre à vos besoins spécifiques. Grâce à notre expertise technique et à notre créativité, nous concevons 
                                        des applications sur mesure qui offrent une expérience utilisateur exceptionnelle et répondent aux exigences 
                                        de votre projet. Que vous recherchiez une application web, mobile ou hybride, notre équipe est là pour 
                                        transformer vos idées en réalité digitale. Faites confiance à notre agence de développement d’application pour 
                                        concrétiser vos projets et atteindre vos objectifs.
                                    </p>
                                    
                                    <h3>Développement d'applications web personnalisées</h3>
                                    <ul>
                                        <li>Création d’applications web sur mesure adaptées à vos besoins spécifiques.</li>
                                        <li>Utilisation des dernières technologies pour garantir des fonctionnalités optimales et une expérience utilisateur exceptionnelle.</li>
                                    </ul>

                                    <h3>Intégration avancée dans le développement d'applications</h3>
                                    <ul>
                                        <li>Intégration de fonctionnalités avancées telles que la géolocalisation et les paiements sécurisés.</li>
                                        <li>Personnalisation des fonctionnalités pour répondre aux besoins spécifiques de votre projet.</li>
                                    </ul>

                                    <h3>Optimisation UX pour votre Application</h3>
                                    <ul>
                                        <li>Conception d’interfaces intuitives pour une navigation fluide et une expérience utilisateur agréable.</li>
                                        <li>Intégration de fonctionnalités ergonomiques et conviviales pour maximiser l’engagement des utilisateurs. </li>
                                    </ul>
                                    
                                    <h3>Suivi et Maintenance en continu pour votre Application</h3>

                                    <p>
                                        Service de suivi et de maintenance pour assurer la stabilité et la sécurité de votre application.
                                        Mises à jour régulières pour garantir la compatibilité avec les dernières normes et technologies.
                                    </p>
                                </div>
                                
                                <div className={styles.middleLine}>
                                    <div className={styles.Line}></div>
                                </div>

                                <div className={styles.rightSide}>
                                    <div className={styles.labelContainerDark}>
                                        <label>N° de Devis</label>
                                        <label>2022010155</label>
                                    </div>

                                    <div className={styles.labelContainer}>
                                        <label>Titre</label>
                                        <label>Carte de visite QR CODE</label>
                                    </div>

                                    <div className={styles.labelContainerDark}>
                                        <label>Date d’expiration</label>
                                        <label> 26-02-2024</label>
                                    </div>

                                    <div className={styles.labelContainer}>
                                        <label>Délai Souhaité</label>
                                        <label>2j</label>
                                    </div>

                                    <div className={styles.labelContainerDark}>
                                        <label>Description</label>
                                        <label>8,5  x 5,5</label>
                                    </div>

                                    <div className={styles.labelContainer}>
                                        <label>Prix validé</label>
                                        <label>158 €</label>
                                    </div>
                                    
                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel header="Analyse des données">
                            <p>Content will be added here.</p>
                        </TabPanel>

                        <TabPanel header="Automatisation Business">
                            <p>Content will be added here.</p>
                        </TabPanel>

                        <TabPanel header="Business Intelligence">
                            <p>Content will be added here.</p>
                        </TabPanel>

                        <TabPanel header="Hébergement Maintenance">
                            <p>Content will be added here.</p>
                        </TabPanel>

                        <TabPanel header="Cloud">
                            <p>Content will be added here.</p>
                        </TabPanel>

                    </TabView>
                </div>
            </div>
            <RightSideBar />
        </div>
    );
};
export default InfoForm;
