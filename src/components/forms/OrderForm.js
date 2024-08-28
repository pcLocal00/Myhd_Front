/* eslint-disable react/no-unescaped-entities */
import styles from "../../styles/OrderForm.module.css";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { ImFilePicture } from "react-icons/im";
import { MdClose, MdCheck , MdSearch } from "react-icons/md";
import Link from "next/link";
import axios from "axios";

const OrderForm = () => {
    const [loading, setLoading] = useState(false);
    
    const [job, setJob] = useState([]);
    const orderUrl = `/order/`;

    const Url = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchJobs = async () => {
          try {
            const response = await axios.get(`${Url}/job`);
            setJob(response.data);
          } catch (error) {
            console.error('Error fetching jobs:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchJobs();
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
        return formatDate(rowData.expeditionprevuedate);
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.code} severity={getSeverity(rowData.code)} />;
    };

    const quantityBodyTemplate = (rowData) => {
        return <Tag value={rowData.quantity} severity={getSeverity(rowData.quantity)} />;
    };

    const representativesItemTemplate = (rowData) => {
        return (
            <Link href={`${orderUrl}${rowData.jobnumber}`} passHref>
                <ImFilePicture className={styles.pictureIcon}/>
            </Link>
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

    const verifiedBodyTemplate = (rowData) => {
        return rowData.statecode === "BAT_AEL" ? (
            <MdCheck className={styles.checkButton} />
        ) : (
            <MdClose className={styles.closeButton} />
        );
    };

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.mainContainer}>
                <Header />
                <div className={styles.middleContainer}>
                    <div className={styles.headerContainer}>
                        <div>
                            <h2>Mes Commandes en Cours</h2>
                            <h3>Raccourcis Vers La Prise d’Action</h3>
                        </div>
                        <button className={styles.plusButton} id="plusButton" type="submit">+</button>
                    </div>
                    <div className="card">
                        <DataTable value={job} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="No customers found.">
                            
                            <Column header="Prévisu" body={representativesItemTemplate} style={{ minWidth: '2rem' ,textAlign:'center'}} />

                            <Column header="Libellé" field="title" style={{textAlign:'center' ,whiteSpace: 'nowrap',overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '400px'}} />
                            <Column header="type" field="product" style={{ minWidth: '8rem' ,textAlign:'center'}} />
                            <Column header="Ref Commandes"  field="jobnumber" style={{ minWidth: '10rem' ,textAlign:'center'}} />
                            <Column header="N° Devis" field="estimateNumber" filterMenuStyle={{ width: '8rem' ,textAlign:'center'}}/>
                            <Column header="Quantité" body={quantityBodyTemplate} style={{ minWidth: '2rem' ,textAlign:'center' }} />
                            <Column header="Date Cmd" field="date" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '8rem' ,textAlign:'center'}} />
                            <Column header="Etat BAT" body={verifiedBodyTemplate} bodyClassName="text-center" style={{ minWidth: '2rem' ,textAlign:'center'}}  />
                            <Column header="Date BAT" dataType="date" body={dateBodyTemplate} style={{ minWidth: '8rem', textAlign:'center'}} />
                            <Column header="Liv Provisoire" dataType="date" body={dateBodyTemplate} style={{ minWidth: '8rem', textAlign:'center'}} />
                            <Column header="Statu" body={statusBodyTemplate} bodyClassName="text-center" style={{ minWidth: '8rem' }} />
                            <Column header="Actions" bodyClassName="text-center" style={{ minWidth: '8rem' }} body={actionBodyTemplate} />
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default OrderForm;
