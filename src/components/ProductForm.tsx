import { FC, SyntheticEvent, useRef } from "react";
import type { ProductType } from "../context/ProductsContext";
import { useUser } from "../context/UserContext";

type ProductFormType = {
  handleProduct: (product: ProductType) => void;
  type: string;
  product: ProductType | null;
  setEditProduct: any;
};

const ProductForm: FC<ProductFormType> = ({
  handleProduct,
  type,
  product,
  setEditProduct,
}) => {
  const { user } = useUser();
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const providerRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const costRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const submitHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    const p = {
      name: nameRef.current?.value || "",
      description: descriptionRef.current?.value || "",
      provider: providerRef.current?.value || "",
      price: Number(priceRef.current?.value || 0),
      cost: Number(costRef.current?.value || 0),
      store: user?.uid,
    };

    if (type === "update") {
      handleProduct({ ...product, ...p } as ProductType);
    } else {
      handleProduct({ ...p, id: "x" } as ProductType);
    }

    setEditProduct(null);
    formRef.current?.reset();
  };

  return (
    <form onSubmit={submitHandler} ref={formRef}>
      {type === "update" && (
        <div>
          <label htmlFor="">id</label>
          <input type="text" value={product?.id} readOnly />
        </div>
      )}
      <div>
        <label htmlFor="">name</label>
        <input type="text" ref={nameRef} defaultValue={product?.name} />
      </div>
      <div>
        <label htmlFor="">description</label>
        <input
          type="text"
          ref={descriptionRef}
          defaultValue={product?.description}
        />
      </div>
      <div>
        <label htmlFor="">provider</label>
        <input type="text" ref={providerRef} defaultValue={product?.provider} />
      </div>
      <div>
        <label htmlFor="">price</label>
        <input type="text" ref={priceRef} defaultValue={product?.price} />
      </div>
      <div>
        <label htmlFor="">cost</label>
        <input type="text" ref={costRef} defaultValue={product?.cost} />
      </div>
      <button>{type}</button>
    </form>
  );
};

export default ProductForm;
