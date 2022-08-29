class Form {
  /**
   * Validate Login
   * @param str
   * @returns boolean
   */
  static validEmail(str) {
    let regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(str);
  }

  static validOtp(str) {
    let regex = /^[0-9]{6}$/;
    return regex.test(str);
  }

  static validPassword(str) {
    let regex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return regex.test(str);
  }

  static validRePassword(str) {
    let regex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return regex.test(str);
  }

  /**
   * Minimum length of string
   * @param str
   * @param length
   * @returns
   */
  static minLength(str, length) {
    let isInvalid = false;

    if (str.length < length || str.length < length) {
      isInvalid = true;
    }

    return isInvalid;
  }

  /**
   * Form Validator
   * @param  obj
   * @returns
   */
  static validator(obj) {
    let keys = Object.entries(obj);
    let results = [];
    let validations = null;

    keys.map((key) => {
      if ("isRequired" in key[1] && key[1].isRequired) {
        if (key[1].value.length === 0) {
          results.push({
            [key[0]]: [`The ${key[0]} is required.`],
          });
        } else {
          if ("isEmail" in key[1] && key[1].isEmail) {
            let isValidEmail = Form.validEmail(key[1].value);

            if (!isValidEmail) {
              results.push({
                [key[0]]: [`The ${key[0]} must be valid email.`],
              });
            }
          } else if ("isOtp" in key[1] && key[1].isOtp) {
            let isValidOtp = Form.validOtp(key[1].value);

            if (!isValidOtp) {
              results.push({
                [key[0]]: [`The ${key[0]} must be valid otp.`],
              });
            }
          } else if ("isPassword" in key[1] && key[1].isPassword) {
            let isValidPassword = Form.validPassword(key[1].value);

            if (!isValidPassword) {
              results.push({
                [key[0]]: [`The ${key[0]} must be valid password.`],
              });
            }
          } else if ("isRePassword" in key[1] && key[1].isRePassword) {
            let isValidRePassword = Form.validRePassword(key[1].value);

            if (!isValidRePassword) {
              results.push({
                [key[0]]: [`The ${key[0]} must be valid re-password.`],
              });
            }
          }

          if (
            "minLength" in key[1] &&
            Form.minLength(key[1].value, key[1].minLength)
          ) {
            results.push({
              [key[0]]: [
                `The ${key[0]} must at least ${key[1].minLength} characters.`,
              ],
            });
          }
        }
      } else if ("isEmail" in key[1]) {
        let isValidEmail = Form.validEmail(key[1].value);

        if (!isValidEmail) {
          results.push({
            [key[0]]: [`The ${key[0]} must be valid email`],
          });
        }
      } else if ("isOtp" in key[1]) {
        let isValidOtp = Form.validOtp(key[1].value);

        if (!isValidOtp) {
          results.push({
            [key[0]]: [`The ${key[0]} must be valid otp`],
          });
        }
      } else if ("isPassword" in key[1]) {
        let isValidPassword = Form.validPassword(key[1].value);

        if (!isValidPassword) {
          results.push({
            [key[0]]: [`The ${key[0]} must be valid password.`],
          });
        }
      } else if ("isRePassword" in key[1]) {
        let isValidRePassword = Form.validRePassword(key[1].value);

        if (!isValidRePassword) {
          results.push({
            [key[0]]: [`The ${key[0]} must be valid re-password.`],
          });
        }
      } else if (
        "minLength" in key[1] &&
        Form.minLength(key[1].value, key[1].minLength)
      ) {
        results.push({
          [key[0]]: [
            `The ${key[0]} must at least ${key[1].minLength} characters.`,
          ],
        });
      }
      return results;
    });

    results = Object.assign({}, ...results.map((result) => result));

    if (Object.keys(results).length > 0) {
      validations = {
        errors: results,
      };
    } else {
      validations = null;
    }

    return validations;
  }
}

export default Form;
