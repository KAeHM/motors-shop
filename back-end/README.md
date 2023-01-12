# Motors - API

The API made for **_`Motors`_**, which is an application made for people who want to sell their cars or bikes, or people who'd like to get their hands on a car or a bike, secondhand or brand new.

<br>

# Installation

##

- ### Clone the repository;
- ### On the folder with the cloned files, open your command language interpreter of choice;
- ### Type in _`yarn install`_;
- ### After it's done installing, apply migrations by typing in _[migrateCommand]_;
- ### Finally, when migrations are done, type _`yarn dev`_;

<br>

# Usage

## _**User routes**_

<br>

## **_/user/register_** - POST

- Route for registering a new user
- Authentication not required

Request body example:

    {
        "name": "Carlos",
        "email": "carlosodev@gmail.com",
        "password": "strongpasswordforsure",
        "isSeller": true,
        "cpf": "01234567819",
        "phone": "21971824394",
        "birthdate": "07-12-1994",
        "description": "interesting description",
        "cep": "28949790",
        "city": "Duque de Caxias",
        "street": "Rua Carvalho",
        "state": "RJ",
        "number": "421"
    }

<br>

## **_/user/profile_** - GET

- Route for retrieving the user's profile
- Requires authentication
- Cannot retrieve a user's profile other than your own.

No request body required

<br>

## **_/user/edit_** - PATCH

- Route for editing a specific user's data
- Requires authentication
- Request body may be incomplete/partial
- Does not allow for password changes
- Checks for duplicate emails and CPFs

Request body examples:

    Example 1:
    {
        "name": "Carlos Braga",
        "description": "even more interesting description",
        "number": "42"
    }

---

    Example 2:
    {
        "name": "Jose Carlos",
        "email": "carlosnovoemail@gmail.com",
        "phone": "21999537759",
        "description": "maybe a little less interesting description",
        "cep": "26051790",
        "city": "Nova Iguaçu",
        "street": "Rua Arlete",
        "state": "RJ",
        "number": "1337"
    }

<br>

## **_/user/password-recovery_** - GET

- Route for receiving an email to a link
- Said link will redirect to a page where the user can change their password
- Requires authentication

No request body required

<br>

## **_/user/edit-password_** - PATCH

- Route for changing passwords
- Only the password will be captured from body request
- Requires authentication

Request body examples:

    {
        "password": "differentpassword"
    }

<br>

## _**User Session Route**_

<br>

## **_/login_** - POST

- Route for login
- Receive a token

Request body examples:

    {
        "email": "carlosodev@gmail.com",
        "password": "strongpasswordforsure"
    }

<br>

## _**Listing routes**_

<br>

## **_/listings/register_** - POST

- Route for creating a new listing
- Requires authentication

Request body example:

    {
        "listingType": "venda",
        "name": "Palio",
        "year": 2008,
        "km": 1175,
        "price": 17800,
        "description": "Carro usado",
        "typeVehicle": "Carro",
        "coverImage": "https://www.agoramotor.com.br/tabela-fipe/wp-content/uploads/2022/06/palio-2008-tabela-fipe.jpg"
    }

<br>

## **_/listings_** - GET

- Route for retrieving all listings
- Authentication not required

No request body required.

<br>

## **_/listings/seller/:id_** - GET

- Route for retrieving all listings from a specific vendor
- Authentication not required

No request body required.

<br>

## **_/listings/:id_** - GET

- Route for retrieving a specific listing
- Authentication not required

No request body required.

<br>

## **_/listings/edit/:id_** - PATCH

- Route for editing a specific listing
- Requires authentication
- Request body may be incomplete/partial

Request body example:

    {
        "listingType": "venda",
        "name": "Palio",
        "year": 2008,
        "km": 1175,
    }

<br>

## **_/listings/delete/:id_** - DELETE

- Route for delete a specific listing
- Requires authentication

<br>

## **_Comment routes_**

<br>

## **_/comments/register/:id_** - POST

- Route for posting a comment
- Authentication required

Request body example:

    {
        "message": "nice car!"
    }

<br>

## **_/comments_** - GET

- Route for retrieving all comments
- Authentication not required

No request body required

<br>

## **_/comments/edit/:id_** - PATCH

- Route for editing a specific comment
- Requires authentication
- Request body may be incomplete/partial

Request body example:
{
"message": "Cool car"
}

<br>

## **_/comments/delete/:id_** - DELETE

- Route for delete a specific listing
- Requires authentication

<br>
