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
  pageIndex: number;
  selectedValue: string;
}

const initialState: State = {
  searchTerm: "",
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
  isLoaded: false,
  pageIndex: 1,
  selectedValue: "All",
};

function generateUrl(state: State) {
  const baseUrl = "https://openlibrary.org/search.json";
  const query = `q=${state.searchTerm}&fields=*,availability&limit=10&page=${state.pageIndex}`;

  if (state.selectedValue === "All") {
    return `${baseUrl}?${query}`;
  } else if (state.selectedValue === "Title") {
    return `${baseUrl}?${query}`;
  } else if (state.selectedValue === "Author") {
    return `${baseUrl}?${query}`;
  } else if (state.selectedValue === "Subject") {
    return `${baseUrl}?${query}`;
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
    setPageIndex: (state, action) => {
      state.pageIndex = action.payload;
      console.log("PageIndex: ", action.payload);

      state.url = generateUrl(state);
    },
    setSelectedValue: (state, action) => {
      state.selectedValue = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
      console.log("data payload: ", action.payload);
    },
  },
});

export const {
  setSearchTerm,
  setIsLoaded,
  setPageIndex,
  setSelectedValue,
  setIsLoading,
  setData,
} = bookieSlice.actions;
export const bookieReducer = bookieSlice.reducer;
