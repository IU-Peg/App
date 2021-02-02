/* eslint-disable func-names */
import * as Yup from 'yup';
import * as validator from 'card-validator';

const schemaValidation = Yup.object().shape({
  number: Yup.string()
    .defined()
    .test('is-valid-card-number', 'Card number is invalid', function (
      cardNumber,
    ) {
      const { options }: any = this;
      const { runtime = false } = options.context as any;
      const { isPotentiallyValid, isValid } = validator.number(cardNumber);

      return runtime ? isPotentiallyValid : isValid;
    }),
  expiration: Yup.string()
    .defined()
    .test('is-valid-expiration', 'Card expiration is invalid', function (
      expiration,
    ) {
      const { options }: any = this;
      const { runtime = false } = options.context as any;
      const { isPotentiallyValid, isValid } = validator.expirationDate(
        expiration,
      );

      return runtime ? isPotentiallyValid : isValid;
    }),
  cvv: Yup.string()
    .defined()
    .test('is-valid-cvv', 'Card cvv is invalid', function (cvv) {
      const { options }: any = this;
      const { runtime = false } = options.context as any;
      const { isPotentiallyValid, isValid } = validator.cvv(cvv);

      return runtime ? isPotentiallyValid : isValid;
    }),
  name: Yup.string()
    .defined()
    .test('is-valid-card-name', 'Card name is invalid', function (name) {
      const { options }: any = this;
      const { runtime = false } = options.context as any;
      const { isPotentiallyValid, isValid } = validator.cardholderName(name);

      return runtime ? isPotentiallyValid : isValid;
    }),
});

export { schemaValidation };
