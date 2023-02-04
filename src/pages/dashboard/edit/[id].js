import FormProduct from '@components/FormProduct';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import endPoints from '@services/api';
import axios from 'axios';

export default function Edit() {
  const [product, setProduct] = useState({});
  const router = useRouter();

  React.useEffect(() => {
    //El id se obtendrá desde la URL
    const { id } = router.query;
    //Si la ruta aún no está lista, entonces el id tampoco
    if (!router.isReady) return;
    //Función para obtener la info del producto a partir del id
    const getProduct = async () => {
      const response = await axios.get(endPoints.products.getProduct(id));
      return response;
    };
    //Si la promesa se resuelve, asignamos la data a product
    getProduct()
      .then((response) => setProduct(response.data))
      //Si el id no existe, mandamos a notFound
      .catch((err) => router.push('/notFound'));
  }, [router?.isReady]);

  return <FormProduct product={product} />;
}
