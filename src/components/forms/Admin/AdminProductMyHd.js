import SidebarAdmin from "@/components/common/SidebarAdmin";
import Image from "next/image";
import Link from "next/link";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import stylesT from "../../../styles/components/TapBa.module.scss";
import styles from "../../../styles/AdminProductForm.module.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import { useEffect, useState } from "react";
import { MdClose, MdCheck , MdSearch } from "react-icons/md";
import axios from "axios";
import LayoutTopbar from "@/components/common/LayoutTopbar";

const ProduitAdminPage = () => {

    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const Url = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchDevis = async () => {
          try {
            const response = await axios.get(`${Url}/product/myhd`);
            setProduct(response.data["data"]);
          } catch (error) {
            console.error('Error fetching devis:', error);
          } finally {
            setLoading(false);
          }
        };

        fetchDevis();
    }, [Url]);
    
    const imageBodyTemplate = (rowData) =>{
        const image = rowData.imagePathProduct ? `https://my.havetdigital.fr/${rowData.imagePathProduct}` : "/images/default.jpg";
        
        return( 
            <Image
                src={image}
                alt="Logo"
                width={160}
                height={100}
            />
        );
    }

    const actionBodyTemplate = (rowData) =>{
        return(
            <div>
                <MdCheck className={styles.checkButton}/>
                <MdClose className={styles.closeButton}/>
                <Link href={`/admin/product/myhd/${rowData.id}`} passHref style={{ textDecoration: "none",color : "inherit" }}>
                    <MdSearch className={styles.searchButton}/>
                </Link>
            </div>
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
                                    <h2>Mes Produits </h2>
                                    <h3>Raccourcis Vers La Prise d’Action</h3>
                                </div>
                                <button className={styles.plusButton} id="plusButton" type="submit" onClick={() => setShowModal(true)} >+</button>
                            </div>
                            <div className="card">
                                <DataTable value={product} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucun produits trouvé." style={{textAlign:'center'}}>
                                    <Column header="Image" body={imageBodyTemplate} style={{textAlign:'center' ,whiteSpace: 'nowrap',overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px',fontSize:'12px'}} />
                                    <Column header="Nom" field="nameProduct" style={{textAlign:'center' ,whiteSpace: 'nowrap',overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px',fontSize:'12px'}} />
                                    <Column header="Code" field="codeProduct" style={{textAlign:'center' ,whiteSpace: 'nowrap',overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px',fontSize:'12px'}} />
                                    <Column header="Type" field="typeProduct" style={{textAlign:'center' ,whiteSpace: 'nowrap',overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px',fontSize:'12px'}} />
                                    <Column header="Famille" field="idFkFamily" style={{textAlign:'center' ,whiteSpace: 'nowrap',overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px',fontSize:'12px'}} />
                                    <Column header="Action" bodyClassName="text-center" style={{ minWidth: '8rem' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                </DataTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProduitAdminPage;