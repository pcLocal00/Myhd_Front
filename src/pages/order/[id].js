/* eslint-disable react/no-unescaped-entities */
import Header from "@/components/common/Header";
import RightSideBar from "@/components/common/RightSideBar";
import Sidebar from "@/components/common/Sidebar";
import { useRouter } from "next/router";
import styles from "../../styles/OrderForm.module.css";
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { TabView, TabPanel } from "primereact/tabview";
import { BsFiletypePdf } from "react-icons/bs";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputSwitch } from 'primereact/inputswitch';
import axios from 'axios';


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
            const response = await axios.get(`${Url}/devis/${id}`);
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
            <div className={styles.mainContainerOrder}>
                <Header />
                <div className={styles.middleContainer}>
                    <h2>{id}</h2>
                    <h3>Raccourcis Vers La Prise d’Action</h3>
                    <TabView>
                        <TabPanel header="information">
                            <div className={styles.infoContainer}>
                                <div className={styles.leftSide}>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <div className={styles.labelContainerDark}>
                                            <label>Référence</label>
                                            <label>2022010155</label>
                                        </div>
                                        <div className={styles.labelContainer}>
                                            <label>Fournisseur</label>
                                            <label>imprimeri richter(00520)</label>
                                        </div>
                                        <div className={styles.labelContainerDark}>
                                            <label>Libellé</label>
                                            <label>Commande callebout // Préparation de colis et livraison</label>
                                        </div>
                                        <div className={styles.labelContainer}>
                                            <label>Types de Produits</label>
                                            <label>A4 350 g</label>
                                        </div>
                                        <div className={styles.labelContainerDark}>
                                            <label>Client</label>
                                            <label>Cemex (cb0214)</label>
                                        </div>
                                        <div className={styles.labelContainer}>
                                            <label>Date de Commande</label>
                                            <label>12-10-2024</label>
                                        </div>
                                        <div className={styles.labelContainerDark}>
                                            <label>Quantité De Commande</label>
                                            <label>2022010155</label>
                                        </div>
                                        <div className={styles.labelContainer}>
                                            <label>Prix Vaidé</label>
                                            <label className={styles.price}>2500 €</label>
                                        </div>
                                        <div className={styles.labelContainerDark}>
                                            <label>Date BAT</label>
                                            <div style={{ display: "flex", gap: "10px" ,justifyContent:"space-between" ,width:"60%"}}>
                                                <label>Envoyé le  17-02-2024 </label>
                                                <label>Validé le 18-02-2024 </label>
                                            </div>
                                        </div>
                                        <div className={styles.labelContainer}>
                                            <label>Date BAT</label>
                                            <label>Terminé </label>
                                        </div>
                                    </div>
                                    <div className={styles.JointesContainer}>
                                        <div style={{display: 'flex', flexDirection: 'column',alignItems: 'center'}} className={styles.JointfirstSection}>
                                            <h6>Piéce Jointes</h6>
                                            <div style={{ display: "flex", flexDirection: "column",justifyContent:"space-between",height:"100%", gap: "10px" }}>
                                                <label>PDF Devis</label>
                                                <label>PDF BAT</label>
                                                <label>PDF FACTURE</label>
                                            </div>
                                        </div>
                                        <div style={{display: 'flex', flexDirection: 'column',alignItems: 'center'}} className={styles.JointSecondeSection}>
                                            <h6>Validé par</h6>
                                            <div style={{ display: "flex", flexDirection: "column",justifyContent:"space-between",height:"100%", gap: "10px" }}>
                                                <label>Joly Alice</label>
                                                <label>Alenad Amelie</label>
                                                <label>Fournisseurs</label>
                                            </div>
                                        </div>
                                        <div style={{display: 'flex', flexDirection: 'column',alignItems: 'center'}} className={styles.JointThirdSection}>
                                            <h6>Télécharger</h6>
                                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                                <BsFiletypePdf className={styles.pdfIcon} />
                                                <BsFiletypePdf className={styles.pdfIcon} />
                                                <BsFiletypePdf className={styles.pdfIcon} />
                                            </div>

                                        </div>
                                        <div style={{display: 'flex', flexDirection: 'column',alignItems: 'center'}} className={styles.JointFourthSection}>
                                            <h6>Aperçu BAT</h6>
                                            <div>
                                                <Image
                                                    src="/images/Bat.png"
                                                    alt="Logo"
                                                    className={styles.logoImage}
                                                    width={160}
                                                    height={100}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                        <h6>Expédition</h6>
                                        <div style={{ display: "flex", gap: "10px" }}>
                                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                                <label>Délai Impératif</label>
                                                <label>Délai Expédition prévisionnelle</label>
                                                <label>Délai Expédition Réelle</label>
                                            </div>
                                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                                <label>Délai Souhaité après BAT</label>
                                                <label className={styles.date}>17-02-2024</label>
                                                <label className={styles.date}>17-02-2024</label>
                                            </div>
                                        </div>
                                    </div>
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
                                        <label>Types de Produits</label>
                                        <label>A4 350 g</label>
                                    </div>
                                    <div className={styles.labelContainerDark}>
                                        <label>Délai Souhaité</label>
                                        <label>2j</label>
                                    </div>
                                    <div className={styles.labelContainer}>
                                        <label>Description</label>
                                        <label>8,5  x 5,5</label>
                                    </div>
                                    <div className={styles.labelContainerDark}>
                                        <label>Prix validé</label>
                                        <label>158 €</label>
                                    </div>
                                    <div className={styles.labelContainer}>
                                        <label>Assemblage et Façonnage Général</label>
                                        <label>-</label>
                                    </div>
                                    <div className={styles.labelContainerDark}>
                                        <label>Emballage</label>
                                        <label>à grouper </label>
                                    </div>
                                    <div className={styles.labelContainer}>
                                        <label>expedition</label>
                                        <label>Adresse du client </label>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel header="Documents Attachés">
                            <div className="card">
                                <DataTable value={devis} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="No customers found.">
                                    <Column header="Noms du projets" style={{ minWidth: '2rem' ,textAlign:'center'}} />
                                    <Column header="Type" style={{ minWidth: '2rem' ,textAlign:'center'}} />
                                    <Column header="Date de Création" dataType="date" style={{ minWidth: '10rem', textAlign:'center'}} />
                                    <Column header="emetteur" field="status" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }}/>
                                    <Column header="Signé" style={{ minWidth: '2rem' ,textAlign:'center' }} />
                                    <Column header="Active frs" field="quotestatus" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '8rem' ,textAlign:'center'}} />
                                    <Column header="Acrtve Client" field="quotestatus" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '8rem' ,textAlign:'center'}} />
                                    <Column header="Actions" bodyClassName="text-center" style={{ minWidth: '8rem' }} />
                                </DataTable>
                            </div>
                        </TabPanel>
                        <TabPanel header="Adresses D’Expédition">

                            <div className="card">
                                <DataTable value={devis} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="No customers found.">
                                    <Column header="Adresse" style={{ minWidth: '2rem' ,textAlign:'center'}} />
                                    <Column header="Quantité" style={{ minWidth: '2rem' ,textAlign:'center'}} />
                                    <Column header="N°BL" dataType="date" style={{ minWidth: '10rem', textAlign:'center'}} />
                                    <Column header="Transporteur" field="status" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }}/>
                                    <Column header="Date prévisionnells" style={{ minWidth: '2rem' ,textAlign:'center' }} />
                                    <Column header="Etat" field="quotestatus" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '8rem' ,textAlign:'center'}} />
                                    <Column header="Actions BL" field="quotestatus" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '8rem' ,textAlign:'center'}} />
                                    <Column header="Actions" bodyClassName="text-center" style={{ minWidth: '8rem' }} />
                                </DataTable>
                            </div>
                        </TabPanel>
                        <TabPanel header="Commentaires">
                            <div className={styles.commentSection}>
                                <h4>Nouveau Commentaires</h4>
                                <textarea
                                    placeholder="Ajouter un nouveau commentaire"
                                    name="quantity"
                                    className={styles.inputComment}
                                />
                                <div style={{ display: "flex", gap: "10px" ,flexDirection:"column"}}>
                                    <div style={{width:"25%",display: "flex",justifyContent: "space-between",alignItems: "center"}}>
                                        <label>Partge commentaire avec Frs</label>
                                        <InputSwitch checked={checkedFrs} onChange={(e) => setCheckedFrs(e.value)} />
                                    </div>
                                    <div style={{width:"25%",display: "flex",justifyContent: "space-between",alignItems: "center"}}>
                                        <label>Partge commentaire avec Client</label>
                                        <InputSwitch checked={checkedClient} onChange={(e) => setCheckedClient(e.value)} />
                                    </div>        
                                </div>

                                <h4>Historique des commentaires</h4>
                                <div className="card">
                                    <DataTable value={devis} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="No customers found.">
                                        <Column header="Date" style={{ minWidth: '2rem' ,textAlign:'center'}} />
                                        <Column header="Label" style={{ minWidth: '2rem' ,textAlign:'center'}} />
                                        <Column header="Utilisateur" dataType="date" style={{ minWidth: '10rem', textAlign:'center'}} />
                                        <Column header="Destination" field="status" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }}/>
                                        <Column header="Actions" bodyClassName="text-center" style={{ minWidth: '8rem' }} />
                                    </DataTable>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel header="Historique">
                            <div className="card">
                                <DataTable value={devis} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="No customers found.">
                                    <Column header="Type d’événement" style={{ minWidth: '2rem' ,textAlign:'center'}} />
                                    <Column header="Date d’événement" style={{ minWidth: '2rem' ,textAlign:'center'}} />
                                    <Column header="Contenu" dataType="date" style={{ minWidth: '10rem', textAlign:'center'}} />
                                    <Column header="Utilisateur" field="status" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }}/>
                                </DataTable>
                            </div>
                        </TabPanel>
                    </TabView>
                </div>
            </div>
            <RightSideBar />
        </div>
    );
};

export default OrderPage;
