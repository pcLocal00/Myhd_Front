/* eslint-disable react/no-unescaped-entities */
import styles from "../../../styles/DevisForm.module.css";
import Header from "../../common/Header";
import Sidebar from "../../common/Sidebar";
import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { BsFiletypePdf } from "react-icons/bs";
import { MdClose, MdCheck , MdSearch } from "react-icons/md";
import axios from 'axios';
import Link from "next/link";

const DevisForm = () => {

    const [loading, setLoading] = useState(false);
    const [devis, setDevis] = useState([]);

    const Url = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchDevis = async () => {
          try {
            const response = await axios.get(`${Url}/devis`);
            setDevis(response.data);
          } catch (error) {
            console.error('Error fetching devis:', error);
          } finally {
            setLoading(false);
          }
        };

    fetchDevis();
    }, [Url]);
    

    const getSeverity = (status) => {
        switch (status) {
            case 'unqualified':
                return 'danger';

            case 'qualified':
                return 'success';

            case 'new':
                return 'info';

            case 'Annulé':
                return 'warning';

            case 'renewal':
                return null;
        }
    };

    const formatDate = (value) => {
        const date = (value instanceof Date) ? value : new Date(value);
    
        if (isNaN(date.getTime())) {
            return '';
        }
    
        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };
    
    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.datecreationquote);
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.quotestatus} severity={getSeverity(rowData.quotestatus)} />;
    };

    const durationBodyTemplate = (rowData) => {
        return <Tag value={rowData.delai} severity={'info'} />;
    };

    const quantityPriceBodyTemplate = (rowData) => {
        return(
            <div>
                Prix pour  
                <Tag value={rowData.quantity} />
                ex : 
                <Tag value={rowData.prixpropose} />
            </div>
        ); 
    };

    const numberDevisBodyTemplate = (rowData) => {
        return (
            <Link href={`/user/devis/${rowData.id}`} passHref>
                <Tag value={rowData.quotenumber} severity={'renewal'} />
            </Link>
        )
    };

    const representativesItemTemplate = () => {
        return (
            <BsFiletypePdf className={styles.pdfIcon}/>
        );
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

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.mainContainer}>
                <Header />
                <div className={styles.middleContainer}>
                    <div className={styles.headerContainer}>
                        <div>
                            <h2>Mes Devis en Cours</h2>
                            <h3>Raccourcis Vers La Prise d’Action</h3>
                        </div>
                        <button className={styles.plusButton} id="plusButton" type="submit">+</button>
                    </div>
                    <div className="card">
                        <DataTable value={devis} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="No customers found.">
                            <Column header="Prévisu" body={representativesItemTemplate} style={{ minWidth: '2rem' ,textAlign:'center',fontSize:'12px'}} />
                            <Column header="Type" field="product" style={{ minWidth: '2rem' ,textAlign:'center' ,fontSize:'12px'}} />
                            <Column header="Titre" field="quotetitle" style={{textAlign:'center' ,whiteSpace: 'nowrap',overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px',fontSize:'12px'}} />
                            <Column header="N° devis"  body={numberDevisBodyTemplate} style={{ minWidth: '8rem' ,textAlign:'center',fontSize:'12px'}} />
                            <Column header="Date de Création" dataType="date" body={dateBodyTemplate} style={{ minWidth: '6rem', textAlign:'center',fontSize:'12px'}} />
                            <Column header="Quantité-Prix" body={quantityPriceBodyTemplate} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem',fontSize:'12px'}}/>
                            <Column header="Délai(J)" body={durationBodyTemplate} style={{ minWidth: '2rem' ,textAlign:'center',fontSize:'12px'}} />
                            <Column header="État" field="quotestatus" dataType="boolean" body={statusBodyTemplate} bodyClassName="text-center" style={{ minWidth: '6rem' ,textAlign:'center',fontSize:'12px'}} />
                            <Column header="Actions" bodyClassName="text-center" style={{ minWidth: '8rem' ,fontSize:'12px',textAlign:'center'}} body={actionBodyTemplate} />
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DevisForm;
