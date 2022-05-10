import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, Navigate } from "react-router-dom";

import "react-dropzone-uploader/dist/styles.css";
// import Dropzone from "react-dropzone-uploader";

const Publish = () => {
  //States
  const [title, setTitle] = useState("");
  const [picture, setImg] = useState(null);
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [exchange, setExchange] = useState(false);

  //token
  const token = Cookies.get("token");

  //load useNavigate
  const navigate = useNavigate();

  //handling submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("picture", picture);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("price", price);

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      console.log(response.data._id);
      if (response.data) {
        navigate(`/offer/${response.data._id}`);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return token ? (
    <div className="publish-wrapper">
      <form className="publish-form" onSubmit={handleSubmit}>
        <h2>Vends ton article</h2>
        <div className="img-upld-wrapper">
          <div className="img-upld-container">
            <label className="file-upload">
              <span style={{ fontSize: 30 }}>+</span>{" "}
              <span> Ajoute une photo</span>
              <input
                type="file"
                name="Photo upload"
                style={{ display: "none" }}
                onChange={(event) => {
                  setImg(event.target.files[0]);
                  console.log(event.target.files[0]);
                }}
              />
            </label>
          </div>
        </div>
        <div className="title-desc-wrapper">
          <div className="publish-details-row-1">
            <span>Titre</span>
            <input
              type="text"
              name="Title"
              value={title}
              placeholder="ex: Chemise Sézane verte"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div className="publish-details-row-2">
            <span>Décris ton article</span>
            <input
              type="text"
              name="Description"
              placeholder="ex: Porté deux fois"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="publish-wrapper-3">
          <div className="publish-details-box">
            <span>Marque</span>
            <input
              type="text"
              name="Brand"
              placeholder="ex: Zara"
              value={brand}
              onChange={(event) => {
                setBrand(event.target.value);
              }}
            />
          </div>
          <div className="publish-details-box">
            <span>Taille</span>
            <input
              type="text"
              name="Size"
              value={size}
              placeholder="ex: L / 40 / 12"
              onChange={(event) => {
                setSize(event.target.value);
              }}
            />
          </div>
          <div className="publish-details-box">
            <span>Couleur</span>
            <input
              type="text"
              name="Color"
              placeholder="ex: Fushia"
              value={color}
              onChange={(event) => {
                setColor(event.target.value);
              }}
            />
          </div>
          <div className="publish-details-box">
            <span>Etat</span>
            <input
              type="text"
              name="Condition"
              placeholder="Neuf avec étiquette"
              value={condition}
              onChange={(event) => {
                setCondition(event.target.value);
              }}
            />
          </div>
          <div className="publish-details-box">
            <span>Lieu</span>
            <input
              type="text"
              name="City"
              placeholder="ex: Paris"
              value={city}
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="publish-wrapper-4">
          <div className="publish-left-col">
            <span>Prix</span>
          </div>
          <div className="publish-right-col">
            <input
              type="text"
              name="Price"
              placeholder="0,00 €"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
            <div className="right-col-checkbox">
              <input
                type="checkbox"
                value={exchange}
                onChange={(event) => {
                  setExchange(event.target.checked);
                }}
              />
              <span>Je suis intéressé(e) par les échanges</span>
            </div>
          </div>
        </div>
        <div className="btn-div">
          <input className="blue-btn" type="submit" name="Publish offer" />
        </div>
      </form>
    </div>
  ) : (
    <Navigate to="/signin" />
  );
};

export default Publish;
