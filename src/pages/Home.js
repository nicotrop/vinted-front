import { Link } from "react-router-dom";
import "../sass/home.scss";
import Offer from "./Offer";

const Home = ({ offers, page, setPage, limit }) => {
  const orderDetails = (tab) => {
    const result = [];
    for (let i = 0; i < tab.length; i++) {
      if (tab[i].TAILLE) {
        result.unshift(<p key={i}>{tab[i].TAILLE}</p>);
      } else if (tab[i].MARQUE) {
        result.push(<p key={i}>{tab[i].MARQUE}</p>);
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
            <Link to="publish">
              <button className="blue-btn">Commencer à vendre</button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className="container">
          <div className="home-offers-wrapper">
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
                    {orderDetails(offer.product_details)}
                  </div>
                </div>
              );
            })}
            <div className="page-controls">
              {page > 1 && (
                <button
                  onClick={() => {
                    setPage((prevState) => prevState - 1);
                    console.log(page);
                  }}
                >
                  previous page
                </button>
              )}
              {offers.length === limit && (
                <button
                  onClick={() => {
                    setPage((prevState) => prevState + 1);
                    console.log(page);
                    console.log(offers.length);
                  }}
                >
                  next page
                </button>
              )}
            </div>
          </div>
        </div>
        ;
      </div>
    </div>
  );
};

export default Home;
