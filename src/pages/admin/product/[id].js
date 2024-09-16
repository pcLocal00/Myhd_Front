/* eslint-disable react/no-unescaped-entities */

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { TabPanel, TabView } from "primereact/tabview";
import SidebarAdmin from "@/components/common/SidebarAdmin";
import styles from "../../../styles/AdminProductForm.module.css";
import stylesT from "../../../styles/components/TapBa.module.scss";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { BsFiletypePdf } from "react-icons/bs";


const ProductPage = () => {
    const router = useRouter();
    const { slug } = router.query;
    const [state, setState] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const handleChange = (evt) => {
        const { name, value, type, checked } = evt.target;
        setState({
            ...state,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    return (
        <div>
        <div className={stylesT.layoutTopbar}>
            <Link href="/" className={stylesT.layoutTopbarLogo}>
                <Image src="/images/Logo-sidebar.png" alt="Logo" className={styles.logoImage} width={160} height={50} />
            </Link>

            <button type="button" className={`${stylesT.layoutMenuButton} ${stylesT.pLink}`}>
                <i className="pi pi-bars" />
            </button>

            <button type="button" className={`${stylesT.layoutTopbarMenuButton} ${stylesT.pLink}`}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div className={stylesT.layoutTopbarMenu}>
                <button type="button" className={`${stylesT.layoutTopbarButton} ${stylesT.pLink}`}>
                    <i className="pi pi-calendar"></i>
                    <span>Calendar</span>
                </button>
                <button type="button" className={`${stylesT.layoutTopbarButton} ${stylesT.pLink}`}>
                    <i className="pi pi-user"></i>
                    <span>Profile</span>
                </button>
                <Link href="/documentation">
                    <button type="button" className={`${stylesT.layoutTopbarButton} ${stylesT.pLink}`}>
                        <i className="pi pi-cog"></i>
                        <span>Settings</span>
                    </button>
                </Link>
            </div>
        </div>

        <div className={styles.container}>
            <SidebarAdmin />
            <div style={{display:"flex",flexDirection:"column", width:"81%"}}>
                <div className={styles.mainContainerOrder}>
                    <div className={styles.middleContainer}>
                        <h3>Raccourcis Vers La Prise d’Action</h3>
                        <div className="card">
                            <TabView style={{fontSize :"10px"}}>
                                <TabPanel header=" Informations produit">
                                    <div className={styles.infoContainer}>
                                        <div className={styles.leftSide}>
                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                <div className={styles.labelContainerDark}>
                                                    <label>Nom du produit:</label>
                                                    <label>2022010155</label>
                                                </div>
                                                <div className={styles.labelContainer}>
                                                    <label>Délai:</label>
                                                    <label>Commande callebout // Préparation de colis et livraison</label>
                                                </div>
                                                <div className={styles.labelContainerDark}>
                                                    <label>Description :</label>
                                                    <label>A4 350 g</label>
                                                </div>
                                                <div className={styles.labelContainer}>
                                                    <label>Prix Modèle :</label>
                                                    <label>Cemex (cb0214)</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.middleLine}>
                                            <div className={styles.Line}></div>
                                        </div>
                                        <div className={styles.rightSide}>
                                            <div className={styles.labelContainerDark}>
                                                <label>Type de produit * :</label>
                                                <label>imprimeri richter(00520)</label>
                                            </div>
                                            <div className={styles.labelContainerImage}>
                                                <label>Image</label>
                                                <Image
                                                    src="/images/Visit-card.png"
                                                    alt="Logo"
                                                    className={styles.logoImage}
                                                    width={120}
                                                    height={100}
                                                />

                                                <div className={styles.fileInputContainer}>
                                                    <label htmlFor="upload" className={styles.customFileLabel}>
                                                        Choose File
                                                    </label>
                                                    <input
                                                        id="upload"
                                                        type="file"
                                                        accept=".jpg,.png"
                                                        name="IMG_PRODUCT"
                                                        className={styles.hiddenFileInput}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel header=" Paramétrage des quantités">
                                </TabPanel>
                                <TabPanel header=" Familles & Catalogues">
                                </TabPanel>
                                <TabPanel header=" Paramétrage des éléments">
                                </TabPanel>
                                <TabPanel header=" Paramétrage des emballages / Assemblages">
                                </TabPanel>
                            </TabView>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default ProductPage;
