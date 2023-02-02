// hook en login
useEffect(() => {
  // verifica que exista usuario
  if (!auth?.user?.name) {
    // de no haber usuario llama a la funcion
    reSignIn();
  }
}, [auth?.user, reSignIn]);

// funcion reSignIn en el hook useAuth.js
const reSignIn = async () => {
  // obtiene el token de cookie
  const token = Cookie.get('token');
  // verifica la existencia del token
  if (token) {
    // si hay token, lo utiliza para obtener los datos del usuario
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    const { data: user } = await axios.get(endPoints.auth.profile);
    setUser(user);
  }
};
