/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import styles from "../../styles/OrderForm.module.css";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import axios from "axios";
import Link from "next/link";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { ImFilePicture } from "react-icons/im";
import { MdClose, MdCheck , MdSearch } from "react-icons/md";
import { Dialog } from "primereact/dialog";
import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';


const OrderForm = () => {
    const [loading, setLoading] = useState(false);
    const [job, setJob] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    
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

    const getSeverityStatus = (code) => {
        switch (code) {
            case 'WORK_IN_PROGRESS':
                return 'success';
            case 'DELIVERED_NOT_INVOICED':
                return 'default';
            case 'INVOICED':
                return 'danger';
            case 'DISPATCH':
                return 'warning';
            case 'PRE_IN_PROGRESS':
                return 'primary';
            case 'CANCELLED':
                return 'danger';
            default:
                return 'info';
        }
    };
    
    const statusBodyTemplate = (rowData) => {
        return (
            <Tag
                value={rowData.namestatus} 
                severity={getSeverityStatus(rowData.code)} 
                style={{ fontSize: "10px" }}
            />

        );
    };

    const quantityBodyTemplate = (rowData) => {
        return <Tag value={rowData.quantity} severity={getSeverity(rowData.quantity)} style={{fontSize:"10px"}} />;
    };

    const representativesItemTemplate = (rowData) => {
        return (
            <Link href={`${orderUrl}${rowData.idjob}`} passHref>
                <ImFilePicture className={styles.pictureIcon}/>
            </Link>
        );
    };

    const handleActionClick = (rowData, type) => {
        setModalType(type);
        setSelectedRow(rowData); 
        setShowModal(true); 
    };

    const handleConfirm = () => {
        if (modalType === 'accept') {
            console.log('Accept action for', selectedRow);
        } else {
            console.log('Cancel action for', selectedRow);
        }
        setShowModal(false);
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div>
                {(rowData.code === 'CANCELLED' || rowData.code === 'INVOICED') ? (
                    <Link href={`${orderUrl}${rowData.idjob}`} passHref>
                        <MdSearch className={styles.searchButton} style={{ width: "20px", height: "20px" }} />
                    </Link>
                ) : (
                    <>
                        <MdCheck className={styles.checkButton} style={{ width: "20px", height: "20px" }} onClick={() => handleActionClick(rowData, 'accept')}/>
                        <MdClose className={styles.closeButton} style={{ width: "20px", height: "20px" }} onClick={() => handleActionClick(rowData, 'cancel')}/>
                        <Link href={`${orderUrl}${rowData.idjob}`} passHref>
                            <MdSearch className={styles.searchButton} style={{ width: "20px", height: "20px" }} />
                        </Link>
                    </>
                )}
            </div>
        );
    };

    const verifiedBodyTemplate = (rowData) => {
        return rowData.statecode === "BAT_AEL" ? (
            <MdCheck className={styles.checkButton} style={{width: "20px", height: "20px"}}/>
        ) : (
            <MdClose className={styles.closeButton} style={{width: "20px", height: "20px"}}/>
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
                            
                            <Column header="Prévisu" body={representativesItemTemplate} style={{fontSize:'12px', minWidth: '2rem' ,textAlign:'center'}} />
                            <Column header="Libellé" field="title" style={{fontSize:'12px',textAlign:'center' ,whiteSpace: 'nowrap',overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px'}} />
                            <Column header="Type" field="product" style={{fontSize:'12px', minWidth: '8rem' ,textAlign:'center'}} />
                            <Column header="Ref Commandes"  field="jobnumber" style={{fontSize:'12px', minWidth: '8rem' ,textAlign:'center'}} />
                            <Column header="N° Devis" field="estimateNumber" style={{fontSize:'12px', width: '8rem' ,textAlign:'center'}}/>
                            <Column header="Quantité" body={quantityBodyTemplate} style={{fontSize:'12px', minWidth: '2rem' ,textAlign:'center' }} />
                            <Column header="Date Cmd" field="date" dataType="boolean" bodyClassName="text-center" style={{fontSize:'12px', minWidth: '6.5rem' ,textAlign:'center'}} />
                            <Column header="Etat BAT" body={verifiedBodyTemplate} bodyClassName="text-center" style={{fontSize:'12px', minWidth: '2rem' ,textAlign:'center'}}  />
                            <Column header="Date BAT" dataType="date" body={dateBodyTemplate} style={{fontSize:'12px', minWidth: '6.5rem', textAlign:'center'}} />
                            <Column header="Liv Provisoire" dataType="date" body={dateBodyTemplate} style={{fontSize:'12px', minWidth: '6.5rem', textAlign:'center'}} />
                            <Column header="Statu" body={statusBodyTemplate} bodyClassName="text-center" style={{fontSize:'12px', minWidth: '8rem' }} />
                            <Column header="Actions" bodyClassName="text-center" style={{fontSize:'12px', minWidth: '7rem', textAlign:'center'}} body={actionBodyTemplate} />
                        </DataTable>
                    </div>
                    {showModal && (
                        <Dialog header={modalType === 'accept' ? 'Confirm Acceptance' : 'Confirm Cancellation'}
                            visible={showModal}
                            className="custom-dialog"
                            style={{ width: '50vw' }}
                            modal
                            onHide={() => setShowModal(false)}>
                            <div>
                                <p>Are you sure you want to {modalType === 'accept' ? 'accept' : 'cancel'} this N°  {selectedRow.estimateNumber}?</p>
                            </div>
                            <div style={{display:"flex" ,justifyContent:"flex-end"}}>
                                <Button onClick={handleConfirm} label="Confirm" severity="success" icon="pi pi-check" style={{marginRight:"10px"}}/>
                                <Button onClick={() => setShowModal(false)} label="Close" severity="danger" icon="pi pi-times" />
                            </div>
                        </Dialog>
                    )}
                </div>
            </div>
        </div>
    );
};
export default OrderForm;
