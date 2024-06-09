"use client";
import { useState, ChangeEventHandler, FormEventHandler } from "react";

import { prefectures } from "@/utils/prefectures";

export default function Home() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [pref, setPref] = useState(prefectures[0]);
  const [result, setResult] = useState({ name: "", age: "", pref: "" });
  const [error, setError] = useState(false);

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setName(event.target.value);

  const handleAgeChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setAge(event.target.value);

  const handlePrefChange: ChangeEventHandler<HTMLSelectElement> = (event) =>
    setPref(event.target.value);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const regex = /^[^0-9０-９\s!-/:-@[-`{-~]+$/g;
    const nameCheck = regex.test(name);

    if (!name.length) {
      alert("名前は必須です");
      return;
    }
    if (!age.length) {
      alert("年齢は必須です");
      return;
    }
    if (!nameCheck) {
      alert("数字や記号は入力できません");
      return;
    }
    if (!name.length || !age.length) {
      alert("名前と年齢は必須です");
      return;
    }

    try {
      const req = await fetch("http://localhost:3001/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, age, pref }),
      });

      const res = await req.json();
      console.log("success!", res);
      setError(false);
      setResult({ name: res.name, age: res.age, pref: res.pref });
    } catch (error) {
      console.log("failed", error);
      setError(true);
    }
  };

  return (
    <main>
      <div>
        <a href="/list">一覧画面</a>
      </div>
      <h1>登録画面</h1>
      <form onSubmit={handleSubmit}>
        <label>
          名前:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          年齢:
          <input type="number" min="0" value={age} onChange={handleAgeChange} />
        </label>
        <br />
        <label>
          都道府県:
          <select value={pref} onChange={handlePrefChange}>
            {prefectures.map((pref) => (
              <option key={pref} value={pref}>
                {pref}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">登録</button>
      </form>

      <div>
        {error && <p>エラーが発生しました</p>}
        {error || (
          <>
            <p>名前: {result.name}</p>
            <p>年齢: {result.age}</p>
            <p>都道府県: {result.pref}</p>
          </>
        )}
      </div>
    </main>
  );
}
