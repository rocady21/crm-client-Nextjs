import React from "react";

const ProductoResume = ({producto})=> {
    const {nombre,existencia,precio} = producto
    return (
        <div className="md:flex md:justify-between md:items-center mt-5">
            <div className="md:w-2/4 mb-2 md:mb-0">
                <p className="text-sm">{nombre}</p>
                <p>USD {precio}</p>
            </div>
            <input type="number" placeholder="Cantidad"
            className="shadow apparence-none border rounded  py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline"
            />
        </div>
    )
}


export default ProductoResume