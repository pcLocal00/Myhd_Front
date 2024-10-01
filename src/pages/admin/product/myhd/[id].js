/* eslint-disable react/no-unescaped-entities */

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TabPanel, TabView } from "primereact/tabview";
import SidebarAdmin from "@/components/common/SidebarAdmin";
import styles from "../../../../styles/AdminProductForm.module.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { MdClose, MdCheck , MdDelete } from "react-icons/md";
import { Tree } from "primereact/tree";
import axios from "axios";
import AdminRoute from "@/components/AdminRoute";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from 'primereact/dropdown';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LayoutTopbar from "@/components/common/LayoutTopbar";

const ProductPage = () => {
    const Url = process.env.NEXT_PUBLIC_API_URL;
    const Url_IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL;
    const router = useRouter();
    const { id } = router.query;

    const [data, setData] = useState({
        product: {},
        quantite: [],
        paramFormat: [],
        paramImpr: [],
        paramPaper: [],
        paramPack: [],
        paramTrans: [],
        nbModeles: [],
        fichierPAO: [],
        hdCodeTg: [],
    });

    const [state, setState] = useState({
        TG_CODE: '',
        TG_CODE_RAPID: '',
        TG_VALUE: '',
        TG_TYPE_GROUP: '',
        TG_REQUIREDTXTFIELD: false,
        TG_LABELTXTFIELD: ''
    });

    const [nodes, setNodes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedCode, setSelectedCode] = useState(false);
    const [selectedType, setSelectedType] = useState(false);

    const [formState, setFormState] = useState({
        TG_CODE: '',
        TG_CODE_RAPID: '',
        TG_VALUE: '',
        TG_TYPE_GROUP: '',
        TG_REQUIREDTXTFIELD: false,
        TG_LABELTXTFIELD: '',
    });

    const TG_TYPE_GROUP = [
        { name: "ELEMENT", code: "ELEMENT" },
        { name: "GLOBAL", code: "GLOBAL" }
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };    

    useEffect(() => {
        if (!id) return;

        const fetchAllData = async () => {
            setLoading(true);
            try {
                const [productRes, catalogueRes, quantiteRes, packRes, transRes, nbModelesRes, fichierPAORes, formatRes, imprRes, paperRes, hdCodeTgRes] = await Promise.all([
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

                setData({
                    product: productRes.data["data"],
                    quantite: quantiteRes.data["data"],
                    paramFormat: formatRes.data["data"],
                    paramImpr: imprRes.data["data"],
                    paramPaper: paperRes.data["data"],
                    paramPack: packRes.data["data"],
                    paramTrans: transRes.data["data"],
                    nbModeles: nbModelesRes.data["data"],
                    fichierPAO: fichierPAORes.data["data"],
                    hdCodeTg: hdCodeTgRes.data["data"],
                });

                setNodes(formatCatalogueToTreeNodes(catalogueRes.data["data"]['original']));
                setSelectedKeys(getSelectedKeys(catalogueRes.data["data"]['original']));

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [Url, id]);

    const image = data.product.imagePathProduct ? `${Url_IMAGE}/${data.product.imagePathProduct}` : "/images/default.jpg";

    const reloadTableQtes = async () => {
        
        try {
            const quantiteRes = await axios.get(`${Url}/product_action/${id}/0`);
            setData((prevData) => ({
                ...prevData,
                quantite: quantiteRes.data["data"],
            }));
        } catch (error) {
            console.error('Error fetching quantite data:', error);
        }
    };
    const reloadTableNbModels = async () => {
        try {
            const nbModelesRes = await axios.get(`${Url}/product_action/${id}/4`);
            setData((prevData) => ({
                ...prevData,
                nbModeles: nbModelesRes.data["data"],
            }));
        } catch (error) {
            console.error('Error fetching quantite data:', error);
        }
    };
    const reloadTablePao = async () => {
        
        try {
            const fichierPAORes = await axios.get(`${Url}/product_action/${id}/13`);
            setData((prevData) => ({
                ...prevData,
                fichierPAO: fichierPAORes.data["data"],
            }));
        } catch (error) {
            console.error('Error fetching quantite data:', error);
        }
    };
    const reloadTablePackings = async () => {
        
        try {
            const packRes = await axios.get(`${Url}/product_action/${id}/2`);
            setData((prevData) => ({
                ...prevData,
                paramPack: packRes.data["data"],
            }));
        } catch (error) {
            console.error('Error fetching quantite data:', error);
        }
    };
    const reloadTableTransport = async () => {
        
        try {
            const transRes = await axios.get(`${Url}/product_action/${id}/5`);
            setData((prevData) => ({
                ...prevData,
                paramTrans: transRes.data["data"],
            }));
        } catch (error) {
            console.error('Error fetching quantite data:', error);
        }
    };
    const reloadTableFormatRes = async () => {
        
        try {
            const formatRes = await axios.get(`${Url}/sdt_action/${id}/1`);
            setData((prevData) => ({
                ...prevData,
                paramFormat: formatRes.data["data"],
            }));
        } catch (error) {
            console.error('Error fetching quantite data:', error);
        }
    };
    const reloadTableImprRes = async () => {
        
        try {
            const imprRes = await axios.get(`${Url}/sdt_action/${id}/2`);
            setData((prevData) => ({
                ...prevData,
                paramImpr: imprRes.data["data"],
            }));
        } catch (error) {
            console.error('Error fetching quantite data:', error);
        }
    };
    const reloadTablePaperRes = async () => {
        
        try {
            const paperRes = await axios.get(`${Url}/sdt_papers_element/${id}/5`);
            setData((prevData) => ({
                ...prevData,
                paramPaper: paperRes.data["data"],
            }));
        } catch (error) {
            console.error('Error fetching quantite data:', error);
        }
    };

    const handleAction = async (data_id, type, typeOptions) => {
        if (data_id > 0 && id > 0) {
            setLoading(true);

            try {
                const response = await axios.post(`${Url}/manage_actions`, {
                    ID_PRODUIT: id,
                    ID_LINE_TG: data_id,
                    TYPE_ACTION: type,
                    TYPE_OPTION: typeOptions
                }, {
                    headers: { 'Content-Type': 'application/json' }
                });
    
                const result = response.data;
    
                if (result.success) {
                    toast.success('Valeur mise à jour avec succès');
                    const numericTypeOptions = Number(typeOptions); 
                    console.log(numericTypeOptions);
                    switch (numericTypeOptions) {
                        case 0: 
                            await reloadTableQtes(); 
                            break;
                        case 2: 
                            await reloadTablePackings(); 
                            break;
                        case 4: 
                            await reloadTableNbModels(); 
                            break;  
                        case 5: 
                            await reloadTableTransport(); 
                            break;
                        case 13: 
                            await reloadTablePao(); 
                            break;
                        default: 
                            break;
                    }

                } else {
                    toast.error('Erreur');
                }
            } catch (error) {
                toast.error('Erreur de requête');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleElemnte = async (data_id, type, typeOptions) => {
        if (data_id > 0 && id > 0) {
            setLoading(true);

            try {
                const response = await axios.post(`${Url}/manage_element`, {
                    ID_PRODUIT: id,
                    ID_LINE_TG: data_id,
                    TYPE_ACTION: type,
                    TYPE_OPTION: typeOptions
                }, {
                    headers: { 'Content-Type': 'application/json' }
                });
    
                const result = response.data;
    
                if (result.success) {
                    toast.success('Valeur mise à jour avec succès');
                    const numericTypeOptions = Number(typeOptions); 
                    console.log(numericTypeOptions);
    
                    switch (numericTypeOptions) {
                        case 1: 
                            await reloadTableFormatRes(); 
                            break;
                        case 2: 
                            await reloadTableImprRes(); 
                            break;
                        default: 
                            break;
                    }
                } else {
                    toast.error('Erreur');
                }
            } catch (error) {
                toast.error('Erreur de requête');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleActionOptions = (data_id, actionType, type, category) => {
        console.log('this is the type option ',type);
        
        const handler = category == 'sdt' ? handleElemnte : handleAction;
        handler(data_id, actionType, type);
    };
    
    const handleDelete = (data_id) => {
        console.log(`Delete triggered for ID ${data_id}`);
    };
    
    const actionBodyTemplate = (rowData) => {
        let defaultAction = '';
        let requiredAction = '';
    
        if (rowData.default) {
            defaultAction = (
                <MdClose className={styles.closeButton} onClick={() => handleActionOptions(rowData.id, 'NOT_DEFAULT', rowData.type, rowData.category)} />
            );
        } else {
            defaultAction = (
                <MdCheck className={styles.checkButton} onClick={() => handleActionOptions(rowData.id, 'DEFAULT', rowData.type, rowData.category)} />
            );
        }
    
        if ([3, 12].includes(rowData.type)) {
            if (rowData.required) {
                requiredAction = (
                    <MdClose className={styles.closeButton} onClick={() => handleActionOptions(rowData.id, 'NOT_REQUIRED', rowData.type, rowData.category)} title="Mettre la valuer non obligatoire" />
                );
            } else {
                requiredAction = (
                    <MdCheck className={styles.checkButton} onClick={() => handleActionOptions(rowData.id, 'REQUIRED', rowData.type, rowData.category)} title="Choisir comme valeur obligatoire" />
                );
            }
        }
    
        return (
            <div>
                {defaultAction}
                {requiredAction}
                <MdDelete className={styles.deleteButton} onClick={() => handleDelete(rowData.id)} title="Supprimer" />
            </div>
        );
    };
    
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
        const formatNode = (node) => ({
            key: node.id.toString(),
            label: node.name,
            children: node.children ? node.children.map(formatNode) : [],
        });
    
        return catalogueData.map(formatNode);
    };

    const getSelectedKeys = (catalogueData) => {
        const selectedKeys = {};
    
        const findSelectedKeys = (node) => {
            if (node.selected) {
                selectedKeys[node.id] = { checked: true, partialChecked: false };
            }
            
            if (node.children) {
                node.children.forEach(findSelectedKeys);
            }
        };
    
        catalogueData.forEach(findSelectedKeys);
    
        return selectedKeys;
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
                                                        <label>{data.product.nameProduct}</label>
                                                    </div>
                                                    <div className={styles.labelContainer}>
                                                        <label>Délai:</label>
                                                        <label>{data.product.numOrderProduct}</label>
                                                    </div>
                                                    <div className={styles.labelContainerDark}>
                                                        <label>Description :</label>
                                                        <label>{data.product.descProduct}</label>
                                                    </div>
                                                    <div className={styles.labelContainer}>
                                                        <label>Prix Modèle :</label>
                                                        <label>{data.product.priceModel}</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.middleLine}>
                                                <div className={styles.Line}></div>
                                            </div>
                                            <div className={styles.rightSide}>
                                                <div className={styles.labelContainerDark}>
                                                    <label>Type de produit * :</label>
                                                    <label>{data.product.typeProduct}</label>
                                                </div>
                                                <div className={styles.labelContainerImage}>
                                                    <label>Image</label>
                                                    <Image
                                                        src={image}
                                                        alt={data.product.nameProduct}
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
                                                    <DataTable value={data.quantite} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucun qunatités  trouvé.">
                                                        <Column header="Quantité" field="valeur" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
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
                                                    <DataTable value={data.nbModeles} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucun modèles trouvé.">
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
                                                    <DataTable value={data.fichierPAO} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucune donnée disponible dans le tableau.">
                                                        <Column header="Ordre" field="ordre" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Type fichier" field="valeur" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Actions" bodyClassName="text-center" style={{ minWidth: '92px' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                    </DataTable>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel header=" Familles & Catalogues">
                                        <Tree value={nodes} selectionMode="checkbox" selectionKeys={selectedKeys} onSelectionChange={(e) => setSelectedKeys(e.value)} className="w-full md:w-30rem" />
                                    </TabPanel>
                                    <TabPanel header=" Paramétrage des éléments">
                                        <div className={styles.infoContainer}>
                                            <h3>Quantités & Nb modèles & PAO</h3>
                                            <div style={{display:"flex" , gap:"10px"}}>
                                                <div className="card" style={{flex:"1 1 32%"}}>
                                                    <div className={styles.headerContainer} style={{margin:"15px 0"}}>
                                                        <div>
                                                            <h2> Paramétrages des formats :</h2>
                                                        </div>
                                                        <button className={styles.plusButton} id="plusButton" type="submit" onClick={() => setShowModal(true)} >+</button>
                                                    </div>
                                                    <DataTable value={data.paramFormat} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucune donnée disponible dans le tableau.">
                                                        <Column header="Ordre" field="ordre" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Format" field="valeur" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Actions" bodyClassName="text-center" style={{ minWidth: '92px'  ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                    </DataTable>
                                                </div>
                                                <div className="card" style={{flex:"1 1 32%"}}>
                                                    <div className={styles.headerContainer} style={{margin:"15px 0"}}>
                                                        <div>
                                                            <h2>Activer le groupe nombre de pages sur l'élement</h2>
                                                        </div>
                                                        <button className={styles.plusButton} id="plusButton" type="submit" onClick={() => setShowModal(true)} >+</button>
                                                    </div>
                                                    <DataTable paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucune donnée disponible dans le tableau.">
                                                        <Column header="Ordre" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Modèle" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Actions" bodyClassName="text-center" style={{ minWidth: '92px'  ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                    </DataTable>
                                                </div>
                                                <div className="card" style={{flex:"1 1 32%"}}>
                                                    <div className={styles.headerContainer} style={{margin:"15px 0"}}>
                                                        <div>
                                                            <h2>Paramétrages des impressions :</h2>
                                                        </div>
                                                        <button className={styles.plusButton} id="plusButton" type="submit" onClick={() => setShowModal(true)} >+</button>
                                                    </div>
                                                    <DataTable value={data.paramImpr} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucune donnée disponible dans le tableau.">
                                                        <Column header="Ordre" field="ordre" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Papier" field="valeur" style={{textAlign:'center' , maxWidth: '6rem',fontSize:'12px'}} />
                                                        <Column header="Actions" bodyClassName="text-center" style={{ minWidth: '92px'  ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                    </DataTable>
                                                </div>
                                            </div>
                                            <div style={{display:"flex" , gap:"10px"}}>
                                                <div className="card" style={{flex:"1 1 32%"}}>
                                                    <div className={styles.headerContainer} style={{margin:"15px 0"}}>
                                                        <div>
                                                            <h2>Paramétrages des papiers :</h2>
                                                        </div>
                                                        <button className={styles.plusButton} id="plusButton" type="submit" onClick={() => setShowModal(true)} >+</button>
                                                    </div>
                                                    <DataTable value={data.paramPaper} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucune donnée disponible dans le tableau.">
                                                        <Column header="Ordre" field="order" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Papier" body={PaperBodyTemplate} style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Grammage" body={GrammageBodyTemplate} style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Actions" bodyClassName="text-center" style={{ minWidth: '92px' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                    </DataTable>
                                                </div>
                                                <div className="card" style={{flex:"1 1 32%"}}>
                                                    <div className={styles.headerContainer} style={{margin:"15px 0"}}>
                                                        <div>
                                                            <h2>Paramétrages des finitions :</h2>
                                                        </div>
                                                        <button className={styles.plusButton} id="plusButton" type="submit" onClick={() => setShowModal(true)} >+</button>
                                                    </div>
                                                    <DataTable paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucune donnée disponible dans le tableau.">
                                                        <Column header="Ordre" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Modèle" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Actions" bodyClassName="text-center" style={{ maxWidth: '80px' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                    </DataTable>
                                                </div>
                                                <div className="card" style={{flex:"1 1 32%"}}>
                                                    <div className={styles.headerContainer} style={{margin:"15px 0"}}>
                                                        <div>
                                                            <h2>Paramétrages des assemblages et façonnages :</h2>
                                                        </div>
                                                        <button className={styles.plusButton} id="plusButton" type="submit" onClick={() => setShowModal(true)} >+</button>
                                                    </div>
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
                                                    <div className={styles.headerContainer} style={{margin:"15px 0"}}>
                                                        <div>
                                                            <h2>Emballages :</h2>
                                                        </div>
                                                        <button className={styles.plusButton} id="plusButton" type="submit" onClick={() => setShowModal(true)} >+</button>
                                                    </div>
                                                    <DataTable value={data.paramPack} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucune donnée disponible dans le tableau.">
                                                        <Column header="Ordre" field="ordre" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Type d'emballage" field="valeur" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Actions" bodyClassName="text-center" style={{ maxWidth: '80px' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                    </DataTable>
                                                </div>
                                                <div className="card" style={{flex:"1 1 44%"}}>
                                                    <div className={styles.headerContainer} style={{margin:"15px 0"}}>
                                                        <div>
                                                            <h2>Assemblage et façonnage général :</h2>
                                                        </div>
                                                        <button className={styles.plusButton} id="plusButton" type="submit" onClick={() => setShowModal(true)} >+</button>
                                                    </div>
                                                    <DataTable paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucune donnée disponible dans le tableau.">
                                                        <Column header="Ordre" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Modèle" field="id" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Actions" bodyClassName="text-center" style={{ maxWidth: '80px' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                    </DataTable>
                                                </div>
                                            </div>
                                            <div style={{display:"flex" , gap:"10px"}}>
                                                <div className="card" style={{flex:"1 1 44%"}}>
                                                    <div className={styles.headerContainer} style={{margin:"15px 0"}}>
                                                        <div>
                                                            <h2>Transport :</h2>
                                                        </div>
                                                        <button className={styles.plusButton} id="plusButton" type="submit" onClick={() => setShowModal(true)} >+</button>
                                                    </div>
                                                    <DataTable value={data.paramTrans} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucune donnée disponible dans le tableau.">
                                                        <Column header="Ordre" field="ordre" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Type transport" field="valeur" style={{textAlign:'center' , maxWidth: '300px',fontSize:'12px'}} />
                                                        <Column header="Actions" bodyClassName="text-center" style={{ maxWidth: '80px' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                                    </DataTable>
                                                </div>
                                                <div className="card" style={{flex:"1 1 44%"}}>
                                                    <div className={styles.headerContainer} style={{margin:"15px 0"}}>
                                                        <div>
                                                            <h2>Finition général :</h2>
                                                        </div>
                                                        <button className={styles.plusButton} id="plusButton" type="submit" onClick={() => setShowModal(true)} >+</button>
                                                    </div>
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
                                                    options={data.hdCodeTg} optionLabel="code" placeholder="selectionner un code" className="w-full" />
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
            <ToastContainer />
        </div>
    );
};

export default AdminRoute(ProductPage);








