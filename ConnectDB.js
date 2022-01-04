const {MongoClient} = require('mongodb');  // Подключение клиента из БД

const client = new MongoClient('URL');  // Подключение с БД через url

const start = async () => {             // Функция для старта соединения
    try {
        await client.connect()           //  Соединение клиента и сервера
        console.log('Connection complete')
        await client.db().createCollection('users')  //  Создание коллекции внутри БД
        const users = client.db().collection('users') //  Инициализация переменной с коллекцией
        users.insertOne({name: 'NameUser', age: 23})  //  Добавление пользователя в коллекцию
        const user = await users.findOne({name: 'NameUser'}) // Получение пользователя для взаимодействия с ним
        console.log(user)
    } catch (e) {
        console.log(e)
    }
}

start(); // Запуск функции