import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Offer = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {}
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <>
      <p>En cours de chargement...</p>
    </>
  ) : (
    <div className="offer-body">
      <div className="container">
        <div className="offer-wrapper">
          <img
            className="offer-product-img"
            src={data.product_image.secure_url}
            alt=""
          />
          <div className="offer-details-wrapper">
            <div className="offer-details-row-1">
              <p className="offer-price">{data.product_price} €</p>
              <div className="offer-details-details">
                {data.product_details.map((item, index) => {
                  const keys = Object.keys(item);
                  return (
                    <li key={index} className="offer-details-list">
                      <span className="detail-name">{keys[0]}</span>
                      <span className="detail-desc">{item[keys[0]]}</span>
                    </li>
                  );
                })}
              </div>
              <div className="divider"></div>
            </div>
            <div className="offer-details-row-2">
              <p className="offer-name">{data.product_name}</p>
              <p className="offer-desc">{data.product_description}</p>
              <div className="offer-details-avatar">
                {data.owner.account.avatar && (
                  <img
                    className="user-avatar"
                    src={data.owner.account.avatar.secure_url}
                    alt=""
                  />
                )}

                <span>{data.owner.account.username}</span>
              </div>
            </div>
            <div className="offer-details-row-3">
              <Link
                to="/payment"
                state={{ price: data.product_price, name: data.product_name }}
              >
                <button className="blue-btn">Acheter</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
