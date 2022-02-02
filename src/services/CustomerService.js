import qs from "qs";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getCustomers = async (page, size, filters) => {
  try {
    page--;
    let queryParams = {
      page,
      size,
      filters,
    };
    const response = await fetch(
      `${BASE_URL}/v1/customers?${qs.stringify(queryParams, {
        arrayFormat: "comma",
        skipNulls: true,
      })}`
    );
    const data = await response.json();
    return data;
  } catch (exception) {
    throw new Error(exception);
  }
};
