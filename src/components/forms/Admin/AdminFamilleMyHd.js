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
import { MdClose, MdSearch, MdEdit } from "react-icons/md";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import LayoutTopbar from "@/components/common/LayoutTopbar";

const AdminFamillePage = () => {
    const [famille, setFamille] = useState([]);
    const [parent, setParent] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [selectedParent, setSelectedParent] = useState(null);
    const [selectedId, setSelectedId] = useState(null);

    const Url = process.env.NEXT_PUBLIC_API_URL;
    const Url_IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL;

    const [state, setState] = useState({
        NAME_FAMILY: "",
        NUMORDER_FAMILY: "",
        CODE_FAMILY: "",
        DELAI_FAMILY: "",
        SELECT_PARENT_FAMILY_1: "",
        DESC_FAMILY: "",
        ACTIVE_FAMILY: true,
        SHOW_IN_CATALOGUE_FAMILY: false,
        IMG_FAMILY: null,
    });

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                const [familleData, parentData] = await Promise.all([
                    axios.get(`${Url}/famille/myhd`),
                    axios.get(`${Url}/parent/famille`),
                ]);

                setFamille(familleData.data["data"]);
                setParent(parentData.data["data"]);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [Url]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setState((prevState) => ({
            ...prevState,
            IMG_FAMILY: file,
        }));
    };

    const handleChange = (evt) => {
        const { name, value, type, checked } = evt.target;
        setState({ ...state, [name]: type === "checkbox" ? checked : value });
    };

    const handleOnSubmit = async (evt) => {
        evt.preventDefault();

        
        const { NAME_FAMILY, NUMORDER_FAMILY, CODE_FAMILY, DELAI_FAMILY, ACTIVE_FAMILY, SHOW_IN_CATALOGUE_FAMILY, SELECT_PARENT_FAMILY_1, DESC_FAMILY, IMG_FAMILY} = state;

        if ( !NAME_FAMILY || !NUMORDER_FAMILY || !CODE_FAMILY || !DELAI_FAMILY || !DESC_FAMILY ) {
            alert("Please fill all the required fields.");
            return;
        }

        const formData = new FormData();
        formData.append("NAME_FAMILY", NAME_FAMILY);
        formData.append("NUMORDER_FAMILY", NUMORDER_FAMILY);
        formData.append("CODE_FAMILY", CODE_FAMILY);
        formData.append("DELAI_FAMILY", DELAI_FAMILY);
        formData.append("DESC_FAMILY", DESC_FAMILY);
        formData.append("SELECT_PARENT_FAMILY_1", SELECT_PARENT_FAMILY_1);
        formData.append("ACTIVE_FAMILY", ACTIVE_FAMILY ? 1 : 0);
        formData.append( "SHOW_IN_CATALOGUE_FAMILY", SHOW_IN_CATALOGUE_FAMILY ? 1 : 0 );

        if (IMG_FAMILY) {
            formData.append("IMG_FAMILY", IMG_FAMILY);
        }

        try {
            const apiUrl = selectedId
                ? `${Url}/update/famille/${selectedId}`
                : `${Url}/add/famille`;

            const response = await axios.post(apiUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                setState({
                    NAME_FAMILY: "",
                    NUMORDER_FAMILY: "",
                    CODE_FAMILY: "",
                    DELAI_FAMILY: "",
                    DESC_FAMILY: "",
                    SELECT_PARENT_FAMILY_1: "",
                    ACTIVE_FAMILY: true,
                    SHOW_IN_CATALOGUE_FAMILY: false,
                    IMG_FAMILY: null,
                });

                if (selectedId) {
                    setShowModalUpdate(false);
                    reloadTables();
                } else {
                    setShowModalAdd(false);
                    reloadTables();
                }
            } else {
                console.log("Error submitting form:", response.data);
            }
        } catch (error) {
            console.error("Error during form submission:", error);
        }
    };

    const reloadTables = async () => {
        
        try {
            const [familleData, parentData ] = await Promise.all([
                axios.get(`${Url}/famille/myhd`),
                axios.get(`${Url}/parent/famille`),
            ]);
    
            setFamille(familleData.data["data"]);
            setParent(parentData.data["data"]);
        } catch (error) {
            console.error('Error fetching quantite data:', error);
        }
    };

    const handleEditClick = (id) => {
        setSelectedId(id);
        setShowModalUpdate(true);

        const fetchUpdatedCatalogue = async (id) => {
            setLoading(true);
            try {
                const response = await axios.get(`${Url}/famille/myhd/${id}`);
                const data = response.data["data"];

                setState((prevState) => ({
                    ...prevState,
                    ...data,
                    IMG_FAMILY: null,
                }));
            } catch (error) {
                console.error("Error fetching catalogue:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUpdatedCatalogue(id);
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div>
                <MdEdit className={styles.checkButton} id="editButton" type="submit" onClick={() => handleEditClick(rowData.id)} />
                <MdClose className={styles.closeButton} />
            </div>
        );
    };

    const imageBodyTemplate = (rowData) => {
        const image = rowData.img
            ? `${Url_IMAGE}/${rowData.img}`
            : "/images/default.jpg";
        return <Image src={image} alt="Logo" width={160} height={100} />;
    };
    reloadTables();
    return (
        <div>
            <LayoutTopbar />
            <div className={styles.container}>
                <SidebarAdmin />
                <div style={{ display: "flex", flexDirection: "column", width: "81%" }}>
                    <div className={styles.mainContainerOrder}>
                        <div className={styles.middleContainer}>
                            <div className={styles.headerContainer}>
                                <div>
                                    <h2>Mes familles </h2>
                                    <h3>Raccourcis Vers La Prise d’Action</h3>
                                </div>
                                <button
                                    className={styles.plusButton}
                                    id="plusButton"
                                    type="submit"
                                    onClick={() => setShowModalAdd(true)}
                                >
                                    +
                                </button>
                            </div>
                            <div className="card">
                                <DataTable
                                    value={famille}
                                    paginator
                                    showGridlines
                                    rows={10}
                                    loading={loading}
                                    dataKey="id"
                                    emptyMessage="Aucun familles trouvé."
                                >
                                    <Column
                                        header="Image"
                                        body={imageBodyTemplate}
                                        style={{
                                            textAlign: "center",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            maxWidth: "300px",
                                            fontSize: "12px",
                                        }}
                                    />
                                    <Column
                                        header="Nom"
                                        field="name"
                                        style={{
                                            textAlign: "center",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            maxWidth: "300px",
                                            fontSize: "12px",
                                        }}
                                    />
                                    <Column
                                        header="Code"
                                        field="code"
                                        style={{
                                            textAlign: "center",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            maxWidth: "300px",
                                            fontSize: "12px",
                                        }}
                                    />
                                    <Column
                                        header="Parent"
                                        field="parent_name"
                                        style={{
                                            textAlign: "center",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            maxWidth: "300px",
                                            fontSize: "12px",
                                        }}
                                    />
                                    <Column
                                        header="Actions"
                                        bodyClassName="text-center"
                                        style={{
                                            minWidth: "8rem",
                                            fontSize: "12px",
                                            textAlign: "center",
                                        }}
                                        body={actionBodyTemplate}
                                    />
                                </DataTable>
                            </div>
                        </div>
                        {showModalAdd && (
                            <Dialog header={"Nouveau Famille"} visible={showModalAdd} className="custom-dialog" style={{ width: "50vw" }} modal onHide={() => setShowModalAdd(false)} >
                                <form onSubmit={handleOnSubmit} style={{ width: "100%" }}>
                                    <div style={{ display: "flex", gap: "50px" }}>
                                        <div>
                                            <input
                                                type="checkbox"
                                                name="ACTIVE_FAMILY"
                                                checked={state.isActive}
                                                onChange={handleChange}
                                            />
                                            <label>Activé</label>
                                        </div>
                                        <div>
                                            <input
                                                type="checkbox"
                                                name="SHOW_IN_CATALOGUE_FAMILY"
                                                checked={state.isShowInCatalogue}
                                                onChange={handleChange}
                                            />
                                            <label>Afficher dans le catalogue</label>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={styles.inputTextHolders}>
                                            <label> Nom :</label>
                                            <input
                                                type="text"
                                                placeholder="Nom Famille"
                                                name="NAME_FAMILY"
                                                value={state.NAME_FAMILY}
                                                onChange={handleChange}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div className={styles.inputTextHolders}>
                                            <label>Ordre d&apos;affichage:</label>
                                            <input
                                                type="text"
                                                placeholder="Ordre d'affichage"
                                                name="NUMORDER_FAMILY"
                                                value={state.NUMORDER_FAMILY}
                                                onChange={handleChange}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div className={styles.inputTextHolders}>
                                            <label>Code * :</label>
                                            <input
                                                type="text"
                                                placeholder="Code"
                                                name="CODE_FAMILY"
                                                value={state.CODE_FAMILY}
                                                onChange={handleChange}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div className={styles.inputTextHolders}>
                                            <label>Délai de livraison :</label>
                                            <input
                                                type="text"
                                                placeholder="Délai de livraison"
                                                name="DELAI_FAMILY"
                                                value={state.DELAI_FAMILY}
                                                onChange={handleChange}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div className={styles.inputTextHolders}>
                                            <label>Parent :</label>
                                            <Dropdown
                                                value={selectedParent}
                                                onChange={(e) => {
                                                    setSelectedParent(e.value);
                                                    setState((prevState) => ({
                                                        ...prevState,
                                                        idParent: e.value.id,
                                                    }));
                                                }}
                                                options={parent}
                                                optionLabel="name"
                                                placeholder="sélectionnez un parent"
                                                style={{ width: "80%" }}
                                            />
                                        </div>
                                        <div className={styles.inputTextHolders}>
                                            <label>Description :</label>
                                            <input
                                                type="text"
                                                placeholder="Description"
                                                name="DESC_FAMILY"
                                                value={state.DESC_FAMILY}
                                                onChange={handleChange}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                gap: "10px",
                                                height: "40px",
                                            }}
                                        >
                                            <label>image :</label>
                                            <div className={styles.fileInputContainer}>
                                                <input
                                                    id="upload"
                                                    type="file"
                                                    accept=".jpg,.png"
                                                    name="IMG_FAMILY"
                                                    onChange={handleFileChange}
                                                    className={styles.hiddenFileInput}
                                                />
                                                <label
                                                    htmlFor="upload"
                                                    className={styles.customFileLabel}
                                                >
                                                    Choose File
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px", }} >
                                        <Button type="submit" label="Confirm" severity="success" icon="pi pi-check" style={{ marginRight: "10px" }} />
                                        <Button onClick={() => setShowModalAdd(false)} label="Close" severity="danger" icon="pi pi-times" />
                                    </div>
                                </form>
                            </Dialog>
                        )}
                        {showModalUpdate && (
                            <Dialog header={"Edition Catalogue"} visible={showModalUpdate} className="custom-dialog" style={{ width: "50vw" }} modal onHide={() => setShowModalUpdate(false)}>
                                <form onSubmit={handleOnSubmit} style={{ width: "100%" }}>
                                    <div>
                                        <input type="hidden" name="id" value={selectedId} />
                                        <div className={styles.inputTextHolders}>
                                            <label> Nom :</label>
                                            <input
                                                type="text"
                                                placeholder="Nom Famille"
                                                name="NAME_FAMILY"
                                                value={state.NAME_FAMILY}
                                                onChange={handleChange}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div className={styles.inputTextHolders}>
                                            <label>Ordre d&apos;affichage:</label>
                                            <input
                                                type="text"
                                                placeholder="Ordre d'affichage"
                                                name="NUMORDER_FAMILY"
                                                value={state.NUMORDER_FAMILY}
                                                onChange={handleChange}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div className={styles.inputTextHolders}>
                                            <label>Code * :</label>
                                            <input
                                                type="text"
                                                placeholder="Code"
                                                name="CODE_FAMILY"
                                                value={state.CODE_FAMILY}
                                                onChange={handleChange}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div className={styles.inputTextHolders}>
                                            <label>Délai de livraison :</label>
                                            <input
                                                type="text"
                                                placeholder="Délai de livraison"
                                                name="DELAI_FAMILY"
                                                value={state.DELAI_FAMILY}
                                                onChange={handleChange}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div className={styles.inputTextHolders}>
                                            <label>Parent :</label>
                                            <Dropdown value={parent.find((item) => item.id === state.ID_PARENT) || null} onChange={(e) => { setSelectedParent(e.value); setState((prevState) => ({ ...prevState, idParent: e.value.id, })); }}
                                                options={parent} optionLabel="name" placeholder="sélectionnez un parent" style={{ width: "80%" }} />
                                        </div>
                                        <div className={styles.inputTextHolders}>
                                            <label>Description :</label>
                                            <input
                                                type="text"
                                                placeholder="Description"
                                                name="DESC_FAMILY"
                                                value={state.DESC_FAMILY}
                                                onChange={handleChange}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", height: "40px", }} >
                                            <label>image :</label>
                                            <div className={styles.fileInputContainer}>
                                                <input
                                                    id="upload"
                                                    type="file"
                                                    accept=".jpg,.png"
                                                    name="IMG_FAMILY"
                                                    onChange={handleFileChange}
                                                    className={styles.hiddenFileInput}
                                                />
                                                <label  htmlFor="upload" className={styles.customFileLabel} > Choose File </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{display: "flex",justifyContent: "flex-end",marginTop: "10px", }} >
                                        <Button type="submit" label="Confirm" severity="success" icon="pi pi-check" style={{ marginRight: "10px" }} />
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
};
export default AdminFamillePage;
