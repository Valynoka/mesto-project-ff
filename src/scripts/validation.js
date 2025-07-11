const showInputError = (formElement, inputElement, errorMessage, obj) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(obj.errorClass);
};

const hideInputError = (formElement, inputElement, obj) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  formError.classList.remove(obj.errorClass);
  formError.textContent = ''
  // inputElement.setCustomValidity('');
}

const checkInputValidity = (formElement, inputElement, obj) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, obj);
  } else {
    hideInputError(formElement, inputElement, obj);
  }
};

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid
//   })
// };

// const disabledButtonState = (buttonElement, obj) => {
//   buttonElement.disabled = true;
//   buttonElement.classList.add(obj.inactiveButtonClass);
// }

// const enableButtonState = (buttonElement, obj) => {
//   buttonElement.disabled = false;
//   buttonElement.classList.remove(obj.inactiveButtonClass);
// }

// const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
//   if (hasInvalidInput(inputList)) {
//     disabledButtonState(buttonElement, inactiveButtonClass)
//   } else {
//     enableButtonState(buttonElement, inactiveButtonClass)
//   }
// };

const toggleButtonState = (inputList, buttonElement, obj) => {
  const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid);
  buttonElement.disabled = hasInvalidInput;
  buttonElement.classList.toggle(obj.inactiveButtonClass, hasInvalidInput);
}

const setEventListeners = (formElement, obj) => {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, obj);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, obj);
      toggleButtonState(inputList, buttonElement, obj);
    });
  });
};

export const clearValidation = (formElement, validationConfig) => {
  const inputElements = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  inputElements.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  })
  toggleButtonState(inputElements, buttonElement, validationConfig);
  // disabledButtonState(buttonElement, validationConfig.inactiveButtonClass);
};

export const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, obj);
  });
};