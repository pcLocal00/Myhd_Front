/* eslint-disable react/no-unescaped-entities */

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TabPanel, TabView } from "primereact/tabview";
import SidebarAdmin from "@/components/common/SidebarAdmin";
import styles from "../../../../styles/AdminProductForm.module.css";
import stylesT from "../../../../styles/components/TapBa.module.scss";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { MdClose, MdCheck , MdSearch } from "react-icons/md";
import { Tree } from "primereact/tree";
import axios from "axios";
import AdminRoute from "@/components/AdminRoute";


const ProductPage = () => {
    const Url = process.env.NEXT_PUBLIC_API_URL;

    const router = useRouter();
    const { id } = router.query;

    const [loading, setLoading] = useState(false);
    const [quantite, setQuantite] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState(null);
    const [nodes, setNodes] = useState([]);


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

    const actionBodyTemplate = (rowData) =>{
        return(
            <div>
                <MdCheck className={styles.checkButton}/>
                <MdClose className={styles.closeButton}/>
                <Link href={`/admin/product/${rowData.id}`} passHref style={{ textDecoration: "none",color : "inherit" }}>
                    <MdSearch className={styles.searchButton}/>
                </Link>
            </div>
        );
    }

    useEffect(() => {
        const fetchCatalogue = async () => {
          try {
            const response = await axios.get(`${Url}/catalogue`);
            const formattedData = formatCatalogueToTreeNodes(response.data["data"]);
            setNodes(formattedData);
          } catch (error) {
            console.error('Error fetching catalogue:', error);
          } finally {
            setLoading(false);
          }
        };

        fetchCatalogue();
        const fetchQuantite = async () => {
          try {
            const response = await axios.get(`${Url}/product_action/${id}/0`);
            setQuantite(response.data["data"]);
          } catch (error) {
            console.error('Error fetching quantite:', error);
          } finally {
            setLoading(false);
          }
        };

        fetchQuantite();
    }, [Url, id]);

    const formatCatalogueToTreeNodes = (catalogueData) => {
        return catalogueData.map(item => ({
            key: item.id.toString(),
            label: item.title,
            children: item.famille.map(fam => ({
                key: `${item.id}-${fam.id}`,
                label: fam.title,
                children: fam.product ? fam.product.map(prod => ({
                    key: `${item.id}-${fam.id}-${prod.id}`,
                    label: prod.title,
                })) : []
            }))
        }));
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
                                        <div className={styles.infoContainerInfos}>
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
                                        <div className={styles.infoContainer}>
                                                <h3>Quantités & Nb modèles & PAO</h3>
                                                <div style={{display:"flex" ,flexDirection:"column"}}>
                                                    <div className="card">
                                                        <h3>unatités :</h3>
                                                        <DataTable value={quantite} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucun nouvelles trouvé.">
                                                            <Column header="Quantité" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                            <Column header="Actions" bodyClassName="text-center" style={{ maxWidth: '80px' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                        </DataTable>
                                                    </div>
                                                    <div className="card">
                                                        <h3>Nb modèles :</h3>
                                                        <DataTable paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucun nouvelles trouvé.">
                                                            <Column header="Ordre" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                            <Column header="Modèle" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                            <Column header="Actions" bodyClassName="text-center" style={{ maxWidth: '80px' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                        </DataTable>
                                                    </div>
                                                    <div className="card">
                                                        <h3>Fichier PAO :</h3>
                                                        <DataTable paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucun nouvelles trouvé.">
                                                            <Column header="Ordre" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                            <Column header="Type fichier" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                            <Column header="Actions" bodyClassName="text-center" style={{ maxWidth: '80px' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                        </DataTable>
                                                    </div>
                                                </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel header=" Familles & Catalogues">
                                        <Tree value={nodes} selectionMode="checkbox" selectionKeys={selectedKeys} onSelectionChange={(e) => setSelectedKeys(e.value)} 
                                            className="w-full md:w-30rem" />
                                    </TabPanel>
                                    <TabPanel header=" Paramétrage des éléments">
                                        <div className={styles.infoContainer}>
                                            <h3>Quantités & Nb modèles & PAO</h3>
                                            <div style={{display:"flex" , gap:"10px"}}>
                                                <div className="card" style={{flex:"1 1 32%"}}>
                                                    <h3> Paramétrages des formats :</h3>
                                                    <DataTable paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucun nouvelles trouvé.">
                                                        <Column header="Quantité" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Actions" bodyClassName="text-center" style={{ maxWidth: '80px' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                    </DataTable>
                                                </div>
                                                <div className="card" style={{flex:"1 1 32%"}}>
                                                    <h3>Activer le groupe nombre de pages sur l'élement</h3>
                                                    <DataTable paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucun nouvelles trouvé.">
                                                        <Column header="Ordre" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Modèle" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Actions" bodyClassName="text-center" style={{ maxWidth: '80px' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                    </DataTable>
                                                </div>
                                                <div className="card" style={{flex:"1 1 32%"}}>
                                                    <h3> Paramétrages des impressions :</h3>
                                                    <DataTable paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucun nouvelles trouvé.">
                                                        <Column header="Ordre" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Type fichier" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Actions" bodyClassName="text-center" style={{ maxWidth: '80px' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                    </DataTable>
                                                </div>
                                            </div>
                                            <div style={{display:"flex" , gap:"10px"}}>
                                                <div className="card" style={{flex:"1 1 32%"}}>
                                                    <h3> Paramétrages des papiers :</h3>
                                                    <DataTable paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucun nouvelles trouvé.">
                                                        <Column header="Quantité" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Actions" bodyClassName="text-center" style={{ maxWidth: '80px' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                    </DataTable>
                                                </div>
                                                <div className="card" style={{flex:"1 1 32%"}}>
                                                    <h3>Paramétrages des finitions :</h3>
                                                    <DataTable paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucun nouvelles trouvé.">
                                                        <Column header="Ordre" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Modèle" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Actions" bodyClassName="text-center" style={{ maxWidth: '80px' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                    </DataTable>
                                                </div>
                                                <div className="card" style={{flex:"1 1 32%"}}>
                                                    <h3>Paramétrages des assemblages et façonnages :</h3>
                                                    <DataTable paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucun nouvelles trouvé.">
                                                        <Column header="Ordre" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Type fichier" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Actions" bodyClassName="text-center" style={{ maxWidth: '80px' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                    </DataTable>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel header=" Paramétrage des emballages / Assemblages">
                                        <div className={styles.infoContainer}>
                                            <h3>Quantités & Nb modèles & PAO</h3>
                                            <div style={{display:"flex" , gap:"10px"}}>
                                                <div className="card" style={{flex:"1 1 44%"}}>
                                                    <h3> Emballages :</h3>
                                                    <DataTable paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucun nouvelles trouvé.">
                                                        <Column header="Quantité" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Actions" bodyClassName="text-center" style={{ maxWidth: '80px' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                    </DataTable>
                                                </div>
                                                <div className="card" style={{flex:"1 1 44%"}}>
                                                    <h3>Assemblage et façonnage général </h3>
                                                    <DataTable paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucun nouvelles trouvé.">
                                                        <Column header="Ordre" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Modèle" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Actions" bodyClassName="text-center" style={{ maxWidth: '80px' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                    </DataTable>
                                                </div>
                                            </div>
                                            <div style={{display:"flex" , gap:"10px"}}>
                                                <div className="card" style={{flex:"1 1 44%"}}>
                                                    <h3> Transport :</h3>
                                                    <DataTable paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucun nouvelles trouvé.">
                                                        <Column header="Quantité" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Actions" bodyClassName="text-center" style={{ maxWidth: '80px' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                    </DataTable>
                                                </div>
                                                <div className="card" style={{flex:"1 1 44%"}}>
                                                    <h3>Finition général :</h3>
                                                    <DataTable paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucun nouvelles trouvé.">
                                                        <Column header="Ordre" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Modèle" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Actions" bodyClassName="text-center" style={{ maxWidth: '80px' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                    </DataTable>
                                                </div>
                                            </div>
                                        </div>
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

export default AdminRoute(ProductPage);
