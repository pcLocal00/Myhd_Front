import SidebarAdmin from "@/components/common/SidebarAdmin";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { MdClose, MdCheck , MdSearch } from "react-icons/md";
import stylesT from "../../../styles/components/TapBa.module.scss";
import styles from "../../../styles/AdminNewsForm.module.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";


const NewsAdminPage = () => {

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [state, setState] = useState({
        titre_news: '',
        sous_titre_news: '',
        description_news: '',
        IMG_PRODUCT: null,
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setState((prevState) => ({
          ...prevState,
          IMG_PRODUCT: file,
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
        const { titre_news, sous_titre_news, description_news, IMG_PRODUCT } = state;
    
        // Check for required fields
        if (!titre_news || !sous_titre_news || !description_news) {
            alert('Please fill all the required fields.');
            return;
        }
    
        const formData = new FormData();
        formData.append('titre_news', titre_news);
        formData.append('sous_titre_news', sous_titre_news);
        formData.append('description_news', description_news);
        
        // Append the image if available
        if (IMG_PRODUCT) {
            formData.append('image_news', IMG_PRODUCT);
        }
    
        try {
            const response = await axios.post(`${Url}/news`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.status === 200) {
                setState({
                    titre_news: '',
                    sous_titre_news: '',
                    description_news: '',
                    IMG_PRODUCT: null,
                });
                setShowModal(false);
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
            IMG_PRODUCT: null,
        });
    
        setShowModal(false);
    };
    

    const actionBodyTemplate = () =>{
        return(
            <div>
                <MdCheck className={styles.checkButton}/>
                <MdClose className={styles.closeButton}/>
                <MdSearch className={styles.searchButton}/>
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
                            <div className={styles.headerContainer}>
                                <div>
                                    <h2>Mes News </h2>
                                    <h3>Raccourcis Vers La Prise d’Action</h3>
                                </div>
                                <button className={styles.plusButton} id="plusButton" type="submit" onClick={() => setShowModal(true)} >+</button>
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
                        {showModal && (
                            <Dialog header={'Ajouter Nouvelle' } visible={showModal} className="custom-dialog" style={{ width: '50vw' }} modal onHide={() => setShowModal(false)}>
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
                                        <Button onClick={() => setShowModal(false)} label="Close" severity="danger" icon="pi pi-times" />
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