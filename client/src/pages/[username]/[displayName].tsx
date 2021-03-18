import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../helpers";
import { useAuth, useMessage } from "../../store";
import { Product } from "../../components";

interface Inputs {
  url: string;
}

export default function Wishlist({ router }: PageProps) {
  const { username, displayName } = router.query;
  const { auth } = useAuth();
  const { setMessage } = useMessage();
  const [wishlist, setWishlist] = useState<IWishlist>();
  const { register, handleSubmit } = useForm<Inputs>();

  useEffect(() => {
    if (username && displayName && auth.token) {
      api.wishlists
        .getWishlistByDisplayName(auth.token as string, displayName as string)
        .then((wishlist) => {
          if (wishlist.owner.username !== username) {
            router.push("/");
          }

          setWishlist(wishlist);
        })
        .catch((err) => setMessage({ text: err }));
    }
  }, [username, displayName, auth.token]);

  function addProduct(data: Inputs) {
    api.products
      .addProductToWishlist(auth.token as string, displayName as string, data)
      .then((wishlist) => setWishlist(wishlist))
      .catch((err) => setMessage({ text: err }));
  }

  function removeProduct(_id: string) {
    api.products
      .removeProductFromWishlist(
        auth.token as string,
        displayName as string,
        _id
      )
      .then((wishlist) => setWishlist(wishlist))
      .catch((err) => setMessage({ text: err }));
  }

  if (wishlist) {
    return (
      <div className="wishlist-page">
        <h1>{wishlist.name}</h1>
        <p>{wishlist.description || "No description"}</p>

        <form id="add-product-form" onSubmit={handleSubmit(addProduct)}>
          <div className="url">
            <label htmlFor="url">URL</label>
            <input type="url" name="url" id="url" ref={register} />
          </div>
          <button type="submit">Add Product</button>
        </form>

        <div className="products">
          {wishlist.products.length > 0
            ? wishlist.products.map((product, i) => (
                <Product key={i} {...product} onRemove={removeProduct} />
              ))
            : "No products. Add one."}
        </div>
      </div>
    );
  }

  return null;
}