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
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from 'primereact/dropdown';


const ProductPage = () => {
    const Url = process.env.NEXT_PUBLIC_API_URL;
    const Url_IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL;

    const router = useRouter();
    const { id } = router.query;
    const [selectedCity, setSelectedCity] = useState(null);

    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState([]);
    const [quantite, setQuantite] = useState([]);
    const [hdcodetg, setHdcodetg] = useState([]);
    const [paramFormat, setParamFormat] = useState([]);
    const [paramImpr, setParamImpr] = useState([]);
    const [paramPaper, setParamPaper] = useState([]);
    const [paramPack, setParamPack] = useState([]);
    const [paramTrans, setParamTransk] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState(null);
    const [nodes, setNodes] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [state, setState] = useState({
        titre_news: '',
        sous_titre_news: '',
        description_news: '',
        IMG_PRODUCT: null,
    });

    const handleChange = (evt) => {
        const { name, value, type, checked } = evt.target;
        setState({ ...state, [name]: type === 'checkbox' ? checked : value,  });
    };

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                const [productRes, catalogueRes, quantiteRes, formatRes, imprRes, paperRes, packRes, transRes,hdcodetg] = await Promise.all([
                    axios.get(`${Url}/product/myhd/${id}`),
                    axios.get(`${Url}/famille/hierarchy/${id}`),
                    axios.get(`${Url}/product_action/${id}/0`),
                    axios.get(`${Url}/sdt_action/${id}/1`),
                    axios.get(`${Url}/sdt_action/${id}/2`),
                    axios.get(`${Url}/sdt_papers_element/${id}/2`),
                    axios.get(`${Url}/product_action/${id}/2`),
                    axios.get(`${Url}/product_action/${id}/5`),
                    axios.get(`${Url}/hdcodetg`),
                ]);
        
                // Set state with fetched data
                setProduct(productRes.data["data"]);
                setNodes(formatCatalogueToTreeNodes(catalogueRes.data["data"]['original']));
                setQuantite(quantiteRes.data["data"]);
                setParamFormat(formatRes.data["data"]);
                setParamImpr(imprRes.data["data"]);
                setParamPaper(paperRes.data["data"]);
                setParamPack(packRes.data["data"]);
                setParamTransk(transRes.data["data"]);
                setHdcodetg(hdcodetg.data["data"]);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
    
        if (id) {
          fetchAllData();
        }

    }, [Url, id]);

    
    const image = product.imagePathProduct ? `${Url_IMAGE}/${product.imagePathProduct}` : "/images/default.jpg";

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

    const PaperBodyTemplate = (rowData) =>{
        return(
            <div>
                <label>{rowData.paper.cfam_paper} - {rowData.paper.lfam_paper} - {rowData.paper.color_paper} - {rowData.paper.rapid_paper} </label>
            </div>
        );
    }

    const GrammageBodyTemplate = (rowData) =>{
        return(
            <div>
                <label>{rowData.paper.grammage} </label>
            </div>
        );
    }


    const formatCatalogueToTreeNodes = (catalogueData) => {
        return catalogueData.map(item => ({
            key: item.id.toString(),
            label: item.name,
            children: (item.children || []).map(child => ({
                key: `${item.id}-${child.id}`,
                label: child.name,
                children: (child.children || []).map(grand_c => ({
                    key: `${item.id}-${child.id}-${grand_c.id}`,
                    label: grand_c.name,
                    children: (grand_c.children || []).map(grand_g => ({
                        key: `${item.id}-${child.id}-${grand_c.id}-${grand_g.id}`,
                        label: grand_g.name,
                        children: (grand_g.children || []).map(grand_g_g => ({
                            key: `${item.id}-${child.id}-${grand_c.id}-${grand_g.id}-${grand_g_g.id}`,
                            label: grand_g_g.name,
                            children: (grand_g_g.children || []).map(grand_g_g_g => ({
                                key: `${item.id}-${child.id}-${grand_c.id}-${grand_g.id}-${grand_g_g.id}-${grand_g_g_g.id}`,
                                label: grand_g_g_g.name,
                                children: (grand_g_g_g.children || []).map(grand_g_g_g_g => ({
                                    key: `${item.id}-${child.id}-${grand_c.id}-${grand_g.id}-${grand_g_g.id}-${grand_g_g_g.id}-${grand_g_g_g_g.id}`,
                                    label: grand_g_g_g_g.name,
                                })),
                            })),
                        })),
                    })),
                })),
            })),
        }));
    };
    const handleOnSubmit = async (evt) => {
        evt.preventDefault();
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
                                                        <label>{product.nameProduct}</label>
                                                    </div>
                                                    <div className={styles.labelContainer}>
                                                        <label>Délai:</label>
                                                        <label>{product.numOrderProduct}</label>
                                                    </div>
                                                    <div className={styles.labelContainerDark}>
                                                        <label>Description :</label>
                                                        <label>{product.descProduct}</label>
                                                    </div>
                                                    <div className={styles.labelContainer}>
                                                        <label>Prix Modèle :</label>
                                                        <label>{product.priceModel}</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.middleLine}>
                                                <div className={styles.Line}></div>
                                            </div>
                                            <div className={styles.rightSide}>
                                                <div className={styles.labelContainerDark}>
                                                    <label>Type de produit * :</label>
                                                    <label>{product.typeProduct}</label>
                                                </div>
                                                <div className={styles.labelContainerImage}>
                                                    <label>Image</label>
                                                    <Image
                                                        src={image}
                                                        alt={product.nameProduct}
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
                                                    <div className={styles.headerContainer}>
                                                        <div>
                                                            <h2>Qunatités : </h2>
                                                        </div>
                                                        <button className={styles.plusButton} id="plusButton" type="submit" onClick={() => setShowModal(true)} >+</button>
                                                    </div>
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
                                                    <DataTable value={paramFormat} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucun nouvelles trouvé.">
                                                        <Column header="Ordre" field="ordre" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Format" field="valeur" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
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
                                                    <DataTable value={paramImpr} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucun nouvelles trouvé.">
                                                        <Column header="Ordre" field="ordre" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Papier" field="valeur" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Actions" bodyClassName="text-center" style={{ maxWidth: '80px' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                    </DataTable>
                                                </div>
                                            </div>
                                            <div style={{display:"flex" , gap:"10px"}}>
                                                <div className="card" style={{flex:"1 1 32%"}}>
                                                    <h3> Paramétrages des papiers :</h3>
                                                    <DataTable value={paramPaper} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucun nouvelles trouvé.">
                                                        <Column header="Ordre" field="order" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Papier" body={PaperBodyTemplate} style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Grammage" body={GrammageBodyTemplate} style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
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
                                                    <DataTable value={paramPack} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucun nouvelles trouvé.">
                                                        <Column header="Ordre" field="ordre" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Type d'emballage" field="valeur" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
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
                                                    <DataTable value={paramTrans} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucun nouvelles trouvé.">
                                                        <Column header="Ordre" field="ordre" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Type transport" field="valeur" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
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
                            {showModal && (
                            <Dialog header={'Ajouter Nouvelle' } visible={showModal} className="custom-dialog" style={{ width: '50vw' }} modal onHide={() => setShowModal(false)}>
                                <form onSubmit={handleOnSubmit} style={{width:"100%"}}>
                                    <div>
                                        <div style={{display:"flex" ,justifyContent:"space-between" , gap:"10px"}}>
                                            <label>Code * :</label>
                                            <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={hdcodetg} optionLabel="name" 
                                                placeholder="Select a City" className="w-full md:w-14rem" />
                                        </div>
                                        <div style={{display:"flex" ,justifyContent:"space-between" , gap:"10px"}}>
                                            <label>Code valeur (CODE RAPIDE) * :</label>
                                            <input
                                                type="text"
                                                placeholder="Sous-titre"
                                                name="sous_titre_news"
                                                value={state.sous_titre_news}
                                                onChange={handleChange}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div style={{display:"flex" ,justifyContent:"space-between" , gap:"10px"}}>
                                            <label>Valeur * :</label>
                                            <input
                                                type="text"
                                                placeholder="Description"
                                                name="description_news"
                                                value={state.description_news}
                                                onChange={handleChange}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div style={{display:"flex" ,justifyContent:"space-between" , gap:"10px"}}>
                                            <label>Type * :</label>
                                            <input
                                                type="text"
                                                placeholder="Description"
                                                name="description_news"
                                                value={state.description_news}
                                                onChange={handleChange}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div style={{display:"flex" ,justifyContent:"space-between" , gap:"10px"}}>
                                            <label>Afficher un champ supplimentaire</label>
                                            <input
                                                type="text"
                                                placeholder="Description"
                                                name="description_news"
                                                value={state.description_news}
                                                onChange={handleChange}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div style={{display:"flex" ,justifyContent:"space-between" , gap:"10px"}}>
                                            <label>Libellé du champ supplimentaire :</label>
                                            <input
                                                type="text"
                                                placeholder="Description"
                                                name="description_news"
                                                value={state.description_news}
                                                onChange={handleChange}
                                                className={styles.input}
                                            />
                                        </div>

                                    </div>
                                    <div style={{display:"flex" ,justifyContent:"flex-end" ,marginTop:"10px"}}>
                                        <Button type="submit" label="Confirm" severity="success" icon="pi pi-check" style={{marginRight:"10px"}}/>
                                        <Button onClick={() => setShowModal(false)} label="Close" severity="danger" icon="pi pi-times" />
                                    </div>
                                </form>
                            </Dialog>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminRoute(ProductPage);








