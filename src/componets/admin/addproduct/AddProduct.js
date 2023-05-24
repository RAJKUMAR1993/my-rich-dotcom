import React, { useState } from "react";
import "../addproduct/addproduct.css";
import { toast } from "react-toastify";
import { collection, addDoc, Timestamp } from "firebase/firestore";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../../../firebase/config";
const categories = [
  {
    id: 1,
    name: "Electronics",
  },
  {
    id: 2,
    name: "Furniture",
  },
  {
    id: 3,
    name: "Laptop",
  },
  {
    id: 4,
    name: "mens",
  },
  {
    id: 5,
    name: "Fashion",
  },
];

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    imagURL: "",
    price: "",
    category: "",
    brand: "",
    desc: "",
  });
  const [progressBar, setProgressBar] = useState(0);

  const inputHandleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const inputHandleImageChange = (e) => {
    const fileImage = e.target.files[0];
    const storage = getStorage();

    const storageRef = ref(storage, `ecomm/${Date.now()}${fileImage.name}`);

    const uploadTask = uploadBytesResumable(storageRef, fileImage);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgressBar(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageUrl: downloadURL });
          toast.success("image upload successfully");
        });
      }
    );

    // console.log(fileImage);
  };
  // add product
  const addProduct = async (e) => {
    e.preventDefault();
    console.log(product);
    try {
      const docRef = await addDoc(collection(db, "products"), {
        name: product.name,
        imagURL: product.imagURL,
        price: product.price,
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createDate: Timestamp.now().toDate(),
      });
      console.log(docRef, "product");
      toast.success("product upload successfully");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="content">
        <div className="container">
          <div className="row">
            <h5 className="text-center">Add Product</h5>
            <hr />
            <form onSubmit={addProduct}>
              <div className="col-12 col-md-6">
                <div className="mb-3 row">
                  <label for=" Product Price" class="form-label">
                    Product Name
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="productName"
                      name="name"
                      value={product.name}
                      onChange={(e) => {
                        inputHandleChange(e);
                      }}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label for=" Product Price" class="form-label">
                    Product Image
                  </label>
                  <div className="col-sm-10">
                    {progressBar === 0 ? null : (
                      <div className="progress" style={{ height: "10px" }}>
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          style={{ width: `${progressBar}` }}
                        >
                          {progressBar < 100
                            ? `uploading${progressBar}`
                            : `Uploading complete ${progressBar}`}
                        </div>
                      </div>
                    )}

                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      accept="image/*"
                      id="productImage"
                      onChange={(e) => {
                        inputHandleImageChange(e);
                      }}
                    />
                    <br />
                    {product.imagURL === "" ? null : (
                      <input
                        type="text"
                        className="form-control"
                        required
                        disabled
                        name="imageUrl"
                        value={product.imagURL}
                      />
                    )}
                  </div>
                </div>
                <div className="mb-3 row">
                  <label for=" Product Price" class="form-label">
                    Product Price
                  </label>

                  <div class="col-sm-10">
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      id="productPrice"
                      value={product.price}
                      onChange={(e) => {
                        inputHandleChange(e);
                      }}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label for="exampleFormControlInput1" class="form-label">
                    Product Category
                  </label>
                  <div className="col-sm-10">
                    <select
                      name="category"
                      value={product.category}
                      onChange={(e) => {
                        inputHandleChange(e);
                      }}
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option disable>--- Category ---</option>
                      {categories?.map((cate, index) => {
                        return (
                          <>
                            <option key={cate.id} value={cate?.name}>
                              {cate?.name}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="mb-3 row">
                  <label for=" Product Price" class="form-label">
                    Product company/Brand
                  </label>

                  <div class="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="brand"
                      name="brand"
                      value={product.brand}
                      onChange={(e) => {
                        inputHandleChange(e);
                      }}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label for=" Product Price" class="form-label">
                    Product Description
                  </label>

                  <div className="col-sm-10">
                    <textarea
                      name="description"
                      type="text"
                      className="form-control"
                      id="description"
                      cols={30}
                      rows={5}
                      onChange={(e) => {
                        inputHandleChange(e);
                      }}
                    ></textarea>
                  </div>
                </div>
                <button className="btn btn-sm btn-info">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
