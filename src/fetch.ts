import axios from "axios";

const fetch = async (searchTerm: string) => {
    console.log(searchTerm)
    const response = await axios
        .get(
            `https://openlibrary.org/search.json?q=${searchTerm}&fields=*,availability&limit=10`
        )

    return response.data;
};

export default fetch