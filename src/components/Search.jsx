import axios from "axios";
import React, { useContext, useState } from "react";
import { LocationContext } from "./context/Context";
import Select from "react-select";

function Search() {
  const { setCoordinates, setLocation } = useContext(LocationContext);
  const [options, setOptions] = useState([]);
  const [menu, setMenu] = useState(false);

  const handleSelectChange = (e) => {
    setMenu(false);

    setLocation(e.label);
    const { lat, lng } = e.geometry;

    setCoordinates([lng, lat]);
  };

  const handleChange = async (e) => {
    setMenu(true);
    const searchValue = e.target.value;
    const result = await axios
      .get(
        `https://api.opencagedata.com/geocode/v1/json?q=${searchValue}&key=cd7e28d203e64969a0a2dc20653cdaae`
      )
      .catch((err) => {
        setOptions([]);
      });

    if (result && result.data.results.length > 0) {
      const { lat, lng } = result.data.results[0].geometry;
      let optionArr = [];
      for (let i = 0; i < result.data.results.length; i++) {
        optionArr.push({
          value: result.data.results[i].formatted,
          label: result.data.results[i].formatted,
          geometry: result.data.results[i].geometry,
        });
      }
      setOptions(optionArr);
    }
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "8px",
      borderColor: state.isFocused ? "blue" : "gray",
      boxShadow: state.isFocused ? "0 0 0 2px lightblue" : "none",
      backgroundColor: "white",
      "&:hover": {
        borderColor: "blue",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "lightblue" : "white",
      color: state.isSelected ? "white" : "black",
      "&:hover": {
        backgroundColor: "lightblue",
        color: "white",
      },
    }),
    menu: (provided, state) => ({
      ...provided,
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    }),
    menuList: (provided, state) => ({
      ...provided,
      padding: "8px",
    }),
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a location"
        onChange={handleChange}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid gray",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          fontSize: "16px",
          outline: "none",
        }}
      />
      <Select
        options={options}
        onChange={handleSelectChange}
        isSearchable={true}
        value={options}
        styles={customStyles}
        menuIsOpen={menu}
      />
    </div>
  );
}

export default Search;
