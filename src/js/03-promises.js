import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector('input[ name="delay"]'),
  stepInput: document.querySelector('input[ name="step"]'),
  amountInput: document.querySelector('input[name="amount"]'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const firstDelay = Number(refs.delayInput.value);
  const step = Number(refs.stepInput.value);
  const amount = Number(refs.amountInput.value);
  let position;
  let delay;
  for (let i = 1; i <= amount; i += 1) {
    position = i;
    delay = firstDelay + (i - 1) * step;

    createPromise(position, delay)
      .then(result => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${result.position} in ${result.delay}ms`
        );
      })
      .catch(error => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${error.position} in ${error.delay}ms`
        );
      });
  }
  refs.form.reset();
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
