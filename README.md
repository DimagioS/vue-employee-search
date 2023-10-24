# Поиск и предпросмотр профиля сотрудников

## Описание
```
Это приложение позволяет искать сотрудников и предпросматривать их профили.
```

### Основные особенности:
```
* Поиск одного или нескольких пользователей по их id и username.
* Учет возможности наличия более 2000 пользователей.
* Динамическая синхронизация между состоянием сайдбара и главной страницей пользователя.
* Отображение ошибок при неправильных запросах или серверных ошибках.
```

### Технические особенности:
```
* Реализовано как одностраничное приложение (SPA) на Vue и Vuex.
* Созданы основные компоненты для удобства работы.
* Для управления состоянием используются actions и mutations.
* Стилизация выполнена с помощью препроцессора Scss.
* Во время всех запросов к API отображается прелоадер.
* Применена изоляция стилей для предотвращения конфликтов.
```

### Инструкция по установке:
```
1.Клонируйте репозиторий с GitHub.
2.Установите все зависимости, используя npm install.
3.Запустите проект локально с помощью npm run serve.
4.Откройте в вашем браузере по адресу http://localhost:8080.
```

