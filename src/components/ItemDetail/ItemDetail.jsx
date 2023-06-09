import React, { useContext, useState } from "react";
import { ItemCount } from './../ItemCount/ItemCount'
import "./../ItemList/itemListContainer.css";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/cartContext";
import { Spinner } from "react-bootstrap";

export const ItemDetail = ({
  id,
  title,
  pictureUrl,
  price,
  description,
  stock,
}) => {
  const [qtyAdd, setQtyAdd] = useState(0);
  const { addToCart } = useContext(CartContext);

  const item = {
    id,
    title,
    price,
    pictureUrl,
    stock,
    description,
  };

  const handleAdd = (qty) => {
    setQtyAdd(qty);
    const item = {
      id,
      title,
      price,
      pictureUrl,
      stock,
      description,
    };
    addToCart(item, qty);
  };

  return (
    <>
      {item.id ? (
        <div className=" card col-12 m-3 item-detail">
          <div className="detail-header">
            <img
              className="imgArticuloDetail"
              src={pictureUrl}
              alt="articulo"
            ></img>
            <div className="d-flex flex-column justify-content-evenly p-3">
              <h3 className="article-name"> {title}</h3>
              <h4>{description}</h4>
              <h4>Precio ${price}</h4>
              <h4>Unidades Disponibles: {stock}</h4>
              {qtyAdd > 0 ? (
                <>
                  <Link
                    className="btn btn-outline-primary  col-md-12 col-lg-8  mx-auto mt-4"
                    to="/cart"
                  >
                    Terminar Compra
                  </Link>
                  <Link
                    className="btn btn-outline-primary  col-md-12 col-lg-8  mx-auto mt-4"
                    to="/"
                  >
                    Seguir comprando
                  </Link>
                </>
              ) : (
                <ItemCount
                  width={"80%"}
                  stock={stock}
                  initial={1}
                  onAdd={(n) => handleAdd(n)}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <Spinner animation="grow" />
      )}
    </>
  );
};
