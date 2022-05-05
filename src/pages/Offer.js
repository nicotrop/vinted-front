import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Offer = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {}
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>
      <p>En cours de chargement....</p>
    </p>
  ) : (
    <div className="offer-body">
      <div className="container">
        <div className="offer-wrapper">
          <img src={data.product_image.secure_url} alt="" />
          <div className="offer-details-wrapper">
            <p>{data.product_price} €</p>
            {/* {descriptionTab(data.product_details)} */}
            {data.product_details.map((item, index) => {
              const keys = Object.keys(item);
              return (
                <div key={index} className="offer-details-list">
                  <span className="detail-name">{keys[0]}</span>
                  <span className="detail-desc">{item[keys[0]]}</span>
                </div>
              );
            })}
            <p>{data.product_name}</p>
            <p>{data.product_description}</p>
            <img
              className="user-avatar"
              src={data.owner.account.avatar.secure_url}
              alt=""
            />
            <span>{data.owner.account.username}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
