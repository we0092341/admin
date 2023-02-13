import styles from '../styles/Home.module.css'
import { useState, useReducer } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const INITIAL_STATE = {
  name: "",
  shortDescription: "",
  fullDescription: "",
  price: 0,
  priceGBP: 0,
  discount: 0,
  rating: 0,
  ratingCount: 0,
  saleCount: 1,
  featured: false,
  new: false,

  category: [],
  tag: [],
  thumbImage: [],
  image: [],
  additional: [], // {name: "", val: ""}
}

function filtersReducer(state, action) {
  switch (action.type) {
    case "DEFAULT":
      return action.body;
    case "STRING":
      return {
        ...state,
        [action.body.name]: action.body.val
      }
    case "LIST":
      console.log(action.body.name, "numeee");
      return {
        ...state,
        [action.body.name]: [...state[action.body.name], action.body.val]
      }
    case "ADDITIONAL":
      return {
        ...state,
        [action.body.name]: [...state[action.body.name], action.body.val]
      }
    case "BOOL":
      return {
        ...state,
        [action.body.name]: !state[action.body.name]
      }
    case "INITIAL":
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatchReducer] = useReducer(filtersReducer, INITIAL_STATE);
  const [additional, setAdditional] = useState({
    name: "",
    val: ""
  });
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [thumbImage, setThumbImage] = useState("");
  const [image, setImage] = useState("");

  const handleSetAdditional = e => setAdditional(prev => ({ ...prev, [e.target.name]: e.target.value }));

  function handleStringChange(e) {
    dispatchReducer({
      type: "STRING",
      body: {
        name: e.target.name,
        val: e.target.value
      }
    })
  }

  function handleArrChange(e) {
    let v = "";

    if (e === "category") {
      v = category;
    } else if (e === "tag") {
      v = tag;
    } else if (e === "thumbImage") {
      v = thumbImage;
    } else if (e === "image") {
      v = image;
    }

    dispatchReducer({
      type: "LIST",
      body: {
        name: e,
        val: v
      }
    })

    if (e === "category") {
      setCategory("");
    } else if (e === "tag") {
      setTag("");
    } else if (e === "thumbImage") {
      setThumbImage("");
    } else if (e === "image") {
      setImage("");
    }
  }

  function handleAdditionalChange(e) {
    dispatchReducer({
      type: "ADDITIONAL",
      body: {
        name: "additional",
        val: additional
      }
    })

    setAdditional({ name: "", val: "" });
  }

  function handleBoolChange(e) {
    dispatchReducer({
      type: "BOOL",
      body: {
        name: e
      }
    })

    setAdditional({ name: "", val: "" });
  }

  async function submitFn() {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/produs`, state);
      toast.info(res.data, { position: toast.POSITION.TOP_RIGHT });

    } catch(err) {
      toast.error(err.response.data, { position: toast.POSITION.TOP_RIGHT });
    }

    // dispatchReducer({ type: "INITIAL" });
  }

  function handleSubmit(e) {
    e.preventDefault();

    submitFn();
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>adauga produs</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          maxLength="555"
          minLength="2"
          required
          autoFocus
          autoComplete="name"
          name="name"
          className={styles.formInput}
          placeholder="titlul produsului"
          value={state.name}
          onChange={handleStringChange}
        />

        <textarea
          placeholder="short Description"
          name="shortDescription"
          required
          className={styles.formTxt}
          value={state.shortDescription}
          onChange={handleStringChange}
        />

        <textarea
          placeholder="full Description"
          name="fullDescription"
          required
          className={styles.formTxt}
          value={state.fullDescription}
          onChange={handleStringChange}
        />

        <lable>price:</lable>
        <input
          type="number"
          min="1"
          required
          name="price"
          className={styles.formInput}
          placeholder="price"
          value={state.price}
          onChange={handleStringChange}
        />   

        <lable>priceGBP:</lable>
        <input
          type="number"
          min="1"
          required
          name="priceGBP"
          className={styles.formInput}
          placeholder="priceGBP"
          value={state.priceGBP}
          onChange={handleStringChange}
        />        
        
        <lable>saleCount de cate ori a fost vandut, o sa apara la popular:</lable>
        <input
          type="number"
          min="1"
          required
          name="saleCount"
          className={styles.formInput}
          placeholder="saleCount"
          value={state.saleCount}
          onChange={handleStringChange}
        />

        <lable>discount%:</lable>
        <input
          type="number"
          min="1"
          required
          name="discount"
          className={styles.formInput}
          placeholder="discount"
          value={state.discount}
          onChange={handleStringChange}
        />

        <lable>rating, numarul de stele:</lable>
        <input
          type="number"
          min="1"
          required
          name="rating"
          className={styles.formInput}
          placeholder="rating"
          value={state.rating}
          onChange={handleStringChange}
        />

        <lable>ratingCount cate reviews are, sa fie la fel cu numarul de reviews:</lable>
        <input
          type="number"
          min="0"
          required
          name="ratingCount"
          className={styles.formInput}
          placeholder="rating Count"
          value={state.ratingCount}
          onChange={handleStringChange}
        />

        <lable>featured apare in categoria asta speciala la featured:
          <input
          type="checkbox"
          className={styles.checkForm}
          value={state.featured}
          onChange={() => handleBoolChange("featured")}
        />
        </lable>

        <lable>new:
          <input
          type="checkbox"
          className={styles.checkForm}
          value={state.new}
          onChange={() => handleBoolChange("new")}
        />
      </lable>

        <div className={styles.formMini}>
          <h2>adauga category (computer, mobile&tablet, camera, accessories, gaming, watches, tv, mining)</h2>

          <input
            type="text"
            maxLength="555"
            minLength="2"
            name="category"
            className={styles.formInput}
            placeholder="category"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />

          <button type="button" onClick={() => handleArrChange("category")}>adauga category</button>
        </div>

        <div className={styles.formMini}>
          <h2>adauga tag</h2>

          <input
            type="text"
            maxLength="555"
            minLength="2"
            name="tag"
            className={styles.formInput}
            placeholder="tag"
            value={tag}
            onChange={e => setTag(e.target.value)}
          />

          <button type="button" onClick={() => handleArrChange("tag")}>adauga tag</button>
        </div>

        <div className={styles.formMini}>
          <h2>adauga thumbImage</h2>

          <input
            type="text"
            maxLength="555"
            minLength="2"
            name="thumbImage"
            className={styles.formInput}
            placeholder="thumbImage"
            value={thumbImage}
            onChange={e => setThumbImage(e.target.value)}
          />

          <button type="button" onClick={() => handleArrChange("thumbImage")}>adauga thumbImage</button>
        </div>

        <div className={styles.formMini}>
          <h2>adauga image</h2>

          <input
            type="text"
            maxLength="555"
            minLength="2"
            name="image"
            className={styles.formInput}
            placeholder="image"
            value={image}
            onChange={e => setImage(e.target.value)}
          />

          <button type="button" onClick={() => handleArrChange("image")}>adauga image</button>
        </div>

        <div className={styles.formMini}>
          <h2>adauga additional info</h2>

          <input
            type="text"
            maxLength="555"
            minLength="2"
            name="name"
            trim="true"
            className={styles.formInput}
            placeholder="name"
            value={additional.name}
            onChange={handleSetAdditional}
          />

          <input
            type="text"
            maxLength="555"
            minLength="2"
            name="val"
            className={styles.formInput}
            placeholder="val"
            value={additional.val}
            onChange={handleSetAdditional}
          />

          <button type="button" onClick={handleAdditionalChange}>adauga additional</button>
        </div>

        <br />

        <br />
        <button>adauga produs</button>
      </form>
    </div>
  )
}
