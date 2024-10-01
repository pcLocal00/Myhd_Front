import SidebarAdmin from "@/components/common/SidebarAdmin";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { MdClose, MdEdit } from "react-icons/md";
import stylesT from "../../../styles/components/TapBa.module.scss";
import styles from "../../../styles/AdminNewsForm.module.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import LayoutTopbar from "@/components/common/LayoutTopbar";


const NewsAdminPage = () => {

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const [state, setState] = useState({
        titre_news: '',
        sous_titre_news: '',
        description_news: '',
        IMAGE_NEWS: null,
    });

    const handleEditClick = (id) => {
        setSelectedId(id);
        setShowModalUpdate(true);

        const fetchUpdatedNews = async (id) => {
            setLoading(true);
            try {
                const response = await axios.get(`${Url}/news/${id}`);
                const data = response.data["data"];

                setState((prevState) => ({
                    ...prevState,
                    ...data,
                    IMAGE_NEWS: null,
                }));
            } catch (error) {
                console.error("Error fetching News:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUpdatedNews(id);
    };

    const handleFileChange = (e) => {
        console.log('log file ',e.target.files[0]);
        const file = e.target.files[0];
        
        setState((prevState) => ({
          ...prevState,
          IMAGE_NEWS: file,
        }));
    };

    const handleChange = (evt) => {
        const { name, value, type, checked } = evt.target;
        setState({ ...state, [name]: type === 'checkbox' ? checked : value,  });
    };

    const Url = process.env.NEXT_PUBLIC_API_URL;
    const Url_IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL_STORAGE;

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`${Url}/news`);
                setNews(response.data["data"]);
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [Url]);

    const handleOnSubmit = async (evt) => {
        evt.preventDefault();
        const { titre_news, sous_titre_news, description_news, IMAGE_NEWS } = state;
    
        if (!titre_news || !sous_titre_news || !description_news) {
            alert('Please fill all the required fields.');
            return;
        }
    
        const formData = new FormData();
        formData.append('titre_news', titre_news);
        formData.append('sous_titre_news', sous_titre_news);
        formData.append('description_news', description_news);
        
        console.log( 'IMAGE_NEWS LOG', IMAGE_NEWS)
        if (IMAGE_NEWS) {
            formData.append('image_news', IMAGE_NEWS);
        }

    
        try {
            const apiUrl = selectedId ? `${Url}/update/news/${selectedId}` : `${Url}/add/news`;

            const response = await axios.post(apiUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.status === 200) {
                setState({
                    titre_news: '',
                    sous_titre_news: '',
                    description_news: '',
                    IMAGE_NEWS: null,
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
    
        setState({
            titre_news: '',
            sous_titre_news: '',
            description_news: '',
            IMAGE_NEWS: null,
        });
    
        setShowModalAdd(false);
    };
        
    const reloadTables = async () => {
        
        try {
            const response = await axios.get(`${Url}/news`);
            setNews(response.data["data"]);
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
        const image = rowData.image ? `${Url_IMAGE}/${rowData.image}` : "/images/default.jpg";
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
                                    <h2>Mes News </h2>
                                    <h3>Raccourcis Vers La Prise d’Action</h3>
                                </div>
                                <button className={styles.plusButton} id="plusButton" type="submit" onClick={() => setShowModalAdd(true)} >+</button>
                            </div>
                            <div className="card">
                                <DataTable value={news} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucun nouvelles trouvé.">
                                    <Column header="Id" field="id" style={{textAlign:'center' ,whiteSpace: 'nowrap',overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px',fontSize:'12px'}} />
                                    <Column header="Entête " field="header" style={{textAlign:'center' ,whiteSpace: 'nowrap',overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px',fontSize:'12px'}} />
                                    <Column header="Sous-titre" field="subheader" style={{textAlign:'center' ,whiteSpace: 'nowrap',overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px',fontSize:'12px'}} />
                                    <Column header="Description" field="description" style={{textAlign:'center' ,whiteSpace: 'nowrap',overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px',fontSize:'12px'}} />
                                    <Column header="Image" body={imageBodyTemplate} style={{textAlign:'center' ,whiteSpace: 'nowrap',overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '130px',fontSize:'12px'}} />
                                    <Column header="Actions" bodyClassName="text-center" style={{ maxWidth: '80px' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                </DataTable>
                            </div>
                        </div>
                        {showModalAdd && (
                            <Dialog header={'Ajouter Nouvelle' } visible={showModalAdd} className="custom-dialog" style={{ width: '50vw' }} modal onHide={() => setShowModalAdd(false)}>
                                <form onSubmit={handleOnSubmit} style={{width:"100%"}}>
                                    <div>
                                        <div style={{display:"flex" ,justifyContent:"space-between" , gap:"10px"}}>
                                            <label>Entête * :</label>
                                            <input
                                                type="text"
                                                placeholder="Entête"
                                                name="titre_news"
                                                value={state.titre_news}
                                                onChange={handleChange}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div style={{display:"flex" ,justifyContent:"space-between" , gap:"10px"}}>
                                            <label>Sous-titre * :</label>
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
                                            <label>Description * :</label>
                                            <input
                                                type="text"
                                                placeholder="Description"
                                                name="description_news"
                                                value={state.description_news}
                                                onChange={handleChange}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div style={{display:"flex" ,justifyContent:"space-between" , gap:"10px" ,height: "40px"}}>
                                            <label>image :</label>
                                            <div className={styles.fileInputContainer}>
                                                <label htmlFor="upload" className={styles.customFileLabel}>
                                                    Choose File
                                                </label>
                                                <input
                                                    id="upload"
                                                    type="file"
                                                    accept=".jpg,.png"
                                                    name="IMG_PRODUCT"
                                                    onChange={handleFileChange}
                                                    className={styles.hiddenFileInput}
                                                />
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
                            <Dialog header={'Edition Nouvelle' } visible={showModalUpdate} className="custom-dialog" style={{ width: '50vw' }} modal onHide={() => setShowModalUpdate(false)}>
                                <form onSubmit={handleOnSubmit} style={{width:"100%"}}>
                                    <div>
                                        <div style={{display:"flex" ,justifyContent:"space-between" , gap:"10px"}}>
                                            <label>Entête * :</label>
                                            <input
                                                type="text"
                                                placeholder="Entête"
                                                name="titre_news"
                                                value={state.titre_news}
                                                onChange={handleChange}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div style={{display:"flex" ,justifyContent:"space-between" , gap:"10px"}}>
                                            <label>Sous-titre * :</label>
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
                                            <label>Description * :</label>
                                            <input
                                                type="text"
                                                placeholder="Description"
                                                name="description_news"
                                                value={state.description_news}
                                                onChange={handleChange}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div style={{display:"flex" ,justifyContent:"space-between" , gap:"10px" ,height: "40px"}}>
                                            <label>image :</label>
                                            <div className={styles.fileInputContainer}>
                                                <label htmlFor="upload" className={styles.customFileLabel}>
                                                    Choose File
                                                </label>
                                                <input
                                                    id="upload"
                                                    type="file"
                                                    accept=".jpg,.png"
                                                    name="IMG_PRODUCT"
                                                    onChange={handleFileChange}
                                                    className={styles.hiddenFileInput}
                                                />
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
export default NewsAdminPage;