export const validateEmail = string => {
  if (string) {
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(String(string).toLowerCase());
  }
  return false;
};

export const handleMessage = message => {
  if (message && Array.isArray(message) && message.length > 0) {
    return message.join('\n');
  }
  return message?.toString() || 'Something went wrong, please try again later!';
};