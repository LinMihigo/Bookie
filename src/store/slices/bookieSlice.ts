import { createSlice } from "@reduxjs/toolkit";

interface Data {
  numFound: number;
  docs: {
    key: string;
    title: string;
    author_name: string[];
    author_key: string;
    first_publish_year: number;
    cover_i: string;
    ebook_count_i: number;
    edition_count: number;
    language: string[];
    edition_key: string[];
    cover_edition_key: string;
    ia_loaded_id: string[];
    ratings_average: number;
    ratings_count: number;
    want_to_read_count: number;
    currently_reading_count: number;
    readinglog_count: number;
    person_key: string[];
    subject_key: string[];
    place_key: string[];
    name: string;
    work_count: number;
    birth_date: string;
    top_work: string;
    count: number;
  }[];
  q: string;
  num_found: number;
  numFoundExact: boolean;
  start: number;
  offset: null;
}

interface State {
  searchTerm: string;
  url: string | undefined;
  data: Data;
  isLoading: boolean;
  isLoaded: boolean;
  limit: number;
  pageIndex: number;
  selectedValue: string;
  sort: string;
}

const initialState: State = {
  selectedValue: "All",
  searchTerm: "",
  isLoaded: false,
  url: "",
  data: {
    numFound: 0,
    docs: [],
    q: "",
    num_found: 0,
    numFoundExact: false,
    start: 0,
    offset: null,
  },
  isLoading: false,
  limit: 10,
  pageIndex: 1,
  sort: "relevance",
};

// ? fetching data every time changes are made to the fetching data url optimal?
function generateUrl(state: State) {
  const allQuery = `https://openlibrary.org/search.json?q=${state.searchTerm}&fields=*,availability&limit=${state.limit}&page=${state.pageIndex}`;
  const titleQuery = `https://openlibrary.org/search.json?q=title: ${state.searchTerm}&fields=*,availability&limit=${state.limit}&page=${state.pageIndex}`;
  const subjectQuery = `https://openlibrary.org/search/subjects.json?q=${state.searchTerm}&limit=${state.limit}&page=${state.pageIndex}`;
  const authorQuery = `https://openlibrary.org/search/authors.json?q=${state.searchTerm}&fields=*,availability&limit=${state.limit}&page=${state.pageIndex}`;

  if (state.selectedValue === "All") {
    return `${allQuery}`;
  } else if (state.selectedValue === "Title") {
    return `${titleQuery}`;
  } else if (state.selectedValue === "Author") {
    return `${authorQuery}`;
  } else if (state.selectedValue === "Subject") {
    return `${subjectQuery}`;
  }
}

const bookieSlice = createSlice({
  name: "bookie",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      console.log(action);
      state.searchTerm = action.payload;

      state.url = generateUrl(state);

      state.isLoaded = true;
    },
    setIsLoaded: (state, action) => {
      state.isLoaded = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;

      state.url = generateUrl(state);
    },
    setPageIndex: (state, action) => {
      state.pageIndex = action.payload;
      console.log("PageIndex: ", action.payload);

      state.url = generateUrl(state);
    },
    setSelectedValue: (state, action) => {
      state.isLoaded = false;
      state.selectedValue = action.payload;

      state.selectedValue === "Author"
        ? (state.limit = 20)
        : state.selectedValue === "Subject"
        ? (state.limit = 30)
        : (state.limit = 10);

      console.log("selectedValue: ", action.payload);
      console.log(state.url);
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
      console.log("data payload: ", action.payload);
    },
    setSort: (state, action) => {
      state.sort = action.payload;
      console.log(action.payload);
      state.url = generateUrl(state) + `&sort=${action.payload}`;
    },
  },
});

export const {
  setSearchTerm,
  setIsLoaded,
  setLimit,
  setPageIndex,
  setSelectedValue,
  setIsLoading,
  setData,
  setSort,
} = bookieSlice.actions;
export const bookieReducer = bookieSlice.reducer;
