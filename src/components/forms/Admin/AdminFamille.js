import SidebarAdmin from "@/components/common/SidebarAdmin";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import stylesT from "../../../styles/components/TapBa.module.scss";
import styles from "../../../styles/AdminFamilleForm.module.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import { MdClose, MdCheck , MdSearch } from "react-icons/md";
import { Tag } from "primereact/tag";

const AdminFamillePage = () => {
    const [AdminFamille, setAdminFamille] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const Url = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchAdminFamille = async () => {
          try {
            const response = await axios.get(`${Url}/famille`);
            console.log('famille data : ',response.data["data"]);
            setAdminFamille(response.data["data"]);
          } catch (error) {
            console.error('Error fetching famille:', error);
          } finally {
            setLoading(false);
          }
        };

        fetchAdminFamille();
    }, [Url]);

    const nombreProduitBodyTemplate = (rowData) =>{
        const nombre = rowData.product.length; 
        return <Tag value={nombre} severity={'info'} style={{fontSize:"10px"}} />;
    }
    
    const actionBodyTemplate = () =>{
        return(
            <div>
                <MdCheck className={styles.checkButton}/>
                <MdClose className={styles.closeButton}/>
                <Link href={`/`} passHref style={{ textDecoration: "none",color : "inherit", margin:"0 auto",cursor:"pointer" }} >
                    <MdSearch className={styles.searchButton}/>
                </Link>
            </div>
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
                                    <h2>Mes familles </h2>
                                    <h3>Raccourcis Vers La Prise d’Action</h3>
                                </div>
                                <button className={styles.plusButton} id="plusButton" type="submit" onClick={() => setShowModal(true)} >+</button>
                            </div>
                            <div className="card">
                                <DataTable value={AdminFamille} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucun familles trouvé.">
                                    <Column header="id" field="id" style={{textAlign:'center' ,whiteSpace: 'nowrap',overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px',fontSize:'12px'}} />
                                    <Column header="Titre" field="title" style={{textAlign:'center' ,whiteSpace: 'nowrap',overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px',fontSize:'12px'}} />
                                    <Column header="nomber de produit" body={nombreProduitBodyTemplate} style={{textAlign:'center' ,whiteSpace: 'nowrap',overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px',fontSize:'12px'}} />
                                    <Column header="Actions" bodyClassName="text-center" style={{ minWidth: '8rem' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate}/>
                                </DataTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AdminFamillePage;