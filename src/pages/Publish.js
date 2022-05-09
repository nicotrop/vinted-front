import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "react-dropzone-uploader/dist/styles.css";
// import Dropzone from "react-dropzone-uploader";

const Publish = () => {
  //States
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);

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
      setIsLoading(false);
      if (response.data) {
        navigate(`/offer/${response.data._id}`);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return token ? (
    isLoading ? (
      <p>En chargement...</p>
    ) : (
      <div>
        <form className="publish-form" onSubmit={handleSubmit}>
          <input
            type="file"
            name="Photo upload"
            onChange={(event) => {
              setImg(event.target.files[0]);
              console.log(event.target.files[0]);
            }}
          />
          <span>Titre</span>
          <input
            type="text"
            name="Title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <span>Décris ton article</span>
          <input
            type="text"
            name="Description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
          <span>Marque</span>
          <input
            type="text"
            name="Brand"
            value={brand}
            onChange={(event) => {
              setBrand(event.target.value);
            }}
          />
          <span>Taille</span>
          <input
            type="text"
            name="Size"
            value={size}
            onChange={(event) => {
              setSize(event.target.value);
            }}
          />
          <span>Couleur</span>
          <input
            type="text"
            name="Color"
            value={color}
            onChange={(event) => {
              setColor(event.target.value);
            }}
          />
          <span>Etat</span>
          <input
            type="text"
            name="Condition"
            value={condition}
            onChange={(event) => {
              setCondition(event.target.value);
            }}
          />
          <span>Lieu</span>
          <input
            type="text"
            name="City"
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
          <span>Prix</span>
          <input
            type="text"
            name="Price"
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
          <input
            type="checkbox"
            value={exchange}
            onChange={(event) => {
              setExchange(event.target.checked);
            }}
          />
          <span>Je suis intéressé(e) par les échanges</span>
          <input type="submit" name="Publish offer" />
        </form>
      </div>
    )
  ) : (
    setTimeout(() => {
      navigate("/signin");
    }, 1000)
  );
};

export default Publish;
