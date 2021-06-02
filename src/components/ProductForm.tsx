import { FC, SyntheticEvent, useRef } from "react";
import type { ProductType } from "../context/ProductsContext";
import { useUser } from "../context/UserContext";

import {
  Button,
  TextField,
  Grid
} from '@material-ui/core';


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
    <Grid direction="column" container spacing={0} alignItems="center" justify="center">
      <form  onSubmit={submitHandler} ref={formRef} noValidate autoComplete="off" >
            {type === "update" && (
              <div>
                <label htmlFor="">id</label>
                <input type="text" value={product?.id} readOnly />
              </div>
            )}
              <TextField id="outlined-basic" variant="outlined" label="name" fullWidth 
                inputRef={nameRef} defaultValue={product?.name} style={{ margin: 8 }} />
              <TextField id="outlined-basic" variant="outlined" label="Description" fullWidth 
                inputRef={descriptionRef} defaultValue={product?.description} style={{ margin: 8 }} />
              <TextField id="outlined-basic" variant="outlined" label="provider" fullWidth 
                inputRef={providerRef} defaultValue={product?.provider} style={{ margin: 8 }} />
              <TextField id="outlined-basic" variant="outlined" label="price" fullWidth 
                inputRef={priceRef} defaultValue={product?.price} style={{ margin: 8 }} />
              <TextField id="outlined-basic" variant="outlined" label="cost" fullWidth 
                inputRef={costRef}  defaultValue={product?.cost} style={{ margin: 8 }} />
              <Button variant="contained" color="primary" type="submit">{type}</Button>
      </form>
    </Grid>
    
   /* <form onSubmit={submitHandler} ref={formRef}>
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
    </form>  */
  );
};

export default ProductForm;
