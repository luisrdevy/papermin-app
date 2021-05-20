import { SyntheticEvent, useRef } from "react";
import { useUser } from "../context/UserContext";
import { firestore } from "../services/firebase";

const CreateStore = () => {
  const { user } = useUser();
  const storeNameRef = useRef<HTMLInputElement>(null);
  const storeSloganRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!user) return;
    const storeRef = firestore.collection("stores").doc(user.uid);
    const store = {
      name: storeNameRef.current?.value,
      slogan: storeSloganRef.current?.value,
    };
    storeRef.set({ ...store });
  };
  return (
    <main>
      <p>CreateStore</p>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={storeNameRef} placeholder="Store name" />
        <input type="text" ref={storeSloganRef} placeholder="slogan" />
        <button>save</button>
      </form>
    </main>
  );
};

export default CreateStore;
