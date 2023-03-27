export const getUserPropertyLabel = (item) => {

    const array = {
        'id': 'Айди',
        'name': 'Имя',
        'username': 'Псевдоним',
        'email': 'Электронная почта',
        'phone': 'Номер телефона',
        'website': 'Веб сайт',
    }

    return array[item]
}




