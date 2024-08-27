/* eslint-disable react/no-unescaped-entities */
import styles from "../../styles/PrintForm.module.css";
import Header from "../common/Header";
import RightSideBar from "../common/RightSideBar";
import Sidebar from "../common/Sidebar";
import Image from "next/image";
import { TabView, TabPanel } from "primereact/tabview";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Link from "next/link";

const PrintForm = () => {
  const productUrl = `/product/lorem-ipsum`;
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContainer}>
        <Header />
        <div className={styles.middleContainer}>
          <h2>Hd communication</h2>
          <h3>Nos Articles en Vedette</h3>

          <TabView>
            <TabPanel header="Carte visite">
              <div className={styles.visitCard}>
                <div className={styles.cardWrappers}>
                  <Link href={productUrl} passHref>
                    <div className={styles.cardWrapper}>
                      <div className={styles.wrapperlogoImage}>
                        <Image
                          src="/images/Visit-card-2.png"
                          alt="Logo"
                          className={styles.logoImage}
                          width={147}
                          height={136}
                        />
                      </div>
                      <div className={styles.detailsCardWrapper}>
                        <h4>Lorem ipsum dolor</h4>
                        <label>Lorem ipsum dolor sit amet, consectetur</label>
                        <span>des 39,00€ par 1000 ex</span>
                      </div>
                    </div>
                  </Link>
                  <div className={styles.cardWrapper}>
                    <div className={styles.wrapperlogoImage}>
                      <Image
                        src="/images/Visit-card-2.png"
                        alt="Logo"
                        className={styles.logoImage}
                        width={147}
                        height={136}
                      />
                    </div>
                    <div className={styles.detailsCardWrapper}>
                      <h4>Lorem ipsum dolor</h4>
                      <label>Lorem ipsum dolor sit amet, consectetur</label>
                      <span>des 39,00€ par 1000 ex</span>
                    </div>
                  </div>
                  <div className={styles.cardWrapper}>
                    <div className={styles.wrapperlogoImage}>
                      <Image
                        src="/images/Visit-card-2.png"
                        alt="Logo"
                        className={styles.logoImage}
                        width={147}
                        height={136}
                      />
                    </div>
                    <div className={styles.detailsCardWrapper}>
                      <h4>Lorem ipsum dolor</h4>
                      <label>Lorem ipsum dolor sit amet, consectetur</label>
                      <span>des 39,00€ par 1000 ex</span>
                    </div>
                  </div>
                </div>
                <h6>En savoir plus</h6>
                <p className="m-0">
                  Notre gamme de flyer personnalisé Pour répondre aux attentes
                  de vos clients, nous proposons une large gamme de flyer avec
                  des supports divers et variés. Nos nombreux supports
                  disponibles permettent de s'adapter à l'ensemble des besoins
                  de vos clients. En effet, nous imprimons sur des papiers
                  classiques tels qu'un support offset, couché brillant ou mat.
                  Mais nous imprimons également sur des papiers recyclés et
                  des papiers d'exception. Ainsi, notre large offre est
                  originale et luxueuse pour proposer à vos clients une
                  impression qualitative. Nos impressions sont réalisées en
                  quadri et donnent un aspect haut de gamme à la communication
                  de vos prospects. Le flyer l'outil idéal pour communiquer à
                  grande échelle Le flyer est un outil de communication apprécié
                  par les professionnels pour être distribué en masse. En effet,
                  ce support économique est idéal pour communiquer à grande
                  échelle et ainsi faire circuler massivement une information
                  sur une entreprise. Le flyer est donc un allié de taille lors
                  d’opération marketing tels que des soldes ou encore lors
                  d’actions de street marketing. Cet outil de communication peut
                  donc être distribué en main propre ou être déposé en libre
                  service sur les comptoirs. Il permet de rendre visible un
                  message et faire connaitre une marque auprès d’un grand nombre
                  de personne. Pour se démarquer de la concurrence, il est
                  essentiel de créer un support original et attractif. Lors de
                  la conception du flyer, il est donc important de veiller à la
                  réalisation d’un visuel original et à l’aspect créatif du
                  support. De plus, le choix du papier et du format jouent
                  également un rôle majeur pour attirer tous les regards vers le
                  flyer de vos clients. Nos supports classiques et recyclés pour
                  une communication responsable Nous proposons de nombreux
                  supports d’impressions avec, par exemple, la possibilité de
                  choisir entre des supports classiques ou recyclés. Parmi nos
                  papiers classiques, nous proposons entre autre un papier
                  90g/m² offset, 135g/m² couché brillant ou encore un
                  papier 350g/m² couché mat. Ainsi vos clients peuvent choisir
                  le support dont ils ont besoin avec des grammages et des
                  papiers différents. Concernant notre gamme de papier recyclé,
                  nous proposons trois types de grammages tels que le 130g/m²,
                  le 170g/m² et le 300g/m² imprimé sur un papier recyclé nature
                  offset. Pour une
                </p>
              </div>
            </TabPanel>
            <TabPanel header="Flyers">
              <p className="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
                modi.
              </p>
            </TabPanel>
            <TabPanel header="Ctalogua">
              <p className="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus.
              </p>
            </TabPanel>
            <TabPanel header="Steakers">
              <p className="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus.
              </p>
            </TabPanel>
            <TabPanel header="Carte visite">
              <p className="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus.
              </p>
            </TabPanel>
            <TabPanel header="Flyers">
              <p className="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus.
              </p>
            </TabPanel>
            <TabPanel header="Ctalogua">
              <p className="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus.
              </p>
            </TabPanel>
          </TabView>
        </div>
      </div>
      <RightSideBar />
    </div>
  );
};
export default PrintForm;
