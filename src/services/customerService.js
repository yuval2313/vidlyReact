import http from "./httpService";

const apiEndpoint = "/customers";

function customerUrl(customerId) {
  return `${apiEndpoint}/${customerId}`;
}

export function getCustomers() {
  return http.get(apiEndpoint);
}

export function getCustomer(customerId) {
  return http.get(customerUrl(customerId));
}

export function deleteCustomer(customerId) {
  return http.delete(customerUrl(customerId));
}

export function saveCustomer(customer) {
  const body = { ...customer };
  delete body._id;

  if (customer._id) {
    return http.put(customerUrl(customer._id), body);
  }

  return http.post(apiEndpoint, body);
}
