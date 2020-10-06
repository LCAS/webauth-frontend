
/**
 * Remove "" from cookie value.
 * @param text
 */
function trim(text: string) {
  return text.replace(/^"|"$/gm,'');
}


export class HttpCookie {

  /**
   * Get a cookie and returns the base64-decoded value.
   *
   * @param cookie_name
   */
  static get(cookie_name: string): string {
    let data: string = "";
    const cookie: string = document.cookie
      .split('; ')
      .find(row => row.startsWith(cookie_name));
    if (cookie)
    {
      let value = cookie.split('=')[1];
      data = atob(trim(value));
    }
    return data;
  }
}