import styles from '../styles/Home.module.css'
import { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

export default function Home() {
  const [data, setData] = useState({
    productID: "",
    name: "",
    date: "",
    stars: 0,
    review: ""
  });

  const handleChange = e => setData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  async function submitFn() {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/review`, data);
      toast.info(res.data, { position: toast.POSITION.TOP_RIGHT });

    } catch(err) {
      console.log(err)
      toast.error(err.response.data, { position: toast.POSITION.TOP_RIGHT });
    }

    setData({
      productID: "",
      name: "",
      date: "",
      stars: 0,
      review: ""
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    submitFn();
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>adauga review</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          minLength="2"
          required
          autoFocus
          autoComplete="id"
          name="productID"
          className={styles.formInput}
          placeholder="productID produs"
          value={data.productID}
          onChange={handleChange}
        />

        <input
          type="text"
          maxLength="555"
          minLength="2"
          required
          autoComplete="name"
          name="name"
          className={styles.formInput}
          placeholder="numele autorului"
          value={data.name}
          onChange={handleChange}
        />

        <input
          type="text"
          maxLength="555"
          minLength="2"
          required
          autoComplete="date"
          name="date"
          className={styles.formInput}
          placeholder="data review"
          value={data.date}
          onChange={handleChange}
        />

        <textarea
          placeholder="txt review"
          name="review"
          required
          className={styles.formTxt}
          value={data.review}
          onChange={handleChange}
        />

        <lable>rating, numarul de stele:</lable>
        <input
          type="number"
          min="0"
          required
          name="stars"
          className={styles.formInput}
          placeholder="stars"
          value={data.stars}
          onChange={handleChange}
        />

        <button>creaza</button>
      </form>
    </div>
  )
}