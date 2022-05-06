import { Link } from "react-router-dom";
import "../sass/home.scss";
import Offer from "./Offer";

const Home = ({ offers }) => {
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

  // const sortData = (tab) => {
  //   const offers = tab.product_price.sort((a, b) => b - a);
  //   console.log(offers);
  // };

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
      <div>
        <div className="container">
          <div className="home-offers-wrapper">
            {/* {isChecked && sortData(offers)}; */}
            {offers.map((offer, index) => {
              return (
                <div key={offer._id} className="home-offers-card">
                  <div className="offer-card-userbox">
                    {offer.owner.account.avatar && (
                      <img
                        className="avatar"
                        src={offers[index].owner.account.avatar.secure_url}
                        alt="user-img"
                      />
                    )}
                    <p>{offer.owner.account.username}</p>
                  </div>
                  <Link to={`offer/${offer._id}`} element={<Offer />}>
                    <img
                      className="product-img"
                      src={offer.product_image.secure_url}
                      alt={offer.product_name}
                    />
                  </Link>
                  <p>{offer.product_price} €</p>
                  <div className="offer-description">
                    <p>{orderDetails(offer.product_details)}</p>
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
