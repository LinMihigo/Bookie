# Bookie 🍄

[![Netlify Status](https://api.netlify.com/api/v1/badges/193ba244-4e0b-408e-b29a-2c44d8abd594/deploy-status)](https://app.netlify.com/sites/boookie/deploys)

This project enables users to search through the Internet Archive's index of books using the OpenLibrary API. Users can easily find books of interest and access them directly on the OpenLibrary website. Additionally, users can read the books online using Archive.org's book reader.

## Features

- **Search**: Users can search for books by title, author, or any other relevant keyword.
- **Results Display**: The search results display relevant book information, including title, author, and cover image.
- **Direct Link to OpenLibrary**: Users can click on the title or cover image of a book to be redirected to the book's page on OpenLibrary.org.
- **Online Reading**: Clicking on the "Read" button opens the book in a new tab using the Internet Archive's book reader, allowing users to read the book online.
- **Pagination**: Search results are spread out on several pages.

## Technologies Used

- **OpenLibrary APIs**: Used to search for books and retrieve book information.
- **HTML/tailwindCSS**: For building the UI.
- **React/Typescript**: For handling user interactions.
- **Archive.org Book Reader**: Integrated to provide online reading functionality.
- **swr**: For handling API requests, pagination and caching.

## How to Use

1. **Clone the Repository**: Clone this repository to your local machine and cd into the project.

   ```bash
   git clone https://github.com/LinMihigo/Bookie.git
   cd Bookie
   ```

2. **Install dependencies and run the app**: Run `npm install` and then run `npm run dev` in your command line inside your project directory.

3. **Search for Books**: Enter keywords into the search bar and press Enter to search for books.

4. **View Results**: Browse through the search results and click on a book title or cover image to view more details on OpenLibrary.org.

5. **Read Online**: To read a book online, click on the "Read" button. This will open the book in a new tab using the Internet Archive's book reader.

## Demo

A live demo of this project is available [here](https://bo-okie.netlify.app/).

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
