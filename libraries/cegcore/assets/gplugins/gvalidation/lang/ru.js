jQuery.gvalidation.errors = jQuery.extend(jQuery.gvalidation.errors, {
	required: "Это поле обязательно для заполнения.",
	alpha: "Это поле может содержать только буквы.",
	alphanum: "Это поле может содержать только буквы и цифры.",
	nodigit: "Это поле не может содержать цифры.",
	digit: "Пожалуйста укажите число.",
	digitmin: "Число не может быть менее %1",
	digitltd: "Число должно быть более %1 и менее %2",
	number: "Пожалуйста укажите число.",
	email: "Пожалуйста укажите правильный email: <br /><span>Например yourname@domain.ru</span>",
	phone: "Пожалуйста укажите правильный телефон.",
	url: "Пожалуйста укажите правильный адрес url: <br /><span>Например http://www.domain.ru</span>",
	
	confirm: "Это поле не должно отличаться от поля %1",
	differs: "Число должно отличаться от %1",
	length_str: "Длина строки должна быть от %1 до %2 символов",
	length_fix: "The length is incorrect, it must be exactly %1 characters",
	lengthmax: "Заполните поле строкой, состоящей не более чем из %1 символов",
	lengthmin: "Заполните поле строкой, состоящей не менее чем из %1 символов",
	checkbox: "Пожалуйста поставьте галочку",
	group: 'Please make at least %1 selection(s).',
	custom: "Пожалуйста выберите из предложенных вариантов",
	select: "Пожалуйста выберите из предложенных вариантов"
});