export const AuthHeaders = () => {
  const _header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer",
    },
  };

  try {
    const tokenAuthorization = `Bearer ${localStorage.getItem(
      "Authorization"
    )}`;

    if (tokenAuthorization) {
      _header.headers["Authorization"] = tokenAuthorization;
      return _header;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Usurio No autorizado");
  }
};
