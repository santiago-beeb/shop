import { useState, useEffect } from 'react';
import useFetch from '@hooks/useFetch';
import Modal from '@common/Modal';
import Paginate from '@components/Pagination';
import endPoints from '@services/api';
import FormProduct from '@components/FormProduct';
import { PlusIcon, XCircleIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import Alert from '@common/Alert';
import useAlert from '@hooks/useAlert';
import { deleteProduct } from '@services/api/products';

const PRODUCT_LIMIT = 5;

export default function Products() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const { alert, setAlert, toggleAlert } = useAlert();
  const [offsetProducts, setOffsetProducts] = useState(0);
  const products = useFetch(
    endPoints.products.getProducts(PRODUCT_LIMIT, offsetProducts),
    offsetProducts
  );
  const totalProducts = useFetch(endPoints.products.getProducts(0, 0)).length;

  useEffect(() => {
    async function loadProducts() {
      const response = await axios.get(endPoints.products.allProducts);
      setItems(response.data);
    }
    try {
      loadProducts();
    } catch (error) {
      console.error(error);
    }
  }, [alert]);

  const handleDelete = (id) => {
    deleteProduct(id)
      .then(() => {
        setAlert({
          active: true,
          message: 'Producto eliminado',
          type: 'error',
          autoClose: true,
        });
      })
      .catch((error) => {
        setAlert({
          active: true,
          mesagge: error.mesagge,
          type: 'error',
          autoClose: false,
        });
      });
  };

  return (
    <>
      <Alert alert={alert} handleClose={toggleAlert} />
      <div className="lg:flex lg:items-center lg:justify-between mb-8">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Lista de productos
          </h2>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="sm:ml-3">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => setOpen(true)}
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Añadir producto
            </button>
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Nombre
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Categoria
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Precio
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Id
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Editar</span>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Eliminar</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products?.map((product) => (
                    <tr key={`Product-item-${product.id}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={product.images[0]}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.category.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          ${product.price}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Editar
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <XCircleIcon
                          aria-hidden="true"
                          onClick={() => handleDelete(product.id)}
                          href="#"
                          className="flex-shrink-0 h-6 text-gray-400 cursor-pointer"
                        >
                          Eliminar
                        </XCircleIcon>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {totalProducts > 0 && (
          <Paginate
            totalItems={totalProducts}
            itemsPerPage={PRODUCT_LIMIT}
            setOffset={setOffsetProducts}
            neighbours={3}
          ></Paginate>
        )}
      </div>
      <Modal open={open} setOpen={setOpen}>
        <FormProduct setOpen={setOpen} setAlert={setAlert} />
      </Modal>
    </>
  );
}
