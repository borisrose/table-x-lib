# Getting Started with Create React App

## Création du plugin

Au départ j'avais utilisé au sein du component TableX ( le composant principal se trouvant dans le fichier table-x.js faker.js pour initialiser de fausses données).

```javascript
import { faker, fakerEN_US } from '@faker-js/faker';
```

Vous pouvez voir ci-dessous l'utilisation de setData qui sous-entend que j'ai une variable de state local data dans ce component.

```javascript

useEffect(() => {
    for(let i = 0; i < 30; i++){
        fakeData.push({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName('female'),
            startDate : faker.date.past({ years: 10 }).toString(),
            department: faker.commerce.department(),
            dateOfBirth: faker.date.past({ years: 40 }).toString(),
            street: fakerEN_US.location.street(),
            city: fakerEN_US.location.city(),
            state: fakerEN_US.location.state(),
            zipCode: fakerEN_US.location.zipCode()
        })
    }
    setData([...fakeData])
}, [])

```

## La syntaxe des informations délivrées à TableX

Quand via les props vous passez des données à TableX vous devez les écrires de la façon suivante :  

```javascript
    // en dur 
    const list = [
        {
            value: 25,
            name : "25"
        },
        {
            value : 50,
            name : "50"
        },
        {
            value : 100,
            name : "100"
        }
    ]

   // en dur
    const columns= [
        { title: 'First Name', data: 'firstName' },
        { title: 'Last Name', data: 'lastName'},
        { title: 'Start Date', data: 'startDate' },
        { title: 'Department', data: 'department' },
        { title: 'Date of Birth', data: 'dateOfBirth'},
        { title: 'Street', data: 'street'},
        { title: 'City', data: 'city'},
        { title: 'State', data: 'state'},
        { title: 'Zip Code', data: 'zipCode'},
    ]
```
