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
import LayoutTopbar from "@/components/common/LayoutTopbar";


const ProductPage = () => {
    const Url = process.env.NEXT_PUBLIC_API_URL;
    const Url_IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL;

    const router = useRouter();
    const { id } = router.query;
    const [selectedCode, setSelectedCode] = useState(null);
    const [selectedType, setSelectedType] = useState(null);

    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState([]);
    const [quantite, setQuantite] = useState([]);
    const [hdCodeTg, setHdCodeTg] = useState([]);
    const [paramFormat, setParamFormat] = useState([]);
    const [paramImpr, setParamImpr] = useState([]);
    const [paramPaper, setParamPaper] = useState([]);
    const [paramPack, setParamPack] = useState([]);
    const [paramTrans, setParamTrans] = useState([]);
    const [nbModeles, setNbModeles] = useState([]);
    const [fichierPAO, setFichierPAO] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState(null);
    const [nodes, setNodes] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const TG_TYPE_GROUP = [
        {
            "name": "ELEMENT",
            "code": "ELEMENT"
        },
        {
            "name": "GLOBAL",
            "code": "GLOBAL"
        },
    ]

    const [state, setState] = useState({
        TG_CODE: '',
        TG_CODE_RAPID: '',
        TG_VALUE: '',
        TG_TYPE_GROUP: '',
        TG_REQUIREDTXTFIELD: false,
        TG_LABELTXTFIELD: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };    

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                const [productRes, catalogueRes, quantiteRes, packRes, transRes, nbModeles , fichierPAO, formatRes, imprRes, paperRes, hdCodeTg] = await Promise.all([
                    axios.get(`${Url}/product/myhd/${id}`),
                    axios.get(`${Url}/famille/hierarchy/${id}`),
                    axios.get(`${Url}/product_action/${id}/0`),
                    axios.get(`${Url}/product_action/${id}/2`),
                    axios.get(`${Url}/product_action/${id}/5`),
                    axios.get(`${Url}/product_action/${id}/4`),
                    axios.get(`${Url}/product_action/${id}/13`),
                    axios.get(`${Url}/sdt_action/${id}/1`),
                    axios.get(`${Url}/sdt_action/${id}/2`),
                    axios.get(`${Url}/sdt_papers_element/${id}/2`),
                    axios.get(`${Url}/hdcodetg`),
                ]);
        
                // Set state with fetched data
                setProduct(productRes.data["data"]);
                setNodes(formatCatalogueToTreeNodes(catalogueRes.data["data"]['original']));
                setQuantite(quantiteRes.data["data"]);
                setParamPack(packRes.data["data"]);
                setParamTrans(transRes.data["data"]);
                setNbModeles(nbModeles.data["data"]);
                setFichierPAO(fichierPAO.data["data"]);
                setParamFormat(formatRes.data["data"]);
                setParamImpr(imprRes.data["data"]);
                setParamPaper(paperRes.data["data"]);
                setHdCodeTg(hdCodeTg.data["data"]);
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

        const {TG_CODE, TG_CODE_RAPID, TG_VALUE, TG_TYPE_GROUP, TG_REQUIREDTXTFIELD, TG_LABELTXTFIELD} = state;
        const formData = new FormData();
        formData.append('TG_CODE', TG_CODE);
        formData.append('TG_CODE_RAPID', TG_CODE_RAPID);
        formData.append('TG_VALUE', TG_VALUE);
        formData.append('TG_TYPE_GROUP', TG_TYPE_GROUP);
        formData.append('TG_REQUIREDTXTFIELD', TG_REQUIREDTXTFIELD ? 'true' : 'false');
        formData.append('TG_LABELTXTFIELD', TG_LABELTXTFIELD);

        if (!TG_CODE_RAPID || !TG_VALUE || !TG_LABELTXTFIELD) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        try {
            const response = await axios.post(`${Url}/addtg`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.status === 200) {
                setState({
                    TG_CODE: '',
                    TG_CODE_RAPID: '',
                    TG_VALUE: '',
                    TG_TYPE_GROUP: '',
                    TG_REQUIREDTXTFIELD: false,
                    TG_LABELTXTFIELD: '',
                });
                setShowModal(false);
            } else {
                console.log('Error submitting form:', response.data);
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }

        setState({
            TG_CODE: '',
            TG_CODE_RAPID: '',
            TG_VALUE: '',
            TG_TYPE_GROUP: '',
            TG_REQUIREDTXTFIELD: false,
            TG_LABELTXTFIELD: '',
        });
    
        setShowModal(false);
    };

    return (
        <div>
           <LayoutTopbar />

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
                                                <div className="card" style={{margin:"15px 0"}}>
                                                    <div className={styles.headerContainer} style={{margin:"15px 0"}}>
                                                        <div>
                                                            <h2>Qunatités : </h2>
                                                        </div>
                                                        <button className={styles.plusButton} id="plusButton" type="submit" onClick={() => setShowModal(true)} >+</button>
                                                    </div>
                                                    <DataTable value={quantite} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucun qunatités  trouvé.">
                                                        <Column header="Quantité" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Actions" bodyClassName="text-center" style={{ maxWidth: '80px' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                    </DataTable>
                                                </div>
                                                <div className="card" style={{margin:"15px 0"}}>
                                                    <div className={styles.headerContainer} style={{margin:"15px 0"}}>
                                                        <div>
                                                            <h2>Nb modèles : </h2>
                                                        </div>
                                                        <button className={styles.plusButton} id="plusButton" type="submit" onClick={() => setShowModal(true)} >+</button>
                                                    </div>
                                                    <DataTable value={nbModeles} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucun modèles trouvé.">
                                                        <Column header="Ordre" field="ordre" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Modèle" field="valeur" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Actions" bodyClassName="text-center" style={{ maxWidth: '80px' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                    </DataTable>
                                                </div>
                                                <div className="card" style={{margin:"15px 0"}}>
                                                    <div className={styles.headerContainer} style={{margin:"15px 0"}}>
                                                        <div>
                                                            <h2>Fichier PAO : </h2>
                                                        </div>
                                                        <button className={styles.plusButton} id="plusButton" type="submit" onClick={() => setShowModal(true)} >+</button>
                                                    </div>
                                                    <DataTable value={fichierPAO} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucune donnée disponible dans le tableau.">
                                                        <Column header="Ordre" field="ordre" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Type fichier" field="valeur" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
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
                                                    <DataTable value={paramFormat} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucune donnée disponible dans le tableau.">
                                                        <Column header="Ordre" field="ordre" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Format" field="valeur" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Actions" bodyClassName="text-center" style={{ maxWidth: '80px' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                    </DataTable>
                                                </div>
                                                <div className="card" style={{flex:"1 1 32%"}}>
                                                    <h3>Activer le groupe nombre de pages sur l'élement</h3>
                                                    <DataTable paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucune donnée disponible dans le tableau.">
                                                        <Column header="Ordre" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Modèle" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Actions" bodyClassName="text-center" style={{ maxWidth: '80px' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                    </DataTable>
                                                </div>
                                                <div className="card" style={{flex:"1 1 32%"}}>
                                                    <h3> Paramétrages des impressions :</h3>
                                                    <DataTable value={paramImpr} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucune donnée disponible dans le tableau.">
                                                        <Column header="Ordre" field="ordre" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Papier" field="valeur" style={{textAlign:'center' , maxWidth: '6rem',fontSize:'12px'}} />
                                                        <Column header="Actions" bodyClassName="text-center" style={{ maxWidth: '80px' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                    </DataTable>
                                                </div>
                                            </div>
                                            <div style={{display:"flex" , gap:"10px"}}>
                                                <div className="card" style={{flex:"1 1 32%"}}>
                                                    <h3> Paramétrages des papiers :</h3>
                                                    <DataTable value={paramPaper} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucune donnée disponible dans le tableau.">
                                                        <Column header="Ordre" field="order" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Papier" body={PaperBodyTemplate} style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Grammage" body={GrammageBodyTemplate} style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Actions" bodyClassName="text-center" style={{ maxWidth: '80px' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                    </DataTable>
                                                </div>
                                                <div className="card" style={{flex:"1 1 32%"}}>
                                                    <h3>Paramétrages des finitions :</h3>
                                                    <DataTable paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucune donnée disponible dans le tableau.">
                                                        <Column header="Ordre" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Modèle" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Actions" bodyClassName="text-center" style={{ maxWidth: '80px' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                    </DataTable>
                                                </div>
                                                <div className="card" style={{flex:"1 1 32%"}}>
                                                    <h3>Paramétrages des assemblages et façonnages :</h3>
                                                    <DataTable paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucune donnée disponible dans le tableau.">
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
                                                    <DataTable value={paramPack} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucune donnée disponible dans le tableau.">
                                                        <Column header="Ordre" field="ordre" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Type d'emballage" field="valeur" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Actions" bodyClassName="text-center" style={{ maxWidth: '80px' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                    </DataTable>
                                                </div>
                                                <div className="card" style={{flex:"1 1 44%"}}>
                                                    <h3>Assemblage et façonnage général </h3>
                                                    <DataTable paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucune donnée disponible dans le tableau.">
                                                        <Column header="Ordre" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Modèle" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Actions" bodyClassName="text-center" style={{ maxWidth: '80px' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                    </DataTable>
                                                </div>
                                            </div>
                                            <div style={{display:"flex" , gap:"10px"}}>
                                                <div className="card" style={{flex:"1 1 44%"}}>
                                                    <h3> Transport :</h3>
                                                    <DataTable value={paramTrans} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucune donnée disponible dans le tableau.">
                                                        <Column header="Ordre" field="ordre" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Type transport" field="valeur" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Actions" bodyClassName="text-center" style={{ maxWidth: '80px' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                    </DataTable>
                                                </div>
                                                <div className="card" style={{flex:"1 1 44%"}}>
                                                    <h3>Finition général :</h3>
                                                    <DataTable paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucune donnée disponible dans le tableau.">
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
                                <Dialog header={' Ajouter le groupe technique' } visible={showModal} className="custom-dialog" style={{ width: '50vw' }} modal onHide={() => setShowModal(false)}>
                                    <form onSubmit={handleOnSubmit} style={{width:"100%"}}>
                                        <div>
                                            <div className={styles.inputTextHolders}>
                                                <label>Code * :</label>
                                                <Dropdown  value={selectedCode} onChange={(e) => { setSelectedCode(e.value); setState((prevState) => ({ ...prevState, TG_CODE: e.value.code }));}}
                                                    options={hdCodeTg} optionLabel="code" placeholder="selectionner un code" className="w-full" />
                                            </div>
                                            <div className={styles.inputTextHolders}>
                                                <label>Code valeur * :</label>
                                                <input
                                                    type="text"
                                                    placeholder="Code valeur"
                                                    name="TG_CODE_RAPID"
                                                    value={state.TG_CODE_RAPID}
                                                    onChange={handleChange}
                                                    className={styles.inputFrom}
                                                />
                                            </div>
                                            <div className={styles.inputTextHolders}>
                                                <label>Valeur * :</label>
                                                <input
                                                    type="text"
                                                    placeholder="Valeur"
                                                    name="TG_VALUE"
                                                    value={state.TG_VALUE}
                                                    onChange={handleChange}
                                                    className={styles.inputFrom}
                                                />
                                            </div>
                                            <div className={styles.inputTextHolders}>
                                                <label>Type * :</label>
                                                <Dropdown value={selectedType} onChange={(e) => { setSelectedType(e.value); setState((prevState) => ({ ...prevState, TG_TYPE_GROUP: e.value.code }));}}
                                                    options={TG_TYPE_GROUP} optionLabel="code" placeholder="selectionner un type" className="w-full" />
                                            </div>
                                            <div style={{display:"flex" , gap:"10px"}}>
                                                <input
                                                    type="checkbox"
                                                    name="TG_REQUIREDTXTFIELD"
                                                    checked={state.TG_REQUIREDTXTFIELD}
                                                    onChange={handleChange}
                                                />
                                                <label>Afficher un champ supplimentaire</label>
                                            </div>
                                            <div className={styles.inputTextHolders}>
                                                <label>Libellé du champ supplimentaire :</label>
                                                <input
                                                    type="text"
                                                    placeholder="Libellé du champ supplimentaire"
                                                    name="TG_LABELTXTFIELD"
                                                    value={state.TG_LABELTXTFIELD}
                                                    onChange={handleChange}
                                                    className={styles.inputFrom}
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








