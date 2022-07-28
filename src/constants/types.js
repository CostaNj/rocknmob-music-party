export const getTypes = (type) => [
    {
        typeNumber: 0,
        typeRole: 'vocal1',
        typeHeader: 'Вокал'
    },
    {
        typeNumber: 1,
        typeRole: 'vocal2',
        typeHeader: 'Бэк'
    },
    {
        typeNumber: 2,
        typeRole: 'guitar1',
        typeHeader: type === 'acoustic' ? 'Акустика' : 'Гитара 1'
    },
    {
        typeNumber: 3,
        typeRole: 'guitar2',
        typeHeader: type === 'acoustic' ? 'Акустика/Соло' : 'Гитара 2'
    },
    {
        typeNumber: 4,
        typeRole: 'bass',
        typeHeader: 'Бас'
    },
    {
        typeNumber: 5,
        typeRole: 'drums',
        typeHeader: type === 'acoustic' ? 'Ударные/Перкуссия' : 'Ударные'
    },
    {
        typeNumber: 6,
        typeRole: 'piano',
        typeHeader: type === 'acoustic' ? 'Клавиши/Другое' : 'Клавиши'
    }
];
