import React, { useState } from 'react';
import { DataTable, Column } from 'primereact/datatable';
import { MdCheck, MdClose, MdDelete } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import styles from './yourStyles.module.css';  // Adjust the path to your stylesheet

const ManageOptions = ({ idProduct }) => {
    const [data, setData] = useState({
        quantite: [],   // Your initial state for quantities
        nbModeles: [],  // Your initial state for models
        fichierPAO: []  // Your initial state for PAO files
    });
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);


    return (
        <div>
            <div className="card" style={{ margin: "15px 0" }}>
                <div className={styles.headerContainer} style={{ margin: "15px 0" }}>
                <div>
                    <h2>Quantités : </h2>
                </div>
                <button className={styles.plusButton} type="submit" onClick={() => setShowModal(true)}>+</button>
                </div>
                <DataTable value={data.quantite} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucun quantités trouvé.">
                <Column header="Quantité" field="valeur" style={{ textAlign: 'center', maxWidth: '300px', fontSize: '12px' }} />
                <Column header="Actions" bodyClassName="text-center" style={{ maxWidth: '80px', fontSize: '12px', textAlign: 'center' }} body={actionBodyTemplate} />
                </DataTable>
            </div>

            <div className="card" style={{ margin: "15px 0" }}>
                <div className={styles.headerContainer} style={{ margin: "15px 0" }}>
                <div>
                    <h2>Nb modèles : </h2>
                </div>
                <button className={styles.plusButton} type="submit" onClick={() => setShowModal(true)}>+</button>
                </div>
                <DataTable value={data.nbModeles} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucun modèles trouvé.">
                <Column header="Ordre" field="ordre" style={{ textAlign: 'center', maxWidth: '300px', fontSize: '12px' }} />
                <Column header="Modèle" field="valeur" style={{ textAlign: 'center', maxWidth: '300px', fontSize: '12px' }} />
                <Column header="Actions" bodyClassName="text-center" style={{ maxWidth: '80px', fontSize: '12px', textAlign: 'center' }} body={actionBodyTemplate} />
                </DataTable>
            </div>

            <div className="card" style={{ margin: "15px 0" }}>
                <div className={styles.headerContainer} style={{ margin: "15px 0" }}>
                <div>
                    <h2>Fichier PAO : </h2>
                </div>
                <button className={styles.plusButton} type="submit" onClick={() => setShowModal(true)}>+</button>
                </div>
                <DataTable value={data.fichierPAO} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="Aucune donnée disponible dans le tableau.">
                <Column header="Ordre" field="ordre" style={{ textAlign: 'center', maxWidth: '300px', fontSize: '12px' }} />
                <Column header="Type fichier" field="valeur" style={{ textAlign: 'center', maxWidth: '300px', fontSize: '12px' }} />
                <Column header="Actions" bodyClassName="text-center" style={{ minWidth: '92px', fontSize: '12px', textAlign: 'center' }} body={actionBodyTemplate} />
                </DataTable>
            </div>

            <ToastContainer />
        </div>
    );
};

export default ManageOptions;
