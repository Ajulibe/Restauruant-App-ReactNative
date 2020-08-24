import { useEffect, useState } from "react";
import yelp from "../api/yelp";

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const searchApi = async (term) => {
    try {
      const response = await yelp.get("/search", {
        //if you pass in a params parameter to an axios call any
        //key value pair you put eill automatically be appended at the
        //end on the URL e.g id params has {limit: 50}
        //our final search will be /search?limit=50
        params: {
          limit: 50,
          //term is what we re searching for according to the yelp documentation
          //luckily our state is also called term(we could us ES2015)
          //read the documeantaion for the various parameters
          term: term,
          location: "san jose",
        },
      });

      setResults(response.data.businesses);
    } catch (error) {
      console.log(error);
      setErrorMessage("Something went wrong");
    }
  };

  useEffect(() => {
    searchApi("pasta");
  }, []);

  return [searchApi, results, errorMessage];
};
