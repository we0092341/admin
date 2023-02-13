import styles from '../styles/Home.module.css'
import { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

export default function Home() {
  const [data, setData] = useState("");
  const [id, setId] = useState("");

  // const handleChange = e => setData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  async function submitFn() {
    try {
      const res = await axios.patch(`${process.env.NEXT_PUBLIC_URL}/api/produs`, {data});
      setId(res.data);

    } catch(err) {
      toast.error(err.response.data, { position: toast.POSITION.TOP_RIGHT });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    submitFn();
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>gaseste id'ul unui produs pe baza titlului</h1>
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
          value={data}
          onChange={e => setData(e.target.value)}
        />

        <button>returneaza id</button>
      </form>

      <span className={styles.dataRes}>id'ul produsului: {id}</span>
    </div>
  )
}