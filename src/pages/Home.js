import { Link } from "react-router-dom";
import "../sass/home.scss";
import Offer from "./Offer";

const Home = ({ offers }) => {
  console.log(offers);

  const orderDetails = (tab) => {
    const result = [];
    for (let i = 0; i < tab.length; i++) {
      if (tab[i].TAILLE) {
        result.unshift(<p>{tab[i].TAILLE}</p>);
      } else if (tab[i].MARQUE) {
        result.push(<p>{tab[i].MARQUE}</p>);
      }
    }
    return result;
  };

  return (
    <div>
      <div className="home-hero-img">
        <div className="container">
          <div className="home-hero-img-card">
            <span className="hero-img-text">
              Prêts à faire du tri dans vos placards ?
            </span>
            <button className="blue-btn">Commencer à vendre</button>
          </div>
        </div>
      </div>
      <p>Home</p>
      <div>
        <div className="container">
          <div className="home-offers-wrapper">
            {offers.map((offer, index) => {
              return (
                <div className="home-offers-card" key={offer._id}>
                  <p>{offer.owner.account.username}</p>
                  <Link
                    // to="offer"
                    to={`offer/${offer._id}`}
                    element={<Offer />}
                  >
                    <img
                      src={offer.product_image.secure_url}
                      alt={offer.product_name}
                    />
                  </Link>

                  <p>{offer.product_price} €</p>
                  <div className="offer-description">
                    {orderDetails(offer.product_details)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        ;
      </div>
    </div>
  );
};

export default Home;
