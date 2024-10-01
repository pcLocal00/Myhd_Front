import SidebarAdmin from "@/components/common/SidebarAdmin";
import Image from "next/image";
import Link from "next/link";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import styles from "../../../styles/AdminCatalogueForm.module.css";
import { useEffect, useState } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import axios from "axios";
import { MdEdit ,MdClose, MdSearch } from "react-icons/md";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import LayoutTopbar from "@/components/common/LayoutTopbar";


const CatalogueAdminPage = () => {
    const [catalogue, setCatalogue] = useState([]);
    const [updatedCatalogue, setUpdatedCatalogue] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [selectedParent, setSelectedParent] = useState(null);
    const [selectedTyAff, setSelectedTyAff] = useState(null);
    const [parent, setParent] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    const TYPE_AFFICHAGE = [
        { "id": "1", "name": "Menu" },
        { "id": "2", "name": "Choix" },
    ]

    const [state, setState] = useState({
        code_c: '', 
        name_c: '', 
        description_c: '', 
        orderShow_c: '', 
        typeShow_c: '', 
        isActive : true,
        isShowInCatalogue : false,
        isVisibleClient : false,
        isVisibleInterne : false,
        image_c: null, 
    });
    
    const handleEditClick = (id) => {
        setSelectedId(id);
        setShowModalUpdate(true);
    
        const fetchUpdatedCatalogue = async (id) => {
            setLoading(true);
            try {
                const response = await axios.get(`${Url}/catalogue/myhd/${id}`);
                const data = response.data["data"];
    
                setState((prevState) => ({
                    ...prevState,
                    ...data, 
                    image_c: null 
                }));
            } catch (error) {
                console.error('Error fetching catalogue:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchUpdatedCatalogue(id);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setState((prevState) => ({
          ...prevState,
          image_c: file,
        }));
    };

    const Url = process.env.NEXT_PUBLIC_API_URL;
    const Url_IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL;
	const Url_IMAGE_LOCAL = process.env.NEXT_PUBLIC_IMAGE_URL_STORAGE;

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                const [catalogueData, parentData ] = await Promise.all([
                    axios.get(`${Url}/catalogue/myhd`),
                    axios.get(`${Url}/parent/myhd`),
                ]);
        
                setCatalogue(catalogueData.data["data"]);
                setParent(parentData.data["data"]);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchAllData();

    }, [Url]);

    const handleChange = (evt) => {
        const { name, value, type, checked } = evt.target;
        setState({ ...state, [name]: type === 'checkbox' ? checked : value,  });
    };

    const handleOnSubmit = async (evt) => {
        evt.preventDefault();
    
        const {
            code_c, name_c, description_c, orderShow_c, typeShow_c, image_c, isActive,
            idParent, isShowInCatalogue, isVisibleClient, isVisibleInterne, id
        } = state;

        if (!code_c || !name_c || !description_c || !orderShow_c) {
            alert('Please fill all the required fields.');
            return;
        }
    
        const formData = new FormData();
        formData.append('code_c', code_c);
        formData.append('name_c', name_c);
        formData.append('description_c', description_c);
        formData.append('orderShow_c', orderShow_c);
        formData.append('typeShow_c', typeShow_c);
        formData.append('idParent', idParent);
        formData.append('isActive', isActive ? 1 : 0);
        formData.append('isShowInCatalogue', isShowInCatalogue ? 1 : 0);
        formData.append('isVisibleClient', isVisibleClient ? 1 : 0);
        formData.append('isVisibleInterne', isVisibleInterne ? 1 : 0);
    
        if (image_c) {
            formData.append('image_c', image_c);
        }
    
        try {

            const apiUrl = selectedId ? `${Url}/update/catalogue/${selectedId}` : `${Url}/add/catalogue`;
            
            const response = await axios.post(apiUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.status === 200) {
                setState({
                    code_c: '',
                    name_c: '',
                    description_c: '',
                    orderShow_c: '',
                    typeShow_c: '',
                    idParent: '',
                    isActive: true,
                    isShowInCatalogue: false,
                    isVisibleClient: false,
                    isVisibleInterne: false,
                    image_c: null,
                    id: null, 
                });
                
                if (selectedId) {
                    setShowModalUpdate(false);
                    reloadTables();
                } else {
                    setShowModalAdd(false);
                    reloadTables();
                }
            } else {
                console.log('Error submitting form:', response.data);
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };
    
    const reloadTables = async () => {
        
        try {
            const [catalogueData, parentData ] = await Promise.all([
                axios.get(`${Url}/catalogue/myhd`),
                axios.get(`${Url}/parent/myhd`),
            ]);
    
            setCatalogue(catalogueData.data["data"]);
            setParent(parentData.data["data"]);
        } catch (error) {
            console.error('Error fetching quantite data:', error);
        }
    };

    const actionBodyTemplate = (rowData) =>{
        return(
            <div>
                <MdEdit className={styles.checkButton} id="editButton" type="submit" onClick={() => handleEditClick(rowData.id)} />
                <MdClose className={styles.closeButton}/>
            </div>
        );
    }

    const imageBodyTemplate = (rowData) =>{

        const imageUrlBase = rowData.img && rowData.img.startsWith('catalogues') ? Url_IMAGE_LOCAL : Url_IMAGE;
        const image = rowData.img ? `${imageUrlBase}/${rowData.img}` : "/images/default.jpg";

        return( 
            <Image
                src={image}
                alt="Logo"
                width={160}
                height={100}
            />
        );
    }
    
    return (
        <div>
            <LayoutTopbar />
            <div className={styles.container}>
                <SidebarAdmin />
                <div style={{display:"flex",flexDirection:"column", width:"81%"}}>
                    <div className={styles.mainContainerOrder}>
                        <div className={styles.middleContainer}>
                            <div className={styles.headerContainer}>
                                <div>
                                    <h2>Mes catalogues </h2>
                                    <h3>Raccourcis Vers La Prise d’Action</h3>
                                </div>
                                <button className={styles.plusButton} id="plusButton" type="submit" onClick={() => setShowModalAdd(true)} >+</button>
                            </div>
                            <div className="card">
                                <DataTable value={catalogue} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucun catalogues trouvé.">
                                    <Column header="Image" body={imageBodyTemplate} style={{textAlign:'center' ,whiteSpace: 'nowrap',overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px',fontSize:'12px'}} />
                                    <Column header="Nom" field="name" style={{textAlign:'center' ,whiteSpace: 'nowrap',overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px',fontSize:'12px'}} />
                                    <Column header="Parent" field="parent_name" style={{textAlign:'center' ,whiteSpace: 'nowrap',overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px',fontSize:'12px'}} />
                                    <Column header="Actions" bodyClassName="text-center" style={{ minWidth: '8rem' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                </DataTable>
                            </div>
                        </div>
                        {showModalAdd && (
                            <Dialog header={'Nouveau Catalogue' } visible={showModalAdd} className="custom-dialog" style={{ width: '50vw' }} modal onHide={() => setShowModalAdd(false)}>
                                <form onSubmit={handleOnSubmit} style={{width:"100%"}}>
                                    <div style={{display:"flex",justifyContent:"space-between"}}>
                                        <div>
                                            <input type="checkbox" name="isActive" checked={state.isActive} onChange={handleChange} />
                                            <label>Activé</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" name="isShowInCatalogue" checked={state.isShowInCatalogue} onChange={handleChange} />
                                            <label>Afficher dans le catalogue</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" name="isVisibleClient" checked={state.isVisibleClient} onChange={handleChange} />
                                            <label>Visible pour clients</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" name="isVisibleInterne" checked={state.isVisibleInterne} onChange={handleChange} />
                                            <label>Visible en interne</label>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={styles.inputTextHolders}>
                                            <label>Code * :</label>
                                            <input
                                                type="text"
                                                placeholder="Code"
                                                name="code_c"
                                                value={state.code_c}
                                                onChange={handleChange}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div className={styles.inputTextHolders}>
                                            <label> Nom catalogue * :</label>
                                            <input
                                                type="text"
                                                placeholder="Nom catalogue"
                                                name="name_c"
                                                value={state.name_c}
                                                onChange={handleChange}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div className={styles.inputTextHolders}>
                                            <label>Type affichage :</label>
                                            <Dropdown  value={selectedTyAff} onChange={(e) => { setSelectedTyAff(e.value); setState((prevState) => ({ ...prevState, typeShow_c: e.value.id }));}}
                                                options={TYPE_AFFICHAGE} optionLabel="name" placeholder="sélectionnez un Type d'affichage" style={{ width: '80%' }} />
                                        </div>
                                        <div className={styles.inputTextHolders}>
                                            <label>Ordre affichage * :</label>
                                            <input
                                                type="text"
                                                placeholder="Ordre affichage"
                                                name="orderShow_c"
                                                value={state.orderShow_c}
                                                onChange={handleChange}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div className={styles.inputTextHolders}>
                                            <label>Parent :</label>
                                            <Dropdown  value={selectedParent} onChange={(e) => { setSelectedParent(e.value); setState((prevState) => ({ ...prevState, idParent: e.value.id }));}}
                                                options={parent} optionLabel="name" placeholder="sélectionnez un parent" style={{ width: '80%' }} />
                                        </div>
                                        <div className={styles.inputTextHolders}>
                                            <label>Description :</label>
                                            <input
                                                type="text"
                                                placeholder="Description"
                                                name="description_c"
                                                value={state.description_c}
                                                onChange={handleChange}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div style={{display:"flex" ,justifyContent:"space-between" , gap:"10px" ,height: "40px"}}>
                                            <label>image :</label>
                                            <div className={styles.fileInputContainer}>
                                                <input
                                                    id="upload"
                                                    type="file"
                                                    accept=".jpg,.png"
                                                    name="image_c"
                                                    onChange={handleFileChange}
                                                    className={styles.hiddenFileInput}
                                                />
                                                <label htmlFor="upload" className={styles.customFileLabel}>
                                                    Choose File
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{display:"flex" ,justifyContent:"flex-end" ,marginTop:"10px"}}>
                                        <Button type="submit" label="Confirm" severity="success" icon="pi pi-check" style={{marginRight:"10px"}}/>
                                        <Button onClick={() => setShowModalAdd(false)} label="Close" severity="danger" icon="pi pi-times" />
                                    </div>
                                </form>
                            </Dialog>
                        )}
                        {showModalUpdate && (
                            <Dialog header={'Edition Catalogue' } visible={showModalUpdate} className="custom-dialog" style={{ width: '50vw' }} modal onHide={() => setShowModalUpdate(false)}>
                                <form onSubmit={handleOnSubmit} style={{width:"100%"}}>
                                    <div>
                                        <input type="hidden" name="id" value={selectedId} />
                                        <div className={styles.inputTextHolders}>
                                            <label>Code * :</label>
                                            <input
                                                type="text"
                                                placeholder="Code"
                                                name="code_c"
                                                value={state.code_c}
                                                onChange={handleChange}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div className={styles.inputTextHolders}>
                                            <label> Nom catalogue * :</label>
                                            <input
                                                type="text"
                                                placeholder="Nom catalogue"
                                                name="name_c"
                                                value={state.name_c}
                                                onChange={handleChange}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div className={styles.inputTextHolders}>
                                            <label>Type affichage :</label>
                                            <Dropdown value={TYPE_AFFICHAGE.find((item) => item.id === String(state.typeShow_c)) || null} onChange={(e) => { setSelectedTyAff(e.value); setState((prevState) => ({ ...prevState, typeShow_c: e.value.id }));}}
                                                options={TYPE_AFFICHAGE}  optionLabel="name" placeholder="sélectionnez un Type d'affichage" style={{ width: '80%' }} />
                                        </div>
                                        <div className={styles.inputTextHolders}>
                                            <label>Ordre affichage * :</label>
                                            <input
                                                type="text"
                                                placeholder="Ordre affichage"
                                                name="orderShow_c"
                                                value={state.orderShow_c}
                                                onChange={handleChange}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div className={styles.inputTextHolders}>
                                            <label>Parent :</label>
                                            <Dropdown value={parent.find((item) => item.id === state.idParent) || null}  onChange={(e) => { setSelectedParent(e.value); setState((prevState) => ({ ...prevState, idParent: e.value.id, })); }}
                                                options={parent}  optionLabel="name"  placeholder="sélectionnez un parent"  style={{ width: '80%' }} />
                                        </div>
                                        <div className={styles.inputTextHolders}>
                                            <label>Description :</label>
                                            <input
                                                type="text"
                                                placeholder="Description"
                                                name="description_c"
                                                value={state.description_c}
                                                onChange={handleChange}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div style={{display:"flex" ,justifyContent:"space-between" , gap:"10px" ,height: "40px"}}>
                                            <label>image :</label>
                                            <div className={styles.fileInputContainer}>
                                                <input
                                                    id="upload"
                                                    type="file"
                                                    accept=".jpg,.png"
                                                    name="image_c"
                                                    onChange={handleFileChange}
                                                    className={styles.hiddenFileInput}
                                                />
                                                <label htmlFor="upload" className={styles.customFileLabel}>
                                                    Choose File
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{display:"flex" ,justifyContent:"flex-end" ,marginTop:"10px"}}>
                                        <Button type="submit" label="Confirm" severity="success" icon="pi pi-check" style={{marginRight:"10px"}}/>
                                        <Button onClick={() => setShowModalUpdate(false)} label="Close" severity="danger" icon="pi pi-times" />
                                    </div>
                                </form>
                            </Dialog>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CatalogueAdminPage;
