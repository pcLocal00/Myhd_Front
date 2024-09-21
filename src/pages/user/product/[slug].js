/* eslint-disable react/no-unescaped-entities */
import Header from "@/components/common/Header";
import RightSideBar from "@/components/common/RightSideBar";
import Sidebar from "@/components/common/Sidebar";
import { useRouter } from "next/router";
import styles from "../../../styles/PrintForm.module.css";
import Image from "next/image";
import { useState } from "react";
import "primereact/resources/themes/lara-light-cyan/theme.css";

const ProductPage = () => {
    const router = useRouter();
    const { slug } = router.query;
    const [state, setState] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const handleChange = (evt) => {
        const { name, value, type, checked } = evt.target;
        setState({
            ...state,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.mainContainer}>
                <Header />
                <div className={styles.middleContainer}>
                    <h2>{slug}</h2>
                    <h3>Nos Articles en Vedette</h3>
                    <div style={{ display: "flex" }}>
                        <div className={styles.imagesContainer}>
                            <Image src="/images/Visit-card-3.png"
                                alt="Visit Card"
                                width={147}
                                height={136}
                                className={styles.visitCard3}
                            />
                            <div className={styles.smallImagesContainer}>
                                <Image
                                    src="/images/books.png"
                                    alt="Book"
                                    width={147}
                                    height={136}
                                    className={styles.book}
                                />
                                <Image
                                    src="/images/books.png"
                                    alt="Book"
                                    width={147}
                                    height={136}
                                    className={styles.book}
                                />
                                <Image
                                    src="/images/books.png"
                                    alt="Book"
                                    width={147}
                                    height={136}
                                    className={styles.book}
                                />
                            </div>
                        </div>

                        <div className={styles.inputContainer}>
                            <div className={styles.inputWrapper}>
                                <label>Quantité *</label>
                                <input
                                    type="text"
                                    placeholder="Entrez la quantité"
                                    name="quantity"
                                    value={state.quantity}
                                    onChange={handleChange}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.inputWrapper}>
                                <label>Format*</label>
                                <input
                                    type="text"
                                    placeholder="Entrez le format"
                                    name="format"
                                    value={state.format}
                                    onChange={handleChange}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.inputWrapper}>
                                <label>Support*</label>
                                <input
                                    type="text"
                                    placeholder="Entrez le support"
                                    name="support"
                                    value={state.support}
                                    onChange={handleChange}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.inputWrapper}>
                                <label>Couleur d’impression*</label>
                                <input
                                    type="text"
                                    placeholder="Entrez la couleur d’impression"
                                    name="printColor"
                                    value={state.printColor}
                                    onChange={handleChange}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.inputWrapper}>
                                <label>Orientation *</label>
                                <input
                                    type="text"
                                    placeholder="Entrez l'orientation"
                                    name="orientation"
                                    value={state.orientation}
                                    onChange={handleChange}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.inputWrapper}>
                                <label>Face imprimée *</label>
                                <input
                                    type="text"
                                    placeholder="Entrez la face imprimée"
                                    name="printedFace"
                                    value={state.printedFace}
                                    onChange={handleChange}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.inputWrapper}>
                                <label>Pelliculage *</label>
                                <input
                                    type="text"
                                    placeholder="Entrez le pelliculage"
                                    name="lamination"
                                    value={state.lamination}
                                    onChange={handleChange}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.inputWrapper}>
                                <label>Coins *</label>
                                <input
                                    type="text"
                                    placeholder="Entrez le type de coins"
                                    name="corners"
                                    value={state.corners}
                                    onChange={handleChange}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.inputWrapper}>
                                <label>Découpe *</label>
                                <input
                                    type="text"
                                    placeholder="Entrez la découpe"
                                    name="cutting"
                                    value={state.cutting}
                                    onChange={handleChange}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.headerWrapper}>
                                <h6>Options</h6>
                            </div>
                            <div className={styles.checkWrapper}>
                                <div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            name="selectiveVarnish"
                                            checked={state.selectiveVarnish}
                                            onChange={handleChange}
                                        />
                                        <label>Vernis selectif</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            name="selectiveVarnish3D"
                                            checked={state.selectiveVarnish3D}
                                            onChange={handleChange}
                                        />
                                        <label>Dorure à chaud</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            name="scratchArea"
                                            checked={state.scratchArea}
                                            onChange={handleChange}
                                        />
                                        <label>Code barres unitaire</label>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            name="hotFoilStamping"
                                            checked={state.hotFoilStamping}
                                            onChange={handleChange}
                                        />
                                        <label>Vernis selectif 3d</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            name="embossing"
                                            checked={state.embossing}
                                            onChange={handleChange}
                                        />
                                        <label>Dorure à chaud</label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            name="embossing"
                                            checked={state.embossing}
                                            onChange={handleChange}
                                        />
                                        <label>Personnalisation unitaire</label>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            name="individualBarcode"
                                            checked={state.individualBarcode}
                                            onChange={handleChange}
                                        />
                                        <label>Zone de grattage </label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            name="personalization"
                                            checked={state.personalization}
                                            onChange={handleChange}
                                        />
                                        <label>Gaufrage </label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            name="personalization"
                                            checked={state.personalization}
                                            onChange={handleChange}
                                        />
                                        <label>NFX </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.footerContainer}>
                        <h5>Questions / Réponses</h5>

                        <div className={styles.questionsWrapper}>
                            <div className={styles.questionWrapper}>
                                <div className={styles.question}>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit ?</div>
                                        <div>+</div>
                                    </div>
                                </div>
                                <div className={styles.question}>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit ?</div>
                                        <div>+</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.questionWrapper}>
                                <div className={styles.question}>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit ?</div>
                                        <div>+</div>
                                    </div>
                                </div>
                                <div className={styles.question}>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit ?</div>
                                        <div>+</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h4>Pour aller un peu plus loin</h4>
                        <p>IMPRIMEZ UN FLYER DE COMMUNICATION PERCUTANT </p>
                        <p>Le flyer est un outil utilisé pour communiquer rapidement et à grande échelle. 
                            En effet, généralement il est imprimé par les professionnels pour donner une information au 
                            plus grand nombre. C'est pour cela qu'il est souvent distribué dans la rue ou déposé en libre 
                            service sur les comptoirs. Malgré son utilisation incessante, il est toujours autant regardé 
                            des destinataires. C'est pourquoi, celui de vos clients doit être original et attractif. 
                            Pour cela, nous vous proposons une impression personnalisée de haute qualité pour ces flyers.
                            Appelé également prospectus ou tract, il est un outil très prisé des entreprises et moderne. 
                            Qu'il soit informatif ou publicitaire, il donne une ligne moderne à la démarche de communication 
                            de vos prospects.
                        </p>
                    </div>
                </div>
            </div>
            <RightSideBar />
        </div>
    );
};

export default ProductPage;
