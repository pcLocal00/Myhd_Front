/* eslint-disable react/no-unescaped-entities */
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import { useRouter } from "next/router";
import styles from "../../../styles/OneDevisForm.module.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoCreateOutline } from "react-icons/io5";
import { PiProjectorScreenChartLight } from "react-icons/pi";
import { FaDownload } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-cyan/theme.css";


const OrderPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [devis, setDevis] = useState([]);
    const [loading, setLoading] = useState(false);
    const [checkedFrs, setCheckedFrs] = useState(false);
    const [checkedClient, setCheckedClient] = useState(false);

    const Url = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchDevis = async () => {
            try {
                const response = await axios.get(`${Url}/user/devis/${id}`);
                setDevis(response.data);
            } catch (error) {
                console.error('Error fetching devis:', error);
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchDevis();
        }
    }, [id, Url]);


    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.mainContainer}>
                <Header />
                <div className={styles.middleContainer}>
                    <h2>Mes Devis en Cours</h2>
                    <h3>Raccourcis Vers La Prise d’Action</h3>
                    <div style={{ display: "flex", gap: "10px" ,alignItems:"center"}}>
                        <span style={{ display: "flex", gap: "5px" ,alignItems:"center"}}><IoCreateOutline /> devis n°:</span>
                        <span className={styles.darkBlueSpan}>2024151147 </span>
                        <span className={styles.darkBlueSpan}>Status : Transmis </span>
                        <span className={styles.darkBlueSpan}>Prix de vente proposé : 184.00 € </span>
                        <span className={styles.lightBlueSpan}>Crée le : 23-08-2024 15/10/10 </span>
                        <span className={styles.blueSpan}> <FaDownload /> Telecharger devis </span>
                        <span className={styles.greenSpan}> <FaCheck/> Accepter </span>
                        <span className={styles.redSpan}> <IoClose/> Refuser</span>
                    </div>

                    <div className={styles.infoContainer}>
                        <div className={styles.leftSide}>
                            <h4>Vos informations :</h4>
                            <ul>
                                <li>AURA Services (CA0209)</li>
                                <li>Toufik SAMEL</li>
                                <li>76 rue de la Plaine des Bouchers 67100 Strasbourg France</li>
                                <li>t.samel@aura-services.fr</li>
                            </ul>
                            <div className={styles.labelContainerDark} style={{justifyContent : "center"}}>
                                <h4 className={styles.titleDevis}>CARNET LVU International A5 25x5 "Tpts Load"</h4>
                            </div>
                            <div className={styles.labelContainer}>
                                <PiProjectorScreenChartLight /> Prépresse : Fichier PDF Fourni
                            </div>

                            <div className={styles.labelContainerDark}>
                                <label>Description : </label>
                                <ul>
                                    <li>Format : 14,8 x 21 cm</li>
                                    <li>Support : LOrem ipsum dolor</li>
                                    <li>Impression : sans impression,</li>
                                </ul>
                            </div>

                            <div className={styles.labelContainer}>
                                <label>Feullet 1 : </label>
                                <ul>
                                    <li>Format : 14,8 x 21 cm</li>
                                    <li>Support : LOrem ipsum dolor</li>
                                    <li>Impression : sans impression,</li>
                                </ul>
                            </div>

                            <div className={styles.labelContainerDark}>
                                <label>Feullet 2 : </label>
                                <ul>
                                    <li>Format : 14,8 x 21 cm</li>
                                    <li>Support : LOrem ipsum dolor</li>
                                    <li>Impression : sans impression,</li>
                                </ul>
                            </div>

                            <div className={styles.labelContainer}>
                                <label>Feullet 3 : </label>
                                <ul>
                                    <li>Format : 14,8 x 21 cm</li>
                                    <li>Support : LOrem ipsum dolor</li>
                                    <li>Impression : sans impression,</li>
                                </ul>
                            </div>

                            <div className={styles.labelContainerDark}>
                                <label>Dessous : </label>
                                <ul>
                                    <li>Format : 14,8 x 21 cm</li>
                                    <li>Support : LOrem ipsum dolor</li>
                                    <li>Impression : sans impression,</li>
                                </ul>
                            </div>

                            <div className={styles.labelContainer}>
                                <label>Assemblage et façonnage général :</label>
                                <ul>
                                    <li>Souche : Côté haut - Dos toilé noir - Numérotation à partir de 2024XXXX</li>
                                </ul>
                            </div>
                            <div className={styles.labelContainerDark}>
                                <label>Emballage - aumieux </label>
                            </div>
                            <div className={styles.labelContainer}>
                                <label>Livraison : </label>
                                <ul>
                                    <li>7 rue Gustave Eiffel 91420 Morangis France</li>
                                </ul>
                            </div>
                            <div className={styles.labelContainerDark}>
                                <label>adresse facturation :  </label>
                                <ul>
                                    <li>7 rue Gustave Eiffel 91420 Morangis France</li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.middleLine}>
                            <div className={styles.Line}></div>
                        </div>
                        <div className={styles.rightSide}>
                            <p ><b style={{fontWeight : "900"}}>Description :</b> Reprise des element du devis version 1 et 2 en rajoutant les elements </p>
                            <p >
                                Cahier des charges complet de dev et documentation technique  Mise en place d un CRM et ERP 
                                relattion client et gestion Client devis commande facturation communication complet  
                                complet des realtion client Mail Tableau de bord et des satistiques Mise en place 
                                pour la gestion complet des reseaux sociaux Mise en place des outil Ia pourla 
                                redaction bibliotheque de photos et videos Integration de la gestion de l entreprise 
                                360Securisation des données  optimisation pour le portable pour la gestion
                            </p>
                            <label >Voir le cahier des charges avec le devis </label>
                            <h3 >Documents attachés</h3>
                            <div className="card">
                        <DataTable  paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="No customers found." style={{borderRadius : "10px" ,border: "1px solid #e1e1e1",overflow: "hidden"}}>
                            <Column header="Document" style={{ minWidth: '2rem' ,textAlign:'center' ,fontSize : "12px" , color :"#ABA7A7"}} />
                            <Column header="Desvription" field="product" style={{ minWidth: '2rem' ,textAlign:'center',fontSize : "12px" , color :"#ABA7A7"}} />
                            <Column header="Type" field="quotetitle" style={{textAlign:'center' ,whiteSpace: 'nowrap',overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '400px',fontSize : "12px" , color :"#ABA7A7"}} />
                            <Column header="Emetteur"  style={{ minWidth: '10rem' ,textAlign:'center',fontSize : "12px" , color :"#ABA7A7"}} />
                            <Column header="Datte" dataType="date" style={{ minWidth: '10rem', textAlign:'center',fontSize : "12px" , color :"#ABA7A7"}} />
                            <Column header="Actions" bodyClassName="text-center" style={{ minWidth: '8rem',fontSize : "12px" , color :"#ABA7A7" }}  />
                        </DataTable>
                        <DataTable  paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="No customers found." style={{borderRadius : "10px" ,border: "1px solid #e1e1e1",overflow: "hidden", marginTop : "10px"}}>
                            <Column header="Quantités" style={{ minWidth: '2rem' ,textAlign:'center',fontSize : "12px" , color :"#ABA7A7"}} />
                            <Column header="Prix" field="product" style={{ minWidth: '2rem' ,textAlign:'center',fontSize : "12px" , color :"#ABA7A7"}} />
                            <Column header="Actions" bodyClassName="text-center" style={{ minWidth: '8rem' ,fontSize : "12px" , color :"#ABA7A7"}}  />
                        </DataTable>
                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
