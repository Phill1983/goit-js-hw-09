const form = document.querySelector('.feedback-form'); 
const STORAGE_KEY = "feedback-form-state";

const formData = {
  email: "",
  message: ""
};

// Перевіряємо, чи є дані у локальному сховищі
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  Object.assign(formData, JSON.parse(savedData)); 
  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;
}

// Відстежуємо введення даних
form.addEventListener('input', event => {
  if (event.target.name in formData) {
    formData[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

// Обробник події відправки форми
form.addEventListener('submit', event => {
  event.preventDefault(); // Забороняємо перезавантаження сторінки

  // Перевіряємо, чи всі поля заповнені
  if (!formData.email.trim() || !formData.message.trim()) {
    alert("Fill please all fields");
    return;
  }

  // Виводимо актуальні дані у консоль
  console.log("Form Data Submitted:", formData);

  // Очищаємо локальне сховище
  localStorage.removeItem(STORAGE_KEY);

  // Очищаємо об'єкт formData
  formData.email = "";
  formData.message = "";

  // Очищаємо поля форми
  form.reset();
});
