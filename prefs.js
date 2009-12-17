function get_pref(key, default_value) {
  try {
    return JSON.parse(localStorage[key]);
  } catch(e) {
    return default_value;
  }
}

function set_pref(key, value) {
  localStorage[key] = JSON.stringify(value);
}
