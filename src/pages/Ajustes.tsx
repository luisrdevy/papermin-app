import { SyntheticEvent, useRef } from "react";
import { useStore } from "../context/StoreContext";
import { firestore } from "../services/firebase";

const Ajustes = () => {
  const store = useStore();
  const storeNameRef = useRef<HTMLInputElement>(null);
  const storeSloganRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!store) return;
    const storeRef = firestore.collection("stores").doc(store.id);
    const newStore = {
      name: storeNameRef.current?.value,
      slogan: storeSloganRef.current?.value,
    };
    storeRef.set({ ...newStore });
  };
  return (
    <main>
      <p>Ajustes</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Store name</label>
        <input
          type="text"
          defaultValue={store?.name}
          ref={storeNameRef}
          placeholder="Store name"
        />
        <label htmlFor="">Store slogan</label>
        <input
          type="text"
          defaultValue={store?.slogan}
          ref={storeSloganRef}
          placeholder="slogan"
        />
        <button>save</button>
      </form>
    </main>
  );
};

export default Ajustes;
