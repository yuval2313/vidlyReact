//Verifies expiration date from regular input field

export function verifyCardExpiration(expiration) {
  //first we verify using a regular expression in order to determine that the format
  //in which the date is written is either MMYY or MMYYYY.
  //the month and year must also be separated by on of the following characters: ("/",".","-")
  const regex = /^(0[1-9]|1[0-2])(\/|-|\.)([0-9]{4}|[0-9]{2})$/;
  if (!regex.test(expiration)) return false;

  //next we check to see if the given expiration date is later than today
  const today = new Date();
  let today_mm = today.getMonth() + 1;
  const today_yy = today.getFullYear() % 100;

  if (today_mm < 10) {
    today_mm = "0" + today_mm;
  }

  const expiration_mm = expiration.slice(0, 2);
  let expiration_yy;
  if (expiration.length > 5)
    expiration_yy = (expiration.slice(-4) % 100).toString();
  else expiration_yy = expiration.slice(-2);

  if (
    expiration_yy > today_yy ||
    (expiration_yy === today_yy.toString()) & (expiration_mm >= today_mm)
  )
    return true;
  else return false;
}
