show databases // Показать созданные БД

use mongo // Использование БД

db.createCollection("users")// Создание коллекции

show collections // Просмотр коллекций

db.dropData base() // Удаление БД

db.users.find() // Получение данных о всех объектах
db.users.find({age: 25}) // Поиск по критериям
db.users.find({$or:[{name: "Name"}, {age: 34}]}) // Поиск по критериям или
db.users.find({age: {$lt:28}}) // Поиск по критериям меньше чем
db.users.find({age: {$lte:28}}) // Поиск по критериям меньше чем либо равно
db.users.find({age: {$gt:28}}) // Поиск по критериям больше чем
db.users.find({age: {$gte:28}}) // Поиск по критериям больше чем или равно
db.users.find({age: {$ne:28}}) // Поиск по критериям не равно
db.users.find().limit(3) // Найти только 3 записи
db.users.find().sort({age:1}) // Отсортировать по порядку
db.users.find().sort({age:-1}) // Отсортировать в обратном порядке
db.users.findOne({_id:ObjectId("61ceced814917de6fec003f1")}) // Поиск пользователя по уникальному идентификатору
db.users.distinct // Вернет только уникальные записи
db.users.deleteOne({age: 24}) // Удаление сущности по критерию

// Добавление одного пользователя в БД
db.users.insertOne({
    name: "Name",
    age: 23
})

// Добавление нескольких пользователей
db.users.insertMany([
    {name: "Vasya", age: 28},
    {name: "Basya", age: 28},
    {name: "Petya", age: 28},
])

// Замена значений в объекте пользователя
db.users.updateOne(
    {name: "Vasya"},
    {
        $set: {
            name: "Ilon mask",
            age: 30
        }
    }
)

// Замена значений поля 
db.users.updateMany(
    {},
    {
        $rename: {
            name: "fullname"
        }
    }
)

// Добавление одного пользователя и удаление другого
db.users.bulkWrite([
    {
        insertOne: {
            document: {name: "Nastya", age: 18}
        }
    },
    {
        deleteOne: {
            filter: {name: "Petya"}
        }
    }
])

// Типы связей
db.users.update(
    {fullname: "Petya"},
    {
        $set: {
            posts: [
                {title: "javascript", text: "js top"},
                {title: "mongodb", text: "database"}
            ]
        }
    }
)

// Поиск пользователя и всех его постов
db.users.findOne(
    {fullname: "Petya"},
    {posts:1}
)

// Поиск по постам пользователя
db.users.find(
    {
        posts: {
            $elemMatch: {
                title: "javascript"
            }
        }
    }
)